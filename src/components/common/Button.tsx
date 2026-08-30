import React from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  isLoading = false,
  className = '',
  disabled,
  children,
  ...props
}) => {
  const sizeClasses = {
    sm: 'text-xs px-3.5 py-1.5 rounded-lg gap-1.5 font-medium',
    md: 'text-xs sm:text-sm px-4 py-2 rounded-lg gap-2 font-medium',
    lg: 'text-sm sm:text-base px-6 py-2.5 rounded-xl gap-2 font-semibold'
  }[size];

  const variantClasses = {
    primary:
      'bg-[#C0222E] hover:bg-[#A61B26] text-white shadow-sm transition-all duration-200 active:scale-[0.98]',
    secondary:
      'bg-white hover:bg-slate-50 text-black hover:text-slate-900 border border-[#E5E5E5] hover:border-slate-300 shadow-sm transition-all duration-200 active:scale-[0.98]',
    outline:
      'bg-transparent hover:bg-rose-50 text-[#C0222E] border border-[#C0222E]/40 hover:border-[#C0222E] transition-all duration-200 active:scale-[0.98]',
    ghost:
      'bg-transparent hover:bg-slate-100 text-[#555555] hover:text-black border border-transparent transition-all duration-200',
    danger:
      'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 hover:border-rose-300 transition-all duration-200'
  }[variant];

  return (
    <button
      disabled={disabled || isLoading}
      className={clsx(
        'inline-flex items-center justify-center transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed select-none focus:outline-none focus:ring-2 focus:ring-[#C0222E]/30',
        sizeClasses,
        variantClasses,
        className
      )}
      {...props}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="inline-flex shrink-0">{icon}</span>}
          {children}
          {icon && iconPosition === 'right' && <span className="inline-flex shrink-0">{icon}</span>}
        </>
      )}
    </button>
  );
};
