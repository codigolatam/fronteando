# Decisiones de diseño

<!-- Índice de decisiones de diseño del proyecto. Cada entrada apunta a un
     archivo de decisión y declara sus disparadores —la vía de descubrimiento
     léxico que usa consultar-decisiones—.

     Formato de cada entrada:
     - <archivo-de-la-decisión>.md
       - Disparadores: <archivos, artefactos y palabras clave aplicables>
       - Resumen: <qué decidió el documento en una frase>
       - Estado: <opcional: Sustituida por DNNN | Obsoleta>

     Las entradas nuevas se añaden al final. Gestionado por el skill
     decisiones-diseno. -->

- D001-despliegue-en-cloudflare-workers.md
  - Disparadores: cloudflare, workers, wrangler, deploy, despliegue, wrangler.jsonc, CDN, astro.config
  - Resumen: el sitio se despliega como Worker de assets estáticos en Cloudflare (Workers Builds), no en Pages

- D002-previo-de-articulos-desde-el-cuerpo.md
  - Disparadores: excerpt, previo, more, artículos, portada, índice, frontmatter, description, excerpt.ts
  - Resumen: el previo del índice sale del cuerpo del artículo —antes de `<!--more-->` o el primer párrafo— en texto plano; `description` queda para metadatos y como respaldo

- D003-brief-editorial-artefacto-propio.md
  - Disparadores: brief, encuadre, planear-post, editorial, docs/editorial, contenido, post, artefacto, sección Encuadre, checklist
  - Resumen: la preparación de un post vive en un brief propio (docs/editorial/briefs/) con estado por campos; la tarea conserva solo la sección Encuadre como puntero y señal

- D004-el-post-nace-borrador-y-la-revision-lo-publica.md
  - Disparadores: draft, borrador, revisar-post, redactar-post, publicación, post, frontmatter, merge, editorial
  - Resumen: el post nace con draft: true y lo conserva hasta que revisar-post aprueba la revisión editorial; la aprobación equivale a listo para publicar y el merge publica

- D005-serie-como-epica-editorial.md
  - Disparadores: serie, pieza, planeador, editorial, kanban, arco, épica, docs/editorial, series
  - Resumen: la serie es el análogo editorial de la épica (marco propio, ciclo propuesta→en curso→cerrada, fuera del kanban) y la pieza es la unidad publicable; el índice muestra el estado del arco como sufijo de la línea

- D006-columna-lateral-para-el-acompanamiento-en-pantallas-anchas.md
  - Disparadores: aside, columna lateral, raíl, rail, sticky, layout, grid, card, acompañamiento, lectura acompañada, article-rail, rail-width, 1240px, DESIGN.md, columna única, AccompanimentCard.astro, global.css
  - Resumen: en pantallas desde 1240px la nota de acompañamiento vive en una columna lateral pegajosa de 280px junto al texto, que conserva su medida; es la única excepción a la columna única de la guía

- D007-piezas-interactivas-en-svelte-compilado-a-custom-elements.md
  - Disparadores: svelte, pieza, demo, custom element, ::demo, fronteando-demo, demos/, componente, artefacto, shadow DOM, mount
  - Resumen: las piezas interactivas se escriben en Svelte compilado a custom elements (piece.svelte + index.ts adaptador); el contrato mount(host, container) no cambia y el runtime solo viaja en el chunk de cada pieza
