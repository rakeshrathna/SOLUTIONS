import React from 'react';
import { Link } from 'react-router-dom';
import { chapterData } from '../data/chapter';
import { useProgressStore } from '../stores/progressStore';
import { Button } from '../components/common/Button';
import { ProgressBar } from '../components/common/ProgressBar';
import {
  Clock,
  ArrowRight,
  Award,
  Flame,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const lessons = useProgressStore((state) => state.lessons);
  const getChapterProgressPercentage = useProgressStore((state) => state.getChapterProgressPercentage);
  const overallScore = useProgressStore((state) => state.overallScore);
  const completedLessonsCount = useProgressStore((state) => state.completedLessonsCount);

  const chapterPct = getChapterProgressPercentage();

  const nextLesson = chapterData.lessons.find(
    (l) => lessons[l.id]?.status !== 'COMPLETED'
  ) || chapterData.lessons[0];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-card">
        <div className="relative z-10 w-full space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded bg-rose-50 text-[#C0222E] border border-rose-200">
              EDUiDEAL Academy
            </span>
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded bg-rose-50 text-[#C0222E] border border-rose-200">
              {chapterData.class}
            </span>
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#FAFAFA] text-[#555555] border border-[#E5E5E5]">
              {chapterData.subject}
            </span>
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#FAFAFA] text-[#555555] border border-[#E5E5E5]">
              CBSE Class 12 Core
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight">
            Chapter 1: <span className="text-[#C0222E]">Solutions</span>
          </h1>

          <p className="text-sm text-[#555555] leading-relaxed max-w-4xl">
            {chapterData.description}
          </p>

          {/* Quick Metrics (Student-friendly Chemistry terms) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-[#FAFAFA] border border-[#E5E5E5]">
              <span className="text-[11px] text-[#555555] font-medium uppercase tracking-wider">Curriculum</span>
              <div className="text-base sm:text-lg font-bold text-black font-mono mt-0.5">8 Units</div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#FAFAFA] border border-[#E5E5E5]">
              <span className="text-[11px] text-[#555555] font-medium uppercase tracking-wider">Particle Labs</span>
              <div className="text-base sm:text-lg font-bold text-[#C0222E] font-mono mt-0.5">3 Interactive</div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#FAFAFA] border border-[#E5E5E5]">
              <span className="text-[11px] text-[#555555] font-medium uppercase tracking-wider">Visual Curves</span>
              <div className="text-base sm:text-lg font-bold text-[#C0222E] font-mono mt-0.5">8 Interactive</div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#FAFAFA] border border-[#E5E5E5]">
              <span className="text-[11px] text-[#555555] font-medium uppercase tracking-wider">Exam Bank</span>
              <div className="text-base sm:text-lg font-bold text-amber-700 font-mono mt-0.5">30 NCERT Qs</div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <Link to={`/lesson/${nextLesson.id}`}>
              <Button
                variant="primary"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                {chapterPct > 0 ? 'Resume Unit' : 'Start Chapter'}
              </Button>
            </Link>

            <Link to="/practice">
              <Button variant="secondary" size="md" icon={<Award className="w-4 h-4" />}>
                Practice Exam Questions
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Progress Summary Strip */}
      <div className="w-full rounded-2xl border border-[#E5E5E5] bg-white p-6 shadow-card">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 w-full sm:w-1/2">
            <div className="flex items-center justify-between text-xs font-semibold text-[#555555]">
              <span className="flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-[#C0222E]" />
                <span>Chapter Mastery Progress</span>
              </span>
              <span className="font-mono text-[#C0222E] font-bold">{chapterPct}%</span>
            </div>
            <ProgressBar value={chapterPct} size="md" color="brand" showPercentage={false} />
            <p className="text-[11px] text-[#777777]">
              {completedLessonsCount} of {chapterData.lessons.length} units completed
            </p>
          </div>

          <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 sm:border-l border-[#E5E5E5] pt-4 sm:pt-0 sm:pl-6">
            <div>
              <span className="text-[11px] text-[#777777] uppercase tracking-wider font-mono">Score</span>
              <div className="text-2xl font-bold text-black font-mono">{overallScore} pts</div>
            </div>
            <Link to="/progress">
              <Button variant="secondary" size="sm">
                View Progress
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Lessons Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-black tracking-tight">
              Curriculum Units
            </h2>
            <p className="text-xs text-[#555555]">
              Interactive formulas, dynamic graphs, particle simulations, and NCERT practice
            </p>
          </div>
          <span className="text-xs text-[#777777] font-mono">
            ~{chapterData.estimatedTime} mins total
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {chapterData.lessons.map((lesson) => {
            const lessonProgress = lessons[lesson.id];
            const isCompleted = lessonProgress?.status === 'COMPLETED';
            const completedCount = lessonProgress?.completedSections.length || 0;
            const pct = Math.round((completedCount / lesson.sections.length) * 100);

            return (
              <Link
                key={lesson.id}
                to={`/lesson/${lesson.id}`}
                className="group block"
              >
                <div className="h-full flex flex-col justify-between p-5 rounded-2xl border border-[#E5E5E5] bg-white shadow-card hover:border-[#C0222E] hover:shadow-card-hover transition-all duration-150">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-md bg-[#FAFAFA] border border-[#E5E5E5] text-[#C0222E] font-mono font-bold text-xs flex items-center justify-center">
                          {lesson.order}
                        </span>
                        <span className="text-xs font-mono text-[#777777] flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {lesson.estimatedTime}m
                        </span>
                      </div>

                      {isCompleted ? (
                        <span className="text-[11px] font-mono font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          ✓ Done
                        </span>
                      ) : (
                        <span className="text-[11px] text-[#777777] font-mono">
                          {lesson.sections.length} Sections
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-semibold text-black group-hover:text-[#C0222E] transition-colors leading-snug">
                      {lesson.title}
                    </h3>

                    <p className="text-xs text-[#555555] line-clamp-2 leading-relaxed">
                      {lesson.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-[#E5E5E5] space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#777777]">
                      <span>Progress</span>
                      <span className="font-semibold text-[#C0222E]">{pct}%</span>
                    </div>
                    <ProgressBar value={pct} size="sm" showPercentage={false} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
