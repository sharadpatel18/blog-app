import React, { useEffect, useState } from 'react'
import anime from '../assets/UQ3O9WA6.png'
import { LoginApi } from '../api/AuthApi'
import { Link  } from 'react-router-dom'
const Login = () => {
  const getresData = () => {
    const getData = localStorage.getItem('resData')
    if (getData) {
      return JSON.parse(getData)
    } else {
      return {}
    }
  }
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [resData, setResData] = useState(getresData())
  const handleSubmit = (e) => {
    e.preventDefault();
    const saveData = async () => {
      const data = await LoginApi(email,password) 
      setResData(data)
      window.location.reload();
    }
    saveData()
  }

  
  useEffect(() => {
    localStorage.setItem('resData', JSON.stringify(resData))
  }, [resData])
  return (
    <>
      <div className="main">
        <div className='signup-container'>

          <form onSubmit={handleSubmit} className='signup-form'>
            <h3>Login</h3>
            <hr />
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            <Link to='/forgetpassword' className='mx-2'>forget password</Link>
          </form>
          <div className='signup-black'>
            <img src={anime} alt='err' className='signup-img' />
          </div>
        </div>
      </div>
    </>
  )
}

export default Login