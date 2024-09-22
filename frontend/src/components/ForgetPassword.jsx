import React, { useState } from 'react'
import { ForgetPassword } from '../api/AuthApi';
const ForgetPasswordComponent = () => {
  const [email , setEmail] = useState('');
  const handleClick = (e) => {
    ForgetPassword(email)
  }
  return (
    <div>
      <div className='main'>
        <div className='fp-container'>
          <div className="mb-3">
            <h4>Forget password</h4>
            <hr />
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button className='btn btn-primary' onClick={handleClick}>submit now</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgetPasswordComponent
