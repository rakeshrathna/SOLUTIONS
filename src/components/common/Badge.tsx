import React from 'react';
import { clsx } from 'clsx';
import { QuestionDifficulty } from '../../types/question';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'brand' | 'accent' | 'success' | 'warning' | 'danger' | 'neutral' | QuestionDifficulty;
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'sm',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'text-[11px] px-2.5 py-0.5 font-semibold uppercase tracking-wider',
    md: 'text-xs px-3 py-1 font-bold uppercase tracking-wider'
  }[size];

  const variantClasses: Record<string, string> = {
    brand: 'bg-rose-50 text-[#DA434C] border-rose-200',
    accent: 'bg-rose-50 text-[#DA434C] border-rose-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    danger: 'bg-rose-50 text-rose-700 border-rose-200',
    neutral: 'bg-slate-100 text-black border-[#E5E5E5]',
    BEGINNER: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    INTERMEDIATE: 'bg-amber-50 text-amber-700 border-amber-200',
    ADVANCED: 'bg-rose-50 text-rose-700 border-rose-200',
    HARD: 'bg-rose-50 text-rose-700 border-rose-200',
    BOARD: 'bg-rose-50 text-[#DA434C] border-rose-200'
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 rounded-full border',
        sizeClasses,
        variantClasses[variant] || variantClasses.neutral,
        className
      )}
    >
      {children}
    </span>
  );
};
