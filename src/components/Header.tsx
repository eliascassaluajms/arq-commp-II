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
  Layers
} from 'lucide-react';

interface HeaderProps {
  currentView: ViewMode;
  onSelectView: (view: ViewMode) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onSelectView }) => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState<boolean>(false);

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
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstallable(false);
    }
    setDeferredPrompt(null);
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
            {isInstallable && (
              <button
                onClick={handleInstallClick}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-semibold transition-all active:scale-95 animate-pulse-subtle"
                title="Instalar aplicación en dispositivo (PWA)"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Instalar App</span>
              </button>
            )}

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
    </header>
  );
};
