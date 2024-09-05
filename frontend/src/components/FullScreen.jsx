import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { useParams , useNavigate } from 'react-router-dom'
const FullScreen = () => {
  const [blog , setBlog] = useState([])
  const {id} = useParams();
  const Navigate = useNavigate();
  useEffect(()=>{
    Axios.get(`http://localhost:4000/blog/clickedblog/${id}`)
        .then((res)=>{
          setBlog(res.data)
        })
    },[])
   
    const handleClick =() =>{
      Navigate('/')
    }

  return (
   <>
    {
      blog.map((item)=>(
        <div className='full-main' key={item._id}>
        <div className='full-container'>
          <div className='full-heading'>
            <h1>{item.title}</h1>
            <button onClick={handleClick}>X</button>
          </div>
            <p>{item.blogcontent}</p>
        </div>
    </div>
      ))
    }
   </>
  )
}

export default FullScreen
