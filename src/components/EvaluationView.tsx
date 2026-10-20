import React, { useState, useEffect } from 'react';
import { questionsBank, oralEvaluationRubric, oralExamPromptGenerator } from '../data/evaluationData';
import { Question, QuestionType, OralEvaluationRubricItem } from '../types';
import confetti from 'canvas-confetti';
import { 
  CheckSquare, 
  HelpCircle, 
  Clock, 
  Award, 
  Mic, 
  RotateCcw, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  BookOpen, 
  Filter,
  Volume2
} from 'lucide-react';
import { 
  AnimatedQuizIcon, 
  AnimatedExamIcon, 
  AnimatedOralIcon, 
  AnimatedTrophyIcon 
} from './AnimatedIcons/EvaluationIcons';

export const EvaluationView: React.FC = () => {
  const [evaluationMode, setEvaluationMode] = useState<'interactive_quiz' | 'timed_exam' | 'oral_defense'>('interactive_quiz');
  
  // Quiz Filters
  const [selectedEcFilter, setSelectedEcFilter] = useState<string>('ALL');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('ALL');

  // Interactive Quiz State
  const [userAnswers, setUserAnswers] = useState<Record<string, string[]>>({});
  const [submittedQuestions, setSubmittedQuestions] = useState<Record<string, boolean>>({});

  // Timed Exam State
  const [examStarted, setExamStarted] = useState<boolean>(false);
  const [examFinished, setExamFinished] = useState<boolean>(false);
  const [examTimeLeft, setExamTimeLeft] = useState<number>(30 * 60); // 30 mins
  const [examScore, setExamScore] = useState<number>(0);

  // Oral Defense Simulator State
  const [activeOralIndex, setActiveOralIndex] = useState<number>(0);
  const [oralGrades, setOralGrades] = useState<Record<number, number>>({ 0: 20, 1: 20, 2: 20, 3: 20, 4: 20 });
  const [oralTimer, setOralTimer] = useState<number>(300); // 5 mins
  const [isOralTimerActive, setIsOralTimerActive] = useState<boolean>(false);

  // Filtered Questions
  const filteredQuestions = questionsBank.filter(q => {
    if (selectedEcFilter !== 'ALL' && q.ecId !== selectedEcFilter) return false;
    if (selectedTypeFilter !== 'ALL' && q.type !== selectedTypeFilter) return false;
    return true;
  });

  // Timed Exam Countdown
  useEffect(() => {
    let interval: any;
    if (examStarted && !examFinished && examTimeLeft > 0) {
      interval = setInterval(() => {
        setExamTimeLeft(prev => {
          if (prev <= 1) {
            handleFinishExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [examStarted, examFinished, examTimeLeft]);

  // Oral Defense Countdown
  useEffect(() => {
    let interval: any;
    if (isOralTimerActive && oralTimer > 0) {
      interval = setInterval(() => {
        setOralTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOralTimerActive, oralTimer]);

  const handleOptionSelect = (questionId: string, optionId: string, isMultiple: boolean) => {
    if (submittedQuestions[questionId] && evaluationMode === 'interactive_quiz') return;

    setUserAnswers(prev => {
      const current = prev[questionId] || [];
      if (isMultiple) {
        if (current.includes(optionId)) {
          return { ...prev, [questionId]: current.filter(id => id !== optionId) };
        } else {
          return { ...prev, [questionId]: [...current, optionId] };
        }
      } else {
        return { ...prev, [questionId]: [optionId] };
      }
    });
  };

  const handleSubmitQuestion = (questionId: string) => {
    setSubmittedQuestions(prev => ({ ...prev, [questionId]: true }));
    
    // Check if correct for tiny confetti
    const q = questionsBank.find(item => item.id === questionId);
    if (q) {
      const answers = userAnswers[questionId] || [];
      const isCorrect = answers.length === q.correctAnswers.length && 
        q.correctAnswers.every(ans => answers.includes(ans));
      if (isCorrect) {
        confetti({ particleCount: 30, spread: 60, origin: { y: 0.8 } });
      }
    }
  };

  const handleStartExam = () => {
    setExamStarted(true);
    setExamFinished(false);
    setExamTimeLeft(30 * 60);
    setUserAnswers({});
    setSubmittedQuestions({});
  };

  const handleFinishExam = () => {
    setExamFinished(true);
    // Calculate total score
    let totalScore = 0;
    const examQuestions = questionsBank.slice(0, 10);
    examQuestions.forEach(q => {
      const ans = userAnswers[q.id] || [];
      const isCorrect = ans.length === q.correctAnswers.length && 
        q.correctAnswers.every(a => ans.includes(a));
      if (isCorrect) {
        totalScore += q.points;
      }
    });
    setExamScore(totalScore);

    if (totalScore >= 70) {
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    }
  };

  const handleNextOralQuestion = () => {
    setActiveOralIndex(prev => (prev + 1) % oralExamPromptGenerator.length);
    setOralTimer(300);
    setIsOralTimerActive(false);
  };

  const totalOralScore = Object.values(oralGrades).reduce((a, b) => a + b, 0);

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 space-y-3 relative overflow-hidden">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping-slow" />
          <span className="font-mono text-xs uppercase tracking-wider font-bold text-cyan-300">
            SISTEMA INTEGRAL DE EVALUACIÓN Y BANCO DE PREGUNTAS
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Evaluación como Parte del Proceso de Enseñanza-Aprendizaje
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-4xl">
          Banco de preguntas formativas y sumativas por Elementos de Competencia (EC1 a EC6). Incluye modo de retroalimentación pedagógica inmediata, simulador de examen escrito cronometrado (100 pts) y simulador de defensa oral basado en la rúbrica oficial.
        </p>
      </div>

      {/* Mode Selector Tabs */}
      <div className="flex flex-wrap gap-2 bg-slate-900/80 p-2 rounded-2xl border border-white/10">
        <button
          onClick={() => setEvaluationMode('interactive_quiz')}
          className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all active:scale-95 ${
            evaluationMode === 'interactive_quiz'
              ? 'bg-cyan-500 text-black font-extrabold shadow-md shadow-cyan-500/20'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <AnimatedQuizIcon size="sm" />
          <span>1. Modo Formativo (Banco con Explicación)</span>
        </button>

        <button
          onClick={() => setEvaluationMode('timed_exam')}
          className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all active:scale-95 ${
            evaluationMode === 'timed_exam'
              ? 'bg-cyan-500 text-black font-extrabold shadow-md shadow-cyan-500/20'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <AnimatedExamIcon size="sm" />
          <span>2. Examen Escrito Cronometrado (30 min / 100 pts)</span>
        </button>

        <button
          onClick={() => setEvaluationMode('oral_defense')}
          className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all active:scale-95 ${
            evaluationMode === 'oral_defense'
              ? 'bg-cyan-500 text-black font-extrabold shadow-md shadow-cyan-500/20'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <AnimatedOralIcon size="sm" />
          <span>3. Simulador de Evaluación y Defensa Oral</span>
        </button>
      </div>

      {/* MODE 1: INTERACTIVE FORMATIVE QUIZ */}
      {evaluationMode === 'interactive_quiz' && (
        <div className="space-y-6">
          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-white/5">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                <Filter className="w-3.5 h-3.5 text-cyan-400" />
                <span>Competencia:</span>
              </div>
              <select
                value={selectedEcFilter}
                onChange={(e) => setSelectedEcFilter(e.target.value)}
                className="bg-slate-950 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
              >
                <option value="ALL">Todas las Competencias (EC1 a EC6)</option>
                <option value="EC1">EC1: Procesamiento Paralelo</option>
                <option value="EC2">EC2: Redes y Multicomputadores</option>
                <option value="EC3">EC3: Memoria Compartida y Snoopy</option>
                <option value="EC4">EC4: NUMA y Directorios</option>
                <option value="EC5">EC5: Sistemas Embebidos</option>
                <option value="EC6">EC6: Cloud y Virtualización</option>
              </select>

              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono ml-2">
                <span>Tipo:</span>
              </div>
              <select
                value={selectedTypeFilter}
                onChange={(e) => setSelectedTypeFilter(e.target.value)}
                className="bg-slate-950 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
              >
                <option value="ALL">Todos los Tipos</option>
                <option value="single">Selección Única</option>
                <option value="multiple">Selección Múltiple</option>
                <option value="true_false">Verdadero / Falso</option>
                <option value="case_study">Caso de Estudio</option>
              </select>
            </div>

            <div className="font-mono text-xs text-slate-400">
              Mostrando <strong className="text-cyan-400">{filteredQuestions.length}</strong> reactivos
            </div>
          </div>

          {/* Question List */}
          <div className="space-y-6">
            {filteredQuestions.map((q, idx) => {
              const answers = userAnswers[q.id] || [];
              const isSubmitted = !!submittedQuestions[q.id];
              const isMultiple = q.type === 'multiple';
              const isCorrect = answers.length === q.correctAnswers.length && 
                q.correctAnswers.every(a => answers.includes(a));

              return (
                <div 
                  key={q.id}
                  className="glass-panel rounded-3xl p-6 sm:p-8 space-y-5 border border-white/10 relative overflow-hidden"
                >
                  {/* Question Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/60">
                        {q.ecId} • Reactivo #{idx + 1}
                      </span>
                      <span className="text-[11px] font-mono uppercase text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-white/5">
                        {q.type.replace('_', ' ')}
                      </span>
                      <span className="text-[11px] font-mono text-amber-400">
                        Dificultad: {q.difficulty}
                      </span>
                    </div>

                    <span className="font-mono text-xs text-slate-400">
                      Valor: <strong className="text-white">{q.points} pts</strong>
                    </span>
                  </div>

                  {/* Context / Scenario if applicable */}
                  {q.contextOrScenario && (
                    <div className="bg-slate-900/80 p-4 rounded-xl border border-cyan-500/20 text-xs text-slate-300 leading-relaxed font-mono">
                      <strong className="text-cyan-400 block mb-1">Escenario de Aplicación:</strong>
                      {q.contextOrScenario}
                    </div>
                  )}

                  {/* Prompt Text */}
                  <div className="text-sm sm:text-base font-semibold text-white leading-relaxed">
                    {q.prompt}
                  </div>

                  {/* Options List */}
                  <div className="space-y-2.5">
                    {q.options.map((opt) => {
                      const isSelected = answers.includes(opt.id);
                      let optionStyle = 'bg-slate-900/60 border-white/10 text-slate-300 hover:border-cyan-500/40 hover:bg-slate-800';

                      if (isSubmitted) {
                        const isThisCorrect = q.correctAnswers.includes(opt.id);
                        if (isThisCorrect) {
                          optionStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-semibold';
                        } else if (isSelected && !isThisCorrect) {
                          optionStyle = 'bg-rose-950/40 border-rose-500 text-rose-300 line-through';
                        } else {
                          optionStyle = 'opacity-40 bg-slate-950 border-white/5 text-slate-500';
                        }
                      } else if (isSelected) {
                        optionStyle = 'bg-cyan-500/20 border-cyan-500 text-white font-medium';
                      }

                      return (
                        <div
                          key={opt.id}
                          onClick={() => handleOptionSelect(q.id, opt.id, isMultiple)}
                          className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all active:scale-[0.99] text-xs sm:text-sm leading-relaxed ${optionStyle}`}
                        >
                          <div className={`w-5 h-5 rounded ${isMultiple ? 'rounded-md' : 'rounded-full'} border flex items-center justify-center shrink-0 mt-0.5 font-mono text-[10px] font-bold ${
                            isSelected ? 'bg-cyan-500 text-black border-cyan-400' : 'border-slate-600 text-slate-400'
                          }`}>
                            {opt.id.toUpperCase()}
                          </div>
                          <span>{opt.text}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Submit / Verification Button */}
                  {!isSubmitted ? (
                    <button
                      onClick={() => handleSubmitQuestion(q.id)}
                      disabled={answers.length === 0}
                      className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-black font-bold text-xs transition-all active:scale-95 shadow-md shadow-cyan-500/20"
                    >
                      Comprobar Respuesta
                    </button>
                  ) : (
                    /* Instant Pedagogical Feedback */
                    <div className={`p-4 rounded-2xl border space-y-2 animate-fadeIn ${
                      isCorrect 
                        ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200' 
                        : 'bg-rose-950/20 border-rose-500/40 text-rose-200'
                    }`}>
                      <div className="flex items-center gap-2 font-bold text-xs">
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span className="text-emerald-400">¡Respuesta Correcta! (+{q.points} pts)</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 text-rose-400" />
                            <span className="text-rose-400">Respuesta Incorrecta</span>
                          </>
                        )}
                      </div>

                      <div className="text-xs text-slate-200 leading-relaxed pl-6 space-y-1">
                        <strong className="text-white block font-semibold text-[11px] uppercase tracking-wider">
                          Justificación Pedagógica de Cátedra:
                        </strong>
                        <p>{q.explanation}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MODE 2: TIMED EXAM SIMULATION (100 pts) */}
      {evaluationMode === 'timed_exam' && (
        <div className="glass-panel-glow rounded-3xl p-6 sm:p-10 space-y-8">
          {!examStarted ? (
            <div className="max-w-2xl mx-auto text-center space-y-6 py-8">
              <div className="w-20 h-20 rounded-3xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto shadow-xl shadow-cyan-500/10">
                <AnimatedExamIcon size="lg" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Evaluación Individual: Sistemas Paralelos y Distribuídos
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Cuestionario formal correspondiente al programa evaluativo oficial (10 preguntas de selección múltiple, 100 puntos totales, 30 minutos de tiempo límite).
                </p>
              </div>

              <div className="bg-slate-900/80 p-5 rounded-2xl border border-white/5 text-left text-xs text-slate-300 space-y-2 font-mono">
                <span className="text-cyan-400 font-bold block uppercase">Instrucciones para el Estudiante:</span>
                <ul className="list-disc list-inside space-y-1 text-slate-400">
                  <li>El cuestionario consta de 10 reactivos seleccionados de todo el contenido semestral.</li>
                  <li>Dispone de exactamente 30 minutos. Al agotarse el cronómetro se enviará automáticamente.</li>
                  <li>Nota mínima de aprobación: 70 / 100 puntos.</li>
                </ul>
              </div>

              <button
                onClick={handleStartExam}
                className="px-6 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-sm transition-all active:scale-95 shadow-lg shadow-cyan-500/30"
              >
                Comenzar Evaluación Cronometrada
              </button>
            </div>
          ) : !examFinished ? (
            <div className="space-y-6">
              {/* Exam Sticky Timer Header */}
              <div className="sticky top-20 z-40 bg-slate-900/95 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center justify-between gap-4 shadow-xl">
                <div>
                  <span className="text-xs font-mono text-slate-400 block">Evaluación en Progreso:</span>
                  <span className="font-bold text-white text-sm">Cuestionario de 10 Preguntas</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-black/60 px-3.5 py-1.5 rounded-xl border border-cyan-500/40 text-cyan-300 font-mono text-sm font-bold">
                    <Clock className="w-4 h-4 text-cyan-400 animate-pulse" />
                    <span>{formatSeconds(examTimeLeft)}</span>
                  </div>

                  <button
                    onClick={handleFinishExam}
                    className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs transition-all active:scale-95"
                  >
                    Entregar Examen
                  </button>
                </div>
              </div>

              {/* Exam Questions */}
              <div className="space-y-6">
                {questionsBank.slice(0, 10).map((q, idx) => {
                  const answers = userAnswers[q.id] || [];
                  const isMultiple = q.type === 'multiple';

                  return (
                    <div key={q.id} className="bg-slate-900/70 p-6 rounded-2xl border border-white/5 space-y-4">
                      <div className="flex justify-between items-center text-xs font-mono text-slate-400 border-b border-white/5 pb-2">
                        <span>Pregunta #{idx + 1} ({q.ecId})</span>
                        <span>{q.points} puntos</span>
                      </div>

                      <div className="text-sm font-semibold text-white leading-relaxed">
                        {q.prompt}
                      </div>

                      <div className="space-y-2">
                        {q.options.map((opt) => {
                          const isSelected = answers.includes(opt.id);
                          return (
                            <div
                              key={opt.id}
                              onClick={() => handleOptionSelect(q.id, opt.id, isMultiple)}
                              className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all text-xs leading-relaxed ${
                                isSelected
                                  ? 'bg-cyan-500/20 border-cyan-500 text-white font-medium'
                                  : 'bg-slate-950/60 border-white/5 text-slate-300 hover:bg-slate-900'
                              }`}
                            >
                              <div className={`w-4 h-4 rounded ${isMultiple ? 'rounded-md' : 'rounded-full'} border flex items-center justify-center font-mono text-[9px] ${
                                isSelected ? 'bg-cyan-500 text-black border-cyan-400 font-bold' : 'border-slate-600'
                              }`}>
                                {opt.id.toUpperCase()}
                              </div>
                              <span>{opt.text}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Exam Results Report */
            <div className="max-w-xl mx-auto text-center space-y-6 py-6 animate-fadeIn">
              <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto shadow-xl">
                <AnimatedTrophyIcon size="lg" />
              </div>

              <div className="space-y-2">
                <span className="font-mono text-xs uppercase tracking-wider text-slate-400">Resultado Oficial</span>
                <h3 className="text-3xl font-black text-white tracking-tight">
                  Calificación: <span className={examScore >= 70 ? 'text-emerald-400' : 'text-rose-400'}>{examScore}</span> / 100 puntos
                </h3>
                <p className="text-xs text-slate-300">
                  {examScore >= 70 
                    ? '¡Felicitaciones! Ha demostrado solvencia técnica en los elementos de competencia evaluados.' 
                    : 'Le sugerimos repasar los capítulos del Texto Digital y reintentar la evaluación formativa.'}
                </p>
              </div>

              <button
                onClick={handleStartExam}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-white/10 transition-all active:scale-95"
              >
                Reintentar Evaluación
              </button>
            </div>
          )}
        </div>
      )}

      {/* MODE 3: ORAL EVALUATION DEFENSE SIMULATOR */}
      {evaluationMode === 'oral_defense' && (
        <div className="glass-panel-glow rounded-3xl p-6 sm:p-10 space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <span className="font-mono text-xs font-bold text-amber-400">
                SIMULADOR DE EXAMEN ORAL Y DEFENSA ANTE TRIBUNAL
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
                Generador de Preguntas y Rúbrica Oficial (100 pts)
              </h3>
            </div>

            <div className="flex items-center gap-3">
              {/* Defense Timer */}
              <div className="flex items-center gap-1.5 bg-black/40 px-3.5 py-1.5 rounded-xl border border-white/10 text-xs font-mono text-amber-300">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Tiempo de Defensa: {formatSeconds(oralTimer)}</span>
                <button
                  onClick={() => setIsOralTimerActive(!isOralTimerActive)}
                  className="text-slate-400 hover:text-white ml-1 font-sans text-xs underline"
                >
                  {isOralTimerActive ? 'Pausar' : 'Iniciar'}
                </button>
              </div>

              <button
                onClick={handleNextOralQuestion}
                className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs transition-all active:scale-95"
              >
                Siguiente Pregunta Aleatoria
              </button>
            </div>
          </div>

          {/* Active Oral Defense Prompt Card */}
          <div className="bg-slate-900/80 rounded-2xl p-6 border border-amber-500/30 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded font-mono text-xs font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {oralExamPromptGenerator[activeOralIndex].ecId}
              </span>
              <span className="text-xs font-mono text-slate-400">
                {oralExamPromptGenerator[activeOralIndex].unit}
              </span>
            </div>

            <div className="text-base sm:text-lg font-bold text-white leading-relaxed">
              "{oralExamPromptGenerator[activeOralIndex].prompt}"
            </div>

            <div className="bg-black/30 p-4 rounded-xl border border-white/5 text-xs text-amber-200/90 leading-relaxed">
              <strong className="text-amber-400 block font-mono text-[11px] uppercase mb-1">
                Contrapregunta de Profundización del Docente:
              </strong>
              {oralExamPromptGenerator[activeOralIndex].followUp}
            </div>
          </div>

          {/* Interactive Oral Rubric Scoring Matrix */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Rúbrica de Calificación en Vivo (Total: {totalOralScore} / 100 pts)
              </h4>
              <span className="font-mono text-xs font-bold text-cyan-400">
                Nota Final: {totalOralScore} / 100 pts
              </span>
            </div>

            <div className="space-y-4">
              {oralEvaluationRubric.map((item, idx) => (
                <div key={idx} className="bg-slate-900/60 p-4 rounded-xl border border-white/5 space-y-2.5">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white text-xs sm:text-sm">{item.criterion}</span>
                    <span className="font-mono text-xs text-cyan-300 font-bold">{oralGrades[idx]} pts</span>
                  </div>

                  {/* Level selector buttons */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      onClick={() => setOralGrades(prev => ({ ...prev, [idx]: 20 }))}
                      className={`p-2.5 rounded-lg border text-left text-xs transition-all ${
                        oralGrades[idx] === 20
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                          : 'bg-slate-950/60 border-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      <strong className="block text-[10px] uppercase font-mono">Excelente (20 pts)</strong>
                      <span className="text-[11px] line-clamp-2">{item.levels.excelente.desc}</span>
                    </button>

                    <button
                      onClick={() => setOralGrades(prev => ({ ...prev, [idx]: 15 }))}
                      className={`p-2.5 rounded-lg border text-left text-xs transition-all ${
                        oralGrades[idx] === 15
                          ? 'bg-blue-500/20 border-blue-500 text-blue-300 font-bold'
                          : 'bg-slate-950/60 border-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      <strong className="block text-[10px] uppercase font-mono">Distinguido (15 pts)</strong>
                      <span className="text-[11px] line-clamp-2">{item.levels.distinguido.desc}</span>
                    </button>

                    <button
                      onClick={() => setOralGrades(prev => ({ ...prev, [idx]: 10 }))}
                      className={`p-2.5 rounded-lg border text-left text-xs transition-all ${
                        oralGrades[idx] === 10
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                          : 'bg-slate-950/60 border-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      <strong className="block text-[10px] uppercase font-mono">Bueno (10 pts)</strong>
                      <span className="text-[11px] line-clamp-2">{item.levels.bueno.desc}</span>
                    </button>

                    <button
                      onClick={() => setOralGrades(prev => ({ ...prev, [idx]: 5 }))}
                      className={`p-2.5 rounded-lg border text-left text-xs transition-all ${
                        oralGrades[idx] === 5
                          ? 'bg-rose-500/20 border-rose-500 text-rose-300 font-bold'
                          : 'bg-slate-950/60 border-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      <strong className="block text-[10px] uppercase font-mono">Regular (5 pts)</strong>
                      <span className="text-[11px] line-clamp-2">{item.levels.regular.desc}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
