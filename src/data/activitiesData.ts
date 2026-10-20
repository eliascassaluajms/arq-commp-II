import { ActivityGuide } from '../types';

export const activityGuides: ActivityGuide[] = [
  {
    id: "act-proc-paralelo",
    ecId: "EC1",
    unitNumber: 1,
    title: "Guía de Práctica de Laboratorio: Análisis de Rendimiento Paralelo y Secuencial",
    type: "laboratorio",
    estimatedHours: "4 horas (2h laboratorio + 2h informe autónomo)",
    generalObjective: "Analizar, medir y comparar empíricamente el tiempo de ejecución entre un algoritmo intensivo secuencial y su versión paralelizada sobre múltiples núcleos de CPU, calculando y graficando Speedup, Eficiencia y Porcentaje de Mejora.",
    specificCompetence: "Evaluar el rendimiento y escalabilidad de sistemas computacionales multinúcleo aplicando conceptos de paralelismo y multithreading.",
    prerequisites: [
      "Instalación de Python 3.9+ con módulo nativo multiprocessing",
      "Comprensión de conceptos de núcleos lógicos vs núcleos físicos (os.cpu_count())",
      "Formulación de Speedup S = T_ps / T_pp y Eficiencia E = (S / p) * 100"
    ],
    phases: [
      {
        phaseNumber: 1,
        title: "Preparación del Script y Verificación de Hardware",
        duration: "30 minutos",
        instructions: [
          "Verificar la cantidad de núcleos lógicos y físicos disponibles en la máquina de prueba ejecutando 'python3 -c \"import os; print(os.cpu_count())\"'.",
          "Preparar el script de carga de trabajo de cálculo intensivo (20,000,000 de iteraciones aritméticas).",
          "Configurar los parámetros de prueba: Repeticiones = [10, 20, 40] y Núcleos de CPU = [1, 2, 4, 8, max_cpu]."
        ],
        expectedOutput: "Script de experimentación listo y entorno de ejecución validado."
      },
      {
        phaseNumber: 2,
        title: "Ejecución Experimental y Toma de Muestras",
        duration: "60 minutos",
        instructions: [
          "Ejecutar 3 corridas de la versión estrictamente secuencial para cada tamaño de repetición y registrar la media de tiempo T_ps.",
          "Ejecutar las pruebas paralelizadas con multiprocessing.Pool(processes=p) variando p y registrando T_pp.",
          "Completar la tabla experimental con los tiempos de respuesta obtenidos."
        ],
        expectedOutput: "Matriz de datos experimentales con tiempos secuenciales y paralelos promediados."
      },
      {
        phaseNumber: 3,
        title: "Cálculo de Métricas y Curvas de Rendimiento",
        duration: "30 minutos",
        instructions: [
          "Calcular el Speedup: S = T_ps / T_pp.",
          "Calcular la Eficiencia: E = (S / p) * 100.",
          "Calcular el Porcentaje de Mejora: M = ((T_ps - T_pp) / T_ps) * 100.",
          "Graficar la curva de Speedup real frente al Speedup lineal ideal."
        ],
        expectedOutput: "Gráficas de aceleración y eficiencia con identificación del punto de saturación."
      }
    ],
    rubricCriteria: [
      {
        criterion: "Rigor Metodológico y Toma de Datos",
        excellent: "Realiza corridas repetidas eliminando ruido de fondo del SO; documenta las especificaciones exactas del procesador.",
        good: "Toma datos para la mayoría de combinaciones pero con una sola muestra por punto.",
        regular: "Datos incompletos o sin justificación de la configuración de hardware utilizada.",
        points: 30
      },
      {
        criterion: "Cálculo Matemático de Métricas",
        excellent: "Aplica correctamente las fórmulas de Speedup, Eficiencia y Mejora porcentual con unidades y precisión decimal adecuada.",
        good: "Calcula el speedup correctamente pero omite la eficiencia o comete errores menores de redondeo.",
        regular: "Errores conceptuales graves en el cálculo de aceleración.",
        points: 35
      },
      {
        criterion: "Análisis Crítico y Conclusiones",
        excellent: "Explica con solvencia por qué la eficiencia decae al aumentar núcleos (sobrecarga de IPC, contención de memoria RAM y serialización de código).",
        good: "Describe las gráficas de manera descriptiva sin profundizar en las causas de bajo nivel.",
        regular: "Conclusiones genéricas sin vinculación a los datos empíricos.",
        points: 35
      }
    ],
    deliverableFormat: "Informe técnico en formato PDF con portada formal, especificaciones de hardware, tabla de datos experimentales, gráficas y código fuente anexado.",
    codeOrDataSnippet: `# Fragmento del script de prueba en Python (multiprocessing)
import time, multiprocessing, os

def calculo(n):
    res = 0
    for i in range(20000000):
        res += ((i % 5) * (i % 7))
    return res

if __name__ == '__main__':
    rep = 10
    cantidad_cpu = os.cpu_count()
    
    # Secuencial
    t0 = time.time()
    for i in range(rep): calculo(i)
    t_seq = time.time() - t0
    
    # Paralelo
    t0 = time.time()
    with multiprocessing.Pool(processes=cantidad_cpu) as pool:
        pool.map(calculo, range(rep))
    t_par = time.time() - t0
    
    speedup = t_seq / t_par
    eficiencia = (speedup / cantidad_cpu) * 100
    print(f"Speedup: {speedup:.2f}x | Eficiencia: {eficiencia:.1f}%")`
  },
  {
    id: "act-simgrid-windows",
    ecId: "EC2",
    unitNumber: 2,
    title: "Guía de Laboratorio: Simulación de Multicomputadores con SimGrid en Windows",
    type: "laboratorio",
    estimatedHours: "4 horas",
    generalObjective: "Instalar y utilizar la plataforma de simulación científica SimGrid (a través de WSL / contenedor) para modelar topologías de red en multicomputadores y analizar el impacto de la latencia y el ancho de banda en la computación distribuida.",
    specificCompetence: "Modelar y simular sistemas multicomputador evaluando el desempeño de la interconexión entre comunicación y cálculo.",
    prerequisites: [
      "Equipo con soporte de virtualización habilitado (Intel VT-x o AMD-V)",
      "WSL2 (Windows Subsystem for Linux) o Docker Desktop instalado",
      "Conocimientos básicos de terminal Linux y compilación en C++ / Python"
    ],
    phases: [
      {
        phaseNumber: 1,
        title: "Instalación del Entorno SimGrid",
        duration: "45 minutos",
        instructions: [
          "Actualizar los paquetes del sistema e instalar las dependencias de compilación (cmake, g++, libboost-all-dev).",
          "Clonar el repositorio de SimGrid o instalar mediante el gestor de paquetes de la distribución.",
          "Verificar la instalación ejecutando las simulaciones de prueba integradas (ej. 'simgrid-color')."
        ],
        expectedOutput: "Plataforma SimGrid operativa lista para compilar plataformas XML y algoritmos distribuidos."
      },
      {
        phaseNumber: 2,
        title: "Definición de Plataforma XML y Topología",
        duration: "60 minutos",
        instructions: [
          "Crear un archivo de descripción de plataforma XML que modele una red de multicomputador con topología en Toro 2D y en Malla 2D.",
          "Configurar las propiedades de los enlaces: ancho de banda (bandwidth = 10Gbps / 100Gbps) y latencia de propagación (latency = 1μs / 50μs).",
          "Definir nodos de cómputo con potencias asignadas en Gigaflops (GFlops)."
        ],
        expectedOutput: "Archivo platform.xml descriptivo de la infraestructura simulada."
      },
      {
        phaseNumber: 3,
        title: "Simulación de Intercambio de Mensajes y Análisis",
        duration: "45 minutos",
        instructions: [
          "Ejecutar un patrón de comunicación masivo tipo All-to-All o Ring Broadcast.",
          "Registrar el tiempo total simulado para diferentes tamaños de mensaje (1 KB, 1 MB, 100 MB).",
          "Determinar si el cuello de botella es la latencia de arranque o el ancho de banda de los enlaces."
        ],
        expectedOutput: "Informe de tiempos de transferencia simulados y curvas de contención de red."
      }
    ],
    rubricCriteria: [
      {
        criterion: "Configuración Correcta de la Plataforma",
        excellent: "La especificación XML describe fielmente las topologías y propiedades físicas de los enlaces y routers.",
        good: "La plataforma funciona pero utiliza valores por defecto sin justificar los parámetros de red.",
        regular: "Errores de sintaxis o topología no coincidente con la especificación solicitada.",
        points: 30
      },
      {
        criterion: "Análisis de Comunicación vs Cómputo",
        excellent: "Identifica con precisión el régimen dominado por latencia frente al dominado por ancho de banda mediante la ley de Hockney.",
        good: "Presenta las tablas de tiempos pero con análisis superficial de la relación cómputo/comunicación.",
        regular: "Sin análisis técnico de las diferencias de rendimiento.",
        points: 40
      },
      {
        criterion: "Resolución de Problemas y Documentación",
        excellent: "Documenta detalladamente los comandos de ejecución, solución de incidencias en Windows/WSL y capturas claras.",
        good: "Documentación básica sin detalle de configuración.",
        regular: "Informe incompleto o desordenado.",
        points: 30
      }
    ],
    deliverableFormat: "Informe técnico con archivos platform.xml adjuntos, capturas de pantalla de la terminal SimGrid y conclusiones de rendimiento.",
    codeOrDataSnippet: `<!-- Ejemplo de nodo y enlace en SimGrid XML -->
<platform version="4.1">
  <zone id="cluster_uajms" routing="Full">
    <host id="node-0" speed="50Gf"/>
    <host id="node-1" speed="50Gf"/>
    <link id="link-0-1" bandwidth="100GBps" latency="500ns"/>
    <route src="node-0" dst="node-1">
      <link_ctn id="link-0-1"/>
    </route>
  </zone>
</platform>`
  },
  {
    id: "act-supercomputador-casero",
    ecId: "EC2",
    unitNumber: 2,
    title: "Actividad Práctica: Creando un Supercomputador Casero con 8 Pentium IV",
    type: "grupal",
    estimatedHours: "3 horas presenciales en laboratorio",
    generalObjective: "Construir conceptual y experimentalmente un clúster de computación distribuida de bajo costo utilizando 8 computadoras recicladas Pentium IV, interconectadas mediante switch Fast Ethernet, configurando NFS y MPI para ejecutar tareas paralelas.",
    specificCompetence: "Diseñar, ensamblar y poner en marcha una arquitectura multicomputador distribuida funcional resolviendo problemas de interconexión y balanceo de carga.",
    prerequisites: [
      "8 equipos de computación con tarjetas de red Ethernet funcionales",
      "1 Switch de red de al menos 16 puertos (Fast Ethernet o Gigabit)",
      "Distribución Linux liviana (Alpine Linux o Debian Minimal) con servidor SSH y OpenMPI instalado"
    ],
    phases: [
      {
        phaseNumber: 1,
        title: "Preparación del Clúster Físico y Direccionamiento",
        duration: "30 minutos",
        instructions: [
          "Definir el Nodo Maestro (Head Node / Master: 192.168.1.100) y los Nodos de Cómputo (Slaves: node01 a node07).",
          "Conectar los 8 equipos al switch central y verificar la conectividad con 'ping' mutuo.",
          "Generar claves SSH RSA públicas sin contraseña para permitir la ejecución remota desatendida entre nodos."
        ],
        expectedOutput: "Todos los nodos respondiendo en red local con acceso SSH sin contraseña desde el nodo maestro."
      },
      {
        phaseNumber: 2,
        title: "Configuración del Sistema de Archivos Compartido (NFS)",
        duration: "45 minutos",
        instructions: [
          "Configurar un directorio compartido '/shared_hpc' en el nodo maestro mediante NFS Server.",
          "Montar '/shared_hpc' en los 7 nodos esclavos a través de NFS Client.",
          "Verificar que un ejecutable compilado en el maestro esté disponible instantáneamente en todos los esclavos."
        ],
        expectedOutput: "Espacio de almacenamiento compartido coherente en todo el clúster."
      },
      {
        phaseNumber: 3,
        title: "Ejecución de Código Paralelo MPI y Medición",
        duration: "45 minutos",
        instructions: [
          "Compilar un programa en C con OpenMPI que calcule el valor de Pi mediante integración numérica por el método de rectángulos.",
          "Ejecutar el programa con 'mpirun -np 1' (un solo nodo), 'mpirun -np 4' (cuatro nodos) y 'mpirun -np 8' (todos los nodos).",
          "Registrar el tiempo de cálculo y calcular el Speedup del clúster casero."
        ],
        expectedOutput: "Cálculo distribuido de Pi completado exitosamente a través de los 8 nodos."
      }
    ],
    rubricCriteria: [
      {
        criterion: "Interconexión y Configuración de Red",
        excellent: "Configura IPs estáticas, resolución /etc/hosts y llaves SSH sin fallos de autenticación.",
        good: "Requiere apoyo para resolver problemas menores de conectividad en algún nodo.",
        regular: "Más de 3 nodos no logran comunicarse en la red.",
        points: 30
      },
      {
        criterion: "Puesta en Marcha de NFS y MPI",
        excellent: "El directorio compartido y el entorno MPI funcionan de forma transparente en todos los nodos.",
        good: "NFS operativo pero persisten problemas de permisos en la ejecución MPI.",
        regular: "No se logra la ejecución distribuida desatendida.",
        points: 40
      },
      {
        criterion: "Trabajo en Equipo y Defensa Oral",
        excellent: "Cada integrante del grupo explica fluidamente el rol del maestro, de los esclavos y el flujo de los mensajes MPI.",
        good: "Solo un estudiante domina la explicación técnica del clúster.",
        regular: "Defensa deficiente sin dominio de la arquitectura multicomputador.",
        points: 30
      }
    ],
    deliverableFormat: "Informe grupal con memoria técnica, diagrama de cableado de red, fotografías del clúster físico montado y tabla de tiempos de ejecución.",
    codeOrDataSnippet: `# Ejecución MPI distribuida en los 8 Pentium IV
# Archivo 'hosts':
# 192.168.1.100 slots=1
# 192.168.1.101 slots=1
# ...
mpirun --hostfile hosts -np 8 /shared_hpc/calculo_pi`
  },
  {
    id: "act-caso-uajms",
    ecId: "EC2",
    unitNumber: 2,
    title: "Caso de Estudio Real: Análisis Técnico de Servidores UAJMS",
    type: "caso_estudio",
    estimatedHours: "4 horas de trabajo autónomo",
    generalObjective: "Analizar críticamente las especificaciones técnicas del Documento Base de Contratación (DBC) emitido por la Universidad Autónoma Juan Misael Saracho para la adquisición de servidores corporativos de centro de datos, evaluando procesadores, arquitectura de memoria y redes de interconexión.",
    specificCompetence: "Aplicar criterios arquitectónicos avanzados de hardware en la selección y evaluación de infraestructura tecnológica para instituciones públicas y corporativas.",
    prerequisites: [
      "Lectura del documento DBC oficial de la UAJMS adjunto",
      "Comprensión de especificaciones de procesadores multinúcleo para servidores (Intel Xeon / AMD EPYC)",
      "Conocimiento de estándares de memoria ECC Registered DDR4/DDR5 y canales de interconexión PCIe / InfiniBand"
    ],
    phases: [
      {
        phaseNumber: 1,
        title: "Inspección de Requisitos Mínimos del DBC",
        duration: "45 minutos",
        instructions: [
          "Localizar en el DBC las cláusulas relativas a: sockets de procesador, cantidad de núcleos físicos, frecuencias base/turbo, memoria caché L3 compartida y canales de memoria.",
          "Verificar los requisitos de almacenamiento (RAID por hardware, SAS vs NVMe PCIe) y tarjetas de red de alta velocidad."
        ],
        expectedOutput: "Cuadro resumen de requisitos mínimos exigidos por la UAJMS."
      },
      {
        phaseNumber: 2,
        title: "Contraste con la Oferta Tecnológica del Mercado",
        duration: "60 minutos",
        instructions: [
          "Identificar al menos dos modelos de servidores comerciales que cumplan o superen la especificación (ej. Dell PowerEdge R750 / HPE ProLiant DL380).",
          "Analizar si los requisitos están orientados a un proveedor específico o si garantizan libre concurrencia competitiva.",
          "Evaluar la escalabilidad NUMA y el consumo energético (certificación 80 PLUS Platinum/Titanium)."
        ],
        expectedOutput: "Tabla comparativa técnica de dos propuestas de servidores comerciales viables."
      },
      {
        phaseNumber: 3,
        title: "Emisión del Dictamen Técnico",
        duration: "45 minutos",
        instructions: [
          "Emitir recomendaciones de mejora para el DBC: ¿debería exigirse mayor ancho de banda de red? ¿es conveniente especificar memoria DDR5 sobre DDR4?",
          "Redactar una conclusión formal como consultor de ingeniería informática justificando la mejor relación precio / prestaciones."
        ],
        expectedOutput: "Dictamen técnico pericial estructurado con fundamentos arquitectónicos."
      }
    ],
    rubricCriteria: [
      {
        criterion: "Profundidad en el Análisis de Hardware",
        excellent: "Desglosa minuciosamente núcleos, hilos, ancho de banda de memoria por socket y líneas PCIe con terminología rigurosa.",
        good: "Describe los procesadores y la memoria pero omite detalles de la interconexión o caché.",
        regular: "Análisis superficial que solo copia y pega las especificaciones del DBC sin análisis crítico.",
        points: 40
      },
      {
        criterion: "Argumentación Técnica de la Elección",
        excellent: "Justifica sólidamente la elección del servidor basándose en la carga de trabajo prevista (virtualización de servicios universitarios, base de datos).",
        good: "Propone servidores válidos pero con justificación genérica.",
        regular: "Servidores propuestos no cumplen los requerimientos mínimos del DBC.",
        points: 35
      },
      {
        criterion: "Calidad de Redacción y Presentación",
        excellent: "Estructura profesional de dictamen pericial con tablas comparativas impecables y referencias verificables.",
        good: "Formato aceptable con algunos errores de estructura.",
        regular: "Presentación descuidada.",
        points: 25
      }
    ],
    deliverableFormat: "Dictamen Técnico Pericial en formato PDF (máximo 5 páginas) con tablas comparativas y recomendaciones normativas."
  },
  {
    id: "act-sicoes-bolivia",
    ecId: "EC6",
    unitNumber: 6,
    title: "Análisis de Adquisición de Servidores en el SICOES Bolivia",
    type: "caso_estudio",
    estimatedHours: "4 horas de trabajo autónomo",
    generalObjective: "Investigar contrataciones públicas reales en el Sistema de Contrataciones Estatales de Bolivia (SICOES), analizando Especificaciones Técnicas (ET) y Términos de Referencia (TDR) de licitaciones públicas de servidores para entidades estatales.",
    specificCompetence: "Analizar y fiscalizar procesos de adquisición tecnológica del Estado Plurinacional aplicando normas de calidad, arquitectura computacional y ética profesional.",
    prerequisites: [
      "Acceso al portal público del SICOES (www.sicoes.gob.bo)",
      "Conocimiento de modalidades de contratación: Licitación Pública (LP) y Apoyo Nacional a la Producción y Empleo (ANPE)",
      "Conceptos de virtualización, almacenamiento en la nube y cómputo corporativo"
    ],
    phases: [
      {
        phaseNumber: 1,
        title: "Búsqueda y Descarga de Convocatoria en SICOES",
        duration: "45 minutos",
        instructions: [
          "Ingresar al SICOES y buscar procesos de contratación vigentes o concluidos con el objeto 'Adquisición de Servidores' o 'Equipamiento de Centro de Datos'.",
          "Descargar el DBC, el Formulario 100 y las Especificaciones Técnicas de una entidad pública boliviana (ej. ministerios, alcaldías, universidades, impuestos nacionales)."
        ],
        expectedOutput: "Documentación oficial de licitación descargada con su respectivo código CUCE."
      },
      {
        phaseNumber: 2,
        title: "Auditoría Arquitectónica de las Especificaciones",
        duration: "60 minutos",
        instructions: [
          "Verificar si las especificaciones técnicas violan el principio de neutralidad tecnológica (ej. pedir marcas registradas como 'Intel Xeon' sin incluir la cláusula 'o equivalente').",
          "Evaluar la adecuación técnica de la infraestructura para virtualización con VMware / Proxmox / KVM.",
          "Analizar la relación entre el precio referencial en bolivianos (Bs.) y el costo real de mercado del hardware."
        ],
        expectedOutput: "Matriz de auditoría técnica con detección de posibles sesgos o desactualizaciones tecnológicas."
      },
      {
        phaseNumber: 3,
        title: "Propuesta de Pliego Técnico Óptimo",
        duration: "45 minutos",
        instructions: [
          "Redactar un pliego técnico corregido y moderno que garantice concurrencia, alta disponibilidad y soporte posventa con repuestos en territorio boliviano.",
          "Añadir cláusulas de eficiencia energética acordes a las políticas públicas del país."
        ],
        expectedOutput: "Propuesta de pliego técnico optimizado para contratación estatal."
      }
    ],
    rubricCriteria: [
      {
        criterion: "Identificación de Normativa y CUCE",
        excellent: "Proporciona el código CUCE verificable, objeto del proceso, precio referencial exacto y cronograma oficial.",
        good: "Presenta el caso pero con datos incompletos del proceso licitatorio.",
        regular: "No incluye código CUCE verificable.",
        points: 25
      },
      {
        criterion: "Auditoría Técnica Pericial",
        excellent: "Detecta con solvencia inconsistencias técnicas, requerimientos obsoletos o direccionamientos de marca según la NB-SABS.",
        good: "Analiza el hardware pero no vincula las implicaciones legales o económicas de la contratación.",
        regular: "Análisis débil que no cuestiona las especificaciones técnicas.",
        points: 45
      },
      {
        criterion: "Propuesta Técnica de Solución",
        excellent: "Formula especificaciones modernas, neutrales y optimizadas con sólida justificación arquitectónica.",
        good: "Propone cambios menores sin suficiente fundamentación.",
        regular: "No presenta propuesta de mejora.",
        points: 30
      }
    ],
    deliverableFormat: "Informe de Auditoría Tecnológica en PDF dirigido a una Comisión de Calificación de Licitación Pública."
  }
];
