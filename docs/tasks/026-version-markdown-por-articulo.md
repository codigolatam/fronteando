# Versión en texto plano de cada artículo

## Estado

[ ] Pendiente | [~] En progreso | [r] En revisión | **[x] Completada** | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

Emitir, junto a cada artículo publicado, su versión en texto plano
consumible por agentes: la fuente markdown del artículo servida en su
misma dirección terminada en `.md`, con un preámbulo breve que
identifique la pieza, generada al publicar el sitio a partir de la
misma fuente que produce la página.

## Dependencias

- Ninguna.

## Entrada

- La colección `articulos` y su esquema de declaración
  (`site/src/content/`, `site/src/content.config.ts`).
- La investigación
  `docs/research/2026-10-version-legible-para-maquinas.md` — el
  patrón del mercado: la URL del artículo terminada en `.md`, el
  contenido fuente sin chrome y un preámbulo con título y URL
  canónica.
- EDITORIAL.md — las marcas `:::pausa` que sí viajan en el texto
  plano, en su posición de lectura.

## Resultado esperado

- Cada artículo responde en `/articulos/<id>.md` (o la variante de la
  convención que decida el plan: `<id>/index.md`) con el contenido de
  la pieza en texto plano.
- El texto plano abre con un preámbulo breve —título y URL canónica—
  para que el agente identifique y cite el origen.
- Las marcas de pausa viajan en el texto plano, en su posición de
  lectura: el protocolo dice qué verificar en cada pausa, pero solo
  el texto sabe dónde cae cada una —sin ellas el agente que acompaña
  no sabe cuándo detener al lector—.
- El resto del material de acompañamiento no viaja: ni el protocolo
  ni la tarjeta forman parte de la versión en texto plano.
- Todos los artículos lo producen, incluidos los que declaran
  `agente: false`: el opt-out es del acompañamiento, no de la
  legibilidad.
- La generación ocurre al publicar el sitio, a partir de la fuente
  markdown de la colección —no del HTML renderizado—.

## Criterios de calidad

- El texto plano reproduce el artículo íntegro: encabezados, código,
  listas y enlaces llegan como en la fuente.
- Las marcas `:::pausa` aparecen en su posición de lectura, en la
  forma del fuente; ningún otro material de acompañamiento se cuela
  en la salida.
- El preámbulo identifica título y URL canónica sin duplicar el
  cuerpo.
- Una pieza nueva publicada produce su `.md` sin pasos extra.
- `check`, `lint`, `test` y `build` en verde; la salida se verifica
  servida, no solo generada.

## Procedimiento sugerido

1. Definir el mecanismo de emisión —endpoint de la colección o
   archivos estáticos en build— y la forma exacta de la URL.
2. Definir el preámbulo —campos y formato— sobre la fuente del
   artículo, conservando las marcas de pausa.
3. Verificar cada artículo publicado servido en su `.md`.

## Contexto

- **Archivos similares:**
  - `site/src/pages/og/[...id].png.ts` — endpoint por artículo con
    `getStaticPaths` + `GET` recibiendo la entrada por `props`; es el
    modelo directo para emitir un `.md` por artículo.
  - `site/src/pages/rss.xml.ts` — endpoint de colección con
    `context.site` para componer URLs canónicas.
  - `site/src/utils/accompaniment.ts` — consume `article.body` (la
    fuente markdown sin frontmatter) y ya implementa el recorrido de
    las marcas `:::pausa`; confirma que `body` llega intacto.
  - `site/src/pages/articulos/[...id].astro` — la página canónica del
    artículo en `/articulos/<id>/`.
- **Patrones:**
  - Endpoints `.ts` con `getStaticPaths` sobre la colección filtrando
    `!data.draft` y `GET` que devuelve `Response` con su
    `Content-Type`.
  - La URL canónica del artículo es `/articulos/<id>/` sobre
    `context.site` (`https://www.fronteando.dev`).
  - La fuente markdown de la colección es única: `article.body` la da
    ya procesada por el loader, sin duplicar contenido.
- **Dominio:** ninguna aplica —el proyecto no tiene `docs/domains/`.
- **Producto:** ninguna aplica —el proyecto no tiene documentación de
  producto.
