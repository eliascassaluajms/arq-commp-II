import React, { useState } from 'react';
import { textbookUnits } from '../data/textbookData';
import { TextbookUnit, TextbookSection, ViewMode } from '../types';
import { 
  BookOpen, 
  Search, 
  ChevronRight, 
  Cpu, 
  Zap, 
  AlertTriangle, 
  Lightbulb, 
  Presentation, 
  Bookmark, 
  ArrowRight,
  Share2,
  Table,
  Sigma
} from 'lucide-react';
import { SpeedupSimulator } from './Simulators/SpeedupSimulator';
import { CacheCoherenceSimulator } from './Simulators/CacheCoherenceSimulator';
import { TopologyVisualizer } from './Simulators/TopologyVisualizer';
import { WormholeSimulator } from './Simulators/WormholeSimulator';
import { ArchitecturalDiagramRenderer, DiagramType } from './ArchitecturalDiagrams/ArchitecturalDiagramRenderer';

interface TextbookViewProps {
  initialUnitNumber?: number;
  onNavigateToPresentation?: (unitNumber: number) => void;
}

export const TextbookView: React.FC<TextbookViewProps> = ({ initialUnitNumber = 1, onNavigateToPresentation }) => {
  const [selectedUnitNum, setSelectedUnitNum] = useState<number>(initialUnitNumber);
  const [activeSectionId, setActiveSectionId] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const currentUnit = textbookUnits.find(u => u.number === selectedUnitNum) || textbookUnits[0];

  const getUnitDiagramType = (unitNum: number): DiagramType => {
    switch (unitNum) {
      case 1: return 'flynn';
      case 2: return 'network';
      case 3: return 'coherence';
      case 4: return 'directory';
      case 5: return 'embedded';
      case 6: return 'cloud';
      default: return 'flynn';
    }
  };

  // Search filter across all units and sections
  const filteredSections = searchQuery.trim() === ''
    ? currentUnit.sections
    : currentUnit.sections.filter(sec => 
        sec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sec.content.some(p => p.toLowerCase().includes(searchQuery.toLowerCase())) ||
        sec.keyConcepts?.some(k => k.term.toLowerCase().includes(searchQuery.toLowerCase()))
      );

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Unit Selector Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/80 p-3 rounded-2xl border border-white/10">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
          {textbookUnits.map((u) => {
            const isSelected = u.number === selectedUnitNum;
            return (
              <button
                key={u.id}
                onClick={() => { setSelectedUnitNum(u.number); setSearchQuery(''); }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all active:scale-95 ${
                  isSelected
                    ? 'bg-cyan-500 text-black font-extrabold shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <span className="font-mono">Unidad {u.number}</span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar concepto o tema..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950/80 border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Unit Header Banner */}
      <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 space-y-3 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="px-3 py-1 rounded-full font-mono text-xs font-bold bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 w-fit">
            TEXTO DIGITAL OFICIAL • {currentUnit.ecId}
          </span>

          {onNavigateToPresentation && (
            <button
              onClick={() => onNavigateToPresentation(currentUnit.number)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-cyan-400 font-semibold border border-cyan-500/20 active:scale-95 w-fit"
            >
              <Presentation className="w-3.5 h-3.5" />
              <span>Ver Diapositivas de la Unidad {currentUnit.number}</span>
            </button>
          )}
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Unidad {currentUnit.number}: {currentUnit.title}
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-4xl">
          {currentUnit.summary}
        </p>
      </div>

      {/* Unit Architectural Schematic Illustration */}
      <div className="bg-slate-900/60 p-5 rounded-3xl border border-cyan-500/30 shadow-xl">
        <ArchitecturalDiagramRenderer 
          type={getUnitDiagramType(currentUnit.number)} 
          title={`Esquema Canónico de Hardware • Unidad ${currentUnit.number}`}
          allowExpand={true}
        />
      </div>

      {/* Sections List */}
      <div className="space-y-8">
        {filteredSections.map((sec) => (
          <article 
            key={sec.id}
            id={sec.id}
            className="glass-panel rounded-3xl p-6 sm:p-10 space-y-6 border border-white/10 relative overflow-hidden"
          >
            {/* Section Header */}
            <div className="border-b border-white/10 pb-4 space-y-1">
              <span className="font-mono text-xs font-bold text-cyan-400 tracking-wider">
                SECCIÓN {sec.subtopicNumber}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {sec.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {sec.summary}
              </p>
            </div>

            {/* Paragraphs */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
              {sec.content.map((p, pIdx) => (
                <p key={pIdx}>
                  {p}
                </p>
              ))}
            </div>

            {/* Analogies Callout */}
            {sec.analogies && sec.analogies.length > 0 && (
              <div className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-4 sm:p-5 flex gap-3.5 items-start">
                <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5 animate-pulse-subtle" />
                <div className="space-y-1 text-xs sm:text-sm text-amber-200/90 leading-relaxed">
                  <strong className="text-amber-300 block font-bold text-xs uppercase tracking-wider">
                    Analogía Didáctica de Cátedra:
                  </strong>
                  {sec.analogies.map((a, i) => (
                    <p key={i}>{a}</p>
                  ))}
                </div>
              </div>
            )}

            {/* Mathematical Formulas */}
            {sec.formulas && sec.formulas.length > 0 && (
              <div className="space-y-4 pt-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Sigma className="w-4 h-4 text-cyan-400" />
                  Formulaciones Matemáticas y Leyes:
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sec.formulas.map((fItem, fIdx) => (
                    <div key={fIdx} className="bg-slate-900/90 p-4 rounded-2xl border border-white/10 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-cyan-300">{fItem.name}</span>
                      </div>
                      <div className="bg-black/40 p-3 rounded-xl border border-white/5 font-mono text-center text-sm font-bold text-white tracking-wide">
                        {fItem.expression}
                      </div>
                      <p className="text-[11px] text-slate-400">{fItem.description}</p>
                      
                      <div className="pt-2 border-t border-white/5 space-y-1">
                        <span className="text-[10px] uppercase font-mono text-slate-500 font-bold block">Variables:</span>
                        {fItem.variables.map((v, vIdx) => (
                          <div key={vIdx} className="text-[11px] font-mono flex gap-2 text-slate-400">
                            <span className="text-cyan-400 font-bold">{v.symbol}:</span>
                            <span>{v.meaning}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Comparative Tables */}
            {sec.comparativeTables && sec.comparativeTables.map((tbl, tIdx) => (
              <div key={tIdx} className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Table className="w-4 h-4 text-cyan-400" />
                  {tbl.title}
                </h4>

                <div className="overflow-x-auto rounded-2xl border border-white/10">
                  <table className="w-full text-left text-xs text-slate-300 divide-y divide-white/10">
                    <thead className="bg-slate-900/90 font-mono text-[11px] uppercase text-cyan-400 font-bold">
                      <tr>
                        {tbl.headers.map((h, hIdx) => (
                          <th key={hIdx} className="px-4 py-3 whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 bg-slate-950/60 font-sans">
                      {tbl.rows.map((r, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-900/40 transition-colors">
                          {r.map((cell, cIdx) => (
                            <td key={cIdx} className={`px-4 py-3 leading-relaxed ${cIdx === 0 ? 'font-bold text-white font-mono' : ''}`}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}

            {/* Key Concepts Definition Cards */}
            {sec.keyConcepts && sec.keyConcepts.length > 0 && (
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Conceptos Clave de la Sección:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {sec.keyConcepts.map((kc, kIdx) => (
                    <div key={kIdx} className="bg-slate-900/70 p-3.5 rounded-xl border border-white/5 space-y-1">
                      <strong className="text-cyan-300 text-xs font-semibold block">{kc.term}</strong>
                      <p className="text-[11px] text-slate-400 leading-snug">{kc.definition}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Embedded Interactive Simulator Trigger / Inline Simulator */}
            {sec.interactiveType === 'speedup' && (
              <div className="pt-4 border-t border-white/10">
                <SpeedupSimulator />
              </div>
            )}

            {sec.interactiveType === 'coherence' && (
              <div className="pt-4 border-t border-white/10">
                <CacheCoherenceSimulator />
              </div>
            )}

            {sec.interactiveType === 'topology' && (
              <div className="pt-4 border-t border-white/10">
                <TopologyVisualizer />
              </div>
            )}

            {sec.interactiveType === 'wormhole' && (
              <div className="pt-4 border-t border-white/10">
                <WormholeSimulator />
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
};
