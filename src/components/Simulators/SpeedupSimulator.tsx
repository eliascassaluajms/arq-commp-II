import React, { useState } from 'react';
import { Cpu, Zap, Activity, Info, TrendingUp, RefreshCw } from 'lucide-react';

export const SpeedupSimulator: React.FC = () => {
  const [cores, setCores] = useState<number>(8);
  const [parallelFraction, setParallelFraction] = useState<number>(0.85); // 85%
  const [baseTimeSec, setBaseTimeSec] = useState<number>(100); // 100 seconds

  // Calculations
  const f = parallelFraction;
  const seqFraction = 1 - f;
  
  // Amdahl's Law
  const amdahlSpeedup = 1 / (seqFraction + (f / cores));
  const amdahlMaxLimit = 1 / seqFraction;
  const parallelTimeAmdahl = baseTimeSec / amdahlSpeedup;
  const efficiencyAmdahl = (amdahlSpeedup / cores) * 100;

  // Gustafson's Law
  const gustafsonSpeedup = cores - seqFraction * (cores - 1);

  // Time reduction percentage
  const timeReduction = ((baseTimeSec - parallelTimeAmdahl) / baseTimeSec) * 100;

  return (
    <div className="glass-panel-glow rounded-2xl p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <TrendingUp className="w-5 h-5 animate-pulse-subtle" />
            </span>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Simulador Interactivo de Speedup y Eficiencia
            </h3>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Modela en tiempo real la Ley de Amdahl (Carga Fija) y la Ley de Gustafson (Carga Escalada)
          </p>
        </div>

        <button
          onClick={() => { setCores(8); setParallelFraction(0.85); setBaseTimeSec(100); }}
          className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition-colors border border-white/5 active:scale-95"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Restablecer
        </button>
      </div>

      {/* Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Slider 1: Cores */}
        <div className="bg-slate-900/60 p-4 rounded-xl border border-white/5 space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-300 font-medium flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-cyan-400" />
              Procesadores (p):
            </span>
            <span className="font-mono font-bold text-cyan-400 bg-cyan-950/60 px-2.5 py-0.5 rounded border border-cyan-800/50">
              {cores} núcleos
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={64}
            step={1}
            value={cores}
            onChange={(e) => setCores(parseInt(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
          />
          <div className="flex justify-between text-[11px] text-slate-500 font-mono">
            <span>1</span>
            <span>16</span>
            <span>32</span>
            <span>64</span>
          </div>
        </div>

        {/* Slider 2: Parallel Fraction */}
        <div className="bg-slate-900/60 p-4 rounded-xl border border-white/5 space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-300 font-medium flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" />
              Fracción Paralela (f):
            </span>
            <span className="font-mono font-bold text-amber-400 bg-amber-950/60 px-2.5 py-0.5 rounded border border-amber-800/50">
              {(parallelFraction * 100).toFixed(0)}%
            </span>
          </div>
          <input
            type="range"
            min={0.10}
            max={0.99}
            step={0.01}
            value={parallelFraction}
            onChange={(e) => setParallelFraction(parseFloat(e.target.value))}
            className="w-full accent-amber-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
          />
          <div className="flex justify-between text-[11px] text-slate-500 font-mono">
            <span>10%</span>
            <span>Secuencial: {(seqFraction * 100).toFixed(0)}%</span>
            <span>99%</span>
          </div>
        </div>

        {/* Slider 3: Base Execution Time */}
        <div className="bg-slate-900/60 p-4 rounded-xl border border-white/5 space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-300 font-medium flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-emerald-400" />
              Tiempo Secuencial (T₁):
            </span>
            <span className="font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-800/50">
              {baseTimeSec} s
            </span>
          </div>
          <input
            type="range"
            min={10}
            max={300}
            step={5}
            value={baseTimeSec}
            onChange={(e) => setBaseTimeSec(parseInt(e.target.value))}
            className="w-full accent-emerald-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
          />
          <div className="flex justify-between text-[11px] text-slate-500 font-mono">
            <span>10s</span>
            <span>150s</span>
            <span>300s</span>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Speedup Card */}
        <div className="bg-slate-900/80 p-4 rounded-xl border border-cyan-500/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-xl group-hover:bg-cyan-500/10 transition-all pointer-events-none" />
          <span className="text-xs uppercase font-bold tracking-wider text-cyan-400 block mb-1">
            Speedup Amdahl (S)
          </span>
          <div className="text-3xl font-extrabold font-mono text-white tracking-tight">
            {amdahlSpeedup.toFixed(2)}x
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">
            Límite asintótico máx: <strong className="text-cyan-300 font-mono">{amdahlMaxLimit.toFixed(2)}x</strong>
          </span>
        </div>

        {/* Efficiency Card */}
        <div className="bg-slate-900/80 p-4 rounded-xl border border-amber-500/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl group-hover:bg-amber-500/10 transition-all pointer-events-none" />
          <span className="text-xs uppercase font-bold tracking-wider text-amber-400 block mb-1">
            Eficiencia (E)
          </span>
          <div className="text-3xl font-extrabold font-mono text-white tracking-tight">
            {efficiencyAmdahl.toFixed(1)}%
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">
            Aprovechamiento de los {cores} núcleos
          </span>
        </div>

        {/* Gustafson Card */}
        <div className="bg-slate-900/80 p-4 rounded-xl border border-purple-500/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-xl group-hover:bg-purple-500/10 transition-all pointer-events-none" />
          <span className="text-xs uppercase font-bold tracking-wider text-purple-400 block mb-1">
            Speedup Gustafson
          </span>
          <div className="text-3xl font-extrabold font-mono text-white tracking-tight">
            {gustafsonSpeedup.toFixed(2)}x
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">
            Modelo de carga escalada
          </span>
        </div>

        {/* Execution Time Parallel */}
        <div className="bg-slate-900/80 p-4 rounded-xl border border-emerald-500/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl group-hover:bg-emerald-500/10 transition-all pointer-events-none" />
          <span className="text-xs uppercase font-bold tracking-wider text-emerald-400 block mb-1">
            Tiempo Paralelo (T_p)
          </span>
          <div className="text-3xl font-extrabold font-mono text-white tracking-tight">
            {parallelTimeAmdahl.toFixed(2)} s
          </div>
          <span className="text-[11px] text-emerald-400 block mt-1">
            ↓ Reducción de tiempo del {timeReduction.toFixed(1)}%
          </span>
        </div>
      </div>

      {/* Visual Execution Timeline Comparison */}
      <div className="bg-slate-900/70 p-5 rounded-xl border border-white/5 space-y-4">
        <h4 className="text-xs uppercase font-bold tracking-wider text-slate-300 flex items-center gap-2">
          <span>Comparativa Gráfica de Tiempos de Ejecución</span>
        </h4>

        {/* Bar 1: Sequential */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-300 font-medium">Secuencial (1 Núcleo):</span>
            <span className="text-slate-400">{baseTimeSec.toFixed(1)} s</span>
          </div>
          <div className="h-6 w-full bg-slate-800 rounded-lg overflow-hidden flex border border-white/5">
            <div 
              style={{ width: `${seqFraction * 100}%` }} 
              className="bg-rose-500/80 flex items-center justify-center text-[10px] font-mono text-white font-bold"
              title={`Fracción Secuencial (${(seqFraction * 100).toFixed(0)}%)`}
            >
              Sec ({ (seqFraction * 100).toFixed(0) }%)
            </div>
            <div 
              style={{ width: `${f * 100}%` }} 
              className="bg-cyan-500/80 flex items-center justify-center text-[10px] font-mono text-white font-bold"
              title={`Fracción Paralelizable (${(f * 100).toFixed(0)}%)`}
            >
              Paralelo ({ (f * 100).toFixed(0) }%)
            </div>
          </div>
        </div>

        {/* Bar 2: Parallel */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-cyan-400 font-medium">Paralelo ({cores} Núcleos):</span>
            <span className="text-cyan-400 font-bold">{parallelTimeAmdahl.toFixed(1)} s</span>
          </div>
          <div className="h-6 w-full bg-slate-800 rounded-lg overflow-hidden flex border border-white/5">
            {/* The sequential part does not shrink */}
            <div 
              style={{ width: `${(baseTimeSec * seqFraction / baseTimeSec) * 100}%` }} 
              className="bg-rose-500 flex items-center justify-center text-[10px] font-mono text-white font-bold shadow-sm"
              title={`Parte Secuencial Intacta (${(baseTimeSec * seqFraction).toFixed(1)}s)`}
            >
              {(baseTimeSec * seqFraction).toFixed(1)}s
            </div>
            {/* The parallel part shrinks by cores */}
            <div 
              style={{ width: `${((baseTimeSec * f / cores) / baseTimeSec) * 100}%` }} 
              className="bg-cyan-500 flex items-center justify-center text-[10px] font-mono text-black font-extrabold shadow-sm animate-pulse-subtle"
              title={`Parte Paralelizada (${(baseTimeSec * f / cores).toFixed(1)}s)`}
            >
              {(baseTimeSec * f / cores).toFixed(1)}s
            </div>
            {/* Empty space = saved time */}
            <div 
              className="bg-emerald-950/40 flex-1 flex items-center justify-center text-[10px] font-mono text-emerald-400/70 border-l border-emerald-500/20"
              title={`Tiempo Ahorrado (${(baseTimeSec - parallelTimeAmdahl).toFixed(1)}s)`}
            >
              Tiempo Ahorrado: {(baseTimeSec - parallelTimeAmdahl).toFixed(1)}s
            </div>
          </div>
        </div>
      </div>

      {/* Pedagogical Insight */}
      <div className="bg-cyan-950/30 border border-cyan-500/30 rounded-xl p-4 flex gap-3 items-start">
        <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300 leading-relaxed space-y-1">
          <strong className="text-cyan-200 block text-sm font-semibold">
            Conclusión Pedagógica de Arquitectura:
          </strong>
          <p>
            Con una fracción secuencial de <strong>{(seqFraction * 100).toFixed(0)}%</strong>, la Ley de Amdahl demuestra que aunque invirtamos en una supercomputadora con 10,000 núcleos, el Speedup jamás superará <strong>{amdahlMaxLimit.toFixed(2)}x</strong>. Para lograr alta aceleración, la prioridad del ingeniero informático es minimizar la porción estrictamente secuencial del software.
          </p>
        </div>
      </div>
    </div>
  );
};
