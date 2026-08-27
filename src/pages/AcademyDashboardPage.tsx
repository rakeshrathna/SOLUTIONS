import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImg from '../assets/logo.png';
import studentsImg from '../assets/hero-students.png';
import {
  FlaskConical, Zap, Calculator, ArrowRight,
  Phone, MapPin, Check, BookOpen, Sparkles,
  Sliders, LineChart, FileText, CheckCircle, Lock
} from 'lucide-react';

/* ─── Brand Tokens (Preserving Existing Brand Color) ──────── */
const BRAND = 'rgb(21,0,154)'; // #15009A

export const AcademyDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showLockedNotice = (subjectName: string) => {
    setToastMsg(`${subjectName} curriculum modules are currently in development for Term 1.`);
    setTimeout(() => setToastMsg(null), 3600);
  };

  const scrollToSubjects = () => {
    const el = document.getElementById('curriculum');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: 'Curriculum', href: '#curriculum' },
    { label: 'Learning Tools', href: '#tools' },
    { label: 'Study Method', href: '#method' },
    { label: 'Branches', href: '#branches' },
  ];

  const branches = [
    {
      name: 'Perambur Branch',
      location: 'MPM Street',
      phone: '9884234949',
    },
    {
      name: 'Kodungaiyur Branch',
      location: 'Near Pandiyan Theatre',
      phone: '9790924949',
    },
    {
      name: 'Agaram Junction Branch',
      location: 'Agaram Junction',
      phone: '7845977500',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased flex flex-col selection:bg-[#15009A] selection:text-white">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm bg-slate-900 text-white text-xs px-4 py-3 rounded-lg shadow-lg border border-slate-800 flex items-center gap-2.5 animate-in fade-in duration-200">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* ─── 1. Navigation Bar (Restrained & Purposeful) ───────────── */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Brand Identity */}
          <div className="flex items-center gap-3">
            <img
              src={logoImg}
              alt="EDUiDEAL Academy"
              className="w-9 h-9 object-contain"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-slate-950">
                  Learnova
                </span>
                <span className="text-[10px] font-medium tracking-wide px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                  CBSE 12
                </span>
              </div>
              <p className="text-[10px] font-medium tracking-wider text-slate-500 uppercase">
                EDUiDEAL Academy
              </p>
            </div>
          </div>

          {/* Center Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="hover:text-slate-950 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Primary Action */}
          <div className="flex items-center gap-3">
            <button
              onClick={scrollToSubjects}
              className="text-xs font-semibold px-4 py-2 rounded-lg text-white transition-colors duration-150 active:scale-[0.98]"
              style={{ background: BRAND }}
            >
              Choose Subject ↓
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* ─── 2. Hero Section (Clean, Editorial & Balanced) ───────── */}
        <section className="relative pt-12 sm:pt-16 pb-16 sm:pb-20 border-b border-slate-200 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column: Educational Content & CTA */}
              <div className="lg:col-span-7">
                <div className="text-xs font-semibold tracking-wider text-[#15009A] uppercase mb-3">
                  EDUIDEAL ACADEMY • CLASS 12 CBSE LEARNING PLATFORM
                </div>

                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-950 leading-[1.15] mb-3">
                  Welcome to Learnova
                </h1>

                <p className="text-xl sm:text-2xl font-medium text-slate-700 mb-5 tracking-tight">
                  The Digitalized Learning World
                </p>

                <p className="text-base text-slate-600 leading-relaxed mb-8 max-w-xl">
                  Explore interactive concepts, visual learning, formulas, notes, and practice questions designed specifically for CBSE Class 12 students.
                </p>

                {/* Primary & Secondary Actions */}
                <div className="flex flex-wrap items-center gap-4 mb-10">
                  <button
                    onClick={scrollToSubjects}
                    className="flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-lg text-white transition-colors duration-150 active:scale-[0.98]"
                    style={{ background: BRAND }}
                  >
                    <span>Choose Your Subject</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => navigate('/chemistry')}
                    className="text-sm font-medium text-slate-700 hover:text-[#15009A] transition-colors py-2 px-3"
                  >
                    View Chemistry Lessons →
                  </button>
                </div>

                {/* Academic Standards Footer Row */}
                <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    NCERT Aligned Curriculum
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    Interactive STEM Visualizers
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    CBSE Board Exam Preparation
                  </span>
                </div>
              </div>

              {/* Right Column: Character Illustration (Natural, Clean Integration) */}
              <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
                <img
                  src={studentsImg}
                  alt="Learnova CBSE Class 12 Students"
                  className="w-full max-w-[340px] sm:max-w-[390px] lg:max-w-[440px] h-auto object-contain select-none"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ─── 3. Curriculum Tracks (Controlled Asymmetry) ─────────── */}
        <section id="curriculum" className="py-16 sm:py-20 bg-slate-50/60 border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            {/* Section Header */}
            <div className="max-w-2xl mb-12">
              <div className="text-xs font-semibold tracking-wider text-[#15009A] uppercase mb-2">
                ACADEMIC STREAMS
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-950 mb-3">
                Choose Your Subject
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Dedicated learning tracks structured around the CBSE Class 12 syllabus. Select a subject to access interactive simulators, topic breakdowns, and exam practice.
              </p>
            </div>

            {/* Controlled Asymmetry: Featured Active Stream + Companion Tracks */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Chemistry (Active Live Stream - Primary Visual Space) */}
              <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-8 shadow-xs hover:border-slate-300 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ background: 'rgba(21,0,154,0.08)', color: BRAND }}
                    >
                      <FlaskConical className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-950">Chemistry</h3>
                      <span className="text-xs text-slate-500 font-medium">Class 12 CBSE • 10 NCERT Chapters</span>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    Active Track
                  </span>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Interactive chemistry concepts, formulas, visual simulations, graphs, and topic-wise practice.
                </p>

                {/* Featured Chapter Callout */}
                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 mb-6">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
                    Featured Interactive Lesson
                  </div>
                  <div className="text-sm font-bold text-slate-900 mb-1">
                    Unit 1: Solutions
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Interactive particle visualizer, live Raoult’s Law vapor pressure calculator, Henry's law graphs, and verified NCERT practice problems.
                  </p>
                </div>

                {/* Stream Coverage Summary */}
                <div className="space-y-2 mb-8">
                  <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    Curriculum Highlights
                  </div>
                  {[
                    'Physical Chemistry: Solutions, Electrochemistry & Chemical Kinetics',
                    'Inorganic Chemistry: d- and f-Block Elements & Coordination Compounds',
                    'Organic Chemistry: Haloalkanes, Alcohols, Carbonyl Compounds & Biomolecules',
                    'Interactive formula calculators with parameter sliders',
                  ].map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                      <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Primary CTA */}
                <button
                  onClick={() => navigate('/chemistry')}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-semibold text-white transition-colors duration-150"
                  style={{ background: BRAND }}
                >
                  <span>Explore Chemistry Curriculum</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Physics & Mathematics (Upcoming Tracks - Compact Editorial Grouping) */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Physics Track */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-slate-900">Physics</h4>
                        <span className="text-xs text-slate-500 font-medium">14 Chapters • Theory & Numericals</span>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      <Lock className="w-3 h-3 text-slate-400" />
                      In Preparation
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Understand physics concepts through interactive simulations, formulas, graphs, and numerical practice.
                  </p>

                  <div className="text-[11px] text-slate-500 mb-4 space-y-1">
                    <div><strong>Coverage:</strong> Electrostatics, Magnetism, Optics, Modern Physics</div>
                  </div>

                  <button
                    onClick={() => showLockedNotice('Physics')}
                    className="w-full py-2 px-3 rounded-lg text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 transition-colors"
                  >
                    View Physics Syllabus
                  </button>
                </div>

                {/* Mathematics Track */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
                        <Calculator className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-slate-900">Mathematics</h4>
                        <span className="text-xs text-slate-500 font-medium">13 Chapters • Calculus & Vectors</span>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      <Lock className="w-3 h-3 text-slate-400" />
                      In Preparation
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Learn mathematical concepts through visual explanations, interactive calculations, formulas, and practice problems.
                  </p>

                  <div className="text-[11px] text-slate-500 mb-4 space-y-1">
                    <div><strong>Coverage:</strong> Differential & Integral Calculus, 3D Geometry, Probability</div>
                  </div>

                  <button
                    onClick={() => showLockedNotice('Mathematics')}
                    className="w-full py-2 px-3 rounded-lg text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 transition-colors"
                  >
                    View Mathematics Syllabus
                  </button>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ─── 4. Learning Capabilities (Editorial & Uncarded) ──────── */}
        <section id="tools" className="py-16 sm:py-20 bg-white border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Left Editorial Anchor */}
              <div className="lg:col-span-5">
                <div className="text-xs font-semibold tracking-wider text-[#15009A] uppercase mb-2">
                  LEARNING METHODOLOGY
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-950 mb-4 leading-snug">
                  Built for conceptual clarity, not rote memorization.
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Learnova replaces passive reading with active, parameter-driven STEM tools. Students adjust scientific parameters in real time, observe the results immediately, and verify exam solutions step-by-step.
                </p>

                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
                  <div className="text-xs font-bold text-slate-800">
                    Curriculum Framework:
                  </div>
                  <div className="text-xs text-slate-600 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#15009A]" />
                    <span>NCERT Class 12 Board Syllabus</span>
                  </div>
                  <div className="text-xs text-slate-600 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#15009A]" />
                    <span>Verified Numerical Calculations</span>
                  </div>
                  <div className="text-xs text-slate-600 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#15009A]" />
                    <span>Topic-Wise Mastery Tracking</span>
                  </div>
                </div>
              </div>

              {/* Right Structured Capability List (No Generic Cards) */}
              <div className="lg:col-span-7 divide-y divide-slate-200 border-t border-b border-slate-200 lg:border-t-0">
                {[
                  {
                    title: 'Interactive Formula Solvers',
                    desc: 'Adjust sliders to see formulas compute variables and outputs dynamically with real-time decimal precision.',
                    icon: Sliders,
                  },
                  {
                    title: 'Live Dynamic Graphs',
                    desc: 'Plot vapor pressures, concentration changes, and rate kinetics on responsive coordinate axes.',
                    icon: LineChart,
                  },
                  {
                    title: 'Molecular & Particle Simulations',
                    desc: 'Simulate molecular kinetic motion, dissolution, and osmotic equilibrium in an interactive physics canvas.',
                    icon: Sparkles,
                  },
                  {
                    title: 'Curated NCERT Practice Quizzes',
                    desc: 'Topic-wise CBSE multiple-choice questions and numericals with verified step-by-step solutions.',
                    icon: CheckCircle,
                  },
                  {
                    title: 'Structured Chapter Notes & Definitions',
                    desc: 'Clear, concise summaries, key definitions, and formula cheat sheets tailored for rapid revision.',
                    icon: FileText,
                  },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="py-5 flex items-start gap-4">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: 'rgba(21,0,154,0.06)', color: BRAND }}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-slate-900 mb-1">
                          {item.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </section>

        {/* ─── 5. Study Workflow (Linear & Natural) ─────────────────── */}
        <section id="method" className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="max-w-2xl mb-12">
              <div className="text-xs font-semibold tracking-wider text-[#15009A] uppercase mb-2">
                STUDY METHOD
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-950 mb-3">
                How to study a chapter
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                A four-step cycle proven to build long-term retention and numerical problem-solving speed.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: '01',
                  title: 'Select Subject',
                  desc: 'Choose your subject track and select the chapter aligned with your current school or academy syllabus.',
                },
                {
                  step: '02',
                  title: 'Simulate & Calculate',
                  desc: 'Manipulate formula variables and run the interactive visualizer to understand the physical concept.',
                },
                {
                  step: '03',
                  title: 'Review Chapter Notes',
                  desc: 'Read curated key formulas, constants, and step-by-step mathematical derivations.',
                },
                {
                  step: '04',
                  title: 'Validate with Practice',
                  desc: 'Solve NCERT practice questions with immediate feedback to test exam readiness.',
                },
              ].map((s) => (
                <div key={s.step} className="border-t-2 border-slate-300 pt-4">
                  <div className="font-mono text-xs font-bold text-[#15009A] mb-2">
                    {s.step}
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mb-2">
                    {s.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ─── 6. Footer & Branches (Professional Institute Identity) ── */}
      <footer id="branches" className="bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            
            {/* Organization Info */}
            <div className="md:col-span-5">
              <div className="flex items-center gap-3 mb-4">
                <img src={logoImg} alt="EDUiDEAL Academy" className="w-8 h-8 object-contain" />
                <div>
                  <span className="font-bold text-base text-slate-900 tracking-tight">
                    Learnova
                  </span>
                  <span className="mx-2 text-slate-400">•</span>
                  <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    EDUiDEAL Academy
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-6 max-w-sm">
                The digitalized STEM learning platform for CBSE Class 12 students. Providing interactive simulations, formula solvers, and NCERT practice questions.
              </p>
              <div className="text-xs text-slate-500">
                Official learning partner for CBSE Senior Secondary Board Exams.
              </div>
            </div>

            {/* Branches Details (Clean, structured list) */}
            <div className="md:col-span-7">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">
                Our Branches
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {branches.map((b) => (
                  <div key={b.name} className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                    <div className="font-bold text-slate-900 mb-1">
                      {b.name.replace(' Branch', '')}
                    </div>
                    <div className="text-slate-500 mb-2 flex items-start gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                      <span>{b.location}</span>
                    </div>
                    <a
                      href={`tel:${b.phone}`}
                      className="inline-flex items-center gap-1 font-semibold text-[#15009A] hover:underline"
                    >
                      <Phone className="w-3 h-3" />
                      <span>{b.phone}</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              © 2026 Learnova • EDUiDEAL Academy. All rights reserved.
            </div>
            <a
              href="https://solution-webpage.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-900 transition-colors"
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
