import React, { useState, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { GraphConfig } from '../../types/graph';
import { SliderInput } from '../common/SliderInput';
import { generateSeriesData } from '../../utils/graphDataGenerator';
import { TrendingUp, RotateCcw, Info } from 'lucide-react';

interface GraphWidgetProps {
  config: GraphConfig;
}

export const GraphWidget: React.FC<GraphWidgetProps> = ({ config }) => {
  const [controlValues, setControlValues] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    if (config.controls) {
      config.controls.forEach((ctrl) => {
        initial[ctrl.variable] = ctrl.default;
      });
    }
    return initial;
  });

  const handleControlChange = (variable: string, value: number) => {
    setControlValues((prev) => ({
      ...prev,
      [variable]: value
    }));
  };

  const handleReset = () => {
    const initial: Record<string, number> = {};
    if (config.controls) {
      config.controls.forEach((ctrl) => {
        initial[ctrl.variable] = ctrl.default;
      });
    }
    setControlValues(initial);
  };

  const chartOption = useMemo(() => {
    const defaultColors = ['#15009A', '#3B4AEB', '#E11D48', '#059669', '#D97706'];

    const seriesList = config.series.map((s, idx) => {
      const dataPoints = generateSeriesData(s, config, controlValues, 80);
      const isScatter = config.type === 'scatter' || (!s.formula && s.points);
      const color = s.color || defaultColors[idx % defaultColors.length];

      return {
        name: s.name,
        type: isScatter ? 'scatter' : 'line',
        smooth: true,
        showSymbol: isScatter,
        symbolSize: isScatter ? 8 : 3,
        data: dataPoints.map((p) => [p.x, p.y]),
        lineStyle: {
          color: color,
          width: 2.5,
          type: s.dashed ? 'dashed' : 'solid'
        },
        itemStyle: {
          color: color
        }
      };
    });

    if (config.currentPoint) {
      seriesList.push({
        name: config.currentPoint.label || 'Reference Point',
        type: 'scatter',
        smooth: false,
        showSymbol: true,
        symbolSize: 12,
        data: [[config.currentPoint.x, config.currentPoint.y]],
        lineStyle: { color: '#15009A', width: 2, type: 'solid' },
        itemStyle: { color: '#15009A', borderColor: '#ffffff', borderWidth: 2 } as any
      });
    }

    return {
      backgroundColor: 'transparent',
      animation: true,
      animationDuration: 250,
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#FFFFFF',
        borderColor: '#CBD5E1',
        borderWidth: 1,
        textStyle: { color: '#0F172A', fontSize: 12, fontFamily: 'Inter' },
        extraCssText: 'box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.1); border-radius: 8px; padding: 10px;',
        axisPointer: {
          type: 'cross',
          lineStyle: { color: 'rgba(21, 0, 154, 0.4)', type: 'dashed' }
        },
        formatter: (params: any) => {
          if (!params || !params.length) return '';
          let tip = `<div class="font-mono text-xs font-bold text-cyan-800 mb-1">${config.xAxis.label}: ${params[0].value[0]}</div>`;
          params.forEach((item: any) => {
            tip += `<div class="flex items-center justify-between gap-4 text-xs">
              <span style="color:${item.color}">● ${item.seriesName}</span>
              <span class="font-mono font-bold text-slate-800">${item.value[1]}</span>
            </div>`;
          });
          return tip;
        }
      },
      legend: {
        textStyle: { color: '#475569', fontSize: 11, fontFamily: 'Inter' },
        top: 0,
        icon: 'roundRect'
      },
      grid: {
        left: '6%',
        right: '4%',
        bottom: '10%',
        top: '12%',
        containLabel: true
      },
      xAxis: {
        name: config.xAxis.label,
        nameLocation: 'middle',
        nameGap: 28,
        nameTextStyle: { color: '#64748B', fontSize: 11, fontFamily: 'Inter' },
        type: 'value',
        min: config.xAxis.min,
        max: config.xAxis.max,
        axisLine: { lineStyle: { color: '#CBD5E1' } },
        splitLine: { lineStyle: { color: '#F1F5F9' } },
        axisLabel: { color: '#64748B', fontSize: 10, fontFamily: 'Inter' }
      },
      yAxis: {
        name: config.yAxis.label,
        nameLocation: 'middle',
        nameGap: 38,
        nameTextStyle: { color: '#64748B', fontSize: 11, fontFamily: 'Inter' },
        type: 'value',
        min: config.yAxis.min ?? undefined,
        max: config.yAxis.max ?? undefined,
        axisLine: { lineStyle: { color: '#CBD5E1' } },
        splitLine: { lineStyle: { color: '#F1F5F9' } },
        axisLabel: { color: '#64748B', fontSize: 10, fontFamily: 'Inter' }
      },
      series: seriesList
    };
  }, [config, controlValues]);

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-card space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-cyan-700 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-cyan-600" />
            Dynamic Graph
          </span>
          <div>
            <h3 className="text-base font-semibold text-slate-900 tracking-tight">
              {config.title}
            </h3>
          </div>
        </div>

        {config.controls && config.controls.length > 0 && (
          <button
            onClick={handleReset}
            className="px-3.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300 rounded-lg transition-all bg-white hover:bg-slate-50 shadow-sm flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            Reset
          </button>
        )}
      </div>

      {/* Description if present */}
      {config.description && (
        <p className="text-xs text-slate-600 leading-relaxed">
          {config.description}
        </p>
      )}

      {/* Main Chart Container */}
      <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80">
        <div className="w-full h-[340px] md:h-[400px]">
          <ReactECharts
            option={chartOption}
            style={{ height: '100%', width: '100%' }}
            opts={{ renderer: 'canvas' }}
          />
        </div>
      </div>

      {/* Controls & Annotations Footer */}
      <div className="space-y-4">
        {config.controls && config.controls.length > 0 && (
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
              Interactive Curve Modifiers
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {config.controls.map((ctrl) => (
                <SliderInput
                  key={ctrl.variable}
                  label={ctrl.label}
                  symbol={ctrl.variable}
                  value={controlValues[ctrl.variable] ?? ctrl.default}
                  min={ctrl.min}
                  max={ctrl.max}
                  step={ctrl.step}
                  unit={ctrl.unit || ''}
                  onChange={(val) => handleControlChange(ctrl.variable, val)}
                />
              ))}
            </div>
          </div>
        )}

        {config.annotations && config.annotations.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
            <Info className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {config.annotations.map((ann, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-600" />
                  <span>{ann.text || ann.label}</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
