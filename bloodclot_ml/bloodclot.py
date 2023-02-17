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
from tqdm.notebook import tqdm
# %matplotlib inline

from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
import subprocess
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

def tiff_to_png(test):
    # Demo Test Data Set Convert (Tiff to Png)
    image_scalar = 1024
    seam_carving.carve.MAX_MEAN_ENERGY = 10.0
    # fig, axes = plt.subplots(2, 2, figsize=(7, 6), sharex=True, sharey=True)
    # ax = axes.ravel()
    for i in tqdm(range(test.shape[0])):        
    # Remove Background White Space
        img_id = test.iloc[i].image_id
        img_path = f'/test/{img_id}.tif'

        image = rasterio.open(img_path)
        image = image.read(out_shape=(image.count, int(image_scalar), int(image_scalar)),
                                 resampling=Resampling.bilinear).transpose(1,2,0)
        image_h, image_w, _ = image.shape
        image = seam_carving.resize(image, (image_w-512, image_h-512),
                                        energy_mode='backward',
                                        order=('width-first'),
                                        keep_mask=None)
    # Apply Stain Color Normalization => Using Skimage
        ihc_hed = rgb2hed(image)
        null = np.zeros_like(ihc_hed[:, :, 0])
        h = rescale_intensity(ihc_hed[:, :, 0], out_range=(0, 1),
                      in_range=(0, np.percentile(ihc_hed[:, :, 0], 99)))
        d = rescale_intensity(ihc_hed[:, :, 2], out_range=(0, 1),
                      in_range=(0, np.percentile(ihc_hed[:, :, 2], 99)))
        # Cast the two channels into an RGB image, as the blue and green channels
        # respectively
        image = np.dstack((null, d, h))#.transpose(2,0,1).astype(np.uint16)
        print(image.shape)


        skimage.io.imsave(f'/test/{img_id}.png', image)
        del image
        gc.collect()
        return 

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




@app.route('/prediction/<file>',methods=['POST','GET'])
def pred_api(file):
    
    test_image = request.get_data()
    curr_dir=os.getcwd()
    print("path printing ",curr_dir)
    # os.chdir('sense-23_backend')
        # Step 1.3 Test Transform
    transform_test = Albu.Compose([Albu.Normalize(mean=[0.485, 0.456, 0.406], 
                                                std=[0.229, 0.224, 0.225]),
                                ToTensorV2()])
    test = pd.read_csv('./test/test.csv')

    # 1.4 Test Data Set
    img_dir = './test'
    dataset_test = ImageDataset(test, img_dir=img_dir, transform=transform_test)
  
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

    efficient_net = efficient_net.to(device)
    model.append(efficient_net)
    
    # Step 3.8.6 Submission
    preds, ids = predict(model[0], loader_test)

    print( "CE : ",preds[:,0], "LAA : ",preds[:,1])
    
    # pred_json={
        
    #     "names": preds
    # }

    return jsonify("done bro ---- ")

if __name__ == "__main__":
    app.run(debug=True)


      