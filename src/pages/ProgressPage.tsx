import React from 'react';
import { Link } from 'react-router-dom';
import { chapterData } from '../data/chapter';
import { useProgressStore } from '../stores/progressStore';
import { ProgressBar } from '../components/common/ProgressBar';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { formatTime } from '../utils/formatters';
import {
  BarChart2,
  Bookmark,
  StickyNote,
  RotateCcw,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export const ProgressPage: React.FC = () => {
  const {
    lessons,
    totalTimeSpent,
    overallScore,
    completedLessonsCount,
    bookmarkedSections,
    notes,
    resetProgress,
    getChapterProgressPercentage,
    getLessonProgressPercentage
  } = useProgressStore();

  const chapterPct = getChapterProgressPercentage();

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-card space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-50 text-cyan-700 border border-cyan-200 shadow-sm">
              <BarChart2 className="w-5 h-5 text-cyan-600" />
            </div>
            <div>
              <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Learning Progress & Analytics
              </h1>
              <p className="text-xs sm:text-sm text-slate-600">
                Track syllabus mastery, time invested, question accuracy, and revision notes
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (window.confirm('Are you sure you want to reset all progress and quiz records?')) {
                resetProgress();
              }
            }}
            icon={<RotateCcw className="w-3.5 h-3.5" />}
            className="text-rose-700 hover:text-rose-800 hover:bg-rose-50 border border-rose-200"
          >
            Reset Progress
          </Button>
        </div>

        {/* Global Stats 4-Card Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Chapter Mastery</span>
            <div className="text-3xl font-bold text-cyan-700 font-mono">
              {chapterPct}%
            </div>
            <span className="text-[11px] text-slate-400 font-mono">8 curriculum units</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Completed</span>
            <div className="text-3xl font-bold text-slate-900 font-mono">
              {completedLessonsCount} / {chapterData.lessons.length}
            </div>
            <span className="text-[11px] text-slate-400 font-mono">Units finished</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Practice Points</span>
            <div className="text-3xl font-bold text-amber-700 font-mono">
              {overallScore} pts
            </div>
            <span className="text-[11px] text-slate-400 font-mono">Earned from problems</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Time Invested</span>
            <div className="text-3xl font-bold text-cyan-800 font-mono">
              {formatTime(totalTimeSpent)}
            </div>
            <span className="text-[11px] text-slate-400 font-mono">Active session time</span>
          </div>
        </div>
      </div>

      {/* Lesson-by-Lesson Progress Breakdown */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-900 tracking-tight">
          Curriculum Unit Mastery
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {chapterData.lessons.map((lesson) => {
            const lessonProgress = lessons[lesson.id];
            const completedCount = lessonProgress?.completedSections.length || 0;
            const pct = getLessonProgressPercentage(lesson.id);

            return (
              <div key={lesson.id} className="p-5 rounded-2xl border border-slate-200 bg-white shadow-card space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-md bg-slate-100 text-cyan-700 font-mono text-xs font-bold flex items-center justify-center border border-slate-200">
                      {lesson.order}
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 line-clamp-1">
                        {lesson.title}
                      </h4>
                      <span className="text-[11px] text-slate-500 font-mono">
                        {completedCount} of {lesson.sections.length} sections done
                      </span>
                    </div>
                  </div>

                  <Link to={`/lesson/${lesson.id}`}>
                    <Button variant="ghost" size="sm" icon={<ArrowRight className="w-3.5 h-3.5" />}>
                      Study
                    </Button>
                  </Link>
                </div>

                <ProgressBar value={pct} size="sm" showPercentage={true} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Bookmarks & Notes Section with Direct Link to /notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bookmarks */}
        <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-cyan-700" />
              <h3 className="text-base font-semibold text-slate-900">Bookmarked Sections</h3>
            </div>
            <Link
              to="/notes"
              className="text-xs font-semibold text-cyan-700 hover:text-cyan-900 flex items-center gap-1"
            >
              <span>Manage All</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          {bookmarkedSections.length === 0 ? (
            <p className="text-xs text-slate-500 italic">
              No bookmarked sections yet. Click the bookmark icon next to any section during study to pin it here.
            </p>
          ) : (
            <div className="space-y-2">
              {bookmarkedSections.slice(0, 5).map((secId) => (
                <div
                  key={secId}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs text-slate-700 shadow-sm"
                >
                  <span className="font-mono text-cyan-700 font-semibold">{secId}</span>
                  <Badge variant="brand">Bookmarked</Badge>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Personal Revision Notes */}
        <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <StickyNote className="w-4 h-4 text-cyan-700" />
              <h3 className="text-base font-semibold text-slate-900">Personal Revision Notes</h3>
            </div>
            <Link
              to="/notes"
              className="text-xs font-semibold text-cyan-700 hover:text-cyan-900 flex items-center gap-1"
            >
              <span>View All Notes</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          {Object.keys(notes).length === 0 ? (
            <p className="text-xs text-slate-500 italic">
              No notes written yet. Click the sticky note icon on any section to add personal revision notes.
            </p>
          ) : (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {Object.entries(notes).slice(0, 5).map(([secId, note]) => (
                <div
                  key={secId}
                  className="p-3 rounded-xl bg-cyan-50 border border-cyan-200 text-xs text-slate-800 space-y-1 shadow-sm"
                >
                  <div className="font-mono text-[10px] text-cyan-800 font-bold uppercase">{secId}</div>
                  <p className="italic text-slate-600 line-clamp-2">{note}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
