import { create } from 'zustand';
import { StudentProgressState } from '../types/progress';
import { chapterData } from '../data/chapter';

interface ProgressStore extends StudentProgressState {
  // Actions
  toggleSectionComplete: (lessonId: string, sectionId: string) => void;
  markSectionComplete: (lessonId: string, sectionId: string) => void;
  toggleQuestionComplete: (questionId: string, marks?: number) => void;
  recordQuestionAttempt: (questionId: string, isCorrect: boolean, answer: string | number, marks: number) => void;
  incrementTimeSpent: (seconds: number) => void;
  toggleBookmark: (sectionId: string) => void;
  saveNote: (sectionId: string, note: string) => void;
  deleteNote: (sectionId: string) => void;
  resetProgress: () => void;
  getLessonProgressPercentage: (lessonId: string) => number;
  getChapterProgressPercentage: () => number;
}

const STORAGE_KEY = 'stem_solutions_progress_v1';

const getInitialState = (): StudentProgressState => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        chapterId: parsed.chapterId || chapterData.id,
        lessons: parsed.lessons || {},
        questionAttempts: parsed.questionAttempts || {},
        totalTimeSpent: parsed.totalTimeSpent || 0,
        overallScore: parsed.overallScore || 0,
        completedLessonsCount: parsed.completedLessonsCount || 0,
        bookmarkedSections: parsed.bookmarkedSections || [],
        notes: parsed.notes || {}
      };
    }
  } catch (e) {
    console.error('Failed to read progress from localStorage', e);
  }

  // Default clean state
  const initialLessons: Record<string, any> = {};
  chapterData.lessons.forEach(l => {
    initialLessons[l.id] = {
      lessonId: l.id,
      status: 'NOT_STARTED',
      completedSections: [],
      totalSections: l.sections.length,
      timeSpent: 0
    };
  });

  return {
    chapterId: chapterData.id,
    lessons: initialLessons,
    questionAttempts: {},
    totalTimeSpent: 0,
    overallScore: 0,
    completedLessonsCount: 0,
    bookmarkedSections: [],
    notes: {}
  };
};

