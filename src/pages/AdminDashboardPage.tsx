import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import logo from '../assets/eduideal-logo.png';
import AddStudentModal from '../components/AddStudentModal';
import EditSubjectsModal from '../components/EditSubjectsModal';

interface Student {
  id: number | string;
  name: string;
  registerNumber: string;
  studentClass: string;
  admissionDate: string;
  subjects: string[];
}

export const AdminDashboardPage: React.FC = () => {
  const { username, logout } = useAuth();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const fetchStudents = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/admin/students');
      setStudents(Array.isArray(response.data) ? response.data : []);
    } catch (err: any) {
      setError('Failed to fetch enrolled students.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDeleteStudent = async (student: Student) => {
    if (window.confirm(`Are you sure you want to remove student "${student.name}" (${student.registerNumber})? This action cannot be undone.`)) {
      try {
        await api.delete(`/admin/students/${student.id}`);
        fetchStudents();
      } catch (err: any) {
        alert(err.response?.data?.message || 'Failed to delete student.');
      }
    }
  };

  const filteredStudents = students.filter((st) =>
    (st.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (st.registerNumber || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (st.studentClass || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app-container">
      {/* Header / Navbar */}
      <header className="navbar">
        <div className="navbar-brand">
          <img src={logo} alt="EduIdeal Academy" className="navbar-logo" />
        </div>
        <div className="user-nav-info">
          <div className="user-badge">
            <span>🛡️ ADMIN</span>
            <span>{username}</span>
          </div>
          <button className="btn-logout" onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-content">
        {/* Welcome Banner */}
        <div className="welcome-banner">
          <div>
            <h1>Welcome back, {username}!</h1>
            <p>Manage student enrollments, class allocations, and subject access across EduIdeal Academy.</p>
          </div>
          <button className="btn-primary" style={{ width: 'auto' }} onClick={() => setIsAddModalOpen(true)}>
            + Add New Student
          </button>
        </div>

        {/* Quick Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">🎓</div>
            <div className="stat-info">
              <h3>Enrolled Students</h3>
              <div className="stat-value">{students.length}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: '#E0F2FE', color: '#0369A1' }}>📚</div>
            <div className="stat-info">
              <h3>Active Classes</h3>
              <div className="stat-value">12 CBSE</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: '#ECFDF5', color: '#065F46' }}>🔬</div>
            <div className="stat-info">
              <h3>Available Subjects</h3>
              <div className="stat-value">3 (Phy, Chem, Math)</div>
            </div>
          </div>
        </div>

        {/* Students Table Section */}
        <div className="section-header">
          <h2 className="section-title">Enrolled Students Directory</h2>
          <div style={{ width: '300px' }}>
            <input
              type="text"
              className="form-input"
              placeholder="Search by name, reg no..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {error && <div className="alert-error">{error}</div>}

        <div className="table-card">
          {loading ? (
            <div className="empty-state">Loading student records...</div>
          ) : filteredStudents.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📁</div>
              <p>{searchQuery ? 'No matching students found' : 'No students enrolled yet. Click "Add New Student" to get started.'}</p>
            </div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Register No</th>
                  <th>Class</th>
                  <th>Admission Date</th>
                  <th>Enrolled Subjects</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td style={{ fontWeight: 600 }}>{student.name}</td>
                    <td><code style={{ background: '#F1F5F9', padding: '2px 6px', borderRadius: '4px' }}>{student.registerNumber}</code></td>
                    <td><span className="badge-class">{student.studentClass}</span></td>
                    <td>{student.admissionDate}</td>
                    <td>
                      {student.subjects && student.subjects.length > 0 ? (
                        student.subjects.map((sub) => {
                          const badgeClass =
                            sub === 'PHYSICS'
                              ? 'badge-physics'
                              : sub === 'CHEMISTRY'
                              ? 'badge-chemistry'
                              : 'badge-maths';
                          return (
                            <span key={sub} className={`badge-subject ${badgeClass}`}>
                              {sub}
                            </span>
                          );
                        })
                      ) : (
                        <span style={{ color: '#94A3B8', fontSize: '0.85rem' }}>None</span>
                      )}
                    </td>
                    <td>
                      <button
                        className="btn-secondary-action"
                        onClick={() => setEditingStudent(student)}
                      >
                        Edit Subjects
                      </button>
                      <button
                        className="btn-danger-action"
                        onClick={() => handleDeleteStudent(student)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {/* Modals */}
      <AddStudentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={fetchStudents}
      />

      <EditSubjectsModal
        isOpen={!!editingStudent}
        student={editingStudent}
        onClose={() => setEditingStudent(null)}
        onSuccess={fetchStudents}
      />
    </div>
  );
};

export default AdminDashboardPage;
