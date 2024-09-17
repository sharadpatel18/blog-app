import React, { useEffect, useState } from 'react'
import sharadlaniya from '../assets/image.png'
import { useNavigate } from 'react-router-dom';
import { getAllBlog } from '../api/BlogApi';
const Home = () => {
  const getresData = () => {
    const resData = localStorage.getItem('resData')
    if (resData) {
      return JSON.parse(resData)
    } else {
      return {}
    }
  }
  
  const [resData, setResData] = useState(getresData())
  const [blogs, setblogs] = useState([])
  const [id , setId] = useState()
  const Navigate = useNavigate();

  useEffect(() => {
    const saveData = async () => {
      const data = await getAllBlog(resData.jwtToken)
      if (data) {
        setblogs(data)
      }else{
        alert('internal server error')
      }
    }
    saveData()
  }, [])


  return (
    <>
      <div className='home-main'>
        <div className='home-details'>
          {(Object.keys(resData).length != 0) ? <h1>hello Blogger {resData.name}</h1> : <h1>hello Blogger, name...</h1>}
          <p>In an age where information is constantly at our fingertips, it’s easy to feel overwhelmed. However, staying informed doesn’t have to be daunting. By focusing on a few key sources and trends, you can easily keep up with the latest developments in your field. In this blog, we’ll highlight essential insights and practical tips to help you navigate the ever-changing landscape with confidence and ease.</p>
          <button onClick={()=>Navigate('/myblog')}>add your things</button>
        </div>
      </div>
      <div className='blog-show'>
        <div className='details'>
          <div>
            <h1>about creater of this site</h1>
            <img src={sharadlaniya} alt="er" className='sharadimg' />
            <p>
              Sharad Laniya is an ambitious 18-year-old second-year computer engineering student at LDRP Institute of Technology and Research. With a keen interest in technology, Sharad is deeply immersed in the world of MERN stack development, honing skills in MongoDB, Express.js, React, and Node.js. Driven by a passion for coding and problem-solving, Sharad is dedicated to advancing in the tech field and contributing innovative solutions to the ever-evolving landscape of software development.</p>
          </div>
        </div>
        <div className='all-blogs'>
          <div className='all-output'>
            {(Object.keys(resData).length == 0) ? <h1>please login first</h1>:""}
            {
              blogs.map((item) => (
                <div key={item._id} className='home-div' onClick={()=>Navigate(`/${item._id}`)}>
                  <label htmlFor="username" className='username'>user: {item.username}</label>
                  <hr />
                  <label htmlFor="title" className='label'>{item.title}</label>
                  <p className='p'>{item.blogcontent}</p>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Home