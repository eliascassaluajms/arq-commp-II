import { Question, OralEvaluationRubricItem } from '../types';

export const questionsBank: Question[] = [
  // --- EC1 / UNIDAD 1 (Procesamiento Paralelo) ---
  {
    id: "q-ec1-01",
    ecId: "EC1",
    unitNumber: 1,
    type: "single",
    difficulty: "básico",
    prompt: "Según la taxonomía de Flynn, un sistema que ejecuta múltiples flujos de instrucciones sobre múltiples flujos de datos se clasifica como:",
    options: [
      { id: "a", text: "SIMD (Single Instruction, Multiple Data)" },
      { id: "b", text: "SISD (Single Instruction, Single Data)" },
      { id: "c", text: "MIMD (Multiple Instruction, Multiple Data)" },
      { id: "d", text: "MISD (Multiple Instruction, Single Data)" }
    ],
    correctAnswers: ["c"],
    explanation: "En la taxonomía de Flynn, una arquitectura MIMD dispone de múltiples procesadores independientes, cada uno ejecutando su propio flujo de instrucciones sobre su propio flujo de datos. Corresponde a la mayoría de servidores modernos y supercomputadores.",
    points: 10
  },
  {
    id: "q-ec1-02",
    ecId: "EC1",
    unitNumber: 1,
    type: "single",
    difficulty: "intermedio",
    prompt: "Si un programa tiene una fracción f = 0.80 (80%) que puede paralelizarse perfectamente y un 20% estrictamente secuencial, ¿cuál es el Speedup máximo teórico alcanzable según la Ley de Amdahl si se dispone de infinitos procesadores?",
    options: [
      { id: "a", text: "4x" },
      { id: "b", text: "5x" },
      { id: "c", text: "10x" },
      { id: "d", text: "El Speedup tiende a infinito" }
    ],
    correctAnswers: ["b"],
    explanation: "Según la Ley de Amdahl, cuando p -> infinito, el Speedup límite es S = 1 / (1 - f). Como la fracción secuencial (1 - f) = 0.20, el límite es S = 1 / 0.20 = 5x. Ninguna cantidad de procesadores podrá superar esa aceleración.",
    points: 10
  },
  {
    id: "q-ec1-03",
    ecId: "EC1",
    unitNumber: 1,
    type: "multiple",
    difficulty: "intermedio",
    prompt: "¿Cuáles de los siguientes factores constituyen causas principales de la degradación de la eficiencia (Speedup sublineal) en un sistema paralelo real? (Seleccione todas las que correspondan)",
    options: [
      { id: "a", text: "Sobrecarga de comunicación y latencia en el intercambio de mensajes" },
      { id: "b", text: "Tiempo ocioso de los procesadores esperando en barreras de sincronización" },
      { id: "c", text: "Fracción de código estrictamente secuencial que no puede paralelizarse" },
      { id: "d", text: "Aumento de la velocidad de la memoria RAM al agregar más núcleos" }
    ],
    correctAnswers: ["a", "b", "c"],
    explanation: "El tiempo de comunicación por red, las esperas en sincronizaciones y la fracción secuencial irreductible (Amdahl) provocan que la eficiencia sea inferior al 100%. La opción D es falsa: la memoria RAM no se acelera al agregar núcleos, al contrario, sufre mayor contención.",
    points: 10
  },
  {
    id: "q-ec1-04",
    ecId: "EC1",
    unitNumber: 1,
    type: "true_false",
    difficulty: "básico",
    prompt: "La Ley de Gustafson asume que el tamaño del problema se mantiene fijo e invariable a medida que aumenta el número de procesadores disponibles.",
    options: [
      { id: "true", text: "Verdadero" },
      { id: "false", text: "Falso" }
    ],
    correctAnswers: ["false"],
    explanation: "Falso. La ley que asume tamaño de problema fijo es la Ley de Amdahl. La Ley de Gustafson-Barsis modela la carga escalada, donde el tamaño del problema crece para aprovechar al máximo la capacidad de cálculo del sistema ampliado.",
    points: 10
  },

  // --- EC2 / UNIDAD 2 (Multicomputadores y Redes) ---
  {
    id: "q-ec2-01",
    ecId: "EC2",
    unitNumber: 2,
    type: "single",
    difficulty: "básico",
    prompt: "¿Cuál es la principal característica arquitectónica que define a un multicomputador frente a un multiprocesador de memoria compartida?",
    options: [
      { id: "a", text: "Todos los procesadores acceden a un único espacio de direcciones común de memoria RAM." },
      { id: "b", text: "Cada procesador o nodo posee su propia memoria privada y se comunican explícitamente mediante el paso de mensajes por red." },
      { id: "c", text: "Las instrucciones se ejecutan exclusivamente en modo de paso de bloqueo SIMD." },
      { id: "d", text: "No requieren conmutadores ni adaptadores de red para transferir datos." }
    ],
    correctAnswers: ["b"],
    explanation: "En un multicomputador, cada nodo posee su propia memoria privada e independiente. La interacción no ocurre mediante escrituras en RAM común, sino a través del envío y recepción explícita de mensajes en una red de interconexión.",
    points: 10
  },
  {
    id: "q-ec2-02",
    ecId: "EC2",
    unitNumber: 2,
    type: "single",
    difficulty: "intermedio",
    prompt: "En conmutación Wormhole (conmutación por gusano), ¿cuál es la función primordial del 'flit de cabecera' (Header Flit)?",
    options: [
      { id: "a", text: "Almacenar la suma de comprobación CRC de todos los datos del paquete." },
      { id: "b", text: "Inspeccionar la dirección de destino y establecer la ruta en cada conmutador para que los flits de datos lo sigan en fila india." },
      { id: "c", text: "Almacenar temporalmente el paquete completo en la memoria del switch antes de liberarlo." },
      { id: "d", text: "Notificar al emisor que el mensaje ha llegado a su destino final." }
    ],
    correctAnswers: ["b"],
    explanation: "En Wormhole, únicamente el flit de cabecera contiene la información de enrutamiento. Abre el camino a través de los conmutadores y los restantes flits de datos siguen de inmediato el canal establecido sin necesidad de inspeccionar direcciones.",
    points: 10
  },
  {
    id: "q-ec2-03",
    ecId: "EC2",
    unitNumber: 2,
    type: "multiple",
    difficulty: "avanzado",
    prompt: "¿Cuáles de las siguientes afirmaciones respecto a los Canales Virtuales (Virtual Channels - VCs) en redes de interconexión son correctas? (Seleccione todas las que correspondan)",
    options: [
      { id: "a", text: "Multiplexan varias colas lógicas de búfer sobre un único enlace físico de comunicación." },
      { id: "b", text: "Permiten que un paquete no bloqueado rebase a un paquete bloqueado a través del mismo cable físico." },
      { id: "c", text: "Duplican la cantidad de cables físicos y puertos externos del conmutador." },
      { id: "d", text: "Permiten romper ciclos de espera circular en el grafo de dependencia de canales, evitando deadlocks." }
    ],
    correctAnswers: ["a", "b", "d"],
    explanation: "Los canales virtuales son estructuras internas de búfer que comparten el mismo enlace físico mediante multiplexación temporal. No duplican los cables físicos externos (la opción C es falsa). Rompen esperas circulares y evitan deadlocks.",
    points: 10
  },
  {
    id: "q-ec2-04",
    ecId: "EC2",
    unitNumber: 2,
    type: "case_study",
    difficulty: "avanzado",
    contextOrScenario: "Un centro de cómputo diseña una red de interconexión en Malla 2D de 8x8 nodos (64 nodos). Para evitar interbloqueos (deadlocks) deciden implementar un algoritmo de encaminamiento determinista.",
    prompt: "¿Qué técnica de encaminamiento garantiza matemáticamente la ausencia de deadlocks en esta topología sin requerir canales virtuales adicionales?",
    options: [
      { id: "a", text: "Encaminamiento aleatorio de Valiant" },
      { id: "b", text: "Encaminamiento Dimensión-Orden (XY-Routing)" },
      { id: "c", text: "Encaminamiento totalmente adaptativo de Duato" },
      { id: "d", text: "Inundación broadcast estocástica" }
    ],
    correctAnswers: ["b"],
    explanation: "El encaminamiento XY (Dimensión-Orden) obliga a que los paquetes se enruten primero a lo largo de la dimensión X y luego en la dimensión Y. Al prohibir los giros Y->X, el Grafo de Dependencia de Canales no posee ningún ciclo cerrado, garantizando formalmente la ausencia de deadlocks según el Teorema de Dally-Seitz.",
    points: 10
  },

  // --- EC3 / UNIDAD 3 (SMP y Coherencia Snoopy) ---
  {
    id: "q-ec3-01",
    ecId: "EC3",
    unitNumber: 3,
    type: "single",
    difficulty: "intermedio",
    prompt: "En el protocolo de coherencia Snoopy MESI, ¿qué ventaja ofrece el estado 'E' (Exclusive) frente al protocolo básico MSI?",
    options: [
      { id: "a", text: "Permite que múltiples procesadores escriban simultáneamente en la misma línea." },
      { id: "b", text: "Si un procesador lee un bloque que ningún otro núcleo posee, una posterior escritura en esa línea puede realizarse silenciosamente pasando a 'M' sin generar tráfico en el bus." },
      { id: "c", text: "Elimina la necesidad de memoria RAM principal en el sistema." },
      { id: "d", text: "Garantiza que el dato se escriba en disco duro inmediatamente." }
    ],
    correctAnswers: ["b"],
    explanation: "El estado Exclusive (E) indica que la línea está limpia respecto a RAM pero es exclusiva de ese núcleo. Si el núcleo decide escribir en ella, no necesita emitir una señal de invalidación en el bus porque sabe que nadie más tiene copia; simplemente conmuta a Modified (M) de forma local y silenciosa.",
    points: 10
  },
  {
    id: "q-ec3-02",
    ecId: "EC3",
    unitNumber: 3,
    type: "single",
    difficulty: "intermedio",
    prompt: "El fenómeno de 'Falsa Compartición' (False Sharing) en sistemas multiprocesador de memoria compartida ocurre cuando:",
    options: [
      { id: "a", text: "Dos núcleos intentan acceder a la misma variable atómica protegida por un semáforo." },
      { id: "b", text: "Dos o más procesadores modifican variables completamente independientes que están ubicadas dentro de la misma línea de caché (ej. 64 bytes)." },
      { id: "c", text: "La memoria RAM se llena y comienza a usar el archivo de paginación en disco." },
      { id: "d", text: "Un puntero nulo accede a una región de memoria no asignada." }
    ],
    correctAnswers: ["b"],
    explanation: "False Sharing ocurre cuando dos hilos en procesadores distintos modifican variables lógicamente independientes que físicamente comparten la misma línea de caché. El protocolo de coherencia invalida continuamente la línea completa entre ambos núcleos (ping-pong), degradando severamente el rendimiento.",
    points: 10
  },
  {
    id: "q-ec3-03",
    ecId: "EC3",
    unitNumber: 3,
    type: "true_false",
    difficulty: "básico",
    prompt: "En una estrategia de coherencia basada en 'Write-Invalidate', cada vez que un núcleo escribe en una línea de caché, el nuevo dato se difunde íntegramente por el bus a todos los demás núcleos para que actualicen sus valores.",
    options: [
      { id: "true", text: "Verdadero" },
      { id: "false", text: "Falso" }
    ],
    correctAnswers: ["false"],
    explanation: "Falso. La estrategia que difunde el nuevo dato a todos los núcleos es 'Write-Update'. 'Write-Invalidate' únicamente envía una pequeña señal de invalidación para que los demás núcleos marquen su copia como Inválida (I), ahorrando ancho de banda de bus.",
    points: 10
  },

  // --- EC4 / UNIDAD 4 (NUMA y Directorios) ---
  {
    id: "q-ec4-01",
    ecId: "EC4",
    unitNumber: 4,
    type: "single",
    difficulty: "intermedio",
    prompt: "¿Por qué los protocolos de coherencia de caché basados en espionaje (Snoopy) no son viables para sistemas con cientos de procesadores?",
    options: [
      { id: "a", text: "Porque las memorias DRAM no soportan más de 16 GB de capacidad." },
      { id: "b", text: "Porque requieren un medio de broadcast (difusión global) como un bus central, el cual se satura completamente por la contención y el tráfico de mensajes." },
      { id: "c", text: "Porque los procesadores RISC no admiten cachés de nivel 2 ni 3." },
      { id: "d", text: "Porque la velocidad de la luz en el silicio es demasiado alta." }
    ],
    correctAnswers: ["b"],
    explanation: "Los protocolos Snoopy dependen de que cada transacción sea vista por todos los nodos (broadcast). En un sistema con cientos de núcleos, el volumen de mensajes de espionaje satura cualquier medio compartido. Por eso se utilizan protocolos de Directorio con mensajes punto a punto unicast.",
    points: 10
  },
  {
    id: "q-ec4-02",
    ecId: "EC4",
    unitNumber: 4,
    type: "multiple",
    difficulty: "avanzado",
    prompt: "En un protocolo de coherencia de caché basado en directorio distribuido, ¿cuáles son los roles fundamentales de los nodos en una transacción? (Seleccione todas las que correspondan)",
    options: [
      { id: "a", text: "Nodo Local (Requesting Node): Quien experimenta el fallo de caché y origina la petición." },
      { id: "b", text: "Nodo de Origen (Home Node): Donde reside físicamente la memoria RAM solicitada y se custodia su entrada de directorio." },
      { id: "c", text: "Nodo Remoto (Owner / Sharer): Nodo que retiene una copia de la línea en su caché privada." },
      { id: "d", text: "Nodo Espectador: Nodo que no participa pero almacena una copia obligatoria en disco." }
    ],
    correctAnswers: ["a", "b", "c"],
    explanation: "Los tres roles canónicos en directorios distribuidos son: Requesting Node (Local), Home Node (donde reside físicamente la dirección y el directorio) y Remote Node (sharer u owner que posee una copia). No existe un nodo espectador que guarde copias en disco.",
    points: 10
  },

  // --- EC5 / UNIDAD 5 (Sistemas Embebidos) ---
  {
    id: "q-ec5-01",
    ecId: "EC5",
    unitNumber: 5,
    type: "single",
    difficulty: "básico",
    prompt: "¿Cuál es la diferencia fundamental entre un sistema de Tiempo Real Duro (Hard Real-Time) y uno de Tiempo Real Blando (Soft Real-Time)?",
    options: [
      { id: "a", text: "Los sistemas duros utilizan exclusivamente lenguaje ensamblador y los blandos usan Python." },
      { id: "b", text: "En un sistema duro, el incumplimiento de un solo plazo temporal (deadline) conduce a un fallo catastrófico del sistema; en uno blando, solo degrada la calidad del servicio." },
      { id: "c", text: "Los sistemas duros tienen una frecuencia de reloj superior a 5 GHz." },
      { id: "d", text: "No existe ninguna diferencia técnica, es solo un término comercial." }
    ],
    correctAnswers: ["b"],
    explanation: "En Hard Real-Time (ej. frenos ABS, airbag, marcapasos), fallar en el tiempo es tan grave como un error en los datos, causando catástrofes. En Soft Real-Time (ej. streaming de vídeo), perder un fotograma degrada la experiencia pero el sistema sigue funcionando de forma segura.",
    points: 10
  },
  {
    id: "q-ec5-02",
    ecId: "EC5",
    unitNumber: 5,
    type: "single",
    difficulty: "intermedio",
    prompt: "¿Por qué en microcontroladores embebidos de bajo consumo y costo se prefieren arquitecturas RISC (como ARM Cortex-M o RISC-V RV32) sobre arquitecturas complejas CISC x86?",
    options: [
      { id: "a", text: "Porque x86 no puede ejecutar números en punto flotante." },
      { id: "b", text: "Porque las arquitecturas RISC tienen decodificadores de instrucciones mucho más simples, requiriendo menos transistores, menor área de silicio y consumiendo sustancialmente menos energía." },
      { id: "c", text: "Porque RISC solo funciona en sistemas que no utilizan interrupciones." },
      { id: "d", text: "Porque las arquitecturas CISC son incompatibles con baterías de litio." }
    ],
    correctAnswers: ["b"],
    explanation: "Las instrucciones de tamaño fijo y el conjunto reducido de RISC permiten decodificadores de instrucciones sumamente pequeños y eficientes, reduciendo la cantidad de transistores en el chip. Menos transistores implican menor costo de fabricación y un consumo eléctrico medido en miliwatts o microwatts.",
    points: 10
  },
  {
    id: "q-ec5-03",
    ecId: "EC5",
    unitNumber: 5,
    type: "multiple",
    difficulty: "intermedio",
    prompt: "En un sistema embebido, ¿cuáles de las siguientes técnicas arquitectónicas se utilizan para maximizar la autonomía de la batería? (Seleccione todas las que correspondan)",
    options: [
      { id: "a", text: "Escalado Dinámico de Voltaje y Frecuencia (DVFS)" },
      { id: "b", text: "Modos de bajo consumo profundo (Deep Sleep) apagando osciladores y periféricos" },
      { id: "c", text: "Aumento permanente de la frecuencia de reloj a su valor máximo en todo momento" },
      { id: "d", text: "Interrupciones por eventos de hardware en lugar de sondeo continuo (busy polling)" }
    ],
    correctAnswers: ["a", "b", "d"],
    explanation: "DVFS reduce el voltaje cuadráticamente ahorrando gran energía (P ~ V²·f). Los modos Deep Sleep reducen la corriente a microamperios mientras se espera un evento. Las interrupciones evitan el sondeo activo de CPU. La opción C incrementaría el consumo al máximo innecesariamente.",
    points: 10
  },

  // --- EC6 / UNIDAD 6 (Cloud y Virtualización) ---
  {
    id: "q-ec6-01",
    ecId: "EC6",
    unitNumber: 6,
    type: "single",
    difficulty: "básico",
    prompt: "Un hipervisor Tipo 1 (Bare-Metal) se caracteriza principalmente por:",
    options: [
      { id: "a", text: "Instalarse como una aplicación de usuario sobre un sistema operativo comercial como Windows 11." },
      { id: "b", text: "Instalarse directamente sobre el hardware físico del servidor sin ningún sistema operativo intermediario, maximizando el rendimiento y reduciendo la sobrecarga." },
      { id: "c", text: "Requerir obligatoriamente una interfaz gráfica de usuario para poder arrancar." },
      { id: "d", text: "Ejecutarse exclusivamente dentro de un navegador web mediante WebAssembly." }
    ],
    correctAnswers: ["b"],
    explanation: "Los hipervisores Tipo 1 (como VMware ESXi, KVM o Xen) se ejecutan directamente sobre el hardware (bare-metal). Tienen acceso directo al procesador y la memoria, lo que ofrece la menor sobrecarga (overhead < 2-3%) y el más estricto aislamiento.",
    points: 10
  },
  {
    id: "q-ec6-02",
    ecId: "EC6",
    unitNumber: 6,
    type: "single",
    difficulty: "intermedio",
    prompt: "En el modelo de servicio en la nube 'IaaS' (Infraestructura como Servicio), ¿cuál de las siguientes capas es responsabilidad directa del cliente?",
    options: [
      { id: "a", text: "Mantenimiento físico de los servidores en el centro de datos." },
      { id: "b", text: "Suministro eléctrico y refrigeración de los racks." },
      { id: "c", text: "Instalación, configuración y aplicación de parches del Sistema Operativo en las máquinas virtuales." },
      { id: "d", text: "Reemplazo de discos duros y cables de fibra óptica dañados." }
    ],
    correctAnswers: ["c"],
    explanation: "En IaaS (como AWS EC2 o Azure VMs), el proveedor entrega el hardware y la virtualización, pero el cliente es el responsable exclusivo de gestionar el sistema operativo, los parches de seguridad, el software base y las aplicaciones.",
    points: 10
  },
  {
    id: "q-ec6-03",
    ecId: "EC6",
    unitNumber: 6,
    type: "multiple",
    difficulty: "intermedio",
    prompt: "¿Cuáles son las ventajas arquitectónicas principales de los Contenedores (como Docker) frente a las Máquinas Virtuales tradicionales? (Seleccione todas las que correspondan)",
    options: [
      { id: "a", text: "Tiempo de arranque del orden de milisegundos o segundos en lugar de minutos." },
      { id: "b", text: "Menor consumo de memoria RAM y disco al compartir el Kernel del sistema operativo anfitrión." },
      { id: "c", text: "Mayor densidad de instancias desplegables en un mismo servidor físico." },
      { id: "d", text: "Aislamiento completo por hardware de registros y tablas de páginas de CPU." }
    ],
    correctAnswers: ["a", "b", "c"],
    explanation: "Los contenedores comparten el mismo kernel mediante cgroups y namespaces, permitiendo arranques en milisegundos, menor peso en disco y mayor densidad de empaquetado. La opción D corresponde a las VMs con soporte VT-x/EPT, no a los contenedores.",
    points: 10
  }
];

