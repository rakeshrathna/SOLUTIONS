import React, { ReactNode, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRole?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRole }) => {
  const { isAuthenticated, role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    } else if (allowedRole && role !== allowedRole) {
      if (role === 'ADMIN') {
        navigate('/admin/dashboard', { replace: true });
      } else if (role === 'STUDENT') {
        navigate('/student/dashboard', { replace: true });
      } else {
        navigate('/login', { replace: true });
      }
    }
  }, [isAuthenticated, role, allowedRole, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  if (allowedRole && role !== allowedRole) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
