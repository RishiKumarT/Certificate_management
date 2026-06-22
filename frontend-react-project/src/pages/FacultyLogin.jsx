import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function FacultyLogin() {
  
  const navigate=useNavigate()


  const [formdata,setFormdata]=useState({
    email:"",
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
      const response = await axios.post("http://localhost:1235/facultyapi/login",formdata)
      if(response.status==200){
        // alert("Login valid")
        sessionStorage.setItem("token", response.data.token)
        sessionStorage.setItem("isFaculty", true)
        sessionStorage.setItem("faculty", JSON.stringify(response.data))
        navigate("/faculty/home")
        window.location.reload()
      }else{
        alert("Login Fail")
      }

    }catch(err){
      alert(err.response?.data || "Login failed")
    }
  }

  //login operation
  // function handleSubmit(){
  //   //alert(formdata)
  //   const response = axios.post("http://localhost:1235/adminapi/login",formdata)
  //   if(response.status)
  // }

  return (
    <div className="login-container glass-card">
        <h2 className="login-title">Faculty Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
            <label>Gmail</label>
            <input type="text" name="email" onChange={handleChange} required/>
            </div>
            <br />
            <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" onChange={handleChange} required/>
            </div>
            <br />
            <button type="submit" className="login-btn" value="Login">Login</button>
            <div style={{ marginTop: '15px', textAlign: 'center' }}>
              <span style={{ color: '#94a3b8' }}>Forgot password? </span>
              <Link to="/forgot-password" style={{ color: '#6366f1', textDecoration: 'none' }}>Reset here</Link>
            </div>
        </form>
    </div>
  )
}
