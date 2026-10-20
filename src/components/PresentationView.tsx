import React, { useState, useEffect, useCallback } from 'react';
import { presentationDecks } from '../data/presentationData';
import { PresentationDeck, SlideItem } from '../types';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize, 
  Minimize, 
  Clock, 
  FileText, 
  Play, 
  Pause, 
  RotateCcw,
  Layers,
  Cpu,
  Network,
  Lightbulb,
  Radio,
  BookOpen
} from 'lucide-react';
import { ArchitecturalDiagramRenderer } from './ArchitecturalDiagrams/ArchitecturalDiagramRenderer';

interface PresentationViewProps {
  initialUnitNumber?: number;
  onExitPresentation?: () => void;
}

export const PresentationView: React.FC<PresentationViewProps> = ({ 
  initialUnitNumber = 1,
  onExitPresentation
}) => {
  const [selectedUnitNum, setSelectedUnitNum] = useState<number>(initialUnitNumber);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  
  // Timer for lecture pacing
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);

  const currentDeck = presentationDecks.find(d => d.unitNumber === selectedUnitNum) || presentationDecks[0];
  const totalSlides = currentDeck.slides.length;
  const currentSlide: SlideItem = currentDeck.slides[currentSlideIndex] || currentDeck.slides[0];

  // Lecture Stopwatch
  useEffect(() => {
    let interval: any;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const nextSlide = useCallback(() => {
    setCurrentSlideIndex(prev => Math.min(prev + 1, totalSlides - 1));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlideIndex(prev => Math.max(prev - 1, 0));
  }, []);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space' || e.key === 'PageDown') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevSlide();
      } else if (e.key.toLowerCase() === 'n') {
        setShowSpeakerNotes(prev => !prev);
      } else if (e.key.toLowerCase() === 'f') {
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Bar: Deck Selector & Presenter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/90 p-3 rounded-2xl border border-white/10">
        
        {/* Unit Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
          {presentationDecks.map((deck) => (
            <button
              key={deck.unitId}
              onClick={() => { setSelectedUnitNum(deck.unitNumber); setCurrentSlideIndex(0); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedUnitNum === deck.unitNumber
                  ? 'bg-cyan-500 text-black font-extrabold shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Unidad {deck.unitNumber}
            </button>
          ))}
        </div>

        {/* Presenter Utilities: Stopwatch, Notes toggle, Fullscreen */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Lecture Timer */}
          <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-lg border border-white/10 text-xs font-mono text-cyan-300">
            <Clock className="w-3.5 h-3.5 text-cyan-400 animate-pulse-subtle" />
            <span>{formatTimer(timerSeconds)}</span>
            <button 
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="text-slate-400 hover:text-white ml-1"
              title={isTimerRunning ? 'Pausar cronómetro' : 'Reanudar cronómetro'}
            >
              {isTimerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            </button>
            <button 
              onClick={() => setTimerSeconds(0)}
              className="text-slate-400 hover:text-white ml-0.5"
              title="Reiniciar cronómetro"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          {/* Speaker Notes Toggle */}
          <button
            onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              showSpeakerNotes
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-800 text-slate-300 border-white/5 hover:bg-slate-700'
            }`}
            title="Presione tecla 'N' para alternar notas de cátedra"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Notas de Cátedra (N)</span>
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-white/5"
            title="Pantalla completa (F)"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Slide Canvas Screen */}
      <div className="relative glass-panel-glow rounded-3xl p-8 sm:p-14 min-h-[520px] flex flex-col justify-between border border-cyan-500/20 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-cyan-500/10 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />
        
        {/* Slide Category Header & Academic watermark */}
        <div className="flex justify-between items-center border-b border-white/10 pb-4 relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping-slow" />
            <span className="font-mono text-xs uppercase tracking-wider font-bold text-cyan-400">
              {currentSlide.category}
            </span>
          </div>

          <div className="font-mono text-xs text-slate-400">
            Diapositiva <strong className="text-white">{currentSlideIndex + 1}</strong> de {totalSlides}
          </div>
        </div>

        {/* Slide Main Content (Responsive dual column if diagramType exists) */}
        {currentSlide.diagramType ? (
          <div className="my-auto py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full relative z-10">
            {/* Left Column: Theory, Bullets, and Pedagogy */}
            <div className="lg:col-span-6 space-y-5">
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
                  {currentSlide.title}
                </h2>
                {currentSlide.subtitle && (
                  <p className="text-sm sm:text-base font-medium text-cyan-300 font-sans">
                    {currentSlide.subtitle}
                  </p>
                )}
              </div>

              {/* Paragraphs */}
              {currentSlide.content && currentSlide.content.length > 0 && (
                <div className="space-y-3 text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {currentSlide.content.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              )}

              {/* Bullets */}
              {currentSlide.bullets && currentSlide.bullets.length > 0 && (
                <ul className="space-y-2.5 pt-1">
                  {currentSlide.bullets.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0 shadow-sm shadow-cyan-400" />
                      <span className="leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Analogy Box */}
              {currentSlide.analogy && (
                <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-3.5 flex gap-3 items-start">
                  <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5 animate-pulse-subtle" />
                  <div className="text-xs text-amber-200 leading-relaxed">
                    <strong className="text-amber-300 block font-bold text-[10px] uppercase tracking-wider mb-0.5">
                      Analogía Clave para el Alumno:
                    </strong>
                    {currentSlide.analogy}
                  </div>
                </div>
              )}

              {/* Key Takeaway */}
              {currentSlide.keyIdea && (
                <div className="bg-cyan-950/30 border border-cyan-500/40 rounded-xl p-3.5 flex gap-3 items-center">
                  <Radio className="w-4 h-4 text-cyan-400 shrink-0 animate-pulse" />
                  <span className="text-xs font-semibold text-cyan-200">
                    {currentSlide.keyIdea}
                  </span>
                </div>
              )}
            </div>

            {/* Right Column: Architectural Interactive Hardware Diagram */}
            <div className="lg:col-span-6">
              <div className="glass-panel-glow rounded-3xl p-4 sm:p-5 border border-cyan-500/30 shadow-2xl relative">
                <ArchitecturalDiagramRenderer 
                  type={currentSlide.diagramType} 
                  title={`Esquema Cátedra: ${currentSlide.title}`}
                  allowExpand={true}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="my-auto py-8 space-y-6 relative z-10 max-w-4xl mx-auto">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                {currentSlide.title}
              </h2>
              {currentSlide.subtitle && (
                <p className="text-base sm:text-xl font-medium text-cyan-300 font-sans">
                  {currentSlide.subtitle}
                </p>
              )}
            </div>

            {/* Paragraphs */}
            {currentSlide.content && currentSlide.content.length > 0 && (
              <div className="space-y-4 text-sm sm:text-lg text-slate-200 leading-relaxed">
                {currentSlide.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            )}

            {/* Bullets */}
            {currentSlide.bullets && currentSlide.bullets.length > 0 && (
              <ul className="space-y-3 pt-2">
                {currentSlide.bullets.map((b, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-base text-slate-200">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 mt-2 shrink-0 shadow-sm shadow-cyan-400" />
                    <span className="leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Analogy Callout Box */}
            {currentSlide.analogy && (
              <div className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-4 sm:p-5 flex gap-3.5 items-start">
                <Lightbulb className="w-6 h-6 text-amber-400 shrink-0 mt-0.5 animate-pulse-subtle" />
                <div className="text-xs sm:text-sm text-amber-200 leading-relaxed">
                  <strong className="text-amber-300 block font-bold text-xs uppercase tracking-wider mb-1">
                    Analogía Clave para el Alumno:
                  </strong>
                  {currentSlide.analogy}
                </div>
              </div>
            )}

            {/* Key Takeaway / Idea */}
            {currentSlide.keyIdea && (
              <div className="bg-cyan-950/30 border border-cyan-500/40 rounded-2xl p-4 sm:p-5 flex gap-3.5 items-center">
                <Radio className="w-5 h-5 text-cyan-400 shrink-0 animate-pulse" />
                <span className="text-xs sm:text-sm font-semibold text-cyan-200">
                  {currentSlide.keyIdea}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Slide Footer Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10 pt-4 relative z-10 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <span>Docente: <strong>Ing. Elias Cassal</strong> • UAJMS Informática</span>
          </div>

          {/* Slide Progress Dots / Bar */}
          <div className="flex items-center gap-1.5">
            {currentDeck.slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentSlideIndex 
                    ? 'w-8 bg-cyan-400 shadow-sm shadow-cyan-400' 
                    : 'w-2 bg-slate-700 hover:bg-slate-500'
                }`}
                title={`Ir a diapositiva ${idx + 1}`}
              />
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              disabled={currentSlideIndex === 0}
              className="flex items-center gap-1 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white font-semibold text-xs border border-white/5 active:scale-95 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            <button
              onClick={nextSlide}
              disabled={currentSlideIndex === totalSlides - 1}
              className="flex items-center gap-1 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-30 text-black font-extrabold text-xs shadow-md shadow-cyan-500/20 active:scale-95 transition-all"
            >
              <span>Siguiente</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Speaker Notes Drawer (Guión del docente) */}
      {showSpeakerNotes && (
        <div className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-5 sm:p-6 space-y-2 animate-fadeIn">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
            <FileText className="w-4 h-4 text-amber-400" />
            <span>Guión Pedagógico y Notas para el Profesor:</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
            {currentSlide.speakerNotes}
          </p>
          <div className="text-[11px] font-mono text-slate-500 pt-1">
            Atajos de teclado: [Flecha Derecha / Espacio] Siguiente • [Flecha Izquierda] Anterior • [F] Pantalla Completa • [N] Ocultar Notas
          </div>
        </div>
      )}
    </div>
  );
};
