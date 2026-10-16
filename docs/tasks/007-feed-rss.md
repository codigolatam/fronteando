# Feed RSS

## Estado

[ ] Pendiente | **[~] En progreso** | [r] En revisión | [x] Completada | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

Publicar el feed RSS del blog generado en build: el canal por el que lectores —y la futura newsletter— se enteran de contenido nuevo.

## Dependencias

- 005

## Entrada

- La colección de artículos funcionando.
- La URL pública del sitio, configurada en el despliegue del borrador 02.

## Resultado esperado

- `rss.xml` generado en build con todos los artículos publicados: título, fecha, resumen y enlace.
- El feed descubrible desde el sitio: `link` en el head y referencia en el pie.

## Criterios de calidad

- El feed valida como RSS 2.0 y lista los artículos publicados.
- Los borradores no aparecen en el feed.
- Se regenera en cada build sin paso manual.

## Notas

- Es la entrada que la idea `newsletter` automatizará para avisar a suscriptores; dejarla lista ahora desacopla esa línea.

## Contexto

- Archivos similares:
  - `site/src/pages/articulos/[...id].astro` — patrón de consulta a la colección (filtro `!draft`, orden por fecha) a replicar en el feed.
  - `site/src/pages/index.astro` — misma consulta ordenada desc para la portada.
  - `site/src/layouts/Base.astro` — head donde va el `<link rel="alternate">` del feed y pie con `.footer-nav` donde va el enlace RSS.
  - `site/astro.config.mjs` — `site` ya declarado; `@astrojs/rss` lo consume vía `context.site`.
- Patrones:
  - Todo lo derivado se genera en build (D001): el feed es un endpoint estático `src/pages/rss.xml.ts`.
  - Código nuevo ya en estilo Prettier.
- Dominio: ninguna aplica. Producto: ninguna aplica.
- PRD (`docs/prd/001-sitio-base-del-blog.md`): el feed se regenera en cada build; borradores nunca publicados.
- Épica: feed RSS dentro del alcance del hito; la idea `newsletter` lo consumirá después.
- Lecciones: `formato-de-codigo-generado.md`.
- Decisiones:
  - D001 — sitio estático, feed en build.
  - D002 — el excerpt del cuerpo existe si el resumen del feed lo quisiera; la tarea pide «resumen», que es `description`.
- Otras fuentes:
  - `@astrojs/rss` oficial v4.0.19 (2026-06-30): helper `rss()` en un endpoint `.ts` bajo `src/pages/`; emite `rss.xml` en build.

## Conectividad

Conectada — la colección con `description`, `date` y el filtro de borradores ya existe con la forma esperada; `site` está en la config (requisito del helper `rss()`); `Base.astro` tiene el head y el pie donde van el link de descubrimiento y el enlace. La dependencia `@astrojs/rss` es la única pieza nueva, oficial y de instalación declarativa.

## Plan técnico

Aprobado por el usuario.

- [x] `site/package.json` — añadir `@astrojs/rss@4.0.19`
  - Aporta: el helper oficial de feed
- [x] `site/src/pages/rss.xml.ts` — endpoint estático: `rss({ title: "Fronteando", description: <la del sitio>, site: context.site, items })`; items = colección sin borradores, orden fecha desc, cada uno con `title`, `pubDate`, `description`, `link: /articulos/<id>/`
  - Aporta: `rss.xml` en cada build (D001); el «resumen» del requisito es `description` — el excerpt de D002 queda para el índice
- [x] `site/src/layouts/Base.astro` — `<link rel="alternate" type="application/rss+xml" title="Fronteando" href="/rss.xml">` en el head + enlace `rss` en `.footer-nav`
  - Aporta: feed descubrible; cumple lo anunciado en la 006

Fuera de alcance: contenido completo en el feed y stylesheet XSL.

## Suite de pruebas esperada

Aprobada por el usuario.

- `check` / `lint` / `format:check` / `build` pasan —(B)
- `dist/rss.xml` existe, es XML válido RSS 2.0 con canal Fronteando y el artículo con título/fecha/resumen/enlace —(B)
- Un `draft: true` de prueba no aparece en el feed —(B)
- `<link rel="alternate">` presente en el head de todas las páginas —(B)
- Enlace `rss` en el pie, verificado renderizado —(O)

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
