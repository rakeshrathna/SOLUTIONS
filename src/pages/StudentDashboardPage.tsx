import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { BookOpen, Lock, CheckCircle2, User, LogOut, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import logoImg from '../assets/logo.png';

const BRAND = 'rgb(21,0,154)';

export const StudentDashboardPage: React.FC = () => {
  const { user, studentDashboard, fetchStudentDashboard, logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchStudentDashboard();
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getSubjectStatus = (code: string) => {
    if (!studentDashboard) return 'LOCKED';
    const sub = studentDashboard.subjects.find((s) => s.code.toUpperCase() === code.toUpperCase());
    return sub ? sub.status : 'LOCKED';
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans antialiased selection:bg-[#15009A] selection:text-white">
      {/* ── STICKY WHITE HEADER ────────────────────────────────────────── */}
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 p-1 flex items-center justify-center shadow-xs">
              <img src={logoImg} alt="EDUiDEAL Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="font-black text-lg text-slate-900">Learnova Student Portal</span>
              <p className="text-xs text-slate-500 font-mono">EDUiDEAL Academy</p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            {studentDashboard && (
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-900">{studentDashboard.studentName}</p>
                <p className="text-[11px] text-[#15009A] font-mono font-bold">
                  Reg: {studentDashboard.registerNumber} • {studentDashboard.className} ({studentDashboard.board})
                </p>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-bold transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── MAIN CONTAINER ────────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Student Profile Banner */}
        <div
          className="p-8 rounded-3xl text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          style={{ background: BRAND }}
        >
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-indigo-100 text-xs font-mono font-semibold border border-white/20">
              <User className="w-3.5 h-3.5 text-cyan-300" />
              <span>Authenticated Student Account</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Welcome, {studentDashboard?.studentName || 'Student'}!
            </h1>
            <p className="text-sm text-indigo-100/80 max-w-2xl font-mono">
              Register Number: {studentDashboard?.registerNumber} • Curriculum: {studentDashboard?.className} {studentDashboard?.board}
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/10 p-3 rounded-2xl border border-white/20 font-mono text-xs text-white font-medium">
            <ShieldCheck className="w-5 h-5 text-emerald-300" />
            <span>PostgreSQL Authorization Active</span>
          </div>
        </div>

        {/* 3 Subject Cards Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#15009A]" />
            <span>Your Enrolled Subjects</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. CHEMISTRY CARD */}
            {(() => {
              const status = getSubjectStatus('CHEMISTRY');
              const isActive = status === 'ACTIVE';
              return (
                <div className={`p-6 rounded-3xl border transition-all flex flex-col justify-between space-y-6 ${
                  isActive
                    ? 'bg-white border-emerald-300 shadow-md hover:shadow-xl'
                    : 'bg-slate-50 border-slate-200 opacity-70'
                }`}>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        CHEMISTRY 12
                      </span>
                      {isActive ? (
                        <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>ACTIVE</span>
                        </span>
                      ) : (
                        <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200 flex items-center gap-1">
                          <Lock className="w-3.5 h-3.5" />
                          <span>LOCKED</span>
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">Chemistry</h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        10 Full NCERT Units: Solutions, Electrochemistry, Kinetics, d-& f-Block, Coordination, Haloalkanes, Organic Chemistry.
                      </p>
                    </div>
                  </div>

                  <div>
                    {isActive ? (
                      <Link
                        to="/chemistry"
                        className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all group"
                      >
                        <span>Explore Chemistry Lessons</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    ) : (
                      <div className="w-full py-3 px-4 rounded-xl bg-slate-100 border border-slate-200 text-slate-400 font-mono text-xs text-center flex items-center justify-center gap-2">
                        <Lock className="w-4 h-4 text-slate-400" />
                        <span>Enrollment Required</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* 2. PHYSICS CARD */}
            {(() => {
              const status = getSubjectStatus('PHYSICS');
              const isActive = status === 'ACTIVE';
              return (
                <div className={`p-6 rounded-3xl border transition-all flex flex-col justify-between space-y-6 ${
                  isActive
                    ? 'bg-white border-cyan-300 shadow-md hover:shadow-xl'
                    : 'bg-slate-50 border-slate-200 opacity-70'
                }`}>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200">
                        PHYSICS 12
                      </span>
                      {isActive ? (
                        <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>ACTIVE</span>
                        </span>
                      ) : (
                        <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200 flex items-center gap-1">
                          <Lock className="w-3.5 h-3.5" />
                          <span>LOCKED</span>
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">Physics</h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        Electrostatics, Current Electricity, Magnetism, Optics, Dual Nature, Atoms & Semiconductors.
                      </p>
                    </div>
                  </div>

                  <div>
                    {isActive ? (
                      <div className="w-full py-3 px-4 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-800 font-mono text-xs font-bold text-center flex items-center justify-center gap-2">
                        <Clock className="w-4 h-4 text-cyan-600" />
                        <span>Enrolled • Content Coming Soon</span>
                      </div>
                    ) : (
                      <div className="w-full py-3 px-4 rounded-xl bg-slate-100 border border-slate-200 text-slate-400 font-mono text-xs text-center flex items-center justify-center gap-2">
                        <Lock className="w-4 h-4 text-slate-400" />
                        <span>Enrollment Required</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* 3. MATHEMATICS CARD */}
            {(() => {
              const status = getSubjectStatus('MATHEMATICS');
              const isActive = status === 'ACTIVE';
              return (
                <div className={`p-6 rounded-3xl border transition-all flex flex-col justify-between space-y-6 ${
                  isActive
                    ? 'bg-white border-indigo-300 shadow-md hover:shadow-xl'
                    : 'bg-slate-50 border-slate-200 opacity-70'
                }`}>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                        MATHS 12
                      </span>
                      {isActive ? (
                        <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>ACTIVE</span>
                        </span>
                      ) : (
                        <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200 flex items-center gap-1">
                          <Lock className="w-3.5 h-3.5" />
                          <span>LOCKED</span>
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">Mathematics</h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        Relations & Functions, Calculus, Vectors, 3D Geometry, Linear Programming & Probability.
                      </p>
                    </div>
                  </div>

                  <div>
                    {isActive ? (
                      <div className="w-full py-3 px-4 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-800 font-mono text-xs font-bold text-center flex items-center justify-center gap-2">
                        <Clock className="w-4 h-4 text-indigo-600" />
                        <span>Enrolled • Content Coming Soon</span>
                      </div>
                    ) : (
                      <div className="w-full py-3 px-4 rounded-xl bg-slate-100 border border-slate-200 text-slate-400 font-mono text-xs text-center flex items-center justify-center gap-2">
                        <Lock className="w-4 h-4 text-slate-400" />
                        <span>Enrollment Required</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </main>
    </div>
  );
};
