import axios from 'axios'
import React, { useState } from 'react'
import './admin.css'

export default function AddStudent() {
  const [formdata, setFormData] = useState({
    id: "",
    name: "",
    gender: "",
    department: "",
    email: "",
    contact: "",
    password: ""
  })
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formdata, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("")
    setError("")
    setLoading(true)
    try {
      const response = await axios.post("http://localhost:1235/adminapi/addstudent", formdata)
      if (response.status === 201) {
        setMessage(response.data)
        setFormData({
          id: "",
          name: "",
          gender: "",
          department: "",
          email: "",
          contact: "",
          password: ""
        })
      }
    } catch (err) {
      setError(err.response?.data || err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="dashboard-container" style={{ maxWidth: '650px' }}>
      <div className="glass-card">
        <h2 className="text-center" style={{ marginBottom: '1.5rem', background: 'linear-gradient(to right, #6366f1, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Add Student Profile
        </h2>

        {message && <p style={{ color: '#10b981', textAlign: 'center', background: 'rgba(16, 185, 129, 0.1)', padding: '10px', borderRadius: '8px', marginBottom: '1.5rem' }}>{message}</p>}
        {error && <p style={{ color: '#ef4444', textAlign: 'center', background: 'rgba(239, 68, 68, 0.1)', padding: '10px', borderRadius: '8px', marginBottom: '1.5rem' }}>{error}</p>}

        <form className="add-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Student ID Number</label>
              <input 
                type="number" 
                name="id" 
                placeholder="e.g. 2100030045"
                value={formdata.id} 
                required 
                onChange={handleChange} 
              />
            </div>

            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                name="name" 
                placeholder="Enter student's name"
                value={formdata.name} 
                required 
                onChange={handleChange} 
              />
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Gender</label>
              <select name="gender" value={formdata.gender} required onChange={handleChange}>
                <option value="">-- Select Gender --</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div className="form-group">
              <label>Academic Department</label>
              <select name="department" value={formdata.department} required onChange={handleChange}>
                <option value="">-- Select Department --</option>
                <option value="CSE">Computer Science (CSE)</option>
                <option value="ECE">Electronics (ECE)</option>
                <option value="EEE">Electrical (EEE)</option>
                <option value="Others">Others</option>
              </select>
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Gmail Address</label>
              <input 
                type="email" 
                name="email" 
                placeholder="student@gmail.com"
                value={formdata.email} 
                required 
                onChange={handleChange} 
              />
            </div>

            <div className="form-group">
              <label>Contact Number</label>
              <input 
                type="number" 
                name="contact" 
                placeholder="Contact number"
                value={formdata.contact} 
                required 
                onChange={handleChange} 
              />
            </div>
          </div>

          <div className="form-group">
            <label>Login Password</label>
            <input 
              type="password" 
              name="password" 
              placeholder="Set initial password"
              value={formdata.password} 
              required 
              onChange={handleChange} 
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            style={{ width: '100%', marginTop: '1rem' }}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Student"}
          </button>
        </form>
      </div>
    </div>
  )
}
