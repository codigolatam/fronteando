# Crear la guía de tono editorial — EDITORIAL.md

## Estado

**[ ] Pendiente** | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

Crear `EDITORIAL.md` en la raíz —la `DESIGN.md` de la escritura— como contrato de voz, reglas y anatomía de los posts del blog, de modo que los skills de contenido verifiquen contra ella y el registro editorial no se mezcle con el de la documentación.

## Dependencias

- Ninguna

## Entrada

- La investigación `docs/research/2026-10-procesos-gestion-editorial.md`: la guía editorial es el artefacto estándar de toda operación de contenido —voz y tono, palabras problemáticas, proceso y ejemplos—.
- Los dos posts publicados como material del que destilar la voz: `site/src/content/articulos/hola-fronteando.md` y `un-store-reactivo-en-vanilla-js.md`.
- Las lecciones editoriales ya destiladas: `flujo-de-escritura`, `previos-de-articulos`, `fechas-de-publicacion`.
- Los niveles de edición estándar: sustantiva (estructura, promesa, veracidad) vs. mecánica (estilo, ortotipografía — corre sobre la versión final).

## Resultado esperado

- `EDITORIAL.md` en la raíz con: voz y registro (fondo, no recetas; denso, sin relleno), anatomía del post (gancho que cierra en el previo, secciones que aportan, código siempre ejecutable, límites honestos), contrato de metadatos (frontmatter, `<!--more-->` tras el gancho, fecha con hora real), niveles de edición y qué verifica cada paso del flujo, manual de referencia (RAE/Fundéu vía `pulir-escritura`), palabras problemáticas con sus sustitutos («corrida» → «ejecución», etc.) y ejemplos tomados de los posts publicados.

## Criterios de calidad

- Todo post futuro puede verificarse contra la guía: cada regla es comprobable en el texto.
- La guía destila —no contradice— lo que los dos posts publicados ya practican.
- Los skills genéricos de escritura quedan referenciados como mecánica de apoyo; la guía manda en los posts.
- `check`, `lint`, `format:check` y `build` en verde.

## Procedimiento sugerido

1. Releer los dos posts y destilar la voz que ya practican; cruzar con las lecciones editoriales.
2. Redactar `EDITORIAL.md` con las secciones del resultado esperado.
3. Pasar la guía misma por la ronda de escritura completa — es prosa del proyecto.

## Notas

- Convive con `DESIGN.md` (visual) sin solaparse: una gobierna píxeles, la otra prosa.
- Declarar en la guía la tensión conocida fuera de alcance del hito: mantenimiento de artículos publicados que envejecen.

## Contexto

- `Archivos similares:` `DESIGN.md` — modelo de contrato de referencia en la raíz.
- `Patrones:` los artefactos de referencia viven en la raíz y los skills los consultan como contrato.
- `Dominio:` sin documentación de dominio aplicable.
- `Producto:` sin documentación de producto aplicable.
- `Lecciones:` `docs/lessons/flujo-de-escritura.md`, `docs/lessons/previos-de-articulos.md`, `docs/lessons/fechas-de-publicacion.md` — las tres lecciones editoriales que la guía formaliza.
- `Decisiones:` `docs/decisions/D002-previo-de-articulos-desde-el-cuerpo.md` — el contrato del previo que la guía cita.
