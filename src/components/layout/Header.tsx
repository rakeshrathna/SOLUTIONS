import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useProgressStore } from '../../stores/progressStore';
import { BookOpen, CheckSquare, BarChart2, StickyNote, Menu } from 'lucide-react';
import logoImg from '../../assets/logo.png';

interface HeaderProps {
  isSidebarOpen?: boolean;
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isSidebarOpen = true, onToggleSidebar }) => {
  const location = useLocation();
  const getChapterProgressPercentage = useProgressStore((state) => state.getChapterProgressPercentage);
  const notes = useProgressStore((state) => state.notes);
  const notesCount = Object.keys(notes).filter((k) => Boolean(notes[k]?.trim())).length;
  const progressPct = getChapterProgressPercentage();

  const navLinks = [
    { to: '/', label: 'Overview', icon: <BookOpen className="w-4 h-4" /> },
    { to: '/practice', label: 'Practice & Test', icon: <CheckSquare className="w-4 h-4" /> },
    { to: '/notes', label: 'My Notes', icon: <StickyNote className="w-4 h-4" />, count: notesCount },
    { to: '/progress', label: 'My Progress', icon: <BarChart2 className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/90 border-b border-slate-200 shadow-sm">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
        {/* Left: 3-line Sidebar Toggle + Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-slate-800 hover:text-slate-950 transition-all flex items-center justify-center shadow-xs"
            title={isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
            aria-label="Toggle Sidebar Navigation"
          >
            <Menu className="w-5 h-5 text-slate-800" />
          </button>

          <Link to="/" className="flex items-center gap-2.5 group" title="Learnova — EDUiDEAL Academy">
            <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center p-0.5 shadow-xs group-hover:scale-105 transition-all overflow-hidden">
              <img src={logoImg} alt="EDUiDEAL Academy Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm tracking-tight text-slate-900 group-hover:text-[#15009A] transition-colors">
                  Learnova
                </span>
                <span className="text-[10px] font-mono font-semibold px-1.5 py-0.2 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                  CHEMISTRY 12
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-white text-cyan-700 font-semibold shadow-sm border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 border border-transparent'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
                {link.count !== undefined && link.count > 0 && (
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-cyan-100 text-cyan-800">
                    {link.count}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: Progress Pill */}
        <div className="flex items-center gap-3">
          <Link
            to="/progress"
            className="flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-50 border border-slate-200 hover:border-cyan-500 transition-all text-xs"
          >
            <span className="text-[11px] text-slate-500 font-mono">Mastery</span>
            <span className="font-bold text-cyan-700 font-mono">{progressPct}%</span>
            <div className="w-5 h-5 rounded-full bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-700 font-mono text-[10px] font-bold">
              ✓
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};