export const oralEvaluationRubric: OralEvaluationRubricItem[] = [
  {
    criterion: "Claridad en la Exposición",
    maxPoints: 20,
    levels: {
      excelente: { points: 20, desc: "Explica con precisión conceptual, sin titubeos, y emplea analogías de ingeniería sumamente claras." },
      distinguido: { points: 15, desc: "Explica adecuadamente las ideas principales, con algunos errores menores o pausas que no afectan la comprensión global." },
      bueno: { points: 10, desc: "Exposición aceptable pero superficial o con vacíos en la concatenación de conceptos." },
      regular: { points: 5, desc: "Dificultad evidente para transmitir ideas técnicas de arquitectura de computadores." }
    }
  },
  {
    criterion: "Dominio del Tema y Rigor Técnico",
    maxPoints: 20,
    levels: {
      excelente: { points: 20, desc: "Demuestra dominio exhaustivo del elemento de competencia, fundamentando cada respuesta en la física y lógica del hardware." },
      distinguido: { points: 15, desc: "Domina el tema a nivel general pero titubea ante detalles específicos de implementación o casos límite." },
      bueno: { points: 10, desc: "Conocimiento básico limitado a la repetición memorística de definiciones." },
      regular: { points: 5, desc: "Demuestra desconocimiento de conceptos esenciales de la asignatura." }
    }
  },
  {
    criterion: "Uso de Terminología Técnica Adecuada",
    maxPoints: 20,
    levels: {
      excelente: { points: 20, desc: "Utiliza con soltura y exactitud términos como: coherencia, consistencia, throughput, flit, interbloqueo, NUMA, RTOS, etc." },
      distinguido: { points: 15, desc: "Usa terminología técnica la mayor parte del tiempo, recurriendo ocasionalmente a expresiones coloquiales." },
      bueno: { points: 10, desc: "Vocabulario técnico limitado o empleo impreciso de métricas computacionales." },
      regular: { points: 5, desc: "No utiliza lenguaje técnico de ingeniería informática." }
    }
  },
  {
    criterion: "Capacidad de Síntesis y Estructuración",
    maxPoints: 20,
    levels: {
      excelente: { points: 20, desc: "Estructura la respuesta de forma lógica: tesis, argumento arquitectónico, ejemplo real y conclusión en el tiempo estipulado." },
      distinguido: { points: 15, desc: "Estructura ordenada con ligera dispersión en puntos secundarios." },
      bueno: { points: 10, desc: "Respuesta desordenada que requiere intervención del docente para reorientar." },
      regular: { points: 5, desc: "Sin orden lógico ni capacidad de concretar una conclusión." }
    }
  },
  {
    criterion: "Respuesta a Preguntas del Tribunal / Docente",
    maxPoints: 20,
    levels: {
      excelente: { points: 20, desc: "Responde con solidez, seguridad y madurez crítica ante preguntas desafiantes o contraejemplos." },
      distinguido: { points: 15, desc: "Responde satisfactoriamente la mayoría de las preguntas con argumentación válida." },
      bueno: { points: 10, desc: "Respuestas vacilantes o incompletas ante contrapreguntas de profundización." },
      regular: { points: 5, desc: "Incapacidad para defender o justificar sus planteamientos." }
    }
  }
];

