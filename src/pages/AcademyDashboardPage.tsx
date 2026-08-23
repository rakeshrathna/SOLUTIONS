import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FlaskConical, Zap, Timer, Atom, Link2, Layers,
  Droplets, Wind, Leaf, Lock, ChevronRight,
  BookOpen, BarChart2, StickyNote, CheckSquare,
  Phone, MapPin, ArrowRight, GraduationCap,
  Beaker, Calculator, TrendingUp, ClipboardList,
  Star, Users, Award,
} from 'lucide-react';

/* ─── Brand color ─────────────────────────────────────────── */
const BRAND = 'rgb(21,0,154)';
const BRAND_LIGHT = 'rgba(21,0,154,0.08)';
const BRAND_BORDER = 'rgba(21,0,154,0.2)';
const BRAND_MED = 'rgba(21,0,154,0.15)';

/* ─── Chapters ─────────────────────────────────────────────── */
const chapters = [
  { id: 1, title: 'Solutions',                         subtitle: 'Concentration · Raoult\'s Law · Colligative Properties', icon: FlaskConical, status: 'ACTIVE',       route: '/solutions', category: 'Physical' },
  { id: 2, title: 'Electrochemistry',                  subtitle: 'Galvanic Cells · Nernst Equation · Electrolysis',        icon: Zap,           status: 'COMING_SOON', route: null,          category: 'Physical' },
  { id: 3, title: 'Chemical Kinetics',                 subtitle: 'Rate Laws · Activation Energy · Order of Reaction',      icon: Timer,         status: 'COMING_SOON', route: null,          category: 'Physical' },
  { id: 4, title: 'd- and f-Block Elements',           subtitle: 'Transition Metals · Lanthanides · Actinides',            icon: Atom,          status: 'COMING_SOON', route: null,          category: 'Inorganic' },
  { id: 5, title: 'Coordination Compounds',            subtitle: 'Ligands · CFSE · Werner\'s Theory',                      icon: Link2,         status: 'COMING_SOON', route: null,          category: 'Inorganic' },
  { id: 6, title: 'Haloalkanes & Haloarenes',          subtitle: 'SN1 · SN2 · Nucleophilic Substitution',                  icon: Layers,        status: 'COMING_SOON', route: null,          category: 'Organic' },
  { id: 7, title: 'Alcohols, Phenols & Ethers',        subtitle: 'Hydroxyl Group · Dehydration · Reactions',               icon: Droplets,      status: 'COMING_SOON', route: null,          category: 'Organic' },
  { id: 8, title: 'Aldehydes, Ketones & Acids',        subtitle: 'Carbonyl Chemistry · Nucleophilic Addition',              icon: Wind,          status: 'COMING_SOON', route: null,          category: 'Organic' },
  { id: 9, title: 'Amines',                            subtitle: 'Basic Character · Diazonium Salts · Coupling',           icon: Atom,          status: 'COMING_SOON', route: null,          category: 'Organic' },
  { id: 10, title: 'Biomolecules',                     subtitle: 'Carbohydrates · Proteins · Nucleic Acids',               icon: Leaf,          status: 'COMING_SOON', route: null,          category: 'Organic' },
];

const features = [
  { icon: Beaker,       label: 'Interactive Formulas',           desc: 'Drag sliders to see formulas compute results in real time.' },
  { icon: TrendingUp,   label: 'Live Graphs & Visualizations',   desc: 'Dynamic ECharts curves that update as you change parameters.' },
  { icon: FlaskConical, label: 'Physics Simulations',            desc: 'Particle, osmosis, and van\'t Hoff canvas simulations.' },
  { icon: ClipboardList,label: 'Interactive Quizzes',            desc: '30 NCERT MCQs and numericals with instant feedback.' },
  { icon: StickyNote,   label: 'Smart Notes & Bookmarks',        desc: 'Auto-collapsing notes that persist across sessions.' },
  { icon: BarChart2,    label: 'Progress Tracking',              desc: 'Chapter mastery, unit scores, and completion badges.' },
  { icon: Calculator,   label: 'Step-by-Step Solutions',         desc: 'Full arithmetic derivations for every NCERT problem.' },
];

