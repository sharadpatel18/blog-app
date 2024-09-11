import React, { useEffect, useState } from 'react'
import { getBlogById } from '../api/BlogApi'
import { useParams , useNavigate } from 'react-router-dom'
const FullScreen = () => {

  const {id} = useParams();
  const [blog , setBlog] = useState([])
  const Navigate = useNavigate();
  
  useEffect(()=>{
      const saveData = async () => {
          const responce = await getBlogById(id)
          if (responce) {
            setBlog(responce)
          }else{
            alert('internal server error')
          }
        }
        saveData()
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
