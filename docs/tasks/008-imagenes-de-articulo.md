# Imágenes de artículo: hero y Open Graph

## Estado

[ ] Pendiente | **[~] En progreso** | [r] En revisión | [x] Completada | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

Generar automáticamente en build la imagen de cada artículo —fondo acorde a la identidad más el título— que sirve como cabecera hero del artículo y como imagen de compartir vía Open Graph.

## Dependencias

- 005
- 006

## Entrada

- La colección de artículos con su esquema y la página de artículo funcionando.
- Los metadatos por página, incluidas las etiquetas Open Graph.
- La identidad visual definida en `DESIGN.md`, que alimenta la plantilla de fondo.
- La investigación `docs/research/2026-10-generacion-automatica-imagenes-og-hero.md`: patrón recomendado —componente renderizado a SVG y rasterizado a PNG en endpoint dinámico—, tamaño 1200×630, fuentes empaquetadas en el repositorio.

## Resultado esperado

- Una plantilla de imagen —componente con el fondo de la identidad y el título del artículo— diseñada dentro del subconjunto CSS que el renderizador admite.
- Generación en build de un PNG por artículo publicado, vía endpoint dinámico o script post-build.
- La imagen cableada como hero de la página de artículo y como `og:image` con URL absoluta en sus metadatos.
- Las fuentes tipográficas empaquetadas en el repositorio para builds reproducibles.

## Criterios de calidad

- Cada artículo publicado produce su PNG en build sin paso manual; los borradores no generan imagen.
- La etiqueta `og:image` del artículo apunta con URL absoluta a su PNG generado.
- El hero visible del artículo y su imagen de compartir provienen de la misma plantilla.
- El fondo de la plantilla referencia los tokens de la guía de estilo: la imagen es reconocible como Fronteando.

## Procedimiento sugerido

1. Diseñar la plantilla con el fondo de la identidad y el título, iterándola en el playground del renderizador.
2. Integrar la generación en el build: endpoint `[slug].png` con `getStaticPaths` o hook `astro:build:done`.
3. Empaquetar las fuentes y ajustar tipografía, medidas y posiciones.
4. Cablear el PNG generado al hero del artículo y a su `og:image`.
5. Verificar un artículo de punta a punta: imagen renderizada y etiqueta correcta.

## Notas

- La investigación documenta el patrón completo y las alternativas: si la plantilla resulta demasiado simple para el renderizador de componentes, la composición directa con la biblioteca de imágenes es el plan B.

## Contexto

- Archivos similares:
  - `site/src/pages/rss.xml.ts` — patrón de endpoint estático con `getCollection` filtrando `!data.draft`.
  - `site/src/pages/articulos/[...id].astro` — `getStaticPaths` por colección; aquí se cablea el hero.
  - `site/src/layouts/Base.astro` — metadatos OG/Twitter donde va `og:image`.
  - `site/astro.config.mjs` — `site` ya declarado; `og:image` exige URL absoluta.
  - `DESIGN.md` — tokens de color/tipografía que alimentan la plantilla.
  - `docs/research/2026-10-generacion-automatica-imagenes-og-hero.md` — patrón recomendado completo.
- Patrones:
  - Todo se genera en build (D001): endpoint estático `src/pages/og/[...id].png.ts` con `getStaticPaths`.
  - Satori no admite woff2 ni CSS completo: fuentes `.woff` vendoradas, plantilla como árbol de objetos planos con flexbox.
  - Módulo nativo `@resvg/resvg-js`: puede exigir `vite.ssr.external` en la config.
- Dominio: ninguna aplica. Producto: ninguna aplica.
- Lecciones: `formato-de-codigo-generado.md`, `plantillas-de-astro.md` (whitespace en `.astro` para el hero).
- Decisiones: D001 — sitio estático, imágenes en build.
- Industria (verificación 2026-10-16): 1200×630 PNG con URL absoluta es el estándar; emitir `og:image:type/width/height/alt`; `twitter:card=summary_large_image` para tarjeta grande; fondo oscuro destaca en feeds claros; zona segura —texto lejos de los bordes—; la tarjeta con título impreso como hero duplica el título, patrón aceptado (dev.to/Hashnode).

## Conectividad