const howItWorks = [
  { step: '01', label: 'Pick a Chapter',    desc: 'Choose any of the 10 Chemistry chapters from this dashboard.' },
  { step: '02', label: 'Study Interactively', desc: 'Read, simulate, visualize, and compute — all in one place.' },
  { step: '03', label: 'Take Practice Tests', desc: 'Test yourself with NCERT MCQs and numerical problems.' },
  { step: '04', label: 'Track Mastery',     desc: 'Review progress, saved notes, and revisit weak areas.' },
];

const stats = [
  { icon: BookOpen,  value: '10',    label: 'Chapters Covered' },
  { icon: Users,     value: '30+',   label: 'NCERT Problems' },
  { icon: Award,     value: '8',     label: 'Interactive Units' },
  { icon: Star,      value: '100%',  label: 'Free to Use' },
];

const branches = [
  { city: 'Perambur',     address: 'MPM Street',             phone: '9884234949' },
  { city: 'Kodungaiyur',  address: 'Near Pandiyan Theatre',  phone: '9790924949' },
  { city: 'Agaram Jn.',   address: 'Agaram Jn.',             phone: '7845977500' },
];

/* ─── Logo ─────────────────────────────────────────────────── */
const Logo: React.FC<{ size?: number }> = ({ size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
    <rect width="36" height="36" rx="8" fill={BRAND} />
    <path d="M8 12h8v14H8z" fill="white" fillOpacity=".9" rx="2" />
    <path d="M20 12h8v14h-8z" fill="white" fillOpacity=".65" />
    <rect x="17" y="12" width="2" height="14" fill="rgba(199,210,254,0.8)" />
    <path d="M26 7l1.2 2.4 2.4 1.2-2.4 1.2L26 14l-1.2-2.4L22.4 10.4l2.4-1.2z" fill="#FCD34D" />
  </svg>
);

/* ─── Category badge colors ────────────────────────────────── */
const catColor: Record<string, string> = {
  Physical:  'rgba(21,0,154,0.1)',
  Inorganic: 'rgba(5,150,105,0.1)',
  Organic:   'rgba(217,119,6,0.1)',
};
const catText: Record<string, string> = {
  Physical:  BRAND,
  Inorganic: '#047857',
  Organic:   '#B45309',
};
const catBorder: Record<string, string> = {
  Physical:  'rgba(21,0,154,0.2)',
  Inorganic: 'rgba(5,150,105,0.2)',
  Organic:   'rgba(217,119,6,0.2)',
};

/* ─── Animated counter hook ────────────────────────────────── */
function useInView(ref: React.RefObject<Element>) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}

