export interface Subject {
  id: string;
  name: string;
  badge: string;
  description: string;
  iconName: 'FlaskConical' | 'Zap' | 'Calculator';
  status: 'ACTIVE' | 'COMING_SOON';
  lessonsCount: number;
  activeLessonsCount: number;
  route: string | null;
  features: string[];
}

export interface ChemistryLesson {
  id: number;
  lessonNumber: number;
  title: string;
  name: string;
  subtitle: string;
  description: string;
  category: 'Physical' | 'Inorganic' | 'Organic';
  status: 'ACTIVE' | 'LOCKED';
  route: string | null;
  unitsCount: number;
  iconName: 'FlaskConical' | 'Zap' | 'Timer' | 'Atom' | 'Link2' | 'Layers' | 'Droplets' | 'Wind' | 'Leaf';
}

export const subjectsData: Subject[] = [
  {
    id: 'chemistry',
    name: 'Chemistry',
    badge: 'Class 12 CBSE',
    description: 'Interactive chemistry concepts, formulas, visual simulations, graphs, and topic-wise practice.',
    iconName: 'FlaskConical',
    status: 'ACTIVE',
    lessonsCount: 10,
    activeLessonsCount: 1,
    route: '/chemistry',
    features: [
      'Interactive Formula Solvers',
      'Dynamic Raoult Curves & Graphs',
      'Particle & Colligative Simulations',
      '30+ NCERT Topic-wise Questions',
    ],
  },
  {
    id: 'physics',
    name: 'Physics',
    badge: 'Class 12 CBSE',
    description: 'Understand physics concepts through interactive simulations, formulas, graphs, and numerical practice.',
    iconName: 'Zap',
    status: 'COMING_SOON',
    lessonsCount: 14,
    activeLessonsCount: 0,
    route: null,
    features: [
      'Electromagnetism Simulators',
      'Wave Optics Visualizer',
      'Circuit Analysis Sandbox',
      'Numerical Derivations & Tests',
    ],
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    badge: 'Class 12 CBSE',
    description: 'Learn mathematical concepts through visual explanations, interactive calculations, formulas, and practice problems.',
    iconName: 'Calculator',
    status: 'COMING_SOON',
    lessonsCount: 13,
    activeLessonsCount: 0,
    route: null,
    features: [
      '3D Coordinate Geometry Engine',
      'Calculus Curve Grapher',
      'Step-by-Step Derivations',
      'Matrix & Determinant Solvers',
    ],
  },
];

export const chemistryLessonsData: ChemistryLesson[] = [
  {
    id: 1,
    lessonNumber: 1,
    title: 'Lesson 1 — Solutions',
    name: 'Solutions',
    subtitle: 'Concentration · Raoult\'s Law · Colligative Properties',
    description: 'Learn about solutions, concentration, solubility, vapour pressure, ideal and non-ideal solutions, colligative properties, and abnormal molar masses through interactive learning.',
    category: 'Physical',
    status: 'ACTIVE',
    route: '/solutions',
    unitsCount: 8,
    iconName: 'FlaskConical',
  },
  {
    id: 2,
    lessonNumber: 2,
    title: 'Lesson 2 — Electrochemistry',
    name: 'Electrochemistry',
    subtitle: 'Galvanic Cells · Nernst Equation · Electrolysis',
    description: 'Content is being prepared. Master redox systems, standard electrode potentials, conductance of electrolytes, and fuel cell technologies.',
    category: 'Physical',
    status: 'LOCKED',
    route: null,
    unitsCount: 7,
    iconName: 'Zap',
  },
  {
    id: 3,
    lessonNumber: 3,
    title: 'Lesson 3 — Chemical Kinetics',
    name: 'Chemical Kinetics',
    subtitle: 'Rate Laws · Activation Energy · Order of Reaction',
    description: 'Content is being prepared. Explore reaction rates, pseudo first-order reactions, Arrhenius equation, and collision theory models.',
    category: 'Physical',
    status: 'LOCKED',
    route: null,
    unitsCount: 6,
    iconName: 'Timer',
  },
  {
    id: 4,
    lessonNumber: 4,
    title: 'Lesson 4 — d- and f-Block Elements',
    name: 'd- and f-Block Elements',
    subtitle: 'Transition Metals · Lanthanides · Actinides',
    description: 'Content is being prepared. Study electronic configurations, magnetic moments, interstitial compounds, and alloy formations.',
    category: 'Inorganic',
    status: 'LOCKED',
    route: null,
    unitsCount: 6,
    iconName: 'Atom',
  },
  {
    id: 5,
    lessonNumber: 5,
    title: 'Lesson 5 — Coordination Compounds',
    name: 'Coordination Compounds',
    subtitle: 'Ligands · CFSE · Werner\'s Theory',
    description: 'Content is being prepared. Discover coordination entities, ligand field splitting, geometrical isomerism, and bio-coordination roles.',
    category: 'Inorganic',
    status: 'LOCKED',
    route: null,
    unitsCount: 7,
    iconName: 'Link2',
  },
  {
    id: 6,
    lessonNumber: 6,
    title: 'Lesson 6 — Haloalkanes & Haloarenes',
    name: 'Haloalkanes & Haloarenes',
    subtitle: 'SN1 · SN2 · Nucleophilic Substitution',
    description: 'Content is being prepared. Learn nucleophilic substitutions, elimination pathways, organometallic reagents, and stereochemical outcomes.',
    category: 'Organic',
    status: 'LOCKED',
    route: null,
    unitsCount: 6,
    iconName: 'Layers',
  },
  {
    id: 7,
    lessonNumber: 7,
    title: 'Lesson 7 — Alcohols, Phenols & Ethers',
    name: 'Alcohols, Phenols & Ethers',
    subtitle: 'Hydroxyl Group · Dehydration · Reactions',
    description: 'Content is being prepared. Examine alcohol preparation, acidity of substituted phenols, ether cleavage, and Williamson synthesis.',
    category: 'Organic',
    status: 'LOCKED',
    route: null,
    unitsCount: 7,
    iconName: 'Droplets',
  },
  {
    id: 8,
    lessonNumber: 8,
    title: 'Lesson 8 — Aldehydes, Ketones & Acids',
    name: 'Aldehydes, Ketones & Acids',
    subtitle: 'Carbonyl Chemistry · Nucleophilic Addition',
    description: 'Content is being prepared. Master carbonyl reactivity, Tollens & Fehling tests, haloform reactions, and carboxylic acid acidity trends.',
    category: 'Organic',
    status: 'LOCKED',
    route: null,
    unitsCount: 8,
    iconName: 'Wind',
  },
  {
    id: 9,
    lessonNumber: 9,
    title: 'Lesson 9 — Amines',
    name: 'Amines',
    subtitle: 'Basic Character · Diazonium Salts · Coupling',
    description: 'Content is being prepared. Investigate amine structure, gas vs aqueous basicity, Gabriel phthalimide synthesis, and coupling dyes.',
    category: 'Organic',
    status: 'LOCKED',
    route: null,
    unitsCount: 5,
    iconName: 'Atom',
  },
  {
    id: 10,
    lessonNumber: 10,
    title: 'Lesson 10 — Biomolecules',
    name: 'Biomolecules',
    subtitle: 'Carbohydrates · Proteins · Nucleic Acids',
    description: 'Content is being prepared. Explore cyclic glucose structures, peptide linkages, secondary protein structures, and genetic codes.',
    category: 'Organic',
    status: 'LOCKED',
    route: null,
    unitsCount: 6,
    iconName: 'Leaf',
  },
];