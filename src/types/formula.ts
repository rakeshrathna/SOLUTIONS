export interface FormulaVariable {
  label: string;
  symbol: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  default: number;
  description: string;
}

export interface FormulaResult {
  label: string;
  symbol: string;
  unit: string;
  formula: string; // JavaScript expression
}

export interface FormulaConfig {
  id?: string;
  title?: string;
  formula: string; // KaTeX LaTeX string
  variables: Record<string, FormulaVariable>;
  result: FormulaResult;
  note?: string;
  keyInsights?: string[];
}
