import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import logo from '../assets/eduideal-logo.png';

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', {
        username: username.trim(),
        password: password,
      });

      const { token, role, username: authUser } = response.data;
      login({ token, role, username: authUser });

      const targetPath = role === 'ADMIN' ? '/admin/dashboard' : (role === 'STUDENT' ? '/student/dashboard' : '/');
      navigate(targetPath);
    } catch (err: any) {
      console.error('Login request failed:', err);
      if (err.response) {
        const status = err.response.status;
        const msg = err.response.data?.message || err.response.data?.error;
        if (status === 401 || status === 403) {
          setError(msg || 'Invalid username or password.');
        } else if (msg) {
          setError(msg);
        } else {
          setError(`Authentication failed (HTTP ${status}). Please check your credentials.`);
        }
      } else if (err.message) {
        setError(`Network error: ${err.message}. Please check your connection.`);
      } else {
        setError('Connection failed. Please ensure backend server is running.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFill = () => {
    setUsername('admin@eduideal.i3.in');
    setPassword('ideal@i3-edu');
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '1rem' }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.825rem',
              fontWeight: 600,
              color: '#64748B',
              textDecoration: 'none',
              padding: '0.35rem 0.75rem',
              borderRadius: '6px',
              backgroundColor: '#F1F5F9',
              transition: 'all 0.2s ease',
            }}
          >
            ← Back to Home
          </Link>
        </div>

        <img src={logo} alt="EduIdeal Academy" className="auth-logo" />
        <h1 className="auth-title">Admin & Student Portal</h1>
        <p className="auth-subtitle">Sign in to access your EduIdeal dashboard</p>

        {error && <div className="alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Username / Register Number</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. admin@eduideal.i3.in"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingRight: '40px' }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  color: '#64748B',
                }}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? '👁️' : '🙈'}
              </button>
            </div>
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div style={{ marginTop: '1.25rem', padding: '0.75rem', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '0.825rem', color: '#475569', textAlign: 'left' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
            <strong>Default Admin Credentials:</strong>
          </div>
          Username: <code>admin@eduideal.i3.in</code><br />
          Password: <code>ideal@i3-edu</code>
          <button
            type="button"
            onClick={handleQuickFill}
            style={{
              marginTop: '0.6rem',
              width: '100%',
              padding: '0.45rem 0.75rem',
              backgroundColor: '#EFF6FF',
              color: '#1D4ED8',
              border: '1px solid #BFDBFE',
              borderRadius: '6px',
              fontSize: '0.785rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem',
              transition: 'background 0.2s',
            }}
          >
            ⚡ Auto-Fill Admin Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
