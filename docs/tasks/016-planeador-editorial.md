# Crear el planeador editorial — pipeline de contenido

## Estado

[ ] Pendiente | [~] En progreso | **[r] En revisión** | [x] Completada | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

Crear el planeador editorial del blog: un pipeline de contenido en `docs/editorial/` —índice por estados y un archivo por pieza— más un skill gestor que idee posts, los dé de alta y los mueva por el pipeline, como adaptación de `lluvia-de-ideas` a la gestión de contenido.

## Dependencias

- Ninguna

## Entrada

- La investigación `docs/research/2026-10-procesos-gestion-editorial.md`: patrón kanban por estados; separación entre bandeja de captura y lista de «lista para escribir» —una idea solo está lista con pregunta del lector, ángulo y soporte—; separar la herramienta de ideación de la de producción.
- El patrón de `lluvia-de-ideas` en `.agents/skills/` — modelo de gestión de ideas por fases que este skill adapta.
- Los archivos de `docs/ideas/` — el registro mínimo ya coincide: Problema ≈ pregunta del lector, Qué desbloquea ≈ ángulo.
- Las ideas de contenido ya persistidas: `007-serie-mvc-en-vanilla-js` como primera pieza a migrar al pipeline.

## Resultado esperado

- `docs/editorial/` con un índice kanban por estados —`idea` → `lista` → `en redacción` → `en revisión` → `publicado`— y un archivo por pieza con pregunta del lector, ángulo, soporte, próximo paso y notas sueltas; más `series/<slug>.md` para los arcos multi-post y una sección `## series` en el índice (la serie es el análogo editorial de la épica: agrupa piezas y tiene cierre propio, sin ocupar el kanban).
- `.agents/skills/` con el skill gestor: idear (lluvia de ideas de posts), dar de alta una pieza, promover `idea`→`lista` solo cuando tiene los tres requisitos, arrancar el flujo de escritura al mover a `en redacción`, y las operaciones de serie (capturar, desplegar en piezas, cerrar).
- La serie MVC registrada como primer arco del planeador (`estado: propuesta`, pendiente de desplegar).

## Criterios de calidad

- El pipeline distingue captura de compromiso: `idea` no implica intención de escribir; `lista` sí — con sus tres requisitos verificables.
- El skill delega las lecturas/escrituras mecánicas del formato en las capacidades de artefactos existentes, o declara las operaciones nuevas que el catálogo necesita.
- El pipeline no duplica `docs/ideas/`: las ideas de contenido viven en `docs/editorial/`; las de producto/siguientes líneas siguen en `docs/ideas/` — la separación queda documentada.
- `check`, `lint`, `format:check` y `build` en verde.

## Procedimiento sugerido

1. Leer `lluvia-de-ideas` y `consultar-artefactos`/`actualizar-artefactos` para reutilizar el patrón de artefacto + gestor.
2. Diseñar el formato del índice y del archivo de pieza; crear `docs/editorial/` y migrar la serie MVC.
3. Redactar el skill gestor con sus operaciones y la regla de promoción a `lista`.

## Notas

- El pipeline es el nivel 1 del flujo — alimenta las tareas de tipo `contenido` que el nivel 2 (encuadre→redacción→revisión) procesa.
- Mantenimiento de publicados queda fuera — declarado como tensión conocida en la investigación y en `EDITORIAL.md`.

## Contexto

- `Archivos similares:` `.agents/skills/lluvia-de-ideas/` — modelo de captura por conversación; `docs/ideas/` — formato de idea previo (Problema ≈ pregunta del lector, Qué desbloquea ≈ ángulo); `.agents/skills/actualizar-artefactos/assets/` — los scripts por artefacto (tarea.sh, ideas.sh, todo.sh…), patrón para el nuevo `editorial.sh`.
- `Patrones:` artefacto del sistema = índice + archivos por elemento + skill gestor que delega operaciones mecánicas; el estado vive en el artefacto (campo `estado:` como el brief, D003) y el índice lo refleja por secciones kanban.
- `Dominio:` `docs/research/2026-10-procesos-gestion-editorial.md` — estados `idea` → `lista` → `en redacción` → `en revisión` → `publicado`; captura ≠ compromiso; `lista` exige pregunta del lector + ángulo + soporte; ideación separada de producción.
- `Producto:` `docs/editorial/` — ya parcialmente definido por D003 (`briefs/`); se añade el índice y las piezas. `docs/ideas/007-serie-mvc-en-vanilla-js.md` — la primera pieza a migrar.
- `Lecciones:` `docs/lessons/assets-de-skills.md` — plantilla de la pieza como asset, solo contrato universal; `docs/lessons/lineas-completas-en-artefactos.md` — ítems accionables a línea completa; `docs/lessons/preparacion-como-artefacto.md` — la pieza es artefacto distinto del brief.
- `Decisiones:` `docs/decisions/D003-brief-editorial-artefacto-propio.md` — `docs/editorial/briefs/` ya existe; el planeador adopta el layout. Esta tarea fija el formato del pipeline y puede derivar decisión propia.

## Conectividad

