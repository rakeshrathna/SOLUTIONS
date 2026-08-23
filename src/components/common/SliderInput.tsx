import React, { useState, useEffect } from 'react';
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
  const [strVal, setStrVal] = useState<string>(String(value));

  // Sync string buffer when value changes externally (e.g., slider drag or reset button)
  useEffect(() => {
    const num = parseFloat(strVal);
    if (isNaN(num) || Math.abs(num - value) > 1e-9) {
      setStrVal(String(value));
    }
  }, [value]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setStrVal(text);
    const parsed = parseFloat(text);
    if (!isNaN(parsed)) {
      onChange(parsed);
    }
  };

  const handleBlur = () => {
    const parsed = parseFloat(strVal);
    if (isNaN(parsed)) {
      setStrVal(String(value));
    } else {
      setStrVal(String(parsed));
      onChange(parsed);
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setStrVal(String(val));
    onChange(val);
  };

  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

  return (
    <div className="flex-1 flex flex-col justify-between gap-3.5 p-4 sm:p-5 rounded-2xl bg-slate-50/90 border border-slate-200 hover:border-cyan-500/50 transition-all duration-200 shadow-2xs">
      {/* Top Row: Variable Label & Symbol + Editable Typing Input */}
      <div className="flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-800 truncate">
            {label}
          </span>
          <span className="text-xs sm:text-sm px-2.5 py-0.5 rounded-md bg-white text-cyan-800 font-mono font-bold border border-cyan-200 shadow-2xs shrink-0">
            <MathRenderer math={symbol} />
          </span>
        </div>

        {/* Editable Typing Input Field + Unit */}
        <div className="flex items-center gap-2 font-mono shrink-0">
          <div className="relative flex items-center">
            <input
              type="number"
              step={step}
              value={strVal}
              onChange={handleTextChange}
              onBlur={handleBlur}
              aria-label={`Enter ${label} value`}
              className="w-28 sm:w-32 px-3 py-1.5 text-sm font-bold font-mono text-cyan-900 bg-white border border-slate-300 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all text-right"
            />
          </div>
          {unit && (
            <span className="text-xs font-semibold text-slate-600 font-mono bg-white px-2 py-1 rounded-lg border border-slate-200 shadow-2xs">
              {unit}
            </span>
          )}
        </div>
      </div>

      {/* Description Callout if present */}
      {description && (
        <p className="text-xs text-slate-500 italic bg-white/70 px-3 py-1.5 rounded-lg border border-slate-200/60 leading-relaxed">
          {description}
        </p>
      )}

      {/* Slider Track Area */}
      <div className="space-y-2 pt-0.5">
        <div className="relative flex items-center py-1">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={handleSliderChange}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #0891B2 0%, #0891B2 ${percentage}%, #E2E8F0 ${percentage}%, #E2E8F0 100%)`
            }}
          />
        </div>

        {/* Bottom Bounds: Min & Max Buttons */}
        <div className="flex items-center justify-between text-xs text-slate-400 font-mono pt-0.5">
          <button
            type="button"
            onClick={() => { setStrVal(String(min)); onChange(min); }}
            className="px-2 py-0.5 rounded-md bg-white border border-slate-200 hover:border-cyan-400 hover:text-cyan-700 transition-all cursor-pointer shadow-2xs text-[11px]"
            title="Set to minimum"
          >
            Min: <span className="font-semibold text-slate-700">{min}</span> {unit}
          </button>

          <button
            type="button"
            onClick={() => { setStrVal(String(max)); onChange(max); }}
            className="px-2 py-0.5 rounded-md bg-white border border-slate-200 hover:border-cyan-400 hover:text-cyan-700 transition-all cursor-pointer shadow-2xs text-[11px]"
            title="Set to maximum"
          >
            Max: <span className="font-semibold text-slate-700">{max}</span> {unit}
          </button>
        </div>
      </div>
    </div>
  );
};



