import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { LogIn, Key, ShieldCheck, UserCheck, ArrowRight, Lock, Sparkles } from 'lucide-react';
import logoImg from '../assets/logo.png';

export const LoginPage: React.FC = () => {
  const [registerNumber, setRegisterNumber] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error, user } = useAuthStore();
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
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-between selection:bg-[#15009A] selection:text-white">
      {/* Top Header */}
      <header className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center shadow-lg group-hover:scale-105 transition-all">
            <img src={logoImg} alt="EDUiDEAL Academy Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <span className="font-extrabold text-lg text-white group-hover:text-indigo-400 transition-colors">
              Learnova
            </span>
            <p className="text-xs text-slate-400 font-mono">EDUiDEAL Academy</p>
          </div>
        </Link>
        <Link
          to="/"
          className="text-xs font-semibold px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all border border-slate-700"
        >
          Back to Overview
        </Link>
      </header>

      {/* Main Login Card */}
      <main className="max-w-md w-full mx-auto px-4 py-12">
        <div className="bg-slate-800/90 backdrop-blur-xl border border-slate-700 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-[#15009A] to-indigo-600 flex items-center justify-center shadow-indigo-900/50 shadow-lg">
              <Lock className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Portal Authentication</h1>
            <p className="text-sm text-slate-400 mt-1">
              Sign in using your assigned Register Number & Password
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium flex items-start gap-2.5">
              <span className="font-bold">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider font-mono">
                Register Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. 212224040265 or 00000001"
                  value={registerNumber}
                  onChange={(e) => setRegisterNumber(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all font-mono text-sm"
                />
                <UserCheck className="w-4 h-4 text-slate-500 absolute right-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider font-mono">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all text-sm"
                />
                <Key className="w-4 h-4 text-slate-500 absolute right-3.5 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#15009A] to-indigo-600 hover:from-indigo-700 hover:to-indigo-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-indigo-900/40 hover:shadow-indigo-900/60 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
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

          {/* Quick Seed Helper Button */}
          <div className="mt-8 pt-6 border-t border-slate-700/60">
            <p className="text-xs text-slate-400 mb-3 text-center">Initial Administrator Credentials Helper:</p>
            <button
              type="button"
              onClick={handleAdminDemoFill}
              className="w-full py-2 px-3 rounded-xl bg-indigo-950/60 hover:bg-indigo-900/60 border border-indigo-700/50 text-indigo-300 text-xs font-mono font-medium flex items-center justify-center gap-2 transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <span>Fill Admin: 212224040265 / htna2006</span>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-slate-500 border-t border-slate-800">
        EDUiDEAL Academy — Learnova Digitalized Learning World © 2026
      </footer>
    </div>
  );
};
