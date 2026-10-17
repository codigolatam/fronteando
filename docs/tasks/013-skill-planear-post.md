# Crear el skill planear-post — encuadre editorial

## Estado

[ ] Pendiente | [~] En progreso | [r] En revisión | **[x] Completada** | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

Crear el skill `planear-post` —la mitad de planeación del flujo de escritura— que lleva un post desde el planeador editorial hasta un encuadre aprobado en su archivo de tarea: audiencia, promesa, arco seccional y checklist de publicación, con puerta humana antes de redactar.

## Dependencias

- docs/tasks/012-guia-de-tono-editorial.md

## Entrada

- `EDITORIAL.md` (tarea 012) — la guía que el encuadre consulta y contra la que se verifica.
- La investigación `docs/research/2026-10-procesos-gestion-editorial.md`: el brief se aprueba antes de redactar porque es el punto más barato para cambiar el tema.
- El patrón de `planear-tarea` en `.agents/skills/` — modelo de skill de la mitad de planeación.
- La experiencia de la tarea 011: el encuadre de un post es distinto del plan técnico — tiene promesa y arco, no suite de pruebas.

## Resultado esperado

- `.agents/skills/planear-post/SKILL.md` con su `assets/brief.md`: toma una pieza del planeador en estado `lista` o una tarea de tipo `contenido`, produce el brief de preparación en `docs/editorial/briefs/<slug>.md` —encuadre (audiencia, promesa, arco, ejemplo conductor, alcance, metadatos decididos), temas de investigación resueltos en `## Material`, borrador del outline y checklist de publicación—, lo somete a aprobación del usuario y registra en el archivo de la tarea la sección `## Encuadre` delgada (ruta del brief, aprobación y promesa).
- La señal de «planeación completa» del tipo `contenido` queda definida aquí: la sección `## Encuadre` de la tarea como puntero al brief aprobado — lo que el enrutado de la tarea 017 consultará.

## Criterios de calidad

- El skill delega las lecturas mecánicas del formato (estado de la tarea, secciones presentes) en las capacidades de artefactos existentes.
- La puerta humana es explícita: no se redacta sin encuadre aprobado — la regla universal del brief.
- El checklist codifica las lecciones editoriales: código ejecutable, `<!--more-->` tras el gancho, previo como unidad, fecha con hora real, ronda completa sobre versión final.
- `check`, `lint`, `format:check` y `build` en verde.

## Procedimiento sugerido

1. Leer `planear-tarea` y el formato de los skills existentes; leer `EDITORIAL.md`.
2. Redactar el skill con su cuándo usar/cuándo no, entradas, salidas y puerta.
3. Verificar que las secciones que produce encajan con lo que el tipo `contenido` necesitará en el enrutado (tarea 017).

## Notas

- La pieza «lista para escribir» del planeador ya trae pregunta del lector, ángulo y soporte — el encuadre los convierte en promesa y arco, no los re-inventa.
- El brief es artefacto propio, no sección de la tarea (decisión del usuario durante la planeación): la preparación editorial —investigación, material recopilado, outline— necesita superficie de trabajo y el archivo de tarea queda administrativo. La escritura no recopila contexto: lo toma del brief.
- El skill no toca `ejecutar-tareas`; eso es la tarea 017.

## Contexto

- `Archivos similares:` `.agents/skills/planear-tarea/SKILL.md` — el modelo directo de mitad de planeación; `.agents/skills/planear-implementacion/SKILL.md` — el modelo de la puerta humana (presentar, iterar, materializar solo tras aprobación); `.agents/skills/desarrollar-tarea/SKILL.md` — el espejo de ejecución.
- `Patrones:` skill de mitad de flujo con cuándo usar/no usar, entrada, salida, principios rectores, procedimiento, finalización y referencias; las lecturas del formato se delegan en `consultar-artefactos` y las escrituras en `actualizar-artefactos` (`insertar-seccion` toma el título libre: no hacen falta operaciones nuevas).
- `Dominio:` `EDITORIAL.md` — la guía que el encuadre consulta y contra la que se verifica; `docs/research/2026-10-procesos-gestion-editorial.md` — el brief se aprueba antes de redactar porque es el punto más barato para cambiar el tema; la pieza `lista` del planeador trae pregunta del lector, ángulo y soporte.
- `Producto:` sin documentación de producto aplicable.
- `Lecciones:` `docs/lessons/flujo-de-escritura.md` — la ronda corre sobre la versión final, el checklist la codifica; `docs/lessons/incisos-entre-parentesis.md` — paréntesis sobre raya en la redacción del propio skill; `docs/lessons/reglas-atemporales.md` — el skill describe el sistema completo, sin «cuando exista el planeador» ni referencias a tareas.
- `Decisiones:` `docs/decisions/D002-previo-de-articulos-desde-el-cuerpo.md` — el checklist exige `<!--more-->`.

## Conectividad

