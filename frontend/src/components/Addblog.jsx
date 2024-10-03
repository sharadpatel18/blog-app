import React, { useEffect } from 'react'
import { useState } from 'react'
import {useNavigate , useParams } from 'react-router-dom'
import { AddBlogApi  , getUpdateBlogApi , ReqToEdit, UpdateBlogApi} from '../api/BlogApi'
const Addblog = ({ isNew  , isEditable}) => {
    const getresData = () => {
        const resdata = localStorage.getItem('resData')
        if (resdata) {
            return JSON.parse(resdata)
        } else {
            return {}
        }
    }
    const { id } = useParams();
    const Navigate = useNavigate();
    const [resdata, setResdata] = useState(getresData());
    const [title, setTitle] = useState('')
    const [blogcontent, setBlogcontent] = useState('')
    const [userId, setuserId] = useState(resdata.id)
    const [username, setUsername] = useState(resdata.name)
    const [editData, setEditData] = useState([])
    const [isEdited, setisEdited] = useState(false)
    const handleSubmit = () => {
        AddBlogApi(title , blogcontent , userId , username , resdata.jwtToken)
    }
    const handleAddreq= () =>{
       ReqToEdit(resdata.id , editData.userId , {blogId:id , title:title , blogcontent:blogcontent} , resdata.jwtToken)
       Navigate('/')
    } 
    const handleUpdate = (e) => {
        e.preventDefault()
    
        if (!isNew) {
           UpdateBlogApi(id , title , blogcontent , userId , username , resdata.jwtToken)
           Navigate("/myblog")
        }
    }
    
    if (isEditable) {
        useEffect(() => {
            const saveData = async () => {
                const data = await getUpdateBlogApi(id , resdata.jwtToken)
                setEditData(data)  
                
            }
            saveData()
        }, [id])

        useEffect(() => {
            setTitle(editData.title)
            setBlogcontent(editData.blogcontent)
            setisEdited(true)
        }, [editData])
    }else{
        if (!isNew) {
            useEffect(() => {
                const saveData = async () => {
                    const data = await getUpdateBlogApi(id , resdata.jwtToken)
                    setEditData(data)
                    setisEdited(true)
                }
                saveData()
            }, [id])
            
            useEffect(() => {
                setTitle(editData.title)
                setBlogcontent(editData.blogcontent)
                setisEdited(true)
            }, [editData])
         
        }
    }
    return (
        <div className='addblog-main'>
            <div className='addblog-container'>
                <form className='form' onSubmit={(isEditable) ? handleAddreq : (isEdited) ? handleUpdate : handleSubmit}>
                    <div className='title'>
                        <label htmlFor="title">title</label>
                        <input type="text" placeholder='enter title' value={title || ""} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className='blogcontent'>
                        <label htmlFor="blogcontent">blogcontent</label>
                        <textarea cols="40" rows="6" placeholder='add blog content' value={blogcontent || ""} onChange={(e) => setBlogcontent(e.target.value)}></textarea>
                    </div>
                    <button className='btn btn-primary'>{(isEditable) ?"send request":(isEdited) ? "update" : "submit" }</button>
                </form>
            </div>
        </div>
    )
}

export default Addblog