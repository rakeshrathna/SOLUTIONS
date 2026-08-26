import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logoImg from '../assets/logo.png';
import { subjectsData, chemistryLessonsData, Subject, ChemistryLesson } from '../data/curriculumData';
import {
  FlaskConical, Zap, Timer, Atom, Link2, Layers,
  Droplets, Wind, Leaf, Lock, ChevronRight,
  BookOpen, BarChart2, StickyNote, CheckSquare,
  Phone, MapPin, ArrowRight, GraduationCap,
  Beaker, Calculator, TrendingUp, ClipboardList,
  Star, Users, Award, Sparkles, CheckCircle2
} from 'lucide-react';

/* ─── Brand color ─────────────────────────────────────────── */
const BRAND = 'rgb(21,0,154)';
const BRAND_LIGHT = 'rgba(21,0,154,0.06)';
const BRAND_BORDER = 'rgba(21,0,154,0.18)';
const BRAND_MED = 'rgba(21,0,154,0.12)';

/* ─── Icon resolver map ───────────────────────────────────── */
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FlaskConical,
  Zap,
  Timer,
  Atom,
  Link2,
  Layers,
  Droplets,
  Wind,
  Leaf,
  Calculator,
  TrendingUp,
};

const catColor: Record<string, string> = {
  Physical: 'rgba(21,0,154,0.08)',
  Inorganic: 'rgba(5,150,105,0.08)',
  Organic: 'rgba(217,119,6,0.08)',
};
const catText: Record<string, string> = {
  Physical: BRAND,
  Inorganic: '#047857',
  Organic: '#B45309',
};
const catBorder: Record<string, string> = {
  Physical: 'rgba(21,0,154,0.2)',
  Inorganic: 'rgba(5,150,105,0.2)',
  Organic: 'rgba(217,119,6,0.2)',
};

const features = [
  { icon: Beaker, label: 'Interactive Formulas', desc: 'Drag sliders to see formulas compute results in real time.' },
  { icon: TrendingUp, label: 'Live Graphs & Visualizations', desc: 'Dynamic ECharts curves that update as you change parameters.' },
  { icon: FlaskConical, label: 'Physics Simulations', desc: 'Particle, osmosis, and van\'t Hoff canvas simulations.' },
  { icon: ClipboardList, label: 'Interactive Quizzes', desc: '30 NCERT MCQs and numericals with instant feedback.' },
  { icon: StickyNote, label: 'Smart Notes & Bookmarks', desc: 'Auto-collapsing notes that persist across sessions.' },
  { icon: BarChart2, label: 'Progress Tracking', desc: 'Chapter mastery, unit scores, and completion badges.' },
  { icon: Calculator, label: 'Step-by-Step Solutions', desc: 'Full arithmetic derivations for every NCERT problem.' },
];

const howItWorks = [
  { step: '01', label: 'Pick a Subject', desc: 'Choose Chemistry, Physics, or Mathematics from your dashboard.' },
  { step: '02', label: 'Select a Lesson', desc: 'Pick from 10 CBSE Class 12 curriculum lessons.' },
  { step: '03', label: 'Study Interactively', desc: 'Read, simulate, visualize, and compute — all in one place.' },
  { step: '04', label: 'Track Mastery', desc: 'Take practice tests, review notes, and monitor your score.' },
];

const stats = [
  { icon: BookOpen, value: '3', label: 'Subjects Covered' },
  { icon: Award, value: '10', label: 'Chemistry Lessons' },
  { icon: Users, value: '30+', label: 'NCERT Problems' },
  { icon: Star, value: '100%', label: 'Free to Use' },
];

const branches = [
  { city: 'Perambur', address: 'MPM Street', phone: '9884234949' },
  { city: 'Kodungaiyur', address: 'Near Pandiyan Theatre', phone: '9790924949' },
  { city: 'Agaram Jn.', address: 'Agaram Jn.', phone: '7845977500' },
];

/* ─── Animated in-view hook ────────────────────────────────── */
function useInView(ref: React.RefObject<Element>) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}

