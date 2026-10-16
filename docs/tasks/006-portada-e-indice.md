# Portada, índice de artículos y metadatos

## Estado

[ ] Pendiente | [~] En progreso | [r] En revisión | **[x] Completada** | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

Completar la cara del sitio: la portada con el índice de artículos y los metadatos que hacen al blog presentable y descubrible.

## Dependencias

- 005

## Entrada

- La colección de artículos y su página de lectura.
- La guía de estilo para la portada y la navegación.
- La descripción del sitio del brief y del README para los metadatos.

## Resultado esperado

- Portada que presenta el blog y lista sus artículos —título, fecha, resumen— ordenados por fecha.
- Navegación completa según el layout: cabecera y pie con sus enlaces.
- Página 404 acorde al tono de la identidad.
- Metadatos por página —title, description, Open Graph— y `sitemap.xml` con `robots.txt` generados en build.

## Criterios de calidad

- La portada lista todos los artículos publicados en orden correcto y ningún borrador.
- Cada página lleva sus metadatos completos.
- `sitemap.xml` y `robots.txt` se generan en build sin paso manual.

## Contexto

- Archivos similares:
  - `site/src/pages/index.astro` — portada actual, aún el banco del tema de la 004; se reescribe como portada real.
  - `site/src/pages/articulos/[...id].astro` — patrón de consulta a la colección (`getCollection`, filtro `!data.draft`, fecha localizada) a replicar para el índice.
  - `site/src/layouts/Base.astro` — head con `title`/`description`; punto donde se declaran los metadatos OG.
  - `site/astro.config.mjs` — `site` ya declarado; donde se registra la integración de sitemap.
- Patrones:
  - Todo valor visual referencia tokens de `DESIGN.md`; los derivados se declaran en `:root`.
  - El código nuevo sale ya en estilo Prettier; `{" "}` en bordes texto-etiqueta de `.astro`.
  - Todo lo derivado se produce en build time (D001): sitemap y robots se generan sin paso manual ni runtime.
- Dominio: ninguna aplica.
- Producto: ninguna aplica.
- PRD (`docs/prd/001-sitio-base-del-blog.md`):
  - CU-3: la portada presenta el blog con identidad propia y lista sus artículos por fecha.
  - Descubribilidad: portada solo con publicados; mapa del sitio y robots se regeneran en cada build.
- Épica (`docs/epics/001-sitio-base-del-blog.md`): portada con metadatos; el orden 005 → 006 ya se cumplió.
- Lecciones:
  - `formato-de-codigo-generado.md`, `plantillas-de-astro.md` — mismas que en la 005.
  - `flujo-de-escritura.md` — el texto del 404 y la presentación de portada pasan por el flujo completo de escritura si hace falta ronda.
- Decisiones:
  - D001 — sitio estático en build: `@astrojs/sitemap` genera `sitemap-index.xml` en build; `robots.txt` estático en `public/`.
- Otras fuentes:
  - `DESIGN.md` — navegación plana en Mono minúsculas sin menús; columna única; pie con enlaces (newsletter fuera del hito).
  - API de Astro verificada: `404.astro` en `src/pages/` produce la página de error personalizada; `@astrojs/sitemap` emite el sitemap en build usando `site`.

## Conectividad

Conectada — la colección y su consulta ya existen con la forma esperada (filtro de borradores incluido); `Base.astro` acepta `title`/`description` y se extiende con props OG sin romper páginas existentes; `site` ya está en la config, requisito del sitemap; `DESIGN.md` ya describe cabecera, navegación y pie. La integración `@astrojs/sitemap` es la única pieza nueva, oficial y de instalación declarativa.

## Plan técnico

Aprobado por el usuario.

- [x] `site/package.json` + `astro.config.mjs` — añadir la integración `@astrojs/sitemap` (oficial; usa el `site` ya declarado)
  - Aporta: `sitemap-index.xml` generado en cada build, sin paso manual (D001)
  - Contexto: integración oficial v3.x; se registra en `integrations`
- [x] `site/public/robots.txt` — `Allow: /` + línea `Sitemap:` apuntando al sitemap
  - Aporta: robots generado en build, cumpliendo el criterio de descubribilidad
- [x] `site/src/layouts/Base.astro` — props `title`, `description`, `type` (`"website" | "article"`, default `"website"`); head con canonical, `og:title/description/type/url`, `twitter:card`/`twitter:title`/`twitter:description`
  - Aporta: metadatos completos por página desde un solo lugar
  - Contexto: `[...id].astro` pasa `type="article"`; las demás páginas heredan el default
- [x] `site/src/pages/index.astro` — portada real: h1 + línea de presentación (la misma voz del artículo) y lista de artículos —título enlazado, fecha y resumen en mono muted— ordenada por fecha desc, sin borradores, con empty state
  - Aporta: CU-3 y el criterio de orden/publicados
  - Contexto: reemplaza el banco del tema; su texto sale del brief/README
- [x] `site/src/pages/404.astro` — página de error en el tono de la identidad
  - Aporta: el requisito de la tarea
- [x] `site/src/layouts/Base.astro` (pie) + `global.css` — enlaces del pie en mono según guía + estilos de la lista de portada, todo con tokens
  - Aporta: «navegación completa según el layout»

Decisiones tomadas: `og:image` queda para la 008; pie sin newsletter (fuera del hito) con enlace al repo; el enlace RSS llega con la 007; orden por fecha descendente.

## Suite de pruebas esperada

Aprobada por el usuario.

- `check` / `lint` / `format:check` / `build` pasan —(B)
- La portada lista `hola-fronteando` con título+fecha+resumen, sin borradores, orden desc —(O/B)
- Un `draft: true` de prueba no aparece en portada ni en sitemap —(B)
- `/404.html` existe y renderiza en ambos temas —(O)
- `sitemap-index.xml` y `robots.txt` en `dist`, robots referenciando el sitemap —(B)
- Toda página construida lleva `og:title/description/type/url`; los artículos `og:type=article` —(B)
- Render: portada y 404 correctas en ambos temas, con evidencia —(O)

## Desviaciones del plan

- `@astrojs/sitemap` se fijó en 3.7.4 en lugar de la 3.6.0 inicial: la 3.6.x falla en el hook `astro:build:done` con Astro 7 (`Cannot read properties of undefined (reading 'reduce')`); la 3.7.4 —publicada el 2026-08-31— genera el sitemap correctamente.
- La lista de artículos de la portada es una pieza que la guía no describe; se derivó con sus principios: título en Serif tamaño sección sin subrayado —es navegación, no enlace en prosa—, meta en mono muted, hover en acento. El pie deriva sus enlaces del patrón `.site-nav` —mono, muted, hover acento— cumpliendo «pie con enlaces» de la guía.
- El previo del índice usa el cuerpo del artículo —todo lo anterior a un marcador `<!--more-->`, o el primer párrafo sin él— en texto plano, no el `description` del frontmatter: el usuario distinguió el resumen corto para OG/social del excerpt de contenido. `description` queda como fallback si el excerpt sale vacío.

## Revisión

- Subagente: 2026-10-16 — Aprueba
- Usuario (ejecución): 2026-10-16 — Aprueba
- Usuario (cierre): 2026-10-16 — Aprueba
