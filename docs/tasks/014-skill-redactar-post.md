# Crear el skill redactar-post — ejecución de la escritura

## Estado

[ ] Pendiente | [~] En progreso | [r] En revisión | **[x] Completada** | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

Crear el skill `redactar-post` —la mitad de ejecución del flujo de escritura— que toma una tarea de tipo `contenido` con su brief aprobado y produce el post: borrador por secciones, código verificado por ejecución, ronda de escritura completa sobre la versión final y metadatos al cierre.

## Dependencias

- docs/tasks/012-guia-de-tono-editorial.md

## Entrada

- `EDITORIAL.md` (tarea 012) — la guía de voz y anatomía que el borrador respeta.
- El skill `planear-post` (tarea 013) — produce el brief aprobado (`docs/editorial/briefs/<slug>.md`) que este skill consume como única entrada; la sección `## Encuadre` de la tarea es la señal de planeación completa.
- El patrón de `desarrollar-tarea` en `.agents/skills/` — modelo de skill de ejecución.
- La experiencia de la tarea 011: cada snippet se ejecuta antes de incluirse; la ronda corre `revisar-redaccion` y luego `pulir-escritura` sobre la versión final; `<!--more-->` tras el gancho; fecha con hora real.

## Resultado esperado

- `.agents/skills/redactar-post/SKILL.md` que: verifica el brief aprobado, escribe el artículo siguiendo el arco, ejecuta cada fragmento de código antes de incluirlo, corre la ronda completa sobre la versión final (y de nuevo sobre cualquier párrafo reescrito después), cierra metadatos —frontmatter, `<!--more-->`, hora real— y registra desviaciones del brief.

## Criterios de calidad

- Cada regla dura del proceso queda codificada en el skill, no sugerida: código ejecutado, ronda sobre versión final, previo tras el gancho, fecha real.
- El skill delega la mecánica de estilo en `revisar-redaccion` y `pulir-escritura` — los skills genéricos quedan como apoyo bajo la autoridad de `EDITORIAL.md`.
- Las desviaciones del encuadre se registran en el archivo de la tarea, como hace `desarrollar-tarea` con el plan.
- `check`, `lint`, `format:check` y `build` en verde.

## Procedimiento sugerido

1. Leer `desarrollar-tarea` y los skills de escritura existentes; leer `EDITORIAL.md`.
2. Redactar el skill con el procedimiento en pasos verificables.
3. Verificar la coherencia con `planear-post` — consume exactamente el brief que aquel produce.

## Notas

- La verificación de código por ejecución es el análogo del fact-check editorial — la investigación lo lista como paso propio del proceso, no como parte de la edición sustantiva.
- El skill no hace revisión editorial: escribe y pule; revisar es la tarea 015 — la separación de contextos es lo que hizo funcionar la revisión de la 011.

## Contexto

- `Archivos similares:` `.agents/skills/desarrollar-tarea/SKILL.md` — el modelo directo de mitad de ejecución (validar la entrada aprobada, ejecutar, registrar desviaciones); `.agents/skills/planear-post/` — el skill que produce el brief que este consume, con su plantilla y ejemplo.
- `Patrones:` skill de ejecución con verificación integrada: cada snippet se ejecuta antes de incluirse (el fact-check del flujo), la ronda de escritura corre sobre la versión final y las desviaciones del documento de planeación quedan registradas en la tarea; las mutaciones mecánicas (`marcar-item`, `insertar-seccion`, `añadir-linea`) operan igual sobre el brief que sobre la tarea.
- `Dominio:` `EDITORIAL.md` — la guía de voz, anatomía, contrato de metadatos y taxonomía que el borrador respeta; el brief en `docs/editorial/briefs/<slug>.md` — la única entrada de escritura.
- `Producto:` `site/src/content/articulos/<slug>.md` — el destino del post; `site/src/content.config.ts` — el esquema que el frontmatter debe cumplir; Node 24 disponible para ejecutar los snippets.
- `Lecciones:` `docs/lessons/flujo-de-escritura.md` — la ronda corre sobre la versión final y de nuevo sobre lo reescrito; `docs/lessons/previos-de-articulos.md` y `docs/lessons/fechas-de-publicacion.md` — previo como unidad y hora real; `docs/lessons/assets-de-skills.md` — el frontmatter del post se define como plantilla en `assets/`, no en prosa; `docs/lessons/lineas-completas-en-artefactos.md` — los ítems del checklist se marcan por línea.
- `Decisiones:` `docs/decisions/D002-previo-de-articulos-desde-el-cuerpo.md` — `<!--more-->` tras el gancho; `docs/decisions/D003-brief-editorial-artefacto-propio.md` — el contrato de entrada (brief `aprobado` + `## Encuadre`).

## Conectividad