- **PRD:** `docs/prd/003-blog-legible-para-maquinas.md` — CU-1 (el
  asistente recibe la fuente limpia con las pausas en posición; la
  variante es que el lector pegue el `.md` él mismo) y CU-4 (publicar
  produce el `.md` sin pasos extra). Comportamiento: emisión en la
  misma dirección terminada en `.md`, preámbulo con título y URL
  canónica, pausas en posición, protocolo y tarjeta fuera.
- **Lecciones:**
  - `texto-para-agentes.md` — el `.md` se evalúa como prompt: el
    preámbulo debe dejar al agente identificar y citar el origen sin
    ambigüedad.
  - `formato-de-codigo-generado.md` — el código nuevo sale ya en el
    estilo de Prettier del proyecto.
- **Decisiones:**
  - `D001` — el sitio se despliega como assets estáticos en
    Cloudflare Workers: la emisión del `.md` debe ser estática, en
    build, sin servidor que decida.
- **Investigación:**
  - `docs/research/2026-10-version-legible-para-maquinas.md` — el
    patrón del mercado: `.md` en la misma URL del artículo, fuente
    sin chrome, preámbulo con título y URL canónica.

## Conectividad

**Veredicto: conectada.**

- La colección `articulos` existe y `article.body` entrega la fuente
  markdown sin frontmatter —ya la consume `utils/accompaniment.ts`—.
- El patrón de endpoint estático por artículo existe:
  `pages/og/[...id].png.ts` con `getStaticPaths` + `GET`.
- `context.site` está configurado (`astro.config.mjs`,
  `https://www.fronteando.dev`) para componer la URL canónica.
- Astro soporta endpoints con extensión de archivo (`[...id].md.ts`)
  que emiten el asset en build —coherente con el despliegue estático
  de D001—.
- La exclusión de borradores (`!data.draft`) ya es la convención de
  los endpoints existentes.

## Plan técnico

**Subsistema:** la colección `articulos` (loader glob sobre
`src/content/articulos/*.md`) alimenta tres emisiones —la página
HTML, la imagen OG y el RSS—; el cambio añade una cuarta emisión de
la misma fuente: un endpoint estático por artículo que sirve el
`body` crudo precedido de un preámbulo, en la URL del artículo
terminada en `.md`.

- [x] Crear el compositor del documento en texto plano en
  `src/utils/article-markdown.ts` (`markdownDocumentOf(articulo)`):
  devuelve `# <título>`, una línea `URL canónica: <url>` y el `body`
  intacto
  - Aporta: la composición queda como unidad probable y el endpoint
    delgado; el H1 restaura el título que la página añade fuera del
    cuerpo y la URL canónica da al agente el origen citable —el
    preámbulo se evalúa como prompt (lección `texto-para-agentes`)—
  - Contexto: la canónica se compone como en `protocolOf`
    —`import.meta.env.SITE` + `/articulos/<id>/`—; vitest la define
    en `vitest.config.ts`
- [x] Crear el endpoint `src/pages/articulos/[...id].md.ts` siguiendo
  el patrón de `og/[...id].png.ts`: `getStaticPaths` filtrando
  `!data.draft` y `GET` que responde el documento con `Content-Type:
  text/markdown; charset=utf-8`
  - Aporta: emite `/articulos/<id>.md` en el build estático —la forma
    del mercado— sin servidor ni pasos extra del autor (CU-4)
- [x] Verificar la salida servida: `astro build` y comprobar
  `dist/articulos/*.md` para los tres artículos, más `curl` al dev
  server en modo background si hace falta
  - Aporta: el criterio de calidad exige la salida servida, no solo
    generada

## Suite de pruebas esperada

- Cada artículo publicado responde su `.md` en
  `/articulos/<id>.md` —incluido el que declara `agente: false`— y
  un borrador no produce documento (CU-4; M, E — verificado servido).
- El documento abre con el título y la URL canónica antes del cuerpo
  (CU-1; O).
- El cuerpo llega íntegro: encabezados, código, listas y enlaces como
  en la fuente (CU-1; I).
- Las marcas `:::pausa` aparecen en su posición de lectura, en la
  forma del fuente (CU-1; B).
- El documento no contiene material de acompañamiento: ni el
  protocolo común ni los campos de la ficha (CU-1; Z).
- Un artículo sin pausas ni `agente` produce igualmente su documento
  (CU-4; Z).

## Revisión

- Subagente: 2026-10-25 — Aprueba
- Usuario (ejecución): 2026-10-26 — Aprueba
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
