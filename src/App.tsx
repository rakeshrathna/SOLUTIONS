import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AppShell } from './components/layout/AppShell';
import { AcademyDashboardPage } from './pages/AcademyDashboardPage';
import { ChemistryLessonsPage } from './pages/ChemistryLessonsPage';
import { HomePage } from './pages/HomePage';
import { LessonPage } from './pages/LessonPage';
import { PracticePage } from './pages/PracticePage';
import { NotesPage } from './pages/NotesPage';
import { ProgressPage } from './pages/ProgressPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { LoginPage } from './pages/LoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { StudentDashboardPage } from './pages/StudentDashboardPage';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Learnova Main Dashboard */}
          <Route path="/" element={<AcademyDashboardPage />} />

          {/* EduIdeal Authentication & Portals */}
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRole="ADMIN">
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/dashboard"
            element={
              <ProtectedRoute allowedRole="STUDENT">
                <StudentDashboardPage />
              </ProtectedRoute>
            }
          />

          {/* Dedicated Chemistry Lessons page */}
          <Route path="/chemistry" element={<ChemistryLessonsPage />} />

          {/* Solutions chapter app — uses AppShell (header + sidebar) */}
          <Route path="/" element={<AppShell />}>
            <Route path="solutions" element={<HomePage />} />
            <Route path="lesson/:lessonId" element={<LessonPage />} />
            <Route path="practice" element={<PracticePage />} />
            <Route path="notes" element={<NotesPage />} />
            <Route path="progress" element={<ProgressPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
