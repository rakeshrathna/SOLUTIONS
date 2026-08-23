import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { chapterData } from '../../data/chapter';
import { useProgressStore } from '../../stores/progressStore';
import { CheckCircle2, Clock, ChevronRight, Layers, Award, StickyNote } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { lessonId } = useParams();
  const lessons = useProgressStore((state) => state.lessons);
  const notes = useProgressStore((state) => state.notes);
  const notesCount = Object.keys(notes).filter((k) => Boolean(notes[k]?.trim())).length;
  const getLessonProgressPercentage = useProgressStore((state) => state.getLessonProgressPercentage);

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden animate-fade-in"
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed top-14 bottom-0 left-0 z-40 w-72 md:w-80 bg-white/95 backdrop-blur-xl border-r border-slate-200 flex flex-col transition-transform duration-200 ease-in-out shadow-sm ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-600">
            <Layers className="w-3.5 h-3.5 text-cyan-600" />
            <span>Curriculum Units</span>
          </div>
          <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
            8 Units
          </span>
        </div>

        {/* Lesson List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5 custom-scrollbar">
          {chapterData.lessons.map((lesson) => {
            const lessonProgress = lessons[lesson.id];
            const isCompleted = lessonProgress?.status === 'COMPLETED';
            const progressPct = getLessonProgressPercentage(lesson.id);
            const isActive = lessonId === lesson.id;

            return (
              <NavLink
                key={lesson.id}
                to={`/lesson/${lesson.id}`}
                onClick={onClose}
                className={`flex flex-col gap-2 p-3 rounded-xl border transition-all duration-150 group ${
                  isActive
                    ? 'bg-cyan-50/70 border-cyan-500/50 shadow-sm'
                    : 'bg-white border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/80'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-mono font-bold ${
                        isCompleted
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : isActive
                          ? 'bg-cyan-600 text-white font-bold'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {lesson.order}
                    </span>
                    <h4
                      className={`text-xs font-medium line-clamp-1 ${
                        isActive ? 'text-cyan-900 font-semibold' : 'text-slate-700 group-hover:text-slate-900'
                      }`}
                    >
                      {lesson.title}
                    </h4>
                  </div>

                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <ChevronRight
                      className={`w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-600 transition-colors shrink-0 ${
                        isActive ? 'text-cyan-600' : ''
                      }`}
                    />
                  )}
                </div>

                {/* Progress bar */}
                <div className="flex items-center justify-between text-[10px] text-slate-500 gap-2">
                  <div className="flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{lesson.estimatedTime}m</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono">
                    <span>{lessonProgress?.completedSections.length || 0}/{lesson.sections.length}</span>
                    <div className="w-12 h-1 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-cyan-600 rounded-full transition-all"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  </div>
                </div>
              </NavLink>
            );
          })}
        </div>

        {/* Quick Review Footer: Saved Notes + Practice Engine */}
        <div className="p-3 border-t border-slate-200 bg-slate-50/80 space-y-2">
          <NavLink
            to="/notes"
            onClick={onClose}
            className="w-full py-2 px-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-between transition-all shadow-sm"
          >
            <div className="flex items-center gap-2">
              <StickyNote className="w-3.5 h-3.5 text-cyan-600" />
              <span>Saved Notes</span>
            </div>
            {notesCount > 0 && (
              <span className="text-[10px] font-mono font-bold px-2 py-0.2 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200">
                {notesCount}
              </span>
            )}
          </NavLink>

          <NavLink
            to="/practice"
            onClick={onClose}
            className="w-full py-2 px-3 rounded-xl bg-cyan-50 hover:bg-cyan-100 border border-cyan-300 text-cyan-700 text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            <Award className="w-3.5 h-3.5 text-cyan-600" />
            <span>Practice Mode</span>
          </NavLink>
        </div>
      </aside>
    </>
  );
};
