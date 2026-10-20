export type ViewMode = 
  | 'curriculum' 
  | 'textbook' 
  | 'presentation' 
  | 'laboratories' 
  | 'activities' 
  | 'evaluation';

export interface CompetencyElement {
  id: string; // EC1, EC2, ...
  unitNumber: number;
  title: string;
  description: string;
  weight: number; // percentage, e.g., 15
  hoursDocente: number;
  hoursAutonomous: number;
  achievementLevels: {
    inicial: string;
    basico: string;
    autonomo: string;
    estrategico?: string;
  };
  saber: string[]; // Conocer
  saberHacer: string[]; // Hacer
  saberSer: string[]; // Ser
  evidencias: string[];
  indicadores: string[];
  instrumentos: string[];
}

export interface TextbookSection {
  id: string;
  subtopicNumber: string;
  title: string;
  summary: string;
  content: string[]; // paragraphs
  keyConcepts?: { term: string; definition: string }[];
  analogies?: string[];
  comparativeTables?: {
    title: string;
    headers: string[];
    rows: string[][];
  }[];
  formulas?: {
    name: string;
    expression: string;
    description: string;
    variables: { symbol: string; meaning: string }[];
  }[];
  interactiveType?: 'speedup' | 'coherence' | 'topology' | 'wormhole';
}

export interface TextbookUnit {
  id: string;
  number: number;
  ecId: string;
  title: string;
  subtitle: string;
  icon: string;
  summary: string;
  sections: TextbookSection[];
}

export interface SlideItem {
  id: number;
  title: string;
  subtitle?: string;
  category: string;
  content?: string[];
  bullets?: string[];
  keyIdea?: string;
  analogy?: string;
  codeSnippet?: string;
  diagramType?: 'cores' | 'flynn' | 'network' | 'coherence' | 'embedded' | 'cloud';
  speakerNotes: string; // Guión del docente
}

export interface PresentationDeck {
  id?: string;
  unitId: string;
  unitNumber: number;
  title: string;
  description: string;
  slides: SlideItem[];
}

export type QuestionType = 'single' | 'multiple' | 'true_false' | 'case_study';

export interface Question {
  id: string;
  ecId: string; // EC1 to EC6
  unitNumber: number;
  type: QuestionType;
  difficulty: 'básico' | 'intermedio' | 'avanzado';
  prompt: string;
  options: {
    id: string;
    text: string;
  }[];
  correctAnswers: string[]; // Array of option IDs
  explanation: string; // Pedagogical explanation for learning
  points: number;
  contextOrScenario?: string;
}

export interface ActivityGuide {
  id: string;
  ecId: string;
  unitNumber: number;
  title: string;
  type: 'autonoma' | 'laboratorio' | 'caso_estudio' | 'grupal';
  estimatedHours: string;
  generalObjective: string;
  specificCompetence: string;
  prerequisites: string[];
  phases: {
    phaseNumber: number;
    title: string;
    duration: string;
    instructions: string[];
    expectedOutput: string;
  }[];
  rubricCriteria: {
    criterion: string;
    excellent: string;
    good: string;
    regular: string;
    points: number;
  }[];
  deliverableFormat: string;
  codeOrDataSnippet?: string;
}

export interface OralEvaluationRubricItem {
  criterion: string;
  maxPoints: number;
  levels: {
    excelente: { points: number; desc: string };
    distinguido: { points: number; desc: string };
    bueno: { points: number; desc: string };
    regular: { points: number; desc: string };
  };
}
