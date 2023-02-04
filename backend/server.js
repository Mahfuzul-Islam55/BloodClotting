const express=require('express');
const app=express();


const databaseConnect=require('../backend/config/database');
const dotenv=require('dotenv');
const authRouter=require('./routes/authRoute');
const messengerRoute=require('./routes/messengerRoute');
const cookieParser=require('cookie-parser');
const bodyParser=require('body-parser');


dotenv.config({
    path:'backend/config/config.env'
});
const PORT=process.env.PORT || 5000

app.get('/',(req,res)=>{
    res.send("OK");
})

app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api/messenger',authRouter);
app.use('/api/messenger',messengerRoute);


databaseConnect();

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})