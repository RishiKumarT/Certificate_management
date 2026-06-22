import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function UpdateFacultyProfile() {
  const navigate = useNavigate()
  const [faculty, setFaculty] = useState(null)
  const [formdata, setFormdata] = useState({
    name: "",
    contact: "",
    password: "",
    confirmPassword: ""
  })
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const facultyData = sessionStorage.getItem("faculty")
    if (facultyData) {
      const parsed = JSON.parse(facultyData)
      setFaculty(parsed)
      setFormdata({
        name: parsed.name,
        contact: parsed.contact,
        password: parsed.password,
        confirmPassword: parsed.password
      })
    } else {
      navigate("/facultylogin")
    }
  }, [navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormdata({ ...formdata, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("")
    setError("")
    if (formdata.password !== formdata.confirmPassword) {
      setError("Passwords do not match!")
      return
    }
    setLoading(true)
    try {
      const payload = {
        id: faculty.id,
        name: formdata.name,
        contact: formdata.contact,
        password: formdata.password
      }
      const response = await axios.put("http://localhost:1235/facultyapi/updateprofile", payload)
      if (response.status === 200) {
        setMessage("Profile updated successfully!")
        // Update local session storage
        sessionStorage.setItem("faculty", JSON.stringify(response.data))
        setFaculty(response.data)
      }
    } catch (err) {
      setError(err.response?.data || "Failed to update profile.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="dashboard-container" style={{ maxWidth: '600px' }}>
      <div className="glass-card profile-card">
        <div className="profile-avatar">
          {faculty ? faculty.name.charAt(0).toUpperCase() : "F"}
        </div>
        <h2 className="text-center" style={{ marginBottom: '1.5rem', background: 'linear-gradient(to right, #6366f1, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Your Profile
        </h2>

        {message && <p style={{ color: '#10b981', textAlign: 'center', background: 'rgba(16, 185, 129, 0.1)', padding: '10px', borderRadius: '8px', marginBottom: '1.5rem' }}>{message}</p>}
        {error && <p style={{ color: '#ef4444', textAlign: 'center', background: 'rgba(239, 68, 68, 0.1)', padding: '10px', borderRadius: '8px', marginBottom: '1.5rem' }}>{error}</p>}

        {faculty && (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Faculty Mentor ID</label>
              <input type="text" value={faculty.id} disabled style={{ opacity: 0.6, cursor: 'not-allowed' }} />
            </div>

            <div className="form-group">
              <label>Gmail Address</label>
              <input type="email" value={faculty.email} disabled style={{ opacity: 0.6, cursor: 'not-allowed' }} />
            </div>

            <div className="form-group">
              <label>Department / Designation</label>
              <input type="text" value={`${faculty.department} - ${faculty.designation}`} disabled style={{ opacity: 0.6, cursor: 'not-allowed' }} />
            </div>

            <div className="form-group">
              <label>Salary (LPA / INR)</label>
              <input type="text" value={faculty.salary} disabled style={{ opacity: 0.6, cursor: 'not-allowed' }} />
            </div>

            <hr style={{ border: 'none', borderBottom: '1px solid var(--card-border)', margin: '1.5rem 0' }} />

            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                name="name" 
                value={formdata.name} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="form-group">
              <label>Contact Number</label>
              <input 
                type="text" 
                name="contact" 
                value={formdata.contact} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="form-group">
              <label>New Password</label>
              <input 
                type="password" 
                name="password" 
                value={formdata.password} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input 
                type="password" 
                name="confirmPassword" 
                value={formdata.confirmPassword} 
                onChange={handleChange} 
                required 
              />
            </div>

            <button 
              type="submit" 
              className="btn-primary" 
              style={{ width: '100%', marginTop: '1rem' }}
              disabled={loading}
            >
              {loading ? "Saving Changes..." : "Update Profile"}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
