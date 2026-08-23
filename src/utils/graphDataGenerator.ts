import { GraphConfig, GraphSeries } from '../types/graph';
import { evaluateFormula } from './formulaEvaluator';

export interface PlotPoint {
  x: number;
  y: number;
}

export function generateSeriesData(
  series: GraphSeries,
  config: GraphConfig,
  controlValues: Record<string, number>,
  steps: number = 100
): PlotPoint[] {
  if (series.points && series.points.length > 0) {
    return series.points.map(p => ({ x: p.x, y: p.y }));
  }

  if (!series.formula) return [];

  const { min: xMin, max: xMax, variable: xVar } = config.xAxis;
  const stepSize = (xMax - xMin) / steps;
  const points: PlotPoint[] = [];

  for (let i = 0; i <= steps; i++) {
    const x = xMin + i * stepSize;
    const scope = {
      ...controlValues,
      [xVar]: x,
      x: x,
    };
    const y = evaluateFormula(series.formula, scope);
    points.push({
      x: parseFloat(x.toFixed(6)),
      y: parseFloat(y.toFixed(4)),
    });
  }

  return points;
}
