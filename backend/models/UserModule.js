const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/BlogApp")
.then(()=>{
    console.log('database is connected successfully')
})
.catch((err)=>{
    console.log("err: ",err);
})

const userSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
})

const User = mongoose.model('User' , userSchema);
module.exports = User;