/* ─── Subject Card Component ───────────────────────────────── */
const SubjectCard: React.FC<{
  subject: Subject;
  onLocked: (title: string) => void;
}> = ({ subject, onLocked }) => {
  const navigate = useNavigate();
  const Icon = iconMap[subject.iconName] || FlaskConical;
  const isActive = subject.status === 'ACTIVE';

  const handleCardClick = () => {
    if (isActive && subject.route) {
      navigate(subject.route);
    } else {
      onLocked(subject.name);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className={`relative rounded-3xl border p-7 flex flex-col justify-between transition-all duration-300 select-none ${
        isActive
          ? 'bg-white border-slate-200 hover:border-[#15009A] hover:shadow-2xl hover:shadow-indigo-900/10 cursor-pointer group'
          : 'bg-slate-50/80 border-slate-200/80 opacity-55 cursor-not-allowed'
      }`}
      style={{
        boxShadow: isActive ? '0 4px 20px rgba(0,0,0,0.04)' : 'none',
      }}
    >
      <div>
        <div className="flex items-start justify-between gap-4 mb-5">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
              isActive
                ? 'text-white shadow-md group-hover:scale-105 group-hover:rotate-1'
                : 'bg-slate-200 text-slate-400'
            }`}
            style={{
              background: isActive ? BRAND : undefined,
            }}
          >
            <Icon className="w-7 h-7" />
          </div>

          <div>
            {isActive ? (
              <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                Available Now
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-slate-200/70 text-slate-500 border border-slate-300/60">
                <Lock className="w-3 h-3" />
                Coming Soon
              </span>
            )}
          </div>
        </div>

        <div className="mb-2">
          <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400">
            {subject.badge}
          </span>
        </div>

        <h3
          className={`text-2xl font-extrabold tracking-tight mb-2.5 ${
            isActive ? 'text-slate-900 group-hover:text-[#15009A] transition-colors' : 'text-slate-700'
          }`}
        >
          {subject.name}
        </h3>

        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          {subject.description}
        </p>

        <div className="space-y-2 mb-6 pt-4 border-t border-slate-100">
          {subject.features.map((feat) => (
            <div key={feat} className="flex items-center gap-2 text-xs text-slate-600">
              <CheckCircle2
                className={`w-3.5 h-3.5 flex-shrink-0 ${
                  isActive ? 'text-[#15009A]' : 'text-slate-400'
                }`}
              />
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-2">
        {isActive ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (subject.route) navigate(subject.route);
            }}
            className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-sm font-bold text-white transition-all shadow-md active:scale-95 group-hover:shadow-lg"
            style={{
              background: BRAND,
              boxShadow: '0 4px 14px rgba(21,0,154,0.3)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.92')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            <span>Start Learning</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        ) : (
          <button
            disabled
            className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-sm font-semibold bg-slate-200 text-slate-400 border border-slate-300/60 cursor-not-allowed"
          >
            <Lock className="w-4 h-4" />
            <span>Coming Soon</span>
          </button>
        )}
      </div>
    </div>
  );
};

/* ─── Chapter / Lesson Card Component ──────────────────────── */
const LessonCard: React.FC<{
  lesson: ChemistryLesson;
  onLocked: (title: string) => void;
}> = ({ lesson, onLocked }) => {
  const navigate = useNavigate();
  const Icon = iconMap[lesson.iconName] || FlaskConical;
  const isActive = lesson.status === 'ACTIVE';

  const handleClick = () => {
    if (isActive && lesson.route) {
      navigate(lesson.route);
    } else {
      onLocked(lesson.title);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`relative rounded-2xl border p-5 flex flex-col justify-between transition-all duration-200 select-none ${
        isActive
          ? 'bg-white border-slate-200 hover:border-[#15009A] hover:shadow-xl hover:shadow-indigo-900/5 cursor-pointer group'
          : 'bg-white/60 border-slate-200/70 opacity-55 cursor-not-allowed'
      }`}
      style={{
        boxShadow: isActive ? '0 2px 8px rgba(0,0,0,0.04)' : 'none',
      }}
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              isActive ? 'text-white shadow-xs group-hover:scale-105' : 'bg-slate-100 text-slate-400'
            }`}
            style={{
              background: isActive ? BRAND : undefined,
            }}
          >
            <Icon className="w-5 h-5" />
          </div>

          <div className="flex flex-col items-end gap-1">
            <span className="text-[10px] font-bold font-mono tracking-widest text-slate-400">
              CH {String(lesson.lessonNumber).padStart(2, '0')}
            </span>
            {isActive ? (
              <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                LIVE
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200">
                <Lock className="w-2.5 h-2.5" />
                LOCKED
              </span>
            )}
          </div>
        </div>

        <div className="mb-2">
          <span
            className="text-[10px] font-semibold px-2 py-0.5 rounded-md"
            style={{
              background: catColor[lesson.category],
              color: catText[lesson.category],
              border: `1px solid ${catBorder[lesson.category]}`,
            }}
          >
            {lesson.category}
          </span>
        </div>

        <h4
          className={`font-bold text-sm leading-snug mb-1 ${
            isActive ? 'text-slate-900 group-hover:text-[#15009A] transition-colors' : 'text-slate-700'
          }`}
        >
          {lesson.title}
        </h4>

        <p className="text-[11px] font-medium text-slate-500 mb-2 leading-relaxed">
          {lesson.subtitle}
        </p>

        <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
          {lesson.description}
        </p>
      </div>

      <div className="pt-3 border-t border-slate-100 mt-auto">
        {isActive ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (lesson.route) navigate(lesson.route);
            }}
            className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold text-white transition-all shadow-xs"
            style={{ background: BRAND }}
          >
            Start Learning <ArrowRight className="w-3 h-3" />
          </button>
        ) : (
          <button
            disabled
            className="w-full flex items-center justify-center gap-1 py-2 px-3 rounded-lg text-xs font-semibold bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed"
          >
            <Lock className="w-3 h-3" />
            <span>Coming Soon</span>
          </button>
        )}
      </div>
    </div>
  );
};

