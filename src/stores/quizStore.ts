import { create } from 'zustand';
import { QuestionConfig, QuestionDifficulty } from '../types/question';
import { questionsData } from '../data/questions';

interface QuizState {
  questions: QuestionConfig[];
  currentIndex: number;
  selectedAnswers: Record<string, string | number>;
  answersStatus: Record<string, boolean>; // isCorrect
  isSubmitted: boolean;
  score: number;
  timeSpent: number;
  selectedDifficulty: QuestionDifficulty | 'ALL';
  selectedTopic: string | 'ALL';
  
  // Actions
  filterQuestions: (difficulty: QuestionDifficulty | 'ALL', topic: string | 'ALL') => void;
  selectAnswer: (questionId: string, answer: string | number) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  jumpToQuestion: (index: number) => void;
  submitQuiz: () => void;
  resetQuiz: () => void;
  incrementTimer: () => void;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  questions: Object.values(questionsData),
  currentIndex: 0,
  selectedAnswers: {},
  answersStatus: {},
  isSubmitted: false,
  score: 0,
  timeSpent: 0,
  selectedDifficulty: 'ALL',
  selectedTopic: 'ALL',

  filterQuestions: (difficulty, topic) => {
    let filtered = Object.values(questionsData);
    if (difficulty !== 'ALL') {
      filtered = filtered.filter(q => q.difficulty === difficulty);
    }
    if (topic !== 'ALL') {
      filtered = filtered.filter(q => q.topic === topic);
    }
    set({
      questions: filtered,
      currentIndex: 0,
      selectedAnswers: {},
      answersStatus: {},
      isSubmitted: false,
      score: 0,
      timeSpent: 0,
      selectedDifficulty: difficulty,
      selectedTopic: topic
    });
  },

  selectAnswer: (questionId, answer) => {
    set((state) => ({
      selectedAnswers: {
        ...state.selectedAnswers,
        [questionId]: answer
      }
    }));
  },

  nextQuestion: () => {
    set((state) => ({
      currentIndex: Math.min(state.currentIndex + 1, state.questions.length - 1)
    }));
  },

  prevQuestion: () => {
    set((state) => ({
      currentIndex: Math.max(state.currentIndex - 1, 0)
    }));
  },

  jumpToQuestion: (index) => {
    set({ currentIndex: index });
  },

  submitQuiz: () => {
    const { questions, selectedAnswers } = get();
    let totalScore = 0;
    const statusMap: Record<string, boolean> = {};

    questions.forEach((q) => {
      const userAns = selectedAnswers[q.id || ''];
      let isCorrect = false;

      if (q.type === 'MCQ') {
        isCorrect = userAns === q.correctAnswer;
      } else if (q.type === 'NUMERICAL') {
        if (userAns !== undefined) {
          const numUser = parseFloat(String(userAns).trim());
          const numCorrect = parseFloat(String(q.correctAnswer).trim());
          const tol = q.tolerance || 0.05;
          if (!isNaN(numUser) && !isNaN(numCorrect)) {
            isCorrect = Math.abs(numUser - numCorrect) <= tol;
          }
        }
      }

      statusMap[q.id || ''] = isCorrect;
      if (isCorrect) {
        totalScore += q.marks || 1;
      }
    });

    set({
      isSubmitted: true,
      answersStatus: statusMap,
      score: totalScore
    });
  },

  resetQuiz: () => {
    set({
      currentIndex: 0,
      selectedAnswers: {},
      answersStatus: {},
      isSubmitted: false,
      score: 0,
      timeSpent: 0
    });
  },

  incrementTimer: () => {
    set((state) => ({ timeSpent: state.timeSpent + 1 }));
  }
}));
