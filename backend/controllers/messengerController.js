const User=require('../models/authModel');
const messageModel=require('../models/messageModel');
const formidable=require('formidable');
const fs=require('fs');

const getLastMessage=async(myId,fdId)=>{
    //const lstmessage=await messageModel.find().filter(m=>m.senderId===myId && m.receiverId===fdId || m.receiverId===myId && m.senderId===fdId).sort({updatedAt:-1});
    const lstmessage=await messageModel.findOne({
        $or:[{
                $and:[{senderId:{$eq:myId}},{receiverId:{$eq:fdId}}],
            },
            {
                $and:[{senderId:{$eq:fdId}},{receiverId:{$eq:myId}}],
            }
        ]
    }).sort({updatedAt:-1});
    return lstmessage;
}
module.exports.getFriends=async(req,res)=>{
    const myId=req.myId;
    let friendMessage=[];
    try{
        const friendGet=await User.find({});
        const filter=friendGet.filter(d=>d.id !==myId);
        for(let i=0;i<filter.length;i++){
            let lastMessage=await getLastMessage(myId,filter[i].id);
            friendMessage=[...friendMessage,{friendInfo:filter[i],messageInfo:lastMessage}];
        }
        res.status(200).json({success:true,friends:friendMessage});
    }
    catch(error){
        res.status(500).json({error:{errorMessage:"Internal Server Error."}});
    }
}

module.exports.messageUploadDB=async(req,res)=>{
    const {senderName,receiverId,message}=req.body;
    const senderId=req.myId;

    try{
        const insertMessage=await messageModel.create({
            senderId:senderId,
            senderName:senderName,
            receiverId:receiverId,
            message:{
                text:message,
                image:''
            }
        })
        res.status(200).json({success:true,message:{
            senderId:senderId,
            senderName:senderName,
            receiverId:receiverId,
            message:{
                text:message,
                image:''
            }
        }});

    }
    catch(error){
        res.status(500).json({error:{errorMessage:"Internal Server Error."}});
    }
}

module.exports.messageGet=async(req,res)=>{
    const myId=req.myId;
    const fdId=req.params.id;
    try {
        let getAllMessage=await messageModel.find({});
        getAllMessage=getAllMessage.filter(m=>m.senderId===myId && m.receiverId===fdId || m.receiverId===myId && m.senderId===fdId);

        res.status(200).json({success:true,message:getAllMessage});
    } catch (error) {
        res.status(500).json({error:{errorMessage:"Internal Server Error."}});
    }
}

module.exports.imageSend=async(req,res)=>{
    const form =formidable();
    
    form.parse(req,(err,fields,files)=>{
       const senderId=req.myId;
       const {senderName,receiverId,imageName}=fields;
       const newPath=__dirname+`../../../frontend/public/image/${imageName}`;
       files.image.originalFilename=imageName;
       
       try {
        fs.copyFile(files.image.filepath,newPath,async(err)=>{
            if(err){
                res.status(500).json({error:{errorMessage:"Image Upload Fail"}});
            }
            else{
                const insertMessage=await messageModel.create({
                    senderId:senderId,
                    senderName:senderName,
                    receiverId:receiverId,
                    message:{
                        text:'',
                        image:imageName
                    }
                })
                res.status(200).json({success:true,message:{
                    senderId:senderId,
                    senderName:senderName,
                    receiverId:receiverId,
                    message:{
                        text:'',
                        image:imageName
                    }
                }});
                
            }
       })   
       } catch (error) {
        res.status(500).json({error:{errorMessage:"Internal Server Error."}});
       }
    })
}