export type QuestionDifficulty = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'HARD' | 'BOARD';
export type QuestionType = 'MCQ' | 'NUMERICAL' | 'FORMULA_SELECTION' | 'CONCEPTUAL' | 'GRAPH_INTERPRETATION';

export interface QuestionConfig {
  id?: string;
  type: QuestionType;
  difficulty: QuestionDifficulty;
  topic: string;
  question: string;
  options?: string[]; // For MCQ
  correctAnswer?: string | number; // Option index or numerical string/number
  tolerance?: number; // For numerical evaluation
  explanation: string;
  marks: number;
  hints?: string[];
  given?: string[];
  required?: string;
  steps?: string[];
  answer?: string;
  stepByStepSolution?: string;
}

export interface QuizAnswer {
  questionId: string;
  selectedAnswer: string | number;
  isCorrect: boolean;
  timeTaken: number; // in seconds
}

export interface QuizAttempt {
  id: string;
  chapterId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  timeTaken: number;
  attemptedAt: string;
  answers: QuizAnswer[];
}
