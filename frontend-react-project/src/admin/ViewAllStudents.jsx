import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './admin.css'

export default function ViewAllStudents() {
  const [data, setData] = useState([])
  const [error, setError] = useState("")

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:1235/adminapi/viewallstudents")
      if (response.status === 200) {
        setData(response.data)
      }
    } catch (err) {
      setError(err.message)
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])
  
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h2>Student Records</h2>
          <p style={{ color: 'var(--text-secondary)' }}>View and audit all registered student details.</p>
        </div>
      </div>

      {error && <p style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', padding: '10px', borderRadius: '8px' }}>{error}</p>}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Department</th>
              <th>Email</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((student) => (
                <tr key={student.id}>
                  <td style={{ fontWeight: '600' }}>{student.id}</td>
                  <td style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{student.name}</td>
                  <td>{student.gender}</td>
                  <td>{student.department}</td>
                  <td>{student.email}</td>
                  <td>{student.contact}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                  No students registered in the system yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