/* ─── Chapter Card ─────────────────────────────────────────── */
const ChapterCard: React.FC<{
  ch: typeof chapters[0];
  delay: number;
  onLock: (title: string) => void;
}> = ({ ch, delay, onLock }) => {
  const ref = useRef<HTMLDivElement>(null!);
  const visible = useInView(ref);
  const navigate = useNavigate();
  const [hov, setHov] = useState(false);
  const Icon = ch.icon;
  const isActive = ch.status === 'ACTIVE';

  const handleClick = () => {
    if (isActive && ch.route) navigate(ch.route);
    else onLock(ch.title);
  };

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={handleClick}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms,
                     box-shadow 0.25s ease, border-color 0.25s ease`,
        cursor: isActive ? 'pointer' : 'default',
        borderColor: hov && isActive ? BRAND : '#E2E8F0',
        boxShadow: hov && isActive
          ? `0 8px 32px rgba(21,0,154,0.14), 0 2px 8px rgba(21,0,154,0.08)`
          : '0 1px 4px rgba(0,0,0,0.06)',
      }}
      className="relative bg-white rounded-2xl border p-5 flex flex-col gap-3 select-none"
    >
      {/* Chapter number */}
      <div className="flex items-start justify-between">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-black transition-all duration-300"
          style={{
            background: isActive ? BRAND : '#F1F5F9',
            color: isActive ? 'white' : '#94A3B8',
            transform: hov && isActive ? 'scale(1.08) rotate(3deg)' : 'scale(1) rotate(0deg)',
          }}
        >
          <Icon className="w-5 h-5" />
        </div>

        <div className="flex flex-col items-end gap-1.5">
          <span className="text-[10px] font-bold tracking-widest text-slate-300 font-mono">
            CH {String(ch.id).padStart(2, '0')}
          </span>
          {isActive ? (
            <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(16,185,129,0.1)', color: '#059669', border: '1px solid rgba(16,185,129,0.25)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
              LIVE
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{ background: '#F8FAFC', color: '#94A3B8', border: '1px solid #E2E8F0' }}>
              <Lock className="w-2.5 h-2.5" />
              SOON
            </span>
          )}
        </div>
      </div>

      {/* Title & subtitle */}
      <div>
        <h3 className="font-bold text-sm leading-snug mb-1"
          style={{ color: isActive ? '#0F172A' : '#94A3B8' }}>
          {ch.title}
        </h3>
        <p className="text-[11px] leading-relaxed" style={{ color: isActive ? '#64748B' : '#CBD5E1' }}>
          {ch.subtitle}
        </p>
      </div>

      {/* Category + launch */}
      <div className="flex items-center justify-between mt-auto pt-1">
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
          style={{
            background: catColor[ch.category],
            color: catText[ch.category],
            border: `1px solid ${catBorder[ch.category]}`,
          }}>
          {ch.category}
        </span>

        {isActive && (
          <div className="flex items-center gap-1 text-[11px] font-semibold transition-all duration-200"
            style={{
              color: BRAND,
              opacity: hov ? 1 : 0,
              transform: hov ? 'translateX(0)' : 'translateX(-4px)',
            }}>
            Launch <ChevronRight className="w-3 h-3" />
          </div>
        )}
      </div>

      {/* Active bottom accent bar */}
      {isActive && (
        <div className="absolute bottom-0 left-5 right-5 h-0.5 rounded-full transition-all duration-300"
          style={{
            background: `linear-gradient(90deg, transparent, ${BRAND}, transparent)`,
            opacity: hov ? 1 : 0,
          }} />
      )}
    </div>
  );
};

/* ─── Main Page ─────────────────────────────────────────────── */
export const AcademyDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const showToast = (title: string) => {
    setToast(`Chapter: ${title} — Coming Soon for 2026 Batch!`);
    setTimeout(() => setToast(null), 3000);
  };

  const scrollToChapters = () => {
    document.getElementById('chapters')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };


  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">

      {/* ── TOAST ─────────────────────────────────────────────── */}
      <div className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-400
                      ${toast ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3 pointer-events-none'}`}>
        <div className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-slate-900 shadow-2xl border border-slate-700">
          <Lock className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span className="text-sm font-medium text-white">{toast}</span>
        </div>
      </div>

      {/* ── STICKY NAV ────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-40 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(255,255,255,0.95)' : 'white',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid #E2E8F0' : '1px solid transparent',
          boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.06)' : 'none',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
          {/* Logo + brand */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <Logo size={34} />
            <div>
              <div className="font-black text-base leading-none tracking-tight" style={{ color: '#0F172A' }}>
                EDUiDEAL
                <span className="ml-1.5 font-black" style={{ color: BRAND }}>ACADEMY</span>
              </div>
              <div className="text-[9px] font-semibold tracking-[0.2em] uppercase text-slate-400 mt-0.5">
                Education For Life
              </div>
            </div>
          </div>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-6">
            {[
              { label: 'Chapters', href: '#chapters' },
              { label: 'Features', href: '#features' },
              { label: 'How It Works', href: '#how' },
              { label: 'Branches', href: '#branches' },
            ].map(n => (
              <a key={n.label} href={n.href}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                {n.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <button
            onClick={scrollToChapters}
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white
                       transition-all duration-200 active:scale-95"
            style={{
              background: BRAND,
              boxShadow: `0 4px 14px rgba(21,0,154,0.3)`,
            }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 6px 20px rgba(21,0,154,0.45)')}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 4px 14px rgba(21,0,154,0.3)')}
          >
            Start Learning <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: 'white' }}>
        {/* Subtle grid background */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(21,0,154,0.04) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(21,0,154,0.04) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }} />

        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left text */}
            <div>
              {/* Tag pills */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                {['12th CBSE', 'Chemistry', 'Interactive'].map(t => (
                  <span key={t} className="text-xs font-semibold px-3 py-1 rounded-full"
                    style={{ background: BRAND_LIGHT, color: BRAND, border: `1px solid ${BRAND_BORDER}` }}>
                    {t}
                  </span>
                ))}
              </div>

              <h1 className="text-5xl sm:text-6xl font-black leading-[1.05] tracking-tight mb-6">
                <span style={{ color: '#0F172A' }}>Master</span>
                <br />
                <span style={{
                  background: `linear-gradient(135deg, ${BRAND} 0%, #4F46E5 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  Chemistry
                </span>
                <br />
                <span style={{ color: '#0F172A' }}>Interactively.</span>
              </h1>

              <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-md">
                The complete Class 12 CBSE Chemistry platform. Explore formulas,
                run simulations, solve NCERT problems, and track your mastery — all in one place.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={scrollToChapters}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-bold text-white
                             transition-all duration-200 active:scale-95"
                  style={{ background: BRAND, boxShadow: `0 6px 20px rgba(21,0,154,0.35)` }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 10px 28px rgba(21,0,154,0.45)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(21,0,154,0.35)'; }}
                >
                  Start Chapter 1 <ArrowRight className="w-5 h-5" />
                </button>
                <a href="#chapters"
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-bold
                             border-2 transition-all duration-200"
                  style={{ borderColor: '#E2E8F0', color: '#374151' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = BRAND; (e.currentTarget as HTMLElement).style.color = BRAND; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#E2E8F0'; (e.currentTarget as HTMLElement).style.color = '#374151'; }}
                >
                  View All Chapters
                </a>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-5 mt-8 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-1.5 text-sm text-slate-500">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ background: BRAND_LIGHT }}>
                    <span style={{ color: BRAND, fontSize: 9, fontWeight: 800 }}>✓</span>
                  </div>
                  Free for all students
                </div>
                <div className="flex items-center gap-1.5 text-sm text-slate-500">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ background: BRAND_LIGHT }}>
                    <span style={{ color: BRAND, fontSize: 9, fontWeight: 800 }}>✓</span>
                  </div>
                  NCERT aligned content
                </div>
                <div className="flex items-center gap-1.5 text-sm text-slate-500">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ background: BRAND_LIGHT }}>
                    <span style={{ color: BRAND, fontSize: 9, fontWeight: 800 }}>✓</span>
                  </div>
                  Works on any device
                </div>
              </div>
            </div>

            {/* Right: Stats card */}
            <div className="hidden lg:block">
              <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-xl shadow-slate-100/80">
                {/* Mock chapter preview card */}
                <div className="flex items-center gap-3 mb-6 pb-5 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: BRAND }}>
                    <FlaskConical className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-slate-900">Chapter 1: Solutions</div>
                    <div className="text-xs text-slate-400">8 Interactive Units</div>
                  </div>
                  <span className="ml-auto flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(16,185,129,0.1)', color: '#059669', border: '1px solid rgba(16,185,129,0.25)' }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                    LIVE NOW
                  </span>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-4">
                  {stats.map(s => {
                    const Icon = s.icon;
                    return (
                      <div key={s.label} className="rounded-2xl p-5 border border-slate-100"
                        style={{ background: BRAND_LIGHT }}>
                        <Icon className="w-5 h-5 mb-2" style={{ color: BRAND }} />
                        <div className="text-2xl font-black mb-0.5" style={{ color: BRAND }}>{s.value}</div>
                        <div className="text-xs text-slate-500 font-medium">{s.label}</div>
                      </div>
                    );
                  })}
                </div>

                {/* Partners row */}
                <div className="mt-5 pt-5 border-t border-slate-100 flex items-center gap-3">
                  <span className="text-xs text-slate-400 font-medium">In partnership with</span>
                  <span className="text-xs font-bold px-3 py-1 rounded-lg"
                    style={{ background: 'rgba(249,115,22,0.08)', color: '#EA580C', border: '1px solid rgba(249,115,22,0.2)' }}>
                    Vedantu
                  </span>
                  <span className="text-xs font-bold px-3 py-1 rounded-lg"
                    style={{ background: 'rgba(16,185,129,0.08)', color: '#059669', border: '1px solid rgba(16,185,129,0.2)' }}>
                    NEET Prep
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHAPTERS GRID ────────────────────────────────────── */}
      <section id="chapters" className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          {/* Section header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold
                            uppercase tracking-widest mb-4"
              style={{ background: BRAND_LIGHT, color: BRAND, border: `1px solid ${BRAND_BORDER}` }}>
              <GraduationCap className="w-3.5 h-3.5" />
              12 Chemistry — All Chapters
            </div>
            <h2 className="text-4xl font-black text-slate-900 mb-3">
              10 Chapters.{' '}
              <span style={{
                background: `linear-gradient(135deg, ${BRAND} 0%, #4F46E5 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>One Platform.</span>
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              Chapter 1 is fully interactive and live. More chapters launch through 2026.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {chapters.map((ch, i) => (
              <ChapterCard key={ch.id} ch={ch} delay={i * 55} onLock={showToast} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────── */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: BRAND }}>
              PLATFORM FEATURES
            </p>
            <h2 className="text-4xl font-black text-slate-900 mb-3">
              Everything you need to{' '}
              <span style={{
                background: `linear-gradient(135deg, ${BRAND} 0%, #4F46E5 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>excel in Chemistry</span>
            </h2>
            <p className="text-slate-500 text-lg">7 interactive learning tools baked into every chapter.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <FeatureCard key={f.label} icon={<Icon className="w-5 h-5" />}
                  label={f.label} desc={f.desc} delay={i * 70} />
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section id="how" className="py-20" style={{ background: BRAND_LIGHT }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: BRAND }}>
              HOW IT WORKS
            </p>
            <h2 className="text-4xl font-black text-slate-900">
              Four simple steps to mastery
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* connector line */}
            <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px"
              style={{ background: `linear-gradient(90deg, ${BRAND_BORDER}, ${BRAND}, ${BRAND_BORDER})` }} />

            {howItWorks.map((h, i) => (
              <HowCard key={h.step} step={h.step} label={h.label} desc={h.desc} delay={i * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 px-10 py-10"
            style={{
              background: BRAND_LIGHT,
              border: `2px solid ${BRAND_BORDER}`,
            }}>
            <div className="flex items-center gap-5">
              <div className="text-5xl">🚀</div>
              <div>
                <h3 className="text-2xl font-black text-slate-900 mb-1">
                  Ready to ace your Chemistry exam?
                </h3>
                <p className="text-slate-500">
                  Start with Chapter 1: Solutions — fully interactive and free.
                </p>
              </div>
            </div>
            <button
              onClick={scrollToChapters}
              className="flex-shrink-0 flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white
                         text-base transition-all duration-200 active:scale-95"
              style={{ background: BRAND, boxShadow: `0 6px 20px rgba(21,0,154,0.3)` }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 10px 28px rgba(21,0,154,0.45)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(21,0,154,0.3)'; }}
            >
              Start Learning <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer id="branches" className="border-t border-slate-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Brand column */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <Logo size={32} />
                <div>
                  <div className="font-black text-sm" style={{ color: BRAND }}>EDUiDEAL ACADEMY</div>
                  <div className="text-[10px] text-slate-400 tracking-widest uppercase">Education For Life</div>
                </div>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">
                The digitalised learning platform for 10th & 12th CBSE students. Interactive. Insightful. Free.
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-1 rounded-lg"
                  style={{ background: 'rgba(249,115,22,0.08)', color: '#EA580C', border: '1px solid rgba(249,115,22,0.2)' }}>
                  Vedantu
                </span>
                <span className="text-xs font-bold px-2 py-1 rounded-lg"
                  style={{ background: 'rgba(16,185,129,0.08)', color: '#059669', border: '1px solid rgba(16,185,129,0.2)' }}>
                  NEET Prep
                </span>
              </div>
            </div>

            {/* Chapters column */}
            <div>
              <h4 className="font-bold text-sm text-slate-900 mb-4">Chapters</h4>
              <ul className="space-y-2">
                {chapters.slice(0, 5).map(c => (
                  <li key={c.id}>
                    <span className="text-sm text-slate-500">
                      {String(c.id).padStart(2, '0')}. {c.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 mb-4">&nbsp;</h4>
              <ul className="space-y-2 mt-0">
                {chapters.slice(5).map(c => (
                  <li key={c.id}>
                    <span className="text-sm text-slate-500">
                      {String(c.id).padStart(2, '0')}. {c.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Branches */}
            <div>
              <h4 className="font-bold text-sm text-slate-900 mb-4">Our Branches</h4>
              <ul className="space-y-4">
                {branches.map(b => (
                  <li key={b.city} className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0" style={{ color: BRAND }} />
                      <span className="text-sm font-semibold text-slate-800">{b.city}</span>
                    </div>
                    <span className="text-xs text-slate-400 ml-5">{b.address}</span>
                    <a href={`tel:${b.phone}`}
                      className="flex items-center gap-1.5 ml-5 text-sm font-semibold transition-colors"
                      style={{ color: BRAND }}
                      onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
                      onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}>
                      <Phone className="w-3 h-3" />{b.phone}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-slate-400">© 2026 EDUiDEAL ACADEMY. All rights reserved.</span>
            <a href="https://solution-webpage.vercel.app" target="_blank" rel="noreferrer"
              className="text-xs font-medium transition-colors"
              style={{ color: BRAND }}>
              solution-webpage.vercel.app
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default AcademyDashboardPage;

/* ─── Feature Card sub-component ──────────────────────────── */
const FeatureCard: React.FC<{
  icon: React.ReactNode; label: string; desc: string; delay: number;
}> = ({ icon, label, desc, delay }) => {
  const ref = useRef<HTMLDivElement>(null!);
  const visible = useInView(ref);
  const [hov, setHov] = useState(false);
  return (
    <div ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.45s ease ${delay}ms, transform 0.45s ease ${delay}ms,
                     box-shadow 0.2s, border-color 0.2s`,
        borderColor: hov ? BRAND_BORDER : '#E2E8F0',
        boxShadow: hov ? `0 8px 28px rgba(21,0,154,0.1)` : '0 1px 4px rgba(0,0,0,0.05)',
      }}
      className="bg-white rounded-2xl border p-6 flex flex-col gap-3">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
        style={{
          background: hov ? BRAND : BRAND_LIGHT,
          color: hov ? 'white' : BRAND,
          transform: hov ? 'scale(1.1)' : 'scale(1)',
        }}>
        {icon}
      </div>
      <h4 className="font-bold text-sm text-slate-900">{label}</h4>
      <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
};

/* ─── How Card sub-component ───────────────────────────────── */
const HowCard: React.FC<{
  step: string; label: string; desc: string; delay: number;
}> = ({ step, label, desc, delay }) => {
  const ref = useRef<HTMLDivElement>(null!);
  const visible = useInView(ref);
  return (
    <div ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.45s ease ${delay}ms, transform 0.45s ease ${delay}ms`,
      }}
      className="flex flex-col items-center text-center gap-4">
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-black text-white relative"
        style={{ background: BRAND, boxShadow: `0 6px 20px rgba(21,0,154,0.25)` }}>
        {step}
      </div>
      <h4 className="font-bold text-slate-900">{label}</h4>
      <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
};
