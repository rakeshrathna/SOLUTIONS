import React from 'react';
import { MathRenderer } from './MathRenderer';

interface SliderInputProps {
  label: string;
  symbol: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  description?: string;
  onChange: (val: number) => void;
}

export const SliderInput: React.FC<SliderInputProps> = ({
  label,
  symbol,
  value,
  min,
  max,
  step,
  unit,
  description,
  onChange
}) => {
  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

  return (
    <div className="flex flex-col gap-2 p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80 hover:border-cyan-500/40 transition-all duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">{label}</span>
          <span className="text-xs px-2 py-0.5 rounded bg-cyan-50 text-cyan-700 font-mono border border-cyan-200">
            <MathRenderer math={symbol} />
          </span>
        </div>
        <div className="flex items-baseline gap-1 font-mono">
          <span className="text-sm font-bold text-cyan-700">
            {typeof value === 'number' ? (Number.isInteger(value) ? value : value.toFixed(3).replace(/\.?0+$/, '')) : value}
          </span>
          {unit && <span className="text-xs text-slate-500 font-mono">{unit}</span>}
        </div>
      </div>

      <div className="relative flex items-center py-1">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full h-1.5 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #0891B2 0%, #0891B2 ${percentage}%, #E2E8F0 ${percentage}%, #E2E8F0 100%)`
          }}
        />
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
        <span>{min} {unit}</span>
        {description && (
          <span className="text-[11px] text-slate-500 italic max-w-[200px] truncate text-right" title={description}>
            {description}
          </span>
        )}
        <span>{max} {unit}</span>
      </div>
    </div>
  );
};
