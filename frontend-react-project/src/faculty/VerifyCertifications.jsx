import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function VerifyCertifications() {
  const [certifications, setCertifications] = useState([])
  const [faculty, setFaculty] = useState(null)
  const [selectedCert, setSelectedCert] = useState(null)
  const [reviewStatus, setReviewStatus] = useState("APPROVED")
  const [remarks, setRemarks] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const facultyData = sessionStorage.getItem("faculty")
    if (facultyData) {
      const parsed = JSON.parse(facultyData)
      setFaculty(parsed)
      fetchCertifications(parsed.id)
    }
  }, [])

  const fetchCertifications = async (facultyId) => {
    try {
      const response = await axios.get(`http://localhost:1235/facultyapi/studentcertifications/${facultyId}`)
      if (response.status === 200) {
        setCertifications(response.data)
      }
    } catch (err) {
      setError("Failed to fetch student certifications.")
    }
  }

  const handleOpenReview = (cert) => {
    setSelectedCert(cert)
    setReviewStatus(cert.status === "SUBMITTED" ? "APPROVED" : cert.status)
    setRemarks(cert.remarks || "")
    setMessage("")
    setError("")
  }

  const handleCloseReview = () => {
    setSelectedCert(null)
    setRemarks("")
  }

  const handleReviewSubmit = async (e) => {
    e.preventDefault()
    setMessage("")
    setError("")
    if (!selectedCert) return

    setLoading(true)
    try {
      const response = await axios.post("http://localhost:1235/facultyapi/reviewcertification", {
        certificationId: selectedCert.id,
        status: reviewStatus,
        remarks: remarks
      })
      if (response.status === 200) {
        setMessage("Review submitted successfully!")
        setTimeout(() => {
          handleCloseReview()
          if (faculty) fetchCertifications(faculty.id)
        }, 1200)
      }
    } catch (err) {
      setError(err.response?.data || "Failed to submit review.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h2>Verify Certifications</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Review, approve, or reject certifications uploaded by your assigned students.</p>
        </div>
      </div>

      {error && !selectedCert && <p style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', padding: '10px', borderRadius: '8px' }}>{error}</p>}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Student Details</th>
              <th>Title</th>
              <th>Category</th>
              <th>Provider</th>
              <th>Submitted At</th>
              <th>Status</th>
              <th>Remarks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {certifications.length > 0 ? (
              certifications.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>
                    <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{c.student?.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>ID: {c.student?.id}</div>
                  </td>
                  <td style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{c.title}</td>
                  <td>{c.category}</td>
                  <td>{c.company}</td>
                  <td>{c.submittedat ? new Date(c.submittedat).toLocaleString() : 'N/A'}</td>
                  <td>
                    <span className={`badge ${c.status.toLowerCase()}`}>
                      {c.status}
                    </span>
                  </td>
                  <td style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={c.remarks}>
                    {c.remarks || '-'}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <a 
                        href={c.certificateurl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="badge approved"
                        style={{ textDecoration: 'none' }}
                      >
                        View Link
                      </a>
                      <button 
                        onClick={() => handleOpenReview(c)} 
                        className="badge" 
                        style={{ background: 'var(--primary-color)', color: 'white', border: 'none', cursor: 'pointer' }}
                      >
                        {c.status === "SUBMITTED" ? "Review" : "Edit Review"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                  No certifications submitted by your assigned students yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedCert && (
        <div className="modal-overlay">
          <div className="modal-content glass-card">
            <h3>Review Certificate #{selectedCert.id}</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              <strong>Student:</strong> {selectedCert.student?.name} <br />
              <strong>Certification:</strong> {selectedCert.title} ({selectedCert.company})
            </p>

            {message && <p style={{ color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '8px', borderRadius: '6px', textAlign: 'center' }}>{message}</p>}
            {error && <p style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', padding: '8px', borderRadius: '6px', textAlign: 'center' }}>{error}</p>}

            <form onSubmit={handleReviewSubmit}>
              <div className="form-group">
                <label>Verification Action</label>
                <select 
                  value={reviewStatus} 
                  onChange={(e) => setReviewStatus(e.target.value)} 
                  required
                >
                  <option value="APPROVED">Approve (Valid Credential)</option>
                  <option value="REJECTED">Reject (Invalid/Expired Credential)</option>
                </select>
              </div>

              <div className="form-group">
                <label>Review Remarks</label>
                <textarea 
                  rows="4" 
                  placeholder="Provide detailed feedback or reasons..." 
                  value={remarks} 
                  onChange={(e) => setRemarks(e.target.value)} 
                  required 
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '1.5rem' }}>
                <button 
                  type="submit" 
                  className="btn-primary" 
                  style={{ flex: 1 }}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Submit Review"}
                </button>
                <button 
                  type="button" 
                  className="btn-primary" 
                  style={{ flex: 1, background: '#475569', boxShadow: 'none' }}
                  onClick={handleCloseReview}
                  disabled={loading}
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
