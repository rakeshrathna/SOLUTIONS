import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logoImg from '../assets/logo.png';
import eduidealLogo from '../assets/eduideal-logo.png';
import studentsImg from '../assets/hero-students.png';
import { subjectsData, Subject } from '../data/curriculumData';
import { useAuthStore } from '../stores/authStore';
import {
  FlaskConical, Zap, Calculator, TrendingUp, Lock,
  StickyNote, CheckSquare, Phone, ArrowRight, GraduationCap,
  Beaker, ClipboardList, Sparkles, CheckCircle2,
  LogIn, Play, Award, BarChart2
} from 'lucide-react';

/* ─── Brand color tokens ──────────────────────────────────── */
const BRAND = 'rgb(21,0,154)';
const BRAND_LIGHT = 'rgba(21,0,154,0.06)';
const BRAND_BORDER = 'rgba(21,0,154,0.18)';

/* ─── Icon resolver map ───────────────────────────────────── */
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FlaskConical,
  Zap,
  Calculator,
  TrendingUp,
};

const features = [
  { icon: Beaker, label: 'Interactive Formulas', desc: 'Drag sliders to see formulas compute variables and outputs in real time.' },
  { icon: TrendingUp, label: 'Live Graphs & Visualizations', desc: 'Dynamic curves and coordinates that update dynamically with parameter changes.' },
  { icon: Sparkles, label: 'Interactive STEM Simulations', desc: 'Particle physics, molecular structures, and mathematical 3D geometry sandboxes.' },
  { icon: ClipboardList, label: 'NCERT Practice Quizzes', desc: 'Curated CBSE Class 12 MCQs and numericals with instant step-by-step feedback.' },
  { icon: StickyNote, label: 'Smart Notes & Bookmarks', desc: 'Structured chapter summaries, key definitions, and formula sheets for rapid revision.' },
  { icon: BarChart2, label: 'Mastery & Progress Tracking', desc: 'Real-time chapter mastery metrics, topic completion bars, and performance stats.' },
  { icon: Calculator, label: 'Step-by-Step Derivations', desc: 'Complete mathematical and chemical arithmetic derivations for all textbook problems.' },
];

const howItWorks = [
  { step: '01', label: 'Pick Your Subject', desc: 'Choose between Chemistry, Physics, or Mathematics based on your study plan.' },
  { step: '02', label: 'Select a Lesson', desc: 'Navigate to any Class 12 chapter with focused topic breakdowns and interactive modules.' },
  { step: '03', label: 'Study Interactively', desc: 'Tweak parameters, run particle simulations, observe live graphs, and read revision notes.' },
  { step: '04', label: 'Practice & Master', desc: 'Solve topic-wise NCERT questions with instant validation and track your progress to 100%.' },
];

const branches = [
  { city: 'PERAMBUR', address: 'MPM Street', phone: '9884234949' },
  { city: 'KODUNGAIYUR', address: 'near Pandiyan Theatre', phone: '9790924949' },
  { city: 'AGARAM, JN.', address: 'Agaram Junction', phone: '7845977500' },
];

