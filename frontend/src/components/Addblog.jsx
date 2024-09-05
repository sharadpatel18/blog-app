import React, { useEffect } from 'react'
import { useState } from 'react'
import Axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
const Addblog = ({ isNew }) => {
    const getresData = () => {
        const resdata = localStorage.getItem('resData')
        if (resdata) {
            return JSON.parse(resdata)
        } else {
            return {}
        }
    }
    const { id } = useParams();
    console.log(id);
    const Navigate = useNavigate();
    const [resdata, setResdata] = useState(getresData());
    const [title, setTitle] = useState('')
    const [blogcontent, setBlogcontent] = useState('')
    const [userId, setuserId] = useState(resdata.id)
    const [username, setUsername] = useState(resdata.name)
    const [editData, setEditData] = useState({})
    const [isEdited, setisEdited] = useState(false)
    const handleSubmit = () => {
        Axios.post('http://localhost:4000/blog/blogdata', { title, blogcontent, userId, username })
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }


    console.log(id);
    if (!isNew) {
        useEffect(() => {
            Axios.get(`http://localhost:4000/blog/clickedblog/${id}`)
            .then((res) => {
                setEditData(res.data[0])
                setisEdited(true)
                })
                .catch((err) => {
                    console.log(err);
                })
        }, [id])

        useEffect(() => {
            setTitle(editData.title)
            setBlogcontent(editData.blogcontent)
            setisEdited(true)
        }, [editData])
        
    }
        const handleUpdate = (e) => {
        e.preventDefault()
        console.log(id, userId);
        if (!isNew) {
            Axios.put(`http://localhost:4000/blog/blogdata/${id}`, { title, blogcontent, userId, username })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
        Navigate("/myblog")
        }
    }



    return (
        <div className='addblog-main'>
            <div className='addblog-container'>
                <form className='form' onSubmit={(isEdited) ? handleUpdate : handleSubmit}>
                    <div className='title'>
                        <label htmlFor="title">title</label>
                        <input type="text" placeholder='enter title' value={title || ""} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className='blogcontent'>
                        <label htmlFor="blogcontent">blogcontent</label>
                        <textarea cols="40" rows="6" placeholder='add blog content' value={blogcontent || ""} onChange={(e) => setBlogcontent(e.target.value)}></textarea>
                    </div>
                    <button className='btn btn-primary'>{(isEdited) ? "update" : "submit"}</button>
                </form>
            </div>
        </div>
    )
}

export default Addblog