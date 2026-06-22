import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminLogin() {
  
  const navigate=useNavigate()


  const [formdata,setFormdata]=useState({
    username:"",
    password:""
  })

  function handleChange(e){
    // e is an event 

    //console.log(e.target.value)
    const{name,value}= e.target
    //formdata.username=value

    //righthand side data willl be assifned to lefthand side
    setFormdata({...formdata,[name]:value})
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
    try{
      const response = await axios.post("http://localhost:1235/adminapi/login",formdata)
      if(response.status==200){
        // alert("Login valid")
        sessionStorage.setItem("token", response.data.token)
        sessionStorage.setItem("isAdmin",true)
        navigate("/admin/home")
        window.location.reload()
      }else{
        alert("Login Fail")
      }

    }catch(err){
      alert(err.response.data)
    }
  }

  //login operation
  // function handleSubmit(){
  //   //alert(formdata)
  //   const response = axios.post("http://localhost:1235/adminapi/login",formdata)
  //   if(response.status)
  // }

  return (
    <div className="login-container">
        <h2 className="login-title">Admin Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
            <label>Username</label>
            <input type="text" name="username" onChange={handleChange} required/>
            </div>
            <br />
            <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" onChange={handleChange} required/>
            </div>
            <br />
            <button type="submit" className="login-btn" value="Login">Login</button>
        </form>
    </div>
  )
}
