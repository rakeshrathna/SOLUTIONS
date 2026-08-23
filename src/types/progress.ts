export interface SectionProgress {
  sectionId: string;
  completed: boolean;
  completedAt?: string;
  timeSpent?: number; // seconds
}

export interface LessonProgress {
  lessonId: string;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
  completedSections: string[];
  totalSections: number;
  timeSpent: number;
  lastAccessed?: string;
}

export interface StudentProgressState {
  chapterId: string;
  lessons: Record<string, LessonProgress>;
  questionAttempts: Record<string, {
    attempts: number;
    isCorrect: boolean;
    lastAnswer?: string | number;
    score: number;
  }>;
  totalTimeSpent: number;
  overallScore: number;
  completedLessonsCount: number;
  bookmarkedSections: string[];
  notes: Record<string, string>;
}
