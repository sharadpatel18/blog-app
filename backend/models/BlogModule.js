const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title:{
        type:String
    },
    blogcontent:{
        type:String
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    username:{
        type: mongoose.Schema.Types.String,
        ref: "User",
    }
})

const BlogData = mongoose.model('BlogData' , BlogSchema);
module.exports = BlogData;