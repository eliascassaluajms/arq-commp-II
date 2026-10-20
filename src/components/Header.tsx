import React, { useState, useEffect } from 'react';
import { ViewMode } from '../types';
import { 
  GraduationCap, 
  BookOpen, 
  Presentation, 
  Cpu, 
  FileText, 
  CheckSquare, 
  Download, 
  Maximize, 
  Minimize,
  Terminal,
  Layers,
  X,
  Smartphone,
  Monitor,
  WifiOff
} from 'lucide-react';

interface HeaderProps {
  currentView: ViewMode;
  onSelectView: (view: ViewMode) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onSelectView }) => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState<boolean>(false);
  const [showInstallModal, setShowInstallModal] = useState<boolean>(false);

  useEffect(() => {
    // Listen for PWA install prompt
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // Fullscreen change listener
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      document.removeEventListener('fullscreenchange', handleFsChange);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstallable(false);
      }
      setDeferredPrompt(null);
    } else {
      setShowInstallModal(true);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => console.log(err));
    } else {
      document.exitFullscreen().catch(err => console.log(err));
    }
  };

  const navItems: { id: ViewMode; label: string; icon: any; highlight?: boolean }[] = [
    { id: 'curriculum', label: 'Plan FBC', icon: GraduationCap },
    { id: 'textbook', label: 'Texto Digital', icon: BookOpen },
    { id: 'presentation', label: 'Modo Cátedra', icon: Presentation, highlight: true },
    { id: 'laboratories', label: 'Simuladores', icon: Cpu },
    { id: 'activities', label: 'Actividades', icon: FileText },
    { id: 'evaluation', label: 'Evaluaciones', icon: CheckSquare },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#080d1a]/90 backdrop-blur-md border-b border-white/10 transition-all">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Brand Logo & Academic Subject */}
          <div 
            onClick={() => onSelectView('curriculum')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            {/* Animated Micro-chip Icon (Active movement without mouseover) */}
            <div className="relative w-10 h-10 rounded-xl bg-slate-900 border border-cyan-500/40 flex items-center justify-center overflow-hidden shadow-lg shadow-cyan-500/10">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-amber-500/10" />
              {/* Spinning subtle orbit */}
              <div className="absolute inset-0 border border-cyan-400/20 rounded-xl animate-spin-slow pointer-events-none" />
              {/* Central Processor indicator */}
              <Layers className="w-5 h-5 text-cyan-400 animate-ambient-glow" />
              {/* Corner status pulse */}
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping-slow" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-cyan-400 tracking-wider uppercase bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/60">
                  DIC122 • UAJMS
                </span>
                <span className="text-[11px] font-mono text-slate-500 hidden md:inline">
                  FBC V2
                </span>
              </div>
              <h1 className="text-sm sm:text-base font-extrabold text-white tracking-tight leading-tight group-hover:text-cyan-300 transition-colors">
                Arquitectura de Computadores II
              </h1>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/80 p-1.5 rounded-xl border border-white/5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectView(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/20 font-bold'
                      : item.highlight
                      ? 'text-cyan-400 hover:text-white hover:bg-slate-800/80 border border-cyan-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-black' : item.highlight ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Quick Actions (PWA install + Fullscreen toggle) */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleInstallClick}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-semibold transition-all active:scale-95 shadow-sm shadow-emerald-500/10"
              title="Instalar como Aplicación PWA descargable (Offline)"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Instalar PWA</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse hidden md:inline" />
            </button>

            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-300 hover:text-white transition-all active:scale-95"
              title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa para clases'}
            >
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex lg:hidden overflow-x-auto py-2 gap-1.5 scrollbar-none border-t border-white/5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectView(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-cyan-500 text-black font-bold'
                    : 'text-slate-400 hover:text-white bg-slate-900/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* PWA Installation & Offline Guide Modal */}
      {showInstallModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-cyan-500/30 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowInstallModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Download className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Instalar Aplicación (PWA)</h3>
                <p className="text-xs text-slate-400">Texto Digital y Simuladores de Arquitectura de Computadores II</p>
              </div>
            </div>

            <div className="space-y-3 my-4">
              <div className="p-3 rounded-xl bg-slate-800/60 border border-white/5 flex items-start gap-3">
                <WifiOff className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-300">
                  <p className="font-semibold text-white mb-0.5">Acceso 100% Offline</p>
                  El libro digital, las presentaciones magistrales y los simuladores funcionan sin conexión a internet una vez descargados en tu equipo o móvil.
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/60 border border-white/5 flex items-start gap-3">
                <Monitor className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-300">
                  <p className="font-semibold text-white mb-0.5">En Computadora (Chrome / Edge / Brave)</p>
                  Haz clic en el ícono de instalación <strong className="text-cyan-300">(⊕ o botón "Instalar")</strong> en la barra de direcciones de tu navegador para añadirla como app de escritorio independiente.
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/60 border border-white/5 flex items-start gap-3">
                <Smartphone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-300">
                  <p className="font-semibold text-white mb-0.5">En Celular / Tablet (Android / iOS)</p>
                  • En Android (Chrome): Menú <strong className="text-slate-200">⋮</strong> &gt; <strong className="text-amber-300">"Instalar aplicación"</strong>.<br />
                  • En iPhone/iPad (Safari): Botón <strong className="text-slate-200">Compartir</strong> &gt; <strong className="text-amber-300">"Agregar a inicio"</strong>.
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
              <button
                onClick={() => setShowInstallModal(false)}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs transition-colors"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
