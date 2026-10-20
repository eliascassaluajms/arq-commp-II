# Arquitectura de Computadores II (DIC122) - Texto Digital y Plataforma FBC

Plataforma educativa interactiva tipo **SPA / PWA** (Single Page Application y Progressive Web App) diseñada para la asignatura **Arquitectura de Computadores II (DIC122)** de la carrera de **Ingeniería Informática** en la **Universidad Autónoma Juan Misael Saracho (UAJMS)**, a cargo del docente **Ing. Elias Cassal Valdiviezo**.

La plataforma está regida estrictamente por el **Proyecto Formativo Oficial** bajo el modelo de **Formación Basada en Competencias (FBC)**.

---

## 🌟 Características Principales

### 1. Plan Curricular FBC Oficial (Proyecto Formativo)
- **Estructura Curricular:** 120 horas con docente, 60 horas de trabajo autónomo, 4.50 créditos académicos.
- **Competencia Global y de Asignatura:** Integración de sistemas distribuidos, multiprocesamiento y computación en la nube.
- **6 Elementos de Competencia (EC1 a EC6):**
  - **EC1 (15%):** Procesamiento Paralelo y Clasificación de Arquitecturas (Taxonomía de Flynn, Speedup y Leyes de Amdahl / Gustafson).
  - **EC2 (18%):** Redes de Interconexión para Multicomputadores (Topologías, Conmutación Wormhole, Deadlocks y Canales Virtuales).
  - **EC3 (18%):** Multiprocesadores de Memoria Compartida y Protocolos Snoopy (SMP, Coherencia MESI/MOESI, Consistencia e Instrucciones Atómicas).
  - **EC4 (17%):** Multiprocesadores Escalables y Protocolos de Directorio (NUMA / ccNUMA, Directorio Distribuido, Sincronización Escalable).
  - **EC5 (16%):** Sistemas Embebidos y Arquitecturas de Bajo Consumo (Microcontroladores, ARM vs RISC-V, RTOS Duro/Blando, DVFS).
  - **EC6 (16%):** Computación en la Nube y Virtualización (Hipervisores Tipo 1 vs Tipo 2, Contenedores Docker, Modelos IaaS/PaaS/SaaS).
- **Matrices Formativas:** Saberes (Conocer, Hacer, Ser), Escala de Niveles de Logro (Inicial, Básico, Autónomo, Estratégico), Indicadores e Instrumentos de Evaluación.

### 2. Texto Digital Interactivo (Digital Master Textbook)
- Texto completo estructurado para las 6 unidades temáticas.
- Tablas comparativas exhaustivas (Topologías de red, Modos de conmutación, SMP vs Multicomputador, Modelos Cloud).
- Fórmulas matemáticas con desglose formal de variables (Amdahl, Gustafson, Speedup, Eficiencia).
- Cajas destacadas de *Analogía Didáctica de Cátedra* y conceptos clave.

### 3. Modo Exposición Magistral para el Profesor (Slide Decks)
- Sistema interactivo de presentaciones para la cátedra presencial o virtual.
- Diapositivas oficiales estructuradas para todas las unidades (incluyendo las diapositivas de bienvenida y motivación del docente).
- **Herramientas de Cátedra:**
  - Cronómetro integrado para control del tiempo de clase.
  - Guión pedagógico y *Notas del Docente* (`tecla N`).
  - Navegación por teclado (`Flechas`, `Espacio`, `F` para pantalla completa).
  - Selector directo de diapositivas y vista previa.

### 4. Laboratorios y Simuladores Interactivos
1. **Simulador de Speedup y Eficiencia:** Sliders en tiempo real para procesadores ($p$) y fracción paralelizable ($f$), comparando la Ley de Amdahl frente a la Ley de Gustafson y graficando la reducción de tiempo.
2. **Simulador de Coherencia de Caché Snoopy (MESI):** 3 núcleos con cachés privadas L1 sobre bus compartido. Permite emitir lecturas y escrituras paso a paso, visualizando transiciones entre estados Modified, Exclusive, Shared, Invalid y señales de bus (`BusRd`, `BusRdX`, `BusUpgr`, `Flush`).
3. **Explorador Visual de Topologías de Red:** Diagramas SVG animados interactivos para Bus, Anillo, Malla 2D, Toro, Hipercubo, Fat-Tree y Dragonfly, con métricas de Grado, Diámetro, Ancho de Bisección y Algoritmos de Encaminamiento (XY-Routing).
4. **Simulador de Conmutación Wormhole vs Store-and-Forward:** Animación de flits y paquetes a través de enrutadores con simulación de congestión y bloqueo en cadena.
5. **Script de Laboratorio Python:** Código oficial de `multiprocessing` para mediciones empíricas en laboratorio (`multiprocesador/practica.py`).

### 5. Actividades Autónomas y Casos de Estudio Reales
- **Caso de Estudio UAJMS:** Análisis técnico del Documento Base de Contratación (DBC) para adquisición de servidores corporativos.
- **Caso de Estudio SICOES Bolivia:** Auditoría y fiscalización técnica de licitaciones públicas estatales de infraestructura tecnológica.
- **Práctica de Supercomputador Casero:** Ensamble de un clúster distribuido de 8 nodos Pentium IV con Linux, NFS y MPI.
- **Guía de SimGrid en Windows:** Modelado científico de latencia y ancho de banda en multicomputadores.

