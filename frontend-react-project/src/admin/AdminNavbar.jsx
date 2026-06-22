import React from 'react'
import { Route, Routes, Link, useNavigate } from 'react-router-dom'
import AdminHome from './AdminHome'
import ViewAllStudents from './ViewAllStudents'
import AddStudent from './AddStudent'
import AddFaculty from './AddFaculty'
import ViewAllFaculty from './ViewAllFaculty'
import AssignStudent from './AssignStudent'
import ViewAllCertifications from './ViewAllCertifications'
import './admin.css'

export default function AdminNavbar() {
    const navigate=useNavigate()

    const adminLogout=()=>{
        sessionStorage.removeItem("isAdmin")
        sessionStorage.removeItem("token")
        navigate("/adminlogin")
        window.location.reload()
    }
  return (
    <div>
        <nav className='navbar'>
            <span className="navbar-brand">Admin Portal</span>
            <div className="navbar-links">
                <Link to="/admin/home">Dashboard</Link>
                <Link to="/admin/addstudent">Add Student</Link>
                <Link to="/admin/viewallstudents">Students List</Link>
                <Link to="/admin/addfaculty">Add Faculty</Link>
                <Link to="/admin/viewallfaculty">Faculty List</Link>
                <Link to="/admin/assign">Assign Mentors</Link>
                <Link to="/admin/certifications">All Certifications</Link>
                <button className="logout-btn" onClick={adminLogout}>Logout</button>
            </div>
        </nav>
        <div className="content">
            <Routes>
                <Route path="/admin/home" element={<AdminHome/>}/>
                <Route path="/admin/addstudent" element={<AddStudent/>}/>
                <Route path="/admin/viewallstudents" element={<ViewAllStudents/>}/>
                <Route path="/admin/addfaculty" element={<AddFaculty/>}/>
                <Route path="/admin/viewallfaculty" element={<ViewAllFaculty/>}/>
                <Route path="/admin/assign" element={<AssignStudent/>}/>
                <Route path="/admin/certifications" element={<ViewAllCertifications/>}/>
                <Route path="*" element={<h3>Page Not Found</h3>}/>
            </Routes>
        </div>
    </div>
  )
}
