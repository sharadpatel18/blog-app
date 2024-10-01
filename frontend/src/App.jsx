import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import MyBlog from "./components/PersonalBlog";
import FullScreen from './components/FullScreen';
import Addblog from './components/Addblog';
import ForgetPasswordComponent from './components/ForgetPassword';
import ResetPasswordComponent from './components/ResetPassword';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/myblog" element={<MyBlog />} />
            <Route path="/:id" element={<FullScreen/>} />
            <Route path={"/edit/:id"} element={<Addblog isNew={false}/>} />
            <Route path={"/new"} element={<Addblog isNew={true}/>} />
            <Route path={"/editreq/:id"} element={<Addblog isEditable={true}/>} />
            <Route path={'/forgetpassword'} element={<ForgetPasswordComponent/>}/>
            <Route path={'/resetpassword/:id'} element={<ResetPasswordComponent/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
