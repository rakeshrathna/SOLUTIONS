import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { chapterData } from '../data/chapter';
import { useProgressStore } from '../stores/progressStore';
import { SectionRenderer } from '../components/widgets/SectionRenderer';
import { ProgressBar } from '../components/common/ProgressBar';
import { Button } from '../components/common/Button';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle2,
  ListOrdered
} from 'lucide-react';

export const LessonPage: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();

  const lessons = useProgressStore((state) => state.lessons);
  const getLessonProgressPercentage = useProgressStore((state) => state.getLessonProgressPercentage);
  const incrementTimeSpent = useProgressStore((state) => state.incrementTimeSpent);

  useEffect(() => {
    const timer = setInterval(() => {
      incrementTimeSpent(5);
    }, 5000);
    return () => clearInterval(timer);
  }, [incrementTimeSpent]);

  const currentLessonIndex = chapterData.lessons.findIndex((l) => l.id === lessonId);
  const lesson = currentLessonIndex !== -1 ? chapterData.lessons[currentLessonIndex] : chapterData.lessons[0];

  const prevLesson = currentLessonIndex > 0 ? chapterData.lessons[currentLessonIndex - 1] : null;
  const nextLesson = currentLessonIndex < chapterData.lessons.length - 1 ? chapterData.lessons[currentLessonIndex + 1] : null;

  const lessonProgress = lessons[lesson.id];
  const progressPct = getLessonProgressPercentage(lesson.id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [lessonId]);

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs text-[#555555] hover:text-[#C0222E] transition-colors font-medium cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Chapter Directory</span>
        </Link>

        {/* Top Navigation: Previous & Next */}
        <div className="flex items-center gap-2">
          {prevLesson && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate(`/lesson/${prevLesson.id}`)}
              icon={<ChevronLeft className="w-4 h-4" />}
            >
              Previous
            </Button>
          )}
          {nextLesson && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate(`/lesson/${nextLesson.id}`)}
              icon={<ChevronRight className="w-4 h-4" />}
              iconPosition="right"
            >
              Next
            </Button>
          )}
        </div>
      </div>

      {/* Lesson Header Banner */}
      <div className="w-full rounded-2xl border border-[#E5E5E5] bg-white p-6 sm:p-8 shadow-card space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded bg-rose-50 text-[#C0222E] border border-rose-200 uppercase tracking-wider">
            Unit {lesson.order} of {chapterData.lessons.length}
          </span>
          <div className="flex items-center gap-3 text-xs font-mono text-[#555555]">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              ~{lesson.estimatedTime} mins
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <ListOrdered className="w-3.5 h-3.5 text-slate-400" />
              {lesson.sections.length} Sections
            </span>
          </div>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight leading-tight">
            {lesson.title}
          </h1>
          {lesson.description && (
            <p className="text-sm text-slate-600 mt-2 leading-relaxed max-w-3xl">
              {lesson.description}
            </p>
          )}
        </div>

        {/* Progress Bar */}
        <div className="pt-2 border-t border-slate-100 space-y-1.5">
          <div className="flex items-center justify-between text-xs font-medium text-slate-600">
            <span>Unit Progress</span>
            <span className="font-mono text-cyan-700">
              {lessonProgress?.completedSections.length || 0} / {lesson.sections.length} Completed ({progressPct}%)
            </span>
          </div>
          <ProgressBar value={progressPct} size="md" showPercentage={false} />
        </div>
      </div>

      {/* Sequential Sections */}
      <div className="space-y-8">
        {lesson.sections.map((section) => (
          <SectionRenderer
            key={section.id}
            section={section}
            lessonId={lesson.id}
          />
        ))}
      </div>

      {/* Lesson Footer Navigation */}
      <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        {prevLesson ? (
          <Button
            variant="secondary"
            size="md"
            onClick={() => navigate(`/lesson/${prevLesson.id}`)}
            icon={<ChevronLeft className="w-4 h-4" />}
            className="w-full sm:w-auto"
          >
            Previous: {prevLesson.title}
          </Button>
        ) : (
          <div />
        )}

        {nextLesson ? (
          <Button
            variant="primary"
            size="md"
            onClick={() => navigate(`/lesson/${nextLesson.id}`)}
            icon={<ChevronRight className="w-4 h-4" />}
            iconPosition="right"
            className="w-full sm:w-auto"
          >
            Next: {nextLesson.title}
          </Button>
        ) : (
          <Link to="/practice" className="w-full sm:w-auto">
            <Button
              variant="primary"
              size="md"
              icon={<CheckCircle2 className="w-4 h-4" />}
              className="w-full"
            >
              Start Chapter Practice Bank
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};
