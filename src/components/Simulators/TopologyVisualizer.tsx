import React, { useState } from 'react';
import { Network, Activity, Cpu, ShieldCheck, Zap } from 'lucide-react';

interface TopologyInfo {
  id: string;
  name: string;
  degree: string;
  diameter: string;
  bisection: string;
  cost: string;
  realExample: string;
  description: string;
  routing: string;
}

export const TopologyVisualizer: React.FC = () => {
  const [selectedTopology, setSelectedTopology] = useState<string>('mesh');

  const topologies: Record<string, TopologyInfo> = {
    bus: {
      id: 'bus',
      name: 'Bus Compartido',
      degree: '1 (cada nodo conecta al canal)',
      diameter: '1 salto (broadcast)',
      bisection: '1 canal',
      cost: 'O(1) - Mínimo costo',
      realExample: 'Primeros multiprocesadores SMP comerciales.',
      description: 'Todos los nodos comparten un único canal de comunicación multiplexado en el tiempo. Muy económico y simple, pero colapsa rápidamente por colisiones y contención al añadir más procesadores.',
      routing: 'Directo por broadcast con arbitraje centralizado o distribuido.'
    },
    ring: {
      id: 'ring',
      name: 'Anillo (Ring)',
      degree: '2 (enlaces fijo)',
      diameter: 'N / 2 saltos (bidireccional)',
      bisection: '2 canales',
      cost: 'O(N) - Bajo',
      realExample: 'Intel Skylake inter-core ring, Token Ring.',
      description: 'Los nodos se interconectan en un circuito cerrado. El grado es fijo e independiente del número de nodos, pero la latencia crece linealmente con la cantidad de procesadores.',
      routing: 'Enrutamiento circular unidireccional o camino más corto bidireccional.'
    },
    mesh: {
      id: 'mesh',
      name: 'Malla 2D (2D Mesh)',
      degree: '4 (esquinas 2, bordes 3)',
      diameter: '2 · (√N - 1) saltos',
      bisection: '√N canales',
      cost: 'O(N) - Moderado',
      realExample: 'Intel Xeon Phi, NoC en procesadores masivos, Tilera.',
      description: 'Grilla bidireccional regular. Altamente escalable y sencilla de trazar en un plano de circuito integrado (layout 2D en silicio). Los nodos en bordes tienen menor conectividad que los centrales.',
      routing: 'XY-Routing (Dimensión-Orden), que previene deadlocks al prohibir giros Y->X.'
    },
    torus: {
      id: 'torus',
      name: 'Toro 2D/3D (Torus)',
      degree: '4 (2D) / 6 (3D) constante',
      diameter: '√N saltos (reduce diámetro a la mitad)',
      bisection: '2 · √N canales',
      cost: 'O(N) - Moderado con cables largos',
      realExample: 'IBM Blue Gene/L y Blue Gene/Q, Fujitsu K Computer.',
      description: 'Malla con enlaces envolventes en los extremos. Es completamente simétrica y regular (todos los nodos tienen grado idéntico y no hay bordes desfavorecidos), duplicando el ancho de bisección.',
      routing: 'Enrutamiento con canales virtuales para romper los ciclos de los enlaces envolventes.'
    },
    hypercube: {
      id: 'hypercube',
      name: 'Hipercubo (Hypercube)',
      degree: 'n = log₂ N',
      diameter: 'n = log₂ N saltos (Logarítmico)',
      bisection: 'N / 2 canales (Muy alto)',
      cost: 'O(N · log N) - Alto cableado',
      realExample: 'Intel iPSC, Connection Machine CM-2.',
      description: 'Nodos situados en los vértices de un hipercubo de n dimensiones. El diámetro es sumamente bajo y el ancho de bisección es gigantesco, pero el grado crece con el tamaño del sistema, complicando los conectores.',
      routing: 'E-Cube routing: conmuta bits de diferencia entre direcciones origen y destino.'
    },
    fattree: {
      id: 'fattree',
      name: 'Fat-Tree (Árbol Engrosado)',
      degree: 'Variable según switches',
      diameter: '2 · log_k (N/2) saltos',
      bisection: 'N / 2 (Non-blocking total)',
      cost: 'Alto en switches y transceptores ópticos',
      realExample: 'Redes InfiniBand en centros de datos modernos, TOP500.',
      description: 'Árbol jerárquico donde el ancho de banda y la cantidad de enlaces se engrosan progresivamente hacia la raíz. Elimina cuellos de botella garantizando comunicación simultánea sin bloqueo.',
      routing: 'Enrutamiento ascendente hacia el ancestro común más cercano y descendente hacia el destino.'
    },
    dragonfly: {
      id: 'dragonfly',
      name: 'Dragonfly / Slim Fly',
      degree: 'Muy alto dentro del grupo',
      diameter: '3 saltos máximo (Ultraligero)',
      bisection: 'Muy alto con cables ópticos globales',
      cost: 'Compromiso óptimo de cables largos',
      realExample: 'Cray Slingshot (Supercomputador Frontier en Oak Ridge).',
      description: 'Grupos densos de routers conectados en malla interna, interconectados mediante enlaces ópticos directos entre grupos. Garantiza un diámetro de red máximo de 3 saltos en clústeres de 100,000 núcleos.',
      routing: 'Encaminamiento adaptativo dinámico para evitar enlaces congestionados.'
    }
  };

  const current = topologies[selectedTopology];

  return (
    <div className="glass-panel-glow rounded-2xl p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Network className="w-5 h-5 animate-pulse-subtle" />
            </span>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Explorador Visual de Topologías de Red de Interconexión
            </h3>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Compara métricas de diámetro, grado, ancho de bisección y algoritmos de encaminamiento
          </p>
        </div>

        {/* Topology Selector Buttons */}
        <div className="flex flex-wrap gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-white/10">
          {Object.keys(topologies).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedTopology(key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedTopology === key
                  ? 'bg-cyan-500 text-black font-bold shadow-sm shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {topologies[key].name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Display: Interactive Graphic Representation + Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Visual Graphic Representation */}
        <div className="lg:col-span-7 bg-slate-950/80 p-6 rounded-2xl border border-white/10 flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.02] -z-0" />
          
          {/* Animated SVG Topology Diagram */}
          {selectedTopology === 'bus' && (
            <svg viewBox="0 0 400 200" className="w-full max-w-[360px] h-auto">
              {/* Main Bus Line */}
              <line x1="30" y1="100" x2="370" y2="100" stroke="#00ccff" strokeWidth="6" strokeLinecap="round" className="animate-ambient-glow" />
              {/* Bus Labels */}
              <text x="200" y="125" textAnchor="middle" fill="#00ccff" fontSize="11" fontFamily="monospace" fontWeight="bold">BUS COMPARTIDO MULTIPLEXADO</text>
              {/* Nodes and drops */}
              {[60, 150, 250, 340].map((x, i) => (
                <g key={i}>
                  <line x1={x} y1="100" x2={x} y2={i % 2 === 0 ? "50" : "150"} stroke="#38bdf8" strokeWidth="3" strokeDasharray="4 2" />
                  <circle cx={x} cy={i % 2 === 0 ? 50 : 150} r="18" fill="#0f172a" stroke="#00ccff" strokeWidth="2.5" />
                  <text x={x} y={i % 2 === 0 ? 55 : 155} textAnchor="middle" fill="#ffffff" fontSize="11" fontFamily="monospace" fontWeight="bold">N{i}</text>
                </g>
              ))}
            </svg>
          )}

          {selectedTopology === 'ring' && (
            <svg viewBox="0 0 300 300" className="w-full max-w-[280px] h-auto">
              <circle cx="150" cy="150" r="90" fill="none" stroke="#00ccff" strokeWidth="4" strokeDasharray="6 4" className="animate-orbit" />
              {[0, 60, 120, 180, 240, 300].map((deg, i) => {
                const rad = (deg * Math.PI) / 180;
                const x = 150 + 90 * Math.cos(rad);
                const y = 150 + 90 * Math.sin(rad);
                return (
                  <g key={i}>
                    <circle cx={x} cy={y} r="18" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
                    <text x={x} y={y + 4} textAnchor="middle" fill="#ffffff" fontSize="11" fontFamily="monospace" fontWeight="bold">N{i}</text>
                  </g>
                );
              })}
            </svg>
          )}

          {selectedTopology === 'mesh' && (
            <svg viewBox="0 0 300 300" className="w-full max-w-[280px] h-auto">
              {/* Grid Lines */}
              <line x1="60" y1="60" x2="240" y2="60" stroke="#00ccff" strokeWidth="2.5" />
              <line x1="60" y1="150" x2="240" y2="150" stroke="#00ccff" strokeWidth="2.5" />
              <line x1="60" y1="240" x2="240" y2="240" stroke="#00ccff" strokeWidth="2.5" />
              <line x1="60" y1="60" x2="60" y2="240" stroke="#00ccff" strokeWidth="2.5" />
              <line x1="150" y1="60" x2="150" y2="240" stroke="#00ccff" strokeWidth="2.5" />
              <line x1="240" y1="60" x2="240" y2="240" stroke="#00ccff" strokeWidth="2.5" />
              {/* Nodes */}
              {[60, 150, 240].flatMap(x => [60, 150, 240].map(y => ({ x, y }))).map((pt, i) => (
                <g key={i}>
                  <circle cx={pt.x} cy={pt.y} r="16" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                  <text x={pt.x} y={pt.y + 4} textAnchor="middle" fill="#ffffff" fontSize="9" fontFamily="monospace" fontWeight="bold">N{i}</text>
                </g>
              ))}
            </svg>
          )}

          {selectedTopology === 'torus' && (
            <svg viewBox="0 0 320 320" className="w-full max-w-[290px] h-auto">
              {/* Wraparound links */}
              <path d="M 60,60 C 20,20 20,280 60,240" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
              <path d="M 240,60 C 280,20 280,280 240,240" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
              <path d="M 60,60 C 20,20 280,20 240,60" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
              <path d="M 60,240 C 20,280 280,280 240,240" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
              {/* Inner Mesh */}
              <line x1="60" y1="60" x2="240" y2="60" stroke="#00ccff" strokeWidth="2.5" />
              <line x1="60" y1="150" x2="240" y2="150" stroke="#00ccff" strokeWidth="2.5" />
              <line x1="60" y1="240" x2="240" y2="240" stroke="#00ccff" strokeWidth="2.5" />
              <line x1="60" y1="60" x2="60" y2="240" stroke="#00ccff" strokeWidth="2.5" />
              <line x1="150" y1="60" x2="150" y2="240" stroke="#00ccff" strokeWidth="2.5" />
              <line x1="240" y1="60" x2="240" y2="240" stroke="#00ccff" strokeWidth="2.5" />
              {/* Nodes */}
              {[60, 150, 240].flatMap(x => [60, 150, 240].map(y => ({ x, y }))).map((pt, i) => (
                <g key={i}>
                  <circle cx={pt.x} cy={pt.y} r="15" fill="#0f172a" stroke="#00ccff" strokeWidth="2" />
                  <text x={pt.x} y={pt.y + 4} textAnchor="middle" fill="#ffffff" fontSize="9" fontFamily="monospace" fontWeight="bold">N{i}</text>
                </g>
              ))}
            </svg>
          )}

          {selectedTopology === 'hypercube' && (
            <svg viewBox="0 0 320 320" className="w-full max-w-[280px] h-auto">
              {/* Outer cube */}
              <rect x="50" y="50" width="160" height="160" fill="none" stroke="#00ccff" strokeWidth="2.5" />
              {/* Inner cube */}
              <rect x="110" y="110" width="160" height="160" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="4 2" />
              {/* Connecting 3D edges */}
              <line x1="50" y1="50" x2="110" y2="110" stroke="#f59e0b" strokeWidth="2.5" />
              <line x1="210" y1="50" x2="270" y2="110" stroke="#f59e0b" strokeWidth="2.5" />
              <line x1="50" y1="210" x2="110" y2="270" stroke="#f59e0b" strokeWidth="2.5" />
              <line x1="210" y1="210" x2="270" y2="270" stroke="#f59e0b" strokeWidth="2.5" />
              {/* Vertices */}
              {[
                { x: 50, y: 50, l: '000' }, { x: 210, y: 50, l: '001' },
                { x: 50, y: 210, l: '010' }, { x: 210, y: 210, l: '011' },
                { x: 110, y: 110, l: '100' }, { x: 270, y: 110, l: '101' },
                { x: 110, y: 270, l: '110' }, { x: 270, y: 270, l: '111' }
              ].map((v, i) => (
                <g key={i}>
                  <circle cx={v.x} cy={v.y} r="14" fill="#0f172a" stroke="#ffffff" strokeWidth="2" />
                  <text x={v.x} y={v.y + 4} textAnchor="middle" fill="#00ccff" fontSize="8" fontFamily="monospace" fontWeight="bold">{v.l}</text>
                </g>
              ))}
            </svg>
          )}

          {selectedTopology === 'fattree' && (
            <svg viewBox="0 0 340 240" className="w-full max-w-[320px] h-auto">
              {/* Core switches (Root) */}
              <line x1="170" y1="40" x2="100" y2="110" stroke="#f59e0b" strokeWidth="4" />
              <line x1="170" y1="40" x2="240" y2="110" stroke="#f59e0b" strokeWidth="4" />
              <circle cx="170" cy="40" r="18" fill="#1e1b4b" stroke="#f59e0b" strokeWidth="3" />
              <text x="170" y="44" textAnchor="middle" fill="#fbbf24" fontSize="9" fontFamily="monospace" fontWeight="bold">ROOT</text>

              {/* Edge Switches */}
              <line x1="100" y1="110" x2="60" y2="190" stroke="#38bdf8" strokeWidth="2.5" />
              <line x1="100" y1="110" x2="120" y2="190" stroke="#38bdf8" strokeWidth="2.5" />
              <line x1="240" y1="110" x2="200" y2="190" stroke="#38bdf8" strokeWidth="2.5" />
              <line x1="240" y1="110" x2="260" y2="190" stroke="#38bdf8" strokeWidth="2.5" />

              <circle cx="100" cy="110" r="16" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
              <text x="100" y="114" textAnchor="middle" fill="#ffffff" fontSize="9" fontFamily="monospace" fontWeight="bold">SW1</text>
              <circle cx="240" cy="110" r="16" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
              <text x="240" y="114" textAnchor="middle" fill="#ffffff" fontSize="9" fontFamily="monospace" fontWeight="bold">SW2</text>

              {/* Compute Nodes */}
              {[60, 120, 200, 260].map((x, i) => (
                <g key={i}>
                  <rect x={x - 14} y="190" width="28" height="28" rx="6" fill="#0369a1" stroke="#38bdf8" strokeWidth="2" />
                  <text x={x} y="208" textAnchor="middle" fill="#ffffff" fontSize="9" fontFamily="monospace" fontWeight="bold">H{i}</text>
                </g>
              ))}
            </svg>
          )}

          {selectedTopology === 'dragonfly' && (
            <svg viewBox="0 0 340 240" className="w-full max-w-[320px] h-auto">
              {/* Group 1 */}
              <circle cx="90" cy="120" r="60" fill="rgba(0, 204, 255, 0.05)" stroke="#00ccff" strokeWidth="1.5" strokeDasharray="4 2" />
              <text x="90" y="50" textAnchor="middle" fill="#00ccff" fontSize="10" fontFamily="monospace" fontWeight="bold">GRUPO 1</text>
              {/* Group 2 */}
              <circle cx="250" cy="120" r="60" fill="rgba(245, 158, 11, 0.05)" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 2" />
              <text x="250" y="50" textAnchor="middle" fill="#f59e0b" fontSize="10" fontFamily="monospace" fontWeight="bold">GRUPO 2</text>
              {/* Optical long haul cables between groups */}
              <line x1="120" y1="100" x2="220" y2="100" stroke="#ec4899" strokeWidth="3" className="animate-ambient-glow" />
              <line x1="120" y1="140" x2="220" y2="140" stroke="#ec4899" strokeWidth="3" className="animate-ambient-glow" />
              <text x="170" y="85" textAnchor="middle" fill="#ec4899" fontSize="9" fontFamily="monospace" fontWeight="bold">ENLACE ÓPTICO DIRECTO</text>
              {/* Routers inside G1 */}
              <circle cx="70" cy="110" r="14" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
              <circle cx="110" cy="130" r="14" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
              {/* Routers inside G2 */}
              <circle cx="230" cy="130" r="14" fill="#0f172a" stroke="#fbbf24" strokeWidth="2" />
              <circle cx="270" cy="110" r="14" fill="#0f172a" stroke="#fbbf24" strokeWidth="2" />
            </svg>
          )}

          <div className="text-[11px] font-mono text-cyan-400 mt-3 bg-slate-900/80 px-3 py-1 rounded border border-white/5">
            Topología Seleccionada: <strong>{current.name}</strong>
          </div>
        </div>

        {/* Technical Metrics Panel */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900/90 p-5 rounded-2xl border border-white/10 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              Métricas Arquitectónicas
            </h4>

            <div className="space-y-2.5 text-xs font-mono">
              <div className="flex justify-between p-2 rounded-lg bg-slate-800/50 border border-white/5">
                <span className="text-slate-400">Grado del Nodo:</span>
                <span className="font-bold text-cyan-300">{current.degree}</span>
              </div>

              <div className="flex justify-between p-2 rounded-lg bg-slate-800/50 border border-white/5">
                <span className="text-slate-400">Diámetro Máximo:</span>
                <span className="font-bold text-amber-300">{current.diameter}</span>
              </div>

              <div className="flex justify-between p-2 rounded-lg bg-slate-800/50 border border-white/5">
                <span className="text-slate-400">Ancho de Bisección:</span>
                <span className="font-bold text-purple-300">{current.bisection}</span>
              </div>

              <div className="flex justify-between p-2 rounded-lg bg-slate-800/50 border border-white/5">
                <span className="text-slate-400">Costo de Hardware:</span>
                <span className="font-bold text-emerald-300">{current.cost}</span>
              </div>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-white/10 text-xs text-slate-300">
              <strong className="text-white block font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                Algoritmo de Encaminamiento:
              </strong>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                {current.routing}
              </p>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-white/10 text-xs text-slate-300">
              <strong className="text-white block font-semibold flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-amber-400" />
                Implementación en la Industria:
              </strong>
              <p className="text-amber-200/90 font-mono text-[11px]">
                {current.realExample}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Description text */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 text-xs text-slate-300 leading-relaxed">
        <strong className="text-white">Análisis de Ingeniería: </strong>
        {current.description}
      </div>
    </div>
  );
};
