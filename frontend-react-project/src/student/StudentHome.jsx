import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function StudentHome() {
  const [certifications, setCertifications] = useState([])
  const [student, setStudent] = useState(null)
  const [error, setError] = useState("")
  
  // Edit form states
  const [editingCert, setEditingCert] = useState(null)
  const [editForm, setEditForm] = useState({
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
  const [editError, setEditError] = useState("")
  const [editMessage, setEditMessage] = useState("")
  const [editLoading, setEditLoading] = useState(false)

  useEffect(() => {
    const studentData = sessionStorage.getItem("student")
    if (studentData) {
      const parsed = JSON.parse(studentData)
      setStudent(parsed)
      fetchCertifications(parsed.id)
    }
  }, [])

  const fetchCertifications = async (studentId) => {
    try {
      const response = await axios.get(`http://localhost:1235/studentapi/certifications/${studentId}`)
      if (response.status === 200) {
        setCertifications(response.data)
      }
    } catch (err) {
      setError("Failed to fetch certifications history.")
    }
  }

  const handleDelete = async (certId) => {
    if (!student) return
    const confirm = window.confirm("Are you sure you want to delete this certification request?")
    if (!confirm) return

    try {
      const response = await axios.delete(`http://localhost:1235/studentapi/deletecertification/${certId}?studentId=${student.id}`)
      if (response.status === 200) {
        alert("Certification request deleted successfully.")
        fetchCertifications(student.id)
      }
    } catch (err) {
      alert(err.response?.data?.error || err.response?.data || "Failed to delete request.")
    }
  }

  const handleOpenEdit = (cert) => {
    setEditingCert(cert)
    setEditForm({
      category: cert.category,
      company: cert.company,
      title: cert.title,
      foundation: cert.foundation,
      examtype: cert.examtype,
      certificateid: cert.certificateid,
      issueddate: cert.issueddate,
      expirydate: cert.expirydate,
      certificateurl: cert.certificateurl
    })
    setEditError("")
    setEditMessage("")
  }

  const handleCloseEdit = () => {
    setEditingCert(null)
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditForm({ ...editForm, [name]: value })
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    setEditError("")
    setEditMessage("")
    if (!student || !editingCert) return

    setEditLoading(true)
    try {
      const payload = {
        ...editForm,
        studentId: student.id
      }
      const response = await axios.put(`http://localhost:1235/studentapi/updatecertification/${editingCert.id}`, payload)
      if (response.status === 200) {
        setEditMessage("Certification updated successfully!")
        setTimeout(() => {
          handleCloseEdit()
          fetchCertifications(student.id)
        }, 1200)
      }
    } catch (err) {
      setEditError(err.response?.data?.error || err.response?.data || "Failed to update certification.")
    } finally {
      setEditLoading(false)
    }
  }

  return (
    <div className="dashboard-container">
      {student && (
        <div className="dashboard-header">
          <div>
            <h2>Welcome, {student.name}!</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Track and manage your uploaded certification qualifications.</p>
          </div>
          <Link to="/student/upload" className="btn-primary" style={{ textDecoration: 'none' }}>
            + Upload New
          </Link>
        </div>
      )}

      {error && <p style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', padding: '10px', borderRadius: '8px' }}>{error}</p>}

      <div className="glass-card" style={{ marginTop: '1rem' }}>
        <h3>Your Certifications</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Category</th>
                <th>Provider</th>
                <th>Certificate ID</th>
                <th>Issued Date</th>
                <th>Mentor Remarks</th>
                <th>Status</th>
                <th>Link</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {certifications.length > 0 ? (
                certifications.map((c) => (
                  <tr key={c.id}>
                    <td>{c.id}</td>
                    <td style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{c.title}</td>
                    <td>{c.category}</td>
                    <td>{c.company}</td>
                    <td>{c.certificateid}</td>
                    <td>{c.issueddate}</td>
                    <td style={{ color: c.remarks ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                      {c.remarks || '-'}
                    </td>
                    <td>
                      <span className={`badge ${c.status.toLowerCase()}`}>
                        {c.status}
                      </span>
                    </td>
                    <td>
                      <a 
                        href={c.certificateurl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="badge approved" 
                        style={{ textDecoration: 'none' }}
                      >
                        View
                      </a>
                    </td>
                    <td>
                      {c.status.toUpperCase() === "SUBMITTED" ? (
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button 
                            onClick={() => handleOpenEdit(c)} 
                            className="badge" 
                            style={{ background: 'var(--primary-color)', color: 'white', border: 'none', cursor: 'pointer' }}
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDelete(c.id)} 
                            className="badge" 
                            style={{ background: 'var(--danger-color)', color: 'white', border: 'none', cursor: 'pointer' }}
                          >
                            Delete
                          </button>
                        </div>
                      ) : (
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Processed</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                    You haven't uploaded any certifications yet. Click "Upload New" above to start!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editingCert && (
        <div className="modal-overlay">
          <div className="modal-content glass-card" style={{ maxWidth: '650px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3>Edit Certification Request #{editingCert.id}</h3>
            
            {editMessage && <p style={{ color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '8px', borderRadius: '6px', textAlign: 'center' }}>{editMessage}</p>}
            {editError && <p style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', padding: '8px', borderRadius: '6px', textAlign: 'center' }}>{editError}</p>}

            <form onSubmit={handleEditSubmit} style={{ marginTop: '1.5rem' }}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Category</label>
                  <select name="category" value={editForm.category} onChange={handleEditChange} required>
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
                    value={editForm.company} 
                    onChange={handleEditChange} 
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
                    value={editForm.title} 
                    onChange={handleEditChange} 
                    required 
                  />
                </div>

                <div className="form-group">
                  <label>Foundation/Authority Name</label>
                  <input 
                    type="text" 
                    name="foundation" 
                    value={editForm.foundation} 
                    onChange={handleEditChange} 
                    required 
                  />
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Exam Type</label>
                  <select name="examtype" value={editForm.examtype} onChange={handleEditChange} required>
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
                    value={editForm.certificateid} 
                    onChange={handleEditChange} 
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
                    value={editForm.issueddate} 
                    onChange={handleEditChange} 
                    required 
                  />
                </div>

                <div className="form-group">
                  <label>Expiry Date</label>
                  <input 
                    type="date" 
                    name="expirydate" 
                    value={editForm.expirydate} 
                    onChange={handleEditChange} 
                    required 
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Certificate Verification URL / Credential URL</label>
                <input 
                  type="url" 
                  name="certificateurl" 
                  value={editForm.certificateurl} 
                  onChange={handleEditChange} 
                  required 
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '1.5rem' }}>
                <button 
                  type="submit" 
                  className="btn-primary" 
                  style={{ flex: 1 }}
                  disabled={editLoading}
                >
                  {editLoading ? "Saving..." : "Save Changes"}
                </button>
                <button 
                  type="button" 
                  className="btn-primary" 
                  style={{ flex: 1, background: '#475569', boxShadow: 'none' }}
                  onClick={handleCloseEdit}
                  disabled={editLoading}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
