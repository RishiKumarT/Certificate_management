import React from 'react'

export default function AdminHome() {
  return (
    <div className="dashboard-container" style={{ maxWidth: '600px' }}>
      <div className="glass-card text-center" style={{ padding: '3rem' }}>
        <h2>Admin Dashboard</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: '1rem', lineHeight: '1.6' }}>
          Welcome to the Administrator portal. Use the navigation links above to register students, register faculty mentors, manage student assignments, and review certifications.
        </p>
      </div>
    </div>
  )
}