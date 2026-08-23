import React, { useState } from 'react';
import { LessonSection } from '../../types/lesson';
import { TextSection } from './TextSection';
import { FormulaWidget } from './FormulaWidget';
import { GraphWidget } from './GraphWidget';
import { SimulationWidget } from './SimulationWidget';
import { QuestionWidget } from './QuestionWidget';
import { StepSolverWidget } from './StepSolverWidget';
import { useProgressStore } from '../../stores/progressStore';
import { CheckCircle2, Bookmark, StickyNote, Edit3, Trash2, X, Check } from 'lucide-react';

interface SectionRendererProps {
  section: LessonSection;
  lessonId: string;
}

export const SectionRenderer: React.FC<SectionRendererProps> = ({ section, lessonId }) => {
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [noteText, setNoteText] = useState('');

  const {
    lessons,
    toggleSectionComplete,
    bookmarkedSections,
    toggleBookmark,
    notes,
    saveNote,
    deleteNote
  } = useProgressStore();

  const lesson = lessons[lessonId];
  const isCompleted = lesson?.completedSections.includes(section.id) || false;
  const isBookmarked = bookmarkedSections.includes(section.id);
  const existingNote = notes[section.id] || '';

  const handleToggleComplete = () => {
    toggleSectionComplete(lessonId, section.id);
  };

  const handleOpenNoteEditor = () => {
    setNoteText(existingNote);
    setShowNoteInput(true);
  };

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (noteText.trim()) {
      saveNote(section.id, noteText.trim());
    } else {
      deleteNote(section.id);
    }
    // Auto-collapse after saving to keep UI compact as requested
    setShowNoteInput(false);
  };

  const handleDeleteNote = () => {
    deleteNote(section.id);
    setNoteText('');
    setShowNoteInput(false);
  };

  return (
    <div id={section.id} className="relative group space-y-3 scroll-mt-24">
      {/* Top Action Bar for this section */}
      <div className="flex items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono font-semibold text-cyan-800 uppercase tracking-widest px-2.5 py-0.5 rounded bg-cyan-50 border border-cyan-200">
            Section {section.order} • {section.type}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs">
          {/* Bookmark Button */}
          <button
            onClick={() => toggleBookmark(section.id)}
            className={`p-1.5 rounded-lg border transition-all ${
              isBookmarked
                ? 'bg-amber-50 text-amber-700 border-amber-300 shadow-sm'
                : 'bg-white text-slate-500 border-slate-200 hover:text-slate-800 hover:border-slate-300 shadow-sm'
            }`}
            title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Section'}
          >
            <Bookmark className="w-3.5 h-3.5" fill={isBookmarked ? 'currentColor' : 'none'} />
          </button>

          {/* Note Toggle Button */}
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

          {/* Interactive Toggleable Completion Button */}
          <button
            onClick={handleToggleComplete}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-semibold transition-all shadow-sm cursor-pointer ${
              isCompleted
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                : 'bg-white text-slate-600 border-slate-200 hover:border-cyan-500 hover:text-cyan-700 hover:bg-slate-50'
            }`}
            title={isCompleted ? 'Click to unmark as completed' : 'Click to mark as completed'}
          >
            <CheckCircle2 className={`w-3.5 h-3.5 ${isCompleted ? 'text-emerald-600' : 'text-slate-400'}`} />
            <span>{isCompleted ? 'Completed' : 'Mark Done'}</span>
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
            placeholder="Write key takeaways, memory aids, or doubt notes for this section..."
            rows={3}
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

      {/* Collapsed Compact Note Preview Banner (when note exists and editor is closed) */}
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

      {/* Dynamic Widget Rendering */}
      {section.type === 'TEXT' && (
        <TextSection title={section.title} content={section.content || ''} />
      )}

      {section.type === 'FORMULA' && section.config && (
        <FormulaWidget config={section.config} />
      )}

      {section.type === 'GRAPH' && section.config && (
        <GraphWidget config={section.config} />
      )}

      {section.type === 'SIMULATION' && section.config && (
        <SimulationWidget config={section.config} />
      )}

      {section.type === 'STEP_SOLVER' && section.config && (
        <StepSolverWidget config={section.config} />
      )}

      {section.type === 'QUESTION' && section.config && (
        <QuestionWidget
          config={section.config}
          onAnswerSubmit={(isCorrect) => {
            if (isCorrect) toggleSectionComplete(lessonId, section.id);
          }}
        />
      )}
    </div>
  );
};
