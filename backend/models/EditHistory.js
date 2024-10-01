const { ref } = require('joi')
const mongoose = require('mongoose')

const EditSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    recieverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    editData:{
        blogId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"BlogData"
        },
        title:{
            type:String
        },
        blogcontent:{
            type:String
        },

    },
    isCompleted:{
        type:Boolean
    },
    isAccepted:{
        type:Boolean
    }
},{timestamps:true})

const EditHistory = mongoose.model("EditHistory" , EditSchema)
module.exports = EditHistory