### 6. Sistema de Evaluación Integral y Banco de Preguntas
- **Modo Formativo de Aprendizaje:** Preguntas de Selección Única, Selección Múltiple, Verdadero/Falso y Casos de Estudio, con retroalimentación inmediata que justifica pedagógicamente por qué la respuesta es correcta o errónea.
- **Simulador de Examen Escrito Cronometrado:** Evaluación oficial de 10 preguntas (100 puntos totales, 30 minutos límite) con calificación automática y animación de felicitación.
- **Simulador de Evaluación y Defensa Oral:** Generador aleatorio de preguntas orales con rúbrica analítica en vivo (Claridad, Dominio del tema, Terminología, Síntesis, Respuestas) calculando la nota sobre 100 puntos.

### 7. UX/UI y Experiencia PWA
- Estética *Dark High-Tech* (Cyber-Slate, cian eléctrico, acentos ámbar y esmeralda) con tipografía *Plus Jakarta Sans* y *Fira Code*.
- **Animaciones autónomas en iconos y microchips** que se mueven continuamente sin necesidad de mouseover (ideal para móviles, tablets y proyección en pantalla de aula).
- **PWA lista para instalar:** Service Worker con caché offline (`sw.js`), manifiesto (`manifest.json`) e iconos en alta resolución.

---

## 🚀 Despliegue con Docker

### Opción 1: Docker Compose (Recomendada)
Para levantar la plataforma en un contenedor ligero de producción (Nginx Alpine con compresión gzip y caché de estáticos):

\`\`\`bash
# Iniciar contenedor en segundo plano (puerto 8080)
docker compose up -d

# Ver el estado del servicio
docker compose ps

# Detener el contenedor
docker compose down
\`\`\`

La aplicación estará accesible de inmediato en: **http://localhost:8080**

### Opción 2: Dockerfile directo
\`\`\`bash
# Construir la imagen
docker build -t arq-comp-pwa .

# Ejecutar el contenedor
docker run -d -p 8080:80 --name arq_comp_app arq-comp-pwa
\`\`\`

---

## 💻 Ejecución Local para Desarrollo

Requiere **Node.js 18+** y **npm**:

\`\`\`bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo con recarga en vivo
npm run dev

# Compilar para producción (typecheck + bundle optimizado)
npm run build

# Previsualizar el bundle de producción localmente
npm run preview
\`\`\`

---

## 📦 Estructura del Proyecto

\`\`\`
├── Dockerfile                  # Multi-stage build (Node 22 -> Nginx Alpine)
├── docker-compose.yml          # Orquestación de contenedor
├── nginx.conf                  # Configuración Nginx para SPA (SPA fallback + gzip)
├── package.json                # Dependencias y scripts
├── tailwind.config.js          # Paleta cyber, animaciones autónomas y tokens
├── vite.config.ts              # Configuración Vite
├── public/
│   ├── manifest.json           # Manifiesto PWA
│   ├── sw.js                   # Service Worker para funcionamiento offline
│   ├── icon-192.svg            # Icono PWA 192px
│   ├── icon-512.svg            # Icono PWA 512px
│   └── favicon.svg             # Favicon
└── src/
    ├── App.tsx                 # Coordinador principal de vistas y layout
    ├── index.css               # Estilos globales, animaciones y glassmorphism
    ├── main.tsx                # Punto de entrada React
    ├── types/
    │   └── index.ts            # Interfaces TypeScript de FBC, libro, slides y tests
    ├── data/
    │   ├── curriculumData.ts   # Datos del Proyecto Formativo Oficial (EC1 a EC6)
    │   ├── textbookData.ts     # Contenido del Texto Digital (6 unidades completas)
    │   ├── presentationData.ts # Diapositivas oficiales para exposición del docente
    │   ├── activitiesData.ts   # Actividades autónomas y casos UAJMS/SICOES/Pentium IV
    │   └── evaluationData.ts   # Banco de preguntas y rúbrica oral
    └── components/
        ├── Header.tsx          # Barra superior con animaciones y botón PWA
        ├── CurriculumView.tsx  # Vista interactiva del Plan FBC y competencias
        ├── TextbookView.tsx    # Lector digital interactivo con fórmulas y tablas
        ├── PresentationView.tsx# Modo presentación magistral a pantalla completa
        ├── LaboratoriesView.tsx# Vista de simuladores y guías de laboratorio
        ├── ActivitiesView.tsx  # Vista de casos reales y actividades autónomas
        ├── EvaluationView.tsx  # Banco de preguntas formativas, examen y defensa oral
        └── Simulators/
            ├── SpeedupSimulator.tsx       # Amdahl vs Gustafson en tiempo real
            ├── CacheCoherenceSimulator.tsx # Protocolo MESI en bus compartido
            ├── TopologyVisualizer.tsx     # Explorador de topologías de red
            └── WormholeSimulator.tsx      # Simulador de conmutación de flits
\`\`\`

---

## 🏛️ Créditos Institucionales
- **Universidad:** Universidad Autónoma Juan Misael Saracho (UAJMS)
- **Facultad:** Facultad de Ciencias y Tecnología / Recursos Naturales y Tecnología
- **Carrera:** Ingeniería Informática
- **Asignatura:** Arquitectura de Computadores II (DIC122)
- **Docente:** Ing. Elias Cassal Valdiviezo (eliascassal@uajms.edu.bo)
