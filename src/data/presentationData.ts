import { PresentationDeck } from '../types';

export const presentationDecks: PresentationDeck[] = [
  {
    unitId: "deck-unit-1",
    unitNumber: 1,
    title: "Unidad I: Introducción al Procesamiento Paralelo",
    description: "Exposición magistral sobre los límites de la computación secuencial, la taxonomía de Flynn y el cálculo formal de aceleración y eficiencia.",
    slides: [
      {
        id: 1,
        title: "Sesión 1: Introducción al Procesamiento Paralelo",
        subtitle: "Arquitectura de Computadores II • UAJMS",
        category: "Bienvenida e Introducción",
        content: [
          "¡Bienvenidos a la materia de Arquitectura de Computadores II!",
          "Hoy exploramos el concepto fundacional que define la computación contemporánea: el procesamiento paralelo.",
          "El desafío moderno no es únicamente hacer que los transistores conmuten más rápido, sino diseñar sistemas inteligentes capaces de procesar volúmenes masivos de datos simultáneamente."
        ],
        keyIdea: "El paralelismo no es una opción de optimización: es el único camino viable para continuar escalando la computación.",
        speakerNotes: "Saludar cordialmente al curso. Establecer el vínculo con Arquitectura I: allí vimos la estructura de un computador secuencial clásico de un solo procesador; aquí daremos el salto hacia sistemas multinúcleo, multicomputadores y nubes."
      },
      {
        id: 2,
        title: "1. Más Allá de la Velocidad: La Analogía del Muro",
        subtitle: "Comprendiendo la esencia del trabajo simultáneo",
        category: "Motivación y Fundamentos",
        content: [
          "Para entender por qué el paralelismo es vital, imaginemos un equipo de construcción civil:",
          "Si necesitamos levantar una pared rápidamente, no le exigimos a un único obrero que se mueva al doble de velocidad (lo cual provocaría agotamiento, caídas y desastre).",
          "En su lugar, ¡asignamos a varios obreros a construir diferentes tramos de la pared al mismo tiempo!",
          "Esa es la esencia pura del procesamiento paralelo: ejecutar múltiples instrucciones dividiendo la carga de trabajo entre múltiples procesadores o núcleos."
        ],
        analogy: "Múltiples obreros colaborando en secciones distintas = múltiples núcleos ejecutando hilos paralelos.",
        speakerNotes: "Enfatizar que la fuerza bruta monoprocesador tiene límites físicos infranqueables. La coordinación y el reparto del trabajo es la clave de la ingeniería."
      },
      {
        id: 3,
        title: "Los Límites Físicos: El 'Triple Muro'",
        subtitle: "Por qué se detuvo el aumento de la frecuencia de reloj en 2005",
        category: "Física del Hardware",
        bullets: [
          "Power Wall (Muro de la Potencia): La potencia disipada escala con C · V² · f. Más frecuencia = calor extremo imposible de disipar por aire.",
          "Memory Wall (Muro de la Memoria): La velocidad de la CPU crecía mucho más rápido que la de la memoria DRAM. Cientos de ciclos perdidos esperando datos.",
          "ILP Wall (Muro del Paralelismo a Nivel de Instrucción): La ejecución fuera de orden y la especulación alcanzaron rendimientos decrecientes."
        ],
        content: [
          "Alrededor de 2005, el escalado de Dennard colapsó debido a las corrientes de fuga cuántica en transistores nanométricos.",
          "Los procesadores comerciales se estancaron alrededor de los 3.5 a 4.0 GHz para evitar la autodestrucción térmica."
        ],
        diagramType: 'cores',
        keyIdea: "En lugar de hacer que un solo núcleo corra el doble de rápido, ponemos dos, cuatro o decenas de núcleos más eficientes.",
        speakerNotes: "Mencionar el caso histórico del Intel Pentium 4 Tejas, cancelado por alcanzar densidades térmicas intolerables. Fue el punto de inflexión hacia Intel Core 2 Duo."
      },
      {
        id: 4,
        title: "Taxonomía de Flynn: Las Cuatro Clases",
        subtitle: "Michael J. Flynn (1966) - Clasificación canónica de arquitecturas",
        category: "Taxonomía de Arquitecturas",
        bullets: [
          "SISD (Single Instruction, Single Data): von Neumann tradicional mononúcleo.",
          "SIMD (Single Instruction, Multiple Data): Una instrucción opera sobre un vector de datos (GPUs, SSE/AVX).",
          "MISD (Multiple Instruction, Single Data): Múltiples instrucciones sobre el mismo dato (Aviónica, sistemas de misión crítica tolerantes a fallos).",
          "MIMD (Multiple Instruction, Multiple Data): Múltiples procesadores autónomos con sus propios datos (CPUs multinúcleo, Clústeres)."
        ],
        content: [
          "MIMD es el paradigma dominante en servidores modernos y se subdivide en memoria compartida (Multiprocesadores) y memoria distribuida (Multicomputadores)."
        ],
        diagramType: 'flynn',
        keyIdea: "Flynn clasifica según la multiplicidad del flujo de control y del flujo de información.",
        speakerNotes: "Hacer una pregunta rápida al curso: ¿dónde clasifica la tarjeta gráfica de sus computadoras? Respuesta: SIMD o SIMT. ¿Y su CPU Ryzen o Core i7? Respuesta: MIMD."
      },
      {
        id: 5,
        title: "Medición del Rendimiento: Speedup y Eficiencia",
        subtitle: "Cuantificación matemática del beneficio del paralelismo",
        category: "Métricas y Análisis",
        bullets: [
          "Speedup S(p) = T₁ / T_p: Razón entre tiempo secuencial y tiempo en p procesadores.",
          "Speedup Ideal = p (lineal). En la práctica suele ser sublineal por sobrecargas.",
          "Eficiencia E(p) = S(p) / p: Porcentaje de aprovechamiento real del hardware.",
          "Sobrecargas reales: Tiempo de sincronización, contención en bus, comunicación por red."
        ],
        content: [
          "Un algoritmo que en 8 núcleos tarda 2.5 segundos frente a 10 segundos en un solo núcleo tiene un Speedup S = 10 / 2.5 = 4.0x y una Eficiencia E = 4 / 8 = 50%."
        ],
        keyIdea: "Agregar procesadores sin optimizar la fracción secuencial es un desperdicio de dinero y energía.",
        speakerNotes: "Mostrar que una eficiencia del 50% significa que la mitad de la capacidad de cómputo adquirida se está perdiendo en esperas y sobrecargas."
      },
      {
        id: 6,
        title: "La Ley de Amdahl: El Límite de la Fracción Secuencial",
        subtitle: "Gene Amdahl (1967) - Rendimiento con tamaño de problema fijo",
        category: "Leyes Fundamentales",
        content: [
          "Fórmula: S(p) = 1 / ((1 - f) + (f / p))",
          "Donde f es la fracción paralelizable y (1 - f) es la parte estrictamente secuencial.",
          "Límite asíntotico: Si p -> infinito, S(p) -> 1 / (1 - f)."
        ],
        bullets: [
          "Si f = 0.90 (el 90% es paralelo, 10% secuencial), el Speedup NUNCA superará 10x.",
          "Si f = 0.50 (la mitad es secuencial), el Speedup NUNCA superará 2x, ¡aunque usemos 1,000,000 de núcleos!"
        ],
        keyIdea: "La parte secuencial irreductible del código domina el rendimiento a gran escala.",
        speakerNotes: "Este resultado sorprendió al mundo en 1967 y llevó a pensar que el paralelismo masivo fracasaría. Hasta que llegó John Gustafson."
      },
      {
        id: 7,
        title: "La Ley de Gustafson-Barsis: Carga Escalada",
        subtitle: "John Gustafson (1988) - El enfoque realista de la ingeniería",
        category: "Leyes Fundamentales",
        content: [
          "Fórmula: S_scal(p) = p - (1 - f) · (p - 1)",
          "En el mundo real, los científicos no usan una supercomputadora para resolver el mismo problema minúsculo más rápido.",
          "En su lugar, ¡aumentan la resolución del problema! (ej. malla meteorológica más fina, modelo de IA con más parámetros)."
        ],
        bullets: [
          "La fracción paralelizable f crece a medida que el problema se hace más grande.",
          "Permite alcanzar aceleraciones de miles de veces en clústeres masivos."
        ],
        keyIdea: "Amdahl pregunta: '¿Qué tan rápido resuelvo este problema fijo?' Gustafson pregunta: '¿Qué problema tan grande puedo resolver en el mismo tiempo?'",
        speakerNotes: "Comparar ambas leyes gráficamente. Amdahl es pesimista pero válido para problemas fijos; Gustafson es optimista y refleja el uso real del supercómputo."
      }
    ]
  },
  {
    unitId: "deck-unit-2",
    unitNumber: 2,
    title: "Unidad II: Redes de Interconexión y Multicomputadores",
    description: "Exposición sobre topologías de red, técnicas de conmutación Store-and-Forward vs Wormhole, encaminamiento libre de deadlocks y canales virtuales.",
    slides: [
      {
        id: 1,
        title: "Multicomputadores: Nodos Independientes y Paso de Mensajes",
        subtitle: "Superando el cuello de botella de la memoria física centralizada",
        category: "Arquitectura General",
        content: [
          "Un multicomputador es una colección de nodos autónomos (CPU + Memoria privada + Tarjeta de red NIC).",
          "No existe memoria compartida física ni lógica: la comunicación se efectúa mediante mensajes explícitos (Send / Receive) sobre una red de interconexión."
        ],
        bullets: [
          "Ventaja crítica: Escalabilidad a miles de nodos sin saturar un bus común.",
          "Desafío: La latencia de la red de interconexión condiciona la velocidad global del sistema."
        ],
        diagramType: 'network',
        speakerNotes: "Explicar que todos los clústeres del TOP500 son multicomputadores basados en paso de mensajes con MPI."
      },
      {
        id: 2,
        title: "Topologías de Red: Métricas Clave",
        subtitle: "Diámetro, Grado de Nodo y Ancho de Bisección",
        category: "Topologías",
        bullets: [
          "Grado del Nodo (Degree): Número de puertos y enlaces físicos por router (afecta el costo del silicio).",
          "Diámetro de la Red: Distancia máxima en saltos (hops) entre los dos nodos más alejados (afecta la latencia máxima).",
          "Ancho de Bisección: Número de cables que cortan la red en dos mitades iguales (afecta el rendimiento ante tráfico denso)."
        ],
        content: [
          "Diseñar una red es un compromiso entre costo económico (menos cables/puertos) y rendimiento (bajo diámetro y alto ancho de bisección)."
        ],
        speakerNotes: "Dibujar mentalmente una malla vs un hipercubo para que aprecien la diferencia en cantidad de cables."
      },
      {
        id: 3,
        title: "Topologías Estáticas Clásicas y Modernas",
        subtitle: "De la Malla 2D y el Toro al Fat-Tree y Dragonfly",
        category: "Topologías",
        bullets: [
          "Malla 2D: Grado 4, diámetro O(√N), enrutamiento XY simple. Muy usada en NoCs de microprocesadores.",
          "Toro (Torus): Malla con enlaces envolventes en los bordes. Simétrica, reduce el diámetro a la mitad.",
          "Hipercubo: Diámetro logarítmico O(log₂ N), pero el grado del nodo crece con cada dimensión añadida.",
          "Fat-Tree: Árbol donde los enlaces se engrosan hacia la raíz. Estándar en centros de datos con InfiniBand.",
          "Dragonfly: Grupos densos de routers conectados directamente. Diámetro ultrabajo de 3 saltos (Cray Slingshot)."
        ],
        keyIdea: "En supercómputo moderno, Dragonfly y Fat-Tree son los reyes indiscutibles de la baja latencia.",
        speakerNotes: "Mencionar el supercomputador Frontier en Oak Ridge: utiliza redes Dragonfly para conectar más de 9,000 nodos."
      },
      {
        id: 4,
        title: "Modos de Conmutación: De Store-and-Forward a Wormhole",
        subtitle: "La revolución de los 'Flits' (Dally & Seitz)",
        category: "Técnicas de Switching",
        bullets: [
          "Store-and-Forward: Cada router espera a almacenar el paquete completo antes de reenviarlo. Latencia proporcional a la distancia y al tamaño del paquete.",
          "Virtual Cut-Through: Reenvía en cuanto llega la cabecera si el canal está libre; si está ocupado, almacena el paquete completo.",
          "Wormhole Switching: Divide el paquete en FLITS (Flow Control Units). La cabecera (Header Flit) abre camino y los flits de datos la siguen en pipeline.",
          "Ventaja Wormhole: Requiere búferes minúsculos en los conmutadores y la latencia es prácticamente independiente de la distancia física."
        ],
        keyIdea: "En Wormhole, el mensaje se estira a través de múltiples conmutadores como un tren o un gusano.",
        speakerNotes: "Ilustrar con la animación del tren: la locomotora es el flit de cabecera; si la locomotora para ante un semáforo rojo, todos los vagones quedan parados en las vías previas."
      },
      {
        id: 5,
        title: "Deadlocks y Canales Virtuales (VCs)",
        subtitle: "Cómo evitar que la red se congele indefinidamente",
        category: "Control de Flujo",
        bullets: [
          "Deadlock en red: Un conjunto de paquetes espera en círculo recursos retenidos mutuamente.",
          "Teorema de Dally-Seitz: Un encaminamiento determinista es libre de deadlock si y solo si su Grafo de Dependencia de Canales es acíclico.",
          "Solución 1: Enrutamiento Dimensión-Orden (XY-Routing) prohíbe giros en Y->X.",
          "Solución 2: Canales Virtuales (VCs) multiplexan varias colas lógicas en el mismo cable físico, permitiendo que un paquete rebase a otro bloqueado."
        ],
        keyIdea: "Los Canales Virtuales convierten un canal físico propenso a ciclos en múltiples canales virtuales libres de interbloqueo.",
        speakerNotes: "Hacer énfasis en cómo los canales virtuales resuelven el problema de bloqueo sin tener que tender miles de cables adicionales."
      }
    ]
  },
  {
    unitId: "deck-unit-3",
    unitNumber: 3,
    title: "Unidad III: Multiprocesadores de Memoria Compartida (SMP)",
    description: "Exposición sobre el problema de coherencia de caché, protocolos Snoopy MSI, MESI, MOESI, consistencia de memoria e instrucciones atómicas.",
    slides: [
      {
        id: 1,
        title: "Multiprocesadores Simétricos (SMP) y el Problema de Coherencia",
        subtitle: "Cachés privadas locales vs Espacio global de memoria",
        category: "Fundamentos SMP",
        content: [
          "En SMP, todos los procesadores comparten un único bus o red hacia una memoria RAM global.",
          "Cada procesador cuenta con memorias caché privadas (L1, L2) para evitar acceder constantemente a la lenta RAM."
        ],
        bullets: [
          "El dilema: Si el Núcleo 0 escribe en la variable X en su caché y el Núcleo 1 lee X de su propia caché, ¡recibirá datos obsoletos!",
          "Garantizar coherencia significa que todos los núcleos deben ver un estado coherente y serializado de la memoria."
        ],
        diagramType: 'coherence',
        speakerNotes: "Ilustrar el peligro con un saldo bancario: si dos cajeros automáticos leen un saldo de $1,000 en caché y ambos descuentan $800 sin invalidarse, el banco quiebra."
      },
      {
        id: 2,
        title: "Protocolos Snoopy: Espiando en el Bus Compartido",
        subtitle: "Mecanismo descentralizado de monitoreo de transacciones",
        category: "Protocolos de Coherencia",
        bullets: [
          "Todos los controladores de caché espían (snoop) constantemente todas las solicitudes que circulan por el bus.",
          "Estrategia Write-Invalidate: Cuando un núcleo escribe, emite una orden de invalidación en el bus; todos los demás núcleos marcan su copia como Inválida (I).",
          "Estrategia Write-Update: Cuando un núcleo escribe, difunde el nuevo valor por el bus para que los demás lo actualicen. Consume demasiado ancho de banda."
        ],
        keyIdea: "Write-Invalidate es la estrategia dominante en procesadores comerciales porque ahorra valioso ancho de banda de bus.",
        speakerNotes: "Comparar las dos estrategias: si un núcleo actualiza 1,000 veces un contador en un bucle privado, Write-Update saturaría el bus; Write-Invalidate solo emite una invalidación al inicio."
      },
      {
        id: 3,
        title: "Máquinas de Estados: MSI, MESI y MOESI",
        subtitle: "De tres estados básicos a la optimización de líneas modificadas",
        category: "Protocolos de Coherencia",
        bullets: [
          "MSI: Tres estados básicos (Modified, Shared, Invalid). Simple pero subóptimo en lecturas-escrituras aisladas.",
          "MESI: Agrega el estado Exclusive (E). Si ningún otro núcleo tiene el dato, se carga en 'E'; la posterior escritura pasa a 'M' silenciosamente sin emitir tráfico de bus.",
          "MOESI: Agrega el estado Owner (O). Permite que múltiples núcleos lean una línea modificada sin tener que escribirla de inmediato a la lenta RAM."
        ],
        keyIdea: "MESI es el protocolo clásico de procesadores Intel; MOESI es ampliamente utilizado en procesadores AMD.",
        speakerNotes: "Presentar la tabla de transiciones: explicar qué significa BusRd, BusRdX (Read with Intent to Modify) y BusUpgr."
      },
      {
        id: 4,
        title: "Consistencia de Memoria y Sincronización Hardware",
        subtitle: "Leslie Lamport, Consistencia Secuencial e Instrucciones Atómicas",
        category: "Consistencia y Locks",
        bullets: [
          "Coherencia vs Consistencia: Coherencia define operaciones sobre UNA sola variable. Consistencia define el orden global entre DIFERENTES variables.",
          "Consistencia Secuencial (Lamport): El orden global parece un entrelazado secuencial de las instrucciones de cada procesador en orden de programa.",
          "Modelos Relajados: Los procesadores modernos usan Store Buffers que pueden adelantar lecturas a escrituras pendientes. Requieren Barreras de Memoria (Fences).",
          "Primitivas Atómicas: Test-and-Set, Compare-and-Swap (CAS), Load-Linked / Store-Conditional (LL/SC) para construir exclusiones mutuas."
        ],
        keyIdea: "Sin instrucciones atómicas por hardware, es matemáticamente imposible construir un mutex seguro en multiprocesamiento.",
        speakerNotes: "Mencionar el problema de la Falsa Compartición (False Sharing): cuando dos hilos tocan variables distintas en la misma línea de 64 bytes de caché, destrozando el rendimiento."
      }
    ]
  },
  {
    unitId: "deck-unit-4",
    unitNumber: 4,
    title: "Unidad IV: Multiprocesadores Escalables (NUMA y Directorios)",
    description: "Exposición sobre el fin de los buses compartidos, arquitecturas NUMA/cc-NUMA, protocolos de directorio distribuido y synchronización escalable.",
    slides: [
      {
        id: 1,
        title: "El Fin del Bus: Arquitecturas NUMA y cc-NUMA",
        subtitle: "Distribución física de la memoria para servidores masivos",
        category: "Arquitectura NUMA",
        content: [
          "Los buses compartidos con espionaje colapsan al superar 16 a 32 núcleos por saturación de ancho de banda.",
          "En NUMA (Non-Uniform Memory Access), cada socket tiene su propio banco de memoria local. El acceso a memoria local toma ~50 ns, mientras que a memoria remota de otro socket toma ~150-250 ns."
        ],
        bullets: [
          "cc-NUMA: Mantiene la coherencia de caché sobre toda la memoria distribuida de manera totalmente transparente para el programador.",
          "Interconexiones punto a punto de alta velocidad: Intel UPI (Ultra Path Interconnect) y AMD Infinity Fabric."
        ],
        diagramType: 'cores',
        speakerNotes: "Destacar que cualquier servidor moderno con 2 o 4 sockets es una máquina NUMA. Si el programador no tiene cuidado con la afinidad de memoria, sufrirá penalizaciones de latencia."
      },
      {
        id: 2,
        title: "Protocolos Basados en Directorio",
        subtitle: "Eliminando la necesidad de difusión global (broadcast)",
        category: "Directorios",
        bullets: [
          "Sin bus compartido no hay espionaje (snooping). La coherencia se resuelve mediante un Directorio.",
          "Nodo Local (Solicitante): El núcleo que sufre el fallo de caché.",
          "Nodo de Origen (Home Node): El nodo que posee físicamente la línea en su módulo de RAM y custodia su entrada de directorio.",
          "Nodo Remoto (Sharer / Owner): Nodos que actualmente tienen copias del dato en sus cachés privadas."
        ],
        content: [
          "El Nodo Local envía un mensaje unicast al Home Node. El directorio consulta su tabla y despacha invalidaciones ÚNICAMENTE a los sharers reales."
        ],
        keyIdea: "El directorio convierte el tráfico ineficiente de broadcast en mensajes unicast punto a punto altamente escalables.",
        speakerNotes: "Seguir el flujo paso a paso con flechas: Request -> Home Node -> Invalidation a Sharers -> Acks de vuelta al Requester."
      },
      {
        id: 3,
        title: "Organización de Directorios: Bitmap Completo vs Punteros Limitados",
        subtitle: "El compromiso entre sobrecarga de silicio y tráfico de invalidación",
        category: "Directorios",
        bullets: [
          "Full Bit Vector: 1 bit por cada nodo del sistema. Para N nodos y M bloques de RAM, consume N · M bits. Invalida con precisión quirúrgica pero no escala a miles de nodos.",
          "Limited Pointers: Guarda solo k punteros (ej. k = 4). Si más de k nodos comparten la línea, recurre a broadcast o desaloja una copia.",
          "Directorios Encadenados (SCI): Lista doblemente enlazada en las propias cachés. Escala a miles de nodos con cero sobrecarga en RAM, pero con mayor latencia."
        ],
        speakerNotes: "Calcular con el curso el tamaño del directorio para 1,024 nodos con Full Bit Vector: 1,024 bits = 128 bytes por cada bloque de 64 bytes de RAM, ¡un absurdo del 200% de sobrecarga!"
      }
    ]
  },
  {
    unitId: "deck-unit-5",
    unitNumber: 5,
    title: "Unidad V: Sistemas Embebidos y Bajo Consumo",
    description: "Exposición sobre taxonomía de hardware embebido, microcontroladores vs SoCs vs FPGAs, RISC-V vs ARM, sistemas operativos de tiempo real (RTOS) y casos industriales.",
    slides: [
      {
        id: 1,
        title: "Sistemas Embebidos: El 98% de los Procesadores del Mundo",
        subtitle: "Cómputo dedicado sujeto a restricciones extremas",
        category: "Introducción Embebidos",
        content: [
          "Solo una mínima fracción de los microprocesadores producidos a nivel mundial terminan en PCs o servidores. ¡La inmensa mayoría reside en sistemas embebidos!",
          "Un sistema embebido está diseñado para una función específica dentro de un producto mayor (automóvil, lavadora, dron, marcapasos)."
        ],
        bullets: [
          "Restricciones críticas: Consumo energético ultrabajo (μW en reposo), costo por unidad medido en centavos de dólar y confiabilidad ante vibración y temperatura extrema."
        ],
        diagramType: 'embedded',
        speakerNotes: "Comentar que un automóvil moderno de gama alta contiene entre 70 y 150 Unidades de Control Electrónico (ECUs) embebidas interconectadas por bus CAN."
      },
      {
        id: 2,
        title: "Plataformas de Cómputo: MCU, SoC, FPGA y DSP",
        subtitle: "Selección del hardware según la relación costo / rendimiento",
        category: "Hardware Embebido",
        bullets: [
          "Microcontrolador (MCU): CPU, RAM, Flash y periféricos en un solo chip. Costo ínfimo ($0.50 - $3), ideal para control directo de actuadores y sensores.",
          "DSP: Arquitectura Harvard modificada con unidades de multiplicación-acumulación (MAC) para procesamiento de señales y audio en tiempo real.",
          "SoC (System-on-Chip): Núcleos potentes, GPU, NPU y conectividad integrados. Corre Linux embebido (Raspberry Pi, Smartphones).",
          "FPGA: Lógica reconfigurable en hardware. Latencia de nanosegundos para procesamiento a la velocidad del cable."
        ],
        speakerNotes: "Preguntar al curso qué elegirían para un monitor de ritmo cardíaco a batería vs para el sistema de reconocimiento de carril de un vehículo autónomo."
      },
      {
        id: 3,
        title: "ARM vs RISC-V: El Duelo Arquitectónico del Siglo XXI",
        subtitle: "El estándar propietario consagrado frente a la revolución de código abierto",
        category: "Arquitecturas ISA",
        bullets: [
          "ARM: Ecosistema industrial dominante. Cortex-M (microcontroladores deterministas), Cortex-R (tiempo real duro y tolerancia a fallos), Cortex-A (aplicaciones complejas).",
          "RISC-V: Conjunto de instrucciones (ISA) abierto, modular y libre de regalías (Berkeley, 2010).",
          "Modularidad de RISC-V: Núcleo base RV32I/RV64I + extensiones estándar: M (Multiplicación), A (Atómicas), F/D (Coma flotante), C (Comprimidas de 16 bits), V (Vectores)."
        ],
        keyIdea: "RISC-V permite a cualquier empresa o país diseñar sus propios procesadores sin pagar millones de dólares en licencias.",
        speakerNotes: "Explicar por qué gigantes como Western Digital, Google, NVIDIA y la Unión Europea están invirtiendo fuertemente en RISC-V para soberanía tecnológica."
      },
      {
        id: 4,
        title: "Sistemas de Tiempo Real (RTOS) y Eficiencia Energética",
        subtitle: "Garantías temporales deterministas y técnicas DVFS",
        category: "RTOS y Energía",
        bullets: [
          "Hard Real-Time: El incumplimiento de un solo plazo (deadline) causa un fallo catastrófico (Frenos ABS, Airbag, Marcapasos).",
          "Soft Real-Time: Perder un plazo solo degrada la calidad del servicio (Streaming de vídeo, UI de infoentretenimiento).",
          "RTOS (FreeRTOS, Zephyr): Planificación preemptiva determinista basada en prioridades fijas con latencia de interrupción acotada.",
          "Técnicas de Ahorro: Modos Deep Sleep (consumo de microamperios) y Escalado Dinámico de Voltaje y Frecuencia (DVFS)."
        ],
        keyIdea: "En tiempo real, entregar una respuesta matemáticamente correcta un milisegundo tarde equivale a una respuesta incorrecta.",
        speakerNotes: "Mencionar el caso del Rover Pathfinder en Marte (1997) y su famosa inversión de prioridades en el RTOS VxWorks."
      }
    ]
  },
  {
    unitId: "deck-unit-6",
    unitNumber: 6,
    title: "Unidad VI: Computación en la Nube y Virtualización",
    description: "Exposición sobre hipervisores Tipo 1 vs Tipo 2, contenedores vs máquinas virtuales, modelos IaaS/PaaS/SaaS y arquitecturas escalables de nube.",
    slides: [
      {
        id: 1,
        title: "Virtualización: El Pilar Fundacional del Cloud Computing",
        subtitle: "Transformando hardware rígido en recursos elásticos de software",
        category: "Fundamentos Cloud",
        content: [
          "La virtualización desacopla los sistemas operativos y las aplicaciones del hardware físico subyacente.",
          "Permite consolidar múltiples servidores subutilizados en un único servidor de alta densidad, multiplicando la eficiencia y reduciendo costos de centro de datos."
        ],
        bullets: [
          "Soporte por hardware: Extensiones Intel VT-x y AMD-V permitieron eliminar la costosa emulación por software de instrucciones sensibles.",
          "Traducción de memoria: Tecnologías EPT/NPT realizan la correspondencia de páginas virtuales de la VM a direcciones físicas en silicio."
        ],
        diagramType: 'cloud',
        speakerNotes: "Recordar que antes de la virtualización, los servidores en empresas funcionaban al 10-15% de utilización promedio de CPU, derrochando energía y espacio."
      },
      {
        id: 2,
        title: "Hipervisores: Bare-Metal (Tipo 1) vs Hosted (Tipo 2)",
        subtitle: "Directo sobre el silicio vs Aplicación sobre sistema operativo",
        category: "Hipervisores",
        bullets: [
          "Hipervisores Tipo 1 (Bare-Metal): Se instalan directo sobre el hardware sin SO anfitrión (VMware ESXi, KVM, Hyper-V, Xen). Sobrecarga casi nula (<2%), máximo rendimiento y aislamiento.",
          "Hipervisores Tipo 2 (Hosted): Corren como un programa dentro de Windows o Linux (VirtualBox, VMware Workstation). Ideales para desarrollo y docencia, pero con mayor sobrecarga.",
          "Estándar en centros de datos: Prácticamente el 100% de la infraestructura en AWS, Azure y Google Cloud corre sobre hipervisores Tipo 1 (KVM/Nitro)."
        ],
        keyIdea: "Tipo 1 es para producción y nubes masivas; Tipo 2 es para estaciones de trabajo y pruebas de escritorio.",
        speakerNotes: "Preguntar a los estudiantes qué hipervisor tienen instalado en sus laptops. La mayoría dirá VirtualBox (Tipo 2)."
      },
      {
        id: 3,
        title: "Máquinas Virtuales vs Contenedores (Docker)",
        subtitle: "Virtualización de hardware vs Aislamiento a nivel de Kernel",
        category: "Contenedores",
        bullets: [
          "Máquina Virtual: Virtualiza el hardware completo. Cada VM incluye su propio Kernel de SO, controladores y servicios de fondo. Pesa gigabytes y tarda minutos en arrancar.",
          "Contenedor: Comparte el Kernel del sistema operativo anfitrión. Utiliza Namespaces (aislamiento de procesos/red) y Cgroups (límites de CPU/RAM) del Kernel Linux.",
          "Ventaja de Contenedores: Arrancan en milisegundos, pesan megabytes y ofrecen densidad de empaquetado diez veces superior.",
          "Compromiso: Las VMs ofrecen aislamiento de seguridad más robusto por estar delimitadas por hardware."
        ],
        keyIdea: "Las VMs virtualizan el hardware; los contenedores empaquetan la aplicación sobre el mismo kernel.",
        speakerNotes: "Destacar que en esta misma plataforma SPA/PWA estamos utilizando Docker para empaquetar y desplegar la solución de manera portátil y reproducible."
      },
      {
        id: 4,
        title: "Modelos de Servicio: IaaS, PaaS, SaaS y Serverless",
        subtitle: "La matriz de responsabilidad compartida",
        category: "Modelos Cloud",
        bullets: [
          "IaaS (Infraestructura): El proveedor da VMs, red y almacenamiento; tú administras el SO, parches y aplicaciones (AWS EC2, Compute Engine).",
          "PaaS (Plataforma): El proveedor administra el SO y el runtime; tú solo subes tu código (App Engine, Heroku).",
          "SaaS (Software): El usuario consume directamente el producto final vía web (Google Workspace, Office 365).",
          "Serverless / FaaS: Funciones efímeras activadas por eventos. Escala automáticamente a cero; solo se paga por los milisegundos de cómputo reales."
        ],
        keyIdea: "A mayor nivel de abstracción, menor gestión de infraestructura y mayor foco en la lógica del negocio.",
        speakerNotes: "Cerrar la exposición conectando cómo todos los temas del semestre (multiprocesadores, redes, directorios, embebidos y nube) forman el ecosistema completo de la ingeniería informática."
      }
    ]
  }
];
