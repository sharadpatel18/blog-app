import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import Addblog from './Addblog'
import { useNavigate } from 'react-router-dom'
const Blogadd = () => {
  const getId = () => {
    const resdata = localStorage.getItem('resData')
    if (resdata) {
      return JSON.parse(resdata)
    } else {
      return {}
    }
  }

  const [resdata, setResdata] = useState(getId());
  const [response, setResponse] = useState([]);
  const [editBlog , setEditBlog] = useState({});
  const [id,setId] = useState(null)
  const [updateUi , setUpdateUi] = useState(false)
  const Navigate = useNavigate()
  useEffect(() => {
    console.log(resdata.id);
    if (Object.keys(resdata).length != 0) {
      Axios.get(`http://localhost:4000/blog/blogdata/${resdata.id}`)
        .then((res) => {
          setResponse(res.data)
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [updateUi])

  const handleEdit = (id) => {
    const blogIndex = response.findIndex((item)=>{
      return item._id == id
    })
    setId(id)
    setUpdateUi(true)
    setEditBlog(response[blogIndex])
    Navigate(`/edit/${id}`)
    console.log(id);
  }
  
  const handleDelete = (id) => {
        Axios.delete(`http://localhost:4000/blog/blogdata/${id}`)
        .then((res)=>console.log(res))
        .catch((err)=>console.log(err))
        setUpdateUi(true)
  }

  const handleAdd = () => {
    Navigate('/new')
  }

  return (
    <>
      <div className='myblog-main'>
      
        <div className='add-btn'>
          <button className='btn btn-primary' onClick={handleAdd}>add blog</button>
        </div>
        <div className='myblog-container-2'>
          {(Object.keys(response).length == 0) ? <h2>add blog</h2>:""}
          <ul>
            {
              response.map((item) => (
                <li key={item._id} className='li' >
                  <div>
                    <label className='label'>{item.title}</label>
                    <p className='p'>{item.blogcontent}</p>
                    <div>
                      <button className='btn btn-primary mx-3' onClick={()=>Navigate(`/${item._id}`)}>read more</button>
                      <button className='btn btn-success edit' onClick={()=>handleEdit(item._id)}>edit</button>
                      <button className='btn btn-danger' onClick={()=>handleDelete(item._id)}>delete</button>
                    </div>
                  </div>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </>
  )
}

export default Blogadd
