import React, { useEffect, useState } from "react";
import { getEditBlogbyId, RequestAcceptOrReject, UpdateBlogApi } from "../api/BlogApi";
import { useParams } from "react-router-dom";

const Request = () => {
  const getresData = () => {
    const resData = localStorage.getItem('resData')
    if (resData) {
      return JSON.parse(resData)
    } else {
      return {}
    }
  }
  
  const { id } = useParams();
  const [resData, setResData] = useState(getresData())
  const [blog, setBlog] = useState([]);
  useEffect(() => {
    const saveData = async () => {
      const data = await getEditBlogbyId(id);
      setBlog(data);
    };
    saveData();
  }, []);
 
  const handleAcceptorRejected = (id,isAccepted) => {
    RequestAcceptOrReject(id,isAccepted)
    if (isAccepted && blog.length !== 0) {
        console.log(blog);
        UpdateBlogApi(blog[blog.length-1].editData.blogId , blog[blog.length-1].editData.title ,blog[blog.length-1].editData.blogcontent , resData.id , resData.name , resData.jwtToken)
    }
  }
  
  return (
    <div className="req-main">
      <h1>all request</h1>
      {blog.map((item) => {
        if (!item.isCompleted) {
          return (
            <div key={blog._id} className="request">
              <h3>title: {item.editData.title}</h3>
              <label htmlFor="test">description: {item.editData.blogcontent}</label>
              <div>
                <button className="btn btn-success my-1" onClick={()=>handleAcceptorRejected(item._id,true)}>accept</button>
                <button className="btn btn-danger mx-2" onClick={()=>handleAcceptorRejected(item._id,false)}>reject</button>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Request;
