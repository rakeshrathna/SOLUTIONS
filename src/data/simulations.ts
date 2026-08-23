import { SimulationConfig } from '../types/simulation';

export const simulationsData: Record<string, SimulationConfig> = {
  'particles-in-solution': {
    id: 'particles-in-solution',
    type: 'particles',
    title: 'Microscopic Particle Visualization: Solution & Surface Vaporization',
    description: 'Observe how non-volatile solute particles distribute among solvent molecules and occupy surface sites, directly lowering the escaping tendency (vapour pressure).',
    controls: [
      {
        name: 'soluteConcentration',
        label: 'Solute Particles Count',
        type: 'slider',
        min: 0,
        max: 40,
        step: 2,
        default: 12
      },
      {
        name: 'temperature',
        label: 'Temperature (Kinetic Speed)',
        type: 'slider',
        min: 0,
        max: 100,
        step: 5,
        default: 35,
        unit: '°C'
      }
    ],
    gridSize: 10,
    particleTypes: [
      {
        type: 'solvent',
        color: '#38bdf8',
        symbol: '○',
        initialCount: 75
      },
      {
        type: 'solute',
        color: '#f43f5e',
        symbol: '●',
        initialCount: 15
      }
    ]
  },

  'vanthoff-dissociation': {
    id: 'vanthoff-dissociation',
    type: 'vanthoff',
    title: "van't Hoff Factor Particle Dissociation & Association",
    description: "Explore how electrolytes dissociate into ions or associate into dimers, altering the total particle count that dictates colligative properties.",
    controls: [
      {
        name: 'soluteType',
        label: 'Select Solute Compound',
        type: 'select',
        options: [
          'Glucose (C₆H₁₂O₆)',
          'NaCl',
          'CaCl₂',
          'K₂SO₄',
          'Benzoic Acid in Benzene'
        ],
        default: 'NaCl'
      },
      {
        name: 'concentration',
        label: 'Molar Concentration',
        type: 'slider',
        min: 0.001,
        max: 1.0,
        step: 0.005,
        default: 0.1,
        unit: 'mol L⁻¹'
      }
    ],
    soluteData: {
      'Glucose (C₆H₁₂O₆)': {
        formula: 'C₆H₁₂O₆',
        dissociation: 'No dissociation (Non-electrolyte)',
        particles: 1,
        i_ideal: 1,
        i_observed: 1.00,
        particleDisplay: ['C₆H₁₂O₆']
      },
      'NaCl': {
        formula: 'NaCl',
        dissociation: 'NaCl_{(s)} \\rightarrow Na^+ + Cl^-',
        particles: 2,
        i_ideal: 2,
        i_observed: 1.94,
        particleDisplay: ['Na⁺', 'Cl⁻']
      },
      'CaCl₂': {
        formula: 'CaCl₂',
        dissociation: 'CaCl_{2(s)} \\rightarrow Ca^{2+} + 2Cl^-',
        particles: 3,
        i_ideal: 3,
        i_observed: 2.58,
        particleDisplay: ['Ca²⁺', 'Cl⁻', 'Cl⁻']
      },
      'K₂SO₄': {
        formula: 'K₂SO₄',
        dissociation: 'K_2SO_{4(s)} \\rightarrow 2K^+ + SO_4^{2-}',
        particles: 3,
        i_ideal: 3,
        i_observed: 2.70,
        particleDisplay: ['K⁺', 'K⁺', 'SO₄²⁻']
      },
      'Benzoic Acid in Benzene': {
        formula: '2 C₆H₅COOH \\rightleftharpoons (C₆H₅COOH)₂',
        dissociation: 'Dimerization via H-bonding (Association)',
        particles: 0.5,
        i_ideal: 0.5,
        i_observed: 0.504,
        particleDisplay: ['(C₆H₅COOH)₂ dimer']
      }
    },
    display: {
      showParticles: true,
      showFormula: true,
      showValues: true
    }
  },

  'osmosis-simulator': {
    id: 'osmosis-simulator',
    type: 'osmosis',
    title: 'Osmosis & Semipermeable Membrane (SPM) Flow',
    description: 'Watch solvent molecules spontaneously migrate from pure solvent (or dilute solution) through the SPM into the concentrated solution until osmotic pressure reaches equilibrium.',
    controls: [
      {
        name: 'soluteConcentrationLeft',
        label: 'Left Chamber Solute (Dilute)',
        type: 'slider',
        min: 0,
        max: 20,
        step: 1,
        default: 2
      },
      {
        name: 'soluteConcentrationRight',
        label: 'Right Chamber Solute (Concentrated)',
        type: 'slider',
        min: 2,
        max: 30,
        step: 1,
        default: 16
      },
      {
        name: 'appliedPressureRight',
        label: 'Applied External Pressure (Right)',
        type: 'slider',
        min: 0,
        max: 100,
        step: 5,
        default: 0,
        unit: 'bar'
      }
    ],
    leftSide: {
      solventParticles: 60,
      soluteParticles: 2,
      volume: 100
    },
    rightSide: {
      solventParticles: 60,
      soluteParticles: 16,
      volume: 100
    },
    membrane: {
      position: 'center',
      permeableTo: ['solvent'],
      impermeableTo: ['solute']
    },
    display: {
      showParticleCount: true,
      showConcentration: true,
      showFlowDirection: true,
      showOsmoticPressure: true
    }
  }
};
