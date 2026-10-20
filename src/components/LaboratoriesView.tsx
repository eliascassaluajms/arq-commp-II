import React, { useState } from 'react';
import { SpeedupSimulator } from './Simulators/SpeedupSimulator';
import { CacheCoherenceSimulator } from './Simulators/CacheCoherenceSimulator';
import { TopologyVisualizer } from './Simulators/TopologyVisualizer';
import { WormholeSimulator } from './Simulators/WormholeSimulator';
import { activityGuides } from '../data/activitiesData';
import { 
  Cpu, 
  Layers, 
  Network, 
  Terminal, 
  Activity, 
  FileCode, 
  Download, 
  Copy, 
  Check, 
  ExternalLink 
} from 'lucide-react';
import { 
  AnimatedActivityIcon, 
  AnimatedMemoryIcon, 
  AnimatedNetworkIcon, 
  AnimatedWormholeIcon, 
  AnimatedCpuIcon 
} from './AnimatedIcons/HardwareIcons';

export const LaboratoriesView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'speedup' | 'coherence' | 'topology' | 'wormhole' | 'python_lab'>('speedup');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const pythonPractice = activityGuides.find(a => a.id === 'act-proc-paralelo') || activityGuides[0];

  const handleCopyCode = () => {
    if (pythonPractice.codeOrDataSnippet) {
      navigator.clipboard.writeText(pythonPractice.codeOrDataSnippet);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 space-y-3 relative overflow-hidden">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping-slow" />
          <span className="font-mono text-xs uppercase tracking-wider font-bold text-cyan-300">
            ENTORNO EXPERIMENTAL Y SIMULACIÓN COMPUTACIONAL
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Laboratorios de Arquitectura de Computadores
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-4xl">
          Simuladores interactivos en tiempo real para experimentar con modelos de aceleración, coherencia de cachés en bus compartido, topologías complejas y conmutación wormhole, complementados con scripts de experimentación empírica.
        </p>
      </div>

      {/* Simulator Selector Tabs */}
      <div className="flex flex-wrap gap-2 bg-slate-900/80 p-2 rounded-2xl border border-white/10">
        <button
          onClick={() => setActiveTab('speedup')}
          className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all active:scale-95 ${
            activeTab === 'speedup'
              ? 'bg-cyan-500 text-black font-extrabold shadow-md shadow-cyan-500/20'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <AnimatedActivityIcon size="sm" />
          <span>1. Ley de Amdahl / Speedup</span>
        </button>

        <button
          onClick={() => setActiveTab('coherence')}
          className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all active:scale-95 ${
            activeTab === 'coherence'
              ? 'bg-cyan-500 text-black font-extrabold shadow-md shadow-cyan-500/20'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <AnimatedMemoryIcon size="sm" />
          <span>2. Coherencia Snoopy (MESI)</span>
        </button>

        <button
          onClick={() => setActiveTab('topology')}
          className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all active:scale-95 ${
            activeTab === 'topology'
              ? 'bg-cyan-500 text-black font-extrabold shadow-md shadow-cyan-500/20'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <AnimatedNetworkIcon size="sm" />
          <span>3. Topologías de Red</span>
        </button>

        <button
          onClick={() => setActiveTab('wormhole')}
          className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all active:scale-95 ${
            activeTab === 'wormhole'
              ? 'bg-cyan-500 text-black font-extrabold shadow-md shadow-cyan-500/20'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <AnimatedWormholeIcon size="sm" />
          <span>4. Conmutación Wormhole</span>
        </button>

        <button
          onClick={() => setActiveTab('python_lab')}
          className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all active:scale-95 ${
            activeTab === 'python_lab'
              ? 'bg-cyan-500 text-black font-extrabold shadow-md shadow-cyan-500/20'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <AnimatedCpuIcon size="sm" />
          <span>5. Script Práctica Python</span>
        </button>
      </div>

      {/* Render Selected Simulator Component */}
      <div>
        {activeTab === 'speedup' && <SpeedupSimulator />}
        {activeTab === 'coherence' && <CacheCoherenceSimulator />}
        {activeTab === 'topology' && <TopologyVisualizer />}
        {activeTab === 'wormhole' && <WormholeSimulator />}

        {/* Python Practice Code Runner & Instruction Guide */}
        {activeTab === 'python_lab' && (
          <div className="glass-panel-glow rounded-3xl p-6 sm:p-10 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <span className="font-mono text-xs font-bold text-cyan-400">
                  GUÍA DE PRÁCTICA OFICIAL • SCRIPT MULTIPROCESSING
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
                  Análisis Empírico de Rendimiento Secuencial vs Paralelo
                </h3>
              </div>

              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs transition-all active:scale-95 shadow-md shadow-cyan-500/20 self-start sm:self-auto"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? '¡Código Copiado!' : 'Copiar Script Python'}</span>
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <p>
                Este script corresponde al laboratorio oficial de la asignatura. Ejecuta una carga de trabajo aritméticamente intensiva (20 millones de operaciones por ciclo) comparando el tiempo secuencial monocore con la distribución balanceada a través de un pool de procesos en paralelo.
              </p>

              {/* Code block */}
              <div className="bg-slate-950 rounded-2xl border border-white/10 overflow-hidden font-mono text-xs shadow-2xl">
                <div className="flex justify-between items-center bg-slate-900/90 px-4 py-2 border-b border-white/10 text-slate-400 text-[11px]">
                  <span>multiprocesador/practica.py</span>
                  <span>Python 3.9+</span>
                </div>
                <pre className="p-4 sm:p-6 overflow-x-auto text-cyan-300/90 leading-relaxed">
                  <code>{pythonPractice.codeOrDataSnippet}</code>
                </pre>
              </div>

              {/* Execution steps */}
              <div className="bg-slate-900/60 p-4 rounded-xl border border-white/5 space-y-2">
                <strong className="text-white block font-semibold">
                  Instrucciones para la Ejecución en Máquinas del Laboratorio:
                </strong>
                <ol className="list-decimal list-inside space-y-1 text-slate-300">
                  <li>Guardar el código en un archivo llamado <code className="bg-slate-800 px-1.5 py-0.5 rounded text-cyan-300">practica.py</code>.</li>
                  <li>Ejecutar en la terminal: <code className="bg-slate-800 px-1.5 py-0.5 rounded text-cyan-300">python3 practica.py</code>.</li>
                  <li>Variar la cantidad de CPUs probando con 1, 2, 4 y el máximo de núcleos lógicos disponibles en su procesador.</li>
                  <li>Completar la tabla de resultados para el informe con Speedup, Eficiencia y Porcentaje de Mejora.</li>
                </ol>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
