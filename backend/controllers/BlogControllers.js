const BlogModule = require('../models/BlogModule')

const Blog = (req,res) => {
  try {
    const {title , blogcontent , userId , username} = req.body;
    const blog =  new BlogModule({title,blogcontent,userId , username})
    blog.save()
    res.status(203)
        .json({message:"blog is saved in database" , success:true})
  } catch (error) {
    res.status(500)
    .json({
        message: "internal server error",
        success: false
    })
    console.log(error);
  }
}

module.exports = {Blog};