import React, { useState } from 'react';
import { MathRenderer } from '../common/MathRenderer';
import { ChevronLeft, ChevronRight, RotateCcw, Sparkles } from 'lucide-react';

export interface VisualizerStep {
  badge: string;
  codeSnippet?: string;
  description: string;
  headers: string[];
  rows: Array<{
    cols: string[];
    isHighlighted?: boolean;
    annotation?: string;
  }>;
}

export interface StepSolverConfig {
  id?: string;
  title: string;
  topic?: string;
  formulaDisplay?: string;
  steps: VisualizerStep[];
}

interface StepSolverWidgetProps {
  config: StepSolverConfig;
}

export const StepSolverWidget: React.FC<StepSolverWidgetProps> = ({ config }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const steps = config.steps || [];
  const currentStep = steps[currentStepIndex] || steps[0];

  const handlePrev = () => {
    setCurrentStepIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentStepIndex((prev) => Math.min(steps.length - 1, prev + 1));
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
  };

  if (!currentStep) return null;

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition-all duration-200">
      {/* 2. Header Area */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-cyan-700 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-cyan-600" />
            {currentStep.badge || `Step ${currentStepIndex + 1} — Step Breakdown`}
          </span>

          {currentStep.codeSnippet && (
            <span className="text-xs text-slate-700 font-mono bg-slate-100 px-3 py-1 rounded-md border border-slate-200 max-w-md truncate">
              {currentStep.codeSnippet}
            </span>
          )}
        </div>

        {/* 3. Navigation (Prev/Next/Reset) */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            className="px-3.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300 rounded-lg transition-all bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 shadow-sm"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentStepIndex === steps.length - 1}
            className="px-3.5 py-1.5 text-xs font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 shadow-sm"
          >
            Next
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleReset}
            className="px-3.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300 rounded-lg transition-all bg-white hover:bg-slate-50 flex items-center gap-1 shadow-sm"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        </div>
      </div>

      {/* Math Formula if provided */}
      {config.formulaDisplay && (
        <div className="mb-4 p-3 rounded-xl bg-cyan-50/70 border border-cyan-200 text-center text-cyan-800 font-medium">
          <MathRenderer math={config.formulaDisplay} displayMode={true} />
        </div>
      )}

      {/* 4. The Data Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {currentStep.headers.map((head, idx) => (
                <th
                  key={idx}
                  className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-600 font-mono"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {currentStep.rows.map((row, rIdx) => {
              const isHighlight = row.isHighlighted;
              return (
                <tr
                  key={rIdx}
                  className={`transition-all ${
                    isHighlight
                      ? 'bg-cyan-50/80 border-l-2 border-cyan-600'
                      : 'hover:bg-slate-50/80'
                  }`}
                >
                  {row.cols.map((col, cIdx) => (
                    <td
                      key={cIdx}
                      className={`px-4 py-3 text-sm ${
                        cIdx === 0 ? 'font-mono' : ''
                      } ${isHighlight ? 'text-slate-900 font-semibold' : 'text-slate-600'}`}
                    >
                      {col.startsWith('$') && col.endsWith('$') ? (
                        <MathRenderer math={col.slice(1, -1)} />
                      ) : (
                        col
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 5. Bottom Description */}
      <div className="mt-4 text-sm text-slate-600 border-t border-slate-100 pt-4 flex items-center justify-between">
        <p className="leading-relaxed">
          {currentStep.description}
        </p>
        <span className="text-xs font-mono text-slate-400 whitespace-nowrap ml-4">
          Step {currentStepIndex + 1} of {steps.length}
        </span>
      </div>
    </div>
  );
};
