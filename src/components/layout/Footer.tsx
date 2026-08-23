import React from 'react';
import { Sparkles, BookOpen, Layers } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white border-t border-slate-200/80 mt-auto py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-800 tracking-tight">CHEMISTRY 12 • SOLUTIONS</span>
          <span>—</span>
          <span>NCERT / CBSE Curriculum Master</span>
        </div>

        <div className="flex items-center gap-4 text-[11px] font-medium text-slate-500">
          <span className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-cyan-600" /> CBSE Class 12 Chemistry
          </span>
        </div>
      </div>
    </footer>
  );
};
