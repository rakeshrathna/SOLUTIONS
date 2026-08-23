import { Lesson } from '../types/lesson';
import { formulasData } from './formulas';
import { graphsData } from './graphs';
import { simulationsData } from './simulations';
import { questionsData } from './questions';

export const lessonsData: Lesson[] = [
  {
    id: 'lesson-1',
    title: 'Introduction & Types of Solutions',
    description: 'Fundamental definitions, binary solutions, components (solute vs solvent), and the 9 physical states of solutions.',
    chapterId: 'solutions-chapter',
    order: 1,
    status: 'PUBLISHED',
    estimatedTime: 18,
    sections: [
      {
        id: 'l1-s1',
        lessonId: 'lesson-1',
        type: 'TEXT',
        title: 'What is a Solution?',
        order: 1,
        content: `
### 1.1 Definition of a Solution
In everyday life, we rarely come across pure substances. Most of these are mixtures containing two or more pure substances. Their utility or importance in normal life depends upon their composition.

A **solution** is a **homogeneous mixture of two or more chemically non-reacting substances** whose composition can be varied within certain limits.
- **Homogeneous** means that its composition and properties are uniform throughout the mixture.
- The component that is present in the largest quantity is known as the **solvent**. The solvent determines the physical state in which the solution exists.
- One or more components present in the solution other than solvent are called **solutes**.

> **Example:** Brass is a solid solution of zinc in copper; German silver is a solution of copper, zinc and nickel; Bronze is copper and tin. 1 part per million (ppm) of fluoride in water prevents tooth decay, while 1.5 ppm causes tooth mottling and higher concentrations are toxic!
        `
      },
      {
        id: 'l1-s2',
        lessonId: 'lesson-1',
        type: 'TEXT',
        title: 'Components & Binary Solutions',
        order: 2,
        content: `
### 1.2 Binary Solutions
A solution consisting of only **two components** is called a **binary solution**.
1. **Solvent:** The component that constitutes the bulk of the solution and determines its final physical state.
2. **Solute:** The substance dissolved in the solvent.

In this chapter, we will mostly focus on binary solutions containing a liquid solvent with either a solid, liquid, or gas solute.
        `
      },
      {
        id: 'l1-s3',
        lessonId: 'lesson-1',
        type: 'TEXT',
        title: 'The 9 Types of Solutions (NCERT Table 1.1)',
        order: 3,
        content: `
### 1.3 Classification by Physical State
Depending on the physical state of solute and solvent, solutions are categorized into 9 distinct classes:

| Type of Solution | Solute | Solvent | Common Examples |
| :--- | :--- | :--- | :--- |
| **Gaseous Solutions** | Gas | Gas | Mixture of Oxygen ($O_2$) and Nitrogen ($N_2$) gas |
| | Liquid | Gas | Chloroform ($CHCl_3$) mixed with Nitrogen gas |
| | Solid | Gas | Camphor in Nitrogen gas |
| **Liquid Solutions** | Gas | Liquid | Oxygen ($O_2$) dissolved in water; Soda water ($CO_2$ in water) |
| | Liquid | Liquid | Ethanol dissolved in water |
| | Solid | Liquid | Glucose dissolved in water; Saline ($NaCl$ in water) |
| **Solid Solutions** | Gas | Solid | Solution of Hydrogen in Palladium ($H_2 / Pd$) |
| | Liquid | Solid | Amalgam of Mercury with Sodium ($Na-Hg$) |
| | Solid | Solid | Copper dissolved in Gold; Brass ($Zn$ in $Cu$) |
        `
      },
      {
        id: 'l1-s4',
        lessonId: 'lesson-1',
        type: 'SIMULATION',
        title: 'Particle Distribution in Liquid Solutions',
        order: 4,
        config: simulationsData['particles-in-solution']
      },
      {
        id: 'l1-s5',
        lessonId: 'lesson-1',
        type: 'QUESTION',
        title: 'Check Your Understanding: Solution Fundamentals',
        order: 5,
        config: questionsData['mcq-1']
      }
    ]
  },

  {
    id: 'lesson-2',
    title: 'Expressing Concentration of Solutions',
    description: 'Master quantitative methods: Mass %, Volume %, w/V %, ppm, Mole fraction, Molarity, and Molality with interactive calculators.',
    chapterId: 'solutions-chapter',
    order: 2,
    status: 'PUBLISHED',
    estimatedTime: 25,
    sections: [
      {
        id: 'l2-s1',
        lessonId: 'lesson-2',
        type: 'TEXT',
        title: 'Need for Quantitative Concentration',
        order: 1,
        content: `
### 2.1 Why Quantitative Units Matter
Qualitative descriptions such as *"dilute"* (relatively small amount of solute) or *"concentrated"* (relatively large amount of solute) often lead to ambiguity. In quantitative analysis, pharmacology, and chemical kinetics, precise values are essential.

Let us explore each standard concentration metric with live interactive formula widgets.
        `
      },
      {
        id: 'l2-s2',
        lessonId: 'lesson-2',
        type: 'FORMULA',
        title: 'Mass Percentage (w/w)',
        order: 2,
        config: formulasData['mass-percentage']
      },
      {
        id: 'l2-s3',
        lessonId: 'lesson-2',
        type: 'FORMULA',
        title: 'Volume Percentage (V/V)',
        order: 3,
        config: formulasData['volume-percentage']
      },
      {
        id: 'l2-s4',
        lessonId: 'lesson-2',
        type: 'FORMULA',
        title: 'Mass by Volume Percentage (w/V)',
        order: 4,
        config: formulasData['mass-by-volume']
      },
      {
        id: 'l2-s5',
        lessonId: 'lesson-2',
        type: 'FORMULA',
        title: 'Parts Per Million (ppm)',
        order: 5,
        config: formulasData['parts-per-million']
      },
      {
        id: 'l2-s6',
        lessonId: 'lesson-2',
        type: 'FORMULA',
        title: 'Mole Fraction (x)',
        order: 6,
        config: formulasData['mole-fraction']
      },
      {
        id: 'l2-s7',
        lessonId: 'lesson-2',
        type: 'FORMULA',
        title: 'Molarity (M)',
        order: 7,
        config: formulasData['molarity']
      },
      {
        id: 'l2-s8',
        lessonId: 'lesson-2',
        type: 'FORMULA',
        title: 'Molality (m)',
        order: 8,
        config: formulasData['molality']
      },
      {
        id: 'l2-s9',
        lessonId: 'lesson-2',
        type: 'QUESTION',
        title: 'Numerical Practice: Molarity of NaOH Solution',
        order: 9,
        config: questionsData['num-1']
      },
      {
        id: 'l2-s10',
        lessonId: 'lesson-2',
        type: 'QUESTION',
        title: 'Numerical Practice: Mole Fraction in Antifreeze',
        order: 10,
        config: questionsData['num-2']
      },
      {
        id: 'l2-s11',
        lessonId: 'lesson-2',
        type: 'QUESTION',
        title: 'Concept Check: Temperature Independence',
        order: 11,
        config: questionsData['mcq-10']
      }
    ]
  },

  {
    id: 'lesson-3',
    title: 'Solubility & Henry’s Law',
    description: 'Solubility of solids and gases in liquids, factors affecting solubility, Henry’s law equation, graph, and biological applications.',
    chapterId: 'solutions-chapter',
    order: 3,
    status: 'PUBLISHED',
    estimatedTime: 25,
    sections: [
      {
        id: 'l3-s1',
        lessonId: 'lesson-3',
        type: 'TEXT',
        title: 'Solubility of Solids in Liquids',
        order: 1,
        content: `
### 3.1 Solubility of Solid in Liquid
**Solubility** of a substance is its maximum amount that can be dissolved in a specified amount of solvent at a specified temperature.
- **Like Dissolves Like:** Polar solutes ($NaCl$, sugar) dissolve in polar solvents ($H_2O$); non-polar solutes (naphthalene, anthracene) dissolve in non-polar solvents (benzene).
- **Dissolution:** When a solid solute is added to the solvent, some solute dissolves and its concentration in solution increases.
- **Crystallisation:** Some solute particles in solution collide with the solid solute particles and get separated out.
- **Dynamic Equilibrium:** $\\text{Solute} + \\text{Solvent} \\rightleftharpoons \\text{Solution}$. When the rate of dissolution equals the rate of crystallisation, a **saturated solution** is formed.

#### Effect of Temperature & Pressure on Solids
- If dissolution is **endothermic** ($\\Delta_{\\text{sol}}H > 0$), solubility **increases** with temperature (e.g., $KNO_3, NaNO_3$).
- If dissolution is **exothermic** ($\\Delta_{\\text{sol}}H < 0$), solubility **decreases** with temperature (e.g., $Ce_2(SO_4)_3$).
- **Pressure** has no significant effect on solids/liquids since they are virtually incompressible.
        `
      },
      {
        id: 'l3-s2',
        lessonId: 'lesson-3',
        type: 'TEXT',
        title: 'Solubility of Gases in Liquids & Henry\'s Law',
        order: 2,
        content: `
### 3.2 Solubility of Gases in Liquids
Many gases dissolve in water. Oxygen dissolves only to a small extent in water ($~0.0001$ mole fraction), yet it is this dissolved oxygen which sustains all aquatic life.

#### Henry\'s Law
Henry was the first to give a quantitative relation between pressure and solubility of a gas in a solvent.
> *"The partial pressure of the gas in vapour phase ($p$) is proportional to the mole fraction of the gas ($x$) in the solution."*
$$p = K_H \\cdot x$$
where $K_H$ is the **Henry's law constant**.

#### Key Observations on $K_H$:
1. At a constant pressure, higher $K_H$ corresponds to **lower solubility** of the gas in liquid.
2. $K_H$ values increase with increase of temperature, indicating that the solubility of gases decreases with increase of temperature.
3. This is why aquatic species are more comfortable in cold waters than in warm waters!
        `
      },
      {
        id: 'l3-s3',
        lessonId: 'lesson-3',
        type: 'FORMULA',
        title: 'Henry’s Law Equation',
        order: 3,
        config: formulasData['henrys-law']
      },
      {
        id: 'l3-s4',
        lessonId: 'lesson-3',
        type: 'GRAPH',
        title: 'Henry’s Law Graph: Pressure vs Mole Fraction',
        order: 4,
        config: graphsData['henrys-law']
      },
      {
        id: 'l3-s5',
        lessonId: 'lesson-3',
        type: 'TEXT',
        title: 'Real-World Applications of Henry’s Law',
        order: 5,
        content: `
### 3.3 Clinical & Real-Life Applications
1. **Carbonated Beverages:** To increase the solubility of $CO_2$ in soft drinks and soda water, the bottle is sealed under high pressure.
2. **Scuba Diving (The Bends):** Deep sea divers must breathe air at high pressure. Increased pressure increases the solubility of atmospheric gases in blood. When the diver ascends, pressure decreases, releasing dissolved gases (mainly $N_2$) as bubbles in blood vessels. These bubbles block capillaries and cause a painful, dangerous condition called **bends**. To prevent bends, tanks used by scuba divers are filled with air diluted with Helium ($11.7\\%\\ He, 56.2\\%\\ N_2, 32.1\\%\\ O_2$).
3. **High Altitude (Anoxia):** At high altitudes the partial pressure of oxygen is less than at ground level. This leads to low concentrations of oxygen in the blood and tissues of climbers, making them weak and unable to think clearly (**anoxia**).
        `
      },
      {
        id: 'l3-s6',
        lessonId: 'lesson-3',
        type: 'QUESTION',
        title: 'Numerical Practice: Nitrogen Dissolution in Water',
        order: 6,
        config: questionsData['num-3']
      },
      {
        id: 'l3-s7',
        lessonId: 'lesson-3',
        type: 'QUESTION',
        title: 'MCQ: Gas Solubility & Temperature',
        order: 7,
        config: questionsData['mcq-9']
      }
    ]
  },

  {
    id: 'lesson-4',
    title: 'Vapour Pressure & Raoult’s Law',
    description: 'Vapour pressure of liquid-liquid solutions, Raoult’s law formulation, partial pressures, total pressure, and vapour phase composition.',
    chapterId: 'solutions-chapter',
    order: 4,
    status: 'PUBLISHED',
    estimatedTime: 25,
    sections: [
      {
        id: 'l4-s1',
        lessonId: 'lesson-4',
        type: 'TEXT',
        title: 'Vapour Pressure of Binary Liquid Solutions',
        order: 1,
        content: `
### 4.1 Liquid-Liquid Solutions
Consider a binary solution of two volatile liquids $1$ and $2$ in a closed vessel. Both components evaporate and eventually an equilibrium is established between the vapour phase and liquid phase.

According to **Raoult's Law** (formulated in 1886 by French chemist François-Marie Raoult):
> *"For a solution of volatile liquids, the partial vapour pressure of each component of the solution is directly proportional to its mole fraction present in solution."*

$$p_1 = p_1^0 \\cdot x_1 \\quad \\text{and} \\quad p_2 = p_2^0 \\cdot x_2$$

where $p_1^0$ and $p_2^0$ are the vapour pressures of pure components $1$ and $2$ at the same temperature.
        `
      },
      {
        id: 'l4-s2',
        lessonId: 'lesson-4',
        type: 'FORMULA',
        title: 'Raoult’s Law (Single Component)',
        order: 2,
        config: formulasData['raoults-law']
      },
      {
        id: 'l4-s3',
        lessonId: 'lesson-4',
        type: 'FORMULA',
        title: 'Total Vapour Pressure (Dalton + Raoult)',
        order: 3,
        config: formulasData['total-vapour-pressure']
      },
      {
        id: 'l4-s4',
        lessonId: 'lesson-4',
        type: 'GRAPH',
        title: 'Raoult’s Law: Ideal Solution Graph',
        order: 4,
        config: graphsData['raoults-law-ideal']
      },
      {
        id: 'l4-s5',
        lessonId: 'lesson-4',
        type: 'TEXT',
        title: 'Composition in the Vapour Phase',
        order: 5,
        content: `
### 4.2 Vapour Phase Mole Fractions ($y_1, y_2$)
If $y_1$ and $y_2$ are the mole fractions of components $1$ and $2$ in the **vapour phase**, then by Dalton's law of partial pressures:

$$p_1 = y_1 \\cdot p_{\\text{total}} \\implies y_1 = \\frac{p_1}{p_{\\text{total}}}$$
$$p_2 = y_2 \\cdot p_{\\text{total}} \\implies y_2 = \\frac{p_2}{p_{\\text{total}}}$$
        `
      },
      {
        id: 'l4-s6',
        lessonId: 'lesson-4',
        type: 'STEP_SOLVER',
        title: 'Step Visualizer: Binary Vapour Pressure Derivation Matrix',
        order: 6,
        config: {
          id: 'step-solver-raoult',
          title: 'Raoult\'s Law Binary Solution Step Visualizer',
          formulaDisplay: 'p_{\\text{total}} = x_1 p_1^0 + x_2 p_2^0 = 285.5 + 62.4 = 347.9\\text{ mm Hg}',
          steps: [
            {
              badge: 'Step 0 — Raw Component Inputs',
              codeSnippet: 'GIVEN: w(CH₂Cl₂) = 40g, w(CHCl₃) = 25.5g',
              description: 'We start with the initial masses and pure vapor pressures of both components at 298 K.',
              headers: ['component', 'mass (g)', 'molar_mass (g/mol)', 'p_pure (mm Hg)'],
              rows: [
                { cols: ['CH₂Cl₂ (1)', '40.0', '85.0', '415'], isHighlighted: true },
                { cols: ['CHCl₃ (2)', '25.5', '119.5', '200'] }
              ]
            },
            {
              badge: 'Step 1 — Moles Calculation',
              codeSnippet: 'n = mass / molar_mass',
              description: 'Compute the amount of each substance in moles: n₁ = 40/85 = 0.470 mol; n₂ = 25.5/119.5 = 0.213 mol.',
              headers: ['component', 'moles (mol)', 'calculation', 'status'],
              rows: [
                { cols: ['CH₂Cl₂ (1)', '0.470', '40.0 / 85.0', 'computed'], isHighlighted: true },
                { cols: ['CHCl₃ (2)', '0.213', '25.5 / 119.5', 'computed'], isHighlighted: true },
                { cols: ['Total Moles', '0.683', '0.470 + 0.213', 'summed'] }
              ]
            },
            {
              badge: 'Step 2 — Mole Fractions (x₁, x₂)',
              codeSnippet: 'x₁ = n₁ / n_total, x₂ = 1 - x₁',
              description: 'Determine mole fractions in liquid phase: x₁ = 0.470/0.683 = 0.688 and x₂ = 0.213/0.683 = 0.312.',
              headers: ['component', 'moles', 'mole_fraction (x)', 'x_sum_check'],
              rows: [
                { cols: ['CH₂Cl₂ (1)', '0.470', '0.688', '—'] },
                { cols: ['CHCl₃ (2)', '0.213', '0.312', '—'] },
                { cols: ['Sum (x₁ + x₂)', '0.683', '1.000', 'VERIFIED ✓'], isHighlighted: true }
              ]
            },
            {
              badge: 'Step 3 — Partial & Total Vapour Pressure',
              codeSnippet: 'p₁ = x₁·p₁⁰, p₂ = x₂·p₂⁰, p_total = p₁ + p₂',
              description: 'Calculate partial pressures and total vapour pressure: p₁ = 0.688 × 415 = 285.5 mm Hg; p₂ = 0.312 × 200 = 62.4 mm Hg.',
              headers: ['component', 'mole_fraction (x)', 'p_pure (mm Hg)', 'partial_p (mm Hg)'],
              rows: [
                { cols: ['CH₂Cl₂ (1)', '0.688', '415', '285.5 mm Hg'] },
                { cols: ['CHCl₃ (2)', '0.312', '200', '62.4 mm Hg'] },
                { cols: ['Total Solution', '1.000', '—', '347.9 mm Hg'], isHighlighted: true }
              ]
            },
            {
              badge: 'Step 4 — Vapour Phase Composition (y₁, y₂)',
              codeSnippet: 'y₁ = p₁ / p_total, y₂ = p₂ / p_total',
              description: 'Vapour phase is richer in the more volatile component CH₂Cl₂ (y₁ = 285.5/347.9 = 0.82 vs x₁ = 0.688 in liquid).',
              headers: ['component', 'liquid_x', 'vapour_p (mm Hg)', 'vapour_y'],
              rows: [
                { cols: ['CH₂Cl₂ (1)', '0.688', '285.5', '0.821 (82.1%)'], isHighlighted: true },
                { cols: ['CHCl₃ (2)', '0.312', '62.4', '0.179 (17.9%)'] }
              ]
            }
          ]
        }
      },
      {
        id: 'l4-s7',
        lessonId: 'lesson-4',
        type: 'QUESTION',
        title: 'Numerical Practice: Chloroform + Dichloromethane Mixture',
        order: 7,
        config: questionsData['num-4']
      }
    ]
  },

  {
    id: 'lesson-5',
    title: 'Ideal and Non-Ideal Solutions & Azeotropes',
    description: 'Thermodynamic criteria (ΔmixH = 0, ΔmixV = 0), positive vs negative deviations, molecular interactions, and minimum/maximum boiling azeotropes.',
    chapterId: 'solutions-chapter',
    order: 5,
    status: 'PUBLISHED',
    estimatedTime: 25,
    sections: [
      {
        id: 'l5-s1',
        lessonId: 'lesson-5',
        type: 'TEXT',
        title: 'Ideal Solutions',
        order: 1,
        content: `
### 5.1 What is an Ideal Solution?
The solutions which obey Raoult's law over the entire range of concentration are known as **ideal solutions**.

#### Thermodynamic Criteria for Ideal Solutions:
1. $\\Delta_{\\text{mix}}H = 0$ (No heat is absorbed or evolved when components are mixed).
2. $\\Delta_{\\text{mix}}V = 0$ (Total volume of solution is exactly equal to the sum of volumes of the two components).
3. **Intermolecular Forces:** If the intermolecular attractive forces between $A-A$ and $B-B$ are nearly equal to the intermolecular attractive forces between $A-B$.

**Examples of Ideal Solutions:**
- n-Hexane and n-Heptane
- Bromoethane and Chloroethane
- Benzene and Toluene
        `
      },
      {
        id: 'l5-s2',
        lessonId: 'lesson-5',
        type: 'TEXT',
        title: 'Positive Deviation from Raoult’s Law',
        order: 2,
        content: `
### 5.2 Positive Deviation ($A-B < A-A, B-B$)
When intermolecular attractive forces between $A-B$ are **weaker** than those between $A-A$ and $B-B$, molecules find it easier to escape into the vapour phase.

- **Vapour Pressure:** Higher than predicted by Raoult's law ($p_1 > p_1^0 x_1$ and $p_2 > p_2^0 x_2$).
- $\\Delta_{\\text{mix}}H > 0$ (Endothermic mixing)
- $\\Delta_{\\text{mix}}V > 0$ (Volume expansion)
- **Examples:** Ethanol + Acetone; Carbon disulphide ($CS_2$) + Acetone.
        `
      },
      {
        id: 'l5-s3',
        lessonId: 'lesson-5',
        type: 'GRAPH',
        title: 'Positive Deviation Graph',
        order: 3,
        config: graphsData['positive-deviation']
      },
      {
        id: 'l5-s4',
        lessonId: 'lesson-5',
        type: 'TEXT',
        title: 'Negative Deviation from Raoult’s Law',
        order: 4,
        content: `
### 5.3 Negative Deviation ($A-B > A-A, B-B$)
When intermolecular attractive forces between $A-B$ are **stronger** than between $A-A$ and $B-B$, escaping tendency of molecules decreases.

- **Vapour Pressure:** Lower than predicted by Raoult's law ($p_1 < p_1^0 x_1$ and $p_2 < p_2^0 x_2$).
- $\\Delta_{\\text{mix}}H < 0$ (Exothermic mixing)
- $\\Delta_{\\text{mix}}V < 0$ (Volume contraction)
- **Examples:** Phenol + Aniline (strong intermolecular H-bonding between phenolic $-OH$ and aniline $-NH_2$); Chloroform + Acetone.
        `
      },
      {
        id: 'l5-s5',
        lessonId: 'lesson-5',
        type: 'GRAPH',
        title: 'Negative Deviation Graph',
        order: 5,
        config: graphsData['negative-deviation']
      },
      {
        id: 'l5-s6',
        lessonId: 'lesson-5',
        type: 'TEXT',
        title: 'Azeotropes: Minimum & Maximum Boiling',
        order: 6,
        content: `
### 5.4 Azeotropic Mixtures
Binary mixtures having the same composition in liquid and vapour phase and boil at a constant temperature are called **azeotropes** (or constant-boiling mixtures).

1. **Minimum Boiling Azeotrope:**
   - Formed by solutions showing large **positive deviation**.
   - Boils at a temperature lower than either of its pure constituents.
   - *Example:* Ethanol-water mixture containing $95\\%$ ethanol by volume (boiling point 351.15 K vs pure ethanol 351.5 K and water 373.15 K).
2. **Maximum Boiling Azeotrope:**
   - Formed by solutions showing large **negative deviation**.
   - Boils at a temperature higher than either of its pure constituents.
   - *Example:* Nitric acid and water mixture containing $68\\%\\ HNO_3$ and $32\\%\\ H_2O$ by mass (boiling point 393.5 K).
        `
      },
      {
        id: 'l5-s7',
        lessonId: 'lesson-5',
        type: 'QUESTION',
        title: 'Concept Check: Ethanol + Acetone Deviation',
        order: 7,
        config: questionsData['mcq-5']
      }
    ]
  },

  {
    id: 'lesson-6',
    title: 'Colligative Properties & Molecular Mass Determination',
    description: 'Explore the 4 colligative properties: RLV, Boiling Point Elevation, Freezing Point Depression, and Osmotic Pressure.',
    chapterId: 'solutions-chapter',
    order: 6,
    status: 'PUBLISHED',
    estimatedTime: 30,
    sections: [
      {
        id: 'l6-s1',
        lessonId: 'lesson-6',
        type: 'TEXT',
        title: 'What are Colligative Properties?',
        order: 1,
        content: `
### 6.1 Definition of Colligative Properties
Properties of dilute solutions that depend **only on the number of solute particles** present in solution and **not on their nature** are called **colligative properties** (from Latin *colligatus*, meaning bound together).

There are four core colligative properties:
1. **Relative lowering of vapour pressure** of the solvent
2. **Elevation of boiling point** of the solvent
3. **Depression of freezing point** of the solvent
4. **Osmotic pressure** of the solution
        `
      },
      {
        id: 'l6-s2',
        lessonId: 'lesson-6',
        type: 'TEXT',
        title: '1. Relative Lowering of Vapour Pressure (RLVP)',
        order: 2,
        content: `
### 6.2 Relative Lowering of Vapour Pressure
When a non-volatile solute is added to a solvent, solute particles occupy part of the liquid surface, decreasing the rate of evaporation.

$$\\frac{p_1^0 - p_1}{p_1^0} = x_2 = \\frac{n_2}{n_1 + n_2} \\approx \\frac{n_2}{n_1} = \\frac{w_2 \\cdot M_1}{M_2 \\cdot w_1}$$

$$M_2 = \\frac{w_2 \\cdot M_1 \\cdot p_1^0}{(p_1^0 - p_1) \\cdot w_1}$$
        `
      },
      {
        id: 'l6-s3',
        lessonId: 'lesson-6',
        type: 'FORMULA',
        title: '2. Elevation of Boiling Point (ΔT_b)',
        order: 3,
        config: formulasData['elevation-boiling-point']
      },
      {
        id: 'l6-s4',
        lessonId: 'lesson-6',
        type: 'GRAPH',
        title: 'Boiling Point Elevation Curves',
        order: 4,
        config: graphsData['boiling-point-elevation']
      },
      {
        id: 'l6-s5',
        lessonId: 'lesson-6',
        type: 'FORMULA',
        title: '3. Depression of Freezing Point (ΔT_f)',
        order: 5,
        config: formulasData['depression-freezing-point']
      },
      {
        id: 'l6-s6',
        lessonId: 'lesson-6',
        type: 'GRAPH',
        title: 'Freezing Point Depression Phase Diagram',
        order: 6,
        config: graphsData['freezing-point-depression']
      },
      {
        id: 'l6-s7',
        lessonId: 'lesson-6',
        type: 'FORMULA',
        title: 'Molar Mass from Freezing Point Depression',
        order: 7,
        config: formulasData['molar-mass-freezing']
      },
      {
        id: 'l6-s8',
        lessonId: 'lesson-6',
        type: 'FORMULA',
        title: '4. Osmotic Pressure (Π = CRT)',
        order: 8,
        config: formulasData['osmotic-pressure']
      },
      {
        id: 'l6-s9',
        lessonId: 'lesson-6',
        type: 'SIMULATION',
        title: 'Osmosis & Semipermeable Membrane Simulator',
        order: 9,
        config: simulationsData['osmosis-simulator']
      },
      {
        id: 'l6-s10',
        lessonId: 'lesson-6',
        type: 'FORMULA',
        title: 'Molar Mass of Biomolecules from Osmotic Pressure',
        order: 10,
        config: formulasData['molar-mass-osmosis']
      },
      {
        id: 'l6-s11',
        lessonId: 'lesson-6',
        type: 'QUESTION',
        title: 'Numerical Practice: Glucose Boiling Point Elevation',
        order: 11,
        config: questionsData['num-5']
      },
      {
        id: 'l6-s12',
        lessonId: 'lesson-6',
        type: 'QUESTION',
        title: 'Numerical Practice: Protein Molar Mass by Osmosis',
        order: 12,
        config: questionsData['num-8']
      }
    ]
  },

  {
    id: 'lesson-7',
    title: 'Abnormal Molar Masses & van’t Hoff Factor',
    description: 'Ionic dissociation, molecular association, definition of van’t Hoff factor i, degree of dissociation α, and modified colligative formulas.',
    chapterId: 'solutions-chapter',
    order: 7,
    status: 'PUBLISHED',
    estimatedTime: 25,
    sections: [
      {
        id: 'l7-s1',
        lessonId: 'lesson-7',
        type: 'TEXT',
        title: 'Why Do Experimental Molar Masses Differ?',
        order: 1,
        content: `
### 7.1 Abnormal Molar Masses
When the molecular mass of a substance determined by studying any of the colligative properties comes out to be different than the theoretically expected value, the substance is said to show **abnormal molar mass**.

This happens due to two primary phenomena:
1. **Dissociation of Solute:** When ionic compounds ($NaCl, KCl, CaCl_2$) dissolve in water, they break into ions. Since colligative properties depend on the total number of particles, the observed colligative property is higher and the calculated molar mass is lower than normal.
2. **Association of Solute:** In non-polar solvents, molecules like ethanoic acid or benzoic acid dimerise through hydrogen bonding. Total particles decrease, causing observed colligative properties to be smaller and experimental molar mass to be greater than expected.
        `
      },
      {
        id: 'l7-s2',
        lessonId: 'lesson-7',
        type: 'FORMULA',
        title: 'The van’t Hoff Factor (i)',
        order: 2,
        config: formulasData['vanthoff-factor']
      },
      {
        id: 'l7-s3',
        lessonId: 'lesson-7',
        type: 'SIMULATION',
        title: 'van’t Hoff Factor Particle Simulator',
        order: 3,
        config: simulationsData['vanthoff-dissociation']
      },
      {
        id: 'l7-s4',
        lessonId: 'lesson-7',
        type: 'GRAPH',
        title: 'van’t Hoff Factor vs Concentration',
        order: 4,
        config: graphsData['vanthoff-vs-concentration']
      },
      {
        id: 'l7-s5',
        lessonId: 'lesson-7',
        type: 'TEXT',
        title: 'Modified Colligative Equations with i',
        order: 5,
        content: `
### 7.2 Modified Colligative Formulas
Inclusion of the van't Hoff factor ($i$) modifies all colligative equations to handle electrolytes and associating molecules accurately:

1. **Relative Lowering of Vapour Pressure:**
   $$\\frac{p_1^0 - p_1}{p_1^0} = i \\cdot x_2 = i \\cdot \\frac{n_2}{n_1}$$

2. **Elevation of Boiling Point:**
   $$\\Delta T_b = i \\cdot K_b \\cdot m$$

3. **Depression of Freezing Point:**
   $$\\Delta T_f = i \\cdot K_f \\cdot m$$

4. **Osmotic Pressure:**
   $$\\Pi = i \\cdot C \\cdot R \\cdot T$$

#### Relation with Degree of Dissociation ($\\alpha$)
For an electrolyte yielding $n$ ions ($A_n \\rightleftharpoons n A$):
$$i = 1 + (n - 1)\\alpha \\implies \\alpha = \\frac{i - 1}{n - 1}$$

#### Relation with Degree of Association ($x$)
For a molecule associating into $n$-mers ($n A \\rightleftharpoons A_n$):
$$i = 1 - x + \\frac{x}{n} = 1 - \\left(1 - \\frac{1}{n}\\right)x \\implies x = \\frac{1 - i}{1 - 1/n}$$
        `
      },
      {
        id: 'l7-s6',
        lessonId: 'lesson-7',
        type: 'QUESTION',
        title: 'Advanced Practice: Acetic Acid Dissociation & Ka',
        order: 6,
        config: questionsData['num-9']
      },
      {
        id: 'l7-s7',
        lessonId: 'lesson-7',
        type: 'QUESTION',
        title: 'Advanced Practice: Benzoic Acid Dimerization in Benzene',
        order: 7,
        config: questionsData['num-10']
      }
    ]
  },

  {
    id: 'lesson-8',
    title: 'Complete Chapter Practice & Assessment',
    description: 'Comprehensive NCERT test bank with 30 curated questions covering all topics, difficulty levels, and step-by-step problem solvers.',
    chapterId: 'solutions-chapter',
    order: 8,
    status: 'PUBLISHED',
    estimatedTime: 40,
    sections: [
      {
        id: 'l8-s1',
        lessonId: 'lesson-8',
        type: 'TEXT',
        title: 'Chapter Review & Assessment Overview',
        order: 1,
        content: `
### Chapter 1: Solutions — Comprehensive Assessment
Test your conceptual clarity, graph interpretation, and numerical problem-solving skills across all topics of CBSE Class 12 Chemistry.

- **20 Multiple Choice Questions** with instant feedback and NCERT textbook citations.
- **10 Numerical Questions** with step-by-step verified derivations and unit handling.
- **Live Performance Score** saved automatically to your dashboard.
        `
      },
      {
        id: 'l8-s2',
        lessonId: 'lesson-8',
        type: 'QUESTION',
        title: 'Question 1: Solution Definition',
        order: 2,
        config: questionsData['mcq-1']
      },
      {
        id: 'l8-s3',
        lessonId: 'lesson-8',
        type: 'QUESTION',
        title: 'Question 2: Molarity Calculation',
        order: 3,
        config: questionsData['mcq-2']
      },
      {
        id: 'l8-s4',
        lessonId: 'lesson-8',
        type: 'QUESTION',
        title: 'Question 3: Henry\'s Law Relation',
        order: 4,
        config: questionsData['mcq-3']
      },
      {
        id: 'l8-s5',
        lessonId: 'lesson-8',
        type: 'QUESTION',
        title: 'Question 4: Raoult\'s Law Principle',
        order: 5,
        config: questionsData['mcq-4']
      },
      {
        id: 'l8-s6',
        lessonId: 'lesson-8',
        type: 'QUESTION',
        title: 'Question 5: Positive Deviation Interactions',
        order: 6,
        config: questionsData['mcq-5']
      },
      {
        id: 'l8-s7',
        lessonId: 'lesson-8',
        type: 'QUESTION',
        title: 'Question 6: Non-Colligative Identification',
        order: 7,
        config: questionsData['mcq-6']
      },
      {
        id: 'l8-s8',
        lessonId: 'lesson-8',
        type: 'QUESTION',
        title: 'Question 7: Osmotic Pressure Calculation',
        order: 8,
        config: questionsData['mcq-7']
      },
      {
        id: 'l8-s9',
        lessonId: 'lesson-8',
        type: 'QUESTION',
        title: 'Question 8: van\'t Hoff Factor for Electrolytes',
        order: 9,
        config: questionsData['mcq-8']
      },
      {
        id: 'l8-s10',
        lessonId: 'lesson-8',
        type: 'QUESTION',
        title: 'Question 9: Freezing Point Depression Comparison',
        order: 10,
        config: questionsData['mcq-13']
      },
      {
        id: 'l8-s11',
        lessonId: 'lesson-8',
        type: 'QUESTION',
        title: 'Question 10: Reverse Osmosis Mechanism',
        order: 11,
        config: questionsData['mcq-15']
      },
      {
        id: 'l8-s12',
        lessonId: 'lesson-8',
        type: 'QUESTION',
        title: 'Numerical 1: Molarity of NaOH Solution',
        order: 12,
        config: questionsData['num-1']
      },
      {
        id: 'l8-s13',
        lessonId: 'lesson-8',
        type: 'QUESTION',
        title: 'Numerical 2: Freezing Point Depression of Glycol Solution',
        order: 13,
        config: questionsData['num-6']
      },
      {
        id: 'l8-s14',
        lessonId: 'lesson-8',
        type: 'QUESTION',
        title: 'Numerical 3: Molar Mass from Freezing Depression',
        order: 14,
        config: questionsData['num-7']
      },
      {
        id: 'l8-s15',
        lessonId: 'lesson-8',
        type: 'QUESTION',
        title: 'Numerical 4: Acetic Acid Ka & van\'t Hoff Factor',
        order: 15,
        config: questionsData['num-9']
      }
    ]
  }
];