Conectada. El trabajo crea `docs/editorial/` —`README.md` como índice kanban por estados con sección `## series`, `piezas/<slug>.md` por pieza y `series/<slug>.md` por arco (junto al `briefs/` ya fijado por D003)—. También `.agents/skills/gestionar-piezas/` con `SKILL.md`, `assets/pieza.md` y `assets/serie.md`, y las operaciones `mover`, `retirar` y `añadir` de `editorial.sh` sobre el índice (no existían ops de líneas para este artefacto). El campo `estado:` de pieza y serie es escritura directa (como el brief, D003). La migración de la serie MVC usa `ideas.sh procesada` para marcar la idea origen. La separación `docs/ideas/` (producto) vs `docs/editorial/` (contenido) queda documentada en el propio índice. El movimiento a `en redacción` enlaza la pieza con una tarea `contenido`; los movimientos a `en revisión`/`publicado` los informa el ejecutor general al gestor; el despliegue de una serie crea una pieza por post con `- serie:` apuntando al arco, que `planear-post` lee como marco.

## Plan técnico

El subsistema: `docs/editorial/` como pipeline de nivel 1 —`README.md` como índice kanban por estados con `## series`, `piezas/<slug>.md` por pieza y `series/<slug>.md` por arco, junto al `briefs/` ya fijado por D003— más `.agents/skills/gestionar-piezas/` como gestor, y `editorial.sh` con `mover`, `retirar` y `añadir` como operaciones nuevas del catálogo para las líneas del índice.

- [x] `docs/editorial/README.md` — el índice kanban: cabecera que declara los cinco estados (`idea` → `lista` → `en redacción` → `en revisión` → `publicado`) y la separación de dominio (contenido aquí, producto en `docs/ideas/`), más una sección por estado con una línea por pieza (`- <slug> — <título tentativo>`)
  - Aporta: la bandeja de captura separada de la lista de listo-para-escribir, en un solo mapa
- [x] `assets/pieza.md` — la plantilla de la pieza: `# <título tentativo>` + `- estado:` por campos (como el brief, D003) + pregunta del lector / ángulo / soporte / próximo paso / notas sueltas, una línea por campo
  - Aporta: el registro mínimo de la investigación materializado como contrato universal, no como prosa
- [x] `.agents/skills/actualizar-artefactos/assets/editorial.sh` — operaciones `mover`, `retirar` y `añadir` sobre el índice: trasladar una línea entre secciones, retirarla y darla de alta; documentadas en el SKILL.md del skill de artefactos
  - Aporta: la mecánica de líneas que el kanban necesita (alta, traslado y retirada); el `estado:` de la pieza es escritura directa
- [x] `.agents/skills/gestionar-piezas/SKILL.md` — el gestor con siete operaciones: capturar (pieza suelta → archivo + línea en `## idea`), idear (lluvia en lote, patrón de `lluvia-de-ideas` sin tocarlo), promover `idea`→`lista` verificando los tres requisitos con confirmación humana, mover (a `en redacción` dando de alta la tarea `contenido` vía `crear-tareas` si no existe; a `en revisión`/`publicado` por informe del ejecutor) y las tres de serie (capturar/convertir, desplegar en piezas, cerrar)
  - Aporta: el gestor del planeador que los tres skills de escritura ya nombran como frontera
- [x] Migrar la serie MVC: `docs/ideas/007` → `docs/editorial/series/mvc-en-vanilla-js.md` en el formato de serie (pregunta del arco, ángulo, soporte del arco), `estado: propuesta`; la idea origen marcada con `ideas.sh procesada`
  - Aporta: el primer arco real del planeador y el ejemplo vivo del formato de serie
- [x] Ronda de escritura sobre los artefactos nuevos
  - Aporta: convenciones del proyecto
- [x] `assets/serie.md` + sección `## series` en el índice + campo `- serie:` opcional en `assets/pieza.md`
  - Aporta: el kanban solo rastrea unidades publicables; el arco agrupa con marco propio y cierre
- [x] Operaciones `retirar` y `añadir` en `editorial.sh` + gestor con capturar/convertir serie, desplegar y cerrar + `planear-post` sigue `- serie:` para leer el marco del arco
  - Aporta: el ciclo completo de la serie dentro del gestor y la coherencia de briefs entre posts del mismo arco

## Desviaciones del plan

- El plan original modelaba la serie MVC como una pieza única en `lista`. En la revisión de la puerta de ejecución se detectó la costura: el pipeline rastrea unidades publicables (posts) y una serie publica N piezas, así que una pieza-arco haría mentir al kanban. Con aprobación del usuario se adoptó el modelo de dos niveles (serie = épica editorial, pieza = unidad publicable): la pieza MVC migrada se reconvirtió en serie `propuesta` y se añadieron el formato de serie, la sección `## series`, el campo `- serie:` y las operaciones de ciclo de serie en el gestor y el catálogo.

## Suite de pruebas esperada

- `check`, `lint`, `format:check`, `build` en verde —(B)
- El índice tiene los cinco estados canónicos y documenta la separación `docs/ideas/` (producto) / `docs/editorial/` (contenido) —(O)
- La puerta `idea`→`lista` exige los tres requisitos verificables (pregunta del lector, ángulo, soporte) con confirmación humana —(O)
- `mover`, `retirar` y `añadir` de `editorial.sh` funcionan conductualmente sobre un índice en /tmp —(B)
- La serie MVC migrada tiene pregunta del arco + ángulo + soporte y la idea 007 queda marcada `procesada` —(B)
- El gestor delega la mecánica en las capacidades de artefactos y el alta de la tarea `contenido` en `crear-tareas`; no invoca los skills de escritura —(O)
- El texto no contiene rayas para incisos ni referencias al estado de construcción del sistema —(O)
- Revisión técnica por subagente aprueba

## Revisión

- Subagente: 2026-10-18 — Aprueba
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
