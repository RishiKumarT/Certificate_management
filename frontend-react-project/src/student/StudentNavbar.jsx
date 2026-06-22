import React from 'react'
import { Route, Routes, Link, useNavigate } from 'react-router-dom'
import StudentHome from './StudentHome'
import AddCertification from './AddCertification'
import UpdateStudentProfile from './UpdateStudentProfile'

export default function StudentNavbar() {
    const navigate = useNavigate()

    const studentLogout = () => {
        sessionStorage.removeItem("isStudent")
        sessionStorage.removeItem("student")
        sessionStorage.removeItem("token")
        navigate("/studentlogin")
        window.location.reload()
    }

    return (
        <div>
            <nav className='navbar'>
                <span className="navbar-brand">Student Portal</span>
                <div className="navbar-links">
                    <Link to="/student/home">Dashboard</Link>
                    <Link to="/student/upload">Upload Certification</Link>
                    <Link to="/student/profile">Profile</Link>
                    <button className="logout-btn" onClick={studentLogout}>Logout</button>
                </div>
            </nav>
            <div className="content">
                <Routes>
                    <Route path="/student/home" element={<StudentHome/>}/>
                    <Route path="/student/upload" element={<AddCertification/>}/>
                    <Route path="/student/profile" element={<UpdateStudentProfile/>}/>
                    <Route path="*" element={<h3>Page Not Found</h3>}/>
                </Routes>
            </div>
        </div>
    )
}
