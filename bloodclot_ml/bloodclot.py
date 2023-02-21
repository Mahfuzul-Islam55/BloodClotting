import os, random, gc
import seaborn as sns
import numpy as np 
import pandas as pd 
import torch
import torch.nn as nn # neural network module
import torch.nn.functional as F # neural network module에서 자주 사용되는 함수
import torchvision
# import cv2, math, shutil # OpenCV => cv2
import albumentations as Albu
import rasterio
import seam_carving
import skimage
from skimage.io.manage_plugins import call_plugin
from skimage.color import rgb2hed, hed2rgb
from skimage.exposure import rescale_intensity

import matplotlib.pyplot as plt
from rasterio.enums import Resampling
from rasterio.transform import Affine
from torchvision import models
from torchvision import transforms
from albumentations.pytorch import ToTensorV2  
from sklearn.model_selection import train_test_split
from torch.utils.data import Dataset, DataLoader
from sklearn.metrics import roc_auc_score
from tqdm import tqdm
# %matplotlib inline

from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
import subprocess
import io
from base64 import encodebytes
from PIL import Image
from pathlib import Path

from imutils import paths
import skimage
from skimage.filters import sobel
from skimage import segmentation
from skimage.color import label2rgb
from skimage.color import rgb2hed, hed2rgb
from skimage.exposure import rescale_intensity
import tifffile as tifi
import cv2 as cv
from skimage.measure import regionprops, regionprops_table
from sklearn.preprocessing import StandardScaler
from scipy import ndimage as ndi

app = Flask(__name__)

CORS(app)

all_contain_dir = os.path.join(app.instance_path, 'uploads')
os.makedirs(all_contain_dir, exist_ok=True)


# Step 1.1.1 Seed Fasten
seed = 50
os.environ['PYTHONHASHSEED'] = str(seed) # python 난수 고정 => 환경변수 접근, 고정 시드 넘버 할당
random.seed(seed) # random module 난수 고정
np.random.seed(seed) # numpy module 난수 고정
torch.manual_seed(seed)

torch.manual_seed(seed) # 파이토치 CPU 난수 생성기 => 시드 고정 
torch.cuda.manual_seed(seed) # 파이토치 GPU 난수 생성기 => 시드 고정
torch.cuda.manual_seed_all(seed) # 파이토치 멀티 코어_GPU 난수 생성기 => 시드 고정

torch.backends.cudnn.deterministic = True # 확정적 연산 사용
torch.backends.cudnn.benchmark = False # benchmark function 해제
torch.backends.cudnn.enabled = False # cudnn 사용 해제
device = torch.device('cpu')

# Step 1.2.2 Definition Data Set Class
class ImageDataset(Dataset):
    def __init__(self, df, img_dir='./', transform=None, is_test=True):
        super().__init__()
        self.df = df
        self.img_dir = img_dir
        self.transform = transform
        self.is_test = is_test
        
    def __len__(self):
        return len(self.df)
    
    def __getitem__(self, idx):
    
        if self.is_test:
            img_id = self.df.iloc[idx, 0] 
            img_path = f'{self.img_dir}/{img_id}.png'
            
            image = rasterio.open(img_path)
            image = image.read(resampling=Resampling.bilinear).transpose(1,2,0)
            patient_ids = self.df.iloc[idx, 2]
            
            if self.transform is not None:
              image = self.transform(image=image)['image']
            
            return image, patient_ids 


# Step 1.5 Data Loader Definition 
def seed_worker(worker_id):
    worker_seed = torch.initial_seed() %2**32
    np.random.seed(worker_seed)
    random.seed(worker_seed)



# Step 1.7 Predict Function Definition
def predict(model, loader_test): 
    ids = []
    model.eval()
    preds_part = []
    
    with torch.no_grad():
        for images, patient_ids in loader_test:
            images = images.to(device) #, dtype=torch.float32)
            outputs = model(images)
            
            ids.append(patient_ids[0]) # Pytorch Broadcasting => patient_ids 차원 추가, 그래서 ('patient_id',) <= 출력 형태가 저런 모습이었다. 
            preds_part.append(torch.softmax(outputs.cpu(), dim=1).squeeze().numpy())
            
    return np.array(preds_part), ids



############
def read_tiff(path):
    image = tifi.imread(path)
    filename = path.split('/')[-1].rstrip('.tif')
    print("image_id: " + filename)
    return image, filename

def resize_image(image):
    re_sized_image = cv.resize(image,(int(image.shape[1]/53),int(image.shape[0]/53)),interpolation= cv.INTER_LINEAR)
    return re_sized_image
def convert_image_grayscale(image):
    gray_image = cv.cvtColor(image, cv.COLOR_RGB2GRAY)
    return gray_image
