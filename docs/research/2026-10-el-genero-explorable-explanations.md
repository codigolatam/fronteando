# El género: explorable explanations e interactive articles

> **Fecha:** 2026-10

## Propósito

Documentar el género al que pertenecen las piezas interactivas de la épica 004 —su origen, su canon, la taxonomía de técnicas y las herramientas— para que Fronteando hable su idioma: qué tipos de pieza existen, qué afordancia aporta cada una y qué vocabulario usar en `EDITORIAL.md`.

## Contexto

Las investigaciones de vehículos, mecánica, degradación y sintaxis resuelven el *cómo* [R0–R3]. Falta el *qué*: el género tiene una tradición, una teoría de diseño y un vocabulario que conviene adoptar en vez de reinventar. Fronteando además escribe en español —un idioma donde el género está casi ausente—.

## Hallazgos

### Origen y nombre

Bret Victor acuñó el marco en «Explorable Explanations» (2011): un proyecto paraguas para la **lectura activa** —«la gente piensa el texto como información a consumir; yo quiero que el texto sea un entorno para pensar»— [1]. Define tres mecanismos:

- **Reactive document:** el lector juega con las suposiciones del autor y ve las consecuencias —«una hoja de cálculo sin la hoja de cálculo»—.
- **Explorable example:** lo abstracto hecho concreto; el lector desarrolla intuición manipulando parámetros.
- **Contextual information:** material relacionado justo a tiempo.

Un principio del ensayo es directamente el del store de Fronteando: la figura del filtro digital usa **múltiples representaciones** del mismo sistema —seis vistas que «danzan juntas» mientras el lector juega—; cada representación da una intuición distinta [1]. La vista del DOM + la vista del estado interno del store es exactamente ese patrón.

Nicky Case consolidó el género con el catálogo explorabl.es y sus jams [2]. El paper de Distill «Communicating with Interactive Articles» (Hohman, Conlen, Heer, Chau — 2020) es la referencia teórica: sintetiza 60+ piezas y registra que el medio aún no tiene nombre estándar —conviven *explorable explanations, explainables, exploranations, active essays, interactive non-fiction*— [3].

### La taxonomía de Distill: cinco afordancias

El paper organiza las técnicas en cinco afordancias [3]:

| Afordancia | Qué aporta | Pieza típica |
|---|---|---|
| **Conectar personas y datos** | engagement; animación para transiciones de estado y causalidad; unit visualizations que humanizan | gráficos animados, datos por individuo |
| **Hacer los sistemas jugables** | el lector experimenta con un modelo/sandbox | simulaciones con parámetros |
| **Provocar autorreflexión** | *belief elicitation* —«¿qué crees que pasará?» antes de mostrar—, testing effect | demos que piden una predicción |
| **Personalizar la lectura** | el lector controla ritmo (play/pausa/paso) y profundidad | steppers, contenido adaptativo |
| **Reducir carga cognitiva** | *details-on-demand* (mantra de Shneiderman), anotaciones en contexto | piezas que revelan complejidad por capas |

### Vocabulario de piezas observado en el canon

Del corpus (explorabl.es, los referentes inspeccionados) emergen tipos concretos:

- **Simulación jugable:** parámetros + modelo corriendo (ncase, samwho).
- **Vista instrumentada / múltiples representaciones:** el sistema expone su interior mientras opera (filtro de Victor, objetivo de la demo del store).
- **Stepper guiado:** avance paso a paso controlado por el lector (turing-machines de samwho tiene play/pausa/retroceso).
- **Reactive document:** valores dentro del propio texto que el lector arrastra y el argumento se recalcula (Ten Brighter Ideas de Victor).
- **Editor mínimo:** el lector escribe código y ve el efecto (playground de MDN, sandpack de Comeau) —fuera del alcance de la épica 004—.

### Herramientas del género

- **Idyll** (Conlen, UIST 2018): DSL tipo markdown con variables reactivas y componentes —la herramienta académica de referencia; exige su propio pipeline— [4].
- **Tangle** (Victor): microbiblioteca de documentos reactivos.
- **Observable notebooks**, p5.js, herramientas internas de redacciones —ninguna dominante— [3][5].
- La realidad mayoritaria: **cada autor construye lo suyo** —los referentes inspeccionados (samwho, ncase, ciechanow.ski, redblob) usan arreglos caseros—.

### El coste y el hueco

El paper de Distill lo dice explícitamente: crear una pieza interactiva «se parece más a construir un sitio web que a escribir un post» —exige editorial + diseño + programación, con herramientas inmaduras— [3]. Es la justificación exacta del mecanismo convencionado de Fronteando: convertir el coste fijo en infraestructura una vez.

Y el género está casi ausente en español: el catálogo explorabl.es es abrumadoramente anglófono; las búsquedas en español solo devuelven material *sobre* español escrito en inglés. Un blog técnico en español con piezas interactivas propias ocupa un hueco real.

## Conclusión

Fronteando se inscribe en el género **explorable explanations / interactive articles**. La contribución concreta de esta investigación al proyecto:

- **Vocabulario editorial para `EDITORIAL.md`:** la pieza se clasifica por su tipo —simulación, vista instrumentada, stepper, documento reactivo— y por la afordancia que sirve (jugabilidad, autorreflexión, ritmo del lector, carga cognitiva). Toda pieza nueva se anuncia con su tipo.
- **Principio rector para las demos:** una pieza instrumentada no enseña *el resultado* —enseña *el mecanismo*; las múltiples representaciones que danzan juntas (DOM + estado interno) son la forma canónica.
- **Validación de la arquitectura:** el género paga su valor exactamente donde duele —autoría costosa—; el mecanismo convencionado es la respuesta correcta según la propia literatura del género.

## Limitaciones

- La taxonomía de Distill sintetiza un corpus sesgado hacia visualización de datos y periodismo anglófono; la aplicación a tutoriales de programación (Frontend) es extrapolación.
- El «hueco en español» se afirma por ausencia de evidencia —búsquedas y catálogo—, no por un censo.
- El vocabulario de tipos de pieza es síntesis del canon observado, no una taxonomía formal acordada por el género.

## Referencias

- [1] Bret Victor — «Explorable Explanations» (2011) — https://worrydream.com/ExplorableExplanations/
- [2] explorabl.es — catálogo y comunidad del género — https://explorabl.es/
- [3] Hohman, Conlen, Heer, Chau — «Communicating with Interactive Articles», Distill 2020 — https://distill.pub/2020/communicating-with-interactive-articles/
- [4] Conlen et al. — «Idyll: A Markup Language for Authoring and Publishing Interactive Articles on the Web» (UIST 2018) — https://idl.cs.washington.edu/files/2018-Idyll-UIST.pdf ; https://idyll-lang.org/
- [5] Observable — colección «Explorables» — https://observablehq.com/collection/@observablehq/explorables
- [6] Canon inspeccionado: ncase.me, samwho.dev, ciechanow.ski, redblobgames.com, joshwcomeau.com — ver [R0]
- [R0] `docs/research/2026-10-vehiculos-para-piezas-interactivas.md`
- [R1] `docs/research/2026-10-mecanica-de-elementos-personalizados.md`
- [R2] `docs/research/2026-10-degradacion-y-representacion-de-piezas.md`
- [R3] `docs/research/2026-10-sintaxis-de-declaracion-de-piezas.md`
