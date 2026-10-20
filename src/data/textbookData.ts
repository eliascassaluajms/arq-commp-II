import { TextbookUnit } from '../types';

export const textbookUnits: TextbookUnit[] = [
  {
    id: "unit-1",
    number: 1,
    ecId: "EC1",
    title: "Introducción al Procesamiento Paralelo",
    subtitle: "Límites físicos, Taxonomía de Flynn, Paradigmas y Leyes de Escalabilidad",
    icon: "Cpu",
    summary: "Exploración de la evolución arquitectónica desde procesadores mononúcleo hacia sistemas paralelos. Análisis de los límites físicos (Power Wall, Memory Wall, ILP Wall), clasificación de Flynn, y cuantificación formal del rendimiento mediante Speedup y Eficiencia (Leyes de Amdahl y Gustafson).",
    sections: [
      {
        id: "sec-1-1",
        subtopicNumber: "1.1",
        title: "Procesamiento Paralelo: Más Allá de la Velocidad",
        summary: "Por qué aumentar la frecuencia de reloj se volvió inviable y cómo el paralelismo resolvió la crisis energética de la computación.",
        content: [
          "Durante décadas, la industria informática experimentó un crecimiento vertiginoso del rendimiento siguiendo la Ley de Moore (duplicación de transistores por chip aproximadamente cada dos años) y el escalado de Dennard (a medida que los transistores se encogen, la densidad de potencia se mantiene constante). Esto permitía elevar la frecuencia de reloj de los procesadores mononúcleo sin aumentar desmedidamente la temperatura.",
          "Sin embargo, a mediados de la década de 2000, los diseñadores de procesadores chocaron contra tres barreras físicas fundamentales, conocidas conjuntamente como el 'Triple Muro' de la computación:",
          "1. El Muro de la Potencia (Power Wall): La potencia disipada por un circuito integrado CMOS escala proporcionalmente con el voltaje al cuadrado y la frecuencia (P ≈ C · V² · f). Superar frecuencias de 3.5 a 4 GHz requería voltajes que generaban densidades de calor comparables a la tobera de un cohete espacial, haciendo inviable la refrigeración por aire convencional.",
          "2. El Muro de la Memoria (Memory Wall): Mientras la velocidad de las unidades aritmético-lógicas (ALU) crecía a un ritmo anual acelerado, el tiempo de acceso a la memoria principal (DRAM) mejoraba mucho más lentamente. Este desfase de órdenes de magnitud provocaba que los procesadores pasaran cientos de ciclos ociosos esperando que los datos llegaran desde la memoria RAM.",
          "3. El Muro del Paralelismo a Nivel de Instrucción (ILP Wall): Las técnicas de microarquitectura para extraer paralelismo implícito dentro de un único hilo (como ejecución fuera de orden, predicción especulativa de saltos y pipelines hiperprofundos) alcanzaron rendimientos decrecientes con un costo exponencial de transistores y energía.",
          "La solución de la ingeniería moderna no consistió en intentar que un único procesador fuera infinitamente más rápido, sino en integrar múltiples núcleos de procesamiento independientes en el mismo chip o sistema, colaborando simultáneamente para resolver problemas de gran envergadura."
        ],
        analogies: [
          "Analogía del equipo de construcción: Si necesitas construir un muro de contención en la mitad del tiempo, no obligas a un único albañil a moverse al doble de velocidad (lo que causaría fatiga extrema y errores por sobrecalentamiento). En su lugar, colocas a cuatro albañiles trabajando sincronizadamente en tramos distintos del muro."
        ],
        keyConcepts: [
          { term: "Escalado de Dennard", definition: "Postulado físico que indicaba que al reducir el tamaño físico de los transistores, la potencia requerida por unidad de área se mantenía constante. Dejó de cumplirse alrededor de 2005 por corrientes de fuga cuántica." },
          { term: "Power Wall", definition: "Límite físico práctico de disipación térmica y consumo eléctrico que impidió continuar incrementando la frecuencia de reloj en procesadores mononúcleo." },
          { term: "Throughput vs Latencia", definition: "La latencia es el tiempo necesario para completar una tarea individual. El throughput (rendimiento) es el número de tareas completadas por unidad de tiempo." }
        ]
      },
      {
        id: "sec-1-2",
        subtopicNumber: "1.2",
        title: "Clasificación de Arquitecturas: La Taxonomía de Flynn",
        summary: "El estándar histórico y conceptual formulado por Michael J. Flynn en 1966 para categorizar sistemas computacionales según el número de flujos de instrucciones y de datos.",
        content: [
          "Para clasificar formalmente las diversas formas en que un computador puede ejecutar operaciones concurrentes, Michael J. Flynn propuso categorizar las máquinas en función de dos variables ortogonales: el Flujo de Instrucciones (Instruction Stream) y el Flujo de Datos (Data Stream). De esta interacción surgen cuatro clases fundamentales:",
          "1. SISD (Single Instruction, Single Data): La arquitectura von Neumann tradicional. Una única unidad de control emite una secuencia de instrucciones que operan sobre un único conjunto de datos en cada ciclo. Ejemplos clásicos: procesadores Intel 8086, Pentium clásico.",
          "2. SIMD (Single Instruction, Multiple Data): Una única unidad de control despacha una única instrucción, la cual es ejecutada simultáneamente sobre múltiples elementos de datos diferentes por múltiples unidades de procesamiento. Ideal para procesamiento de imágenes, gráficos por computadora y aprendizaje profundo. Ejemplos: extensiones SSE, AVX, y arquitecturas masivas de GPU (NVIDIA CUDA cores).",
          "3. MISD (Multiple Instruction, Single Data): Múltiples unidades de instrucción ejecutan diferentes secuencias de operaciones sobre el mismo flujo de datos. Es la categoría más infrecuente en computación comercial, pero crucial para sistemas de tolerancia a fallos donde múltiples algoritmos independientes analizan los mismos datos de sensores para validación redundante (ej. sistemas de control de vuelo espacial).",
          "4. MIMD (Multiple Instruction, Multiple Data): Múltiples procesadores completamente autónomos ejecutan diferentes programas o secuencias de instrucciones sobre flujos de datos independientes. Esta categoría abarca la inmensa mayoría de las supercomputadoras modernas, servidores multiprocesador y CPUs multinúcleo contemporáneas."
        ],
        comparativeTables: [
          {
            title: "Matriz Comparativa de la Taxonomía de Flynn",
            headers: ["Categoría", "Flujo Instrucciones", "Flujo Datos", "Características Arquitectónicas", "Casos de Uso Dominantes"],
            rows: [
              ["SISD", "Único", "Único", "Arquitectura von Neumann secuencial, un hilo activo.", "Procesadores tradicionales de bajo costo."],
              ["SIMD", "Único", "Múltiple", "Múltiples ALUs sincronizadas en paso de bloqueo bajo una sola UC.", "GPUs, procesamiento de audio/video, IA matricial."],
              ["MISD", "Múltiple", "Único", "Múltiples procesadores procesando el mismo dato en paralelo.", "Sistemas de aviónica con redundancia de seguridad."],
              ["MIMD", "Múltiple", "Múltiple", "Nodos o núcleos independientes con memoria compartida o distribuida.", "CPUs multinúcleo, Clústeres HPC, Centros de datos."]
            ]
          }
        ]
      },
      {
        id: "sec-1-3",
        subtopicNumber: "1.3",
        title: "Paradigmas y Modelos de Programación Paralela",
        summary: "Diferenciación entre el paradigma de memoria compartida y el paradigma de paso de mensajes, sus modelos de programación y retos de concurrencia.",
        content: [
          "La estructura física del hardware dicta directamente cómo debe concebirse el software concurrente. Existen dos paradigmas dominantes en el ecosistema paralelo:",
          "A. Modelo de Memoria Compartida (Shared Memory): Todos los núcleos o procesadores comparten un único espacio de direcciones virtual y físico. La comunicación se realiza de manera implícita mediante lecturas y escrituras ordinarias en memoria RAM. Es altamente intuitivo para el programador, pero introduce el peligro inminente de condiciones de carrera (race conditions), deadlocks e inconsistencia de datos si no se sincroniza adecuadamente.",
          "Estándar clave: OpenMP (Open Multi-Processing) y primitivas de hilos nativos (pthreads, std::thread).",
          "B. Modelo de Paso de Mensajes (Message Passing / Memoria Distribuida): Cada procesador posee su propia memoria local exclusiva y no puede acceder directamente a la memoria de otros nodos. Para coordinarse, los procesos deben intercambiar explícitamente mensajes a través de una red de interconexión física mediante primitivas de envío (Send) y recepción (Receive).",
          "Estándar clave: MPI (Message Passing Interface). Ofrece una escalabilidad prácticamente ilimitada a decenas de miles de servidores, pero impone mayor esfuerzo cognitivo sobre el desarrollador."
        ],
        keyConcepts: [
          { term: "Condición de Carrera", definition: "Comportamiento anómalo donde el resultado de una operación depende del orden o temporización no determinista con que múltiples hilos acceden a una variable compartida." },
          { term: "Exclusión Mutua", definition: "Propiedad que garantiza que solo un hilo o proceso accede a una sección crítica de código o dato a la vez." },
          { term: "OpenMP vs MPI", definition: "OpenMP paraleliza a nivel de hilos sobre memoria compartida con directivas pragmáticas de compilador. MPI coordina procesos separados a través de la red." }
        ]
      },
      {
        id: "sec-1-4",
        subtopicNumber: "1.4",
        title: "Medidas de Rendimiento, Ley de Amdahl y Ley de Gustafson",
        summary: "Formulación matemática rigurosa para calcular la aceleración (Speedup) y la eficiencia del hardware paralelo.",
        content: [
          "Evaluar un sistema computacional paralelo exige métricas cuantificables que permitan determinar si la adición de recursos de hardware justifica la inversión económica y la complejidad del desarrollo.",
          "1. Aceleración o Speedup (S): Se define como la razón entre el tiempo de ejecución de un programa en un solo procesador (T₁) y el tiempo de ejecución en p procesadores (T_p): S(p) = T₁ / T_p.",
          "El Speedup ideal es el lineal o perfecto (S = p), donde duplicar los procesadores reduce el tiempo a la mitad. En la práctica, casi siempre se observa un Speedup sublineal debido a la sobrecarga de sincronización, comunicación y secuencias secuenciales.",
          "2. Eficiencia (E): Mide qué tan bien se están aprovechando los procesadores asignados: E(p) = S(p) / p = T₁ / (p · T_p). Una eficiencia del 100% (E = 1.0) representa aprovechamiento total. Eficiencias por debajo del 50% indican que gran parte del tiempo se pierde en esperas o cuellos de botella.",
          "3. Ley de Amdahl (Carga Fija): Postulada por Gene Amdahl en 1967. Asume que el tamaño total del problema se mantiene fijo. Si una fracción f del programa es paralelizable y una fracción (1 - f) es estrictamente secuencial, el Speedup máximo alcanzable está acotado por: S(p) = 1 / ((1 - f) + (f / p)).",
          "Cuando p tiende a infinito, el Speedup límite teórico es 1 / (1 - f). Por ejemplo, si el 10% del programa es secuencial (f = 0.90), ¡el Speedup jamás podrá superar 10x, sin importar si instalamos 10,000 procesadores!",
          "4. Ley de Gustafson-Barsis (Carga Escalada): Propuesta por John Gustafson en 1988. Observa que en el cómputo científico y de ingeniería real, al disponer de una supercomputadora más grande, los científicos no resuelven el mismo problema pequeño más rápido, sino un problema mucho más detallado y ambicioso en el mismo tiempo. El Speedup escalado se define como: S_scal(p) = p - (1 - f) · (p - 1)."
        ],
        formulas: [
          {
            name: "Speedup (Aceleración)",
            expression: "S(p) = \\frac{T_{secuencial}}{T_{paralelo}(p)} = \\frac{T_1}{T_p}",
            description: "Razón entre el tiempo de ejecución secuencial en un núcleo y el tiempo en p procesadores.",
            variables: [
              { symbol: "T₁", meaning: "Tiempo de ejecución en 1 procesador" },
              { symbol: "T_p", meaning: "Tiempo de ejecución en p procesadores" },
              { symbol: "p", meaning: "Número de unidades de procesamiento" }
            ]
          },
          {
            name: "Eficiencia de Procesamiento",
            expression: "E(p) = \\frac{S(p)}{p} \\times 100\\%",
            description: "Porcentaje de utilización efectiva de los procesadores disponibles.",
            variables: [
              { symbol: "S(p)", meaning: "Aceleración obtenida con p procesadores" },
              { symbol: "p", meaning: "Cantidad de procesadores utilizados" }
            ]
          },
          {
            name: "Ley de Amdahl (Carga Fija)",
            expression: "S(p) = \\frac{1}{(1 - f) + \\frac{f}{p}} \\implies \\lim_{p \\to \\infty} S(p) = \\frac{1}{1 - f}",
            description: "Límite superior del speedup cuando el tamaño de los datos es constante.",
            variables: [
              { symbol: "f", meaning: "Fracción del programa que puede ejecutarse en paralelo (0 <= f <= 1)" },
              { symbol: "1 - f", meaning: "Fracción secuencial irreductible del programa" },
              { symbol: "p", meaning: "Número de procesadores" }
            ]
          },
          {
            name: "Ley de Gustafson (Carga Escalada)",
            expression: "S_{scal}(p) = p - (1 - f)(p - 1)",
            description: "Speedup cuando el tamaño del problema escala para llenar la capacidad computacional disponible.",
            variables: [
              { symbol: "p", meaning: "Número de procesadores" },
              { symbol: "f", meaning: "Fracción paralelizable del problema ampliado" }
            ]
          }
        ],
        interactiveType: 'speedup'
      }
    ]
  },
  {
    id: "unit-2",
    number: 2,
    ecId: "EC2",
    title: "Multicomputadores y Redes de Interconexión",
    subtitle: "Topologías de Red, Modos de Conmutación, Routing, Deadlocks y Canales Virtuales",
    icon: "Network",
    summary: "Estudio exhaustivo de los multicomputadores, donde nodos independientes se comunican a través de una red de interconexión de alto rendimiento. Análisis de topologías, técnicas de switching (Store-and-Forward, VCT, Wormhole), prevención de interbloqueos y algoritmos de encaminamiento.",
    sections: [
      {
        id: "sec-2-1",
        subtopicNumber: "2.1",
        title: "Arquitectura de Multicomputadores",
        summary: "Estructura de nodos independientes, paso de mensajes explícito y su comparación con multiprocesadores de memoria compartida.",
        content: [
          "Un multicomputador es un sistema paralelo de computación MIMD constituido por un conjunto de nodos independientes interconectados a través de una red de comunicación de alta velocidad y baja latencia.",
          "Cada nodo es en sí mismo una computadora completa, dotada de uno o varios microprocesadores, su propia memoria RAM privada y un adaptador de red dedicado (Network Interface Card - NIC o HCA). En este paradigma, ningún procesador tiene acceso físico ni lógico directo a la memoria de otro nodo; por consiguiente, la interacción y el intercambio de información deben gestionarse de manera explícita a través de la red de interconexión mediante protocolos de paso de mensajes.",
          "Las multicomputadoras constituyen la base de los clústeres modernos, supercomputadoras de la lista TOP500 y centros de datos en la nube debido a que eliminan el cuello de botella físico de un bus de memoria compartido, logrando escalar a miles de nodos."
        ],
        comparativeTables: [
          {
            title: "Comparativa: Multiprocesador vs Multicomputador",
            headers: ["Característica", "Multiprocesador (Memoria Compartida)", "Multicomputador (Memoria Distribuida)"],
            rows: [
              ["Espacio de Memoria", "Único espacio de direcciones global accesible por todos los núcleos.", "Espacios de memoria locales y privados por nodo."],
              ["Mecanismo de Comunicación", "Implícito: lectura y escritura en variables de memoria común.", "Explícito: envío y recepción de paquetes/mensajes por la red."],
              ["Ventaja Principal", "Fácil de programar (abstracción unificada de memoria).", "Escalabilidad casi ilimitada (sin saturación de bus central)."],
              ["Desventaja Principal", "Escalabilidad limitada a decenas de núcleos por contención de bus.", "Mayor esfuerzo de programación (gestión explícita de comunicaciones)."],
              ["Analogía Didáctica", "Un equipo trabajando frente a un único pizarrón compartido.", "Un equipo en oficinas separadas comunicándose por teléfono."],
              ["Ejemplo Real", "Servidores SMP de 4 sockets, procesadores AMD EPYC / Intel Xeon.", "Clústeres HPC (InfiniBand), Supercomputadoras Cray / BlueGene."]
            ]
          }
        ]
      },
      {
        id: "sec-2-2",
        subtopicNumber: "2.2",
        title: "Topologías de Redes de Interconexión",
        summary: "Estructuras estáticas y dinámicas, métricas topológicas y análisis comparativo para supercómputo.",
        content: [
          "La topología de una red de interconexión describe el patrón geométrico y físico en el que los nodos y los conmutadores (switches) están enlazados. La elección de la topología impacta directamente en el costo, la latencia y la tolerancia a fallos del sistema.",
          "Las métricas topológicas fundamentales para analizar una red son:",
          "- Grado del Nodo (Degree): Número de enlaces físicos conectados directamente a un nodo. Determina la complejidad de hardware del router.",
          "- Diámetro de la Red (Diameter): La distancia máxima (número de saltos o hops) entre los dos nodos más alejados utilizando la ruta más corta. Condiciona la latencia máxima de la red.",
          "- Ancho de Bisección (Bisection Width): El número mínimo de enlaces que deben cortarse para dividir la red en dos mitades con igual número de nodos. Refleja la capacidad de la red para soportar tráfico global intenso.",
          "- Regularidad y Simetría: Una red es regular si todos los nodos tienen el mismo grado, y simétrica si la red se ve idéntica desde cualquier nodo, lo que simplifica enormemente los algoritmos de encaminamiento."
        ],
        comparativeTables: [
          {
            title: "Tabla Comparativa de Topologías de Interconexión",
            headers: ["Topología", "Estructura Geométrica", "Ventajas", "Desventajas", "Ejemplos Reales"],
            rows: [
              ["Bus", "Todos los nodos comparten un canal común multiplexado.", "Extremadamente simple, bajo costo, broadcast trivial.", "Colisiones, severo cuello de botella, nula escalabilidad.", "Primeros multiprocesadores históricos."],
              ["Anillo (Ring)", "Nodos conectados en un ciclo cerrado unidireccional o bidireccional.", "Grado fijo (2 enlaces por nodo), cableado ordenado.", "Diámetro elevado O(N/2), si falla un nodo se rompe el anillo.", "Token Ring, interconexión en chip Intel Skylake."],
              ["Malla 2D (2D Mesh)", "Grilla bidireccional donde cada nodo conecta con 4 vecinos cardinales.", "Alta escalabilidad, layout plano regular, fácil de enrutar (XY).", "Nodos de esquina y bordes tienen menor grado, diámetro O(√N).", "Intel Xeon Phi, NoC en procesadores masivos."],
              ["Toro (Torus)", "Malla 2D o 3D con enlaces envolventes que unen los bordes opuestos.", "Topología completamente simétrica, reduce el diámetro a la mitad.", "Cables más largos para los enlaces envolventes.", "IBM Blue Gene/L y Blue Gene/Q, Fujitsu K Computer."],
              ["Hipercubo (Hypercube)", "Nodos situados en los vértices de un cubo de n dimensiones (N = 2ⁿ).", "Diámetro logarítmico mínimo O(log₂ N), gran ancho de bisección.", "El grado del nodo crece con n; difícil expandir con nodos arbitrarios.", "Intel iPSC, Connection Machine."],
              ["MIN (Fat-Tree)", "Árbol jerárquico donde el ancho de banda de los enlaces aumenta hacia la raíz.", "Permite comunicación total libre de bloqueo (non-blocking).", "Gran cantidad de cables y conmutadores de alta velocidad.", "Redes de centros de datos, Mellanox InfiniBand."],
              ["Dragonfly / Slim Fly", "Grupos densos de routers conectados en malla completa entre sí.", "Latencia ultrabaja (diámetro = 3 saltos), gran eficiencia de cables.", "Algoritmos de encaminamiento adaptativo complejos.", "Cray Slingshot / Aries (Supercomputador Frontier)."]
            ]
          }
        ],
        interactiveType: 'topology'
      },
      {
        id: "sec-2-3",
        subtopicNumber: "2.3",
        title: "Técnicas y Modos de Conmutación (Switching)",
        summary: "Cómo viajan los datos a través de los conmutadores: Circuit Switching, Store-and-Forward, Virtual Cut-Through y Wormhole.",
        content: [
          "El modo de conmutación determina cómo se reservan los canales físicos y los búferes de los enrutadores cuando un mensaje transita desde el nodo origen hacia el destino.",
          "1. Conmutación de Circuitos (Circuit Switching): Antes de transferir datos, se establece un camino físico dedicado extremo a extremo. Los datos fluyen sin demoras en los switches, pero la reserva inicial es lenta y los enlaces quedan inutilizados si el emisor no transmite continuamente.",
          "2. Almacenamiento y Reenvío (Store-and-Forward): El conmutador espera a recibir el paquete completo en su búfer de entrada antes de inspeccionar la cabecera y enviarlo al siguiente nodo. Latencia = d · (L / B), donde d es el número de saltos, L el tamaño del paquete y B el ancho de banda. En redes de gran diámetro, la latencia acumulada se vuelve inaceptable.",
          "3. Corte Virtual (Virtual Cut-Through - VCT): Propuesto por Kermani y Kleinrock en 1979. El conmutador inspecciona la cabecera del paquete tan pronto llega y, si el canal de salida está libre, comienza a reenviar los datos de inmediato sin esperar al resto del paquete. Si el canal está ocupado, el paquete completo se almacena en el búfer local.",
          "4. Conmutación Wormhole (Wormhole Switching): Creada por Dally y Seitz en 1986. Divide el paquete en unidades de control de flujo denominadas 'flits' (Flow Control Digits). El flit de cabecera (Header Flit) contiene la dirección de destino y abre el camino en cada switch. Los flits de datos (Data Flits) siguen en fila india como el cuerpo de un gusano. Si la cabecera se bloquea por congestión, todos los flits restantes se detienen en los búferes de los switches por los que van pasando, manteniendo ocupados dichos enlaces físicos."
        ],
        comparativeTables: [
          {
            title: "Comparación de Técnicas de Conmutación de Paquetes",
            headers: ["Modo de Conmutación", "Unidad de Búfer", "Latencia en Red Libre", "Comportamiento ante Bloqueo", "Búfer Requerido en Switch"],
            rows: [
              ["Store-and-Forward", "Paquete completo", "Proporcional a distancia y tamaño: O(d · L/B)", "Se almacena en el nodo actual; libera enlaces previos.", "Grande (capacidad para paquetes completos)."],
              ["Virtual Cut-Through", "Paquete completo", "Casi independiente de la distancia: O(d·t_header + L/B)", "Se almacena el paquete completo en el switch bloqueado.", "Grande (búfer por paquete completo)."],
              ["Wormhole Switching", "Flit (fracción de paquete)", "Mínima: O(d·t_flit + L/B), pipeline continuo", "El 'cuerpo' del mensaje queda estirado bloqueando enlaces.", "Diminuto (apenas unos pocos flits por puerto)."]
            ]
          }
        ],
        interactiveType: 'wormhole'
      },
      {
        id: "sec-2-4",
        subtopicNumber: "2.4",
        title: "El Problema de los Bloqueos (Deadlock) y Canales Virtuales",
        summary: "Condiciones de Coffman en redes, grafos de dependencia de canales y ruptura de ciclos mediante Canales Virtuales.",
        content: [
          "Un interbloqueo o Deadlock en una red de interconexión ocurre cuando un conjunto de paquetes no puede avanzar indefinidamente porque cada paquete retiene un recurso (un búfer o canal) y está a la espera del recurso retenido por el siguiente paquete, formando una cadena cíclica cerrada.",
          "En conmutación Wormhole, el riesgo de deadlock es particularmente agudo porque un solo paquete bloqueado mantiene retenidos enlaces a lo largo de múltiples switches intermedios.",
          "Para que ocurra un deadlock, deben cumplirse las condiciones de Coffman (exclusión mutua, retención y espera, no apropiación y espera circular).",
          "Estrategias de solución:",
          "A. Restricción del Encaminamiento (Evitación Topológica): Se diseñan algoritmos que prohíben explícitamente ciertos giros o transiciones para que el Grafo de Dependencia de Canales (CDG) sea un Grafo Acíclico Dirigido (DAG). Teorema de Dally-Seitz: Un algoritmo de encaminamiento determinista está libre de deadlock si y solo si su grafo de dependencia de canales no contiene ciclos.",
          "Ejemplo clásico: Encaminamiento Dimensión-Orden o XY-Routing en mallas 2D. Todos los paquetes se desplazan primero en el eje X y luego en el eje Y. Se prohíben giros Y a X, eliminando completamente los ciclos.",
          "B. Canales Virtuales (Virtual Channels - VCs): Se multiplexan en el tiempo múltiples colas lógicas independientes de flits (canales virtuales) sobre un único enlace físico. Si un paquete se bloquea en el canal virtual VC0, otros paquetes pueden rebasarlo utilizando el canal virtual VC1 a través del mismo cable físico, rompiendo la espera circular sin necesidad de duplicar el cableado de la supercomputadora."
        ],
        keyConcepts: [
          { term: "Flit (Flow Control Digit)", definition: "La unidad más pequeña de transferencia y asignación de búfer en conmutación Wormhole. Mide típicamente entre 4 y 16 bytes." },
          { term: "Canal Virtual (VC)", definition: "Estructura que proporciona búferes separados en cada puerto del conmutador compartiendo un único enlace físico multiplexado en el tiempo." },
          { term: "Livelock", definition: "Situación anómala en encaminamiento adaptativo donde los paquetes continúan moviéndose a través de la red pero nunca llegan a su destino debido a desvíos continuos." }
        ]
      }
    ]
  },
  {
    id: "unit-3",
    number: 3,
    ecId: "EC3",
    title: "Multiprocesadores de Memoria Compartida y Protocolos Snoopy",
    subtitle: "SMP, Coherencia de Caché, Protocolos MSI / MESI / MOESI y Sincronización Hardware",
    icon: "Layers",
    summary: "Estudio de las arquitecturas multiprocesador de memoria compartida simétrica (SMP). Profundización en el problema de la incoherencia de cachés, protocolos de espionaje en bus (Snoopy), consistencia de memoria y primitivas atómicas de sincronización.",
    sections: [
      {
        id: "sec-3-1",
        subtopicNumber: "3.1",
        title: "Multiprocesadores Simétricos (SMP) y Coherencia de Caché",
        summary: "El acceso uniforme a memoria (UMA) y el desafío de mantener copias de datos idénticas en cachés privadas.",
        content: [
          "En un multiprocesador de memoria compartida simétrica (SMP - Symmetric Multiprocessor), todos los procesadores o núcleos tienen acceso simétrico e idéntico a un único espacio global de memoria física con el mismo tiempo de latencia (Acceso Uniforme a Memoria - UMA).",
          "Para amortiguar el 'Muro de la Memoria', cada núcleo cuenta con sus propias memorias caché privadas (L1 y L2) ultrarrápidas. Esto desencadena de forma inmediata el grave Problema de Coherencia de Caché:",
          "Si dos núcleos leen el mismo dato X de memoria en sus cachés privadas y posteriormente el Núcleo 0 modifica X a un nuevo valor X', la caché del Núcleo 1 y la memoria principal retendrán un valor obsoleto (stale data). Si el Núcleo 1 realiza una lectura subsiguiente, operará sobre información errónea, corrompiendo el estado del programa.",
          "Definición formal de Coherencia: Un sistema de memoria es coherente si:",
          "1. Una lectura del procesador P en la posición X devuelve el valor escrito más recientemente por P, siempre que no intervengan escrituras de otros procesadores.",
          "2. Una lectura del procesador P1 en la posición X devuelve el valor escrito por otro procesador P2 si la lectura y la escritura están suficientemente separadas en el tiempo y no median otras escrituras.",
          "3. Las escrituras sobre la misma ubicación de memoria son serializadas: todos los procesadores del sistema ven las escrituras en exactamente el mismo orden."
        ]
      },
      {
        id: "sec-3-2",
        subtopicNumber: "3.2",
        title: "Protocolos de Coherencia Snoopy (MSI, MESI, MOESI)",
        summary: "Mecanismos de espionaje en bus compartido, máquinas de estados finitos y transiciones ante aciertos y fallos.",
        content: [
          "En sistemas basados en un bus de interconexión compartido, los controladores de caché de todos los procesadores monitorean o 'espían' (snoop) constantemente todas las transacciones que circulan por el bus. Al detectar una operación que afecta a una dirección presente en su caché local, el controlador actualiza su estado interno o invalida su línea.",
          "1. Protocolo MSI (Protocolo Base): Cada línea de caché puede residir en uno de tres estados:",
          "- M (Modified / Dirty): La línea está presente únicamente en esta caché y ha sido modificada respecto a la memoria RAM. El procesador tiene permiso exclusivo de lectura y escritura.",
          "- S (Shared / Clean): La línea puede estar presente en múltiples cachés simultáneamente. Su contenido es idéntico a la memoria RAM. Solo se permite lectura.",
          "- I (Invalid): La línea no contiene datos válidos; cualquier intento de acceso genera un fallo de caché (cache miss).",
          "2. Protocolo MESI (Protocolo Illinois): Introduce el estado E (Exclusive). Permite optimizar el caso común en el que un procesador lee un dato que ningún otro procesador tiene, y luego lo escribe. En MSI, esa escritura requeriría un mensaje de invalidación por el bus; en MESI, al estar en estado 'E', el procesador promociona a 'M' silenciosamente sin generar tráfico de bus.",
          "3. Protocolo MOESI: Agrega el estado O (Owner). Permite compartir una línea modificada entre múltiples cachés sin necesidad de escribirla inmediatamente a la memoria principal RAM. El nodo en estado 'O' se hace responsable de responder a futuras lecturas de otros núcleos y de actualizar la RAM al desalojar el bloque."
        ],
        comparativeTables: [
          {
            title: "Estados del Protocolo MOESI",
            headers: ["Estado", "Significado", "¿Dato Válido?", "¿Modificado vs RAM?", "¿Copia Exclusiva?", "¿Permite Escritura Directa?"],
            rows: [
              ["M - Modified", "Modificado y Exclusivo", "Sí", "Sí (Dirty)", "Sí (único dueño)", "Sí (inmediata)"],
              ["O - Owner", "Propietario Compartido", "Sí", "Sí (Dirty)", "No (otros tienen S)", "No (requiere invalidar S)"],
              ["E - Exclusive", "Exclusivo y Limpio", "Sí", "No (Clean)", "Sí (único dueño)", "Sí (promociona a M)"],
              ["S - Shared", "Compartido y Limpio", "Sí", "No (Clean respecto a RAM u Owner)", "No (múltiples copias)", "No (debe pedir BusRdX)"],
              ["I - Invalid", "Inválido / Obsoleto", "No", "N/A", "N/A", "No (genera Miss)"]
            ]
          }
        ],
        interactiveType: 'coherence'
      },
      {
        id: "sec-3-3",
        subtopicNumber: "3.3",
        title: "Consistencia de Memoria y Primitivas de Sincronización Hardware",
        summary: "Consistencia Secuencial de Lamport, modelos relajados y cerrojos mediante instrucciones atómicas.",
        content: [
          "Mientras que la coherencia define el comportamiento de lecturas y escrituras respecto a una ÚNICA posición de memoria, la Consistencia de Memoria define el orden global en el que las operaciones sobre DIFERENTES posiciones de memoria se hacen visibles para los demás procesadores.",
          "1. Consistencia Secuencial (Leslie Lamport, 1979): El modelo mental intuitivo del programador. Exige que el resultado de cualquier ejecución sea idéntico al que se obtendría si las operaciones de todos los procesadores se ejecutaran en algún orden secuencial global entrelazado, y las operaciones de cada procesador individual aparecieran en el orden especificado por su programa.",
          "2. Modelos de Consistencia Relajada (Relaxed Consistency Models): Para optimizar el rendimiento, los procesadores modernos (como x86 TSO, ARM y RISC-V) reordenan escrituras y lecturas en búferes de almacenamiento (Store Buffers). Para forzar un orden estricto cuando se comparten banderas de sincronización, los compiladores deben insertar instrucciones de barrera de memoria (Memory Fences / Barricadas de memoria).",
          "3. Primitivas de Sincronización Hardware: Para implementar exclusión mutua (locks) libres de condiciones de carrera, el hardware proporciona instrucciones atómicas Read-Modify-Write indivisibles:",
          "- Test-and-Set: Lee el valor antiguo de una posición de memoria y escribe un '1' atómicamente.",
          "- Compare-and-Swap (CAS): Compara el contenido de memoria con un valor esperado; si coincide, almacena el nuevo valor.",
          "- Load-Linked / Store-Conditional (LL/SC): Estándar en arquitecturas RISC-V y ARM. Carga un dato con un testigo (link); la posterior escritura condicional solo tiene éxito si nadie más ha modificado la dirección en el intervalo."
        ],
        keyConcepts: [
          { term: "Falsa Compartición (False Sharing)", definition: "Fenómeno en el cual dos procesadores independientes modifican variables distintas que casualmente residen en la misma línea de caché (típicamente de 64 bytes), provocando continuas invalidaciones y tráfico de bus devastador para el rendimiento." },
          { term: "Barrera de Memoria (Memory Fence)", definition: "Instrucción de microprocesador que impide que el procesador reordene operaciones de memoria anteriores después de la barrera o viceversa." }
        ]
      }
    ]
  },
  {
    id: "unit-4",
    number: 4,
    ecId: "EC4",
    title: "Multiprocesadores Escalables y Protocolos de Directorio",
    subtitle: "NUMA, cc-NUMA, Estructura de Directorios Distribuidos y Sincronización a Gran Escala",
    icon: "Boxes",
    summary: "Arquitecturas de memoria compartida escalables más allá de las limitaciones físicas del bus central. Sistemas NUMA/cc-NUMA, protocolos de directorio distribuido y optimizaciones para supercómputo.",
    sections: [
      {
        id: "sec-4-1",
        subtopicNumber: "4.1",
        title: "La Necesidad de Escalar: De SMP a NUMA",
        summary: "Por qué los buses compartidos colapsan con más de 16-32 núcleos y cómo la distribución física de la memoria resuelve el cuello de botella.",
        content: [
          "Los multiprocesadores basados en bus compartido (SMP con protocolos Snoopy) presentan una grave limitación física de escalabilidad. Un bus es un medio de difusión compartido: cada vez que un núcleo invalida una línea, el mensaje viaja a TODOS los demás núcleos. Al superar unas cuantas decenas de núcleos, el bus se satura al 100%, convirtiéndose en un cuello de botella infranqueable.",
          "Para construir servidores con cientos o miles de núcleos manteniendo la comodidad de programación de un espacio de memoria compartida global, la industria desarrolló las arquitecturas NUMA (Non-Uniform Memory Access) y cc-NUMA (Cache-Coherent NUMA).",
          "En NUMA, la memoria física se distribuye físicamente entre los nodos del sistema. Cada nodo cuenta con su propio procesador y su banco de memoria local. Todos los nodos están interconectados por una red de conmutación punto a punto (como Intel QPI/UPI o AMD Infinity Fabric).",
          "Un procesador puede acceder a su memoria local a una latencia bajísima (ej. 50 ns); sin embargo, si necesita acceder a la memoria física situada en otro nodo (memoria remota), la solicitud debe viajar a través de la red de interconexión, experimentando una latencia sustancialmente mayor (ej. 150 - 250 ns). Esta discrepancia de tiempos constituye la No Uniformidad del Acceso."
        ]
      },
      {
        id: "sec-4-2",
        subtopicNumber: "4.2",
        title: "Protocolos de Coherencia Basados en Directorio",
        summary: "Mantenimiento de la coherencia punto a punto mediante nodos locales, de origen (home) y remotos.",
        content: [
          "Dado que en redes NUMA no existe un canal de difusión global (broadcast) donde espiar todas las transacciones, la coherencia de caché se resuelve mediante un Directorio Distribuido.",
          "El directorio es una estructura de datos de hardware asociada a cada módulo de memoria. Realiza un seguimiento minucioso de qué nodos del sistema poseen actualmente una copia de cada línea de caché y en qué estado se encuentra.",
          "Para cualquier transacción de memoria, se identifican tres roles fundamentales:",
          "1. Nodo Local (Requesting Node): El nodo que origina la petición de lectura o escritura.",
          "2. Nodo de Origen (Home Node): El nodo en cuya memoria física reside permanentemente la dirección de memoria solicitada. Es el custodio de la entrada de directorio para esa línea.",
          "3. Nodo Remoto (Owner / Sharer Node): El nodo que actualmente retiene una copia modificada o compartida de la línea.",
          "Cuando el nodo local sufre un fallo de caché, envía un mensaje unicast directo al Nodo de Origen. El Directorio verifica qué nodos tienen copias de la línea y envía mensajes de invalidación ÚNICAMENTE a los nodos involucrados, eliminando por completo el tráfico masivo de broadcast."
        ],
        comparativeTables: [
          {
            title: "Esquemas de Organización del Directorio",
            headers: ["Organización", "Estructura de la Entrada", "Sobrecarga de Memoria", "Escalabilidad", "Tráfico de Red"],
            rows: [
              ["Bitmap Completo (Full Bit Vector)", "1 bit por cada nodo del sistema en cada línea de memoria.", "Alta: O(N · M), donde N es nodos y M líneas de RAM.", "Limitada a sistemas medianos (ej. 64 nodos).", "Mínimo: invalida exactamente a los sharers reales."],
              ["Punteros Limitados (Limited Pointers)", "Número fijo k de punteros a nodos (ej. k = 4).", "Baja y fija: O(k · log₂ N · M).", "Alta si la compartición de datos es reducida.", "Si hay más de k sharers, recurre a broadcast o desalojo."],
              ["Directorio Encadenado (SCI - IEEE 1596)", "Lista doblemente enlazada distribuida entre las propias cachés.", "Casi nula en memoria RAM; se almacena en tags de caché.", "Excelente escalabilidad a miles de nodos.", "Mayor latencia: las invalidaciones deben recorrer la lista en serie."]
            ]
          }
        ]
      }
    ]
  },
  {
    id: "unit-5",
    number: 5,
    ecId: "EC5",
    title: "Sistemas Embebidos y Arquitecturas de Bajo Consumo",
    subtitle: "Taxonomía de Hardware, RISC-V vs ARM, RTOS, Eficiencia Energética y Casos de Estudio",
    icon: "Cpu",
    summary: "Diseño y selección de arquitecturas de hardware para sistemas embebidos y ciberfísicos. Microcontroladores, SoCs, FPGAs, conjuntos de instrucciones RISC-V y ARM, sistemas operativos de tiempo real (RTOS) y casos de estudio automotrices y médicos.",
    sections: [
      {
        id: "sec-5-1",
        subtopicNumber: "5.1",
        title: "Definición y Taxonomía del Hardware Embebido",
        summary: "Diferenciación entre computación de propósito general y sistemas de propósito dedicado sujetos a restricciones de tamaño, energía y costo.",
        content: [
          "Un Sistema Embebido (Embedded System) es un sistema computacional diseñado para realizar una función dedicada o específica dentro de un dispositivo o producto más grande, interactuando a menudo de forma continua con el entorno físico a través de sensores y actuadores.",
          "A diferencia de una computadora personal (PC) o un servidor generalista (optimizados para maximizar el throughput promedio y ejecutar software diverso), un sistema embebido está sujeto a restricciones de ingeniería sumamente estrictas:",
          "- Restricción de Consumo de Potencia: Muchos dispositivos operan con baterías de litio de baja capacidad o recolectan energía ambiental (Energy Harvesting), exigiendo consumos en reposo del orden de microamperios (μA).",
          "- Restricción de Costo Unitario: Al fabricarse en volúmenes masivos de millones de unidades (como en automoción o juguetes), unos pocos centavos de diferencia en el chip determinan la viabilidad comercial.",
          "- Restricción de Espacio y Factor de Forma: Dimensiones físicas diminutas y tolerancias térmicas extremas (de -40°C a +125°C en compartimientos de motor).",
          "- Determinismo Temporal: El tiempo de respuesta debe ser predecible y garantizado dentro de límites matemáticos estrictos."
        ],
        comparativeTables: [
          {
            title: "Taxonomía de Plataformas de Cómputo Embebido",
            headers: ["Plataforma", "Descripción y Arquitectura", "Flexibilidad", "Eficiencia Energética", "Costo por Unidad", "Aplicaciones Típicas"],
            rows: [
              ["Microcontrolador (MCU)", "CPU, RAM, Flash y periféricos I/O integrados en un único chip de silicio.", "Alta (programable en C/C++).", "Muy alta (miliwatts a microwatts).", "Muy bajo ($0.20 - $5.00).", "Electrodomésticos, sensores IoT, wearables."],
              ["DSP (Digital Signal Processor)", "Arquitectura Harvard paralela con unidades MAC (Multiply-Accumulate) dedicadas.", "Alta para algoritmos matemáticos.", "Alta en cálculo intensivo.", "Moderado ($5 - $30).", "Procesamiento de audio, radar, telecomunicaciones 5G."],
              ["SoC (System-on-Chip)", "Múltiples núcleos de CPU de alto rendimiento, GPU, NPU y controladores en un chip.", "Muy alta (ejecuta Linux / Android).", "Media-Alta (escalado dinámico).", "Medio-Alto ($15 - $80).", "Smartphones, infoentretenimiento vehicular, drones."],
              ["FPGA (Field-Programmable Gate Array)", "Matriz de bloques lógicos configurables por hardware en tiempo de diseño.", "Extrema (hardware reconfigurable).", "Media.", "Alto ($20 - $500+).", "Prototipado de chips, visión artificial en tiempo real."],
              ["ASIC (Application-Specific IC)", "Circuito integrado diseñado a medida a nivel de máscaras de silicio.", "Nula tras fabricación.", "Óptima (máxima eficiencia posible).", "Costo NRE millonario, unitario ínfimo.", "Billeteras criptográficas, chips de red de alta velocidad."]
            ]
          }
        ]
      },
      {
        id: "sec-5-2",
        subtopicNumber: "5.2",
        title: "Arquitecturas Dominantes: ARM vs RISC-V",
        summary: "El ecosistema cerrado y probado de ARM frente a la revolución de código abierto y modular de RISC-V.",
        content: [
          "Dos arquitecturas basadas en principios RISC (Reduced Instruction Set Computer) dominan el panorama actual de los sistemas embebidos:",
          "1. Familia ARM (Advanced RISC Machines): El líder indiscutible del mercado industrial. ARM Holdings licencia sus diseños a fabricantes de semiconductores. Su portafolio se divide en tres perfiles especializados:",
          "- Cortex-M (Microcontroller Profile): M0+, M3, M4, M7, M33. Diseñados para microcontroladores deterministas, bajo consumo, latencia de interrupción predecible y sin unidad de manejo de memoria (MMU).",
          "- Cortex-R (Real-Time Profile): R4, R5, R8, R52. Diseñados para sistemas de misión crítica con tolerancia a fallos, dual-core lockstep y tiempo real duro (sistemas de frenos automotrices, controladores de disco duro).",
          "- Cortex-A (Application Profile): A53, A78, X-series. Diseñados para ejecutar sistemas operativos complejos con memoria virtual (Linux, Android).",
          "2. Arquitectura RISC-V: Conjunto de instrucciones (ISA) abierto, libre de regalías y diseñado en la Universidad de California en Berkeley en 2010. A diferencia de arquitecturas propietarias, cualquier empresa o universidad puede implementar procesadores RISC-V sin pagar costosas licencias.",
          "Posee una arquitectura modular ejemplar: un núcleo base diminuto de instrucciones enteras (RV32I o RV64I) que puede expandirse con extensiones estándar:",
          "- 'M': Multiplicación y división entera por hardware.",
          "- 'A': Instrucciones atómicas para sincronización concurrente.",
          "- 'F' y 'D': Coma flotante de precisión simple y doble.",
          "- 'C': Instrucciones comprimidas de 16 bits para reducir drásticamente el uso de memoria Flash.",
          "- 'V': Instrucciones vectoriales masivas para IA y procesamiento de señales en el borde."
        ]
      },
      {
        id: "sec-5-3",
        subtopicNumber: "5.3",
        title: "Sistemas Operativos de Tiempo Real (RTOS) y Gestión Energética",
        summary: "Tiempo real duro vs blando, determinismo, algoritmos de planificación y técnicas de ahorro de energía (DVFS).",
        content: [
          "En computación de tiempo real, la corrección del sistema no solo depende del resultado lógico del cómputo, sino del instante de tiempo exacto en el que dicho resultado es entregado a los actuadores físicos.",
          "Diferenciación crucial:",
          "- Tiempo Real Duro (Hard Real-Time): El incumplimiento de un solo plazo temporal (deadline) conduce a un fallo catastrófico del sistema, con potencial daño a la vida humana o destrucción de equipos costosos. Ejemplos: despliegue de bolsas de aire (Airbag), control de inyección en motores de combustión, marcapasos cardíacos, sistemas de frenado ABS.",
          "- Tiempo Real Blando (Soft Real-Time): El incumplimiento ocasional de un plazo degrada la calidad del servicio pero no destruye el sistema ni genera catástrofes. Ejemplos: decodificación de vídeo en streaming, interfaces de usuario de consolas de juegos, registro de datos meteorológicos.",
          "Un RTOS (como FreeRTOS, Zephyr o VxWorks) garantiza un planificador determinista con desalojo preventivo basado en prioridades estrictas, donde la latencia de interrupción y el cambio de contexto están rígidamente acotados.",
          "Técnicas de Eficiencia Energética en Embebidos:",
          "- Modos de Suspensión Profunda (Sleep / Deep Sleep Modes): Se apagan secuencialmente la CPU, los relojes y los osciladores cuando no hay eventos pendientes, dejando activo únicamente un temporizador de baja frecuencia (RTC).",
          "- Escalado Dinámico de Voltaje y Frecuencia (DVFS): Se ajusta la frecuencia de reloj y el voltaje de alimentación en tiempo real según la carga de trabajo instantánea, ahorrando energía gracias a la relación cuadrática P ≈ C · V² · f."
        ]
      }
    ]
  },
  {
    id: "unit-6",
    number: 6,
    ecId: "EC6",
    title: "Computación en la Nube y Virtualización",
    subtitle: "Hipervisores, Contenedores vs VMs, Modelos IaaS/PaaS/SaaS y Arquitecturas Escalables",
    icon: "Cloud",
    summary: "Principios de virtualización de recursos de cómputo, almacenamiento y red. Análisis comparativo entre hipervisores bare-metal (Tipo 1), hipervisores hospedados (Tipo 2) y contenedores. Modelos de servicio en la nube y diseño de infraestructuras empresariales de alta disponibilidad.",
    sections: [
      {
        id: "sec-6-1",
        subtopicNumber: "6.1",
        title: "Fundamentos de la Virtualización de Hardware",
        summary: "Cómo la abstracción de CPU, memoria y periféricos transforma servidores físicos en recursos dinámicos multi-inquilino.",
        content: [
          "La virtualización es la tecnología que permite crear capas de abstracción lógica sobre el hardware físico de un servidor, posibilitando la ejecución simultánea de múltiples sistemas operativos invitados (Guest OS) independientes y aislados en una única máquina física (Host).",
          "Mecanismos clave de la virtualización moderna:",
          "1. Virtualización de CPU: Históricamente, las arquitecturas x86 tenían instrucciones sensibles que no generaban trampas al ejecutarse en modo usuario (violando el Teorema de Popek-Goldberg). En 2005-2006, Intel y AMD introdujeron extensiones de hardware (Intel VT-x y AMD-V) con un nuevo modo de operación (Root/Non-Root Mode), permitiendo al hipervisor interceptar llamadas privilegiadas sin emulación por software costosa.",
          "2. Virtualización de Memoria: El Guest OS administra una memoria física aparente. El procesador con soporte de hardware (Intel EPT - Extended Page Tables / AMD NPT) realiza una traducción en dos pasos: Dirección Virtual del Invitado -> Dirección Física del Invitado -> Dirección Física Real de la Máquina.",
          "3. Virtualización de E/S (SR-IOV): Permite que una tarjeta de red física se presente como múltiples funciones virtuales independientes directamente accesibles por las máquinas virtuales sin sobrecargar la CPU del hipervisor."
        ]
      },
      {
        id: "sec-6-2",
        subtopicNumber: "6.2",
        title: "Hipervisores: Tipo 1 (Bare-Metal) vs Tipo 2 (Hospedados)",
        summary: "Comparativa estructural entre arquitecturas que corren directamente sobre el silicio y las que operan sobre un SO intermediario.",
        content: [
          "Un hipervisor o Monitor de Máquinas Virtuales (VMM) es el componente de software encargado de crear, gestionar y orquestar las máquinas virtuales.",
          "Se dividen en dos categorías arquitectónicas:",
          "- Hipervisores Tipo 1 (Bare-Metal / Nativos): Se instalan directamente sobre el hardware físico del servidor sin la intermediación de un sistema operativo convencional. Tienen acceso directo al procesador y la memoria, ofreciendo el máximo rendimiento, mínima sobrecarga y excelente aislamiento de seguridad. Son el estándar absoluto en centros de datos corporativos y nubes públicas. Ejemplos: VMware ESXi, KVM (Kernel-based Virtual Machine en Linux), Microsoft Hyper-V, Xen.",
          "- Hipervisores Tipo 2 (Hosted / Alojados): Se ejecutan como una aplicación ordinaria sobre un sistema operativo anfitrión preexistente (como Windows, macOS o Ubuntu). El sistema operativo anfitrión gestiona los controladores físicos, lo que añade una capa adicional de sobrecarga (overhead) en llamadas al sistema y conmutación de contexto. Son ideales para desarrollo de software, pruebas de laboratorio y entornos de escritorio educativos. Ejemplos: Oracle VirtualBox, VMware Workstation."
        ],
        comparativeTables: [
          {
            title: "Comparativa: Hipervisores Tipo 1 vs Tipo 2 vs Contenedores",
            headers: ["Criterio", "Hipervisor Tipo 1 (Bare-Metal)", "Hipervisor Tipo 2 (Hosted)", "Contenedores (Docker / OCI)"],
            rows: [
              ["Capa Base", "Corre directo sobre el silicio (hardware físico).", "Corre sobre un SO anfitrión (Windows/Linux/macOS).", "Corre sobre el Kernel del SO anfitrión compartiéndolo."],
              ["Sobrecarga (Overhead)", "Mínima (< 2-3% de rendimiento).", "Moderada-Alta (doble capa de SO y controladores).", "Prácticamente nula (ejecución directa de procesos)."],
              ["Aislamiento", "Fuerte: aislamiento a nivel de hardware por VM.", "Fuerte: aislamiento por VM sobre proceso anfitrión.", "Ligero-Medio: aislamiento a nivel de namespaces y cgroups."],
              ["Tiempo de Arranque", "Minutos (inicia un kernel completo por VM).", "Minutos (arranque de SO completo).", "Milisegundos / Segundos (inicia solo el proceso)."],
              ["Consumo de Disco / RAM", "Gigabytes por VM (requiere SO completo).", "Gigabytes por VM.", "Megabytes por contenedor (solo código y librerías)."],
              ["Casos de Uso Primarios", "Nubes de producción (AWS, Azure), Centros de Datos.", "Entornos de prueba y desarrollo local.", "Microservicios elásticos, CI/CD, despliegues rápidos."]
            ]
          }
        ]
      },
      {
        id: "sec-6-3",
        subtopicNumber: "6.3",
        title: "Modelos de Servicio Cloud: IaaS, PaaS, SaaS y Serverless",
        summary: "Matriz de responsabilidad compartida entre el proveedor de servicios y el usuario en infraestructuras modernas.",
        content: [
          "La computación en la nube ofrece recursos computacionales bajo demanda con un modelo de facturación por uso. Según el NIST, se estructura en tres modelos clásicos de servicio, a los que hoy se suma la computación sin servidor (Serverless / FaaS):",
          "1. IaaS (Infraestructura como Servicio): El proveedor gestiona el hardware físico, la red y la virtualización. El cliente es responsable de instalar y mantener el sistema operativo, los parches de seguridad, el middleware y las aplicaciones. Ejemplos: Amazon EC2, Google Compute Engine, Azure VMs.",
          "2. PaaS (Plataforma como Servicio): El proveedor gestiona la infraestructura y el sistema operativo, entregando un entorno de ejecución listo para desplegar código de aplicaciones sin preocuparse por la configuración del servidor. Ejemplos: Google App Engine, Heroku, AWS Elastic Beanstalk.",
          "3. SaaS (Software como Servicio): El proveedor gestiona la totalidad de la pila tecnológica. El usuario final consume la aplicación directamente a través de un navegador web o API. Ejemplos: Microsoft 365, Google Workspace, Salesforce.",
          "4. FaaS / Serverless: El desarrollador escribe únicamente funciones aisladas activadas por eventos. La plataforma escala de 0 a miles de instancias automáticamente en milisegundos, cobrando únicamente por el tiempo exacto de CPU consumido en la ejecución de la función. Ejemplos: AWS Lambda, Cloudflare Workers."
        ],
        comparativeTables: [
          {
            title: "Matriz de Responsabilidad Compartida en la Nube",
            headers: ["Capa Tecnológica", "On-Premises Tradicional", "IaaS", "PaaS", "SaaS"],
            rows: [
              ["Aplicación y Lógica de Negocio", "Cliente", "Cliente", "Cliente", "Proveedor"],
              ["Datos del Usuario", "Cliente", "Cliente", "Cliente", "Cliente / Proveedor"],
              ["Runtime y Middleware", "Cliente", "Cliente", "Proveedor", "Proveedor"],
              ["Sistema Operativo y Parches", "Cliente", "Cliente", "Proveedor", "Proveedor"],
              ["Virtualización e Hipervisor", "Cliente", "Proveedor", "Proveedor", "Proveedor"],
              ["Servidores Físicos y Almacenamiento", "Cliente", "Proveedor", "Proveedor", "Proveedor"],
              ["Red y Centro de Datos Físico", "Cliente", "Proveedor", "Proveedor", "Proveedor"]
            ]
          }
        ]
      }
    ]
  }
];
