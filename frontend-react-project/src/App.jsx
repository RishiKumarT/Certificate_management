import { BrowserRouter as Router } from "react-router-dom"
import { useEffect, useState } from "react";
import NavBar from "./pages/NavBar"
import AdminNavbar from "./admin/AdminNavbar"
import StudentNavbar from "./student/StudentNavbar"
import FacultyNavbar from "./faculty/FacultyNavbar"
import './App.css'

function App() {
  const[isAdmin,setisAdmin]=useState(false);
  const[isStudent,setisStudent]=useState(false);
  const[isFaculty,setisFaculty]=useState(false);

  useEffect(()=>{
    const adminStatus=sessionStorage.getItem("isAdmin")==="true"
    const studentStatus=sessionStorage.getItem("isStudent")==="true"
    const facultyStatus=sessionStorage.getItem("isFaculty")==="true"
    setisAdmin(adminStatus)
    setisStudent(studentStatus)
    setisFaculty(facultyStatus)
  },[])

  const getNavbar = () => {
    if (isAdmin) return <AdminNavbar />;
    if (isStudent) return <StudentNavbar />;
    if (isFaculty) return <FacultyNavbar />;
    return <NavBar />;
  };

  return (
    <div>
      <Router>
        {getNavbar()}
      </Router>
    </div>
  )
}

export default App
