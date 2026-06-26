import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

export default function ForgotPassword() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1) // 1: email, 2: otp, 3: reset
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const handleSendOtp = async (e) => {
    e.preventDefault()
    setMessage("")
    setError("")
    try {
      const response = await axios.post("http://localhost:1235/api/forgot-password/send-otp", { email })
      if (response.status === 200) {
        setMessage("OTP generated successfully! Check your application console logs.")
        setStep(2)
      }
    } catch (err) {
      setError(err.response?.data || "Failed to send OTP. Please verify email.")
    }
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    setMessage("")
    setError("")
    try {
      const response = await axios.post("http://localhost:1235/api/forgot-password/verify-otp", { email, otp })
      if (response.status === 200) {
        setMessage("OTP verified! Please enter your new password.")
        setStep(3)
      }
    } catch (err) {
      setError(err.response?.data || "Invalid or expired OTP.")
    }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    setMessage("")
    setError("")
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match")
      return
    }
    try {
      const response = await axios.post("http://localhost:1235/api/forgot-password/reset-password", { email, newPassword })
      if (response.status === 200) {
        alert("Password reset successfully!")
        navigate("/")
      }
    } catch (err) {
      setError(err.response?.data || "Password reset failed.")
    }
  }

  return (
    <div className="login-container glass-card" style={{ maxWidth: '450px', margin: '4rem auto' }}>
      <h2 className="login-title" style={{ marginBottom: '1.5rem', background: 'linear-gradient(to right, #6366f1, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textAlign: 'center' }}>
        Reset Password
      </h2>

      {message && <p style={{ color: '#10b981', textAlign: 'center', fontSize: '0.9rem', marginBottom: '1rem', background: 'rgba(16, 185, 129, 0.1)', padding: '8px', borderRadius: '6px' }}>{message}</p>}
      {error && <p style={{ color: '#ef4444', textAlign: 'center', fontSize: '0.9rem', marginBottom: '1rem', background: 'rgba(239, 68, 68, 0.1)', padding: '8px', borderRadius: '6px' }}>{error}</p>}

      {step === 1 && (
        <form onSubmit={handleSendOtp} className="login-form">
          <div className="form-group">
            <label>Registered Email</label>
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Send OTP</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyOtp} className="login-form">
          <div className="form-group">
            <label>Enter 6-Digit OTP</label>
            <input 
              type="text" 
              placeholder="Enter OTP" 
              value={otp} 
              onChange={(e) => setOtp(e.target.value)} 
              maxLength="6"
              required 
            />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Verify OTP</button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleResetPassword} className="login-form">
          <div className="form-group">
            <label>New Password</label>
            <input 
              type="password" 
              placeholder="Enter new password" 
              value={newPassword} 
              onChange={(e) => setNewPassword(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input 
              type="password" 
              placeholder="Confirm new password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Reset Password</button>
        </form>
      )}

      <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
        <Link to="/" style={{ color: '#6366f1', textDecoration: 'none', fontSize: '0.9rem' }}>Back to Home</Link>
      </div>
    </div>
  )
}
