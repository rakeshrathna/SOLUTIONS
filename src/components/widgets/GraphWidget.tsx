import React, { useState, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { GraphConfig } from '../../types/graph';
import { SliderInput } from '../common/SliderInput';
import { generateSeriesData } from '../../utils/graphDataGenerator';
import { evaluateFormula } from '../../utils/formulaEvaluator';
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
    const defaultColors = ['rgb(21, 0, 154)', '#3B4AEB', '#E11D48', '#059669', '#D97706'];

    // Dynamic active point based on X-axis slider control
    const activeX = controlValues.x_slider ?? controlValues.x2_slider ?? controlValues.T_slider ?? controlValues.m_slider;
    let activeY: number | undefined = undefined;

    if (activeX !== undefined && config.series.length > 0) {
      const mainSeries = config.series.find((s) => s.formula && !s.dashed) || config.series[0];
      if (mainSeries && mainSeries.formula) {
        const scope = {
          ...controlValues,
          [config.xAxis.variable]: activeX,
          x: activeX,
          x2: activeX,
          T: activeX,
          m: activeX
        };
        activeY = parseFloat(evaluateFormula(mainSeries.formula, scope).toFixed(2));
      }
    }

    // Reference coordinates: dynamic active point if activeX exists, else fallback
    const refX = activeX !== undefined ? activeX : (config.currentPoint?.x ?? 0.015);
    const refY = activeY !== undefined ? activeY : (config.currentPoint?.y ?? 600);

    // Dynamic reference lines connecting axes to (refX, refY)
    const markLineData: any[] = [
      [
        { coord: [0, refY] },
        { coord: [refX, refY] }
      ],
      [
        { coord: [refX, 0] },
        { coord: [refX, refY] }
      ]
    ];

    // Point A or dynamic coordinate label
    const isDefaultA = Math.abs(refX - 0.015) < 0.0005 && Math.abs(refY - 600) < 5;
    const pointLabel = isDefaultA ? 'A' : `(${refX}, ${Math.round(refY)})`;

    const markPointData: any[] = [
      {
        name: 'Active Point',
        coord: [refX, refY],
        symbol: 'circle',
        symbolSize: 13,
        itemStyle: {
          color: 'rgb(21, 0, 154)',
          borderColor: '#ffffff',
          borderWidth: 2.5,
          shadowBlur: 5,
          shadowColor: 'rgba(21, 0, 154, 0.4)'
        },
        label: {
          show: true,
          formatter: pointLabel,
          position: 'right',
          color: '#0f172a',
          fontWeight: 'bold',
          fontSize: 16,
          distance: 8
        }
      }
    ];

    const seriesList: any[] = config.series.map((s, idx) => {
      const dataPoints = generateSeriesData(s, config, controlValues, 80);
      const isScatter = s.points !== undefined || (config.type === 'scatter' && !s.formula);
      const color = s.color || defaultColors[idx % defaultColors.length];
      const isFirstSeries = idx === 0;

      return {
        name: s.name,
        type: isScatter ? 'scatter' : 'line',
        smooth: false,
        showSymbol: isScatter,
        symbol: 'circle',
        symbolSize: isScatter ? 10 : 0,
        data: dataPoints.map((p) => [p.x, p.y]),
        lineStyle: {
          color: color,
          width: isScatter ? 0 : 3,
          type: s.dashed ? 'dashed' : 'solid'
        },
        itemStyle: {
          color: color,
          borderColor: '#ffffff',
          borderWidth: isScatter ? 2 : 0
        },
        markLine: isFirstSeries ? {
          symbol: ['none', 'none'],
          silent: true,
          animation: true,
          lineStyle: {
            color: '#1e293b',
            type: 'dashed',
            width: 1.5
          },
          label: { show: false },
          data: markLineData
        } : undefined,
        markPoint: isFirstSeries ? {
          silent: true,
          animation: true,
          data: markPointData
        } : undefined
      };
    });

    return {
      backgroundColor: 'transparent',
      animation: true,
      animationDuration: 200,
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
        left: '8%',
        right: '5%',
        bottom: '12%',
        top: '10%',
        containLabel: true
      },
      xAxis: {
        name: config.xAxis.label,
        nameLocation: 'middle',
        nameGap: 34,
        nameTextStyle: { color: '#334155', fontSize: 11, fontWeight: 600, fontFamily: 'Inter' },
        type: 'value',
        min: config.xAxis.min,
        max: controlValues.x_max ?? config.xAxis.max,
        interval: config.id === 'henrys-law' ? 0.005 : undefined,
        axisLine: { lineStyle: { color: '#475569', width: 1.5 } },
        splitLine: { lineStyle: { color: '#F1F5F9' } },
        axisLabel: {
          color: '#475569',
          fontSize: 11,
          fontFamily: 'Inter',
          formatter: (val: number) => {
            if (config.id === 'henrys-law') {
              const v = parseFloat(val.toFixed(4));
              const curRefX = parseFloat(refX.toFixed(4));
              if (v === 0) return '0';
              if (Math.abs(v - curRefX) < 0.0004) return `{bold|${curRefX}}`;
              if (v === 0.010) return '0.010';
              if (v === 0.015) return '0.015';
              if (v === 0.020) return '0.020';
              return '';
            }
            return val.toString();
          },
          rich: {
            bold: {
              fontWeight: 'bold',
              color: '#0f172a',
              fontSize: 12
            }
          }
        }
      },
      yAxis: {
        name: config.yAxis.label,
        nameLocation: 'middle',
        nameGap: 42,
        nameTextStyle: { color: '#334155', fontSize: 11, fontWeight: 600, fontFamily: 'Inter' },
        type: 'value',
        min: config.yAxis.min ?? undefined,
        max: controlValues.p_max ?? controlValues.y_max ?? config.yAxis.max ?? undefined,
        interval: config.id === 'henrys-law' ? 100 : undefined,
        axisLine: { lineStyle: { color: '#475569', width: 1.5 } },
        splitLine: { lineStyle: { color: '#F1F5F9' } },
        axisLabel: {
          color: '#475569',
          fontSize: 11,
          fontFamily: 'Inter',
          formatter: (val: number) => {
            if (config.id === 'henrys-law') {
              const v = Math.round(val);
              const curRefY = Math.round(refY);
              if (v === 0) return '0';
              if (Math.abs(v - curRefY) < 25) return `{bold|${curRefY}}`;
              if (v === 500) return '500';
              if (v === 600) return '600';
              if (v === 1000) return '1000';
              return '';
            }
            return val.toString();
          },
          rich: {
            bold: {
              fontWeight: 'bold',
              color: '#0f172a',
              fontSize: 12
            }
          }
        }
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
