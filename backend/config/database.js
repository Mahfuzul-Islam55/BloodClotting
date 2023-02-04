const mongoose=require('mongoose');

const databaseConnect=()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        //useCreateIndex:true
    }).then(()=>{
        console.log("MongoDB Database successfully connected.");
    }).catch(error=>{
        console.log(error);
    });
}
module.exports=databaseConnect;