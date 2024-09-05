const joi = require('joi')

const BlogValidation = (req,res,next)=>{
    const schema = joi.object({
        title:joi.string().min(3).max(30).required(),
        blogcontent:joi.string().min(6).max(100).required(),
        userId:joi.string().min(15).max(90).required(),
        username:joi.string().min(2).max(40).required()
    })
    const {error} = schema.validate(req.body)
    if (error) {
        res.status(400)
        .json({message:"bad request" , error})
    }
    next();
}

module.exports = {BlogValidation}