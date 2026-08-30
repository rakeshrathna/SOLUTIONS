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
        <div className="p-4 border-b border-[#E5E5E5] flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-black">
            <Layers className="w-3.5 h-3.5 text-[#DA434C]" />
            <span>Curriculum Units</span>
          </div>
          <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-[#FAFAFA] text-[#555555] border border-[#E5E5E5]">
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
                    ? 'bg-rose-50/70 border-[#DA434C] shadow-sm'
                    : 'bg-white border-[#E5E5E5] hover:border-slate-300 hover:bg-[#FAFAFA]'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-mono font-bold ${
                        isCompleted
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : isActive
                          ? 'bg-[#DA434C] text-white font-bold'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {lesson.order}
                    </span>
                    <h4
                      className={`text-xs font-medium line-clamp-1 ${
                        isActive ? 'text-[#DA434C] font-semibold' : 'text-black group-hover:text-black'
                      }`}
                    >
                      {lesson.title}
                    </h4>
                  </div>

                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <ChevronRight
                      className={`w-3.5 h-3.5 text-slate-400 group-hover:text-[#DA434C] transition-colors shrink-0 ${
                        isActive ? 'text-[#DA434C]' : ''
                      }`}
                    />
                  )}
                </div>

                {/* Progress bar */}
                <div className="flex items-center justify-between text-[10px] text-[#555555] gap-2">
                  <div className="flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{lesson.estimatedTime}m</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono">
                    <span>{lessonProgress?.completedSections.length || 0}/{lesson.sections.length}</span>
                    <div className="w-12 h-1 bg-[#E5E5E5] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#DA434C] rounded-full transition-all"
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
        <div className="p-3 border-t border-[#E5E5E5] bg-[#FAFAFA] space-y-2">
          <NavLink
            to="/notes"
            onClick={onClose}
            className="w-full py-2 px-3 rounded-xl bg-white hover:bg-slate-50 border border-[#E5E5E5] text-black text-xs font-semibold flex items-center justify-between transition-all shadow-sm"
          >
            <div className="flex items-center gap-2">
              <StickyNote className="w-3.5 h-3.5 text-[#DA434C]" />
              <span>Saved Notes</span>
            </div>
            {notesCount > 0 && (
              <span className="text-[10px] font-mono font-bold px-2 py-0.2 rounded-full bg-rose-50 text-[#DA434C] border border-rose-200">
                {notesCount}
              </span>
            )}
          </NavLink>

          <NavLink
            to="/practice"
            onClick={onClose}
            className="w-full py-2 px-3 rounded-xl bg-[#DA434C] hover:bg-[#C93640] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            <Award className="w-3.5 h-3.5 text-white" />
            <span>Practice Mode</span>
          </NavLink>
        </div>
      </aside>
    </>
  );
};
