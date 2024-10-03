import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { EditHistory } from '../api/BlogApi';

const History = () => {
    const getresData = () => {
        const resData = localStorage.getItem('resData')
        if (resData) {
          return JSON.parse(resData)
        } else {
          return {}
        }
      }
      
      const [resData, setResData] = useState(getresData())
    const {id} = useParams();
    const [blog,setBlog] = useState([])
    useEffect(()=>{
        const saveData = async () => {
            const data = await EditHistory(id , resData.jwtToken)
            setBlog(data)
            console.log(blog);
            
        }
        saveData()
    },[])
  if (blog.length !== 0) {
    console.log(blog[1].editData);
    
  }
  return (
    <>
        <div className='history-main'>
            <div className='history-container'>
                {
                    blog.map((item)=>(
                        <div className='history' key={item._id}>
                            <label htmlFor="time">time:{item.updatedAt}</label>
                            <hr />
                           <h3>title: {item.editData.title}</h3>
                           <label htmlFor='time'>blogcontent: {item.editData.blogcontent}</label>
                        </div>
                    ))
                }
            </div>
        </div>  
    </>
  )
}

export default History