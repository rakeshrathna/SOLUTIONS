export interface GraphSeries {
  name: string;
  formula?: string; // JavaScript expression for y = f(x, variables)
  points?: Array<{ x: number; y: number; label?: string }>;
  color?: string;
  dashed?: boolean;
}

export interface GraphControl {
  variable: string;
  label: string;
  min: number;
  max: number;
  step: number;
  default: number;
  unit?: string;
}

export interface GraphAnnotation {
  type: 'text' | 'arrow' | 'horizontalLine' | 'verticalLine' | 'doubleArrow';
  x?: number;
  y?: number | string;
  text?: string;
  label?: string;
  color?: string;
  from?: { x: number; y: number | string };
  to?: { x: number; y: number | string };
}

export interface GraphCurrentPoint {
  x: number;
  y: number;
  label?: string;
}

export interface GraphReferenceLine {
  from: { x: number; y: number };
  to: { x: number; y: number };
  label?: string;
  color?: string;
  style?: 'dashed' | 'solid';
}

export interface GraphReferencePoint {
  x: number;
  y: number;
  label: string;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'top-right';
  color?: string;
}

export interface GraphConfig {
  id?: string;
  type: 'scatter' | 'line' | 'bar' | 'pie';
  title: string;
  description?: string;
  xAxis: {
    label: string;
    variable: string;
    min: number;
    max: number;
    unit?: string;
  };
  yAxis: {
    label: string;
    variable: string;
    min?: number;
    max?: number;
    unit?: string;
  };
  series: GraphSeries[];
  controls?: GraphControl[];
  annotations?: GraphAnnotation[];
  currentPoint?: GraphCurrentPoint;
  referenceLines?: GraphReferenceLine[];
  referencePoints?: GraphReferencePoint[];
}

