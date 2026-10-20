import React, { useState } from 'react';
import { Layers, ArrowRight, RotateCcw, AlertTriangle, CheckCircle2, Radio } from 'lucide-react';

type CacheState = 'M' | 'E' | 'S' | 'I';

interface CoreCache {
  id: number;
  name: string;
  state: CacheState;
  value: number;
}

export const CacheCoherenceSimulator: React.FC = () => {
  const [cores, setCores] = useState<CoreCache[]>([
    { id: 0, name: 'Núcleo 0', state: 'I', value: 0 },
    { id: 1, name: 'Núcleo 1', state: 'I', value: 0 },
    { id: 2, name: 'Núcleo 2', state: 'I', value: 0 },
  ]);

  const [memoryValue, setMemoryValue] = useState<number>(100);
  const [lastBusSignal, setLastBusSignal] = useState<string>('Bus ocioso (Idle)');
  const [logHistory, setLogHistory] = useState<string[]>([
    'Sistema iniciado: Línea 0x0A en RAM = 100. Cachés de Núcleos 0, 1 y 2 en estado Inválido (I).'
  ]);

  const addLog = (msg: string) => {
    setLogHistory(prev => [msg, ...prev.slice(0, 7)]);
  };

  const handleRead = (coreId: number) => {
    const core = cores[coreId];

    // Read Hit (already in M, E or S)
    if (core.state !== 'I') {
      setLastBusSignal('Ninguna señal de bus emitida (Read Hit interno en L1)');
      addLog(`${core.name} realizó LECTURA (Read Hit): Dato ${core.value} ya disponible en estado [${core.state}].`);
      return;
    }

    // Read Miss (state is I)
    const otherCores = cores.filter(c => c.id !== coreId);
    const modifiedCore = otherCores.find(c => c.state === 'M');
    const ownerOrExclusive = otherCores.find(c => c.state === 'E' || c.state === 'S');

    if (modifiedCore) {
      // Flush from modified core to RAM and transition to S
      const val = modifiedCore.value;
      setMemoryValue(val);
      setLastBusSignal('BusRd detectado -> Núcleo modificado emite FLUSH a RAM');
      
      setCores(prev => prev.map(c => {
        if (c.id === coreId) return { ...c, state: 'S', value: val };
        if (c.id === modifiedCore.id) return { ...c, state: 'S' };
        return c;
      }));

      addLog(`${core.name} LECTURA (Read Miss): Emite BusRd. ${modifiedCore.name} estaba en [M], hace FLUSH (${val}) a RAM. Ambos quedan en estado [S].`);
    } else if (ownerOrExclusive) {
      // There are sharers, read from memory or other cache
      setLastBusSignal('BusRd emitido -> Sharers detectados');
      setCores(prev => prev.map(c => {
        if (c.id === coreId) return { ...c, state: 'S', value: memoryValue };
        if (c.state === 'E') return { ...c, state: 'S' }; // Exclusive drops to Shared
        return c;
      }));

      addLog(`${core.name} LECTURA (Read Miss): Emite BusRd. Detecta copias en otros núcleos; carga ${memoryValue} y pasa a estado Compartido [S].`);
    } else {
      // No other core has it: transitions to Exclusive (E) in MESI
      setLastBusSignal('BusRd emitido -> Línea no presente en ningún otro núcleo');
      setCores(prev => prev.map(c => {
        if (c.id === coreId) return { ...c, state: 'E', value: memoryValue };
        return c;
      }));

      addLog(`${core.name} LECTURA (Read Miss): Emite BusRd. Ningún otro núcleo tiene copia -> Carga ${memoryValue} en estado Exclusivo [E].`);
    }
  };

  const handleWrite = (coreId: number) => {
    const core = cores[coreId];
    const newValue = core.value + 5 || memoryValue + 5;

    if (core.state === 'M') {
      // Silent Write Hit
      setLastBusSignal('Sin señal de bus (Write Hit silencioso en estado [M])');
      setCores(prev => prev.map(c => c.id === coreId ? { ...c, value: newValue } : c));
      addLog(`${core.name} ESCRITURA (Write Hit silencioso): Ya tenía exclusividad [M]. Nuevo valor = ${newValue}.`);
      return;
    }

    if (core.state === 'E') {
      // Silent transition from E to M
      setLastBusSignal('Sin señal de bus (Transición silenciosa E -> M por exclusividad)');
      setCores(prev => prev.map(c => c.id === coreId ? { ...c, state: 'M', value: newValue } : c));
      addLog(`${core.name} ESCRITURA: Estaba en [E] (limpio y exclusivo). Promociona a [M] sin tráfico de bus. Nuevo valor = ${newValue}.`);
      return;
    }

    if (core.state === 'S') {
      // Write hit on S -> Must emit BusUpgr (Bus Upgrade / Invalidation)
      setLastBusSignal('BusUpgr (Invalidación de copias compartidas)');
      setCores(prev => prev.map(c => {
        if (c.id === coreId) return { ...c, state: 'M', value: newValue };
        return { ...c, state: 'I' }; // Invalidate others
      }));
      addLog(`${core.name} ESCRITURA: Estaba en [S]. Emite BusUpgr -> Invalida las copias de los demás núcleos y pasa a [M] con valor ${newValue}.`);
      return;
    }

    // Write Miss (State was I)
    // Emits BusRdX (Read with Intent to Modify)
    setLastBusSignal('BusRdX (Read-With-Intent-To-Modify emitido al bus)');
    setCores(prev => prev.map(c => {
      if (c.id === coreId) return { ...c, state: 'M', value: newValue };
      return { ...c, state: 'I' }; // Invalidate all others
    }));
    addLog(`${core.name} ESCRITURA (Write Miss): Emite BusRdX -> Invalida todas las cachés y toma propiedad exclusiva en [M] con valor ${newValue}.`);
  };

  const handleReset = () => {
    setCores([
      { id: 0, name: 'Núcleo 0', state: 'I', value: 0 },
      { id: 1, name: 'Núcleo 1', state: 'I', value: 0 },
      { id: 2, name: 'Núcleo 2', state: 'I', value: 0 },
    ]);
    setMemoryValue(100);
    setLastBusSignal('Bus reiniciado');
    setLogHistory(['Simulador reiniciado a estado inicial.']);
  };

  const getStateBadge = (state: CacheState) => {
    switch (state) {
      case 'M':
        return <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">M - Modified</span>;
      case 'E':
        return <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">E - Exclusive</span>;
      case 'S':
        return <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">S - Shared</span>;
      case 'I':
      default:
        return <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-slate-700/40 text-slate-400 border border-slate-700">I - Invalid</span>;
    }
  };

  return (
    <div className="glass-panel-glow rounded-2xl p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <Layers className="w-5 h-5 animate-pulse-subtle" />
            </span>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Simulador de Coherencia de Caché Snoopy (Protocolo MESI)
            </h3>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Inspecciona en tiempo real las transiciones de estado (M, E, S, I) y el tráfico en el bus compartido
          </p>
        </div>

        <button
          onClick={handleReset}
          className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition-colors border border-white/5 active:scale-95"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reiniciar
        </button>
      </div>

      {/* Shared Bus Visualizer Banner */}
      <div className="bg-slate-900/90 border border-cyan-500/30 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-data-shimmer">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-bold">
            Monitor de Bus Compartido:
          </span>
        </div>
        <span className="font-mono text-sm font-semibold text-white bg-black/40 px-3 py-1 rounded border border-white/10">
          {lastBusSignal}
        </span>
      </div>

      {/* Cores Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cores.map((core) => (
          <div 
            key={core.id}
            className={`p-5 rounded-xl border transition-all ${
              core.state === 'M' ? 'bg-rose-950/20 border-rose-500/40 shadow-lg shadow-rose-950/20' :
              core.state === 'E' ? 'bg-blue-950/20 border-blue-500/40' :
              core.state === 'S' ? 'bg-emerald-950/20 border-emerald-500/40' :
              'bg-slate-900/60 border-white/5'
            }`}
          >
            {/* Core Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-3">
              <span className="font-bold text-white text-sm flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping-slow" />
                {core.name}
              </span>
              {getStateBadge(core.state)}
            </div>

            {/* Cache Line Data */}
            <div className="bg-black/30 rounded-lg p-3 space-y-1.5 font-mono text-xs border border-white/5 mb-4">
              <div className="flex justify-between text-slate-400">
                <span>Dirección:</span>
                <span className="text-slate-200">0x0A (Variable X)</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Dato en Caché:</span>
                <span className={core.state === 'I' ? 'text-slate-600 line-through' : 'text-cyan-300 font-bold'}>
                  {core.state === 'I' ? 'Inválido' : core.value}
                </span>
              </div>
            </div>

            {/* Core Actions */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleRead(core.id)}
                className="px-3 py-2 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/40 border border-cyan-500/30 text-cyan-300 font-medium text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95"
              >
                <span>Leer (Read)</span>
              </button>
              <button
                onClick={() => handleWrite(core.id)}
                className="px-3 py-2 rounded-lg bg-rose-600/20 hover:bg-rose-600/40 border border-rose-500/30 text-rose-300 font-medium text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95"
              >
                <span>Escribir (Write)</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Main Memory RAM representation */}
      <div className="bg-slate-900/80 p-4 rounded-xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <span className="font-mono font-bold text-xs">RAM</span>
          </div>
          <div>
            <span className="text-sm font-semibold text-white block">Memoria Principal Compartida</span>
            <span className="text-xs text-slate-400">Línea física 0x0A</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 font-mono">Valor Almacenado en RAM:</span>
          <span className="font-mono font-extrabold text-emerald-400 text-lg bg-black/40 px-3 py-1 rounded border border-emerald-500/30">
            {memoryValue}
          </span>
        </div>
      </div>

      {/* Live Transaction Log */}
      <div className="bg-slate-950/80 p-4 rounded-xl border border-white/5 space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
          Registro Secuencial de Transacciones y Espionaje:
        </span>
        <div className="space-y-1.5 font-mono text-[11px] max-h-40 overflow-y-auto pr-2">
          {logHistory.map((log, index) => (
            <div key={index} className={`flex items-start gap-2 ${index === 0 ? 'text-cyan-300 font-semibold' : 'text-slate-400'}`}>
              <ArrowRight className="w-3 h-3 shrink-0 mt-0.5 text-cyan-500" />
              <span>{log}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
