import React, { useState } from 'react';
import { courseInfo, competencyElements } from '../data/curriculumData';
import { CompetencyElement, ViewMode } from '../types';
import { 
  GraduationCap, 
  Award, 
  Layers, 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  Presentation, 
  Cpu, 
  FileCheck,
  ChevronRight,
  ShieldCheck,
  Mail,
  UserCheck
} from 'lucide-react';

interface CurriculumViewProps {
  onNavigateToView: (view: ViewMode) => void;
  onSelectUnit?: (unitNumber: number) => void;
}

export const CurriculumView: React.FC<CurriculumViewProps> = ({ onNavigateToView, onSelectUnit }) => {
  const [selectedEcId, setSelectedEcId] = useState<string>('EC1');

  const activeEc = competencyElements.find(ec => ec.id === selectedEcId) || competencyElements[0];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero: Subject Overview & Competency Framework Banner */}
      <div className="glass-panel-glow rounded-3xl p-6 sm:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping-slow" />
            PROYECTO FORMATIVO OFICIAL • MODELO FBC V2
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {courseInfo.subject} ({courseInfo.code})
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {courseInfo.justification}
          </p>

          {/* Quick Academic Meta Pill Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10 text-xs">
            <div className="bg-slate-900/60 p-3 rounded-xl border border-white/5">
              <span className="text-slate-400 block font-mono">Institución:</span>
              <strong className="text-white block font-medium">UAJMS - Informática</strong>
            </div>
            <div className="bg-slate-900/60 p-3 rounded-xl border border-white/5">
              <span className="text-slate-400 block font-mono">Carga Horaria:</span>
              <strong className="text-cyan-300 block font-bold">120h Docente • 60h Autónomo</strong>
            </div>
            <div className="bg-slate-900/60 p-3 rounded-xl border border-white/5">
              <span className="text-slate-400 block font-mono">Créditos:</span>
              <strong className="text-amber-400 block font-bold">{courseInfo.credits} Créditos</strong>
            </div>
            <div className="bg-slate-900/60 p-3 rounded-xl border border-white/5">
              <span className="text-slate-400 block font-mono">Docente Titular:</span>
              <strong className="text-white block font-medium truncate">{courseInfo.docente}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Global & Course Competency Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Global Carrera */}
        <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-6 space-y-3 relative overflow-hidden">
          <div className="flex items-center gap-2.5 text-cyan-400 font-bold text-sm tracking-wide uppercase">
            <GraduationCap className="w-5 h-5 text-cyan-400 animate-pulse-subtle" />
            <span>Competencia Global de la Carrera</span>
          </div>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            {courseInfo.globalCompetency}
          </p>
        </div>

        {/* Asignatura */}
        <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-6 space-y-3 relative overflow-hidden">
          <div className="flex items-center gap-2.5 text-amber-400 font-bold text-sm tracking-wide uppercase">
            <Award className="w-5 h-5 text-amber-400 animate-pulse-subtle" />
            <span>Competencia de la Asignatura</span>
          </div>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            {courseInfo.subjectCompetency}
          </p>
        </div>
      </div>

      {/* Interactive Ruta Formativa: 6 Elements of Competence (EC1 a EC6) */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              Ruta Formativa: Elementos de Competencia (EC1 a EC6)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Planificación modular basada en competencias, evidencias e indicadores evaluativos
            </p>
          </div>

          <span className="text-xs font-mono text-cyan-300 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-800/60 self-start sm:self-auto">
            100% Ponderación Semestral
          </span>
        </div>

        {/* EC Badges Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {competencyElements.map((ec) => {
            const isSelected = ec.id === selectedEcId;
            return (
              <button
                key={ec.id}
                onClick={() => setSelectedEcId(ec.id)}
                className={`p-3.5 rounded-xl border text-left transition-all relative overflow-hidden active:scale-95 ${
                  isSelected
                    ? 'bg-cyan-500 text-black border-cyan-400 shadow-lg shadow-cyan-500/25 font-bold'
                    : 'bg-slate-900/80 border-white/10 text-slate-300 hover:border-cyan-500/40 hover:bg-slate-800'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className={`font-mono text-xs font-extrabold ${isSelected ? 'text-black' : 'text-cyan-400'}`}>
                    {ec.id}
                  </span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                    isSelected ? 'bg-black/20 text-black font-extrabold' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {ec.weight}%
                  </span>
                </div>
                <div className="text-xs font-semibold line-clamp-2 leading-snug">
                  {ec.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected EC Detail Card */}
        <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 space-y-6">
          {/* Header of Active EC */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="space-y-1.5 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded font-mono font-extrabold text-xs bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {activeEc.id} • UNIDAD {activeEc.unitNumber}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Ponderación: <strong className="text-amber-400">{activeEc.weight}%</strong> • {activeEc.hoursDocente}h Docente / {activeEc.hoursAutonomous}h Autónomo
                </span>
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {activeEc.title}
              </h4>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {activeEc.description}
              </p>
            </div>

            {/* Direct Action Links */}
            <div className="flex flex-wrap lg:flex-col gap-2 shrink-0">
              <button
                onClick={() => {
                  if (onSelectUnit) onSelectUnit(activeEc.unitNumber);
                  onNavigateToView('textbook');
                }}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold transition-all active:scale-95"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Leer en Texto Digital</span>
              </button>

              <button
                onClick={() => {
                  if (onSelectUnit) onSelectUnit(activeEc.unitNumber);
                  onNavigateToView('presentation');
                }}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-white/10 text-slate-200 text-xs font-semibold transition-all active:scale-95"
              >
                <Presentation className="w-3.5 h-3.5 text-cyan-400" />
                <span>Presentación Magistral</span>
              </button>

              <button
                onClick={() => onNavigateToView('laboratories')}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-white/10 text-slate-200 text-xs font-semibold transition-all active:scale-95"
              >
                <Cpu className="w-3.5 h-3.5 text-amber-400" />
                <span>Simulador del Tema</span>
              </button>
            </div>
          </div>

          {/* Three Dimensions of Competency: Saber, Saber Hacer, Saber Ser */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Saber (Conceptual) */}
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-cyan-500/20 space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>Saber (Conocimientos)</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {activeEc.saber.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Saber Hacer (Procedimental) */}
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-amber-500/20 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span>Saber Hacer (Habilidades)</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {activeEc.saberHacer.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Saber Ser (Actitudinal) */}
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-purple-500/20 space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                <span>Saber Ser (Actitudes)</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {activeEc.saberSer.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Achievement Levels Matrix (Niveles de Logro) */}
          <div className="space-y-3 pt-2">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Escala de Niveles de Logro de la Competencia:
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-700/60 space-y-1">
                <span className="text-[11px] font-mono font-bold text-slate-400 uppercase">Inicial (Receptivo)</span>
                <p className="text-xs text-slate-300 leading-relaxed">{activeEc.achievementLevels.inicial}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-blue-950/20 border border-blue-500/30 space-y-1">
                <span className="text-[11px] font-mono font-bold text-blue-400 uppercase">Básico (Resolutivo)</span>
                <p className="text-xs text-slate-300 leading-relaxed">{activeEc.achievementLevels.basico}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/30 space-y-1">
                <span className="text-[11px] font-mono font-bold text-cyan-300 uppercase">Autónomo (Avanzado)</span>
                <p className="text-xs text-slate-300 leading-relaxed">{activeEc.achievementLevels.autonomo}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-1">
                <span className="text-[11px] font-mono font-bold text-emerald-400 uppercase">Estratégico (Experto)</span>
                <p className="text-xs text-slate-300 leading-relaxed">{activeEc.achievementLevels.estrategico || "Diseña arquitecturas optimizadas de vanguardia con innovación técnica."}</p>
              </div>
            </div>
          </div>

          {/* Evidences, Indicators and Assessment Instruments */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-white/10 text-xs">
            <div className="space-y-2">
              <strong className="text-white block font-semibold flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-cyan-400" />
                Evidencias Requeridas:
              </strong>
              <ul className="space-y-1 text-slate-300 list-disc list-inside">
                {activeEc.evidencias.map((ev, i) => (
                  <li key={i}>{ev}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <strong className="text-white block font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Indicadores de Logro:
              </strong>
              <ul className="space-y-1 text-slate-300 list-disc list-inside">
                {activeEc.indicadores.map((ind, i) => (
                  <li key={i}>{ind}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <strong className="text-white block font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                Instrumentos de Evaluación:
              </strong>
              <ul className="space-y-1 text-slate-300 list-disc list-inside">
                {activeEc.instrumentos.map((inst, i) => (
                  <li key={i}>{inst}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
