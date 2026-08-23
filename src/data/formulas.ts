import { FormulaConfig } from '../types/formula';

export const formulasData: Record<string, FormulaConfig> = {
  'mass-percentage': {
    id: 'mass-percentage',
    title: 'Mass Percentage (w/w)',
    formula: '\\text{Mass } \\% = \\frac{w_2}{w_1 + w_2} \\times 100',
    variables: {
      w2: {
        label: 'Mass of Solute',
        symbol: 'w_2',
        unit: 'g',
        min: 0.1,
        max: 100,
        step: 0.1,
        default: 10,
        description: 'Mass of the solute in grams'
      },
      w1: {
        label: 'Mass of Solvent',
        symbol: 'w_1',
        unit: 'g',
        min: 0.1,
        max: 500,
        step: 0.1,
        default: 90,
        description: 'Mass of the solvent in grams'
      }
    },
    result: {
      label: 'Mass Percentage',
      symbol: '\\text{Mass } \\%',
      unit: '%',
      formula: '(w2 / (w1 + w2)) * 100'
    },
    keyInsights: [
      'Mass percentage is temperature independent since mass does not change with temperature.',
      'Commonly used in industrial chemical applications (e.g. 3.62% sodium hypochlorite in bleach).'
    ]
  },

  'volume-percentage': {
    id: 'volume-percentage',
    title: 'Volume Percentage (V/V)',
    formula: '\\text{Volume } \\% = \\frac{V_2}{V_1 + V_2} \\times 100',
    variables: {
      V2: {
        label: 'Volume of Solute',
        symbol: 'V_2',
        unit: 'mL',
        min: 0.1,
        max: 100,
        step: 0.1,
        default: 35,
        description: 'Volume of the liquid solute in mL'
      },
      V1: {
        label: 'Volume of Solvent',
        symbol: 'V_1',
        unit: 'mL',
        min: 1,
        max: 500,
        step: 1,
        default: 65,
        description: 'Volume of the liquid solvent in mL'
      }
    },
    result: {
      label: 'Volume Percentage',
      symbol: '\\text{Volume } \\%',
      unit: '%',
      formula: '(V2 / (V1 + V2)) * 100'
    },
    keyInsights: [
      '35% (V/V) solution of ethylene glycol is used as an antifreeze in car engines in cold climates.',
      'Lowers the freezing point of water to 255.4 K (-17.6°C).'
    ]
  },

  'mass-by-volume': {
    id: 'mass-by-volume',
    title: 'Mass by Volume Percentage (w/V)',
    formula: '\\text{Mass by Volume } \\% = \\frac{w_2}{V_{\\text{solution}}} \\times 100',
    variables: {
      w2: {
        label: 'Mass of Solute',
        symbol: 'w_2',
        unit: 'g',
        min: 0.1,
        max: 50,
        step: 0.1,
        default: 5,
        description: 'Mass of solute dissolved'
      },
      V: {
        label: 'Total Volume of Solution',
        symbol: 'V',
        unit: 'mL',
        min: 10,
        max: 1000,
        step: 10,
        default: 100,
        description: 'Total final volume in mL'
      }
    },
    result: {
      label: 'Mass by Volume',
      symbol: '\\% (w/V)',
      unit: '%',
      formula: '(w2 / V) * 100'
    },
    keyInsights: [
      'Commonly used in medicine and pharmacy (e.g. 0.9% w/V saline solution is isotonic with blood).'
    ]
  },

  'parts-per-million': {
    id: 'parts-per-million',
    title: 'Parts Per Million (ppm)',
    formula: '\\text{ppm} = \\frac{w_{\\text{solute}}}{w_{\\text{total}}} \\times 10^6',
    variables: {
      w_solute: {
        label: 'Mass of Solute',
        symbol: 'w_2',
        unit: 'g',
        min: 0.0001,
        max: 1,
        step: 0.0001,
        default: 0.006,
        description: 'Mass of trace solute component'
      },
      w_total: {
        label: 'Total Mass of Solution',
        symbol: 'w_{\\text{total}}',
        unit: 'g',
        min: 100,
        max: 10000,
        step: 100,
        default: 1000,
        description: 'Total mass of sample (e.g., 1 L water ≈ 1000 g)'
      }
    },
    result: {
      label: 'Concentration in ppm',
      symbol: '\\text{ppm}',
      unit: 'ppm',
      formula: '(w_solute / w_total) * 1000000'
    },
    keyInsights: [
      'Used when a solute is present in trace quantities (water pollutants, atmospheric contamination, fluoride in drinking water).'
    ]
  },

  'mole-fraction': {
    id: 'mole-fraction',
    title: 'Mole Fraction (x)',
    formula: 'x_A = \\frac{n_A}{n_A + n_B}',
    variables: {
      nA: {
        label: 'Moles of Component A',
        symbol: 'n_A',
        unit: 'mol',
        min: 0.01,
        max: 10,
        step: 0.01,
        default: 0.322,
        description: 'Number of moles of component A (e.g., glycol)'
      },
      nB: {
        label: 'Moles of Component B',
        symbol: 'n_B',
        unit: 'mol',
        min: 0.01,
        max: 10,
        step: 0.01,
        default: 4.444,
        description: 'Number of moles of component B (e.g., water)'
      }
    },
    result: {
      label: 'Mole Fraction of A',
      symbol: 'x_A',
      unit: '',
      formula: 'nA / (nA + nB)'
    },
    keyInsights: [
      'Mole fraction is unitless and temperature independent.',
      'Sum of mole fractions of all components equals 1: x_A + x_B = 1.'
    ]
  },

  'molarity': {
    id: 'molarity',
    title: 'Molarity (M)',
    formula: 'M = \\frac{n}{V} = \\frac{w_2 \\times 1000}{M_2 \\times V_{(\\text{mL})}}',
    variables: {
      n: {
        label: 'Moles of Solute',
        symbol: 'n',
        unit: 'mol',
        min: 0.01,
        max: 5,
        step: 0.005,
        default: 0.125,
        description: 'Number of moles of solute'
      },
      V: {
        label: 'Volume of Solution',
        symbol: 'V',
        unit: 'L',
        min: 0.05,
        max: 5,
        step: 0.01,
        default: 0.45,
        description: 'Volume of solution in litres'
      }
    },
    result: {
      label: 'Molarity',
      symbol: 'M',
      unit: 'mol L⁻¹',
      formula: 'n / V'
    },
    keyInsights: [
      'Molarity changes with temperature because the volume of liquid expands or contracts with temperature changes.'
    ]
  },

  'molality': {
    id: 'molality',
    title: 'Molality (m)',
    formula: 'm = \\frac{n}{W} = \\frac{w_2 \\times 1000}{M_2 \\times w_1_{(\\text{g})}}',
    variables: {
      n: {
        label: 'Moles of Solute',
        symbol: 'n',
        unit: 'mol',
        min: 0.001,
        max: 5,
        step: 0.001,
        default: 0.0417,
        description: 'Number of moles of solute'
      },
      W: {
        label: 'Mass of Solvent',
        symbol: 'W',
        unit: 'kg',
        min: 0.01,
        max: 5,
        step: 0.005,
        default: 0.075,
        description: 'Mass of solvent in kilograms'
      }
    },
    result: {
      label: 'Molality',
      symbol: 'm',
      unit: 'mol kg⁻¹',
      formula: 'n / W'
    },
    keyInsights: [
      'Molality is temperature independent because mass does not change with temperature.',
      'Preferred over molarity in studying colligative properties.'
    ]
  },

  'henrys-law': {
    id: 'henrys-law',
    title: "Henry's Law for Gas Solubility",
    formula: 'p = K_H \\times x',
    variables: {
      K_H: {
        label: "Henry's Constant (K_H)",
        symbol: 'K_H',
        unit: 'bar',
        min: 1,
        max: 1000,
        step: 1,
        default: 76.48,
        description: "Henry's law constant (depends on gas & temperature)"
      },
      x: {
        label: 'Mole Fraction of Gas in Liquid',
        symbol: 'x',
        unit: '',
        min: 0.000001,
        max: 0.05,
        step: 0.000001,
        default: 0.0000129,
        description: 'Mole fraction of dissolved gas'
      }
    },
    result: {
      label: 'Partial Pressure of Gas',
      symbol: 'p',
      unit: 'bar',
      formula: 'K_H * x'
    },
    keyInsights: [
      'Higher K_H at a given pressure indicates lower solubility of the gas in the liquid.',
      'K_H increases with temperature, which is why aquatic species feel more comfortable in cold water (higher dissolved O₂).'
    ]
  },

  'raoults-law': {
    id: 'raoults-law',
    title: "Raoult's Law (Single Component)",
    formula: 'p_1 = p_1^0 \\times x_1',
    variables: {
      p1_0: {
        label: 'Vapour Pressure of Pure Component 1',
        symbol: 'p_1^0',
        unit: 'mm Hg',
        min: 10,
        max: 1000,
        step: 5,
        default: 200,
        description: 'Vapour pressure of pure volatile liquid 1'
      },
      x1: {
        label: 'Mole Fraction of Component 1',
        symbol: 'x_1',
        unit: '',
        min: 0,
        max: 1,
        step: 0.01,
        default: 0.312,
        description: 'Mole fraction of component 1 in liquid phase'
      }
    },
    result: {
      label: 'Partial Vapour Pressure',
      symbol: 'p_1',
      unit: 'mm Hg',
      formula: 'p1_0 * x1'
    },
    keyInsights: [
      'Partial vapour pressure of any volatile component is directly proportional to its mole fraction in solution.'
    ]
  },

  'total-vapour-pressure': {
    id: 'total-vapour-pressure',
    title: "Total Vapour Pressure of Binary Solution",
    formula: 'p_{\\text{total}} = p_1 + p_2 = x_1 p_1^0 + x_2 p_2^0 = p_2^0 + (p_1^0 - p_2^0)x_1',
    variables: {
      x1: {
        label: 'Mole Fraction of Component 1 (x₁)',
        symbol: 'x_1',
        unit: '',
        min: 0,
        max: 1,
        step: 0.01,
        default: 0.688,
        description: 'Mole fraction of component 1 (e.g. CH₂Cl₂)'
      },
      p1_0: {
        label: 'Pure Vapour Pressure p₁⁰',
        symbol: 'p_1^0',
        unit: 'mm Hg',
        min: 10,
        max: 1000,
        step: 5,
        default: 415,
        description: 'Pure vapour pressure of component 1'
      },
      p2_0: {
        label: 'Pure Vapour Pressure p₂⁰',
        symbol: 'p_2^0',
        unit: 'mm Hg',
        min: 10,
        max: 1000,
        step: 5,
        default: 200,
        description: 'Pure vapour pressure of component 2 (e.g. CHCl₃)'
      }
    },
    result: {
      label: 'Total Vapour Pressure',
      symbol: 'p_{\\text{total}}',
      unit: 'mm Hg',
      formula: 'x1 * p1_0 + (1 - x1) * p2_0'
    },
    keyInsights: [
      'Total vapour pressure varies linearly between p₂⁰ (at x₁=0) and p₁⁰ (at x₁=1).'
    ]
  },

  'elevation-boiling-point': {
    id: 'elevation-boiling-point',
    title: 'Elevation of Boiling Point (ΔT_b)',
    formula: '\\Delta T_b = i \\times K_b \\times m = i \\times \\frac{K_b \\times w_2 \\times 1000}{M_2 \\times w_1}',
    variables: {
      i: {
        label: "van't Hoff Factor",
        symbol: 'i',
        unit: '',
        min: 0.5,
        max: 4,
        step: 0.1,
        default: 1,
        description: 'van\'t Hoff factor (1 for non-electrolytes like glucose/urea)'
      },
      K_b: {
        label: 'Ebullioscopic Constant (K_b)',
        symbol: 'K_b',
        unit: 'K kg mol⁻¹',
        min: 0.1,
        max: 5,
        step: 0.01,
        default: 0.52,
        description: 'Molal boiling point elevation constant (0.52 for water)'
      },
      m: {
        label: 'Molality of Solution',
        symbol: 'm',
        unit: 'mol kg⁻¹',
        min: 0.01,
        max: 5,
        step: 0.01,
        default: 0.1,
        description: 'Molality of the dissolved solute'
      }
    },
    result: {
      label: 'Boiling Point Elevation',
      symbol: '\\Delta T_b',
      unit: 'K',
      formula: 'i * K_b * m'
    },
    keyInsights: [
      'Boiling occurs when vapour pressure equals atmospheric pressure (1.013 bar). Non-volatile solute lowers vapour pressure, elevating boiling point.'
    ]
  },

  'depression-freezing-point': {
    id: 'depression-freezing-point',
    title: 'Depression of Freezing Point (ΔT_f)',
    formula: '\\Delta T_f = i \\times K_f \\times m = i \\times \\frac{K_f \\times w_2 \\times 1000}{M_2 \\times w_1}',
    variables: {
      i: {
        label: "van't Hoff Factor",
        symbol: 'i',
        unit: '',
        min: 0.5,
        max: 4,
        step: 0.1,
        default: 1,
        description: 'van\'t Hoff factor'
      },
      K_f: {
        label: 'Cryoscopic Constant (K_f)',
        symbol: 'K_f',
        unit: 'K kg mol⁻¹',
        min: 0.1,
        max: 10,
        step: 0.01,
        default: 1.86,
        description: 'Molal freezing point depression constant (1.86 for water)'
      },
      m: {
        label: 'Molality of Solution',
        symbol: 'm',
        unit: 'mol kg⁻¹',
        min: 0.01,
        max: 5,
        step: 0.01,
        default: 1.2,
        description: 'Molality of the solute'
      }
    },
    result: {
      label: 'Freezing Point Depression',
      symbol: '\\Delta T_f',
      unit: 'K',
      formula: 'i * K_f * m'
    },
    keyInsights: [
      'Freezing point is the temperature at which vapour pressure of substance in liquid phase is equal to its vapour pressure in solid phase.'
    ]
  },

  'osmotic-pressure': {
    id: 'osmotic-pressure',
    title: 'Osmotic Pressure (Π)',
    formula: '\\Pi = i \\times C \\times R \\times T = i \\times \\frac{w_2 \\times R \\times T}{M_2 \\times V}',
    variables: {
      i: {
        label: "van't Hoff Factor",
        symbol: 'i',
        unit: '',
        min: 0.5,
        max: 4,
        step: 0.1,
        default: 1,
        description: 'van\'t Hoff factor'
      },
      C: {
        label: 'Molar Concentration',
        symbol: 'C',
        unit: 'mol L⁻¹',
        min: 0.001,
        max: 2,
        step: 0.001,
        default: 0.025,
        description: 'Molarity of the solute'
      },
      T: {
        label: 'Absolute Temperature',
        symbol: 'T',
        unit: 'K',
        min: 273,
        max: 373,
        step: 1,
        default: 300,
        description: 'Temperature in Kelvin (R = 0.083 L bar mol⁻¹ K⁻¹)'
      }
    },
    result: {
      label: 'Osmotic Pressure',
      symbol: '\\Pi',
      unit: 'bar',
      formula: 'i * C * 0.083 * T'
    },
    keyInsights: [
      'Osmotic pressure is widely used for determining molar masses of polymers, proteins, and biomolecules because measurements are at room temperature and molarity is used instead of molality.'
    ]
  },

  'molar-mass-freezing': {
    id: 'molar-mass-freezing',
    title: 'Molar Mass from Freezing Point Depression',
    formula: 'M_2 = \\frac{K_f \\times w_2 \\times 1000}{\\Delta T_f \\times w_1}',
    variables: {
      K_f: {
        label: 'Cryoscopic Constant (K_f)',
        symbol: 'K_f',
        unit: 'K kg mol⁻¹',
        min: 0.1,
        max: 10,
        step: 0.1,
        default: 5.12,
        description: 'Freezing point depression constant (e.g. 5.12 for benzene)'
      },
      w2: {
        label: 'Mass of Solute',
        symbol: 'w_2',
        unit: 'g',
        min: 0.1,
        max: 20,
        step: 0.1,
        default: 1.00,
        description: 'Mass of non-electrolyte solute'
      },
      w1: {
        label: 'Mass of Solvent',
        symbol: 'w_1',
        unit: 'g',
        min: 1,
        max: 500,
        step: 1,
        default: 50,
        description: 'Mass of solvent in grams'
      },
      Delta_T_f: {
        label: 'Freezing Point Depression',
        symbol: '\\Delta T_f',
        unit: 'K',
        min: 0.01,
        max: 10,
        step: 0.01,
        default: 0.40,
        description: 'Observed depression in freezing point'
      }
    },
    result: {
      label: 'Molar Mass of Solute',
      symbol: 'M_2',
      unit: 'g mol⁻¹',
      formula: 'K_f * w2 * 1000 / (Delta_T_f * w1)'
    },
    keyInsights: [
      'Direct rearrangement of ΔT_f = K_f × (w₂/M₂) / (w₁/1000).'
    ]
  },

  'molar-mass-osmosis': {
    id: 'molar-mass-osmosis',
    title: 'Molar Mass from Osmotic Pressure',
    formula: 'M_2 = \\frac{w_2 \\times R \\times T}{\\Pi \\times V}',
    variables: {
      w2: {
        label: 'Mass of Solute',
        symbol: 'w_2',
        unit: 'g',
        min: 0.1,
        max: 20,
        step: 0.01,
        default: 1.26,
        description: 'Mass of macromolecule/protein in grams'
      },
      T: {
        label: 'Temperature',
        symbol: 'T',
        unit: 'K',
        min: 273,
        max: 373,
        step: 1,
        default: 300,
        description: 'Absolute temperature'
      },
      Pi: {
        label: 'Osmotic Pressure',
        symbol: '\\Pi',
        unit: 'bar',
        min: 0.0001,
        max: 1,
        step: 0.0001,
        default: 0.00257,
        description: 'Osmotic pressure in bar (R = 0.083 L bar mol⁻¹ K⁻¹)'
      },
      V: {
        label: 'Volume of Solution',
        symbol: 'V',
        unit: 'L',
        min: 0.01,
        max: 2,
        step: 0.01,
        default: 0.200,
        description: 'Volume in litres'
      }
    },
    result: {
      label: 'Molar Mass of Solute',
      symbol: 'M_2',
      unit: 'g mol⁻¹',
      formula: 'w2 * 0.083 * T / (Pi * V)'
    },
    keyInsights: [
      'Provides accurate molecular mass determinations for heavy molecules where ΔT_b and ΔT_f would be too small to measure.'
    ]
  },

  'vanthoff-factor': {
    id: 'vanthoff-factor',
    title: "van't Hoff Factor (i)",
    formula: 'i = \\frac{\\text{Normal Molar Mass}}{\\text{Abnormal Molar Mass}} = \\frac{\\text{Observed Colligative Property}}{\\text{Calculated Colligative Property}} = \\frac{\\text{Total Moles after Dissociation/Association}}{\\text{Initial Moles}}',
    variables: {
      observed: {
        label: 'Observed Colligative Property',
        symbol: '\\text{Observed}',
        unit: '',
        min: 0.001,
        max: 10,
        step: 0.001,
        default: 0.0205,
        description: 'Experimentally measured colligative value'
      },
      calculated: {
        label: 'Calculated Colligative Property',
        symbol: '\\text{Calculated}',
        unit: '',
        min: 0.001,
        max: 10,
        step: 0.001,
        default: 0.0197,
        description: 'Theoretical value without association/dissociation'
      }
    },
    result: {
      label: "van't Hoff Factor",
      symbol: 'i',
      unit: '',
      formula: 'observed / calculated'
    },
    keyInsights: [
      'For dissociation (e.g. NaCl, CaCl₂), i > 1.',
      'For association (e.g. Benzoic acid in benzene dimer), i < 1.',
      'For non-electrolytes (glucose, sucrose, urea), i = 1.'
    ]
  }
};
