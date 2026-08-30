import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import eduidealLogo from '../assets/eduideal-logo.png';
import { chemistryLessonsData, ChemistryLesson } from '../data/curriculumData';
import {
  FlaskConical, Zap, Timer, Atom, Link2, Layers,
  Droplets, Wind, Leaf, Lock, ChevronRight,
  ArrowLeft, ArrowRight, BookOpen, GraduationCap,
  Sparkles, CheckCircle2, Phone, MapPin, Search
} from 'lucide-react';

/* ─── Brand Colors: EDUiDEAL Academy ──────────────────────── */
const BRAND = '#C0222E';
const BRAND_HOVER = '#A61B26';
const BRAND_LIGHT = 'rgba(192, 34, 46, 0.08)';
const BRAND_BORDER = 'rgba(192, 34, 46, 0.22)';
const BRAND_MED = 'rgba(192, 34, 46, 0.12)';

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
};

const catStyles: Record<string, { bg: string; text: string; border: string }> = {
  Physical: { bg: 'rgba(192, 34, 46, 0.08)', text: BRAND, border: 'rgba(192, 34, 46, 0.2)' },
  Inorganic: { bg: 'rgba(5,150,105,0.08)', text: '#047857', border: 'rgba(5,150,105,0.2)' },
  Organic: { bg: 'rgba(217,119,6,0.08)', text: '#B45309', border: 'rgba(217,119,6,0.2)' },
};

const branches = [
  { city: 'Perambur', address: 'MPM Street', phone: '9884234949' },
  { city: 'Kodungaiyur', address: 'Near Pandiyan Theatre', phone: '9790924949' },
  { city: 'Agaram Jn.', address: 'Agaram Jn.', phone: '7845977500' },
];

