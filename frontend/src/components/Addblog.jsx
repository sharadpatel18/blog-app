import React, { useEffect } from 'react'
import { useState } from 'react'
import Axios from 'axios'

const Addblog = ({resdata , editBlog , id , setUpdateUi , updateUi}) => {


    const [title , setTitle] = useState("")
    const [blogcontent, setBlogcontent] = useState("")
    const [userId , setuserId] = useState(resdata.id)
    const [username , setUsername] = useState(resdata.name)
    const [isEdited,setisEdited] = useState(false)
    const handleSubmit = () => {
        Axios.post('http://localhost:4000/blog/blogdata' , {title,blogcontent,userId , username})
        .then((res)=>console.log(res))
        .catch((err)=>console.log(err))
        setUpdateUi(true)
    }

    useEffect(()=>{
        if (Object.keys(editBlog).length !==0) {
           setTitle(editBlog.title)
           setBlogcontent(editBlog.blogcontent)
           setisEdited(true)
        }
        console.log(updateUi);
    },[editBlog])

    const handleUpdate =() =>{
        Axios.put(`http://localhost:4000/blog/blogdata/${id}`, {title,blogcontent,userId , username})
        .then((res)=>{
            console.log(res);
        })
        .catch((err)=>{
            console.log(err);
        })
        setUpdateUi(true)
    }


    return (
        <>
            <form className='form' onSubmit={(isEdited) ? handleUpdate : handleSubmit}>
                <div className='title'>
                    <label htmlFor="title">title</label>
                    <input type="text" placeholder='enter title' value={title} onChange={(e)=>setTitle(e.target.value)}/>
                </div>
                <div className='blogcontent'>
                    <label htmlFor="blogcontent">blogcontent</label>
                    <textarea cols="40" rows="6" placeholder='add blog content' value={blogcontent} onChange={(e)=>setBlogcontent(e.target.value)}></textarea>
                </div>
                <button className='btn btn-primary'>{(isEdited) ? "update" : "submit"}</button>
            </form>
        </>
    )
}

export default Addblog