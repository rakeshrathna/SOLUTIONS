import React from 'react';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/eduideal-logo.png';

export const StudentDashboardPage: React.FC = () => {
  const { username, logout } = useAuth();

  return (
    <div className="app-container">
      {/* Header / Navbar */}
      <header className="navbar">
        <div className="navbar-brand">
          <img src={logo} alt="EduIdeal Academy" className="navbar-logo" />
        </div>
        <div className="user-nav-info">
          <div className="user-badge" style={{ backgroundColor: '#E0F2FE', color: '#0369A1' }}>
            <span>🎓 STUDENT</span>
            <span>{username}</span>
          </div>
          <button className="btn-logout" onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '70vh' }}>
        <div className="auth-card" style={{ maxWidth: '540px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀</div>
          <h1 className="auth-title">Student Portal Coming Soon</h1>
          <p className="auth-subtitle">
            Welcome, <strong>{username}</strong>! Your personalized learning dashboard, study materials, and online test portal are currently under development.
          </p>
          <div className="alert-success" style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            Registered Status: Active Enrolled Student
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboardPage;
