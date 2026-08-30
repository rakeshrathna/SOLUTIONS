import React, { useState, useEffect, useRef } from 'react';
import { SimulationConfig } from '../../types/simulation';
import { SliderInput } from '../common/SliderInput';
import { MathRenderer } from '../common/MathRenderer';
import { Play, Pause, RotateCcw, Eye, Sparkles, Layers } from 'lucide-react';

interface SimulationWidgetProps {
  config: SimulationConfig;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  type: 'solvent' | 'solute';
}

export const SimulationWidget: React.FC<SimulationWidgetProps> = ({ config }) => {
  const [isRunning, setIsRunning] = useState(true);

  const [controls, setControls] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    config.controls.forEach((c) => {
      initial[c.name] = c.default;
    });
    return initial;
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number | null>(null);

  const handleControlChange = (name: string, value: any) => {
    setControls((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleReset = () => {
    const initial: Record<string, any> = {};
    config.controls.forEach((c) => {
      initial[c.name] = c.default;
    });
    setControls(initial);
  };

  // 1. Particle Brownian Motion
  useEffect(() => {
    if (config.type !== 'particles') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    const soluteCount = controls['soluteConcentration'] ?? 12;
    const solventCount = 65;
    const newParticles: Particle[] = [];

    for (let i = 0; i < solventCount; i++) {
      newParticles.push({
        x: Math.random() * (width - 20) + 10,
        y: Math.random() * (height - 40) + 30,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        radius: 4.5,
        color: '#C0222E',
        type: 'solvent'
      });
    }

    for (let i = 0; i < soluteCount; i++) {
      newParticles.push({
        x: Math.random() * (width - 20) + 10,
        y: Math.random() * (height - 40) + 30,
        vx: (Math.random() - 0.5) * 1.0,
        vy: (Math.random() - 0.5) * 1.0,
        radius: 8,
        color: '#E11D48',
        type: 'solute'
      });
    }

    particlesRef.current = newParticles;

    const temp = controls['temperature'] ?? 25;
    const speedMult = 0.5 + (temp / 100) * 2.0;

    const animate = () => {
      ctx.fillStyle = '#F8FAFC';
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = '#C0222E';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(0, 28);
      ctx.lineTo(width, 28);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#64748B';
      ctx.font = 'bold 10px JetBrains Mono';
      ctx.fillText('LIQUID SURFACE (VAPOUR INTERFACE)', 12, 20);

      particlesRef.current.forEach((p) => {
        if (isRunning) {
          p.x += p.vx * speedMult;
          p.y += p.vy * speedMult;

          if (p.x - p.radius < 0 || p.x + p.radius > width) p.vx *= -1;
          if (p.y - p.radius < 28 || p.y + p.radius > height) p.vy *= -1;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        if (p.type === 'solute') {
          ctx.fillStyle = '#FFFFFF';
          ctx.font = 'bold 9px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('S', p.x, p.y);
        }
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [config.type, controls['soluteConcentration'], controls['temperature'], isRunning]);

  // 3. Osmosis U-tube
  useEffect(() => {
    if (config.type !== 'osmosis') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const midX = width / 2;

    const leftSolute = controls['soluteConcentrationLeft'] ?? 2;
    const rightSolute = controls['soluteConcentrationRight'] ?? 16;
    const extPressure = controls['appliedPressureRight'] ?? 0;

    const deltaC = rightSolute - leftSolute;
    const osmoticPressure = deltaC * 2.5;
    const netPressure = osmoticPressure - extPressure;
    const heightShift = Math.max(-60, Math.min(60, netPressure * 0.8));

    let frameCount = 0;

    const animateOsmosis = () => {
      frameCount++;
      ctx.fillStyle = '#F8FAFC';
      ctx.fillRect(0, 0, width, height);

      // Left chamber
      const leftLevel = 70 + heightShift;
      ctx.fillStyle = 'rgba(192, 34, 46, 0.12)';
      ctx.fillRect(20, leftLevel, midX - 30, height - leftLevel - 20);
      ctx.strokeStyle = '#C0222E';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(20, leftLevel, midX - 30, height - leftLevel - 20);

      // Right chamber
      const rightLevel = 70 - heightShift;
      ctx.fillStyle = 'rgba(225, 29, 72, 0.15)';
      ctx.fillRect(midX + 10, rightLevel, midX - 30, height - rightLevel - 20);
      ctx.strokeStyle = '#E11D48';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(midX + 10, rightLevel, midX - 30, height - rightLevel - 20);

      // Semipermeable membrane
      ctx.strokeStyle = '#C0222E';
      ctx.lineWidth = 3;
      ctx.setLineDash([5, 4]);
      ctx.beginPath();
      ctx.moveTo(midX, 40);
      ctx.lineTo(midX, height - 20);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#C0222E';
      ctx.font = 'bold 11px JetBrains Mono';
      ctx.textAlign = 'center';
      ctx.fillText('SPM (Semipermeable Membrane)', midX, 28);

      if (Math.abs(netPressure) > 2 && isRunning) {
        const arrowDir = netPressure > 0 ? 1 : -1;
        const pulse = (Math.sin(frameCount * 0.1) + 1) * 3;

        ctx.fillStyle = netPressure > 0 ? '#C0222E' : '#059669';
        ctx.font = 'bold 16px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(arrowDir > 0 ? '➔ ➔ ➔' : '⬅ ⬅ ⬅', midX + (arrowDir * (12 + pulse)), height / 2);

        ctx.font = 'bold 11px JetBrains Mono';
        ctx.fillText(
          netPressure > 0 ? 'NET SOLVENT FLOW (OSMOSIS)' : 'REVERSE OSMOSIS (RO)',
          midX,
          height / 2 + 25
        );
      }

      ctx.fillStyle = '#475569';
      ctx.font = '12px Inter, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`Left: ${leftSolute} units (Dilute)`, 30, height - 30);
      ctx.textAlign = 'right';
      ctx.fillText(`Right: ${rightSolute} units (Concentrated)`, width - 30, height - 30);

      animFrameRef.current = requestAnimationFrame(animateOsmosis);
    };

    animateOsmosis();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [config.type, controls['soluteConcentrationLeft'], controls['soluteConcentrationRight'], controls['appliedPressureRight'], isRunning]);

  const currentSoluteType = controls['soluteType'] || 'NaCl';
  const soluteInfo = config.soluteData?.[currentSoluteType];

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-card space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-cyan-700 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-cyan-600" />
            Interactive Simulation
          </span>
          <div>
            <h3 className="text-base font-semibold text-slate-900 tracking-tight">
              {config.title}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {config.type !== 'vanthoff' && (
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="px-3.5 py-1.5 text-xs font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-all shadow-sm flex items-center gap-1.5"
            >
              {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              {isRunning ? 'Pause' : 'Play'}
            </button>
          )}

          <button
            onClick={handleReset}
            className="px-3.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300 rounded-lg transition-all bg-white hover:bg-slate-50 shadow-sm flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            Reset
          </button>
        </div>
      </div>

      {config.description && (
        <p className="text-xs text-slate-600 leading-relaxed">
          {config.description}
        </p>
      )}

      {/* Particle Canvas */}
      {config.type === 'particles' && (
        <div className="flex flex-col items-center gap-4">
          <div className="w-full relative rounded-xl overflow-hidden bg-slate-50 border border-slate-200">
            <canvas
              ref={canvasRef}
              width={640}
              height={280}
              className="w-full h-[260px] md:h-[300px] block"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 font-mono">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-cyan-600 shadow-sm" />
              <span>Solvent Molecules (<MathRenderer math="H_2O" />)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-rose-600 text-[8px] text-white font-bold flex items-center justify-center">
                S
              </span>
              <span>Non-Volatile Solute (Glucose)</span>
            </div>
          </div>
        </div>
      )}

      {/* van't Hoff Dissociation Visualizer */}
      {config.type === 'vanthoff' && soluteInfo && (
        <div className="space-y-6">
          <div className="p-5 rounded-xl bg-cyan-50/70 border border-cyan-200 flex flex-col items-center text-center gap-2">
            <span className="text-[11px] uppercase font-semibold text-cyan-800 tracking-widest flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-cyan-600" /> Dissociation / Association Equation
            </span>
            <div className="text-xl md:text-2xl font-semibold text-slate-900 font-mono py-1">
              <MathRenderer math={soluteInfo.dissociation} displayMode={true} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-xs text-slate-500 font-medium">Theoretical Particles (<MathRenderer math="n" />)</span>
              <div className="text-3xl font-bold text-slate-900 font-mono mt-1">
                {soluteInfo.particles}
              </div>
              <span className="text-[11px] text-slate-400">Ions formed per formula unit</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-xs text-slate-500 font-medium">Ideal Factor (<MathRenderer math="i_{\text{ideal}}" />)</span>
              <div className="text-3xl font-bold text-cyan-700 font-mono mt-1">
                {soluteInfo.i_ideal}
              </div>
              <span className="text-[11px] text-slate-400">At infinite dilution (<MathRenderer math="c \to 0" />)</span>
            </div>

            <div className="p-4 rounded-xl bg-cyan-50 border border-cyan-200 text-center">
              <span className="text-xs text-cyan-800 font-semibold">Observed Factor (<MathRenderer math="i_{\text{observed}}" />)</span>
              <div className="text-3xl font-bold text-slate-900 font-mono mt-1">
                {soluteInfo.i_observed}
              </div>
              <span className="text-[11px] text-slate-500">At 0.1 M (NCERT Table 1.4)</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider block mb-3">
              Species in Solution:
            </span>
            <div className="flex flex-wrap gap-2.5">
              {soluteInfo.particleDisplay.map((token, idx) => (
                <div
                  key={idx}
                  className="px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-cyan-800 font-mono font-medium text-sm flex items-center gap-2 shadow-sm"
                >
                  <span className="w-2 h-2 rounded-full bg-cyan-600" />
                  <MathRenderer math={token} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Osmosis Canvas */}
      {config.type === 'osmosis' && (
        <div className="flex flex-col items-center gap-4">
          <div className="w-full relative rounded-xl overflow-hidden bg-slate-50 border border-slate-200">
            <canvas
              ref={canvasRef}
              width={640}
              height={260}
              className="w-full h-[250px] block"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-cyan-600" />
              <span>Pure Solvent (<MathRenderer math="H_2O" />)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500" />
              <span>Concentrated Solution</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-cyan-700 font-semibold">
              <Eye className="w-3.5 h-3.5 text-cyan-600" />
              <span>Applied <MathRenderer math="p > \Pi \implies \text{Reverse Osmosis}" /></span>
            </div>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="space-y-3 pt-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
          Simulation Controls
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {config.controls.map((ctrl) => {
            if (ctrl.type === 'select') {
              return (
                <div
                  key={ctrl.name}
                  className="flex flex-col gap-1.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200"
                >
                  <label className="text-xs font-semibold text-slate-600">
                    {ctrl.label}
                  </label>
                  <select
                    value={controls[ctrl.name] || ctrl.default}
                    onChange={(e) => handleControlChange(ctrl.name, e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-cyan-600 font-mono shadow-sm"
                  >
                    {ctrl.options?.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              );
            }

            return (
              <SliderInput
                key={ctrl.name}
                label={ctrl.label}
                symbol={ctrl.name}
                value={controls[ctrl.name] ?? ctrl.default}
                min={ctrl.min ?? 0}
                max={ctrl.max ?? 100}
                step={ctrl.step ?? 1}
                unit={ctrl.unit || ''}
                onChange={(val) => handleControlChange(ctrl.name, val)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
