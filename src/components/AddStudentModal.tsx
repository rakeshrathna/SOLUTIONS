import React, { useState } from 'react';
import api from '../api/axios';

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AddStudentModal: React.FC<AddStudentModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    registerNumber: '',
    studentClass: '12 CBSE',
    admissionDate: new Date().toISOString().split('T')[0],
    subjects: ['PHYSICS', 'CHEMISTRY', 'MATHS'],
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubjectToggle = (subject: string) => {
    setFormData((prev) => {
      const exists = prev.subjects.includes(subject);
      const updated = exists
        ? prev.subjects.filter((s) => s !== subject)
        : [...prev.subjects, subject];
      return { ...prev, subjects: updated };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Client-side validation: Password match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please verify and re-enter.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (formData.subjects.length === 0) {
      setError('Please select at least one subject.');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: formData.name.trim(),
        registerNumber: formData.registerNumber.trim(),
        studentClass: formData.studentClass,
        admissionDate: formData.admissionDate,
        subjects: formData.subjects,
        password: formData.password,
      };

      await api.post('/admin/students', payload);
      onSuccess();
      onClose();
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Failed to create student. Please check details.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">Enroll New Student</h2>
          <button className="modal-close" onClick={onClose} type="button">&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {error && <div className="alert-error">{error}</div>}

            <div className="form-group">
              <label className="form-label">Student Full Name *</label>
              <input
                type="text"
                name="name"
                className="form-input"
                placeholder="e.g. Rahul Sharma"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Register Number *</label>
              <input
                type="text"
                name="registerNumber"
                className="form-input"
                placeholder="e.g. REG2026101"
                value={formData.registerNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Class / Stream *</label>
              <select
                name="studentClass"
                className="form-select"
                value={formData.studentClass}
                onChange={handleChange}
                required
              >
                <option value="12 CBSE">12 CBSE</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Admission Date *</label>
              <input
                type="date"
                name="admissionDate"
                className="form-input"
                value={formData.admissionDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Enrolled Subjects *</label>
              <div className="checkbox-group">
                {['PHYSICS', 'CHEMISTRY', 'MATHS'].map((sub) => (
                  <label key={sub} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.subjects.includes(sub)}
                      onChange={() => handleSubjectToggle(sub)}
                    />
                    {sub.charAt(0) + sub.slice(1).toLowerCase()}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Account Password *</label>
              <input
                type="password"
                name="password"
                className="form-input"
                placeholder="Minimum 6 characters"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Re-enter Password *</label>
              <input
                type="password"
                name="confirmPassword"
                className="form-input"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" style={{ width: 'auto' }} disabled={loading}>
              {loading ? 'Creating...' : 'Create Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudentModal;