Conectada. El trabajo toca `.agents/skills/redactar-post/` —directorio nuevo con `SKILL.md` y `assets/post.md`—, lee el brief aprobado en `docs/editorial/briefs/` y escribe el post en `site/src/content/articulos/<slug>.md`. El contrato de entrada ya está fijado (D003): sección `## Encuadre` presente en la tarea + `estado: aprobado` en el brief, lectura directa en ambos casos. Las operaciones mecánicas necesarias existen: `secciones` para verificar la señal, `marcar-item`/`añadir-linea`/`insertar-seccion` para marcar el checklist del brief y registrar `## Desviaciones del brief` en la tarea. La ejecución de snippets corre con `node` local. Dos fronteras se declaran, no se implementan: el `draft` se quita al aprobar la revisión editorial (015) y la pieza del planeador la mueve su gestor (016).

## Plan técnico

El subsistema: el directorio `.agents/skills/redactar-post/` —`SKILL.md` más `assets/post.md`— que consume el brief aprobado en `docs/editorial/briefs/` y produce el post en `site/src/content/articulos/<slug>.md`. El skill nuevo sigue el molde de `desarrollar-tarea` en forma y cambia la sustancia: en lugar de implementar un plan técnico, escribe el artículo que el brief prepara.

- [x] `assets/post.md` — la plantilla del post en el formato real de la colección (Markdown + frontmatter YAML que valida contra `content.config.ts`): `title`, `description`, `date`, `categoria`, `nivel` opcional, `tags`, `draft: true` al nacer, una línea por campo; `<!--more-->` tras el gancho en el cuerpo
  - Aporta: el contrato de metadatos materializado como plantilla ejecutable (lección de assets), no descrito en prosa; `npm run check` lo valida contra el esquema Zod
- [x] `SKILL.md` — frontmatter (name, description con cuándo usar y sinónimos) y cuerpo canónico: cuándo usar / cuándo no usar / entrada / salida / principios rectores / procedimiento / finalización / referencias
  - Aporta: la mitad de ejecución del flujo de escritura — análoga a `desarrollar-tarea` en forma, editorial en sustancia
  - Contexto: el brief aprobado es la única entrada de escritura; sin él no se escribe — corresponde `planear-post` primero; la revisión editorial es `revisar-post` (015)
- [x] El procedimiento recorre: validar la entrada (tarea `contenido` con `## Encuadre` → brief `estado: aprobado`) → leer el brief completo y `EDITORIAL.md` → crear el post desde la plantilla con los metadatos decididos → escribir por secciones siguiendo el outline (guía, no corsé) → ejecutar cada snippet antes de incluirlo y registrar la salida como la verá el lector → ronda completa sobre la versión final (`revisar-redaccion` luego `pulir-escritura`, de nuevo sobre párrafos reescritos) → cerrar metadatos (`date` con hora real, previo como unidad) → marcar los ítems verificados del checklist del brief → registrar `## Desviaciones del brief` en la tarea
  - Aporta: las prácticas duras codificadas, no sugeridas — código ejecutado, ronda sobre versión final, `<!--more-->` tras el gancho, fecha real, `draft` al nacer
- [x] Ronda de escritura sobre `SKILL.md` y `assets/post.md` (documentación interna: mecánica genérica, pero las lecciones aplican — paréntesis sobre raya, nada de referencias temporales)
  - Aporta: los artefactos cumplen las convenciones de escritura del proyecto

## Suite de pruebas esperada

- `check`, `lint`, `format:check`, `build` en verde —(B)
- El skill declara cuándo usar/no usar, entrada, salida, principios, procedimiento y finalización en el formato canónico —(O)
- La puerta de entrada es firme: sin brief `aprobado` enlazado desde `## Encuadre` no se escribe —(O)
- Las reglas duras quedan codificadas: cada snippet se ejecuta antes de incluirse, la ronda corre sobre la versión final, `<!--more-->` tras el gancho, `date` con hora real, `draft: true` al nacer —(O)
- Las lecturas/escrituras mecánicas se delegan en las capacidades de artefactos (`marcar-item` en el checklist del brief, `insertar-seccion`/`añadir-linea` para `## Desviaciones del brief` en la tarea) —(O)
- La mecánica de estilo se delega en `revisar-redaccion` y `pulir-escritura` bajo la autoridad de `EDITORIAL.md` —(O)
- `marcar-item` verificado sobre la plantilla del brief en /tmp —(B)
- El texto no contiene rayas para incisos ni referencias al estado de construcción del sistema —(O)
- Revisión técnica por subagente aprueba

## Revisión

- Subagente: 2026-10-17 — Aprueba
- Usuario (ejecución): 2026-10-17 — Aprueba
- Usuario (cierre): 2026-10-17 — Aprueba
