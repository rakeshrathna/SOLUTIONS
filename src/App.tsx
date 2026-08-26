import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { AcademyDashboardPage } from './pages/AcademyDashboardPage';
import { ChemistryLessonsPage } from './pages/ChemistryLessonsPage';
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
        {/* Learnova Main Dashboard */}
        <Route path="/" element={<AcademyDashboardPage />} />

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
  );
};

export default App;
