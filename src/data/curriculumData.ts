import { CompetencyElement } from '../types';

export interface CourseIdentification {
  university: string;
  faculty: string;
  career: string;
  subject: string;
  code: string;
  prerequisite: string;
  semester: string;
  docente: string;
  email: string;
  phone: string;
  hoursTeacher: number;
  hoursAutonomous: number;
  credits: number;
  globalCompetency: string;
  subjectCompetency: string;
  justification: string;
}

export const courseInfo: CourseIdentification = {
  university: "Universidad Autónoma Juan Misael Saracho (UAJMS)",
  faculty: "Facultad de Ciencias y Tecnología / Recursos Naturales y Tecnología",
  career: "Ingeniería Informática",
  subject: "Arquitectura de Computadores II",
  code: "DIC122",
  prerequisite: "DIC112 - Arquitectura de Computadores I",
  semester: "Segundo Semestre",
  docente: "Ing. Elias Cassal Valdiviezo",
  email: "eliascassal@uajms.edu.bo",
  phone: "731016652",
  hoursTeacher: 120,
  hoursAutonomous: 60,
  credits: 4.50,
  globalCompetency: "Analiza, diseña, desarrolla, implementa y administra redes de transmisión de datos, sistemas informáticos, sistemas de información geográfica y automatización, aplicando normas y estándares de calidad para resolver problemas informáticos, automatizar procesos y optimizar el manejo de la información con tecnologías emergentes como inteligencia artificial.",
  subjectCompetency: "Aplicar conceptos relacionados con el procesamiento paralelo, los sistemas distribuidos y la computación en la nube. Esto incluye el diseño y análisis de multicomputadores, multiprocesadores de memoria compartida, sistemas embebidos, así como el entendimiento de la virtualización y la escalabilidad de los sistemas, con el objeto de diseñar y desarrollar sistemas informáticos avanzados que aprovechen al máximo las capacidades de procesamiento paralelo y distribuido.",
  justification: "La asignatura Arquitectura de Computadores II constituye un avance fundamental en la formación del Ingeniero Informático, extendiendo los conceptos de arquitectura de un solo procesador hacia sistemas distribuidos y paralelos. Dado que la demanda de computadores de altas prestaciones en predicción meteorológica, diagnóstico médico, inteligencia artificial y teledetección es creciente, es indispensable que el estudiante comprenda arquitecturas multinúcleo, multiprocesadores, sistemas embebidos y computación en la nube."
};