/* ─── Main Academy Dashboard Page ──────────────────────────── */
export const AcademyDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const showToast = (name: string) => {
    setToast(`${name} — Content is being prepared for upcoming release!`);
    setTimeout(() => setToast(null), 3200);
  };

  const scrollToSubjects = () => {
    document.getElementById('subjects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased font-sans">
      <div
        className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
          toast ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-slate-900/95 text-white shadow-2xl border border-slate-700 backdrop-blur-md">
          <Lock className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span className="text-xs sm:text-sm font-medium">{toast}</span>
        </div>
      </div>

      <header
        className="sticky top-0 z-40 transition-all duration-300 bg-white/95 backdrop-blur-xl border-b border-slate-200"
        style={{
          boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.06)' : 'none',
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 p-1 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <img src={logoImg} alt="EDUiDEAL Academy Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-extrabold text-base tracking-tight text-slate-900">
                  Learnova
                </span>
                <span className="text-[10px] font-black tracking-wider uppercase px-1.5 py-0.5 rounded bg-indigo-50 text-[#15009A] border border-indigo-100">
                  EDUiDEAL
                </span>
              </div>
              <div className="text-[9px] font-semibold tracking-wider uppercase text-slate-400 mt-0.5">
                The Digitalized Learning World
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {[
              { label: 'Subjects', href: '#subjects' },
              { label: 'Chemistry Lessons', href: '#chemistry-lessons' },
              { label: 'Features', href: '#features' },
              { label: 'How It Works', href: '#how' },
              { label: 'Branches', href: '#branches' },
            ].map((n) => (
              <a
                key={n.label}
                href={n.href}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <button
            onClick={() => navigate('/chemistry')}
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200 active:scale-95 shadow-sm"
            style={{
              background: BRAND,
              boxShadow: '0 4px 14px rgba(21,0,154,0.3)',
            }}
          >
            Start Chemistry <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      <section className="relative overflow-hidden bg-white border-b border-slate-100">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(21,0,154,0.03) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(21,0,154,0.03) 1px, transparent 1px)`,
            backgroundSize: '36px 36px',
          }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 pb-20 sm:pb-24">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span
                className="text-xs font-semibold px-3 py-1 rounded-full"
                style={{ background: BRAND_LIGHT, color: BRAND, border: `1px solid ${BRAND_BORDER}` }}
              >
                CBSE Class 12 Core
              </span>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                Digitalized STEM Learning
              </span>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                Live Curriculum
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-slate-900 mb-4">
              Welcome to{' '}
              <span
                style={{
                  background: `linear-gradient(135deg, ${BRAND} 0%, #4F46E5 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Learnova
              </span>
            </h1>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-700 mb-6 tracking-tight">
              The Digitalized Learning World
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl">
              Explore interactive concepts, visual learning, formulas, notes, and practice questions designed for CBSE Class 12 students.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={scrollToSubjects}
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-bold text-white transition-all duration-200 active:scale-95 shadow-md"
                style={{ background: BRAND, boxShadow: '0 6px 20px rgba(21,0,154,0.35)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 10px 28px rgba(21,0,154,0.45)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(21,0,154,0.35)';
                }}
              >
                Choose Your Subject <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => navigate('/chemistry')}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-base font-bold border-2 transition-all duration-200 bg-white text-slate-700 hover:text-[#15009A] hover:border-[#15009A] shadow-xs"
              >
                <FlaskConical className="w-5 h-5 text-[#15009A]" />
                Explore Chemistry Lessons
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-6 mt-10 pt-6 border-t border-slate-100 text-xs sm:text-sm text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: BRAND_LIGHT }}>
                  <span style={{ color: BRAND, fontSize: 9, fontWeight: 800 }}>✓</span>
                </div>
                NCERT Aligned
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: BRAND_LIGHT }}>
                  <span style={{ color: BRAND, fontSize: 9, fontWeight: 800 }}>✓</span>
                </div>
                Interactive STEM Simulations
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: BRAND_LIGHT }}>
                  <span style={{ color: BRAND, fontSize: 9, fontWeight: 800 }}>✓</span>
                </div>
                CBSE 2026 Batch Ready
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="subjects" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-3"
              style={{ background: BRAND_LIGHT, color: BRAND, border: `1px solid ${BRAND_BORDER}` }}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              CBSE Class 12 Streams
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3">
              Choose Your Subject
            </h2>
            <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto">
              Select your subject to explore interactive lessons, real-time formula computation, and topic-wise practice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {subjectsData.map((subj) => (
              <SubjectCard key={subj.id} subject={subj} onLocked={showToast} />
            ))}
          </div>
        </div>
      </section>

      <section id="chemistry-lessons" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <div
                className="inline-flex items-center gap-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-3"
                style={{ background: BRAND_LIGHT, color: BRAND, border: `1px solid ${BRAND_BORDER}` }}
              >
                <FlaskConical className="w-3.5 h-3.5" />
                Chemistry Curriculum
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
                Chemistry — 10 Lessons
              </h2>
              <p className="text-slate-500 text-sm sm:text-base mt-1">
                Lesson 1 (Solutions) is fully interactive. Lessons 2–10 are coming soon for complete curriculum coverage.
              </p>
            </div>

            <button
              onClick={() => navigate('/chemistry')}
              className="flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl border border-slate-200 hover:border-[#15009A] text-slate-700 hover:text-[#15009A] transition-colors self-start sm:self-auto"
            >
              View Dedicated Chemistry Page <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {chemistryLessonsData.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} onLocked={showToast} />
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold tracking-widest uppercase mb-3 text-[#15009A]">
              PLATFORM FEATURES
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3">
              Built for Visual & Interactive Learning
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              7 advanced STEM learning tools integrated directly into every curriculum unit.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <FeatureCard
                  key={f.label}
                  icon={<Icon className="w-5 h-5" />}
                  label={f.label}
                  desc={f.desc}
                  delay={i * 60}
                />
              );
            })}
          </div>
        </div>
      </section>

      <section id="how" className="py-20" style={{ background: BRAND_LIGHT }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: BRAND }}>
              HOW IT WORKS
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Four simple steps to mastery
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            <div
              className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px pointer-events-none"
              style={{ background: `linear-gradient(90deg, ${BRAND_BORDER}, ${BRAND}, ${BRAND_BORDER})` }}
            />

            {howItWorks.map((h, i) => (
              <HowCard key={h.step} step={h.step} label={h.label} desc={h.desc} delay={i * 100} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="rounded-2xl p-6 border border-slate-200 text-center flex flex-col items-center justify-center bg-slate-50/70"
                >
                  <Icon className="w-6 h-6 mb-2 text-[#15009A]" />
                  <div className="text-3xl font-black text-[#15009A] mb-1">{s.value}</div>
                  <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <footer id="branches" className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img src={logoImg} alt="EDUiDEAL Academy" className="h-9 w-auto object-contain" />
                <div>
                  <div className="font-black text-base text-slate-900">
                    Learnova <span style={{ color: BRAND }}>— EDUiDEAL ACADEMY</span>
                  </div>
                  <div className="text-[10px] text-slate-400 tracking-widest uppercase font-semibold">
                    The Digitalized Learning World
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed mb-4 max-w-md">
                The digitalized STEM learning platform for CBSE Class 12 students. Interactive simulations, formula calculators, and NCERT practice questions.
              </p>
            </div>

            <div className="md:col-span-2">
              <h4 className="font-bold text-sm text-slate-900 mb-4 uppercase tracking-wider">
                EDUiDEAL Academy Branches
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {branches.map((b) => (
                  <div key={b.city} className="flex flex-col gap-0.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-[#15009A]" />
                      <span className="text-sm font-semibold text-slate-800">{b.city}</span>
                    </div>
                    <span className="text-xs text-slate-500 ml-5">{b.address}</span>
                    <a
                      href={`tel:${b.phone}`}
                      className="flex items-center gap-1 ml-5 text-xs font-bold text-[#15009A] mt-1 hover:underline"
                    >
                      <Phone className="w-3 h-3" />
                      {b.phone}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
            <span>© 2026 Learnova • EDUiDEAL ACADEMY. All rights reserved.</span>
            <a
              href="https://solution-webpage.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold transition-colors"
              style={{ color: BRAND }}
            >
              solution-webpage.vercel.app
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AcademyDashboardPage;

/* ─── Feature Card Sub-Component ───────────────────────────── */
const FeatureCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  desc: string;
  delay: number;
}> = ({ icon, label, desc, delay }) => {
  const ref = useRef<HTMLDivElement>(null!);
  const visible = useInView(ref);
  const [hov, setHov] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.45s ease ${delay}ms, transform 0.45s ease ${delay}ms, box-shadow 0.2s, border-color 0.2s`,
        borderColor: hov ? BRAND_BORDER : '#E2E8F0',
        boxShadow: hov ? '0 8px 28px rgba(21,0,154,0.1)' : '0 1px 4px rgba(0,0,0,0.05)',
      }}
      className="bg-white rounded-2xl border p-6 flex flex-col gap-3"
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
        style={{
          background: hov ? BRAND : BRAND_LIGHT,
          color: hov ? 'white' : BRAND,
          transform: hov ? 'scale(1.1)' : 'scale(1)',
        }}
      >
        {icon}
      </div>
      <h4 className="font-bold text-sm text-slate-900">{label}</h4>
      <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
};
/* ─── How Card Sub-Component ───────────────────────────────── */
const HowCard: React.FC<{
  step: string;
  label: string;
  desc: string;
  delay: number;
}> = ({ step, label, desc, delay }) => {
  const ref = useRef<HTMLDivElement>(null!);
  const visible = useInView(ref);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.45s ease ${delay}ms, transform 0.45s ease ${delay}ms`,
      }}
      className="flex flex-col items-center text-center gap-3"
    >
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-black text-white relative shadow-md"
        style={{ background: BRAND, boxShadow: '0 6px 20px rgba(21,0,154,0.25)' }}
      >
        {step}
      </div>
      <h4 className="font-bold text-sm text-slate-900">{label}</h4>
      <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
};

