import React from 'react';

interface ProgressBarProps {
  value: number; // 0 to 100
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  showPercentage?: boolean;
  color?: 'brand' | 'accent' | 'success' | 'amber';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  label,
  size = 'md',
  showPercentage = true,
  color = 'brand'
}) => {
  const clamped = Math.min(100, Math.max(0, value));

  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3.5'
  }[size];

  const colorGradients = {
    brand: 'from-[#C0222E] to-rose-400',
    accent: 'from-[#C0222E] to-red-400',
    success: 'from-emerald-600 to-teal-400',
    amber: 'from-amber-600 to-yellow-400'
  }[color];

  return (
    <div className="w-full flex flex-col gap-1.5">
      {(label || showPercentage) && (
        <div className="flex items-center justify-between text-xs font-medium text-black">
          {label && <span>{label}</span>}
          {showPercentage && <span className="font-mono text-[#C0222E] font-semibold">{clamped}%</span>}
        </div>
      )}
      <div className={`w-full bg-slate-200/80 rounded-full overflow-hidden border border-slate-200 ${heightClasses}`}>
        <div
          className={`h-full rounded-full bg-gradient-to-r ${colorGradients} transition-all duration-300 ease-out shadow-sm`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};
