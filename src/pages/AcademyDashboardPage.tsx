import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FlaskConical,
  Zap,
  Timer,
  Atom,
  Link,
  Layers,
  Droplets,
  Wind,
  Leaf,
  Lock,
  ChevronRight,
  Sparkles,
  GraduationCap,
  Phone,
  MapPin,
  ExternalLink,
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────── */
/*  DATA                                                                      */
/* ─────────────────────────────────────────────────────────────────────────── */

const chapters = [
  {
    id: 1,
    title: 'Solutions',
    subtitle: 'Concentration · Raoult\'s Law · Colligative Properties',
    icon: FlaskConical,
    status: 'ACTIVE' as const,
    route: '/solutions',
    color: 'from-blue-700 to-indigo-800',
    glow: 'rgba(21,0,154,0.45)',
    badge: 'LIVE',
    category: 'Physical Chemistry',
  },
  {
    id: 2,
    title: 'Electrochemistry',
    subtitle: 'Galvanic Cells · Electrolysis · Nernst Equation',
    icon: Zap,
    status: 'COMING_SOON' as const,
    route: null,
    color: 'from-amber-600 to-orange-700',
    glow: 'rgba(217,119,6,0.35)',
    badge: 'SOON',
    category: 'Physical Chemistry',
  },
  {
    id: 3,
    title: 'Chemical Kinetics',
    subtitle: 'Rate Laws · Activation Energy · Order of Reaction',
    icon: Timer,
    status: 'COMING_SOON' as const,
    route: null,
    color: 'from-emerald-600 to-teal-700',
    glow: 'rgba(5,150,105,0.35)',
    badge: 'SOON',
    category: 'Physical Chemistry',
  },
  {
    id: 4,
    title: 'd- and f-Block Elements',
    subtitle: 'Transition Metals · Lanthanides · Actinides',
    icon: Atom,
    status: 'COMING_SOON' as const,
    route: null,
    color: 'from-violet-600 to-purple-700',
    glow: 'rgba(124,58,237,0.35)',
    badge: 'SOON',
    category: 'Inorganic Chemistry',
  },
  {
    id: 5,
    title: 'Coordination Compounds',
    subtitle: 'Ligands · CFSE · Werner\'s Theory',
    icon: Link,
    status: 'COMING_SOON' as const,
    route: null,
    color: 'from-rose-600 to-pink-700',
    glow: 'rgba(225,29,72,0.35)',
    badge: 'SOON',
    category: 'Inorganic Chemistry',
  },
  {
    id: 6,
    title: 'Haloalkanes & Haloarenes',
    subtitle: 'SN1 · SN2 · Nucleophilic Substitution',
    icon: Layers,
    status: 'COMING_SOON' as const,
    route: null,
    color: 'from-cyan-600 to-sky-700',
    glow: 'rgba(8,145,178,0.35)',
    badge: 'SOON',
    category: 'Organic Chemistry',
  },
  {
    id: 7,
    title: 'Alcohols, Phenols & Ethers',
    subtitle: 'Hydroxyl Group · Dehydration · Reactions',
    icon: Droplets,
    status: 'COMING_SOON' as const,
    route: null,
    color: 'from-lime-600 to-green-700',
    glow: 'rgba(101,163,13,0.35)',
    badge: 'SOON',
    category: 'Organic Chemistry',
  },
  {
    id: 8,
    title: 'Aldehydes, Ketones & Carboxylic Acids',
    subtitle: 'Carbonyl Chemistry · Nucleophilic Addition',
    icon: Wind,
    status: 'COMING_SOON' as const,
    route: null,
    color: 'from-orange-500 to-red-600',
    glow: 'rgba(234,88,12,0.35)',
    badge: 'SOON',
    category: 'Organic Chemistry',
  },
  {
    id: 9,
    title: 'Amines',
    subtitle: 'Basic Character · Diazonium Salts · Coupling Reactions',
    icon: Atom,
    status: 'COMING_SOON' as const,
    route: null,
    color: 'from-fuchsia-600 to-purple-700',
    glow: 'rgba(192,38,211,0.35)',
    badge: 'SOON',
    category: 'Organic Chemistry',
  },
  {
    id: 10,
    title: 'Biomolecules',
    subtitle: 'Carbohydrates · Proteins · Nucleic Acids · Vitamins',
    icon: Leaf,
    status: 'COMING_SOON' as const,
    route: null,
    color: 'from-teal-500 to-emerald-700',
    glow: 'rgba(13,148,136,0.35)',
    badge: 'SOON',
    category: 'Organic Chemistry',
  },
];

const branches = [
  { city: 'Perambur', address: 'MPM Street', phone: '9884234949' },
  { city: 'Kodungaiyur', address: 'Near Pandiyan Theatre', phone: '9790924949' },
  { city: 'Agaram Jn.', address: 'Agaram Jn.', phone: '7845977500' },
];

