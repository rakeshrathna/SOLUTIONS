import { QuestionConfig } from '../types/question';

export const questionsData: Record<string, QuestionConfig> = {
  'mcq-1': {
    id: 'mcq-1',
    type: 'MCQ',
    difficulty: 'BEGINNER',
    topic: 'Introduction to Solutions',
    question: 'Which of the following is NOT a characteristic of a true solution?',
    options: [
      'It is a homogeneous mixture',
      'It has uniform composition throughout',
      'It contains two or more components',
      'It always contains a liquid as the solvent'
    ],
    correctAnswer: 3,
    explanation: 'Solutions can be gaseous (air), liquid (saline), or solid (alloys like brass). The solvent determines the physical state, so a solution does NOT always have to contain a liquid solvent.',
    marks: 1,
    hints: ['Think of solid brass (Cu + Zn) or gaseous air (N₂ + O₂).']
  },

  'mcq-2': {
    id: 'mcq-2',
    type: 'MCQ',
    difficulty: 'BEGINNER',
    topic: 'Concentration of Solutions',
    question: 'What is the molarity of a solution containing 4 g of NaOH (molar mass = 40 g mol⁻¹) in 500 mL of solution?',
    options: [
      '0.2 M',
      '0.4 M',
      '0.8 M',
      '0.1 M'
    ],
    correctAnswer: 0,
    explanation: 'Moles of NaOH = 4 / 40 = 0.1 mol. Volume in litres = 500 / 1000 = 0.5 L. Molarity M = n / V = 0.1 / 0.5 = 0.2 M (mol L⁻¹).',
    marks: 1,
    hints: ['Find moles of NaOH first: mass / molar mass, then divide by volume in litres.']
  },

  'mcq-3': {
    id: 'mcq-3',
    type: 'MCQ',
    difficulty: 'BEGINNER',
    topic: "Henry's Law",
    question: "According to Henry's law, the solubility of a gas in a liquid at a given temperature is:",
    options: [
      'Directly proportional to the partial pressure of the gas above the liquid',
      'Inversely proportional to the partial pressure of the gas',
      'Independent of the pressure',
      'Directly proportional to the temperature'
    ],
    correctAnswer: 0,
    explanation: "Henry's law states: p = K_H · x. The partial pressure of the gas in vapour phase (p) is directly proportional to the mole fraction (x) of the gas in the solution.",
    marks: 1
  },

  'mcq-4': {
    id: 'mcq-4',
    type: 'MCQ',
    difficulty: 'BEGINNER',
    topic: "Raoult's Law",
    question: "Raoult's law states that for a solution of volatile liquids, the partial vapour pressure of each component is:",
    options: [
      'Directly proportional to its mole fraction in solution',
      'Inversely proportional to its mole fraction',
      'Equal to the vapour pressure of pure solvent',
      'Independent of its mole fraction'
    ],
    correctAnswer: 0,
    explanation: "Raoult's law: p₁ = p₁⁰ · x₁. The partial vapour pressure of any volatile component is directly proportional to its mole fraction in liquid solution.",
    marks: 1
  },

  'mcq-5': {
    id: 'mcq-5',
    type: 'MCQ',
    difficulty: 'BEGINNER',
    topic: 'Non-Ideal Solutions',
    question: "A mixture of ethanol and acetone exhibits positive deviation from Raoult's law because:",
    options: [
      'Ethanol-acetone intermolecular attractions are weaker than ethanol-ethanol hydrogen bonds',
      'Ethanol-acetone attractions are stronger than ethanol-ethanol interactions',
      'Ethanol and acetone are both non-polar',
      'Ethanol and acetone form strong intermolecular hydrogen bonds with each other'
    ],
    correctAnswer: 0,
    explanation: "Pure ethanol has strong intermolecular hydrogen bonding. Adding acetone introduces molecules between ethanol molecules, breaking some H-bonds and weakening interactions (A-B < A-A), causing escaping tendency to increase (positive deviation).",
    marks: 1
  },

  'mcq-6': {
    id: 'mcq-6',
    type: 'MCQ',
    difficulty: 'BEGINNER',
    topic: 'Colligative Properties',
    question: 'Which of the following physical properties is NOT a colligative property?',
    options: [
      'Relative lowering of vapour pressure',
      'Elevation of boiling point',
      'Depression of freezing point',
      'Viscosity'
    ],
    correctAnswer: 3,
    explanation: 'Colligative properties depend solely on the total number of solute particles relative to the total particles, irrespective of their chemical nature. Viscosity depends on molecular structure and intermolecular forces.',
    marks: 1
  },

  'mcq-7': {
    id: 'mcq-7',
    type: 'MCQ',
    difficulty: 'BEGINNER',
    topic: 'Osmotic Pressure',
    question: 'What is the osmotic pressure of a 0.1 M non-electrolyte solution at 300 K? (R = 0.083 L bar mol⁻¹ K⁻¹)',
    options: [
      '2.49 bar',
      '24.9 bar',
      '0.249 bar',
      '3.60 bar'
    ],
    correctAnswer: 0,
    explanation: 'Π = C · R · T = 0.1 mol L⁻¹ × 0.083 L bar mol⁻¹ K⁻¹ × 300 K = 2.49 bar.',
    marks: 1
  },

  'mcq-8': {
    id: 'mcq-8',
    type: 'MCQ',
    difficulty: 'BEGINNER',
    topic: 'Abnormal Molar Mass',
    question: "The van't Hoff factor (i) for an electrolyte solute that dissociates in water is always:",
    options: [
      'Greater than 1 (i > 1)',
      'Less than 1 (i < 1)',
      'Equal to 1 (i = 1)',
      'Equal to 0 (i = 0)'
    ],
    correctAnswer: 0,
    explanation: "Dissociation breaks 1 solute molecule into 2 or more ions, increasing the total particle count in solution. Therefore, i = (Total particles after dissociation)/(Initial particles) > 1.",
    marks: 1
  },

  'mcq-9': {
    id: 'mcq-9',
    type: 'MCQ',
    difficulty: 'BEGINNER',
    topic: 'Solubility',
    question: 'The solubility of gases in liquids generally decreases as temperature increases because:',
    options: [
      'Gas dissolution in liquids is an exothermic process (ΔH_sol < 0)',
      'Gas dissolution in liquids is an endothermic process (ΔH_sol > 0)',
      'Gas molecules become heavier at higher temperature',
      'Atmospheric pressure decreases'
    ],
    correctAnswer: 0,
    explanation: "Gas + Liquid ⇌ Solution + Heat (Exothermic, ΔH < 0). By Le Chatelier's principle, supplying heat (increasing temperature) shifts equilibrium to the left, decreasing gas solubility.",
    marks: 1
  },

  'mcq-10': {
    id: 'mcq-10',
    type: 'MCQ',
    difficulty: 'BEGINNER',
    topic: 'Concentration of Solutions',
    question: 'Which of the following concentration units remains completely INDEPENDENT of temperature changes?',
    options: [
      'Molarity',
      'Molality',
      'Mass by volume percentage (w/V)',
      'Normality'
    ],
    correctAnswer: 1,
    explanation: 'Molality (m = moles of solute / mass of solvent in kg) and Mole Fraction depend only on mass, which does not expand or contract with temperature.',
    marks: 1
  },

  'mcq-11': {
    id: 'mcq-11',
    type: 'MCQ',
    difficulty: 'BEGINNER',
    topic: 'Non-Ideal Solutions',
    question: 'An azeotropic mixture is defined as a binary solution that:',
    options: [
      'Boils at a constant temperature and has the identical composition in liquid and vapour phases',
      'Can be readily separated completely by fractional distillation',
      'Obeys Raoult\'s law across all concentrations',
      'Has zero vapour pressure at standard temperature'
    ],
    correctAnswer: 0,
    explanation: 'Azeotropes are constant-boiling mixtures with identical vapour and liquid compositions (y₁ = x₁), meaning fractional distillation cannot further separate them.',
    marks: 1
  },

  'mcq-12': {
    id: 'mcq-12',
    type: 'MCQ',
    difficulty: 'INTERMEDIATE',
    topic: 'Colligative Properties',
    question: 'According to Raoult\'s law for a solution containing a non-volatile solute, the relative lowering of vapour pressure (p₁⁰ - p₁)/p₁⁰ is equal to:',
    options: [
      'Mole fraction of solute (x₂)',
      'Mole fraction of solvent (x₁)',
      'Mass percentage of solute',
      'Molality of solution'
    ],
    correctAnswer: 0,
    explanation: 'p₁ = p₁⁰ · x₁ = p₁⁰(1 - x₂). Therefore, (p₁⁰ - p₁)/p₁⁰ = x₂ (the mole fraction of non-volatile solute).',
    marks: 1
  },

  'mcq-13': {
    id: 'mcq-13',
    type: 'MCQ',
    difficulty: 'INTERMEDIATE',
    topic: 'Colligative Properties',
    question: 'Which of the following 0.10 m aqueous solutions will have the LOWEST freezing point? (Assuming complete ionization)',
    options: [
      '0.10 m NaCl',
      '0.10 m Glucose (C₆H₁₂O₆)',
      '0.10 m Al₂(SO₄)₃',
      '0.10 m K₂SO₄'
    ],
    correctAnswer: 2,
    explanation: 'ΔT_f = i · K_f · m. Al₂(SO₄)₃ produces 2 Al³⁺ + 3 SO₄²⁻ = 5 ions (i = 5). Total effective molality = 5 × 0.1 = 0.50 m, giving the largest freezing depression and therefore the lowest freezing point.',
    marks: 1
  },

  'mcq-14': {
    id: 'mcq-14',
    type: 'MCQ',
    difficulty: 'INTERMEDIATE',
    topic: 'Osmotic Pressure',
    question: 'A 0.9% (mass/volume) NaCl solution is isotonic with human red blood cells. If RBCs are placed in a 1.5% NaCl solution:',
    options: [
      'Water will flow OUT of the cells and they will shrink (crenate)',
      'Water will flow INTO the cells and they will swell and burst',
      'No net movement of water occurs',
      'NaCl will flow into the cells causing them to expand'
    ],
    correctAnswer: 0,
    explanation: '1.5% NaCl is hypertonic relative to the RBC interior (0.9%). Water exits the cells via osmosis into the more concentrated external fluid, causing the cells to shrink.',
    marks: 1
  },

  'mcq-15': {
    id: 'mcq-15',
    type: 'MCQ',
    difficulty: 'INTERMEDIATE',
    topic: 'Osmotic Pressure',
    question: 'In reverse osmosis for seawater desalination, flow of pure water through the semipermeable membrane occurs when:',
    options: [
      'External pressure GREATER than the osmotic pressure is applied to the seawater side',
      'External pressure LOWER than the osmotic pressure is applied to the freshwater side',
      'Temperature of seawater is reduced below 0°C',
      'Seawater is exposed to ultraviolet light'
    ],
    correctAnswer: 0,
    explanation: 'When external pressure applied on the solution side exceeds its osmotic pressure (p > Π), the chemical potential of solvent in solution exceeds pure solvent, forcing pure solvent molecules backward across the membrane.',
    marks: 1
  },

  'mcq-16': {
    id: 'mcq-16',
    type: 'MCQ',
    difficulty: 'INTERMEDIATE',
    topic: 'Abnormal Molar Mass',
    question: 'Benzoic acid (C₆H₅COOH) dissolved in benzene exhibits an experimental molar mass of nearly 242 g mol⁻¹ (expected 122 g mol⁻¹) because:',
    options: [
      'It associates into dimers via intermolecular hydrogen bonding',
      'It completely dissociates into ions',
      'Benzene reacts covalently with benzoic acid',
      'Benzoic acid undergoes polymer decomposition'
    ],
    correctAnswer: 0,
    explanation: 'In non-polar solvents like benzene, benzoic acid molecules associate in pairs (2 C₆H₅COOH ⇌ (C₆H₅COOH)₂) through double hydrogen bonds, halving the number of particles (i ≈ 0.5) and doubling the apparent molar mass.',
    marks: 1
  },

  'mcq-17': {
    id: 'mcq-17',
    type: 'MCQ',
    difficulty: 'BEGINNER',
    topic: 'Colligative Properties',
    question: 'The SI / standard unit of the molal boiling point elevation constant (ebullioscopic constant, K_b) is:',
    options: [
      'K kg mol⁻¹',
      'K mol kg⁻¹',
      'K g mol⁻¹',
      'K mol g⁻¹'
    ],
    correctAnswer: 0,
    explanation: 'K_b = ΔT_b / m. Since ΔT_b is in Kelvin (K) and molality m is in mol kg⁻¹, K_b = K / (mol kg⁻¹) = K kg mol⁻¹.',
    marks: 1
  },

  'mcq-18': {
    id: 'mcq-18',
    type: 'MCQ',
    difficulty: 'BEGINNER',
    topic: 'Colligative Properties',
    question: 'The cryoscopic constant (K_f) for pure water is equal to:',
    options: [
      '1.86 K kg mol⁻¹',
      '0.52 K kg mol⁻¹',
      '5.12 K kg mol⁻¹',
      '2.53 K kg mol⁻¹'
    ],
    correctAnswer: 0,
    explanation: 'K_f for water is 1.86 K kg mol⁻¹, whereas its K_b is 0.52 K kg mol⁻¹.',
    marks: 1
  },

  'mcq-19': {
    id: 'mcq-19',
    type: 'MCQ',
    difficulty: 'BEGINNER',
    topic: 'Ideal Solutions',
    question: 'Which of the following pairs of liquids forms a nearly IDEAL solution conforming to Raoult\'s law across all concentrations?',
    options: [
      'Benzene + Toluene',
      'Ethanol + Acetone',
      'Chloroform + Acetone',
      'Phenol + Aniline'
    ],
    correctAnswer: 0,
    explanation: 'Benzene and Toluene have nearly identical molecular structures, sizes, and London dispersion forces, so A-B interactions are virtually identical to A-A and B-B interactions (ΔmixH = 0, ΔmixV = 0).',
    marks: 1
  },

  'mcq-20': {
    id: 'mcq-20',
    type: 'MCQ',
    difficulty: 'BEGINNER',
    topic: 'Concentration of Solutions',
    question: '1 part per million (1 ppm) by mass is equivalent to a mass fraction of:',
    options: [
      '10⁻⁶',
      '10⁻⁴',
      '10⁻³',
      '10⁻²'
    ],
    correctAnswer: 0,
    explanation: 'ppm = (Mass of component / Total mass) × 10⁶. Therefore 1 ppm represents 1 unit per 10⁶ units = 10⁻⁶.',
    marks: 1
  },

  // Numerical Questions (10)
  'num-1': {
    id: 'num-1',
    type: 'NUMERICAL',
    difficulty: 'BEGINNER',
    topic: 'Concentration of Solutions',
    question: 'Calculate the molarity of a solution containing 5 g of NaOH dissolved in 450 mL of solution. (Molar mass of NaOH = 40 g mol⁻¹)',
    given: [
      'Mass of solute (NaOH) w₂ = 5 g',
      'Molar mass of NaOH M₂ = 40 g mol⁻¹',
      'Volume of solution V = 450 mL = 0.450 L'
    ],
    required: 'Molarity (M)',
    steps: [
      'Moles of NaOH n = w₂ / M₂ = 5 / 40 = 0.125 mol',
      'Volume in litres V = 450 / 1000 = 0.450 L',
      'Molarity M = n / V = 0.125 / 0.450 = 0.278 mol L⁻¹ (or 0.278 M)'
    ],
    answer: '0.278 M',
    correctAnswer: '0.278',
    tolerance: 0.01,
    explanation: 'Applying M = (w₂ × 1000)/(M₂ × V_mL) = (5 × 1000)/(40 × 450) = 5000/18000 = 0.278 M.',
    marks: 3
  },

  'num-2': {
    id: 'num-2',
    type: 'NUMERICAL',
    difficulty: 'BEGINNER',
    topic: 'Concentration of Solutions',
    question: 'Calculate the mole fraction of ethylene glycol (C₂H₆O₂) in an aqueous solution containing 20% of C₂H₆O₂ by mass.',
    given: [
      '20% by mass = 20 g C₂H₆O₂ in 100 g solution',
      'Mass of solvent (water) = 100 - 20 = 80 g',
      'Molar mass C₂H₆O₂ = 62 g mol⁻¹',
      'Molar mass H₂O = 18 g mol⁻¹'
    ],
    required: 'Mole fraction of ethylene glycol (x_glycol)',
    steps: [
      'Moles of ethylene glycol n_glycol = 20 / 62 = 0.322 mol',
      'Moles of water n_water = 80 / 18 = 4.444 mol',
      'Total moles = 0.322 + 4.444 = 4.766 mol',
      'x_glycol = n_glycol / (n_glycol + n_water) = 0.322 / 4.766 = 0.068'
    ],
    answer: '0.068',
    correctAnswer: '0.068',
    tolerance: 0.003,
    explanation: 'x_glycol = 0.322 / (0.322 + 4.444) = 0.068. (Mole fraction of water = 1 - 0.068 = 0.932).',
    marks: 3
  },

  'num-3': {
    id: 'num-3',
    type: 'NUMERICAL',
    difficulty: 'INTERMEDIATE',
    topic: "Henry's Law",
    question: 'If N₂ gas is bubbled through water at 293 K, how many millimoles of N₂ gas would dissolve in 1 L of water? Given that partial pressure of N₂ is 0.987 bar and Henry\'s constant K_H for N₂ at 293 K is 76.48 kbar.',
    given: [
      'p(N₂) = 0.987 bar',
      'K_H = 76.48 kbar = 76,480 bar',
      '1 L of water = 1000 g ≈ 1000/18 = 55.5 mol of H₂O'
    ],
    required: 'Millimoles of dissolved N₂ gas in 1 L water',
    steps: [
      'x(N₂) = p / K_H = 0.987 / 76480 = 1.29 × 10⁻⁵',
      'Since n(N₂) << 55.5 mol, x(N₂) ≈ n(N₂) / 55.5',
      'n(N₂) = 1.29 × 10⁻⁵ × 55.5 = 7.16 × 10⁻⁴ mol',
      'Millimoles = 7.16 × 10⁻⁴ × 1000 = 0.716 mmol'
    ],
    answer: '0.716 mmol',
    correctAnswer: '0.716',
    tolerance: 0.02,
    explanation: 'Applying Henry\'s law x = p/K_H = 0.987/76480 = 1.29×10⁻⁵. In 55.5 moles of water, n = 1.29×10⁻⁵ × 55.5 = 0.716 mmol.',
    marks: 3
  },

  'num-4': {
    id: 'num-4',
    type: 'NUMERICAL',
    difficulty: 'INTERMEDIATE',
    topic: "Raoult's Law",
    question: 'Vapour pressure of chloroform (CHCl₃) and dichloromethane (CH₂Cl₂) at 298 K are 200 mm Hg and 415 mm Hg respectively. Calculate the total vapour pressure of the solution prepared by mixing 25.5 g of CHCl₃ and 40.0 g of CH₂Cl₂ at 298 K.',
    given: [
      'p°(CHCl₃) = 200 mm Hg, Molar mass CHCl₃ = 119.5 g mol⁻¹',
      'p°(CH₂Cl₂) = 415 mm Hg, Molar mass CH₂Cl₂ = 85.0 g mol⁻¹',
      'Mass CHCl₃ = 25.5 g, Mass CH₂Cl₂ = 40.0 g'
    ],
    required: 'Total vapour pressure of solution (p_total)',
    steps: [
      'Moles of CH₂Cl₂ = 40.0 / 85.0 = 0.470 mol',
      'Moles of CHCl₃ = 25.5 / 119.5 = 0.213 mol',
      'Total moles = 0.470 + 0.213 = 0.683 mol',
      'x(CH₂Cl₂) = 0.470 / 0.683 = 0.688, x(CHCl₃) = 0.213 / 0.683 = 0.312',
      'p₁ = 0.688 × 415 = 285.5 mm Hg',
      'p₂ = 0.312 × 200 = 62.4 mm Hg',
      'p_total = 285.5 + 62.4 = 347.9 mm Hg'
    ],
    answer: '347.9 mm Hg',
    correctAnswer: '347.9',
    tolerance: 1.0,
    explanation: 'p_total = x₁p₁° + x₂p₂° = (0.688 × 415) + (0.312 × 200) = 285.5 + 62.4 = 347.9 mm Hg.',
    marks: 3
  },

  'num-5': {
    id: 'num-5',
    type: 'NUMERICAL',
    difficulty: 'INTERMEDIATE',
    topic: 'Colligative Properties',
    question: '18 g of glucose (C₆H₁₂O₆) is dissolved in 1 kg of water in a saucepan. At what temperature will water boil at 1.013 bar? (K_b for water = 0.52 K kg mol⁻¹, Molar mass of glucose = 180 g mol⁻¹)',
    given: [
      'Mass of glucose w₂ = 18 g, M₂ = 180 g mol⁻¹',
      'Mass of water w₁ = 1 kg',
      'K_b for water = 0.52 K kg mol⁻¹',
      'Normal boiling point of pure water T_b° = 373.15 K'
    ],
    required: 'Boiling point of solution (T_b)',
    steps: [
      'Moles of glucose = 18 / 180 = 0.1 mol',
      'Molality m = 0.1 mol / 1 kg = 0.1 m',
      'ΔT_b = K_b × m = 0.52 × 0.1 = 0.052 K',
      'T_b = T_b° + ΔT_b = 373.15 + 0.052 = 373.202 K (or 100.052 °C)'
    ],
    answer: '373.202 K',
    correctAnswer: '373.202',
    tolerance: 0.02,
    explanation: 'ΔT_b = 0.52 × 0.1 = 0.052 K. Boiling point T_b = 373.15 + 0.052 = 373.202 K.',
    marks: 3
  },

  'num-6': {
    id: 'num-6',
    type: 'NUMERICAL',
    difficulty: 'INTERMEDIATE',
    topic: 'Colligative Properties',
    question: '45 g of ethylene glycol (C₂H₆O₂) is mixed with 600 g of water. Calculate the freezing point of the solution. (K_f for water = 1.86 K kg mol⁻¹, Molar mass C₂H₆O₂ = 62 g mol⁻¹)',
    given: [
      'Mass of ethylene glycol w₂ = 45 g, M₂ = 62 g mol⁻¹',
      'Mass of water w₁ = 600 g = 0.600 kg',
      'K_f for water = 1.86 K kg mol⁻¹',
      'Freezing point of pure water T_f° = 273.15 K'
    ],
    required: 'Freezing point of the solution (T_f)',
    steps: [
      'Moles of ethylene glycol = 45 / 62 = 0.726 mol',
      'Molality m = 0.726 / 0.600 = 1.21 mol kg⁻¹',
      'ΔT_f = K_f × m = 1.86 × 1.21 = 2.25 K',
      'T_f = T_f° - ΔT_f = 273.15 - 2.25 = 270.90 K (or -2.25 °C)'
    ],
    answer: '270.90 K',
    correctAnswer: '270.90',
    tolerance: 0.05,
    explanation: 'ΔT_f = 1.86 × (45/62) / 0.600 = 2.25 K. Freezing point = 273.15 - 2.25 = 270.90 K.',
    marks: 3
  },

  'num-7': {
    id: 'num-7',
    type: 'NUMERICAL',
    difficulty: 'INTERMEDIATE',
    topic: 'Colligative Properties',
    question: '1.00 g of a non-electrolyte solute dissolved in 50 g of benzene lowered the freezing point of benzene by 0.40 K. Find the molar mass of the solute. (K_f for benzene = 5.12 K kg mol⁻¹)',
    given: [
      'Mass of solute w₂ = 1.00 g',
      'Mass of benzene w₁ = 50 g',
      'ΔT_f = 0.40 K',
      'K_f = 5.12 K kg mol⁻¹'
    ],
    required: 'Molar mass of solute (M₂)',
    steps: [
      'M₂ = (K_f × w₂ × 1000) / (ΔT_f × w₁)',
      'M₂ = (5.12 × 1.00 × 1000) / (0.40 × 50)',
      'M₂ = 5120 / 20 = 256 g mol⁻¹'
    ],
    answer: '256 g mol⁻¹',
    correctAnswer: '256',
    tolerance: 1.0,
    explanation: 'M₂ = (5.12 × 1.00 × 1000)/(0.40 × 50) = 5120 / 20 = 256 g mol⁻¹.',
    marks: 3
  },

  'num-8': {
    id: 'num-8',
    type: 'NUMERICAL',
    difficulty: 'INTERMEDIATE',
    topic: 'Osmotic Pressure',
    question: '200 cm³ of an aqueous solution of a protein contains 1.26 g of the protein. The osmotic pressure of the solution at 300 K is found to be 2.57 × 10⁻³ bar. Calculate the molar mass of the protein. (R = 0.083 L bar mol⁻¹ K⁻¹)',
    given: [
      'Mass of protein w₂ = 1.26 g',
      'Volume V = 200 cm³ = 0.200 L',
      'Osmotic pressure Π = 2.57 × 10⁻³ bar',
      'Temperature T = 300 K',
      'R = 0.083 L bar mol⁻¹ K⁻¹'
    ],
    required: 'Molar mass of protein (M₂)',
    steps: [
      'M₂ = (w₂ × R × T) / (Π × V)',
      'M₂ = (1.26 × 0.083 × 300) / (2.57 × 10⁻³ × 0.200)',
      'Numerator = 31.374, Denominator = 5.14 × 10⁻⁴',
      'M₂ = 31.374 / (5.14 × 10⁻⁴) = 61,038 g mol⁻¹ ≈ 61,000 g mol⁻¹'
    ],
    answer: '61,038 g mol⁻¹',
    correctAnswer: '61038',
    tolerance: 200,
    explanation: 'M₂ = (1.26 × 0.083 × 300)/(2.57 × 10⁻³ × 0.200) = 61,038 g mol⁻¹.',
    marks: 3
  },

  'num-9': {
    id: 'num-9',
    type: 'NUMERICAL',
    difficulty: 'HARD',
    topic: 'Abnormal Molar Mass',
    question: '0.6 mL of acetic acid (CH₃COOH), having density 1.06 g mL⁻¹, is dissolved in 1 litre of water. The depression in freezing point observed was 0.0205 K. Calculate the van\'t Hoff factor (i) and the dissociation constant (K_a) of the acid. (K_f for water = 1.86 K kg mol⁻¹, Molar mass CH₃COOH = 60 g mol⁻¹)',
    given: [
      'Volume acetic acid = 0.6 mL, Density = 1.06 g mL⁻¹',
      'Mass acetic acid w₂ = 0.6 × 1.06 = 0.636 g',
      'Volume of water = 1 L ≈ 1 kg',
      'Observed ΔT_f = 0.0205 K, K_f = 1.86 K kg mol⁻¹'
    ],
    required: "van't Hoff factor (i) and dissociation constant (K_a)",
    steps: [
      'Moles of acetic acid = 0.636 / 60 = 0.0106 mol',
      'Molality m = 0.0106 mol / 1 kg = 0.0106 mol kg⁻¹',
      'Calculated ΔT_f = K_f × m = 1.86 × 0.0106 = 0.0197 K',
      'i = Observed ΔT_f / Calculated ΔT_f = 0.0205 / 0.0197 = 1.041',
      'Degree of dissociation α = i - 1 = 1.041 - 1 = 0.041',
      'K_a = Cα² / (1 - α) = 0.0106 × (0.041)² / (1 - 0.041) = 1.86 × 10⁻⁵'
    ],
    answer: 'i = 1.041, Ka = 1.86 × 10⁻⁵',
    correctAnswer: '1.041',
    tolerance: 0.01,
    explanation: 'i = 0.0205/0.0197 = 1.041. α = 0.041. K_a = Cα²/(1-α) = 1.86 × 10⁻⁵.',
    marks: 5
  },

  'num-10': {
    id: 'num-10',
    type: 'NUMERICAL',
    difficulty: 'HARD',
    topic: 'Abnormal Molar Mass',
    question: '2.0 g of benzoic acid (C₆H₅COOH) dissolved in 25.0 g of benzene shows a depression in freezing point equal to 1.62 K. Calculate the percentage association of the acid if it forms a dimer in solution. (K_f for benzene = 4.9 K kg mol⁻¹, Normal molar mass = 122 g mol⁻¹)',
    given: [
      'Mass of benzoic acid w₂ = 2.0 g, Normal M₂ = 122 g mol⁻¹',
      'Mass of benzene w₁ = 25.0 g',
      'Observed ΔT_f = 1.62 K, K_f = 4.9 K kg mol⁻¹'
    ],
    required: 'Percentage association (% x)',
    steps: [
      'Experimental M₂ = (K_f × w₂ × 1000) / (ΔT_f × w₁) = (4.9 × 2.0 × 1000) / (1.62 × 25.0) = 241.98 g mol⁻¹',
      'i = Normal Molar Mass / Experimental Molar Mass = 122 / 241.98 = 0.504',
      'For dimerization 2 A ⇌ A₂: i = 1 - x + x/2 = 1 - x/2',
      'x/2 = 1 - i = 1 - 0.504 = 0.496',
      'Degree of association x = 2 × 0.496 = 0.992',
      'Percentage association = 0.992 × 100 = 99.2%'
    ],
    answer: '99.2%',
    correctAnswer: '99.2',
    tolerance: 0.5,
    explanation: 'M₂(exp) = 241.98 g mol⁻¹. i = 122 / 241.98 = 0.504. For dimerization, x = 2(1 - i) = 2(1 - 0.504) = 0.992 = 99.2%.',
    marks: 5
  }
};
