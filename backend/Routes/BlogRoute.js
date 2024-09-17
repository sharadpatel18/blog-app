const {Blog} = require('../controllers/BlogControllers');
const { BlogValidation } = require('../middlewares/BlogValidation');
const BlogModule = require('../models/BlogModule')
const {Authentication} = require('../middlewares/Auth')
const router = require('express').Router();

router.post('/blogdata' , BlogValidation , Blog);

router.get('/public/blogdata', Authentication , async(req,res)=>{
    const blogdata = await BlogModule.find({})
    res.send(blogdata)
})

router.get('/blogdata/:id' , async (req,res)=>{
    const {id} = req.params;
    const myblog = await BlogModule.find({userId:id})
    res.send(myblog)
})

router.put('/blogdata/:id' , Authentication ,async(req,res)=>{
    const {id} = req.params;
    const task = req.body;
  
    const updateTask = await BlogModule.findByIdAndUpdate(id , task)
    .then(()=>{
        res.status(201)
            .json({message:"successfully updated"});
    })
    .catch((error)=>{
        console.log(error);
        res.send({error:error , message:"error this is not updated"})
    })
})

router.delete('/blogdata/:id' , Authentication ,(req,res)=>{
    const {id} = req.params;
    const deleteTask = BlogModule.findByIdAndDelete(id)
    .then(()=>{
        res.send("successfully deleted");
    })
    .catch((error)=>{
        console.log(error);
        res.send({error:error , message:"error this is not deleted"})
    })
})

router.get('/clickedblog/:id'  ,async(req,res)=>{
    const {id} = req.params;
    const blog = await BlogModule.find({_id:id})
    res.send(blog)
})

module.exports = router