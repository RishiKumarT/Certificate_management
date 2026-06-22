import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './admin.css'

export default function ViewAllFaculty() {
  const [data, setData] = useState([])
  const [error, setError] = useState("")

  const fetchFaculty = async () => {
    try {
      const response = await axios.get("http://localhost:1235/adminapi/viewallfaculty")
      if (response.status === 200) {
        setData(response.data)
      }
    } catch (err) {
      setError(err.message)
    }
  }

  useEffect(() => {
    fetchFaculty()
  }, [])
  
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h2>Faculty Mentors</h2>
          <p style={{ color: 'var(--text-secondary)' }}>View and audit all registered faculty details.</p>
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
              <th>Designation</th>
              <th>Salary (LPA)</th>
              <th>Email</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((faculty) => (
                <tr key={faculty.id}>
                  <td style={{ fontWeight: '600' }}>{faculty.id}</td>
                  <td style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{faculty.name}</td>
                  <td>{faculty.gender}</td>
                  <td>{faculty.department}</td>
                  <td>{faculty.designation}</td>
                  <td>{faculty.salary}</td>
                  <td>{faculty.email}</td>
                  <td>{faculty.contact}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                  No faculty mentors registered in the system yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