/* ─── Subject Card Component ───────────────────────────────── */
const SubjectCard: React.FC<{
  subject: Subject;
  onLocked: (name: string) => void;
}> = ({ subject, onLocked }) => {
  const navigate = useNavigate();
  const Icon = iconMap[subject.iconName] || FlaskConical;
  const isChemistry = subject.id === 'chemistry';

  const handleClick = () => {
    if (isChemistry) {
      navigate('/chemistry');
    } else {
      onLocked(subject.name);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`group relative flex flex-col justify-between rounded-3xl p-7 transition-all duration-300 border ${
        isChemistry
          ? 'bg-white border-emerald-300 shadow-md hover:shadow-2xl hover:border-[#15009A] hover:-translate-y-1.5 cursor-pointer ring-2 ring-emerald-500/20'
          : 'bg-slate-50/80 border-slate-200/80 opacity-75 cursor-pointer hover:border-slate-300'
      }`}
      style={{
        minHeight: '420px',
      }}
    >
      <div>
        {/* Header Badges & Icon */}
        <div className="flex items-center justify-between mb-6">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 ${
              isChemistry ? 'group-hover:scale-110' : ''
            }`}
            style={{
              background: isChemistry ? BRAND_LIGHT : 'rgba(100, 116, 139, 0.08)',
              color: isChemistry ? BRAND : '#64748B',
              border: `1px solid ${isChemistry ? BRAND_BORDER : 'rgba(100, 116, 139, 0.2)'}`,
            }}
          >
            <Icon className="w-7 h-7" />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 font-mono">
              {subject.badge}
            </span>
            {isChemistry ? (
              <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-300 flex items-center gap-1.5 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-ping" />
                <span>DEMO ENABLED</span>
              </span>
            ) : (
              <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
                <Lock className="w-3 h-3 text-amber-600" />
                <span>LOCKED</span>
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3
          className={`text-2xl font-black mb-3 tracking-tight ${
            isChemistry ? 'text-slate-900 group-hover:text-[#15009A] transition-colors' : 'text-slate-700'
          }`}
        >
          {subject.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          {subject.description}
        </p>

        {/* Feature bullets */}
        <div className="space-y-2 mb-6">
          {subject.features.map((feat, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
              <div
                className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background: isChemistry ? BRAND_LIGHT : 'rgba(100, 116, 139, 0.1)',
                  color: isChemistry ? BRAND : '#64748B',
                }}
              >
                <CheckCircle2 className="w-3 h-3" />
              </div>
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action CTA Button */}
      <div className="pt-4 border-t border-slate-100">
        {isChemistry ? (
          <div
            className="w-full flex items-center justify-between py-3.5 px-5 rounded-xl font-bold text-sm text-white transition-all shadow-md group-hover:shadow-lg"
            style={{ background: BRAND }}
          >
            <span>Explore Chemistry (Public Demo)</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        ) : (
          <div className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-semibold text-xs text-slate-500 bg-slate-100 border border-slate-200 group-hover:bg-slate-200 transition-colors">
            <Lock className="w-3.5 h-3.5 text-amber-600" />
            <span>Requires Student Enrollment</span>
          </div>
        )}
      </div>
    </div>
  );
};

/* ─── Main Dashboard Page ─────────────────────────────────── */
export const AcademyDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (subjName: string) => {
    setToastMsg(`${subjName} requires student enrollment. Chemistry is currently available as the public demo!`);
    setTimeout(() => setToastMsg(null), 4000);
  };

  const scrollToSubjects = () => {
    const el = document.getElementById('subjects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePortalClick = () => {
    if (!user) {
      navigate('/login');
    } else if (user.role === 'ADMIN') {
      navigate('/admin/dashboard');
    } else {
      navigate('/student/dashboard');
    }
  };

  const navLinks = [
    { label: 'Subjects', href: '#subjects' },
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how' },
    { label: 'Branches', href: '#branches' },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased flex flex-col">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-slate-900 text-white px-5 py-4 rounded-2xl shadow-2xl border border-slate-700 flex items-start gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 flex-shrink-0 animate-ping" />
          <div className="text-xs leading-relaxed font-medium">{toastMsg}</div>
        </div>
      )}

      {/* Sticky Header / Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo & Brand: EDUiDEAL Academy */}
          <a href="#" className="flex items-center transition-opacity hover:opacity-90 py-1" aria-label="EDUiDEAL Academy">
            <img
              src={eduidealLogo}
              alt="EDUiDEAL Academy"
              className="h-8 sm:h-9 md:h-10 w-auto object-contain block"
            />
          </a>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((n) => (
              <a
                key={n.label}
                href={n.href}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                {n.label}
              </a>
            ))}
          </nav>

          {/* Right Header Buttons: Try Demo (Scrolls to Subjects) + Login */}
          <div className="flex items-center gap-3">
            <button
              onClick={scrollToSubjects}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 text-indigo-600 fill-indigo-600" />
              <span>Try Demo</span>
            </button>

            <button
              onClick={handlePortalClick}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white transition-all duration-200 active:scale-95 shadow-sm cursor-pointer"
              style={{
                background: BRAND,
                boxShadow: '0 4px 14px rgba(21,0,154,0.3)',
              }}
            >
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </button>
          </div>
        </div>
      </header>

      {/* ─── Hero Section with Two Students Illustration ────────── */}
      <section className="relative overflow-hidden bg-white border-b border-slate-100">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(21,0,154,0.03) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(21,0,154,0.03) 1px, transparent 1px)`,
            backgroundSize: '36px 36px',
          }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-16 sm:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Hero Text & Primary CTA */}
            <div className="lg:col-span-7">
              {/* Institution Badge */}
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold mb-6 border"
                style={{ background: BRAND_LIGHT, color: BRAND, borderColor: BRAND_BORDER }}
              >
                <GraduationCap className="w-4 h-4" />
                <span>EDUiDEAL ACADEMY • CLASS 12 CBSE</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] mb-4">
                Welcome to <span style={{ color: BRAND }}>Learnova</span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight mb-4">
                The Digitalized Learning World
              </p>

              {/* Supporting Description */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-xl">
                Explore interactive concepts, visual learning, formulas, notes, and practice questions designed for CBSE Class 12 students.
              </p>

              {/* Primary Call to Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={scrollToSubjects}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-bold text-white transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg cursor-pointer"
                  style={{ background: BRAND, boxShadow: '0 6px 20px rgba(21,0,154,0.35)' }}
                >
                  Choose Your Subject <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={scrollToSubjects}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-base font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all cursor-pointer"
                >
                  <Play className="w-4 h-4 text-indigo-600 fill-indigo-600" />
                  <span>Try Demo</span>
                </button>
              </div>

              {/* Generic Platform Trust Badges */}
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

            {/* Right Column: Two Students Illustration */}
            <div className="lg:col-span-5 flex items-center justify-center lg:justify-end relative">
              <div
                className="absolute w-72 h-72 rounded-full pointer-events-none opacity-50 blur-3xl -z-0"
                style={{
                  background: 'radial-gradient(circle, rgba(79, 70, 229, 0.2) 0%, rgba(21, 0, 154, 0.08) 60%, transparent 80%)',
                }}
              />
              <img
                src={studentsImg}
                alt="Learnova CBSE Class 12 Students"
                className="relative z-10 w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[460px] h-auto object-contain select-none transition-transform duration-300 hover:scale-[1.02]"
                style={{
                  filter: 'drop-shadow(0 15px 25px rgba(21, 0, 154, 0.12))',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Main Subject Section (Public Demo Target) ───────────── */}
      <section id="subjects" className="py-16 sm:py-24 bg-slate-50/60 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span
              className="text-xs font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block border"
              style={{ background: BRAND_LIGHT, color: BRAND, borderColor: BRAND_BORDER }}
            >
              CLASS 12 CBSE CURRICULUM
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
              Choose Your Subject
            </h2>
            <p className="text-base text-slate-600">
              Select a subject below to access chapter-wise interactive learning modules. <strong className="text-[#15009A]">Chemistry</strong> is unlocked for public demo access!
            </p>
          </div>

          {/* 3 Subject Cards Side-by-Side */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {subjectsData.map((subj) => (
              <SubjectCard key={subj.id} subject={subj} onLocked={showToast} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Platform Features Grid ─────────────────────────────── */}
      <section id="features" className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-3">
              Why Learn with Learnova?
            </h2>
            <p className="text-slate-600 text-sm">
              Our digitalized learning tools are engineered specifically for CBSE Class 12 board preparation and competitive entrance exams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, i) => {
              const IconComp = feat.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-shadow"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: BRAND_LIGHT, color: BRAND }}
                  >
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{feat.label}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── How It Works Step Guide ────────────────────────────── */}
      <section id="how" className="py-16 sm:py-24 bg-slate-50/60 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-3">
              How It Works
            </h2>
            <p className="text-slate-600 text-sm">
              A structured 4-step learning path to master CBSE Class 12 concepts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((hw) => (
              <div key={hw.step} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs relative">
                <span
                  className="text-2xl font-black font-mono block mb-3"
                  style={{ color: BRAND }}
                >
                  {hw.step}
                </span>
                <h3 className="text-base font-bold text-slate-900 mb-2">{hw.label}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{hw.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Institution Branches Footer ───────────────────────── */}
      <footer id="branches" className="bg-slate-950 text-white pt-16 pb-12 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 border-b border-slate-800">
            {/* Brand column */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center">
                  <img src={logoImg} alt="EDUiDEAL Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <span className="font-extrabold text-xl tracking-tight text-white">Learnova</span>
                  <p className="text-xs text-slate-400 font-mono">EDUiDEAL Academy</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                Empowering CBSE Class 12 students with interactive digitalized learning tools, STEM simulations, and comprehensive NCERT concept masteries.
              </p>
            </div>

            {/* Branches column */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                EDUiDEAL Academy Branches
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {branches.map((b) => (
                  <div key={b.city} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <p className="text-xs font-bold text-indigo-400 uppercase tracking-wide font-mono">{b.city}</p>
                    <p className="text-xs text-slate-300 font-medium">{b.address}</p>
                    <p className="text-xs text-slate-400 font-mono flex items-center gap-1 pt-1">
                      <Phone className="w-3 h-3 text-slate-500" />
                      <span>{b.phone}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-8 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
            <div>© 2026 Learnova — The Digitalized Learning World. All rights reserved.</div>
            <div className="flex items-center gap-4">
              <Link to="/login" className="hover:text-white transition-colors">Portal Login</Link>
              <span>•</span>
              <a href="#subjects" className="hover:text-white transition-colors">Class 12 CBSE</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
