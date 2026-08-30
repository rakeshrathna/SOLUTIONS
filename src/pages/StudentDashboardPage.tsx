import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore, UserInfo } from '../stores/authStore';
import { BookOpen, Lock, CheckCircle2, User, LogOut, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import eduidealLogo from '../assets/eduideal-logo.png';

const BRAND = '#DA434C';
const BRAND_HOVER = '#C93640';

const getEffectiveUser = (storeUser: UserInfo | null): UserInfo | null => {
  if (storeUser) return storeUser;
  const raw = localStorage.getItem('learnova_auth_user');
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const StudentDashboardPage: React.FC = () => {
  const { user: storeUser, studentDashboard, fetchStudentDashboard, logout } = useAuthStore();
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState<UserInfo | null>(() => getEffectiveUser(storeUser));

  useEffect(() => {
    const active = getEffectiveUser(storeUser);
    if (!active) {
      navigate('/login');
      return;
    }
    setCurrentUser(active);
    fetchStudentDashboard();
  }, [storeUser, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getSubjectStatus = (code: string) => {
    if (!studentDashboard) return 'LOCKED';
    const sub = studentDashboard.subjects.find((s) => s.code.toUpperCase() === code.toUpperCase());
    return sub ? sub.status : 'LOCKED';
  };

  const activeUser = currentUser || getEffectiveUser(storeUser);

  if (!activeUser) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="bg-white border border-[#E5E5E5] rounded-3xl p-8 max-w-md w-full text-center space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-[#DA434C] border border-rose-200 flex items-center justify-center mx-auto">
            🎓
          </div>
          <h2 className="text-xl font-black text-black">Student Portal Login Required</h2>
          <p className="text-xs text-[#555555] font-mono">
            Please sign in with your student register number & password to access your dashboard.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="w-full py-3 rounded-xl text-white font-extrabold text-xs shadow-md cursor-pointer"
            style={{ background: BRAND }}
          >
            Go to Sign In Portal
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black font-sans antialiased selection:bg-[#DA434C] selection:text-white">
      {/* ── STICKY WHITE HEADER ────────────────────────────────────────── */}
      <header className="bg-white/95 backdrop-blur-md border-b border-[#E5E5E5] sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={eduidealLogo} alt="EDUiDEAL Logo" className="h-8 sm:h-9 w-auto object-contain block" />
            <div className="hidden sm:block">
              <span className="font-black text-sm text-black">Learnova Student Portal</span>
              <p className="text-xs text-[#555555] font-mono">EDUiDEAL Academy</p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-black">{studentDashboard?.studentName || activeUser.studentName || 'Student'}</p>
              <p className="text-[11px] text-[#DA434C] font-mono font-bold">
                Reg: {activeUser.registerNumber} • {studentDashboard?.className || 'Class 12'} ({studentDashboard?.board || 'CBSE'})
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-[#DA434C] text-xs font-bold transition-all cursor-pointer"
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
          style={{ background: BRAND, boxShadow: '0 10px 25px -3px rgba(218, 67, 76, 0.25)' }}
        >
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-mono font-semibold border border-white/20">
              <User className="w-3.5 h-3.5 text-amber-300" />
              <span>Authenticated Student Account</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Welcome, {studentDashboard?.studentName || activeUser.studentName || 'Student'}!
            </h1>
            <p className="text-sm text-white/90 max-w-2xl font-mono">
              Register Number: {activeUser.registerNumber} • Curriculum: {studentDashboard?.className || 'Class 12'} {studentDashboard?.board || 'CBSE'}
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/10 p-3 rounded-2xl border border-white/20 font-mono text-xs text-white font-medium">
            <ShieldCheck className="w-5 h-5 text-emerald-300" />
            <span>Subject Authorization Active</span>
          </div>
        </div>

        {/* 3 Subject Cards Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-black flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#DA434C]" />
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
                    : 'bg-[#FAFAFA] border-[#E5E5E5] opacity-70'
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
                        <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-[#555555] border border-[#E5E5E5] flex items-center gap-1">
                          <Lock className="w-3.5 h-3.5" />
                          <span>LOCKED</span>
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-black">Chemistry</h3>
                      <p className="text-xs text-[#555555] mt-1 leading-relaxed">
                        10 Full NCERT Units: Solutions, Electrochemistry, Kinetics, d-& f-Block, Coordination, Haloalkanes, Organic Chemistry.
                      </p>
                    </div>
                  </div>

                  <div>
                    {isActive ? (
                      <Link
                        to="/chemistry"
                        className="w-full py-3 px-4 rounded-xl bg-[#DA434C] hover:bg-[#C93640] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all group cursor-pointer"
                      >
                        <span>Explore Chemistry Lessons</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    ) : (
                      <div className="w-full py-3 px-4 rounded-xl bg-[#FAFAFA] border border-[#E5E5E5] text-slate-400 font-mono text-xs text-center flex items-center justify-center gap-2">
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
                    ? 'bg-white border-[#E5E5E5] shadow-md hover:shadow-xl'
                    : 'bg-[#FAFAFA] border-[#E5E5E5] opacity-70'
                }`}>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-rose-50 text-[#DA434C] border border-rose-200">
                        PHYSICS 12
                      </span>
                      {isActive ? (
                        <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-rose-50 text-[#DA434C] border border-rose-200 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>ACTIVE</span>
                        </span>
                      ) : (
                        <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-[#555555] border border-[#E5E5E5] flex items-center gap-1">
                          <Lock className="w-3.5 h-3.5" />
                          <span>LOCKED</span>
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-black">Physics</h3>
                      <p className="text-xs text-[#555555] mt-1 leading-relaxed">
                        Electrostatics, Current Electricity, Magnetism, Optics, Dual Nature, Atoms & Semiconductors.
                      </p>
                    </div>
                  </div>

                  <div>
                    {isActive ? (
                      <div className="w-full py-3 px-4 rounded-xl bg-rose-50 border border-rose-200 text-[#DA434C] font-mono text-xs font-bold text-center flex items-center justify-center gap-2">
                        <Clock className="w-4 h-4 text-[#DA434C]" />
                        <span>Enrolled • Content Coming Soon</span>
                      </div>
                    ) : (
                      <div className="w-full py-3 px-4 rounded-xl bg-[#FAFAFA] border border-[#E5E5E5] text-slate-400 font-mono text-xs text-center flex items-center justify-center gap-2">
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
                    ? 'bg-white border-[#E5E5E5] shadow-md hover:shadow-xl'
                    : 'bg-[#FAFAFA] border-[#E5E5E5] opacity-70'
                }`}>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-rose-50 text-[#DA434C] border border-rose-200">
                        MATHS 12
                      </span>
                      {isActive ? (
                        <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-rose-50 text-[#DA434C] border border-rose-200 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>ACTIVE</span>
                        </span>
                      ) : (
                        <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-[#555555] border border-[#E5E5E5] flex items-center gap-1">
                          <Lock className="w-3.5 h-3.5" />
                          <span>LOCKED</span>
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-black">Mathematics</h3>
                      <p className="text-xs text-[#555555] mt-1 leading-relaxed">
                        Relations & Functions, Calculus, Vectors, 3D Geometry, Linear Programming & Probability.
                      </p>
                    </div>
                  </div>

                  <div>
                    {isActive ? (
                      <div className="w-full py-3 px-4 rounded-xl bg-rose-50 border border-rose-200 text-[#DA434C] font-mono text-xs font-bold text-center flex items-center justify-center gap-2">
                        <Clock className="w-4 h-4 text-[#DA434C]" />
                        <span>Enrolled • Content Coming Soon</span>
                      </div>
                    ) : (
                      <div className="w-full py-3 px-4 rounded-xl bg-[#FAFAFA] border border-[#E5E5E5] text-slate-400 font-mono text-xs text-center flex items-center justify-center gap-2">
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
