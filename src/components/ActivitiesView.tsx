import React, { useState } from 'react';
import { activityGuides } from '../data/activitiesData';
import { ActivityGuide } from '../types';
import { 
  FileText, 
  CheckCircle2, 
  Clock, 
  Award, 
  Layers, 
  Download, 
  ShieldCheck, 
  ChevronRight,
  Building,
  Terminal,
  FolderGit2
} from 'lucide-react';
import { ArchitecturalDiagramRenderer, DiagramType } from './ArchitecturalDiagrams/ArchitecturalDiagramRenderer';

export const ActivitiesView: React.FC = () => {
  const [selectedActivityId, setSelectedActivityId] = useState<string>(activityGuides[0].id);

  const activeActivity = activityGuides.find(a => a.id === selectedActivityId) || activityGuides[0];

  const getActivityDiagramType = (id: string): DiagramType => {
    switch (id) {
      case 'caso-uajms': return 'cluster';
      case 'caso-sicoes': return 'smp_numa';
      case 'act-supercomputador': return 'cluster';
      case 'act-proc-paralelo': return 'speedup';
      case 'act-evaluacion-rendimiento': return 'cores';
      default: return 'network';
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 space-y-3 relative overflow-hidden">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping-slow" />
          <span className="font-mono text-xs uppercase tracking-wider font-bold text-amber-300">
            ACTIVIDADES AUTÓNOMAS Y CASOS DE ESTUDIO REALES
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Actividades de Aprendizaje y Casos Aplicados
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-4xl">
          Instrucciones detalladas, fases de ejecución, rúbricas de evaluación y especificaciones técnicas para el trabajo autónomo y en equipo, vinculadas a casos reales del entorno nacional (UAJMS, SICOES) y experimentación en clúster.
        </p>
      </div>

      {/* Activity Selector Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {activityGuides.map((act) => {
          const isSelected = act.id === selectedActivityId;
          return (
            <button
              key={act.id}
              onClick={() => setSelectedActivityId(act.id)}
              className={`p-4 rounded-2xl border text-left transition-all active:scale-95 ${
                isSelected
                  ? 'bg-amber-500 text-black border-amber-400 font-bold shadow-lg shadow-amber-500/20'
                  : 'bg-slate-900/80 border-white/10 text-slate-300 hover:border-amber-500/40 hover:bg-slate-800'
              }`}
            >
              <div className="flex justify-between items-center mb-1.5">
                <span className={`font-mono text-[11px] font-extrabold ${isSelected ? 'text-black' : 'text-amber-400'}`}>
                  {act.ecId} • UNIDAD {act.unitNumber}
                </span>
                <span className={`text-[10px] font-mono uppercase px-1.5 py-0.5 rounded ${
                  isSelected ? 'bg-black/20 text-black' : 'bg-slate-800 text-slate-400'
                }`}>
                  {act.type}
                </span>
              </div>
              <div className="text-xs font-semibold line-clamp-2 leading-snug">
                {act.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Activity Details */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 space-y-8 border border-white/10 relative overflow-hidden">
        {/* Activity Header */}
        <div className="border-b border-white/10 pb-6 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full font-mono font-bold text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30">
              {activeActivity.ecId} • {activeActivity.type.toUpperCase()}
            </span>
            <span className="flex items-center gap-1 font-mono text-xs text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-white/5">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              {activeActivity.estimatedHours}
            </span>
          </div>

          <h3 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
            {activeActivity.title}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs sm:text-sm">
            <div className="bg-slate-900/70 p-4 rounded-xl border border-white/5 space-y-1">
              <strong className="text-white block font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                Objetivo General:
              </strong>
              <p className="text-slate-300 leading-relaxed">{activeActivity.generalObjective}</p>
            </div>

            <div className="bg-slate-900/70 p-4 rounded-xl border border-white/5 space-y-1">
              <strong className="text-white block font-semibold flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                Competencia Vinculada:
              </strong>
              <p className="text-slate-300 leading-relaxed">{activeActivity.specificCompetence}</p>
            </div>
          </div>
        </div>

        {/* Technical Architectural Diagram for Case Study / Activity */}
        <div className="bg-slate-900/60 p-5 rounded-3xl border border-cyan-500/30 shadow-xl">
          <ArchitecturalDiagramRenderer 
            type={getActivityDiagramType(activeActivity.id)} 
            title={`Esquema Técnico de Hardware: ${activeActivity.title}`}
            allowExpand={true}
          />
        </div>

        {/* Prerequisites */}
        <div className="space-y-2">
          <strong className="text-xs uppercase font-bold tracking-wider text-slate-400 block">
            Prerrequisitos y Entorno Requerido:
          </strong>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
            {activeActivity.prerequisites.map((req, idx) => (
              <li key={idx} className="bg-slate-900/60 p-3 rounded-xl border border-white/5 flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Development Phases */}
        <div className="space-y-4">
          <h4 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            Fases de Desarrollo y Procedimiento
          </h4>

          <div className="space-y-4">
            {activeActivity.phases.map((phase) => (
              <div 
                key={phase.phaseNumber}
                className="bg-slate-900/80 rounded-2xl p-5 border border-white/5 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2">
                  <span className="font-bold text-white text-sm flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center justify-center font-mono text-xs font-bold">
                      {phase.phaseNumber}
                    </span>
                    {phase.title}
                  </span>
                  <span className="font-mono text-xs text-slate-400">
                    Duración Estimada: <strong className="text-slate-200">{phase.duration}</strong>
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-300 pl-8">
                  <strong className="text-slate-400 block uppercase font-mono text-[10px]">Instrucciones:</strong>
                  <ul className="space-y-1 list-disc list-inside">
                    {phase.instructions.map((inst, i) => (
                      <li key={i}>{inst}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-black/30 rounded-xl p-3 border border-white/5 ml-8 text-xs font-mono text-cyan-300/90 flex items-center gap-2">
                  <span className="text-slate-500 font-bold uppercase text-[10px]">Producto Esperado:</span>
                  <span>{phase.expectedOutput}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Evaluation Rubric Matrix */}
        <div className="space-y-4">
          <h4 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            Rúbrica Analítica de Calificación
          </h4>

          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-left text-xs text-slate-300 divide-y divide-white/10">
              <thead className="bg-slate-900 font-mono text-[11px] uppercase text-amber-400 font-bold">
                <tr>
                  <th className="px-4 py-3">Criterio de Evaluación</th>
                  <th className="px-4 py-3">Excelente (Nivel Alto)</th>
                  <th className="px-4 py-3">Bueno (Nivel Medio)</th>
                  <th className="px-4 py-3">Regular (Nivel Básico)</th>
                  <th className="px-4 py-3 text-right">Puntaje</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 bg-slate-950/60">
                {activeActivity.rubricCriteria.map((rc, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-900/40 transition-colors">
                    <td className="px-4 py-3 font-bold text-white font-mono">{rc.criterion}</td>
                    <td className="px-4 py-3 text-emerald-300/90 leading-relaxed">{rc.excellent}</td>
                    <td className="px-4 py-3 text-slate-300 leading-relaxed">{rc.good}</td>
                    <td className="px-4 py-3 text-rose-300/80 leading-relaxed">{rc.regular}</td>
                    <td className="px-4 py-3 text-right font-mono font-bold text-amber-400">{rc.points} pts</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Deliverable Specifications */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-0.5">
            <span className="text-slate-400 font-mono block">Formato de Entrega Exigido:</span>
            <strong className="text-white text-sm">{activeActivity.deliverableFormat}</strong>
          </div>
          <span className="font-mono text-cyan-300 bg-cyan-950/80 px-3 py-1.5 rounded-lg border border-cyan-800/60 self-start sm:self-auto">
            Plataforma Virtual UAJMS
          </span>
        </div>
      </div>
    </div>
  );
};