def segment_images(resized_gray_img):
    elevation_map = sobel(resized_gray_img)
    markers = np.zeros_like(resized_gray_img)
    markers[resized_gray_img >= resized_gray_img.mean()] = 1
    markers[resized_gray_img < resized_gray_img.mean()] = 2
    segmented_img = segmentation.watershed(elevation_map, markers)
    filled_segments = ndi.binary_fill_holes(segmented_img - 1)
    labeled_segments, _ = ndi.label(filled_segments)
    return labeled_segments

def get_object_coordinates(labeled_segments):
    properties =['area','bbox','convex_area','bbox_area', 'major_axis_length', 'minor_axis_length', 'eccentricity']
    df = pd.DataFrame(regionprops_table(labeled_segments, properties=properties))
    standard_scaler = StandardScaler()
    scaled_area = standard_scaler.fit_transform(df.area.values.reshape(-1,1))
    df['scaled_area'] = scaled_area
    df.sort_values(by="scaled_area", ascending=False, inplace=True)
    objects = df[df['scaled_area']>=.75]
    print(objects.head())
    object_coordinates = [(row['bbox-0'],row['bbox-1'],row['bbox-2'],row['bbox-3'] )for index, row in objects.iterrows()]
    return object_coordinates

def rescale_coordinates(object_location, image):
    top, bottom, left, right = object_location
    left = int(left * image.shape[0])
    bottom = int(bottom * image.shape[1])
    right = int(right * image.shape[0])
    top = int(top * image.shape[1])
    return top, bottom, left, right

def normalize_coordinates(object_coordinates, image):
    top, bottom, left, right = object_coordinates
    left = (int(left) / image.shape[0])
    bottom = (int(bottom) / image.shape[1])
    right = int(left) + (int(right) / image.shape[0])
    top = int(bottom) + (int(top) / image.shape[1])
    
    # object_location = top, bottom, left, right
    # top, bottom, left, right = rescale_coordinates(object_location, image)
    
    return top, bottom, left, right

def patches_dictionary(object_coordinates, re_sized_image, image, filename):
    patches = {}
    for i in range(len(object_coordinates)):
        coordinates = object_coordinates[i]
        normal_cords = normalize_coordinates(coordinates, re_sized_image)
        re_scaled_cords = rescale_coordinates(normal_cords, image)
        patches[str(filename)+"_"+str(i+1)] = [normal_cords, re_scaled_cords]
    patches = {filename:patches}
    return patches


#plotting individual patches
def plot_patch(patch_name, cropped_image, cmap=None):
    plt.figure(figsize=(10,8), dpi=150)
    ax = plt.subplot()
    plt.imshow(cropped_image, cmap=cmap)
    ax.set_title(patch_name)
    ax.axis('off')
    plt.show()

def crop_patch(coordinates, image):
    x1, y1, x2, y2 = coordinates
    cropped_image = image[x1:x2, y1:y2]
    return cropped_image


def process_image(path):
    image, filename = read_tiff(path)
    re_sized_image = resize_image(image)
    resized_gray_img = convert_image_grayscale(re_sized_image)
    labeled_segments = segment_images(resized_gray_img)
    # plot_labeled_segments(labeled_segments, resized_gray_img)
    object_coordinates = get_object_coordinates(labeled_segments)
    patches = patches_dictionary(object_coordinates, re_sized_image, image, filename)
    # print(str(len(patches[filename]))+" patches")
    cropped_images = []
    for i in range(len(patches[filename])):
        patch_name = str(filename)+"_"+str(i+1)
        coordinates = patches[filename][patch_name][1]
        cropped_image = crop_patch(coordinates, image)
        cropped_images.append([patch_name,cropped_image])
    return patches, cropped_images, filename
# Display individual patches

##########
def encode(path):
    pil_img = Image.open(path, mode='r') # reads the PIL image
    byte_arr = io.BytesIO()
    pil_img.save(byte_arr, format='PNG') # convert the PIL image to byte array
    return encodebytes(byte_arr.getvalue()).decode('ascii') # encode as base64
    



