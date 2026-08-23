import { GraphConfig } from '../types/graph';

export const graphsData: Record<string, GraphConfig> = {
  'henrys-law': {
    id: 'henrys-law',
    type: 'scatter',
    title: "Henry's Law: Pressure vs Mole Fraction",
    description: "Demonstrates the linear relationship p = K_H × x. A steeper slope (higher K_H) indicates lower gas solubility in liquid.",
    xAxis: {
      label: 'Mole Fraction of Gas in Solution (x)',
      variable: 'x',
      min: 0,
      max: 0.0001,
      unit: ''
    },
    yAxis: {
      label: 'Partial Pressure of Gas (p)',
      variable: 'p',
      min: 0,
      max: 10,
      unit: 'bar'
    },
    series: [
      {
        name: "Henry's Law Line (p = K_H · x)",
        formula: 'K_H * x * 1000',
        color: '#14b8a6'
      }
    ],
    controls: [
      {
        variable: 'K_H',
        label: "Henry's Constant (K_H)",
        min: 10,
        max: 150,
        step: 1,
        default: 76.48,
        unit: 'kbar'
      }
    ],
    currentPoint: {
      x: 0.0000129,
      y: 0.987,
      label: 'N₂ in H₂O at 293 K'
    },
    annotations: [
      {
        type: 'text',
        x: 0.00005,
        y: 6,
        text: 'Higher K_H → Lower Solubility (Steeper Slope)'
      }
    ]
  },

  'raoults-law-ideal': {
    id: 'raoults-law-ideal',
    type: 'line',
    title: "Raoult's Law: Binary Ideal Solution",
    description: "Vapour pressure diagram for a binary mixture of two volatile liquids showing partial pressures p₁, p₂ and total pressure p_total.",
    xAxis: {
      label: 'Mole Fraction of Component 2 (x₂)',
      variable: 'x2',
      min: 0,
      max: 1,
      unit: ''
    },
    yAxis: {
      label: 'Vapour Pressure (p)',
      variable: 'p',
      min: 0,
      max: 600,
      unit: 'mm Hg'
    },
    series: [
      {
        name: 'p₁ = p₁⁰ (1 - x₂)',
        formula: 'p1_0 * (1 - x2)',
        color: '#3b82f6'
      },
      {
        name: 'p₂ = p₂⁰ · x₂',
        formula: 'p2_0 * x2',
        color: '#10b981'
      },
      {
        name: 'p_total = p₁ + p₂',
        formula: 'p1_0 * (1 - x2) + p2_0 * x2',
        color: '#f43f5e'
      }
    ],
    controls: [
      {
        variable: 'p1_0',
        label: 'Pure Vapour Pressure p₁⁰ (e.g. CHCl₃)',
        min: 50,
        max: 500,
        step: 10,
        default: 200,
        unit: 'mm Hg'
      },
      {
        variable: 'p2_0',
        label: 'Pure Vapour Pressure p₂⁰ (e.g. CH₂Cl₂)',
        min: 100,
        max: 600,
        step: 10,
        default: 415,
        unit: 'mm Hg'
      }
    ],
    currentPoint: {
      x: 0.688,
      y: 347.9,
      label: 'CH₂Cl₂ + CHCl₃ (x₂=0.688)'
    }
  },

  'positive-deviation': {
    id: 'positive-deviation',
    type: 'line',
    title: "Positive Deviation from Raoult's Law",
    description: "Observed when A-B intermolecular attractive forces are weaker than A-A and B-B forces (e.g. Ethanol + Acetone). Vapour pressure is higher than ideal.",
    xAxis: {
      label: 'Mole Fraction of Component 2 (x₂)',
      variable: 'x2',
      min: 0,
      max: 1
    },
    yAxis: {
      label: 'Vapour Pressure',
      variable: 'p',
      min: 0,
      max: 600,
      unit: 'mm Hg'
    },
    series: [
      {
        name: 'Ideal Solution (Raoult)',
        formula: 'p1_0 * (1 - x2) + p2_0 * x2',
        color: '#64748b',
        dashed: true
      },
      {
        name: 'Actual Total Pressure (Positive Deviation)',
        formula: 'p1_0 * (1 - x2) + p2_0 * x2 + deviation * x2 * (1 - x2)',
        color: '#f43f5e'
      }
    ],
    controls: [
      {
        variable: 'p1_0',
        label: 'p₁⁰',
        min: 100,
        max: 400,
        step: 10,
        default: 200,
        unit: 'mm Hg'
      },
      {
        variable: 'p2_0',
        label: 'p₂⁰',
        min: 100,
        max: 500,
        step: 10,
        default: 300,
        unit: 'mm Hg'
      },
      {
        variable: 'deviation',
        label: 'Repulsion / Excess Vapour Factor',
        min: 50,
        max: 300,
        step: 10,
        default: 160
      }
    ],
    annotations: [
      {
        type: 'text',
        x: 0.5,
        y: 400,
        text: 'ΔmixH > 0 (Endothermic), ΔmixV > 0'
      }
    ]
  },

  'negative-deviation': {
    id: 'negative-deviation',
    type: 'line',
    title: "Negative Deviation from Raoult's Law",
    description: "Observed when A-B intermolecular attractive forces are stronger than A-A and B-B forces (e.g. Phenol + Aniline, Acetone + Chloroform). Vapour pressure is lower than ideal.",
    xAxis: {
      label: 'Mole Fraction of Component 2 (x₂)',
      variable: 'x2',
      min: 0,
      max: 1
    },
    yAxis: {
      label: 'Vapour Pressure',
      variable: 'p',
      min: 0,
      max: 600,
      unit: 'mm Hg'
    },
    series: [
      {
        name: 'Ideal Solution (Raoult)',
        formula: 'p1_0 * (1 - x2) + p2_0 * x2',
        color: '#64748b',
        dashed: true
      },
      {
        name: 'Actual Total Pressure (Negative Deviation)',
        formula: 'p1_0 * (1 - x2) + p2_0 * x2 - deviation * x2 * (1 - x2)',
        color: '#3b82f6'
      }
    ],
    controls: [
      {
        variable: 'p1_0',
        label: 'p₁⁰',
        min: 100,
        max: 400,
        step: 10,
        default: 200,
        unit: 'mm Hg'
      },
      {
        variable: 'p2_0',
        label: 'p₂⁰',
        min: 100,
        max: 500,
        step: 10,
        default: 300,
        unit: 'mm Hg'
      },
      {
        variable: 'deviation',
        label: 'Attraction / Lowering Factor',
        min: 50,
        max: 250,
        step: 10,
        default: 140
      }
    ],
    annotations: [
      {
        type: 'text',
        x: 0.5,
        y: 180,
        text: 'ΔmixH < 0 (Exothermic), ΔmixV < 0'
      }
    ]
  },

  'boiling-point-elevation': {
    id: 'boiling-point-elevation',
    type: 'line',
    title: 'Elevation of Boiling Point (Vapour Pressure Curve)',
    description: "Vapour pressure of solution is always lower than pure solvent at any temperature, shifting the 1.013 bar boiling threshold to a higher temperature T_b.",
    xAxis: {
      label: 'Temperature (T)',
      variable: 'T',
      min: 360,
      max: 382,
      unit: 'K'
    },
    yAxis: {
      label: 'Vapour Pressure',
      variable: 'p',
      min: 0.4,
      max: 1.4,
      unit: 'bar'
    },
    series: [
      {
        name: 'Pure Solvent (Water)',
        formula: 'Math.exp(12.5 - 4660 / T)',
        color: '#3b82f6'
      },
      {
        name: 'Solution (with Non-Volatile Solute)',
        formula: '(1 - 0.03 * molality) * Math.exp(12.5 - 4660 / T)',
        color: '#f43f5e'
      }
    ],
    controls: [
      {
        variable: 'molality',
        label: 'Molality of Solute (m)',
        min: 0.1,
        max: 5,
        step: 0.1,
        default: 1.5,
        unit: 'mol kg⁻¹'
      }
    ],
    annotations: [
      {
        type: 'horizontalLine',
        y: 1.013,
        label: '1 atm / 1.013 bar (Boiling Threshold)',
        color: '#f59e0b'
      },
      {
        type: 'verticalLine',
        x: 373.15,
        label: 'T_b⁰ = 373.15 K (Pure Solvent)',
        color: '#3b82f6'
      }
    ]
  },

  'freezing-point-depression': {
    id: 'freezing-point-depression',
    type: 'line',
    title: 'Depression of Freezing Point (Phase Diagram)',
    description: "Depression occurs because the liquid solution meets the frozen solid solvent curve at a lower temperature T_f than pure liquid solvent T_f⁰.",
    xAxis: {
      label: 'Temperature (T)',
      variable: 'T',
      min: 260,
      max: 280,
      unit: 'K'
    },
    yAxis: {
      label: 'Vapour Pressure',
      variable: 'p',
      min: 0,
      max: 1.2,
      unit: 'kPa'
    },
    series: [
      {
        name: 'Liquid Solvent',
        formula: 'Math.exp(10.5 - 2800 / T)',
        color: '#3b82f6'
      },
      {
        name: 'Frozen Solid Solvent (Ice)',
        formula: 'Math.exp(14.0 - 3780 / T)',
        color: '#10b981'
      },
      {
        name: 'Solution Curve',
        formula: '(1 - 0.04 * molality) * Math.exp(10.5 - 2800 / T)',
        color: '#f43f5e'
      }
    ],
    controls: [
      {
        variable: 'molality',
        label: 'Molality of Solute (m)',
        min: 0.1,
        max: 4,
        step: 0.1,
        default: 1.5,
        unit: 'mol kg⁻¹'
      }
    ],
    annotations: [
      {
        type: 'verticalLine',
        x: 273.15,
        label: 'T_f⁰ = 273.15 K (Pure Solvent)',
        color: '#3b82f6'
      }
    ]
  },

  'colligative-vs-molality': {
    id: 'colligative-vs-molality',
    type: 'line',
    title: 'Colligative Elevation / Depression vs Molality',
    description: "Linear dependence of ΔT_b and ΔT_f on solute molality m, scaled by the van't Hoff factor i.",
    xAxis: {
      label: 'Molality of Solute (m)',
      variable: 'm',
      min: 0,
      max: 4,
      unit: 'mol kg⁻¹'
    },
    yAxis: {
      label: 'Colligative Property (ΔT in K)',
      variable: 'property',
      min: 0,
      max: 15,
      unit: 'K'
    },
    series: [
      {
        name: 'ΔT_b = i · K_b · m (Water K_b=0.52)',
        formula: 'i * 0.52 * m',
        color: '#14b8a6'
      },
      {
        name: 'ΔT_f = i · K_f · m (Water K_f=1.86)',
        formula: 'i * 1.86 * m',
        color: '#3b82f6'
      }
    ],
    controls: [
      {
        variable: 'i',
        label: "van't Hoff Factor (i)",
        min: 0.5,
        max: 3.5,
        step: 0.1,
        default: 1.0
      }
    ]
  },

  'vanthoff-vs-concentration': {
    id: 'vanthoff-vs-concentration',
    type: 'scatter',
    title: "van't Hoff Factor (i) vs Concentration",
    description: "As concentration approaches 0 (infinite dilution), inter-ionic attractions disappear and i reaches its theoretical stoichiometric limit.",
    xAxis: {
      label: 'Concentration (molality m)',
      variable: 'm',
      min: 0,
      max: 1.1,
      unit: 'm'
    },
    yAxis: {
      label: "van't Hoff Factor (i)",
      variable: 'i',
      min: 1,
      max: 3.5
    },
    series: [
      {
        name: 'NaCl (i_theor = 2)',
        points: [
          { x: 1.0, y: 1.87 },
          { x: 0.1, y: 1.94 },
          { x: 0.01, y: 1.97 },
          { x: 0.001, y: 2.00 }
        ],
        color: '#3b82f6'
      },
      {
        name: 'KCl (i_theor = 2)',
        points: [
          { x: 1.0, y: 1.85 },
          { x: 0.1, y: 1.94 },
          { x: 0.01, y: 1.98 },
          { x: 0.001, y: 2.00 }
        ],
        color: '#10b981'
      },
      {
        name: 'MgSO₄ (i_theor = 2)',
        points: [
          { x: 1.0, y: 1.21 },
          { x: 0.1, y: 1.53 },
          { x: 0.01, y: 1.82 },
          { x: 0.001, y: 2.00 }
        ],
        color: '#f59e0b'
      },
      {
        name: 'K₂SO₄ (i_theor = 3)',
        points: [
          { x: 1.0, y: 2.32 },
          { x: 0.1, y: 2.70 },
          { x: 0.01, y: 2.84 },
          { x: 0.001, y: 3.00 }
        ],
        color: '#f43f5e'
      }
    ],
    annotations: [
      {
        type: 'text',
        x: 0.5,
        y: 3.2,
        text: 'At infinite dilution (c → 0), i approaches exact theoretical integer'
      }
    ]
  }
};
