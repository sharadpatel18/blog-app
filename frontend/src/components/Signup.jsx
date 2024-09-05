import React, { useState } from 'react'
import Axios from 'axios'
import anime from '../assets/UQ3O9WA6.png'
import { Link  , useNavigate} from 'react-router-dom'
const Signup = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const Navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post("http://localhost:4000/auth/signup", { name, email, password })
            .then((res) => {
                console.log(res);
                alert('signup successfully')
                Navigate('/login')
            })
            .catch((err) => {
                console.log(err);
            })

    }
    return (
        <>
            <div className="main">
                <div className='signup-container'>
                    <form onSubmit={handleSubmit} className='signup-form'>
                        <h3>Signup</h3>
                        <hr />
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">name</label>
                            <input type="text" className="form-control" aria-describedby="emailHelp" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <Link to='/login' className='mx-3'>login</Link>
                    </form>
                    <div className='signup-black'>
                        <img src={anime} alt='err' className='signup-img'/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup
