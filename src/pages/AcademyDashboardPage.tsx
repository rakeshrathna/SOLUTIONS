import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImg from '../assets/logo.png';
import studentsImg from '../assets/hero-students.png';
import { subjectsData, Subject } from '../data/curriculumData';
import { IntroOverlay } from '../components/common/IntroOverlay';
import {
  FlaskConical, Zap, Calculator, TrendingUp, Lock,
  BookOpen, BarChart2, StickyNote, CheckSquare,
  Phone, MapPin, ArrowRight, GraduationCap,
  Beaker, ClipboardList, Star, Users, Award, Sparkles, CheckCircle2
} from 'lucide-react';

/* ─── Brand color tokens ──────────────────────────────────── */
const BRAND = 'rgb(21,0,154)';
const BRAND_LIGHT = 'rgba(21,0,154,0.06)';
const BRAND_BORDER = 'rgba(21,0,154,0.18)';
const BRAND_MED = 'rgba(21,0,154,0.12)';

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

/* ─── Intersection Observer hook ──────────────────────────── */
function useInView(ref: React.RefObject<HTMLElement>) {
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        obs.unobserve(el);
      }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
  return isInView;
}

/* ─── Subject Card Component ───────────────────────────────── */
const SubjectCard: React.FC<{
  subject: Subject;
  onLocked: (name: string) => void;
}> = ({ subject, onLocked }) => {
  const navigate = useNavigate();
  const Icon = iconMap[subject.iconName] || FlaskConical;
  const isActive = subject.status === 'ACTIVE';

  const handleClick = () => {
    if (isActive && subject.route) {
      navigate(subject.route);
    } else {
      onLocked(subject.name);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`group relative flex flex-col justify-between rounded-3xl p-7 transition-all duration-300 border ${
        isActive
          ? 'bg-white border-slate-200 shadow-md hover:shadow-2xl hover:border-[#15009A] hover:-translate-y-1.5 cursor-pointer'
          : 'bg-slate-50/80 border-slate-200/80 opacity-60 cursor-not-allowed'
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
              isActive ? 'group-hover:scale-110' : ''
            }`}
            style={{
              background: isActive ? BRAND_LIGHT : 'rgba(100, 116, 139, 0.08)',
              color: isActive ? BRAND : '#64748B',
              border: `1px solid ${isActive ? BRAND_BORDER : 'rgba(100, 116, 139, 0.2)'}`,
            }}
          >
            <Icon className="w-7 h-7" />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
              {subject.badge}
            </span>
            {isActive ? (
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                Live
              </span>
            ) : (
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
                <Lock className="w-3 h-3" /> Coming Soon
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3
          className={`text-2xl font-black mb-3 tracking-tight ${
            isActive ? 'text-slate-900 group-hover:text-[#15009A] transition-colors' : 'text-slate-700'
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
                  background: isActive ? BRAND_LIGHT : 'rgba(100, 116, 139, 0.1)',
                  color: isActive ? BRAND : '#64748B',
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
        {isActive ? (
          <div
            className="w-full flex items-center justify-between py-3.5 px-5 rounded-xl font-bold text-sm text-white transition-all shadow-md group-hover:shadow-lg"
            style={{ background: BRAND }}
          >
            <span>Explore {subject.name}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        ) : (
          <div className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-semibold text-sm text-slate-400 bg-slate-100 border border-slate-200">
            <Lock className="w-3.5 h-3.5" /> Coming Soon
          </div>
        )}
      </div>
    </div>
  );
};

/* ─── Main Dashboard Page ─────────────────────────────────── */
export const AcademyDashboardPage: React.FC = () => {
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Intro State
  const [showIntro, setShowIntro] = useState(() => {
    try {
      return !sessionStorage.getItem('learnovaIntroSeen');
    } catch {
      return false;
    }
  });
  const [siteRevealed, setSiteRevealed] = useState(() => {
    try {
      return !!sessionStorage.getItem('learnovaIntroSeen');
    } catch {
      return true;
    }
  });

  const showToast = (subjName: string) => {
    setToastMsg(`${subjName} curriculum modules are currently in development and will be available soon.`);
    setTimeout(() => setToastMsg(null), 4000);
  };

  const scrollToSubjects = () => {
    const el = document.getElementById('subjects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: 'Subjects', href: '#subjects' },
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how' },
    { label: 'Branches', href: '#branches' },
  ];

  return (
    <>
      {/* Cinematic Brand Intro Video Overlay */}
      {showIntro && (
        <IntroOverlay
          onFadeStart={() => setSiteRevealed(true)}
          onComplete={() => {
            setShowIntro(false);
            setSiteRevealed(true);
          }}
        />
      )}

      {/* Main Website Structure */}
      <div
        className="min-h-screen bg-white text-slate-900 font-sans antialiased flex flex-col transition-all duration-700 ease-out"
        style={{
          opacity: siteRevealed ? 1 : 0,
          transform: siteRevealed ? 'translateY(0)' : 'translateY(8px)',
          transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
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
            {/* Logo & Brand */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center p-1 shadow-xs group-hover:scale-105 transition-transform overflow-hidden">
                <img src={logoImg} alt="EDUiDEAL Academy" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-lg tracking-tight text-slate-900 group-hover:text-[#15009A] transition-colors">
                    Learnova
                  </span>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                    CBSE 12
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 font-medium tracking-wide">
                  EDUiDEAL ACADEMY
                </div>
              </div>
            </a>

            {/* Center Navigation Links (Platform Generic) */}
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

            {/* Primary Navbar CTA */}
            <button
              onClick={scrollToSubjects}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200 active:scale-95 shadow-sm"
              style={{
                background: BRAND,
                boxShadow: '0 4px 14px rgba(21,0,154,0.3)',
              }}
            >
              Choose Subject <ArrowRight className="w-4 h-4" />
            </button>
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
                {/* Badges */}
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

                {/* Main Heading */}
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

                {/* Subtitle */}
                <h2 className="text-xl sm:text-2xl font-bold text-slate-700 mb-6 tracking-tight">
                  The Digitalized Learning World
                </h2>

                {/* Short Supporting Description */}
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-xl">
                  Explore interactive concepts, visual learning, formulas, notes, and practice questions designed for CBSE Class 12 students.
                </p>

                {/* Primary Call to Action Button */}
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={scrollToSubjects}
                    className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-bold text-white transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg"
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

              {/* Right Column: Two Students Illustration (Clean Transparent Blend, No Card Container) */}
              <div className="lg:col-span-5 flex items-center justify-center lg:justify-end relative">
                {/* Subtle ambient lighting effect */}
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

        {/* ─── Choose Your Subject Section (3 Equal Cards) ────────── */}
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

            {/* 3 Equal Subject Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {subjectsData.map((subj) => (
                <SubjectCard key={subj.id} subject={subj} onLocked={showToast} />
              ))}
            </div>
          </div>
        </section>

        {/* ─── Platform Features Section ───────────────────────────── */}
        <section id="features" className="py-20 bg-white border-b border-slate-200">
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

        {/* ─── How It Works Section ─────────────────────────────────── */}
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

        {/* ─── Footer ──────────────────────────────────────────────── */}
        <footer id="branches" className="bg-white border-t border-slate-200">
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
    </>
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
