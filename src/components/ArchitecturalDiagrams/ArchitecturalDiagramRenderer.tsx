import React, { useState } from 'react';
import { 
  Cpu, 
  Layers, 
  Network, 
  Shuffle, 
  Server, 
  Cloud, 
  Activity, 
  Maximize2, 
  Minimize2, 
  Info,
  CheckCircle2,
  Zap,
  ArrowRight
} from 'lucide-react';

export type DiagramType = 
  | 'flynn' 
  | 'cores' 
  | 'speedup' 
  | 'network' 
  | 'wormhole' 
  | 'smp_numa' 
  | 'coherence' 
  | 'directory' 
  | 'embedded' 
  | 'cloud' 
  | 'cluster';

interface ArchitecturalDiagramProps {
  type: DiagramType;
  title?: string;
  className?: string;
  allowExpand?: boolean;
}

export const ArchitecturalDiagramRenderer: React.FC<ArchitecturalDiagramProps> = ({
  type,
  title,
  className = '',
  allowExpand = true
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [activeElement, setActiveElement] = useState<string | null>(null);

  // 1. FLYNN'S TAXONOMY DIAGRAM
  const renderFlynnDiagram = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        {/* SISD */}
        <div 
          onClick={() => setActiveElement('sisd')}
          className={`p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
            activeElement === 'sisd' 
              ? 'bg-slate-800/90 border-cyan-400 shadow-lg shadow-cyan-500/10' 
              : 'bg-slate-900/60 border-white/10 hover:border-cyan-500/40'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono font-bold text-cyan-300 text-sm">SISD</span>
            <span className="text-[10px] bg-cyan-950 text-cyan-400 px-2 py-0.5 rounded border border-cyan-800">
              Von Neumann Clásico
            </span>
          </div>
          <p className="text-slate-300 mb-3 text-[11px]">Single Instruction, Single Data</p>
          <div className="flex items-center justify-center gap-2 p-3 bg-black/40 rounded-lg border border-white/5 font-mono text-[10px]">
            <span className="px-2 py-1 rounded bg-slate-800 text-cyan-300 border border-cyan-500/30">CU</span>
            <span className="text-cyan-400 animate-pulse">➔</span>
            <span className="px-2 py-1 rounded bg-slate-800 text-emerald-300 border border-emerald-500/30">ALU</span>
            <span className="text-emerald-400 animate-pulse">➔</span>
            <span className="px-2 py-1 rounded bg-slate-800 text-amber-300 border border-amber-500/30">Memoria</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-2">Ej: Computador clásico mononúcleo (8086, Pentium original).</p>
        </div>

        {/* SIMD */}
        <div 
          onClick={() => setActiveElement('simd')}
          className={`p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
            activeElement === 'simd' 
              ? 'bg-slate-800/90 border-emerald-400 shadow-lg shadow-emerald-500/10' 
              : 'bg-slate-900/60 border-white/10 hover:border-emerald-500/40'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono font-bold text-emerald-300 text-sm">SIMD</span>
            <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800">
              Vectorial / GPU
            </span>
          </div>
          <p className="text-slate-300 mb-3 text-[11px]">Single Instruction, Multiple Data</p>
          <div className="flex items-center justify-center gap-2 p-3 bg-black/40 rounded-lg border border-white/5 font-mono text-[10px]">
            <span className="px-2 py-1 rounded bg-slate-800 text-cyan-300 border border-cyan-500/30 self-center">1 CU</span>
            <span className="text-cyan-400">➔</span>
            <div className="flex flex-col gap-1">
              <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-[9px]">ALU 1 (Dato 1)</span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-[9px]">ALU 2 (Dato 2)</span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-[9px]">ALU n (Dato n)</span>
            </div>
          </div>
          <p className="text-[10px] text-slate-400 mt-2">Ej: GPUs NVIDIA CUDA, extensiones Intel AVX-512, NEON.</p>
        </div>

        {/* MISD */}
        <div 
          onClick={() => setActiveElement('misd')}
          className={`p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
            activeElement === 'misd' 
              ? 'bg-slate-800/90 border-purple-400 shadow-lg shadow-purple-500/10' 
              : 'bg-slate-900/60 border-white/10 hover:border-purple-500/40'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono font-bold text-purple-300 text-sm">MISD</span>
            <span className="text-[10px] bg-purple-950 text-purple-400 px-2 py-0.5 rounded border border-purple-800">
              Tolerancia a Fallos
            </span>
          </div>
          <p className="text-slate-300 mb-3 text-[11px]">Multiple Instruction, Single Data</p>
          <div className="flex items-center justify-center gap-2 p-3 bg-black/40 rounded-lg border border-white/5 font-mono text-[10px]">
            <div className="flex flex-col gap-1">
              <span className="px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/40 text-[9px]">Algoritmo A</span>
              <span className="px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/40 text-[9px]">Algoritmo B</span>
            </div>
            <span className="text-purple-400">➔</span>
            <span className="px-2 py-1 rounded bg-slate-800 text-amber-300 border border-amber-500/30">Mismo Dato</span>
            <span className="text-purple-400">➔</span>
            <span className="px-1.5 py-0.5 rounded bg-slate-800 text-purple-300 text-[9px]">Votador</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-2">Ej: Sistemas de aviónica crítica, naves espaciales, filtros sistólicos.</p>
        </div>

        {/* MIMD */}
        <div 
          onClick={() => setActiveElement('mimd')}
          className={`p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
            activeElement === 'mimd' 
              ? 'bg-slate-800/90 border-amber-400 shadow-lg shadow-amber-500/10' 
              : 'bg-slate-900/60 border-white/10 hover:border-amber-500/40'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono font-bold text-amber-300 text-sm">MIMD</span>
            <span className="text-[10px] bg-amber-950 text-amber-400 px-2 py-0.5 rounded border border-amber-800">
              Multiprocesadores / Clusters
            </span>
          </div>
          <p className="text-slate-300 mb-3 text-[11px]">Multiple Instruction, Multiple Data</p>
          <div className="flex items-center justify-center gap-3 p-3 bg-black/40 rounded-lg border border-white/5 font-mono text-[10px]">
            <div className="flex flex-col gap-1">
              <span className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 border border-cyan-500/40 text-[9px]">CPU 1 (H1, D1)</span>
              <span className="px-1.5 py-0.5 rounded bg-slate-800 text-emerald-300 border border-emerald-500/40 text-[9px]">CPU 2 (H2, D2)</span>
            </div>
            <span className="text-amber-400 animate-pulse">⇄</span>
            <span className="px-2 py-1 rounded bg-amber-950 text-amber-300 border border-amber-500/30">Bus / Red Intercon.</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-2">Ej: Servidores multinúcleo Xeon/EPYC, clusters Beowulf MPI.</p>
        </div>
      </div>
    </div>
  );

  // 2. TRIPLE WALL & MULTI-CORE HARDWARE DIAGRAM
  const renderCoresDiagram = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Monolithic vs Multicore */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-white border-b border-white/10 pb-2">
            <span className="text-rose-400">1. CPU Monolítico Satúrado (2004)</span>
            <span className="font-mono text-rose-400">~3.8 GHz</span>
          </div>
          <div className="relative p-6 rounded-xl bg-rose-950/20 border border-rose-500/30 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-2xl bg-rose-900/40 border-2 border-rose-500/60 flex flex-col items-center justify-center text-rose-200 animate-pulse">
              <Cpu className="w-8 h-8 text-rose-400 mb-1" />
              <span className="text-[10px] font-mono font-bold">1 Núcleo</span>
            </div>
            <div className="mt-3 text-[11px] text-rose-300 space-y-1">
              <p>🔥 <strong>Power Wall:</strong> &gt;130W TDP imposible de disipar.</p>
              <p>⏳ <strong>Memory Wall:</strong> Cientos de ciclos esperando RAM.</p>
              <p>🚫 <strong>ILP Wall:</strong> Retornos decrecientes en ejecución fuera de orden.</p>
            </div>
          </div>
        </div>

        {/* Multicore Architecture */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-cyan-500/30 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-white border-b border-white/10 pb-2">
            <span className="text-cyan-400">2. CPU Multinúcleo Eficiente (Actual)</span>
            <span className="font-mono text-cyan-400">N Núcleos Paralelos</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-cyan-500/20 space-y-2">
            <div className="grid grid-cols-4 gap-1.5">
              {[1, 2, 3, 4].map(core => (
                <div key={core} className="p-2 rounded-lg bg-slate-800 border border-cyan-500/30 text-center">
                  <div className="text-[10px] font-bold text-cyan-300">Core {core}</div>
                  <div className="text-[8px] text-slate-400 font-mono">L1 / L2</div>
                </div>
              ))}
            </div>
            {/* Shared L3 & Interconnect */}
            <div className="p-2 rounded-lg bg-cyan-950/40 border border-cyan-500/40 text-center">
              <span className="text-[10px] font-mono font-bold text-cyan-300 animate-pulse">
                Caché L3 Compartida + Anillo de Interconexión (Ring Bus)
              </span>
            </div>
            <div className="flex justify-between items-center px-2 text-[10px] text-slate-400 font-mono">
              <span>Controlador DDR5</span>
              <span>Bus PCIe 5.0</span>
            </div>
          </div>
          <p className="text-[11px] text-emerald-300">
            ✔ Escalamiento horizontal: Menor frecuencia por núcleo = Menor voltaje = Consumo cúbicamente inferior.
          </p>
        </div>
      </div>
    </div>
  );

  // 3. SPEEDUP AMDAHL VS GUSTAFSON DIAGRAM
  const renderSpeedupDiagram = () => (
    <div className="space-y-4">
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-3">
        <div className="flex items-center justify-between text-xs border-b border-white/10 pb-2">
          <span className="font-bold text-white">Comparación de Curvas: Amdahl vs Gustafson</span>
          <span className="text-[11px] text-cyan-400 font-mono">N = 1 a 64 Cores</span>
        </div>

        {/* SVG Speedup Curves Visualization */}
        <div className="relative h-48 w-full bg-slate-950 rounded-xl border border-white/5 p-3 overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 500 160">
            {/* Grid Lines */}
            <line x1="40" y1="20" x2="480" y2="20" stroke="#1e293b" strokeDasharray="3,3" />
            <line x1="40" y1="60" x2="480" y2="60" stroke="#1e293b" strokeDasharray="3,3" />
            <line x1="40" y1="100" x2="480" y2="100" stroke="#1e293b" strokeDasharray="3,3" />
            <line x1="40" y1="140" x2="480" y2="140" stroke="#475569" />
            <line x1="40" y1="10" x2="40" y2="140" stroke="#475569" />

            {/* Labels */}
            <text x="35" y="25" fill="#64748b" fontSize="9" textAnchor="end">Speedup</text>
            <text x="460" y="152" fill="#64748b" fontSize="9" textAnchor="end">N Procesadores →</text>

            {/* Amdahl Asymptotic Ceiling (Red/Amber dashed) */}
            <path 
              d="M 40 140 Q 150 70 480 62" 
              fill="none" 
              stroke="#f59e0b" 
              strokeWidth="2.5" 
            />
            {/* Amdahl Asymptote Limit */}
            <line x1="40" y1="60" x2="480" y2="60" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,4" />
            <text x="475" y="55" fill="#ef4444" fontSize="9" textAnchor="end">Asíntota Amdahl: 1/(1-f)</text>

            {/* Gustafson Linear Scaled (Cyan line) */}
            <path 
              d="M 40 140 L 480 30" 
              fill="none" 
              stroke="#06b6d4" 
              strokeWidth="2.5" 
            />
            <text x="450" y="26" fill="#06b6d4" fontSize="9" textAnchor="end">Gustafson (Escalado)</text>

            {/* Linear Ideal (Green dashed) */}
            <path 
              d="M 40 140 L 480 15" 
              fill="none" 
              stroke="#10b981" 
              strokeWidth="1.5" 
              strokeDasharray="2,2" 
            />
          </svg>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs pt-1">
          <div className="p-2.5 rounded-xl bg-amber-950/20 border border-amber-500/30">
            <strong className="text-amber-400 block mb-1">Ley de Amdahl (Problema Fijo):</strong>
            <p className="text-[11px] text-slate-300">
              La parte secuencial $(1-f)$ impone un límite superior insuperable sin importar cuántos núcleos se añadan.
            </p>
          </div>
          <div className="p-2.5 rounded-xl bg-cyan-950/20 border border-cyan-500/30">
            <strong className="text-cyan-400 block mb-1">Ley de Gustafson (Problema Escalado):</strong>
            <p className="text-[11px] text-slate-300">
              Al aumentar el tamaño del problema con más procesadores, la aceleración escala casi linealmente.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // 4. TOPOLOGIES MATRIX DIAGRAM
  const renderNetworkDiagram = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        {/* 2D Mesh */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10 text-center space-y-2">
          <div className="font-bold text-cyan-400">Malla 2D (Mesh)</div>
          <div className="h-16 flex items-center justify-center">
            <div className="grid grid-cols-3 gap-2">
              {[...Array(9)].map((_, i) => (
                <span key={i} className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse-subtle" />
              ))}
            </div>
          </div>
          <div className="text-[10px] text-slate-400 font-mono space-y-0.5">
            <div>Diámetro: 2(k - 1)</div>
            <div>Grado: 4</div>
          </div>
        </div>

        {/* 2D Torus */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10 text-center space-y-2">
          <div className="font-bold text-emerald-400">Toro 2D (Torus)</div>
          <div className="h-16 flex items-center justify-center relative">
            <div className="w-12 h-12 rounded-full border-2 border-emerald-400/40 flex items-center justify-center animate-spin-slow">
              <span className="w-3 h-3 rounded-full bg-emerald-400" />
            </div>
          </div>
          <div className="text-[10px] text-slate-400 font-mono space-y-0.5">
            <div>Diámetro: k</div>
            <div>Wrap-around links</div>
          </div>
        </div>

        {/* Hypercube 3D */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10 text-center space-y-2">
          <div className="font-bold text-purple-400">Hipercubo 3D (Q3)</div>
          <div className="h-16 flex items-center justify-center">
            <div className="w-10 h-10 border border-purple-400/60 relative animate-float-slow">
              <div className="absolute -top-2 -left-2 w-10 h-10 border border-purple-300/40" />
            </div>
          </div>
          <div className="text-[10px] text-slate-400 font-mono space-y-0.5">
            <div>Diámetro: log₂ N</div>
            <div>Grado: n</div>
          </div>
        </div>

        {/* Crossbar */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10 text-center space-y-2">
          <div className="font-bold text-amber-400">Crossbar NxN</div>
          <div className="h-16 flex items-center justify-center">
            <div className="grid grid-cols-4 gap-1">
              {[...Array(16)].map((_, i) => (
                <span key={i} className="w-1.5 h-1.5 rounded-sm bg-amber-400/60" />
              ))}
            </div>
          </div>
          <div className="text-[10px] text-slate-400 font-mono space-y-0.5">
            <div>Diámetro: 1 (Sin bloqueo)</div>
            <div>Costo: O(N²)</div>
          </div>
        </div>
      </div>
    </div>
  );

  // 5. WORMHOLE ROUTING DIAGRAM
  const renderWormholeDiagram = () => (
    <div className="space-y-4">
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-cyan-500/30 space-y-3">
        <div className="flex items-center justify-between text-xs font-bold border-b border-white/10 pb-2">
          <span className="text-cyan-400">Tubería de Flits en Conmutación Wormhole</span>
          <span className="text-[10px] font-mono text-slate-400">Buffer Mínimo por Enrutador</span>
        </div>

        {/* Visual Pipeline */}
        <div className="p-4 bg-slate-950 rounded-xl border border-white/5 space-y-4">
          <div className="flex items-center justify-between gap-2 overflow-x-auto py-2">
            {/* Router 0 */}
            <div className="p-3 rounded-xl bg-slate-800 border border-white/10 text-center min-w-[90px]">
              <span className="text-[10px] font-mono text-slate-400 block mb-1">Router R₀</span>
              <span className="px-2 py-1 rounded bg-slate-700 text-slate-300 font-mono text-[9px]">Tail Flit</span>
            </div>

            <div className="text-cyan-400 animate-pulse font-mono">────►</div>

            {/* Router 1 */}
            <div className="p-3 rounded-xl bg-slate-800 border border-cyan-500/40 text-center min-w-[90px]">
              <span className="text-[10px] font-mono text-cyan-400 block mb-1">Router R₁</span>
              <span className="px-2 py-1 rounded bg-cyan-950 text-cyan-300 font-mono text-[9px] border border-cyan-500/40">Body Flit</span>
            </div>

            <div className="text-cyan-400 animate-pulse font-mono">────►</div>

            {/* Router 2 */}
            <div className="p-3 rounded-xl bg-slate-800 border border-emerald-500/40 text-center min-w-[90px]">
              <span className="text-[10px] font-mono text-emerald-400 block mb-1">Router R₂</span>
              <span className="px-2 py-1 rounded bg-emerald-950 text-emerald-300 font-mono text-[9px] border border-emerald-500/40">Head Flit</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-300 space-y-1">
            <p>• <strong>Head Flit (Verde):</strong> Contiene la dirección de destino; reserva los canales virtuales en cada enrutador.</p>
            <p>• <strong>Body Flits (Cian):</strong> Transportan la carga útil de datos siguiendo la ruta ya trazada en tubería (pipeline).</p>
            <p>• <strong>Tail Flit (Gris):</strong> Cierra la transmisión y libera los buffers en los enrutadores intermedios.</p>
          </div>
        </div>
      </div>
    </div>
  );

  // 6. SMP UMA VS NUMA DIAGRAM
  const renderSmpNumaDiagram = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* UMA */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-cyan-500/20 space-y-3">
          <div className="font-bold text-cyan-400 border-b border-white/10 pb-1.5 flex justify-between items-center">
            <span>UMA (Uniform Memory Access)</span>
            <span className="text-[10px] font-mono text-slate-400">Symmetric Multiprocessing</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-white/5 space-y-3 text-center">
            <div className="grid grid-cols-4 gap-1">
              {[1, 2, 3, 4].map(i => (
                <span key={i} className="p-1 rounded bg-slate-800 text-cyan-300 font-mono text-[9px] border border-cyan-500/20">
                  CPU {i}
                </span>
              ))}
            </div>
            {/* Shared Bus */}
            <div className="p-1.5 rounded bg-cyan-950 text-cyan-300 font-mono text-[9px] border border-cyan-500/40 animate-pulse">
              ══ Bus Compartido del Sistema (Shared System Bus) ══
            </div>
            {/* Single Memory */}
            <div className="p-2 rounded bg-slate-800 text-amber-300 font-mono text-[10px] border border-amber-500/30">
              Memoria Principal Centralizada (Latencia Constante ~60ns)
            </div>
          </div>
          <p className="text-[10px] text-slate-400">Cuello de botella: Contención de bus cuando N &gt; 8 procesadores.</p>
        </div>

        {/* NUMA */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-emerald-500/20 space-y-3">
          <div className="font-bold text-emerald-400 border-b border-white/10 pb-1.5 flex justify-between items-center">
            <span>NUMA (Non-Uniform Memory Access)</span>
            <span className="text-[10px] font-mono text-slate-400">Escalable a Cientos de Cores</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-white/5 space-y-3 text-center">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-2 rounded-lg bg-slate-800 border border-emerald-500/30 text-[9px]">
                <strong className="text-emerald-300 block">Nodo 0</strong>
                <span>CPU + Memoria Local</span>
                <span className="text-emerald-400 block font-mono text-[8px]">Latencia: 50ns</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-800 border border-emerald-500/30 text-[9px]">
                <strong className="text-emerald-300 block">Nodo 1</strong>
                <span>CPU + Memoria Local</span>
                <span className="text-emerald-400 block font-mono text-[8px]">Latencia: 50ns</span>
              </div>
            </div>
            {/* Interconnect Fabric */}
            <div className="p-1.5 rounded bg-emerald-950 text-emerald-300 font-mono text-[9px] border border-emerald-500/40">
              ◄► Red de Interconexión Punto a Punto (UPI / QPI / Infinity Fabric) ◄►
            </div>
          </div>
          <p className="text-[10px] text-slate-400">Acceso a memoria remota conlleva un factor de penalización de latencia (NUMA ratio ~1.5x a 3x).</p>
        </div>
      </div>
    </div>
  );

  // 7. MESI COHERENCE PROTOCOL STATE MACHINE
  const renderCoherenceDiagram = () => (
    <div className="space-y-4">
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-cyan-500/30 space-y-3">
        <div className="flex items-center justify-between text-xs border-b border-white/10 pb-2">
          <span className="font-bold text-white">Máquina de Estados del Protocolo MESI (Illinois)</span>
          <span className="text-[10px] text-cyan-400 font-mono">Snooping en Bus Compartido</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          {/* M - Modified */}
          <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/40 text-center space-y-1">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-300 font-extrabold flex items-center justify-center mx-auto border border-amber-500/40">
              M
            </div>
            <div className="font-bold text-amber-300 text-[11px]">Modified (Modificado)</div>
            <p className="text-[9px] text-slate-300">Copia única y sucia. La memoria RAM está desactualizada.</p>
          </div>

          {/* E - Exclusive */}
          <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/40 text-center space-y-1">
            <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-300 font-extrabold flex items-center justify-center mx-auto border border-cyan-500/40">
              E
            </div>
            <div className="font-bold text-cyan-300 text-[11px]">Exclusive (Exclusivo)</div>
            <p className="text-[9px] text-slate-300">Copia única y limpia. Coincide exactamente con la memoria RAM.</p>
          </div>

          {/* S - Shared */}
          <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-center space-y-1">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold flex items-center justify-center mx-auto border border-emerald-500/40">
              S
            </div>
            <div className="font-bold text-emerald-300 text-[11px]">Shared (Compartido)</div>
            <p className="text-[9px] text-slate-300">Copia limpia presente en dos o más memorias caché.</p>
          </div>

          {/* I - Invalid */}
          <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/40 text-center space-y-1">
            <div className="w-8 h-8 rounded-full bg-rose-500/20 text-rose-300 font-extrabold flex items-center justify-center mx-auto border border-rose-500/40">
              I
            </div>
            <div className="font-bold text-rose-300 text-[11px]">Invalid (Inválido)</div>
            <p className="text-[9px] text-slate-300">Línea desactualizada; debe recargarse en el próximo acceso.</p>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-950 text-[11px] text-slate-300 font-mono space-y-1 border border-white/5">
          <p className="text-cyan-400 font-bold">Transiciones Típicas en Bus:</p>
          <p>• <strong>PrWr en estado S:</strong> Emite <code className="text-amber-300">BusUpgr</code> ➔ Invalida sharers ➔ Pasa a <strong className="text-amber-300">M</strong>.</p>
          <p>• <strong>PrRd en estado I:</strong> Emite <code className="text-cyan-300">BusRd</code> ➔ Si nadie tiene copia pasa a <strong className="text-cyan-300">E</strong>; si hay sharers pasa a <strong className="text-emerald-300">S</strong>.</p>
          <p>• <strong>Snoop BusRdX en estado M:</strong> Hace Write-Back a memoria y pasa a <strong className="text-rose-400">I</strong>.</p>
        </div>
      </div>
    </div>
  );

  // 8. DIRECTORY-BASED COHERENCE DIAGRAM
  const renderDirectoryDiagram = () => (
    <div className="space-y-4">
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-purple-500/30 space-y-3">
        <div className="flex items-center justify-between text-xs border-b border-white/10 pb-2">
          <span className="font-bold text-white">Coherencia Basada en Directorio (CC-NUMA)</span>
          <span className="text-[10px] text-purple-400 font-mono">Sin Difusión (No Broadcast)</span>
        </div>

        <div className="p-4 bg-slate-950 rounded-xl border border-white/5 space-y-3">
          <div className="grid grid-cols-3 gap-3 text-center text-xs">
            {/* Requester Node */}
            <div className="p-2.5 rounded-lg bg-slate-800 border border-cyan-500/30">
              <span className="text-[10px] font-bold text-cyan-300 block mb-1">Nodo Solicitante</span>
              <span className="text-[9px] text-slate-400 font-mono">Core A (Read/Write Miss)</span>
            </div>

            {/* Home Node with Directory */}
            <div className="p-2.5 rounded-lg bg-purple-950/60 border border-purple-500/50">
              <span className="text-[10px] font-bold text-purple-300 block mb-1">Nodo Home + Directorio</span>
              <div className="font-mono text-[8px] bg-black/60 p-1 rounded text-purple-200">
                Línea X | Estado: S | Vector: [1, 0, 1, 0]
              </div>
            </div>

            {/* Sharer Node */}
            <div className="p-2.5 rounded-lg bg-slate-800 border border-emerald-500/30">
              <span className="text-[10px] font-bold text-emerald-300 block mb-1">Nodo Poseedor</span>
              <span className="text-[9px] text-slate-400 font-mono">Core C (Invalidación P2P)</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-300 space-y-1">
            <p>1. <strong>Solicitud Punto a Punto:</strong> El nodo solicitante envía mensaje unicast al nodo Home responsable de la dirección.</p>
            <p>2. <strong>Consulta de Directorio:</strong> El Home verifica el vector de bits de presencia para identificar qué nodos tienen copias.</p>
            <p>3. <strong>Invalidación Selectiva:</strong> Se envían mensajes solo a los nodos poseedores, ahorrando un 90% de ancho de banda frente al broadcast.</p>
          </div>
        </div>
      </div>
    </div>
  );

  // 9. EMBEDDED SYSTEM & ARM BIG.LITTLE DIAGRAM
  const renderEmbeddedDiagram = () => (
    <div className="space-y-4">
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-emerald-500/30 space-y-3">
        <div className="flex items-center justify-between text-xs border-b border-white/10 pb-2">
          <span className="font-bold text-white">Arquitectura SoC Embebido: ARM big.LITTLE</span>
          <span className="text-[10px] text-emerald-400 font-mono">Eficiencia Energética y RTOS</span>
        </div>

        <div className="p-4 bg-slate-950 rounded-xl border border-white/5 space-y-3">
          <div className="grid grid-cols-2 gap-3 text-xs">
            {/* BIG Cores */}
            <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/30 text-center">
              <span className="font-bold text-rose-300 text-xs block mb-1">BIG Clúster (Alto Rendimiento)</span>
              <p className="text-[9px] text-slate-300">2x Cortex-A78 @ 2.8GHz para ráfagas de cálculo pesado e inferencia IA.</p>
            </div>

            {/* LITTLE Cores */}
            <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-center">
              <span className="font-bold text-emerald-300 text-xs block mb-1">LITTLE Clúster (Ultra Bajo Consumo)</span>
              <p className="text-[9px] text-slate-300">4x Cortex-A55 @ 1.8GHz para tareas de fondo, sensores y standby.</p>
            </div>
          </div>

          {/* Interconnect and PMU */}
          <div className="p-2.5 rounded-lg bg-slate-900 border border-white/10 flex items-center justify-between text-[10px] font-mono">
            <span className="text-cyan-400">Interconexión Coherente CCI-550</span>
            <span className="text-amber-400">PMU (Controlador DVFS)</span>
            <span className="text-purple-400">Periféricos I2C/SPI/CAN</span>
          </div>
        </div>
      </div>
    </div>
  );

  // 10. CLOUD & VIRTUALIZATION STACK
  const renderCloudDiagram = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        {/* Type-1 Bare Metal */}
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-cyan-500/30 space-y-2 text-center">
          <strong className="text-cyan-300 text-xs block">Hipervisor Tipo 1</strong>
          <p className="text-[9px] text-slate-400">Bare-Metal (Nativo)</p>
          <div className="space-y-1 font-mono text-[9px]">
            <div className="p-1.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-200">Máquinas Virtuales (VMs)</div>
            <div className="p-1.5 rounded bg-slate-800 text-white font-bold border border-cyan-400">Hipervisor (ESXi / KVM)</div>
            <div className="p-1.5 rounded bg-slate-950 text-slate-400 border border-white/10">Hardware del Servidor</div>
          </div>
          <p className="text-[9px] text-slate-400 mt-2">Máximo rendimiento en datacenters empresariales.</p>
        </div>

        {/* Type-2 Hosted */}
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-amber-500/30 space-y-2 text-center">
          <strong className="text-amber-300 text-xs block">Hipervisor Tipo 2</strong>
          <p className="text-[9px] text-slate-400">Hosted (Alojado)</p>
          <div className="space-y-1 font-mono text-[9px]">
            <div className="p-1.5 rounded bg-amber-950/60 border border-amber-500/30 text-amber-200">Máquinas Virtuales (VMs)</div>
            <div className="p-1.5 rounded bg-slate-800 text-white font-bold border border-amber-400">VirtualBox / VMware</div>
            <div className="p-1.5 rounded bg-slate-900 text-slate-300 border border-white/10">Sistema Operativo Host</div>
            <div className="p-1 rounded bg-slate-950 text-slate-500 text-[8px]">Hardware</div>
          </div>
          <p className="text-[9px] text-slate-400 mt-2">Ideal para desarrollo y pruebas en estaciones de trabajo.</p>
        </div>

        {/* Containers */}
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-emerald-500/30 space-y-2 text-center">
          <strong className="text-emerald-300 text-xs block">Contenedores Docker</strong>
          <p className="text-[9px] text-slate-400">Aislamiento a nivel de SO</p>
          <div className="space-y-1 font-mono text-[9px]">
            <div className="p-1.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-200">App Containers (cgroups)</div>
            <div className="p-1.5 rounded bg-slate-800 text-white font-bold border border-emerald-400">Docker Daemon / Containerd</div>
            <div className="p-1.5 rounded bg-slate-900 text-slate-300 border border-white/10">Kernel Linux Compartido</div>
            <div className="p-1 rounded bg-slate-950 text-slate-500 text-[8px]">Hardware</div>
          </div>
          <p className="text-[9px] text-slate-400 mt-2">Sin sobrecarga de Guest OS; arranque en milisegundos.</p>
        </div>
      </div>
    </div>
  );

  // 11. CLUSTER ARCHITECTURE DIAGRAM (UAJMS / BEOWULF)
  const renderClusterDiagram = () => (
    <div className="space-y-4">
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-indigo-500/30 space-y-3">
        <div className="flex items-center justify-between text-xs border-b border-white/10 pb-2">
          <span className="font-bold text-white">Topología Física de Cluster Computacional (UAJMS / Beowulf)</span>
          <span className="text-[10px] text-indigo-400 font-mono">Red MPI Privada Gigabit</span>
        </div>

        <div className="p-4 bg-slate-950 rounded-xl border border-white/5 space-y-4">
          {/* Head Node */}
          <div className="flex items-center justify-center">
            <div className="p-3 rounded-xl bg-indigo-950/60 border border-indigo-500/50 text-center max-w-xs w-full">
              <strong className="text-indigo-300 text-xs block">Nodo Maestro (Head Node)</strong>
              <div className="text-[9px] text-slate-300 font-mono mt-1 space-y-0.5">
                <div>NIC 1: IP Pública / Internet</div>
                <div>NIC 2: Red Privada (192.168.1.1)</div>
                <div>Servidor NFS + Planificador SLURM</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center text-indigo-400 animate-pulse text-xs font-mono">
            ▼ Enlace Gigabit Ethernet Switch Central (1000 Mbps Full Duplex) ▼
          </div>

          {/* Worker Nodes */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
            {[1, 2, 3, 4].map(node => (
              <div key={node} className="p-2.5 rounded-lg bg-slate-800 border border-white/10">
                <span className="font-bold text-cyan-300 block text-[11px]">Nodo {node}</span>
                <span className="text-[9px] text-slate-400 font-mono block">192.168.1.{10 + node}</span>
                <span className="text-[8px] text-emerald-400 font-mono">MPI Rank {node - 1}</span>
              </div>
            ))}
          </div>

          <p className="text-[10px] text-slate-400 text-center">
            Comunicación entre procesos vía OpenMPI a través de sockets TCP/IP con SSH sin contraseña (claves públicas RSA).
          </p>
        </div>
      </div>
    </div>
  );

  const getDiagramContent = () => {
    switch (type) {
      case 'flynn': return renderFlynnDiagram();
      case 'cores': return renderCoresDiagram();
      case 'speedup': return renderSpeedupDiagram();
      case 'network': return renderNetworkDiagram();
      case 'wormhole': return renderWormholeDiagram();
      case 'smp_numa': return renderSmpNumaDiagram();
      case 'coherence': return renderCoherenceDiagram();
      case 'directory': return renderDirectoryDiagram();
      case 'embedded': return renderEmbeddedDiagram();
      case 'cloud': return renderCloudDiagram();
      case 'cluster': return renderClusterDiagram();
      default: return renderFlynnDiagram();
    }
  };

  return (
    <div className={`rounded-2xl transition-all ${className} ${isExpanded ? 'fixed inset-4 z-50 bg-[#080d1a]/95 backdrop-blur-xl p-6 overflow-y-auto border border-cyan-500/40 shadow-2xl' : ''}`}>
      {/* Title & Toolbar */}
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300 font-mono">
            {title || `Esquema Arquitectónico: ${type.toUpperCase()}`}
          </h4>
        </div>

        {allowExpand && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title={isExpanded ? 'Restaurar tamaño' : 'Ampliar diagrama para proyección'}
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* Render diagram content */}
      {getDiagramContent()}
    </div>
  );
};
