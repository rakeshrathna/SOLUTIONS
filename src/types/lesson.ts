import { FormulaConfig } from './formula';
import { GraphConfig } from './graph';
import { SimulationConfig } from './simulation';
import { QuestionConfig } from './question';

export type SectionType = 
  | 'TEXT'
  | 'FORMULA'
  | 'CALCULATOR'
  | 'GRAPH'
  | 'SIMULATION'
  | 'QUESTION'
  | 'IMAGE'
  | 'VIDEO'
  | 'SUMMARY'
  | 'STEP_SOLVER';

export interface CalculatorStep {
  title: string;
  formula: string;
  calc: string;
  result: string;
}

export interface CalculatorConfig {
  id?: string;
  title: string;
  description?: string;
  inputs: Record<string, {
    label: string;
    unit: string;
    default: number;
    min?: number;
    max?: number;
    step?: number;
  }>;
  calculate: (inputs: Record<string, number>) => {
    steps: CalculatorStep[];
    finalResult: {
      label: string;
      value: number | string;
      unit: string;
    };
  };
}

export interface LessonSection {
  id: string;
  lessonId: string;
  type: SectionType;
  title: string;
  content?: string; // Markdown / HTML with KaTeX inline
  order: number;
  config?: FormulaConfig | GraphConfig | SimulationConfig | QuestionConfig | CalculatorConfig | any;
}

export interface Lesson {
  id: string;
  title: string;
  description?: string;
  chapterId: string;
  order: number;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  estimatedTime?: number; // in minutes
  sections: LessonSection[];
}

export interface Chapter {
  id: string;
  name: string;
  chapterNumber: number;
  subject: string;
  class: string;
  description: string;
  estimatedTime: number; // in minutes
  lessons: Lesson[];
}
