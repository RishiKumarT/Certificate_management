import React from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import AdminLogin from './AdminLogin'
import './style.css'
import StudentLogin from './StudentLogin'
import FacultyLogin from './FacultyLogin'
import ForgotPassword from './ForgotPassword'

export default function NavBar() {
  return (
    <div>
      <nav className="navbar" >
        <span className="navbar-brand">Certification Portal</span>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="about">About</Link>
          <Link to="adminlogin">Admin Login</Link>
          <Link to="facultylogin">Faculty Login</Link>
          <Link to="studentlogin">Student Login</Link> 
        </div>
      </nav>
      <div className="content">
        <Routes>
            <Route path="/" element={<h2 style={{textAlign: 'center', marginTop: '3rem'}}>Welcome to the Student Certification Verification Portal</h2>}      />
            <Route path="/about" element={<div className="glass-card" style={{maxWidth: '600px', margin: '3rem auto'}}><h2 className="text-center">About</h2><p style={{color: 'var(--text-secondary)'}}>This system allows students to upload their technical certifications and permits faculty mentors to review, verify, and grade/remark them directly in a unified portal.</p></div>}      />
            <Route path="/contact" element={<h2>Contact Page</h2>}      />
            <Route path="search" element={<h3>Search Page</h3>}      />
            
            <Route path="adminlogin" element={<AdminLogin/>}/>
            <Route path="facultylogin" element={<FacultyLogin/>}/>
            <Route path="studentlogin" element={<StudentLogin/>}/>
            <Route path="forgot-password" element={<ForgotPassword/>}/>
        
            <Route path="*" element={<h3>Page Not Found</h3>}      />
  
        </Routes>
      </div>
    </div>
  )
}
