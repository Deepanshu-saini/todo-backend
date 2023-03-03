//this file will handel connection logic to the mongoDB Database.

const mongoose=require('mongoose');
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/TaskManager',{useNewUrlParser:true}).then(()=>{
    console.log("Connected to mongoDB successfully.");  
}).catch((e)=>{
    console.log("Error while attempting to estaiblish a connection with mongoDB");
    console.log(e);
});

//to prevent deprectation warning (from MongoDB native driver)
// mongoose.set('useCreateIndex',true);
// mongoose.set('useFindAndModify',false);
module.exports={
    mongoose
}