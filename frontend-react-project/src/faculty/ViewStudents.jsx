import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function ViewStudents() {
  const [students, setStudents] = useState([])
  const [faculty, setFaculty] = useState(null)
  const [error, setError] = useState("")

  useEffect(() => {
    const facultyData = sessionStorage.getItem("faculty")
    if (facultyData) {
      const parsed = JSON.parse(facultyData)
      setFaculty(parsed)
      fetchStudents(parsed.id)
    }
  }, [])

  const fetchStudents = async (facultyId) => {
    try {
      const response = await axios.get(`http://localhost:1235/facultyapi/assignedstudents/${facultyId}`)
      if (response.status === 200) {
        setStudents(response.data)
      }
    } catch (err) {
      setError("Failed to fetch assigned students list.")
    }
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h2>Assigned Students</h2>
          <p style={{ color: 'var(--text-secondary)' }}>List of students assigned to you for mentoring and certification verification.</p>
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
            {students.length > 0 ? (
              students.map((student) => (
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
                  No students assigned to you by Admin yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
