import React,{useState} from 'react'
import { Link, Outlet  } from 'react-router-dom'

const Navbar = () => {
    const getresData = () =>{
        const resData = localStorage.getItem('resData')
        if (resData) {
            return JSON.parse(resData)
        }else{
            return {}
        }
    }
    
    const [resData , setResData] = useState(getresData())
    const handleClick = () => {
        localStorage.setItem('resData' , JSON.stringify({}))
        window.location.reload();
      
    }
    return (
        <>
            <nav className="navbar">
                <div className="logo">
                  {(Object.keys(resData).length == 0 ) ? <Link to='/'>Blog app</Link> :   <Link to="/">hello, {resData.name}</Link>}
                </div>
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    {(Object.keys(resData).length === 0) ? <li><Link to="/signup">Signup/login</Link></li>  : <li><button style={{backgroundColor:"transparent" , color:"white" , border:"0px"}} onClick={handleClick}>sign out</button></li>}
                    <li><Link to="/myblog">My blog</Link></li>
                    <li><Link to={"/request/"+`${resData.id}`}>Request</Link></li>
                </ul>
                <div className="menu-toggle" id="menu-toggle">
                   &#9776;
                </div> 
            </nav>
        <Outlet />
        </>
    )
}

export default Navbar