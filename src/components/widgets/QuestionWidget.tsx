import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { QuestionConfig } from '../../types/question';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { useProgressStore } from '../../stores/progressStore';
import {
  CheckCircle2,
  XCircle,
  Lightbulb,
  ArrowRight,
  RotateCcw,
  Award,
  Bookmark,
  StickyNote,
  Edit3,
  Trash2,
  X,
  Check
} from 'lucide-react';

interface QuestionWidgetProps {
  config: QuestionConfig;
  onAnswerSubmit?: (isCorrect: boolean) => void;
}

export const QuestionWidget: React.FC<QuestionWidgetProps> = ({ config, onAnswerSubmit }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [numericalInput, setNumericalInput] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [noteText, setNoteText] = useState('');

  const questionId = config.id || config.question.slice(0, 25);

  const {
    questionAttempts,
    recordQuestionAttempt,
    toggleQuestionComplete,
    bookmarkedSections,
    toggleBookmark,
    notes,
    saveNote,
    deleteNote
  } = useProgressStore();

  const attempt = questionAttempts[questionId];
  const isMastered = attempt?.isCorrect || false;
  const isBookmarked = bookmarkedSections.includes(questionId);
  const existingNote = notes[questionId] || '';

  const isMCQ = config.type === 'MCQ';

  const isCorrect = React.useMemo(() => {
    if (!isSubmitted) return isMastered;

    if (isMCQ) {
      return selectedOption === config.correctAnswer;
    } else {
      const userNum = parseFloat(numericalInput.trim());
      const correctNum = parseFloat(String(config.correctAnswer ?? config.answer).trim());
      const tol = config.tolerance ?? 0.05;

      if (isNaN(userNum) || isNaN(correctNum)) {
        return numericalInput.trim().toLowerCase() === String(config.answer).trim().toLowerCase();
      }
      return Math.abs(userNum - correctNum) <= tol;
    }
  }, [isSubmitted, isMastered, isMCQ, selectedOption, numericalInput, config]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isMCQ && selectedOption === null) return;
    if (!isMCQ && !numericalInput.trim()) return;

    setIsSubmitted(true);
    setShowExplanation(true);

    const userAns = isMCQ ? selectedOption! : numericalInput;
    let correct = false;

    if (isMCQ) {
      correct = selectedOption === config.correctAnswer;
    } else {
      const userNum = parseFloat(numericalInput.trim());
      const correctNum = parseFloat(String(config.correctAnswer ?? config.answer).trim());
      const tol = config.tolerance ?? 0.05;
      correct = !isNaN(userNum) && !isNaN(correctNum)
        ? Math.abs(userNum - correctNum) <= tol
        : numericalInput.trim().toLowerCase() === String(config.answer).trim().toLowerCase();
    }

    if (correct) {
      confetti({
        particleCount: 45,
        spread: 55,
        origin: { y: 0.8 },
        colors: ['#0891B2', '#06B6D4', '#10B981', '#F59E0B']
      });
    }

    recordQuestionAttempt(questionId, correct, userAns, config.marks || 1);
    onAnswerSubmit?.(correct);
  };

  const handleToggleCompletion = () => {
    toggleQuestionComplete(questionId, config.marks || 1);
  };

  const handleOpenNoteEditor = () => {
    setNoteText(existingNote);
    setShowNoteInput(true);
  };

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (noteText.trim()) {
      saveNote(questionId, noteText.trim());
    } else {
      deleteNote(questionId);
    }
    // Auto-collapse after saving
    setShowNoteInput(false);
  };

  const handleDeleteNote = () => {
    deleteNote(questionId);
    setNoteText('');
    setShowNoteInput(false);
  };

  const handleRetry = () => {
    setSelectedOption(null);
    setNumericalInput('');
    setIsSubmitted(false);
    setShowExplanation(false);
  };

  return (
    <div id={questionId} className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-card space-y-5">
      {/* Header Badges & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={config.difficulty}>{config.difficulty}</Badge>
          <span className="text-xs text-slate-600 font-mono bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200">
            {config.topic}
          </span>
          <Badge variant="neutral">{config.type}</Badge>
          <div className="flex items-center gap-1 text-xs font-semibold text-cyan-800 font-mono ml-1">
            <Award className="w-3.5 h-3.5 text-cyan-600" />
            <span>{config.marks} Mark{config.marks > 1 ? 's' : ''}</span>
          </div>
        </div>

        {/* Action controls: Bookmark, Note, Completion Toggle */}
        <div className="flex items-center gap-1.5 text-xs">
          {/* Bookmark */}
          <button
            onClick={() => toggleBookmark(questionId)}
            className={`p-1.5 rounded-lg border transition-all ${
              isBookmarked
                ? 'bg-amber-50 text-amber-700 border-amber-300 shadow-sm'
                : 'bg-white text-slate-500 border-slate-200 hover:text-slate-800 hover:border-slate-300 shadow-sm'
            }`}
            title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Question'}
          >
            <Bookmark className="w-3.5 h-3.5" fill={isBookmarked ? 'currentColor' : 'none'} />
          </button>

          {/* Note Toggle */}
          <button
            onClick={() => {
              if (showNoteInput) {
                setShowNoteInput(false);
              } else {
                handleOpenNoteEditor();
              }
            }}
            className={`p-1.5 rounded-lg border transition-all ${
              existingNote
                ? 'bg-cyan-50 text-cyan-700 border-cyan-300 shadow-sm'
                : 'bg-white text-slate-500 border-slate-200 hover:text-slate-800 hover:border-slate-300 shadow-sm'
            }`}
            title={existingNote ? 'View/Edit Note' : 'Add Note'}
          >
            <StickyNote className="w-3.5 h-3.5" />
          </button>

          {/* Interactive Completion Toggle */}
          <button
            onClick={handleToggleCompletion}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-semibold transition-all shadow-sm cursor-pointer ${
              isMastered
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                : 'bg-white text-slate-600 border-slate-200 hover:border-cyan-500 hover:text-cyan-700 hover:bg-slate-50'
            }`}
            title={isMastered ? 'Click to unmark completion' : 'Click to mark as completed'}
          >
            <CheckCircle2 className={`w-3.5 h-3.5 ${isMastered ? 'text-emerald-600' : 'text-slate-400'}`} />
            <span>{isMastered ? 'Mastered' : 'Mark Done'}</span>
          </button>
        </div>
      </div>

      {/* Expanded Note Input Editor */}
      {showNoteInput && (
        <form
          onSubmit={handleSaveNote}
          className="p-4 rounded-xl bg-white border border-cyan-300 shadow-card space-y-2.5 animate-slide-up"
        >
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-cyan-800 flex items-center gap-1.5">
              <StickyNote className="w-3.5 h-3.5 text-cyan-600" />
              <span>{existingNote ? 'Edit Revision Note' : 'Add Revision Note'}:</span>
            </label>
            <button
              type="button"
              onClick={() => setShowNoteInput(false)}
              className="text-slate-400 hover:text-slate-600 p-1"
              title="Close Note Editor"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Write key takeaways or problem hints..."
            rows={2}
            autoFocus
            className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-500/20"
          />

          <div className="flex items-center justify-between pt-1">
            {existingNote ? (
              <button
                type="button"
                onClick={handleDeleteNote}
                className="flex items-center gap-1 px-2.5 py-1 text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-all"
              >
                <Trash2 className="w-3 h-3" />
                <span>Delete Note</span>
              </button>
            ) : <div />}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowNoteInput(false)}
                className="px-3 py-1 text-xs text-slate-500 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-3.5 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-semibold shadow-sm transition-all"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save Note</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Collapsed Compact Note Preview */}
      {!showNoteInput && existingNote && (
        <div className="p-3 rounded-xl bg-cyan-50/80 border border-cyan-200 text-xs text-slate-800 flex items-center justify-between gap-3 shadow-sm transition-all">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <StickyNote className="w-4 h-4 text-cyan-600 shrink-0" />
            <div className="min-w-0 flex-1">
              <span className="font-semibold text-cyan-900 mr-2 text-[11px] uppercase tracking-wider">Note:</span>
              <span className="italic text-slate-700 truncate inline-block max-w-full align-bottom">{existingNote}</span>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={handleOpenNoteEditor}
              className="p-1 rounded-md text-cyan-700 hover:text-cyan-900 hover:bg-cyan-100 transition-colors"
              title="Edit Note"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleDeleteNote}
              className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              title="Delete Note"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Question Text */}
      <div className="space-y-3">
        <h3 className="text-base sm:text-lg font-semibold text-slate-900 leading-relaxed">
          {config.question}
        </h3>

        {/* Given values for numericals */}
        {config.given && config.given.length > 0 && (
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block">
              Given Information:
            </span>
            <ul className="space-y-1 text-xs text-slate-700 font-mono">
              {config.given.map((g, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="text-cyan-600 font-bold">▹</span>
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Answer Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* MCQ Options */}
        {isMCQ && config.options && (
          <div className="space-y-2">
            {config.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              let optionStyle = 'bg-slate-50/70 border-slate-200/80 hover:border-slate-300 text-slate-700 hover:bg-slate-50';

              if (isSubmitted) {
                if (idx === config.correctAnswer) {
                  optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-medium shadow-sm';
                } else if (isSelected && !isCorrect) {
                  optionStyle = 'bg-rose-50 border-rose-500 text-rose-900';
                } else {
                  optionStyle = 'opacity-50 bg-slate-50 border-slate-200';
                }
              } else if (isSelected) {
                optionStyle = 'bg-cyan-50/80 border-cyan-600 text-cyan-950 font-medium shadow-sm ring-1 ring-cyan-600/30';
              }

              return (
                <button
                  type="button"
                  key={idx}
                  disabled={isSubmitted}
                  onClick={() => setSelectedOption(idx)}
                  className={`w-full p-3.5 rounded-xl border text-left transition-all duration-150 flex items-center justify-between gap-3 cursor-pointer ${optionStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-md bg-white border border-slate-200 flex items-center justify-center font-mono text-xs font-bold shrink-0 text-slate-700 shadow-sm">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-sm leading-snug">{opt}</span>
                  </div>

                  {isSubmitted && idx === config.correctAnswer && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  )}
                  {isSubmitted && isSelected && !isCorrect && (
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Numerical Input */}
        {!isMCQ && (
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <input
                type="text"
                disabled={isSubmitted}
                value={numericalInput}
                onChange={(e) => setNumericalInput(e.target.value)}
                placeholder="Enter calculated numerical value (e.g. 0.278)"
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-mono text-sm focus:outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-500/20 disabled:opacity-50 shadow-sm"
              />
              <span className="text-xs text-slate-500 font-mono px-1">
                Tolerance: ±{config.tolerance ?? 0.05}
              </span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2">
            {config.hints && config.hints.length > 0 && (
              <button
                type="button"
                onClick={() => setShowHint(!showHint)}
                className="flex items-center gap-1 text-xs text-amber-800 hover:text-amber-900 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 font-medium cursor-pointer"
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                {showHint ? 'Hide Hint' : 'Need a Hint?'}
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {isSubmitted ? (
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={handleRetry}
                icon={<RotateCcw className="w-3.5 h-3.5" />}
              >
                Try Again
              </Button>
            ) : (
              <button
                type="submit"
                disabled={isMCQ ? selectedOption === null : !numericalInput.trim()}
                className="px-4 py-2 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-all shadow-sm disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer"
              >
                <span>Submit Answer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Hint */}
      {showHint && config.hints && (
        <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs space-y-1.5 animate-slide-up">
          <div className="font-semibold flex items-center gap-1.5 text-amber-800">
            <Lightbulb className="w-3.5 h-3.5 text-amber-600" /> Hint:
          </div>
          {config.hints.map((h, i) => (
            <p key={i} className="pl-5 text-slate-700 leading-relaxed">{h}</p>
          ))}
        </div>
      )}

      {/* Feedback & Derivations */}
      {isSubmitted && (
        <div
          className={`p-5 rounded-xl border space-y-3 animate-slide-up ${
            isCorrect
              ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
              : 'bg-rose-50/80 border-rose-200 text-rose-950'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {isCorrect ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-emerald-800">Correct Solution!</h4>
                  <p className="text-xs text-slate-600">+{config.marks} marks awarded</p>
                </div>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-rose-800">Incorrect Answer</h4>
                  <p className="text-xs text-slate-600">
                    Correct Answer: <strong className="text-slate-900 font-mono">{config.answer || (config.options && config.options[Number(config.correctAnswer)])}</strong>
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Derivation steps table */}
          {config.steps && config.steps.length > 0 && (
            <div className="pt-3 border-t border-slate-200/80 space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 block">
                Step-by-Step Derivation:
              </span>
              <ol className="space-y-1.5 pl-4 text-xs font-mono text-slate-800 list-decimal">
                {config.steps.map((step, sIdx) => (
                  <li key={sIdx} className="leading-relaxed">{step}</li>
                ))}
              </ol>
            </div>
          )}

          {/* Explanation */}
          <div className="pt-2 border-t border-slate-200/80">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 block mb-1">
              NCERT Explanation:
            </span>
            <p className="text-xs text-slate-600 leading-relaxed">
              {config.explanation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
