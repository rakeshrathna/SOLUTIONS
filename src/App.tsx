import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { AcademyDashboardPage } from './pages/AcademyDashboardPage';
import { HomePage } from './pages/HomePage';
import { LessonPage } from './pages/LessonPage';
import { PracticePage } from './pages/PracticePage';
import { NotesPage } from './pages/NotesPage';
import { ProgressPage } from './pages/ProgressPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Academy Master Dashboard — no AppShell wrapper (full-bleed dark design) */}
        <Route path="/" element={<AcademyDashboardPage />} />

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
  );
};

export default App;
