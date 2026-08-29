import React, { useState, useEffect } from 'react';
import api from '../api/axios';

interface StudentData {
  id: number | string;
  name: string;
  registerNumber: string;
  studentClass: string;
  admissionDate?: string;
  subjects: string[];
}

interface EditSubjectsModalProps {
  isOpen: boolean;
  student: StudentData | null;
  onClose: () => void;
  onSuccess: () => void;
}

export const EditSubjectsModal: React.FC<EditSubjectsModalProps> = ({
  isOpen,
  student,
  onClose,
  onSuccess,
}) => {
  const [subjects, setSubjects] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (student) {
      setSubjects(student.subjects || []);
    }
  }, [student]);

  if (!isOpen || !student) return null;

  const handleToggle = (subject: string) => {
    setSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.patch(`/admin/students/${student.id}/subjects`, {
        subjects: subjects,
      });
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update subject permissions.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">Edit Subjects — {student.name}</h2>
          <button className="modal-close" onClick={onClose} type="button">&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <p style={{ fontSize: '0.9rem', color: '#6C757D', marginBottom: '1.25rem' }}>
              Register Number: <strong>{student.registerNumber}</strong> | Class: <strong>{student.studentClass}</strong>
            </p>

            {error && <div className="alert-error">{error}</div>}

            <div className="form-group">
              <label className="form-label">Toggle Enrolled Subjects:</label>
              <div className="checkbox-group">
                {['PHYSICS', 'CHEMISTRY', 'MATHS'].map((sub) => (
                  <label key={sub} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={subjects.includes(sub)}
                      onChange={() => handleToggle(sub)}
                    />
                    {sub.charAt(0) + sub.slice(1).toLowerCase()}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" style={{ width: 'auto' }} disabled={loading}>
              {loading ? 'Saving...' : 'Save Subject Access'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSubjectsModal;
