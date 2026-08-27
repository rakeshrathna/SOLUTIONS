import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { Lock, Key, ShieldCheck, UserCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import logoImg from '../assets/logo.png';

const BRAND = 'rgb(21,0,154)';

export const LoginPage: React.FC = () => {
  const [registerNumber, setRegisterNumber] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerNumber.trim() || !password.trim()) return;

    const success = await login(registerNumber.trim(), password.trim());
    if (success) {
      const currentUser = useAuthStore.getState().user;
      if (currentUser?.role === 'ADMIN') {
        navigate('/admin/dashboard');
      } else {
        navigate('/student/dashboard');
      }
    }
  };

  const handleAdminDemoFill = () => {
    setRegisterNumber('212224040265');
    setPassword('htna2006');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col justify-between selection:bg-[#15009A] selection:text-white font-sans antialiased">
      {/* ── STICKY WHITE HEADER (Matches Main Dashboard) ────────────────── */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 p-1 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform overflow-hidden">
              <img src={logoImg} alt="EDUiDEAL Academy Logo" className="w-full h-full object-contain" />
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
          </Link>

          <Link
            to="/"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-bold transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Overview</span>
          </Link>
        </div>
      </header>

      {/* ── MAIN LOGIN CONTAINER (White Primary, Blue Secondary) ─────────── */}
      <main className="max-w-md w-full mx-auto px-4 py-12">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl shadow-slate-200/50">
          <div className="text-center mb-8">
            <div
              className="w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-md"
              style={{
                background: 'rgba(21,0,154,0.06)',
                color: BRAND,
                border: '1px solid rgba(21,0,154,0.18)',
              }}
            >
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Portal Authentication</h1>
            <p className="text-sm text-slate-500 mt-1">
              Sign in using your assigned Register Number & Password
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-start gap-2.5">
              <span className="font-bold">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-mono font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Register Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. 212224040265 or 00000001"
                  value={registerNumber}
                  onChange={(e) => setRegisterNumber(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#15009A] focus:ring-2 focus:ring-indigo-500/20 transition-all font-mono text-sm shadow-xs"
                />
                <UserCheck className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#15009A] focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm shadow-xs"
                />
                <Key className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl text-white font-extrabold text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
              style={{
                background: BRAND,
                boxShadow: '0 4px 14px rgba(21,0,154,0.3)',
              }}
            >
              {isLoading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Quick Admin Helper Button */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <p className="text-xs text-slate-500 mb-3 text-center font-medium">Initial Administrator Credentials Helper:</p>
            <button
              type="button"
              onClick={handleAdminDemoFill}
              className="w-full py-2.5 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-100/80 border border-indigo-200 text-[#15009A] text-xs font-mono font-semibold flex items-center justify-center gap-2 transition-all shadow-xs"
            >
              <ShieldCheck className="w-4 h-4 text-[#15009A]" />
              <span>Fill Admin: 212224040265 / htna2006</span>
            </button>
          </div>
        </div>
      </main>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer className="py-6 text-center text-xs text-slate-500 border-t border-slate-200 bg-white font-mono">
        EDUiDEAL Academy — Learnova Digitalized Learning World © 2026
      </footer>
    </div>
  );
};
