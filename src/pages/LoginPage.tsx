import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { Lock, Key, ShieldCheck, UserCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import eduidealLogo from '../assets/eduideal-logo.png';

const BRAND = '#C0222E';
const BRAND_HOVER = '#A61B26';

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
    <div className="min-h-screen bg-white text-black flex flex-col justify-between selection:bg-[#C0222E] selection:text-white font-sans antialiased">
      {/* ── STICKY WHITE HEADER (Matches Main Dashboard) ────────────────── */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E5E5E5] shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={eduidealLogo}
              alt="EDUiDEAL Academy Logo"
              className="h-8 sm:h-9 w-auto object-contain block group-hover:scale-105 transition-transform"
            />
          </Link>

          <Link
            to="/"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FAFAFA] hover:bg-slate-100 border border-[#E5E5E5] text-black text-xs font-bold transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Overview</span>
          </Link>
        </div>
      </header>

      {/* ── MAIN LOGIN CONTAINER (White Primary, Red Action) ─────────── */}
      <main className="max-w-md w-full mx-auto px-4 py-12">
        <div className="bg-white border border-[#E5E5E5] rounded-3xl p-8 shadow-xl shadow-slate-200/50">
          <div className="text-center mb-8">
            <div
              className="w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-md"
              style={{
                background: 'rgba(218,67,76,0.08)',
                color: BRAND,
                border: '1px solid rgba(218,67,76,0.22)',
              }}
            >
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-black text-black tracking-tight">Portal Authentication</h1>
            <p className="text-sm text-[#555555] mt-1">
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
              <label className="block text-xs font-mono font-bold text-black mb-1.5 uppercase tracking-wider">
                Register Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. 212224040265 or 00000001"
                  value={registerNumber}
                  onChange={(e) => setRegisterNumber(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#E5E5E5] text-black placeholder-[#777777] focus:outline-none focus:border-[#C0222E] focus:ring-2 focus:ring-[#C0222E]/20 transition-all font-mono text-sm shadow-xs"
                />
                <UserCheck className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-black mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#E5E5E5] text-black placeholder-[#777777] focus:outline-none focus:border-[#C0222E] focus:ring-2 focus:ring-[#C0222E]/20 transition-all text-sm shadow-xs"
                />
                <Key className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl text-white font-extrabold text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-2 group disabled:opacity-50 cursor-pointer"
              style={{
                background: BRAND,
                boxShadow: '0 4px 14px rgba(218,67,76,0.3)',
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
          <div className="mt-8 pt-6 border-t border-[#E5E5E5]">
            <p className="text-xs text-[#555555] mb-3 text-center font-medium">Initial Administrator Credentials Helper:</p>
            <button
              type="button"
              onClick={handleAdminDemoFill}
              className="w-full py-2.5 px-3 rounded-xl bg-rose-50/60 hover:bg-rose-100/80 border border-rose-200 text-[#C0222E] text-xs font-mono font-semibold flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-[#C0222E]" />
              <span>Fill Admin: 212224040265 / htna2006</span>
            </button>
          </div>
        </div>
      </main>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer className="py-6 text-center text-xs text-[#555555] border-t border-[#E5E5E5] bg-white font-mono">
        EDUiDEAL Academy — Learnova Digitalized Learning World © 2026
      </footer>
    </div>
  );
};
