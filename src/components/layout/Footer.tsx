import React from 'react';
import { Sparkles, BookOpen, Layers } from 'lucide-react';
import logoImg from '../../assets/logo.png';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white border-t border-slate-200/80 mt-auto py-6">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-3">
          <img src={logoImg} alt="EDUiDEAL Academy" className="h-7 w-auto object-contain" />
          <div>
            <span className="font-extrabold text-slate-900 tracking-tight">Learnova</span>
            <span className="mx-1.5 text-slate-400">•</span>
            <span className="font-semibold text-slate-700">EDUiDEAL ACADEMY</span>
            <span className="mx-2 text-slate-300">—</span>
            <span className="text-slate-600">CBSE Class 12 Chemistry</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-[11px] font-medium text-slate-500">
          <span className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-[#15009A]" /> The Digitalized Learning World
          </span>
          <span className="text-slate-300">•</span>
          <span>© 2026 Learnova • EDUiDEAL ACADEMY</span>
        </div>
      </div>
    </footer>
  );
};
