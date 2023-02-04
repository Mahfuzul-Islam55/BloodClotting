const formidable=require('formidable');
const validator=require('validator');
const registerModel=require('../models/authModel');
const fs=require('fs');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const { options } = require('../routes/authRoute');
const { match } = require('assert');
module.exports.userRegister=(req,res)=>{
    const form=formidable();
    form.parse(req,async(err,fields,files)=>{
        const {userName,email,password,confirmPassword}=fields;
        const image=files;
        const error=[];
        
        if(!userName){
            error.push('Please,provide user name');
        }
        if(!email){
            error.push('Please,provide email');
        }
        if(email && !validator.isEmail(email)){
            error.push('Please, provide valid email');
        }
        if(!password){
            error.push('Please,provide password');
        }
        if(!confirmPassword){
            error.push('Please,confirm your password');
        }
        if(password && confirmPassword && password!==confirmPassword){
            error.push('Your password and confirm password is not same');
        } 
        if(password && password.length<6){
            error.push('Your password length must be at least 6 character');
        }
        if(Object.keys(files).length===0){
            error.push('please provide user image');
        }
        if(error.length>0){
            res.status(400).json({error:{errorMessage:error}});
        }
        else{
            const getImageName=files.image.originalFilename;
            const randomNumber=Math.floor(Math.random()*99999);
            const newImageName=randomNumber+getImageName;

            files.image.originalFilename=newImageName;
            const newPath=__dirname+`../../../frontend/public/image/${files.image.originalFilename}`;

            try{
                const checkUser=await registerModel.findOne({email:email});
                if(checkUser){
                    res.status(404).json({error:{errorMessage:['Your email already exists.']}});
                }
                else{
                    fs.copyFile(files.image.filepath,newPath,async(error)=>{
                        if(!error){
                            const userCreate=await registerModel.create({
                                userName,
                                email,
                                password:await bcrypt.hash(password,10),
                                image:files.image.originalFilename
                            })

                            const token=jwt.sign({
                                id:userCreate._id,
                                email:userCreate.email,
                                userName:userCreate.userName,
                                image:userCreate.image,
                                registerTime:userCreate.createAt,
                            },process.env.SECRET,{expiresIn:process.env.TOKEN_EXP});
                            
                            const options={
                                expires:new Date(Date.now()+process.env.COOKIE_EXP*24*60*60*1000)
                            }
                            res.status(201).cookie('authToken',token,options).json({
                                successMessage:'Your Registration is successfull',
                                token
                            });
                            console.log(token);
                        }
                        else{
                            res.status(500).json({error:{errorMessage:['Internal Server Error.']}})
                        }
                    });
                }
            }catch(error){
                res.status(500).json({error:{errorMessage:['Internal Server Error.']}})
            }
          
        }
    });
}

module.exports.userLogin=async(req,res)=>{
    const error=[];
    const {email,password}=req.body;
    if(!email){
        error.push('Please,provide email');
    }
    if(email && !validator.isEmail(email)){
        error.push('Please, provide valid email');
    }
    if(!password){
        error.push('Please,provide password');
    }
    if(password && password.length<6){
        error.push('Your password length must be at least 6 character');
    }
    if(error.length>0){
        res.status(400).json({error:{errorMessage:error}});
    }
    else{
        try{
            const checkUser=await registerModel.findOne({email:email}).select('+password');

            if(checkUser){
                const matchPassword=await bcrypt.compare(password,checkUser.password);

                if(matchPassword){
                    const token=jwt.sign({
                        id:checkUser._id,
                        email:checkUser.email,
                        userName:checkUser.userName,
                        image:checkUser.image,
                        registerTime:checkUser.createAt,
                    },process.env.SECRET,{expiresIn:process.env.TOKEN_EXP});
                    
                    const options={
                        expires:new Date(Date.now()+process.env.COOKIE_EXP*24*60*60*1000)
                    }
                    res.status(200).cookie('authToken',token,options).json({
                        successMessage:'Your login is successfull',
                        token
                    });            
                }
                else{
                    res.status(400).json({error:{errorMessage:['Your password is not valid']}});
                }
            }
            else{
                res.status(400).json({error:{errorMessage:['Your email is not found.']}});
                console.log('oops')
            }
        } 
        catch(error){
            //res.status(500).json({error:{errorMessage:['Internal Server Error.']}})
        }
    }

} 

module.exports.userLogout=(req,res)=>{
    res.status(200).cookie('authToken','').json({
        success:true
    })
}