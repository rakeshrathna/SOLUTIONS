import React, { useState } from 'react';
import { useQuizStore } from '../stores/quizStore';
import { QuestionDifficulty } from '../types/question';
import { Button } from '../components/common/Button';
import { QuestionWidget } from '../components/widgets/QuestionWidget';
import {
  CheckSquare,
  Filter,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const TOPICS = [
  'ALL',
  'Introduction to Solutions',
  'Concentration of Solutions',
  "Henry's Law",
  "Raoult's Law",
  'Non-Ideal Solutions',
  'Colligative Properties',
  'Osmotic Pressure',
  'Abnormal Molar Mass',
  'Ideal Solutions'
];

const DIFFICULTIES: Array<QuestionDifficulty | 'ALL'> = [
  'ALL',
  'BEGINNER',
  'INTERMEDIATE',
  'HARD'
];

export const PracticePage: React.FC = () => {
  const {
    questions,
    currentIndex,
    selectedDifficulty,
    selectedTopic,
    filterQuestions,
    nextQuestion,
    prevQuestion,
    jumpToQuestion,
  } = useQuizStore();

  const [mode, setMode] = useState<'single' | 'all'>('single');

  const currentQuestion = questions[currentIndex] || questions[0];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-card space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-50 text-cyan-700 border border-cyan-200 shadow-sm">
              <CheckSquare className="w-5 h-5 text-cyan-600" />
            </div>
            <div>
              <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Practice & Question Bank
              </h1>
              <p className="text-xs sm:text-sm text-slate-600">
                30 verified NCERT questions • 20 MCQs • 10 Numerical problems
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setMode('single')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                mode === 'single'
                  ? 'bg-cyan-600 text-white border-cyan-600 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              Step Quiz Mode
            </button>
            <button
              onClick={() => setMode('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                mode === 'all'
                  ? 'bg-cyan-600 text-white border-cyan-600 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              Browse All ({questions.length})
            </button>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          {/* Difficulty Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-600 flex items-center gap-1 font-semibold uppercase tracking-wider">
              <Filter className="w-3.5 h-3.5 text-cyan-600" /> Difficulty:
            </span>
            {DIFFICULTIES.map((diff) => (
              <button
                key={diff}
                onClick={() => filterQuestions(diff, selectedTopic)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all font-mono shadow-sm ${
                  selectedDifficulty === diff
                    ? 'bg-cyan-50 text-cyan-800 border-cyan-300 font-bold ring-1 ring-cyan-500/20'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>

          {/* Topic Select */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600 font-semibold uppercase tracking-wider">Topic:</span>
            <select
              value={selectedTopic}
              onChange={(e) => filterQuestions(selectedDifficulty, e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-cyan-600 shadow-sm"
            >
              {TOPICS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Mode 1: Single Question Step Mode */}
      {mode === 'single' && currentQuestion && (
        <div className="space-y-6">
          {/* Question Stepper Indicator */}
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs font-mono text-slate-600">
              Question {currentIndex + 1} of {questions.length}
            </span>

            {/* Quick jump circles */}
            <div className="hidden sm:flex items-center gap-1.5 overflow-x-auto py-1 max-w-md">
              {questions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => jumpToQuestion(idx)}
                  className={`w-7 h-7 rounded-lg text-xs font-mono font-bold border transition-all flex items-center justify-center shrink-0 shadow-sm ${
                    idx === currentIndex
                      ? 'bg-cyan-600 text-white border-cyan-600 shadow-sm'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:text-slate-900'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                disabled={currentIndex === 0}
                onClick={prevQuestion}
                icon={<ChevronLeft className="w-4 h-4" />}
              >
                Prev
              </Button>
              <Button
                variant="secondary"
                size="sm"
                disabled={currentIndex === questions.length - 1}
                onClick={nextQuestion}
                icon={<ChevronRight className="w-4 h-4" />}
                iconPosition="right"
              >
                Next
              </Button>
            </div>
          </div>

          {/* Current Question Widget */}
          <QuestionWidget key={currentQuestion.id || currentIndex} config={currentQuestion} />
        </div>
      )}

      {/* Mode 2: Browse All Questions */}
      {mode === 'all' && (
        <div className="space-y-6">
          {questions.map((q, idx) => (
            <div key={q.id || idx} className="space-y-2">
              <span className="text-xs font-mono font-bold text-slate-600 px-2">
                Question #{idx + 1}
              </span>
              <QuestionWidget config={q} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