Conectada — la colección filtrada, `context.site` y los metadatos OG ya existen con la forma esperada. Las piezas nuevas son las dos dependencias (satori + resvg-js, fijadas en versiones asentadas) y las fuentes woff vendoradas desde `@fontsource`.

## Plan técnico

Aprobado por el usuario.

- [x] `site/package.json` — añadir `satori@0.43.0` y `@resvg/resvg-js@2.6.2`
  - Aporta: renderizador de la plantilla a SVG y rasterizador a PNG
- [x] `site/src/assets/fonts/` — vendorar `ibm-plex-serif-latin-700-normal.woff`, `ibm-plex-mono-latin-400-normal.woff` e `ibm-plex-mono-latin-500-normal.woff` desde `node_modules/@fontsource`
  - Aporta: fuentes empaquetadas en el repo —los mismos archivos que sirve el sitio—, builds reproducibles
- [x] `site/src/utils/og.ts` — paleta del tema oscuro como constantes nombradas por token, plantilla 1200×630 como árbol de objetos (marca `fronteando_` con cursor en acento, título en Serif 700, fecha + tags en Mono muted, zona segura con padding generoso) y `renderOgImage({ title, date, tags })` → satori → SVG → resvg → PNG
  - Aporta: plantilla de la identidad + generación en un módulo
- [x] `site/src/pages/og/[...id].png.ts` — endpoint con `getStaticPaths` sobre artículos `!draft`; `GET` devuelve `image/png`
  - Aporta: un PNG real por artículo en `dist/og/` en cada build (D001)
- [x] `site/astro.config.mjs` — `vite.ssr.external` evaluado: no hizo falta, el módulo nativo resuelve en dev y build sin tocar la config
  - Aporta: dev y build sin que Vite empaquete el `.node`
- [x] `site/src/layouts/Base.astro` — prop `image`; `og:image` con URL absoluta + `og:image:type/width/height/alt`; `twitter:card` = `summary_large_image` con imagen, `summary` sin ella
  - Aporta: metadatos OG/Twitter completos por página con imagen
- [x] `site/src/pages/articulos/[...id].astro` — `image: /og/<id>.png` al layout; el `<img>` hero se descartó en ejecución (ver desviaciones)
  - Aporta: `og:image` por artículo
- [x] `site/src/styles/global.css` — estilos del hero, revertidos al descartarse el hero

## Suite de pruebas esperada

Aprobada por el usuario.

- `check` / `lint` / `format:check` / `build` pasan —(B)
- `dist/og/hola-fronteando.png` existe, es PNG válido de 1200×630 —(B)
- Un `draft: true` de prueba no genera PNG —(B)
- El HTML del artículo lleva `og:image` con URL absoluta y `twitter:card=summary_large_image`; páginas sin imagen quedan en `summary` —(B)
- El endpoint sirve también en `astro dev` —(O)
- Evidencia visual: PNG abierto y reconocible como Fronteando (paleta oscura, marca, título legible); página de artículo con hero en ambos temas —(O)

## Desviaciones del plan

- `vite.ssr.external` no fue necesario: `@resvg/resvg-js` resuelve su binding nativo en dev y en build sin configuración (verificado: endpoint responde en `astro dev` y `dist/og/*.png` se genera).
- La plantilla raíz necesita `boxSizing: "border-box"`: satori interpreta `height: 100%` como content-box y el padding empujaba la fila meta fuera del lienzo de 630px.
- La fila meta usa `justifyContent: "space-between"` en lugar de `marginLeft: "auto"` para la insignia del dominio.
- **Hero eliminado de la página** (decisión del usuario, desvía el «resultado esperado» literal): el hero duplicaba toda la información ya visible en la página —marca, título, meta, dominio—; el PNG queda como artefacto exclusivamente social (`og:image`), patrón dominante en blogs técnicos con tarjetas generadas. Se evaluó una variante sin elementos duplicados y quedaba una franja genérica sin información.
- **La meta de la tarjeta lleva solo la fecha** (decisión del usuario), sin tags.
- `lineClamp` de satori solo aplica con `display: "block"` (verificado en el código fuente de satori 0.43): el título usa `block` + `lineClamp: 4` + `textOverflow: "ellipsis"` tras la prueba de estrés con título de ~20 palabras; la meta trunca con `nowrap` + ellipsis.

## Revisión

- Subagente: 2026-10-16 — Aprueba
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
