import React from 'react'
import { Route, Routes, Link, useNavigate } from 'react-router-dom'
import FacultyHome from './FacultyHome'
import ViewStudents from './ViewStudents'
import VerifyCertifications from './VerifyCertifications'
import UpdateFacultyProfile from './UpdateFacultyProfile'

export default function FacultyNavbar() {
    const navigate = useNavigate()

    const facultyLogout = () => {
        sessionStorage.removeItem("isFaculty")
        sessionStorage.removeItem("faculty")
        sessionStorage.removeItem("token")
        navigate("/facultylogin")
        window.location.reload()
    }

    return (
        <div>
            <nav className='navbar'>
                <span className="navbar-brand">Faculty Portal</span>
                <div className="navbar-links">
                    <Link to="/faculty/home">Dashboard</Link>
                    <Link to="/faculty/students">Assigned Students</Link>
                    <Link to="/faculty/verify">Review Certifications</Link>
                    <Link to="/faculty/profile">Profile</Link>
                    <button className="logout-btn" onClick={facultyLogout}>Logout</button>
                </div>
            </nav>
            <div className="content">
                <Routes>
                    <Route path="/faculty/home" element={<FacultyHome/>}/>
                    <Route path="/faculty/students" element={<ViewStudents/>}/>
                    <Route path="/faculty/verify" element={<VerifyCertifications/>}/>
                    <Route path="/faculty/profile" element={<UpdateFacultyProfile/>}/>
                    <Route path="*" element={<h3>Page Not Found</h3>}/>
                </Routes>
            </div>
        </div>
    )
}
