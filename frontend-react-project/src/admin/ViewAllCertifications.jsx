import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function ViewAllCertifications() {
  const [certifications, setCertifications] = useState([])
  const [error, setError] = useState("")

  const fetchCertifications = async () => {
    try {
      const response = await axios.get("http://localhost:1235/adminapi/viewallcertifications")
      if (response.status === 200) {
        setCertifications(response.data)
      }
    } catch (err) {
      setError("Failed to fetch certifications history.")
    }
  }

  useEffect(() => {
    fetchCertifications()
  }, [])

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h2>All Uploaded Certifications</h2>
          <p style={{ color: 'var(--text-secondary)' }}>View and audit all student certifications in the system.</p>
        </div>
      </div>

      {error && <p style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', padding: '10px', borderRadius: '8px' }}>{error}</p>}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Student</th>
              <th>Certification Details</th>
              <th>Provider</th>
              <th>Assigned Faculty</th>
              <th>Status</th>
              <th>Remarks</th>
              <th>Submitted At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {certifications.length > 0 ? (
              certifications.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>
                    <div style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{c.student?.name || 'N/A'}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>ID: {c.student?.id}</div>
                  </td>
                  <td>
                    <div style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{c.title}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{c.category} - {c.examtype}</div>
                  </td>
                  <td>{c.company}</td>
                  <td>{c.faculty?.name || <span style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>Unassigned</span>}</td>
                  <td>
                    <span className={`badge ${c.status?.toLowerCase()}`}>
                      {c.status}
                    </span>
                  </td>
                  <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={c.remarks}>
                    {c.remarks || '-'}
                  </td>
                  <td>{c.submittedat ? new Date(c.submittedat).toLocaleString() : 'N/A'}</td>
                  <td>
                    <a 
                      href={c.certificateurl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="badge approved"
                      style={{ textDecoration: 'none', display: 'inline-block' }}
                    >
                      View Link
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                  No certifications uploaded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