export const ChemistryLessonsPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Physical' | 'Inorganic' | 'Organic'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const showLockedToast = (title: string) => {
    setToast(`${title} — Content is being prepared for upcoming release!`);
    setTimeout(() => setToast(null), 3200);
  };

  const filteredLessons = chemistryLessonsData.filter((lesson) => {
    const matchesCategory = selectedCategory === 'All' || lesson.category === selectedCategory;
    const matchesSearch =
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white text-black antialiased font-sans">
      {/* ── TOAST NOTIFICATION ───────────────────────────────── */}
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

      {/* ── STICKY NAV ────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-40 transition-all duration-300 bg-white/95 backdrop-blur-xl border-b border-[#E5E5E5]"
        style={{
          boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.06)' : 'none',
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo + Brand */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
            <img src={eduidealLogo} alt="EDUiDEAL Academy Logo" className="h-8 sm:h-9 w-auto object-contain block group-hover:scale-105 transition-transform" />
          </Link>

          {/* Breadcrumb + Back Button */}
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-black hover:text-black bg-[#FAFAFA] hover:bg-slate-100 border border-[#E5E5E5] transition-all active:scale-95 shadow-xs cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Subjects</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ── HERO BANNER ───────────────────────────────────────── */}
      <section className="bg-white border-b border-[#E5E5E5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
          {/* Breadcrumb row */}
          <nav className="flex items-center gap-2 text-xs font-medium text-[#555555] mb-4">
            <Link to="/" className="hover:text-black transition-colors">
              Dashboard
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-black font-semibold">Chemistry</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#555555]">10 Lessons</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span
                  className="text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5"
                  style={{ background: BRAND_LIGHT, color: BRAND, border: `1px solid ${BRAND_BORDER}` }}
                >
                  <FlaskConical className="w-3.5 h-3.5" />
                  CBSE Class 12 Chemistry
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                  1 Lesson Active
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#FAFAFA] text-[#555555] border border-[#E5E5E5]">
                  9 Coming Soon
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight mb-3">
                Chemistry — <span style={{ color: BRAND }}>10 Lessons</span>
              </h1>

              <p className="text-sm sm:text-base text-[#555555] leading-relaxed max-w-2xl">
                Explore Class 12 Chemistry through interactive concepts, formula visualizations, dynamic graphs, revision notes, and topic-wise practice questions.
              </p>
            </div>

            {/* Quick Live Lesson CTA Card */}
            <div className="flex-shrink-0">
              <div className="p-5 rounded-2xl bg-[#FAFAFA] border border-[#E5E5E5] shadow-sm flex flex-col gap-3 min-w-[260px]">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#555555]">
                    Currently Live
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                    Lesson 1 Ready
                  </span>
                </div>
                <div className="font-bold text-sm text-black">
                  Chapter 1: Solutions
                </div>
                <button
                  onClick={() => navigate('/solutions')}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-white transition-all shadow-sm active:scale-95 cursor-pointer"
                  style={{ background: BRAND }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.92')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  Start Solutions Lesson <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mt-8 pt-6 border-t border-[#E5E5E5]">
            {/* Category pills */}
            <div className="flex flex-wrap items-center gap-2">
              {(['All', 'Physical', 'Inorganic', 'Organic'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'text-white shadow-sm'
                      : 'bg-[#FAFAFA] text-[#555555] hover:bg-slate-100 hover:text-black border border-[#E5E5E5]'
                  }`}
                  style={{
                    background: selectedCategory === cat ? BRAND : undefined,
                  }}
                >
                  {cat === 'All' ? 'All 10 Lessons' : `${cat} Chemistry`}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search chemistry lessons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white border border-[#E5E5E5] text-xs text-black placeholder:text-[#777777] focus:outline-none focus:border-[#C0222E] focus:ring-2 focus:ring-[#C0222E]/20 transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── LESSONS GRID ──────────────────────────────────────── */}
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLessons.map((lesson) => {
              const Icon = iconMap[lesson.iconName] || FlaskConical;
              const isActive = lesson.status === 'ACTIVE';
              const catStyle = catStyles[lesson.category] || catStyles.Physical;

              return (
                <div
                  key={lesson.id}
                  onClick={() => {
                    if (isActive && lesson.route) {
                      navigate(lesson.route);
                    } else {
                      showLockedToast(lesson.title);
                    }
                  }}
                  className={`group relative rounded-2xl border p-6 flex flex-col justify-between transition-all duration-200 select-none ${
                    isActive
                      ? 'bg-white border-[#E5E5E5] hover:border-[#C0222E] hover:shadow-xl hover:shadow-red-900/5 cursor-pointer'
                      : 'bg-[#FAFAFA]/60 border-[#E5E5E5] opacity-55 cursor-not-allowed'
                  }`}
                  style={{
                    boxShadow: isActive ? '0 2px 10px rgba(0,0,0,0.03)' : 'none',
                  }}
                >
                  {/* Top: Icon + Number + Status Badge */}
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                          isActive
                            ? 'text-white shadow-sm group-hover:scale-105'
                            : 'bg-slate-100 text-slate-400'
                        }`}
                        style={{
                          background: isActive ? BRAND : undefined,
                        }}
                      >
                        <Icon className="w-6 h-6" />
                      </div>

                      <div className="flex flex-col items-end gap-1.5">
                        <span className="text-[10px] font-bold font-mono tracking-widest text-[#777777]">
                          LESSON {String(lesson.lessonNumber).padStart(2, '0')}
                        </span>
                        {isActive ? (
                          <span className="flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                            LIVE NOW
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-[#555555] border border-[#E5E5E5]">
                            <Lock className="w-2.5 h-2.5" />
                            LOCKED
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Category pill */}
                    <div className="mb-2.5">
                      <span
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-md"
                        style={{
                          background: catStyle.bg,
                          color: catStyle.text,
                          border: `1px solid ${catStyle.border}`,
                        }}
                      >
                        {lesson.category} Chemistry
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className={`text-lg font-bold tracking-tight mb-1.5 ${
                        isActive ? 'text-black group-hover:text-[#C0222E] transition-colors' : 'text-[#555555]'
                      }`}
                    >
                      {lesson.title}
                    </h3>

                    {/* Subtitle */}
                    <p className="text-xs font-medium text-[#555555] mb-3 leading-relaxed">
                      {lesson.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-xs text-[#555555] leading-relaxed line-clamp-3 mb-5">
                      {lesson.description}
                    </p>
                  </div>

                  {/* Bottom: Action CTA */}
                  <div className="pt-4 border-t border-[#E5E5E5] mt-auto">
                    {isActive ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (lesson.route) navigate(lesson.route);
                        }}
                        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-white transition-all shadow-sm active:scale-95 cursor-pointer"
                        style={{ background: BRAND }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.92')}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                      >
                        Start Learning <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        disabled
                        className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-semibold bg-slate-100 text-slate-400 border border-[#E5E5E5] cursor-not-allowed"
                      >
                        <Lock className="w-3 h-3" />
                        <span>Coming Soon</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {filteredLessons.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-[#E5E5E5] p-8">
              <p className="text-[#555555] text-sm">No lessons found matching your filter or search criteria.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="mt-3 text-xs font-bold underline cursor-pointer"
                style={{ color: BRAND }}
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer className="border-t border-[#E5E5E5] bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img src={eduidealLogo} alt="EDUiDEAL Academy" className="h-8 w-auto object-contain" />
              </div>
              <p className="text-xs text-[#555555] leading-relaxed max-w-sm">
                Explore interactive concepts, visual learning, formulas, notes, and practice questions designed for CBSE Class 12 students.
              </p>
            </div>

            {/* Branches */}
            <div className="md:col-span-2">
              <h4 className="font-bold text-xs text-black uppercase tracking-wider mb-3">
                EDUiDEAL Academy Branches
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {branches.map((b) => (
                  <div key={b.city} className="p-3 rounded-xl bg-[#FAFAFA] border border-[#E5E5E5]">
                    <div className="flex items-center gap-1 text-xs font-bold text-black">
                      <MapPin className="w-3 h-3 text-[#C0222E]" />
                      <span>{b.city}</span>
                    </div>
                    <div className="text-[11px] text-[#555555] mt-0.5">{b.address}</div>
                    <div className="text-[11px] font-semibold text-[#C0222E] mt-1">{b.phone}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-[#E5E5E5] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#555555]">
            <span>© 2026 Learnova • EDUiDEAL ACADEMY. All rights reserved.</span>
            <Link to="/" className="text-xs font-semibold hover:underline" style={{ color: BRAND }}>
              Return to Subject Selection
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ChemistryLessonsPage;