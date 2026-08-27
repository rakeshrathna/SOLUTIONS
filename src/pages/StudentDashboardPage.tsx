import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { BookOpen, Lock, CheckCircle2, User, LogOut, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import logoImg from '../assets/logo.png';

export const StudentDashboardPage: React.FC = () => {
  const { user, studentDashboard, fetchStudentDashboard, logout, isLoading } = useAuthStore();
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
    <div className="min-h-screen bg-slate-900 text-white selection:bg-[#15009A] selection:text-white">
      {/* Top Navbar */}
      <header className="bg-slate-800/80 backdrop-blur-xl border-b border-slate-700/80 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center shadow-lg">
              <img src={logoImg} alt="EDUiDEAL Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-white">Learnova Student Portal</span>
              <p className="text-xs text-slate-400 font-mono">EDUiDEAL Academy</p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            {studentDashboard && (
              <div className="text-right hidden sm:block">
                <p className="text-xs font-semibold text-white">{studentDashboard.studentName}</p>
                <p className="text-[11px] text-emerald-400 font-mono">
                  Reg: {studentDashboard.registerNumber} • {studentDashboard.className} ({studentDashboard.board})
                </p>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Student Profile Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#15009A] via-indigo-900 to-slate-800 border border-indigo-500/30 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-mono font-semibold border border-white/15">
              <User className="w-3.5 h-3.5 text-cyan-400" />
              <span>Authenticated Student Account</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Welcome, {studentDashboard?.studentName || 'Student'}!
            </h1>
            <p className="text-sm text-indigo-200/80 max-w-2xl font-mono">
              Register Number: {studentDashboard?.registerNumber} • Curriculum: {studentDashboard?.className} {studentDashboard?.board}
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-900/60 p-3 rounded-2xl border border-indigo-500/20 font-mono text-xs text-indigo-200">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>PostgreSQL Authorization Active</span>
          </div>
        </div>

        {/* 3 Subject Cards Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-400" />
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
                    ? 'bg-slate-800/90 border-emerald-500/40 shadow-xl hover:border-emerald-500/70'
                    : 'bg-slate-800/40 border-slate-700/60 opacity-75'
                }`}>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        CHEMISTRY 12
                      </span>
                      {isActive ? (
                        <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>ACTIVE</span>
                        </span>
                      ) : (
                        <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-700 text-slate-400 border border-slate-600 flex items-center gap-1">
                          <Lock className="w-3.5 h-3.5" />
                          <span>LOCKED</span>
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-white">Chemistry</h3>
                      <p className="text-xs text-slate-400 mt-1">
                        10 Full NCERT Units: Solutions, Electrochemistry, Kinetics, d-& f-Block, Coordination, Haloalkanes, Organic Chemistry.
                      </p>
                    </div>
                  </div>

                  <div>
                    {isActive ? (
                      <Link
                        to="/chemistry"
                        className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/40 transition-all group"
                      >
                        <span>Explore Chemistry Lessons</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    ) : (
                      <div className="w-full py-3 px-4 rounded-xl bg-slate-700/50 border border-slate-600/50 text-slate-400 font-mono text-xs text-center flex items-center justify-center gap-2">
                        <Lock className="w-4 h-4 text-slate-500" />
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
                    ? 'bg-slate-800/90 border-cyan-500/40 shadow-xl'
                    : 'bg-slate-800/40 border-slate-700/60 opacity-75'
                }`}>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        PHYSICS 12
                      </span>
                      {isActive ? (
                        <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>ACTIVE</span>
                        </span>
                      ) : (
                        <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-700 text-slate-400 border border-slate-600 flex items-center gap-1">
                          <Lock className="w-3.5 h-3.5" />
                          <span>LOCKED</span>
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-white">Physics</h3>
                      <p className="text-xs text-slate-400 mt-1">
                        Electrostatics, Current Electricity, Magnetism, Optics, Dual Nature, Atoms & Semiconductors.
                      </p>
                    </div>
                  </div>

                  <div>
                    {isActive ? (
                      <div className="w-full py-3 px-4 rounded-xl bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 font-mono text-xs text-center flex items-center justify-center gap-2">
                        <Clock className="w-4 h-4 text-cyan-400" />
                        <span>Enrolled • Content Coming Soon</span>
                      </div>
                    ) : (
                      <div className="w-full py-3 px-4 rounded-xl bg-slate-700/50 border border-slate-600/50 text-slate-400 font-mono text-xs text-center flex items-center justify-center gap-2">
                        <Lock className="w-4 h-4 text-slate-500" />
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
                    ? 'bg-slate-800/90 border-indigo-500/40 shadow-xl'
                    : 'bg-slate-800/40 border-slate-700/60 opacity-75'
                }`}>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        MATHS 12
                      </span>
                      {isActive ? (
                        <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>ACTIVE</span>
                        </span>
                      ) : (
                        <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-700 text-slate-400 border border-slate-600 flex items-center gap-1">
                          <Lock className="w-3.5 h-3.5" />
                          <span>LOCKED</span>
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-white">Mathematics</h3>
                      <p className="text-xs text-slate-400 mt-1">
                        Relations & Functions, Calculus, Vectors, 3D Geometry, Linear Programming & Probability.
                      </p>
                    </div>
                  </div>

                  <div>
                    {isActive ? (
                      <div className="w-full py-3 px-4 rounded-xl bg-indigo-950/80 border border-indigo-700/50 text-indigo-300 font-mono text-xs text-center flex items-center justify-center gap-2">
                        <Clock className="w-4 h-4 text-indigo-400" />
                        <span>Enrolled • Content Coming Soon</span>
                      </div>
                    ) : (
                      <div className="w-full py-3 px-4 rounded-xl bg-slate-700/50 border border-slate-600/50 text-slate-400 font-mono text-xs text-center flex items-center justify-center gap-2">
                        <Lock className="w-4 h-4 text-slate-500" />
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
