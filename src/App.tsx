import React, { useState } from 'react';
import { ViewMode } from './types';
import { Header } from './components/Header';
import { CurriculumView } from './components/CurriculumView';
import { TextbookView } from './components/TextbookView';
import { PresentationView } from './components/PresentationView';
import { LaboratoriesView } from './components/LaboratoriesView';
import { ActivitiesView } from './components/ActivitiesView';
import { EvaluationView } from './components/EvaluationView';
import { 
  Cpu, 
  Layers, 
  Terminal, 
  Mail, 
  Phone, 
  ShieldCheck, 
  Radio,
  BookOpen,
  GraduationCap
} from 'lucide-react';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewMode>('curriculum');
  const [selectedUnit, setSelectedUnit] = useState<number>(1);

  const handleNavigateWithUnit = (view: ViewMode, unitNumber: number) => {
    setSelectedUnit(unitNumber);
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectView = (view: ViewMode) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#080d1a] text-slate-100 antialiased selection:bg-cyan-500 selection:text-black">
      {/* Top Navbar */}
      <Header currentView={currentView} onSelectView={handleSelectView} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {currentView === 'curriculum' && (
          <CurriculumView 
            onNavigateToView={handleSelectView} 
            onSelectUnit={(unit) => setSelectedUnit(unit)} 
          />
        )}

        {currentView === 'textbook' && (
          <TextbookView 
            initialUnitNumber={selectedUnit} 
            onNavigateToPresentation={(unit) => handleNavigateWithUnit('presentation', unit)} 
          />
        )}

        {currentView === 'presentation' && (
          <PresentationView 
            initialUnitNumber={selectedUnit} 
            onExitPresentation={() => setCurrentView('textbook')} 
          />
        )}

        {currentView === 'laboratories' && (
          <LaboratoriesView />
        )}

        {currentView === 'activities' && (
          <ActivitiesView />
        )}

        {currentView === 'evaluation' && (
          <EvaluationView />
        )}
      </main>

      {/* Institutional Academic Footer */}
      <footer className="bg-slate-950/80 border-t border-white/10 mt-16 py-10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-xs">
            {/* Subject info */}
            <div className="space-y-2 md:col-span-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Cpu className="w-4 h-4 animate-ambient-glow" />
                </div>
                <strong className="text-white text-sm font-extrabold tracking-tight">
                  Arquitectura de Computadores II (DIC122)
                </strong>
              </div>
              <p className="text-slate-400 leading-relaxed max-w-md">
                Texto Digital Interactivo y Plataforma Educativa desarrollada bajo el enfoque de Formación Basada en Competencias (FBC) para la Carrera de Ingeniería Informática de la UAJMS.
              </p>
            </div>

            {/* Teaching Details */}
            <div className="space-y-2">
              <strong className="text-white block font-semibold uppercase tracking-wider text-[11px] font-mono text-cyan-400">
                Cátedra y Docente
              </strong>
              <div className="space-y-1.5 text-slate-300">
                <p className="font-semibold text-white">Ing. Elias Cassal Valdiviezo</p>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <span>eliascassal@uajms.edu.bo</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>731016652</span>
                </div>
              </div>
            </div>

            {/* Architecture Architecture Details */}
            <div className="space-y-2">
              <strong className="text-white block font-semibold uppercase tracking-wider text-[11px] font-mono text-cyan-400">
                Despliegue y Arquitectura
              </strong>
              <div className="space-y-1 text-slate-400 font-mono text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>PWA Progressive Web App (Offline Ready)</span>
                </div>
                <div>Docker Container: arq-comp-pwa</div>
                <div>Single Page Application (React 18 + Vite)</div>
                <div>Repositorio: Git versionado</div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] text-slate-500 font-mono">
            <span>© 2026 Universidad Autónoma Juan Misael Saracho • Tarija, Bolivia</span>
            <span>Versión 2.0 • Modelo de Formación Basada en Competencias (FBC)</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
