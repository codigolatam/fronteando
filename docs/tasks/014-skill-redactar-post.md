# Crear el skill redactar-post — ejecución de la escritura

## Estado

**[ ] Pendiente** | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

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

- `Archivos similares:` `.agents/skills/` — `desarrollar-tarea` como modelo; `revisar-redaccion`, `pulir-escritura` como mecánica delegada.
- `Patrones:` skill de ejecución con verificación integrada y registro de desviaciones en el archivo de tarea.
- `Dominio:` sin documentación de dominio aplicable.
- `Producto:` sin documentación de producto aplicable.
- `Lecciones:` `docs/lessons/flujo-de-escritura.md`, `docs/lessons/previos-de-articulos.md`, `docs/lessons/fechas-de-publicacion.md` — las tres prácticas que el skill codifica.
- `Decisiones:` `docs/decisions/D002-previo-de-articulos-desde-el-cuerpo.md` — `<!--more-->` tras el gancho.
