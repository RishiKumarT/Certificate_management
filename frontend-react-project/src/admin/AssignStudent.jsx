import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function AssignStudent() {
  const [students, setStudents] = useState([])
  const [faculty, setFaculty] = useState([])
  const [selectedDept, setSelectedDept] = useState("")
  const [selectedStudent, setSelectedStudent] = useState("")
  const [selectedFaculty, setSelectedFaculty] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    try {
      const studRes = await axios.get("http://localhost:1235/adminapi/viewallstudents")
      if (studRes.status === 200) {
        setStudents(studRes.data)
      }
      
      const facRes = await axios.get("http://localhost:1235/adminapi/viewallfaculty")
      if (facRes.status === 200) {
        setFaculty(facRes.data)
      }
    } catch (err) {
      setError("Failed to load students/faculty options.")
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("")
    setError("")
    if (!selectedStudent || !selectedFaculty) {
      setError("Please select both a student and a faculty mentor.")
      return
    }
    setLoading(true)
    try {
      const response = await axios.post("http://localhost:1235/adminapi/assignstudent", {
        studentId: selectedStudent,
        facultyId: selectedFaculty
      })
      if (response.status === 200) {
        setMessage(response.data)
        setSelectedStudent("")
        setSelectedFaculty("")
      }
    } catch (err) {
      setError(err.response?.data || "Failed to assign student.")
    } finally {
      setLoading(false)
    }
  }

  const filteredStudents = selectedDept
    ? students.filter(s => s.department === selectedDept)
    : students

  const filteredFaculty = selectedDept
    ? faculty.filter(f => f.department === selectedDept)
    : faculty

  return (
    <div className="dashboard-container" style={{ maxWidth: '600px' }}>
      <div className="glass-card">
        <h2 className="text-center" style={{ marginBottom: '1.5rem', background: 'linear-gradient(to right, #6366f1, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Assign Student to Mentor
        </h2>

        {message && <p style={{ color: '#10b981', textAlign: 'center', background: 'rgba(16, 185, 129, 0.1)', padding: '10px', borderRadius: '8px', marginBottom: '1.5rem' }}>{message}</p>}
        {error && <p style={{ color: '#ef4444', textAlign: 'center', background: 'rgba(239, 68, 68, 0.1)', padding: '10px', borderRadius: '8px', marginBottom: '1.5rem' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Filter by Department</label>
            <select 
              value={selectedDept} 
              onChange={(e) => {
                setSelectedDept(e.target.value)
                setSelectedStudent("")
                setSelectedFaculty("")
              }}
            >
              <option value="">-- All Departments --</option>
              <option value="CSE">Computer Science (CSE)</option>
              <option value="ECE">Electronics (ECE)</option>
              <option value="EEE">Electrical (EEE)</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div className="form-group">
            <label>Select Student</label>
            <select 
              value={selectedStudent} 
              onChange={(e) => setSelectedStudent(e.target.value)} 
              required
            >
              <option value="">-- Choose Student --</option>
              {filteredStudents.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name} ({student.id}) - {student.department}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Select Mentor (Faculty)</label>
            <select 
              value={selectedFaculty} 
              onChange={(e) => setSelectedFaculty(e.target.value)} 
              required
            >
              <option value="">-- Choose Mentor --</option>
              {filteredFaculty.map((fac) => (
                <option key={fac.id} value={fac.id}>
                  {fac.name} ({fac.id}) - {fac.department}
                </option>
              ))}
            </select>
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            style={{ width: '100%', marginTop: '1rem' }}
            disabled={loading}
          >
            {loading ? "Assigning..." : "Assign Mentor"}
          </button>
        </form>
      </div>
    </div>
  )
}