@app.route('/prediction/<filee>',methods=['POST','GET'])
@torch.no_grad()
def pred_api(filee):
    
    test_image = request.get_data()
    curr_dir=os.getcwd()

    # curr_dir='E:/CV/new_bloodc/BloodClotting/bloodclot_ml'
    # print("path printing pre",curr_dir)
    exten=Path(filee).suffix
    file='007'
    # saving incoming
    print("incomping file----------",filee)
    os.chdir('test')
    curr_dir=os.getcwd()
    # subprocess.run(['del','/f','/q', '*'],shell=True)
    with open(f'{file}{exten}', "wb") as code:
        code.write(test_image)
    os.chdir('../')
    curr_dir=os.getcwd()
    #1.3 preprocessing tif to png
    test = {'image_id':[file],'center_id':[1],'patient_id':[2],'image_num':[1]}
    test =pd.DataFrame(test)
    
    ##############

    patches, cropped_images, filename = process_image( f'{curr_dir}/test/{file}{exten}')
    
    for i in range(len(patches[filename])):
        patch_number = i
        image_meta = test[test.image_id==filename]
        if i==0:    
            patch_name = str(filename)
        else:    
            patch_name = str(filename)+"_"+str(patch_number)
        patch = cropped_images[patch_number-1][1]
        cv.imwrite(f'{curr_dir}/test/{patch_name}.png',patch)
    
    ##############
    # Step 1.3 Test Transform
    transform_test = Albu.Compose([Albu.Normalize(mean=[0.485, 0.456, 0.406], 
                                                std=[0.229, 0.224, 0.225]),
                                ToTensorV2()])
   
    img_path = f'{curr_dir}/test/{file}.PNG'

    # 1.4 Test Data Set
    img_dir = './test'
    dataset_test = ImageDataset(test, img_dir=img_dir, transform=transform_test)
    print("transformation done")
    g = torch.Generator()
    g.manual_seed(0)

    batch_size = 1
    loader_test = DataLoader(dataset_test, batch_size=batch_size, shuffle=False, 
                            worker_init_fn=seed_worker, generator=g, num_workers=1)

    # Step 1.6 Pretrained Model => Efficient Net-B5

    model = []

    # Efficient-Net
    efficient_net = models.efficientnet_b0()
    efficient_net.classifier = nn.Linear(1280,2)
    efficient_net.load_state_dict(torch.load('./model/new_efficient_model_state_dict.pth', map_location=torch.device('cpu')))
    print(efficient_net.classifier)
    print("model loaded")
    efficient_net = efficient_net.to(device)
    model.append(efficient_net)
    
    # Step 3.8.6 Submission
    preds, ids = predict(model[0], loader_test)
    curr_dir=os.getcwd()
    print( "CE : ",preds[:,0], "LAA : ",preds[:,1])
    encoded_img = encode(img_path) # encode as base64
    print("precticted image encode complete")
    ce=float(preds[:,0])
    laa= float(preds[:,1]) 

    pred_json={       
       'img_name' : file ,
       'img_data': encoded_img,
        'CE' : ce ,
        'LAA' : laa,
        
    }

    return jsonify(pred_json)

@app.route('/stain',methods=['POST','GET'])
def stain():
    file='007'
    img_path = f'{os.getcwd()}/test/{file}.PNG'
    img=cv.imread(f'{img_path}')
    print("working on stain")
    # Convert rgb2hed
    ihc_hed = rgb2hed(img)
    # Separate hed channels
    null = np.zeros_like(ihc_hed[:, :, 0])
    ihc_h = hed2rgb(np.stack((ihc_hed[:, :, 0], null, null), axis=-1))
    ihc_e = hed2rgb(np.stack((null, ihc_hed[:, :, 1], null), axis=-1))
    ihc_d = hed2rgb(np.stack((null, null, ihc_hed[:, :, 2]), axis=-1))
   

    cur_dir=os.getcwd()
    skimage.io.imsave(f'{cur_dir}/test/img_h.png', ihc_h)
    skimage.io.imsave(f'{cur_dir}/test/img_e.png', ihc_e)
    skimage.io.imsave(f'{cur_dir}/test/img_d.png', ihc_d)
    
   
    # Rescale hematoxylin and DAB channels and give them a fluorescence look
    h = rescale_intensity(ihc_hed[:, :, 0], out_range=(0, 1), in_range=(0, np.percentile(ihc_hed[:, :, 0], 95)))
    d = rescale_intensity(ihc_hed[:, :, 2], out_range=(0, 1), in_range=(0, np.percentile(ihc_hed[:, :, 2], 95)))

    # Cast the two channels into an RGB image, as the blue and green channels
    # respectively
    zdh = np.dstack((null, d, h))
    skimage.io.imsave(f'{cur_dir}/test/img_z.png', zdh)
    
    print("preparaing stain image")
    
    ihc_h = f'{os.getcwd()}/test/img_h.PNG'
    ihc_e = f'{os.getcwd()}/test/img_e.PNG'
    ihc_d = f'{os.getcwd()}/test/img_d.PNG'
    zdh = f'{os.getcwd()}/test/img_z.PNG'

    encoded_img_h = encode(ihc_h) # encode as base64
    encoded_img_e = encode(ihc_e) # encode as base64
    encoded_img_d = encode(ihc_d) # encode as base64
    encoded_img_zdh = encode(zdh) # encode as base64
    print("encode complete")
    

    stain_json={       
       'img_h' : encoded_img_h ,
       'img_e' : encoded_img_e ,
       'img_d': encoded_img_d,
       'img_z': encoded_img_zdh,
              
    }

    return jsonify(stain_json)
    
if __name__ == "__main__":
    app.run(port=5002)


    
      