/* ─────────────────────────────────────────────────────────────────────────── */
/*  LOGO SVG (abstract book + spark matching poster aesthetic)                */
/* ─────────────────────────────────────────────────────────────────────────── */
const EduIdealLogo: React.FC<{ size?: number }> = ({ size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Outer shield */}
    <rect x="2" y="2" width="40" height="40" rx="10" fill="#15009A" />
    {/* Book pages */}
    <path d="M11 14h10v18H11z" fill="white" opacity="0.9" rx="2"/>
    <path d="M23 14h10v18H23z" fill="white" opacity="0.7" rx="2"/>
    {/* Spine */}
    <rect x="21" y="14" width="2" height="18" fill="#C7D2FE"/>
    {/* Spark */}
    <path d="M31 9l1.5 3 3 1.5-3 1.5L31 18l-1.5-3-3-1.5 3-1.5z" fill="#FCD34D"/>
  </svg>
);

/* ─────────────────────────────────────────────────────────────────────────── */
/*  CHAPTER CARD                                                              */
/* ─────────────────────────────────────────────────────────────────────────── */
interface ChapterCardProps {
  chapter: typeof chapters[number];
  animDelay: number;
  onLaunch: (chapter: typeof chapters[number]) => void;
}

const ChapterCard: React.FC<ChapterCardProps> = ({ chapter, animDelay, onLaunch }) => {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const Icon = chapter.icon;
  const isActive = chapter.status === 'ACTIVE';

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), animDelay);
    return () => clearTimeout(t);
  }, [animDelay]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onLaunch(chapter)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(28px) scale(0.96)',
        transition: `opacity 0.55s cubic-bezier(0.4,0,0.2,1) ${animDelay}ms, transform 0.55s cubic-bezier(0.4,0,0.2,1) ${animDelay}ms`,
        cursor: isActive ? 'pointer' : 'not-allowed',
        boxShadow: hovered
          ? `0 20px 50px ${chapter.glow}, 0 2px 8px rgba(0,0,0,0.18)`
          : '0 4px 18px rgba(0,0,0,0.10)',
      }}
      className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.04] backdrop-blur-md
                 group transition-all duration-300"
    >
      {/* Top gradient stripe */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${chapter.color}`} />

      <div className="p-5">
        {/* Number + Icon row */}
        <div className="flex items-start justify-between mb-3">
          <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${chapter.color} flex items-center justify-center shadow-lg
                          transition-transform duration-300 ${hovered && isActive ? 'scale-110 rotate-3' : ''}`}>
            <Icon className="w-5 h-5 text-white" />
          </div>

          <div className="flex flex-col items-end gap-1">
            <span className="text-xs font-bold text-white/30 font-mono tracking-widest">
              CH {String(chapter.id).padStart(2, '0')}
            </span>
            {isActive ? (
              <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full
                               bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                LIVE
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full
                               bg-white/5 text-white/30 border border-white/10">
                <Lock className="w-2.5 h-2.5" />
                SOON
              </span>
            )}
          </div>
        </div>

        {/* Title & Subtitle */}
        <h3 className={`font-bold text-sm leading-snug mb-1 transition-colors duration-200
                        ${isActive ? 'text-white group-hover:text-blue-300' : 'text-white/40'}`}>
          {chapter.title}
        </h3>
        <p className={`text-xs leading-relaxed line-clamp-2 ${isActive ? 'text-slate-400' : 'text-white/20'}`}>
          {chapter.subtitle}
        </p>

        {/* Category pill */}
        <div className="mt-3">
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border
                           ${isActive ? 'bg-blue-900/40 text-blue-300 border-blue-700/40' : 'bg-white/5 text-white/20 border-white/10'}`}>
            {chapter.category}
          </span>
        </div>

        {/* Launch button (active only) */}
        {isActive && (
          <div className={`mt-4 flex items-center gap-2 transition-all duration-300
                          ${hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            <div className="flex-1 h-px bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0" />
            <span className="flex items-center gap-1 text-xs font-semibold text-blue-300">
              Launch <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        )}
      </div>

      {/* Hover glow overlay */}
      {isActive && (
        <div className={`absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-300
                        bg-gradient-to-br from-blue-500/5 to-indigo-500/5
                        ${hovered ? 'opacity-100' : 'opacity-0'}`} />
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────── */
/*  MAIN PAGE                                                                 */
/* ─────────────────────────────────────────────────────────────────────────── */
export const AcademyDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [headerVisible, setHeaderVisible] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setHeaderVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleLaunch = (chapter: typeof chapters[number]) => {
    if (chapter.status === 'ACTIVE' && chapter.route) {
      navigate(chapter.route);
    } else {
      setToastMsg(`Chapter ${chapter.id}: ${chapter.title} — Coming Soon for 2026 Batch!`);
      setTimeout(() => setToastMsg(null), 3000);
    }
  };

  return (
    <div
      className="min-h-screen text-white relative overflow-x-hidden"
      style={{
        background: 'linear-gradient(135deg, #060B18 0%, #0D1530 40%, #050A1A 100%)',
      }}
    >
      {/* Ambient background orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(21,0,154,0.6) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div className="absolute top-1/3 -right-32 w-80 h-80 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.5) 0%, transparent 70%)', filter: 'blur(50px)' }} />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, rgba(21,0,154,0.4) 0%, transparent 70%)', filter: 'blur(70px)' }} />
      </div>

      {/* Toast notification */}
      <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500
                      ${toastMsg ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <div className="flex items-center gap-3 px-5 py-3 rounded-2xl backdrop-blur-xl
                        border border-amber-500/30 bg-amber-900/60 shadow-2xl shadow-amber-900/40">
          <Lock className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span className="text-sm font-medium text-amber-200">{toastMsg}</span>
        </div>
      </div>

      {/* ── HERO HEADER ────────────────────────────────────────────────────── */}
      <header
        style={{
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? 'translateY(0)' : 'translateY(-20px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}
        className="relative z-10 px-4 sm:px-8 lg:px-16 pt-10 pb-12"
      >
        {/* Glass card header */}
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6
                          p-6 sm:p-8 rounded-3xl border border-white/10 backdrop-blur-xl
                          bg-white/[0.04] shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
            {/* Left: Branding */}
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl blur-xl opacity-60"
                  style={{ background: 'rgba(21,0,154,0.8)' }} />
                <div className="relative">
                  <EduIdealLogo size={56} />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-none"
                    style={{
                      background: 'linear-gradient(135deg, #FFFFFF 0%, #C7D2FE 60%, #818CF8 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}>
                    EDUiDEAL
                  </h1>
                  <span className="text-2xl sm:text-3xl font-black text-white/80 tracking-tight">ACADEMY</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mt-1"
                  style={{ color: 'rgba(199,210,254,0.6)' }}>
                  Education For Life
                </p>
              </div>
            </div>

            {/* Right: Tag pill */}
            <div className="flex flex-col items-center sm:items-end gap-2">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl
                              bg-gradient-to-r from-blue-900/60 to-indigo-900/60
                              border border-blue-500/30">
                <GraduationCap className="w-4 h-4 text-blue-300" />
                <span className="text-xs font-bold text-blue-200 tracking-wide">12th CBSE Chemistry</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-900/30 border border-emerald-500/20">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                <span className="text-[11px] font-semibold text-emerald-300">Digitalised Learning Platform</span>
              </div>
            </div>
          </div>

          {/* Tagline row */}
          <div className="mt-6 text-center">
            <p className="text-lg sm:text-xl font-semibold text-white/50">
              Select a chapter to begin your{' '}
              <span style={{
                background: 'linear-gradient(90deg, #818CF8, #A5B4FC)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                interactive learning journey
              </span>
            </p>
          </div>
        </div>
      </header>

      {/* ── CHAPTER GRID ───────────────────────────────────────────────────── */}
      <main className="relative z-10 px-4 sm:px-8 lg:px-16 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Section label */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-white/30">
              Class 12 · All Chapters
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>

          {/* 2×5 / 5×2 grid of chapter cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {chapters.map((chapter, idx) => (
              <ChapterCard
                key={chapter.id}
                chapter={chapter}
                animDelay={120 + idx * 60}
                onLaunch={handleLaunch}
              />
            ))}
          </div>
        </div>
      </main>

      {/* ── BRANCHES FOOTER ────────────────────────────────────────────────── */}
      <footer className="relative z-10 px-4 sm:px-8 lg:px-16 pb-10">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-2xl border border-white/8 backdrop-blur-md bg-white/[0.03] px-6 py-5
                          flex flex-col sm:flex-row items-center justify-between gap-5 flex-wrap">
            {/* Branches */}
            <div className="flex items-center gap-6 flex-wrap justify-center sm:justify-start">
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-white/30">
                Our Branches
              </span>
              {branches.map((b) => (
                <div key={b.city} className="flex items-center gap-2">
                  <MapPin className="w-3 h-3 text-blue-400 flex-shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-white/70">{b.city}</span>
                    <span className="text-[10px] text-white/30 ml-1">({b.address})</span>
                  </div>
                  <a href={`tel:${b.phone}`} className="flex items-center gap-1 text-[11px] font-semibold
                             text-blue-300 hover:text-blue-200 transition-colors">
                    <Phone className="w-2.5 h-2.5" />
                    {b.phone}
                  </a>
                </div>
              ))}
            </div>

            {/* Partners */}
            <div className="flex items-center gap-3 flex-wrap justify-center">
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-white/30">
                Partners
              </span>
              <span className="px-3 py-1 rounded-lg bg-orange-900/30 border border-orange-500/20
                               text-xs font-bold text-orange-300">
                Vedantu
              </span>
              <span className="px-3 py-1 rounded-lg bg-green-900/30 border border-green-500/20
                               text-xs font-bold text-green-300">
                NEET Prep
              </span>
              <a
                href="https://solution-webpage.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 px-3 py-1 rounded-lg border border-blue-500/20
                           bg-blue-900/20 text-xs font-semibold text-blue-300
                           hover:border-blue-400/40 hover:text-blue-200 transition-all"
              >
                <ExternalLink className="w-3 h-3" />
                solution-webpage.vercel.app
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AcademyDashboardPage;