export const useProgressStore = create<ProgressStore>((set, get) => ({
  ...getInitialState(),

  toggleSectionComplete: (lessonId: string, sectionId: string) => {
    set((state) => {
      const lesson = state.lessons[lessonId] || {
        lessonId,
        status: 'NOT_STARTED',
        completedSections: [],
        totalSections: chapterData.lessons.find(l => l.id === lessonId)?.sections.length || 1,
        timeSpent: 0
      };

      const isCurrentlyCompleted = lesson.completedSections.includes(sectionId);
      let updatedCompleted: string[];

      if (isCurrentlyCompleted) {
        // Unmark section
        updatedCompleted = lesson.completedSections.filter((id: string) => id !== sectionId);
      } else {
        // Mark section as completed
        updatedCompleted = [...lesson.completedSections, sectionId];
      }

      let newStatus: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
      if (updatedCompleted.length === 0) {
        newStatus = 'NOT_STARTED';
      } else if (updatedCompleted.length >= lesson.totalSections) {
        newStatus = 'COMPLETED';
      } else {
        newStatus = 'IN_PROGRESS';
      }

      const updatedLessons: Record<string, any> = {
        ...state.lessons,
        [lessonId]: {
          ...lesson,
          completedSections: updatedCompleted,
          status: newStatus,
          lastAccessed: new Date().toISOString()
        }
      };

      const completedLessonsCount = Object.values(updatedLessons).filter(
        (l: any) => l.status === 'COMPLETED'
      ).length;

      const newState = {
        ...state,
        lessons: updatedLessons,
        completedLessonsCount
      };

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
      } catch (e) {
        console.error('Failed to save progress to localStorage', e);
      }

      return newState;
    });
  },

  markSectionComplete: (lessonId: string, sectionId: string) => {
    set((state) => {
      const lesson = state.lessons[lessonId] || {
        lessonId,
        status: 'NOT_STARTED',
        completedSections: [],
        totalSections: chapterData.lessons.find(l => l.id === lessonId)?.sections.length || 1,
        timeSpent: 0
      };

      if (lesson.completedSections.includes(sectionId)) {
        return state;
      }

      const updatedCompleted = [...lesson.completedSections, sectionId];
      const isComplete = updatedCompleted.length >= lesson.totalSections;

      const updatedLessons: Record<string, any> = {
        ...state.lessons,
        [lessonId]: {
          ...lesson,
          completedSections: updatedCompleted,
          status: isComplete ? 'COMPLETED' : 'IN_PROGRESS',
          lastAccessed: new Date().toISOString()
        }
      };

      const completedLessonsCount = Object.values(updatedLessons).filter(
        (l: any) => l.status === 'COMPLETED'
      ).length;

      const newState = {
        ...state,
        lessons: updatedLessons,
        completedLessonsCount
      };

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
      } catch (e) {
        console.error('Failed to save progress to localStorage', e);
      }

      return newState;
    });
  },

  toggleQuestionComplete: (questionId: string, marks = 1) => {
    set((state) => {
      const prevAttempt = state.questionAttempts[questionId] || {
        attempts: 0,
        isCorrect: false,
        score: 0
      };

      const isNowCorrect = !prevAttempt.isCorrect;
      const scoreDiff = isNowCorrect ? marks : -prevAttempt.score;
      const newScore = Math.max(0, state.overallScore + scoreDiff);

      const updatedAttempts = {
        ...state.questionAttempts,
        [questionId]: {
          attempts: prevAttempt.attempts + 1,
          isCorrect: isNowCorrect,
          lastAnswer: prevAttempt.lastAnswer,
          score: isNowCorrect ? marks : 0
        }
      };

      const newState = {
        ...state,
        questionAttempts: updatedAttempts,
        overallScore: newScore
      };

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
      } catch (e) {
        console.error('Failed to save question toggle to localStorage', e);
      }

      return newState;
    });
  },

  recordQuestionAttempt: (questionId: string, isCorrect: boolean, answer: string | number, marks: number) => {
    set((state) => {
      const prevAttempt = state.questionAttempts[questionId] || {
        attempts: 0,
        isCorrect: false,
        score: 0
      };

      const attempts = prevAttempt.attempts + 1;
      const scoreGain = (!prevAttempt.isCorrect && isCorrect) ? marks : 0;
      const newScore = state.overallScore + scoreGain;

      const updatedAttempts = {
        ...state.questionAttempts,
        [questionId]: {
          attempts,
          isCorrect: prevAttempt.isCorrect || isCorrect,
          lastAnswer: answer,
          score: Math.max(prevAttempt.score, isCorrect ? marks : 0)
        }
      };

      const newState = {
        ...state,
        questionAttempts: updatedAttempts,
        overallScore: newScore
      };

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
      } catch (e) {
        console.error('Failed to save question attempt to localStorage', e);
      }

      return newState;
    });
  },

  incrementTimeSpent: (seconds: number) => {
    set((state) => {
      const newState = {
        ...state,
        totalTimeSpent: state.totalTimeSpent + seconds
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
      } catch (e) {
        // ignore
      }
      return newState;
    });
  },

  toggleBookmark: (sectionId: string) => {
    set((state) => {
      const exists = state.bookmarkedSections.includes(sectionId);
      const updated = exists
        ? state.bookmarkedSections.filter(id => id !== sectionId)
        : [...state.bookmarkedSections, sectionId];
      const newState = { ...state, bookmarkedSections: updated };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
      } catch (e) {
        // ignore
      }
      return newState;
    });
  },

  saveNote: (sectionId: string, note: string) => {
    set((state) => {
      const trimmed = note.trim();
      const updatedNotes = { ...state.notes };
      
      if (!trimmed) {
        delete updatedNotes[sectionId];
      } else {
        updatedNotes[sectionId] = trimmed;
      }

      const newState = {
        ...state,
        notes: updatedNotes
      };
      
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
      } catch (e) {
        // ignore
      }
      return newState;
    });
  },

  deleteNote: (sectionId: string) => {
    set((state) => {
      const updatedNotes = { ...state.notes };
      delete updatedNotes[sectionId];

      const newState = {
        ...state,
        notes: updatedNotes
      };
      
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
      } catch (e) {
        // ignore
      }
      return newState;
    });
  },

  resetProgress: () => {
    localStorage.removeItem(STORAGE_KEY);
    const cleanState = getInitialState();
    set(cleanState);
  },

  getLessonProgressPercentage: (lessonId: string) => {
    const state = get();
    const lesson = state.lessons[lessonId];
    if (!lesson || lesson.totalSections === 0) return 0;
    return Math.round((lesson.completedSections.length / lesson.totalSections) * 100);
  },

  getChapterProgressPercentage: () => {
    const state = get();
    let totalSecs = 0;
    let completedSecs = 0;
    Object.values(state.lessons).forEach((l: any) => {
      totalSecs += l.totalSections;
      completedSecs += l.completedSections.length;
    });
    if (totalSecs === 0) return 0;
    return Math.round((completedSecs / totalSecs) * 100);
  }
}));
