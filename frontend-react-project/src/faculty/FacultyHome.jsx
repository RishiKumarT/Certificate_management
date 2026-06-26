import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function FacultyHome() {
  const [faculty, setFaculty] = useState(null)

  useEffect(() => {
    const facultyData = sessionStorage.getItem("faculty")
    if (facultyData) {
      setFaculty(JSON.parse(facultyData))
    }
  }, [])

  return (
    <div className="dashboard-container">
      {faculty && (
        <div className="glass-card text-center" style={{ padding: '3rem' }}>
          <h2>Faculty Mentor Dashboard</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '1rem', marginBottom: '2rem', lineHeight: '1.6' }}>
            Welcome back, Mentor <strong>{faculty.name}</strong>. Use the navigation links or quick action button below to manage your assigned student roster and review pending certification uploads.
          </p>
          
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <Link to="/faculty/verify" className="btn-primary" style={{ textDecoration: 'none' }}>
              Review Certifications
            </Link>
            <Link to="/faculty/students" className="btn-primary" style={{ textDecoration: 'none', background: 'transparent', border: '1px solid var(--border-color)' }}>
              Assigned Students
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
