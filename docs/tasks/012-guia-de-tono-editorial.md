# Crear la guía de tono editorial — EDITORIAL.md

## Estado

[ ] Pendiente | [~] En progreso | [r] En revisión | **[x] Completada** | [!] Bloqueada

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

## Conectividad

**Veredicto: conectada.**

`EDITORIAL.md` es un archivo nuevo en raíz — no depende de infraestructura. Los dos posts publicados y las tres lecciones editoriales proveen todo el material a destilar; las referencias externas quedaron investigadas en `docs/research/2026-10-reglas-guias-de-estilo-tecnico.md`.

## Plan técnico

- [x] `EDITORIAL.md` — la guía con siete secciones: voz y registro · anatomía del post · contrato de metadatos · niveles de edición (sustantiva vs. mecánica) · manuales de referencia · palabras problemáticas con sustitutos · ejemplos destilados de los posts publicados — más una nota de alcance que declara la tensión de mantenimiento fuera; la guía misma pasa la ronda de escritura completa
  - Aporta: el contrato contra el que los skills 013–015 verifican
  - Contexto: archivo nuevo en raíz, convive con `DESIGN.md` sin solape —una gobierna píxeles, la otra prosa—
- [x] `docs/research/2026-10-reglas-guias-de-estilo-tecnico.md` — investigación de las guías canónicas (Google dev docs, Mailchimp) y de las reglas de blogging técnico (Draft.dev, Ritza) que fundamenta las reglas de la guía
  - Aporta: reglas trazables a estándares, no preferencias
  - Contexto: investigación dirigida rápida, dos rondas de búsqueda
- [x] Metadatos `nivel` y `categoria` (ampliación aprobada en ejecución): `content.config.ts` con ambos enums; frontmatter de los dos posts publicados; `nivel` y `categoria` visibles en la línea de metadatos de la página del artículo y de las tarjetas de portada; contrato de la guía actualizado
  - Aporta: los pilares de conocimiento y el grado de cada post, visibles y exigidos por el esquema
  - Contexto: `nivel` = principiante/intermedio/avanzado; `categoria` = los pilares del manifiesto (css, javascript, frameworks, accesibilidad, rendimiento, meta); los valores de `categoria` los fija el esquema, no la guía

## Suite de pruebas esperada

- `check` / `lint` / `format:check` / `build` en verde —(B)
- La guía pasa la ronda completa (`revisar-redaccion` + `pulir-escritura`) —(B)
- Cada regla de la guía es comprobable contra los posts publicados —(O)
- Sin solape con `DESIGN.md` —(O)

## Revisión

- Subagente: 2026-10-16 — Aprueba (ronda 2; ronda 1 solicitó cambios: rayas pegadas, fallback D002, tabla verificable)
- Usuario (ejecución): 2026-10-16 — Aprueba
