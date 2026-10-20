import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, StepForward, AlertCircle, Info } from 'lucide-react';

type SwitchingMode = 'wormhole' | 'store_forward' | 'cut_through';

export const WormholeSimulator: React.FC = () => {
  const [mode, setMode] = useState<SwitchingMode>('wormhole');
  const [step, setStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isCongested, setIsCongested] = useState<boolean>(false);

  const maxSteps = mode === 'wormhole' ? 7 : 9;

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setStep(prev => {
          if (prev >= maxSteps) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1200);
    }
    return () => clearInterval(interval);
  }, [isPlaying, maxSteps]);

  const handleReset = () => {
    setIsPlaying(false);
    setStep(0);
  };

  return (
    <div className="glass-panel-glow rounded-2xl p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <span className="font-mono font-bold text-base">FLIT</span>
            </span>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Simulador de Conmutación: Wormhole vs Store-and-Forward
            </h3>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Visualiza cómo avanzan los flits a través de los conmutadores y el efecto de bloqueo en cadena
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex bg-slate-900/90 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => { setMode('wormhole'); handleReset(); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              mode === 'wormhole' ? 'bg-cyan-500 text-black font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Wormhole (Flits)
          </button>
          <button
            onClick={() => { setMode('store_forward'); handleReset(); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              mode === 'store_forward' ? 'bg-cyan-500 text-black font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Store-and-Forward
          </button>
          <button
            onClick={() => { setMode('cut_through'); handleReset(); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              mode === 'cut_through' ? 'bg-cyan-500 text-black font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Virtual Cut-Through
          </button>
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/80 p-4 rounded-xl border border-white/5">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs transition-colors active:scale-95 shadow-md shadow-cyan-500/20"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {isPlaying ? 'Pausar' : 'Reproducir'}
          </button>

          <button
            onClick={() => setStep(prev => Math.min(prev + 1, maxSteps))}
            disabled={step >= maxSteps || isPlaying}
            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-medium text-slate-300 transition-colors border border-white/5"
          >
            <StepForward className="w-3.5 h-3.5" />
            Paso Siguiente
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition-colors border border-white/5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reiniciar
          </button>
        </div>

        {/* Congestion toggle */}
        <label className="flex items-center gap-2 cursor-pointer bg-slate-950/60 px-3 py-1.5 rounded-lg border border-white/5">
          <input
            type="checkbox"
            checked={isCongested}
            onChange={(e) => setIsCongested(e.target.checked)}
            className="accent-rose-500 w-4 h-4 cursor-pointer"
          />
          <span className="text-xs text-slate-300 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
            Simular Bloqueo / Congestión en Router 2
          </span>
        </label>

        {/* Step indicator */}
        <div className="font-mono text-xs text-slate-400">
          Ciclo de Reloj: <span className="text-cyan-400 font-bold">{step}</span> / {maxSteps}
        </div>
      </div>

      {/* Network Routers Visualization */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-white/10 space-y-6">
        <div className="flex justify-between items-center text-xs font-mono text-slate-400 px-4">
          <span>Nodo Origen (H0)</span>
          <span>Red de Enrutadores</span>
          <span>Nodo Destino (H3)</span>
        </div>

        {/* Routers Chain Diagram */}
        <div className="grid grid-cols-4 gap-4 relative py-6">
          {/* Connection Lines between routers */}
          <div className="absolute top-1/2 left-[12%] right-[12%] h-1.5 bg-slate-800 -translate-y-1/2 -z-0 rounded">
            <div 
              className="h-full bg-cyan-500 transition-all duration-500" 
              style={{ width: `${Math.min(100, (step / maxSteps) * 100)}%` }}
            />
          </div>

          {[0, 1, 2, 3].map((rId) => {
            const isBlockedHere = isCongested && rId === 2;

            // Determine which flit or packet is in this router
            let contentInRouter: string | null = null;
            if (mode === 'wormhole') {
              if (step === 1 && rId === 0) contentInRouter = 'Cabecera (H)';
              else if (step === 2 && rId === 1) contentInRouter = 'Cabecera (H)';
              else if (step === 2 && rId === 0) contentInRouter = 'Dato 1 (D1)';
              else if (step === 3 && rId === 2) contentInRouter = isBlockedHere ? 'H (BLOQUEADO)' : 'Cabecera (H)';
              else if (step === 3 && rId === 1) contentInRouter = 'Dato 1 (D1)';
              else if (step === 3 && rId === 0) contentInRouter = 'Dato 2 (D2)';
              else if (step >= 4 && isCongested) {
                if (rId === 2) contentInRouter = 'H (BLOQUEADO)';
                else if (rId === 1) contentInRouter = 'D1 (ESPERANDO)';
                else if (rId === 0) contentInRouter = 'D2 (ESPERANDO)';
              } else if (step === 4 && rId === 3) contentInRouter = 'Cabecera (H)';
              else if (step === 4 && rId === 2) contentInRouter = 'Dato 1 (D1)';
              else if (step === 4 && rId === 1) contentInRouter = 'Dato 2 (D2)';
              else if (step === 5 && rId === 3) contentInRouter = 'Dato 1 (D1)';
              else if (step === 5 && rId === 2) contentInRouter = 'Dato 2 (D2)';
              else if (step === 6 && rId === 3) contentInRouter = 'Dato 2 (D2)';
              else if (step >= 7 && rId === 3) contentInRouter = 'Llegada Completa';
            } else {
              // Store and Forward: waits for full packet in each node
              if (step <= 2 && rId === 0) contentInRouter = 'Paquete Completo (3 flits)';
              else if (step >= 3 && step <= 4 && rId === 1) contentInRouter = 'Paquete Completo (3 flits)';
              else if (step >= 5 && isCongested && rId === 1) contentInRouter = 'Retenido en R1 (Búfer lleno)';
              else if (step >= 5 && step <= 6 && rId === 2) contentInRouter = 'Paquete Completo (3 flits)';
              else if (step >= 7 && rId === 3) contentInRouter = 'Paquete Entregado';
            }

            return (
              <div 
                key={rId}
                className={`z-10 rounded-xl p-4 border flex flex-col items-center justify-between min-h-[140px] transition-all ${
                  isBlockedHere ? 'bg-rose-950/40 border-rose-500 shadow-lg shadow-rose-950/40' :
                  contentInRouter ? 'bg-cyan-950/30 border-cyan-500/60 shadow-lg shadow-cyan-950/20' :
                  'bg-slate-900 border-white/10'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-mono text-xs font-bold text-slate-300">
                    Router {rId}
                  </span>
                  <span className={`w-2 h-2 rounded-full ${
                    isBlockedHere ? 'bg-rose-500 animate-ping' :
                    contentInRouter ? 'bg-cyan-400 animate-pulse' : 'bg-slate-700'
                  }`} />
                </div>

                {/* Content inside router buffer */}
                <div className="my-2 text-center w-full">
                  {contentInRouter ? (
                    <span className={`inline-block px-2.5 py-1.5 rounded-lg font-mono text-xs font-bold ${
                      isBlockedHere ? 'bg-rose-500 text-white animate-pulse' :
                      'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    }`}>
                      {contentInRouter}
                    </span>
                  ) : (
                    <span className="text-[11px] font-mono text-slate-600">Búfer Libre</span>
                  )}
                </div>

                <span className="text-[10px] text-slate-500 font-mono">
                  {mode === 'wormhole' ? 'Capacidad: 1 Flit' : 'Capacidad: Paquete'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Explanation of current state */}
      <div className="bg-slate-900/80 p-4 rounded-xl border border-white/5 flex gap-3 items-start">
        <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300 leading-relaxed space-y-1">
          <strong className="text-white block font-semibold">
            {mode === 'wormhole' ? 'Mecanismo Wormhole (Gusano):' : 'Mecanismo Store-and-Forward:'}
          </strong>
          {mode === 'wormhole' ? (
            <p>
              El paquete se segmenta en <strong>flits</strong>. El flit de cabecera avanza abriendo caminos; los flits de datos le siguen inmediatamente ocupando búferes diminutos en cada conmutador. 
              {isCongested && (
                <span className="text-rose-400 font-semibold block mt-1">
                  ¡Atención ante bloqueo! Al bloquearse la cabecera en Router 2, el cuerpo del mensaje queda congelado a lo largo de los Router 1 y Router 0, impidiendo que otros paquetes usen esos enlaces (bloqueo en cadena).
                </span>
              )}
            </p>
          ) : (
            <p>
              Cada conmutador debe recibir y almacenar en memoria el <strong>paquete completo</strong> antes de poder transmitir el primer bit al siguiente router. La latencia se multiplica por la cantidad de saltos, pero si hay bloqueo, el paquete queda confinado en un solo conmutador.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
