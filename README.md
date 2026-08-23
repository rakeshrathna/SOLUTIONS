# 🧪 Interactive STEM Learning Platform (Class 12 CBSE Chemistry — Solutions)

An interactive, data-driven STEM learning platform designed for **Class 12 CBSE Chemistry — Solutions Chapter**. Built with **React 18, TypeScript, Tailwind CSS, Vite, KaTeX, and Apache ECharts**.

---

## 🌟 Key Features

- **8 Comprehensive Curriculum Units**:
  - Unit 1: Introduction & 9 Types of Solutions
  - Unit 2: Expressing Concentration of Solutions (Mass %, Vol %, w/V %, ppm, Mole Fraction, Molarity, Molality)
  - Unit 3: Solubility & Henry's Law
  - Unit 4: Vapour Pressure & Raoult's Law (Binary Liquids & Vapour Phase Composition)
  - Unit 5: Ideal & Non-Ideal Solutions, Positive/Negative Deviations & Azeotropes
  - Unit 6: Colligative Properties & Molar Mass Determination (RLVP, $\Delta T_b$, $\Delta T_f$, $\Pi$)
  - Unit 7: Abnormal Molar Masses & van't Hoff Factor ($i$, $\alpha$, $x$)
  - Unit 8: Complete Chapter Practice & Assessment
- **Interactive Formula Engine**: 13 dynamic formula calculators with live parameter sliders and real-time mathematical evaluation.
- **Dynamic Graph Visualizer**: 8 interactive Apache ECharts graphs with live curve modifiers.
- **Physics Simulations**: HTML5 Canvas simulations for 2D Brownian motion, electrolyte dissociation, and two-chamber Osmosis / Reverse Osmosis.
- **Interactive Step Visualizer**: Data table matrix breakdown for complex multi-step derivations.
- **30 NCERT Questions**: 20 MCQs and 10 numerical problems with tolerance validation, hints, and step-by-step arithmetic derivations.
- **Centralized Saved Notes (`/notes`)**: Dedicated notes and bookmarks dashboard with live search, unit filters, in-place editing, and direct jump-to-section deep links.
- **Interactive Progress Tracking**: Toggleable section and question completion states with real-time score and mastery calculation persisted in `localStorage`.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm / yarn / pnpm

### Installation
```bash
# Clone the repository
git clone https://github.com/rakeshrathna/SOLUTIONS.git

# Navigate into project directory
cd SOLUTIONS

# Install dependencies
npm install

# Start local development server
npm run dev
```

The application will be available at `http://localhost:5173/`.

### Production Build
```bash
npm run build
```

---

## 🛠️ Tech Stack
- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS (Clean Light Theme with subtle slate borders and cyan accents)
- **Math Rendering**: KaTeX
- **Data Visualization**: Apache ECharts (`echarts-for-react`)
- **State Management**: Zustand with `localStorage` persistence
- **Icons**: Lucide React
- **Celebration Effects**: Canvas Confetti

---

## 📄 License
MIT License