export const oralExamPromptGenerator = [
  {
    ecId: "EC1",
    unit: "Unidad I: Procesamiento Paralelo",
    prompt: "Explique al tribunal por qué la industria de los microprocesadores abandonó el incremento de la frecuencia de reloj hacia 2005. Detalle el 'Power Wall', la fórmula de disipación de potencia CMOS y cómo el paralelismo multinúcleo resolvió este problema.",
    followUp: "¿Cómo refuta la Ley de Gustafson el límite pesimista que impone la Ley de Amdahl sobre la aceleración máxima?"
  },
  {
    ecId: "EC2",
    unit: "Unidad II: Redes de Interconexión",
    prompt: "Describa detalladamente el mecanismo de conmutación Wormhole (conmutación por gusano). Explique qué es un 'flit', cómo se diferencia del Virtual Cut-Through y cuál es su principal vulnerabilidad ante el fenómeno de deadlock.",
    followUp: "¿Cómo permiten los Canales Virtuales (VCs) romper la espera circular en una red de interconexión sin agregar nuevos cables físicos?"
  },
  {
    ecId: "EC3",
    unit: "Unidad III: Memoria Compartida y Snoopy",
    prompt: "Un procesador de 4 núcleos cuenta con cachés L1 privadas y un bus compartido con protocolo MESI. Explique paso a paso la secuencia de estados cuando el Núcleo 0 lee la variable A, luego el Núcleo 1 lee la variable A y finalmente el Núcleo 1 escribe en la variable A.",
    followUp: "¿Qué es el fenómeno de Falsa Compartición (False Sharing) y qué impacto devastador tiene sobre el tráfico del bus de coherencia?"
  },
  {
    ecId: "EC4",
    unit: "Unidad IV: Multiprocesadores Escalables",
    prompt: "Explique la arquitectura de un sistema NUMA y por qué los protocolos de directorio distribuido son indispensables para escalar a más de 32 o 64 núcleos. Defina los roles del Local Node, Home Node y Remote Node.",
    followUp: "Compare la sobrecarga de memoria en silicio entre una organización de directorio de Bitmap Completo (Full Bit Vector) y una de Punteros Limitados."
  },
  {
    ecId: "EC5",
    unit: "Unidad V: Sistemas Embebidos",
    prompt: "Compare técnica y arquitectónicamente las familias ARM Cortex-M, Cortex-R y Cortex-A. ¿Cuál de ellas seleccionaría para la Unidad de Control Electrónico (ECU) de los frenos antibloqueo ABS de un vehículo y por qué?",
    followUp: "Explique la diferencia entre tiempo real duro (hard real-time) y tiempo real blando (soft real-time) y qué papel juega el RTOS en la garantía del determinismo temporal."
  },
  {
    ecId: "EC6",
    unit: "Unidad VI: Cloud Computing y Virtualización",
    prompt: "Analice las diferencias arquitectónicas y operativas entre los Hipervisores Tipo 1 (Bare-Metal) y los Hipervisores Tipo 2 (Hosted). ¿Por qué los grandes centros de datos como AWS o Azure operan casi exclusivamente sobre hipervisores Tipo 1?",
    followUp: "Compare la virtualización de hardware tradicional frente a la contenerización con Docker en términos de tiempo de arranque, consumo de recursos y aislamiento de seguridad."
  }
];
