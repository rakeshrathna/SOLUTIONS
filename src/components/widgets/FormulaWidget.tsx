import React, { useState, useMemo } from 'react';
import { FormulaConfig } from '../../types/formula';
import { SliderInput } from '../common/SliderInput';
import { MathRenderer } from '../common/MathRenderer';
import { evaluateFormula } from '../../utils/formulaEvaluator';
import { formatNumber } from '../../utils/formatters';
import { RotateCcw, HelpCircle } from 'lucide-react';

interface FormulaWidgetProps {
  config: FormulaConfig;
}

export const FormulaWidget: React.FC<FormulaWidgetProps> = ({ config }) => {
  const [variables, setVariables] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    Object.entries(config.variables).forEach(([key, variable]) => {
      initial[key] = variable.default;
    });
    return initial;
  });

  const handleVariableChange = (key: string, value: number) => {
    setVariables((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleReset = () => {
    const initial: Record<string, number> = {};
    Object.entries(config.variables).forEach(([key, variable]) => {
      initial[key] = variable.default;
    });
    setVariables(initial);
  };

  const calculatedResult = useMemo(() => {
    return evaluateFormula(config.result.formula, variables);
  }, [config.result.formula, variables]);

  const formattedMathResult = useMemo(() => {
    return formatNumber(calculatedResult, 4);
  }, [calculatedResult]);

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-card space-y-6">
      {/* Header & Reset */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <h3 className="text-base font-semibold text-slate-900 tracking-tight">
            {config.title || 'Interactive Formula Calculator'}
          </h3>
        </div>

        <button
          onClick={handleReset}
          className="px-3.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300 rounded-lg transition-all bg-white hover:bg-slate-50 shadow-sm flex items-center gap-1.5 cursor-pointer"
          title="Reset variables to standard NCERT values"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
          Reset Values
        </button>
      </div>

      {/* Formula Display Area */}
      <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="py-2 text-cyan-800 text-lg md:text-xl font-medium overflow-x-auto w-full text-center">
          <MathRenderer math={config.formula} displayMode={true} />
        </div>
      </div>

      {/* Main Grid: Controls (Sliders + Manual Inputs) on Left, Calculated Result + Insights on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Controls Column (Left) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-600 px-1">
            <span>Parameters (Adjust Slider or Type Value)</span>
          </div>

          {/* Variables list */}
          <div className="space-y-4">
            {Object.entries(config.variables).map(([key, variable]) => (
              <SliderInput
                key={key}
                label={variable.label}
                symbol={variable.symbol}
                value={variables[key] ?? variable.default}
                min={variable.min}
                max={variable.max}
                step={variable.step}
                unit={variable.unit}
                description={variable.description}
                onChange={(val) => handleVariableChange(key, val)}
              />
            ))}
          </div>
        </div>

        {/* Calculated Result Column (Right) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-600 px-1">
            <span>Calculated Result</span>
          </div>

          <div className="p-6 rounded-xl bg-gradient-to-br from-cyan-50/90 via-white to-slate-50 border border-cyan-200/80 shadow-sm flex flex-col justify-between min-h-[200px]">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-600">
                {config.result.label}
              </span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs px-2 py-0.5 rounded bg-white text-cyan-700 font-mono border border-cyan-200 shadow-2xs">
                  <MathRenderer math={config.result.symbol} />
                </span>
              </div>
            </div>

            <div className="my-5 overflow-x-auto">
              <div className="flex flex-wrap items-baseline gap-3">
                <div className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight font-mono leading-none">
                  <MathRenderer math={formattedMathResult} />
                </div>
                {config.result.unit && (
                  <span className="text-sm font-semibold text-cyan-800 font-mono bg-cyan-50 px-2 py-1 rounded border border-cyan-200 shrink-0">
                    {config.result.unit}
                  </span>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-cyan-200/60 text-xs text-slate-600 flex items-center gap-1.5 font-mono">
              <span className="w-2 h-2 rounded-full bg-cyan-600 animate-pulse" />
              <span>Real-time evaluated output</span>
            </div>
          </div>

          {/* Key Insights if available */}
          {config.keyInsights && config.keyInsights.length > 0 && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-800">
                <HelpCircle className="w-3.5 h-3.5 text-cyan-600" />
                <span>NCERT Exam Insights</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {config.keyInsights.map((insight, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-cyan-600 font-bold">•</span>
                    <span className="leading-relaxed">{insight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


