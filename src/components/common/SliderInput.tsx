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
    <div className="flex-1 flex flex-col justify-between gap-3.5 p-4 sm:p-5 rounded-2xl bg-white border border-[#E5E5E5] hover:border-[#DA434C] transition-all duration-200 shadow-2xs">
      {/* Top Row: Variable Label & Symbol + Editable Typing Input */}
      <div className="flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-black truncate">
            {label}
          </span>
          <span className="text-xs sm:text-sm px-2.5 py-0.5 rounded-md bg-white text-[#DA434C] font-mono font-bold border border-rose-200 shadow-2xs shrink-0">
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
              className="w-28 sm:w-32 px-3 py-1.5 text-sm font-bold font-mono text-black bg-white border border-[#E5E5E5] rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-[#DA434C]/20 focus:border-[#DA434C] transition-all text-right"
            />
          </div>
          {unit && (
            <span className="text-xs font-semibold text-[#555555] font-mono bg-white px-2 py-1 rounded-lg border border-[#E5E5E5] shadow-2xs">
              {unit}
            </span>
          )}
        </div>
      </div>

      {/* Description Callout if present */}
      {description && (
        <p className="text-xs text-[#555555] italic bg-[#FAFAFA] px-3 py-1.5 rounded-lg border border-[#E5E5E5] leading-relaxed">
          {description}
        </p>
      )}

      {/* Slider Track Area with EDUiDEAL Red #DA434C */}
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
              background: `linear-gradient(to right, #DA434C 0%, #DA434C ${percentage}%, #E5E5E5 ${percentage}%, #E5E5E5 100%)`
            }}
          />
        </div>

        {/* Bottom Bounds: Min & Max Buttons */}
        <div className="flex items-center justify-between text-xs text-[#777777] font-mono pt-0.5">
          <button
            type="button"
            onClick={() => { setStrVal(String(min)); onChange(min); }}
            className="px-2 py-0.5 rounded-md bg-white border border-[#E5E5E5] hover:border-[#DA434C] hover:text-[#DA434C] transition-all cursor-pointer shadow-2xs text-[11px]"
            title="Set to minimum"
          >
            Min: <span className="font-semibold text-black">{min}</span> {unit}
          </button>

          <button
            type="button"
            onClick={() => { setStrVal(String(max)); onChange(max); }}
            className="px-2 py-0.5 rounded-md bg-white border border-[#E5E5E5] hover:border-[#DA434C] hover:text-[#DA434C] transition-all cursor-pointer shadow-2xs text-[11px]"
            title="Set to maximum"
          >
            Max: <span className="font-semibold text-black">{max}</span> {unit}
          </button>
        </div>
      </div>
    </div>
  );
};
