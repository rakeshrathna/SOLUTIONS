export interface SimulationControl {
  name: string;
  label: string;
  type: 'slider' | 'select' | 'button';
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
  default: any;
  unit?: string;
}

export interface ParticleType {
  type: string;
  color: string;
  symbol: string;
  initialCount: number;
}

export interface SoluteData {
  formula: string;
  dissociation: string;
  particles: number;
  i_ideal: number;
  i_observed: number;
  particleDisplay: string[];
}

export interface SimulationConfig {
  id?: string;
  type: 'particles' | 'vanthoff' | 'osmosis' | 'custom';
  title: string;
  description: string;
  controls: SimulationControl[];
  initialState?: any;
  gridSize?: number;
  particleTypes?: ParticleType[];
  states?: Record<string, string>;
  soluteData?: Record<string, SoluteData>;
  leftSide?: {
    solventParticles: number;
    soluteParticles: number;
    volume: number;
  };
  rightSide?: {
    solventParticles: number;
    soluteParticles: number;
    volume: number;
  };
  membrane?: {
    position: string;
    permeableTo: string[];
    impermeableTo: string[];
  };
  display?: Record<string, boolean>;
  updateFunction?: string;
}