Conectada. El trabajo toca `.agents/skills/planear-post/` —directorio nuevo con `SKILL.md` y `assets/brief.md`— y crea la convención `docs/editorial/briefs/` para los briefs, que la tarea 016 adoptará en el layout del planeador. El skill lee `EDITORIAL.md`, el archivo de la tarea `contenido` y la pieza del planeador que la tarea enlaza. El planeador aún no existe en disco —la 016 lo implementa en paralelo— pero su contrato ya está fijado en el resultado esperado de esa tarea: índice kanban y un archivo por pieza con pregunta del lector, ángulo, soporte, próximo paso y notas; el skill se escribe contra ese contrato, no contra una implementación, así que no bloquea. Las operaciones mecánicas necesarias ya existen en el catálogo: `secciones`, `estado` y `dependencias` para leer la tarea; `insertar-seccion` para el `## Encuadre` delgado. El brief es archivo nuevo — se escribe directo, no por el catálogo. La consulta de «planeación completa» sobre la señal `## Encuadre` la adapta la tarea 017 —fuera del alcance de esta.

## Plan técnico

El subsistema: el directorio de skills `.agents/skills/` —un directorio por capacidad con `SKILL.md` más `assets/` o `references/` opcionales— y el archivo de tarea `contenido` que `ejecutar-tareas` enrutará. El skill nuevo sigue el molde de `planear-tarea` en forma y cambia la sustancia: produce un brief de preparación editorial (artefacto propio en `docs/editorial/briefs/`) en lugar de secciones de plan completas en la tarea.

- [x] `assets/brief.md` — la plantilla del brief con placeholders entre corchetes: `## Estado` (Borrador/Aprobada), `## Encuadre` (audiencia, promesa, arco, ejemplo conductor, alcance, metadatos), `## Temas de investigación` (ítems `- [ ]`), `## Material`, `## Borrador del outline`, `## Checklist de publicación` (ítems universales)
  - Aporta: el formato del documento de preparación vive en un solo lugar — el skill lo rellena, `redactar-post` lo consume y el enrutado lo consulta sin deriva
  - Contexto: el checklist es verbatim — ítems universales idénticos para todo post; los específicos del post se añaden al final de la sección
- [x] `SKILL.md` — frontmatter (name, description con cuándo usar y sinónimos) y cuerpo canónico: cuándo usar / cuándo no usar / entrada / salida / principios rectores / procedimiento / finalización / referencias
  - Aporta: la mitad de planeación del flujo de contenido — análoga a `planear-tarea` en forma, editorial en sustancia
  - Contexto: entrada dual (pieza `lista` del planeador o tarea `contenido` que la enlaza); el encuadre convierte pregunta/ángulo/soporte en promesa/arco/ejemplo, no los re-inventa
- [x] El procedimiento recorre: validar entrada (tipo `contenido`, pieza enlazada con sus tres requisitos) → consultar `EDITORIAL.md` → recorrer el corpus (posts relacionados, tags existentes, pilar) → producir el encuadre → identificar y resolver los temas de investigación (con `investigar` si lo amerita, con ejecución para verificaciones técnicas) registrando respuestas en `## Material` → bosquejar el outline → presentar el brief completo a la puerta → materializar tras aprobación
  - Aporta: la preparación se agota en planeación — la escritura no recopila contexto; si algo falta, el brief estaba incompleto
- [x] Materialización: brief en `docs/editorial/briefs/<slug>.md` con `estado: aprobado` en su `## Estado` (campos, no línea de opciones: el brief no es tarea ni propuesta); `## Encuadre` delgado en la tarea (ruta del brief, fecha de aprobación, promesa en una línea) vía `insertar-seccion` antes de `## Revisión`
  - Aporta: la tarea conserva la fuente de verdad del avance sin duplicar el brief; la 017 tiene su señal de «planeación completa»
- [x] Ronda de escritura sobre `SKILL.md` y `assets/brief.md` (`revisar-redaccion` + `pulir-escritura`): paréntesis sobre raya, sin referencias temporales al estado de construcción del sistema
  - Aporta: los artefactos cumplen las convenciones de escritura del proyecto

## Suite de pruebas esperada

- `check`, `lint`, `format:check`, `build` en verde —(B)
- El skill declara cuándo usar/no usar, entrada, salida, principios, procedimiento y finalización en el formato canónico —(O)
- La puerta humana es explícita: el procedimiento se detiene tras presentar el brief y solo materializa tras aprobación —(O)
- El brief concentra la preparación: encuadre, investigación resuelta en material, outline y checklist; la escritura no recopila contexto —(O)
- Los ítems del checklist son comprobables contra un post real —(O)
- Las lecturas/escrituras mecánicas se delegan en las capacidades de artefactos —(O)
- La plantilla usa placeholders entre corchetes y el checklist es insertable verbatim —(O)
- El texto no contiene rayas para incisos ni referencias al estado de construcción del sistema —(O)
- Revisión técnica por subagente aprueba

## Revisión

- Subagente: 2026-10-17 — Aprueba (ronda 3; rondas 1-2 solicitaron cambios: retoma de borrador, contrato desactualizado en 014/017, género del estado, slug en metadatos)
- Usuario (ejecución): 2026-10-17 — Aprueba
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