export const competencyElements: CompetencyElement[] = [
  {
    id: "EC1",
    unitNumber: 1,
    title: "Procesamiento Paralelo y Clasificación de Arquitecturas",
    description: "Comprender y aplicar eficazmente conceptos clave y principios de procesamiento paralelo, incluyendo clasificación de arquitecturas, programación, rendimiento y escalabilidad, para diseñar y evaluar sistemas paralelos con sólido conocimiento.",
    weight: 15,
    hoursDocente: 20,
    hoursAutonomous: 10,
    achievementLevels: {
      inicial: "Identifica conceptos elementales de la taxonomía de Flynn y nociones básicas de velocidad de ejecución.",
      basico: "Calcula aceleración básica y clasifica sistemas reales en las categorías SISD, SIMD, MISD y MIMD.",
      autonomo: "Aplica con precisión las leyes de Amdahl y Gustafson, calcula speedup y eficiencia en escenarios multiprocesador reales, justificando la elección de paradigmas paralelos.",
      estrategico: "Propone y optimiza arquitecturas de cómputo paralelo evaluando compensaciones costo/rendimiento y cuellos de botella de sincronización."
    },
    saber: [
      "Taxonomía de Flynn (SISD, SIMD, MISD, MIMD)",
      "Límites físicos de escalado en frecuencia (Power Wall, Memory Wall, ILP Wall)",
      "Modelos y paradigmas de programación paralela (Memoria compartida vs Paso de mensajes)",
      "Métricas fundamentales: Latencia, Throughput, Speedup (Amdahl y Gustafson), Eficiencia",
      "Factores de pérdida de escalabilidad: sobrecarga de comunicación, sincronización y contención"
    ],
    saberHacer: [
      "Medir y contrastar tiempos de ejecución secuencial vs paralelo en código Python/C",
      "Calcular el Speedup teórico y la Eficiencia para distintas fracciones de paralelización",
      "Identificar el punto de inflexión en la curva de rendimiento al aumentar núcleos"
    ],
    saberSer: [
      "Rigor analítico en la recolección de métricas experimentales",
      "Conciencia crítica sobre las limitaciones energéticas y térmicas en el hardware moderno",
      "Colaboración activa en la resolución de problemas de concurrencia en equipo"
    ],
    evidencias: [
      "Informe técnico sobre clasificación de arquitecturas según taxonomía de Flynn",
      "Ejercicios prácticos de cálculo de speedup, eficiencia y escalabilidad",
      "Cuestionario evaluativo sobre paradigmas de programación paralela"
    ],
    indicadores: [
      "Identifica correctamente las categorías de la taxonomía de Flynn en diferentes sistemas computacionales",
      "Calcula speedup y eficiencia de paralelización con precisión matemática",
      "Explica las ventajas y limitaciones de diferentes paradigmas de programación paralela"
    ],
    instrumentos: [
      "Rúbrica de informe técnico",
      "Guía de ejercicios prácticos evaluados",
      "Cuestionario escrito / digital"
    ]
  },
  {
    id: "EC2",
    unitNumber: 2,
    title: "Redes de Interconexión para Multicomputadores",
    description: "Diseñar y optimizar redes de interconexión para multicomputadores, aplicando mecanismos de conmutación y encaminamiento, solucionando problemas de bloqueos y evaluando el rendimiento, para mejorar la eficiencia y escalabilidad del sistema.",
    weight: 18,
    hoursDocente: 20,
    hoursAutonomous: 10,
    achievementLevels: {
      inicial: "Reconoce topologías estáticas básicas (bus, anillo, estrella) y conceptos generales de switches.",
      basico: "Calcula métricas topológicas (grado de nodo, diámetro, ancho de bisección) y distingue Store-and-Forward de Wormhole.",
      autonomo: "Diseña topologías óptimas (Malla 2D, Toro, Hipercubo, Fat-Tree), aplica algoritmos de encaminamiento libres de interbloqueo (XY-Routing, Canales Virtuales) y modela latencia.",
      estrategico: "Evalúa y selecciona redes de interconexión complejas (Slim Fly, Dragonfly) para clústeres de supercómputo justificando impacto en rendimiento y costo."
    },
    saber: [
      "Topologías estáticas y dinámicas: Bus, Anillo, Malla 2D, Toro, Hipercubo, Crossbar, MIN (Omega, Fat-Tree), Dragonfly",
      "Métricas de red: Grado de nodo, Diámetro, Ancho de bisección, Latencia de transporte y Ancho de banda",
      "Técnicas de conmutación: Conmutación de circuitos, Almacenamiento y reenvío (Store-and-Forward), Corte virtual (Virtual Cut-Through) y Wormhole Switching (Flits)",
      "Mecanismos de encaminamiento: Determinista (XY), Adaptativo, Oblivious",
      "Condiciones de deadlock, algoritmos libres de interbloqueo y Canales Virtuales (VCs)"
    ],
    saberHacer: [
      "Modelar la latencia de red para diferentes tamaños de mensaje y distancias de saltos",
      "Trazar rutas de paquetes evitando ciclos circulares de dependencia de búferes",
      "Configurar y simular redes de multicomputador con herramientas como SimGrid"
    ],
    saberSer: [
      "Pensamiento sistémico en la optimización de recursos compartidos de interconexión",
      "Responsabilidad en el diseño de arquitecturas tolerantes a la congestión"
    ],
    evidencias: [
      "Proyecto de diseño de red de interconexión para multicomputador",
      "Informe técnico sobre mecanismos de conmutación y encaminamiento",
      "Simulación y análisis de rendimiento de red bajo diferentes configuraciones",
      "Resolución de casos de estudio sobre problemas de bloqueos"
    ],
    indicadores: [
      "Diseña correctamente topologías de red según características de la aplicación",
      "Explica los mecanismos de conmutación y su impacto en el rendimiento",
      "Aplica algoritmos de encaminamiento para evitar bloqueos en diferentes escenarios"
    ],
    instrumentos: [
      "Rúbrica de proyecto de diseño",
      "Informe técnico evaluado",
      "Simulación y análisis de resultados"
    ]
  },
  {
    id: "EC3",
    unitNumber: 3,
    title: "Multiprocesadores de Memoria Compartida y Protocolos Snoopy",
    description: "Analizar y aplicar principios de redes de interconexión, coherencia y consistencia de cachés, y sincronización en multiprocesadores de memoria compartida, demostrando capacidad para diseñar y evaluar protocolos snoopy de coherencia y estrategias de sincronización eficientes.",
    weight: 18,
    hoursDocente: 20,
    hoursAutonomous: 10,
    achievementLevels: {
      inicial: "Define qué es la memoria compartida (SMP) y por qué surge el problema de incoherencia de cachés.",
      basico: "Describe las transiciones del protocolo MSI y comprende la diferencia entre coherencia y consistencia de memoria.",
      autonomo: "Modela transiciones de estados completas en protocolos Snoopy (MSI, MESI, MOESI), evalúa invalidación vs actualización y diseña primitivas de sincronización atómicas (Test-and-Set, LL/SC).",
      estrategico: "Diagnostica y mitiga el efecto de falsa compartición (false sharing) y optimiza barreras de sincronización en aplicaciones concurrentes complejas."
    },
    saber: [
      "Arquitectura de multiprocesadores simétricos (SMP) y espacio de direcciones uniforme (UMA)",
      "El problema de coherencia de caché: accesos de lectura/escritura concurrentes",
      "Protocolos basados en espionaje de bus (Snoopy): MSI, MESI (Exclusive), MOESI (Owner)",
      "Estrategias de actualización (Write-Update) vs invalidación (Write-Invalidate)",
      "Modelos de consistencia de memoria: Consistencia Secuencial (Lamport) y modelos relajados (Release, Total Store Order)",
      "Primitivas de sincronización por hardware: Operaciones atómicas Read-Modify-Write, Test-and-Set, Load-Linked/Store-Conditional"
    ],
    saberHacer: [
      "Simular trazas de memoria con múltiples procesadores y determinar estados de línea de caché",
      "Identificar operaciones de bus emitidas (BusRd, BusRdX, BusUpgr, Flush)",
      "Implementar bloqueos por exclusión mutua utilizando instrucciones atómicas"
    ],
    saberSer: [
      "Precisión y minuciosidad en el análisis de secuencias concurrentes no deterministas",
      "Ética en la verificación exhaustiva de integridad y consistencia de datos críticos"
    ],
    evidencias: [
      "Diseño y simulación de un protocolo snoopy para un sistema multiprocesador",
      "Análisis comparativo de protocolos de coherencia (MSI, MESI, MOESI)",
      "Implementación de mecanismos de sincronización en un entorno simulado",
      "Evaluación del impacto de diferentes modelos de consistencia en el rendimiento"
    ],
    indicadores: [
      "Modela correctamente las transiciones de estado en protocolos de coherencia",
      "Compara con precisión la eficiencia entre protocolos basados en invalidación y actualización",
      "Diseña primitivas de sincronización libres de condiciones de carrera"
    ],
    instrumentos: [
      "Rúbrica de diseño de protocolo",
      "Guía de ejercicios de coherencia evaluada",
      "Informe de simulación"
    ]
  },
  {
    id: "EC4",
    unitNumber: 4,
    title: "Multiprocesadores Escalables y Protocolos de Directorio",
    description: "Dominar el diseño y evaluación de protocolos de coherencia de caché basados en directorios y técnicas de sincronización, evidenciando profundo conocimiento y habilidad aplicativa para asegurar coherencia de datos eficiente y sincronización óptima, impulsando un rendimiento sistémico de alta calidad.",
    weight: 17,
    hoursDocente: 20,
    hoursAutonomous: 10,
    achievementLevels: {
      inicial: "Reconoce las limitaciones de escalabilidad de los sistemas basados en bus compartido.",
      basico: "Explica la estructura de una arquitectura NUMA (Non-Uniform Memory Access) y la necesidad de directorios.",
      autonomo: "Diseña y evalúa esquemas de directorio distribuido (Full Bit Vector, Limited Pointers, Chained Directories), calculando sobrecarga de memoria y mensajes de invalidación punto a punto.",
      estrategico: "Formula estrategias de particionamiento y asignación de memoria NUMA-aware para maximizar localidad espacial/temporal en clústeres empresariales."
    },
    saber: [
      "Arquitecturas NUMA y cc-NUMA (Cache-Coherent Non-Uniform Memory Access)",
      "Estructura del Directorio: Nodos locales, nodos de origen (home nodes) y nodos remotos",
      "Estados del directorio: Uncached, Shared, Modified/Exclusive",
      "Organizaciones de directorio: Bitmap completo, Directorios limitados, Directorios encadenados (SCI)",
      "Sincronización a gran escala: Árboles de barrera (Barrier Trees), Colas de cerrojo basadas en software (MCS locks)"
    ],
    saberHacer: [
      "Diagramar el flujo de mensajes punto a punto para lecturas y escrituras remotas",
      "Calcular el almacenamiento requerido por las entradas de directorio según la cantidad de nodos",
      "Optimizar programas paralelos mediante afinidad de procesador y distribución de memoria NUMA"
    ],
    saberSer: [
      "Capacidad de abstracción ante arquitecturas híbridas distribuidas",
      "Iniciativa para investigar soluciones de vanguardia en computación de alta gama"
    ],
    evidencias: [
      "Proyecto de diseño de un protocolo de directorio distribuido",
      "Cálculo de sobrecarga de memoria y tráfico de red para esquemas de directorio",
      "Estudio de caso sobre arquitectura NUMA en servidores comerciales modernos"
    ],
    indicadores: [
      "Resuelve correctamente secuencias de transacciones de directorio sin bus broadcast",
      "Cuantifica la sobrecarga de memoria de diferentes organizaciones de directorio",
      "Aplica técnicas de sincronización escalables minimizando el tráfico de interconexión"
    ],
    instrumentos: [
      "Rúbrica de proyecto NUMA/Directorio",
      "Cuestionario de arquitectura escalable",
      "Evaluación oral de defensa técnica"
    ]
  },
  {
    id: "EC5",
    unitNumber: 5,
    title: "Sistemas Embebidos y Arquitecturas de Bajo Consumo",
    description: "Dominar el diseño, implementación y optimización de sistemas embebidos, incluyendo la selección de plataformas de hardware, sistemas operativos específicos y técnicas de eficiencia energética, utilizando casos de estudio industriales para aplicar conocimientos prácticos y teóricos en la mejora del rendimiento.",
    weight: 16,
    hoursDocente: 20,
    hoursAutonomous: 10,
    achievementLevels: {
      inicial: "Distingue un microcontrolador de un microprocesador de propósito general.",
      basico: "Identifica las restricciones de factor de forma, consumo de potencia y tiempo real (RTOS).",
      autonomo: "Selecciona y dimensiona plataformas de hardware embebido (ARM Cortex-M/A, RISC-V, SoC, FPGA, DSP) justificando técnicas de ahorro energético (DVFS, sleep modes) y determinismo temporal.",
      estrategico: "Diseña la arquitectura completa de un sistema ciberfísico crítico (médico, automotriz, aeroespacial) garantizando límites temporales duros y máxima autonomía de batería."
    },
    saber: [
      "Definición y taxonomía: Microcontroladores (MCU), Procesadores de Señales Digitales (DSP), FPGAs, ASICs y SoCs",
      "Arquitecturas dominantes en sistemas embebidos: RISC-V y familia ARM (Cortex-M, Cortex-R, Cortex-A)",
      "Sistemas Operativos de Tiempo Real (RTOS): Planificación determinista, Tiempo real duro (Hard RT) vs blando (Soft RT)",
      "Gestión y eficiencia de energía: Modos de bajo consumo, Escalado dinámico de voltaje y frecuencia (DVFS), Energy Harvesting",
      "Casos de estudio industriales: ECUs automotrices (ABS, Airbag), Dispositivos médicos implantables, IoT industrial"
    ],
    saberHacer: [
      "Evaluar la relación rendimiento/vatio en diferentes microcontroladores para una aplicación dada",
      "Configurar temporizadores, interrupciones y periféricos con restricciones de tiempo estricto",
      "Calcular presupuestos de consumo energético para dispositivos alimentados por batería"
    ],
    saberSer: [
      "Compromiso con la seguridad funcional y la fiabilidad en sistemas de misión crítica",
      "Sensibilidad hacia la sostenibilidad ambiental y el bajo impacto energético de la tecnología"
    ],
    evidencias: [
      "Diseño arquitectónico de un sistema embebido para caso de uso específico",
      "Comparativa técnica y de consumo de potencia entre plataformas RISC-V y ARM",
      "Resolución del examen teórico de desarrollo Unidad V"
    ],
    indicadores: [
      "Selecciona la plataforma de hardware apropiada considerando restricciones de costo, potencia y latencia",
      "Distingue adecuadamente entre sistemas de tiempo real duro y blando",
      "Aplica técnicas de reducción de consumo energético de manera coherente con la especificación"
    ],
    instrumentos: [
      "Rúbrica de diseño de sistema embebido",
      "Examen teórico de desarrollo",
      "Informe técnico de laboratorio"
    ]
  },
  {
    id: "EC6",
    unitNumber: 6,
    title: "Computación en la Nube y Virtualización",
    description: "Aplicar principios de computación en la nube, incluyendo modelos de servicio (IaaS, PaaS, SaaS), virtualización, y diseño de arquitecturas escalables, con énfasis en seguridad y privacidad, utilizando casos de estudio para diseñar soluciones eficientes y seguras en entornos empresariales.",
    weight: 16,
    hoursDocente: 20,
    hoursAutonomous: 10,
    achievementLevels: {
      inicial: "Reconoce los modelos básicos de computación en la nube (IaaS, PaaS, SaaS).",
      basico: "Diferencia la virtualización asistida por hardware de la contenedorización basada en el kernel del SO.",
      autonomo: "Diseña arquitecturas de nube elásticas, seguras y de alta disponibilidad, seleccionando hipervisores (Tipo 1 bare-metal vs Tipo 2) o contenedores según el SLA y la carga de trabajo.",
      estrategico: "Formula planes integrales de migración, resiliencia ante desastres y observabilidad multi-nube para infraestructuras informáticas críticas."
    },
    saber: [
      "Fundamentos de la virtualización: CPU, Memoria (Shadow Page Tables, EPT/NPT), I/O (SR-IOV)",
      "Hipervisores Tipo 1 (Bare-metal: KVM, ESXi, Xen) vs Tipo 2 (Hosted: VirtualBox, VMware Workstation)",
      "Contenedores vs Máquinas Virtuales: Namespaces, cgroups, imágenes y aislamiento",
      "Modelos de servicio: Infraestructura como Servicio (IaaS), Plataforma (PaaS), Software (SaaS), Serverless / FaaS",
      "Arquitecturas elásticas, balanceo de carga, almacenamiento distribuido y tolerancia a fallos",
      "Seguridad, privacidad y cumplimiento normativo en entornos de nube pública, privada e híbrida"
    ],
    saberHacer: [
      "Desplegar y orquestar servicios contenerizados con Docker y perfiles de recursos delimitados",
      "Evaluar la sobrecarga (overhead) de virtualización frente a ejecución bare-metal",
      "Dimensionar instancias virtuales para cargas de trabajo computacionalmente intensivas"
    ],
    saberSer: [
      "Ética en la gestión y protección de la privacidad de datos corporativos y de usuarios",
      "Mentalidad proactiva frente a la continuidad de operaciones y planes de contingencia"
    ],
    evidencias: [
      "Diseño de arquitectura de servicios en la nube para un escenario empresarial",
      "Análisis comparativo de rendimiento entre contenedores y máquinas virtuales",
      "Resolución del examen teórico de desarrollo Unidad VI",
      "Análisis de casos de adquisición de infraestructura en el sector público (SICOES / UAJMS)"
    ],
    indicadores: [
      "Diseña soluciones de nube escalables garantizando alta disponibilidad y aislamiento",
      "Explica la arquitectura interna de hipervisores y mecanismos de virtualización asistida por hardware",
      "Evalúa especificaciones técnicas para contrataciones de centros de datos y servidores"
    ],
    instrumentos: [
      "Rúbrica de diseño de arquitectura cloud",
      "Examen teórico de desarrollo",
      "Estudio de caso evaluado"
    ]
  }
];
