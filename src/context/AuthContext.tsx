import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface AuthContextType {
  token: string | null;
  role: string | null;
  username: string | null;
  isAuthenticated: boolean;
  login: (data: { token?: string; role?: string; username?: string }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token') || null);
  const [role, setRole] = useState<string | null>(() => localStorage.getItem('userRole') || null);
  const [username, setUsername] = useState<string | null>(() => localStorage.getItem('username') || null);

  const loginUser = (data: { token?: string; role?: string; username?: string }) => {
    if (data.token) localStorage.setItem('token', data.token);
    if (data.role) localStorage.setItem('userRole', data.role);
    if (data.username) localStorage.setItem('username', data.username);

    setToken(data.token || null);
    setRole(data.role || null);
    setUsername(data.username || null);
  };

  const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    setToken(null);
    setRole(null);
    setUsername(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        role,
        username,
        isAuthenticated: !!token,
        login: loginUser,
        logout: logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
