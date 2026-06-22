import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

export default function AddCertification() {
  const navigate = useNavigate()
  const [student, setStudent] = useState(null)
  const [mentor, setMentor] = useState(null)
  const [checkingMentor, setCheckingMentor] = useState(true)
  const [formdata, setFormdata] = useState({
    category: "",
    company: "",
    title: "",
    foundation: "",
    examtype: "",
    certificateid: "",
    issueddate: "",
    expirydate: "",
    certificateurl: ""
  })
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const studentData = sessionStorage.getItem("student")
    if (studentData) {
      const parsedStudent = JSON.parse(studentData)
      setStudent(parsedStudent)
      checkMentor(parsedStudent.id)
    } else {
      navigate("/studentlogin")
    }
  }, [navigate])

  const checkMentor = async (studentId) => {
    try {
      const response = await axios.get(`http://localhost:1235/studentapi/mentor/${studentId}`)
      if (response.data && response.data.id) {
        setMentor(response.data)
      }
    } catch (err) {
      console.warn("Could not check mentor details", err.message)
    } finally {
      setCheckingMentor(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormdata({ ...formdata, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("")
    setError("")
    if (!student) return
    if (!mentor) {
      setError("No mentor assigned. You cannot submit this certification.")
      return
    }

    setLoading(true)
    try {
      const payload = {
        ...formdata,
        studentId: student.id
      }
      const response = await axios.post("http://localhost:1235/studentapi/uploadcertification", payload)
      if (response.status === 201) {
        setMessage("Certification uploaded successfully! Redirecting...")
        setTimeout(() => {
          navigate("/student/home")
        }, 1500)
      }
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data || "Failed to upload certification.")
    } finally {
      setLoading(false)
    }
  }

  if (checkingMentor) {
    return (
      <div className="dashboard-container text-center" style={{ marginTop: '5rem' }}>
        <h3>Verifying mentor status...</h3>
      </div>
    )
  }

  return (
    <div className="dashboard-container" style={{ maxWidth: '750px' }}>
      {!mentor ? (
        <div className="glass-card" style={{ border: '1px solid var(--danger-color)', background: 'rgba(239, 68, 68, 0.05)', textAlign: 'center', padding: '3rem' }}>
          <h2 style={{ color: 'var(--danger-color)', marginBottom: '1rem' }}>Mentor Assignment Required</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2rem' }}>
            You have not been assigned to a Faculty Mentor yet. Under current guidelines, you cannot upload certifications until the administrator maps you to a faculty reviewer.
          </p>
          <Link to="/student/home" className="btn-primary" style={{ textDecoration: 'none' }}>
            Back to Dashboard
          </Link>
        </div>
      ) : (
        <div className="glass-card">
          <h2 className="text-center" style={{ marginBottom: '0.5rem', background: 'linear-gradient(to right, #6366f1, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Upload New Certification
          </h2>
          <p className="text-center" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2rem' }}>
            Mentored by: <strong style={{ color: 'var(--text-primary)' }}>{mentor.name}</strong> ({mentor.department})
          </p>

          {message && <p style={{ color: '#10b981', textAlign: 'center', background: 'rgba(16, 185, 129, 0.1)', padding: '10px', borderRadius: '8px', marginBottom: '1.5rem' }}>{message}</p>}
          {error && <p style={{ color: '#ef4444', textAlign: 'center', background: 'rgba(239, 68, 68, 0.1)', padding: '10px', borderRadius: '8px', marginBottom: '1.5rem' }}>{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Category</label>
                <select name="category" value={formdata.category} onChange={handleChange} required>
                  <option value="">-- Choose Category --</option>
                  <option value="Cloud Computing">Cloud Computing</option>
                  <option value="Software Engineering">Software Engineering</option>
                  <option value="Data Science & AI">Data Science & AI</option>
                  <option value="Cyber Security">Cyber Security</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              <div className="form-group">
                <label>Provider Company / Organization</label>
                <input 
                  type="text" 
                  name="company" 
                  placeholder="e.g. AWS, Google, Microsoft, Oracle" 
                  value={formdata.company} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Certification Title</label>
                <input 
                  type="text" 
                  name="title" 
                  placeholder="e.g. Cloud Practitioner, Java SE Developer" 
                  value={formdata.title} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="form-group">
                <label>Foundation/Authority Name</label>
                <input 
                  type="text" 
                  name="foundation" 
                  placeholder="e.g. Coursera, edX, Pearson VUE" 
                  value={formdata.foundation} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Exam Type</label>
                <select name="examtype" value={formdata.examtype} onChange={handleChange} required>
                  <option value="">-- Choose Exam Type --</option>
                  <option value="MCQ Only">MCQ Only</option>
                  <option value="Practical Lab Only">Practical Lab Only</option>
                  <option value="MCQ and Practical">MCQ and Practical</option>
                  <option value="Project Assessment">Project Assessment</option>
                </select>
              </div>

              <div className="form-group">
                <label>Certificate ID / Verification ID</label>
                <input 
                  type="text" 
                  name="certificateid" 
                  placeholder="Unique Certificate Identification Number" 
                  value={formdata.certificateid} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Issued Date</label>
                <input 
                  type="date" 
                  name="issueddate" 
                  value={formdata.issueddate} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="form-group">
                <label>Expiry Date</label>
                <input 
                  type="date" 
                  name="expirydate" 
                  value={formdata.expirydate} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <label>Certificate Verification URL / Credential URL</label>
              <input 
                type="url" 
                name="certificateurl" 
                placeholder="e.g. https://www.credly.com/badges/your-badge-id" 
                value={formdata.certificateurl} 
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
              {loading ? "Uploading..." : "Upload Certification"}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
