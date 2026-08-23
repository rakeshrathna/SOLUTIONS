import React from 'react';
import { clsx } from 'clsx';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'interactive' | 'accent' | 'subtle';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  variant = 'default',
  padding = 'md',
  className = '',
  children,
  ...props
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }[padding];

  const variantClasses = {
    default: 'rounded-2xl border border-slate-200/80 bg-white shadow-card',
    interactive: 'rounded-2xl border border-slate-200/80 bg-white shadow-card hover:border-cyan-500/50 hover:shadow-card-hover transition-all duration-200 cursor-pointer',
    accent: 'rounded-2xl border border-cyan-500/30 bg-white shadow-glow',
    subtle: 'rounded-2xl border border-slate-200/60 bg-slate-50/80 backdrop-blur-md'
  }[variant];

  return (
    <div
      className={clsx(variantClasses, paddingClasses, className)}
      {...props}
    >
      {children}
    </div>
  );
};
