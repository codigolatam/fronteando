# PRD — Sitio base del blog

Fronteando no existe como sitio y no tiene cara: este conjunto entrega el blog publicado —artículos escritos en Markdown que se convierten en páginas con identidad propia, publicados sin pasos manuales— para que todo lo demás del producto tenga dónde vivir.

## Usuarios

- **El autor** (el equipo técnico): escribe y publica artículos.
- **El lector**: llega al sitio, descubre y lee artículos, los comparte y los sigue.

## Casos de uso

- **CU-1 — Publicar un artículo:** el autor escribe un artículo en Markdown con sus metadatos, lo revisa y lo fusiona a la rama principal; el artículo aparece publicado en el sitio sin pasos manuales.
  - Un frontmatter que incumple el esquema rompe el build: nada se publica a medias.
  - Un artículo marcado como borrador no aparece publicado, ni en portada ni en el feed.
- **CU-2 — Leer un artículo:** el lector llega al artículo desde la portada y lo lee con la identidad de Fronteando —prosa y código legibles, código copiable en un gesto.
- **CU-3 — Descubrir el sitio:** quien llega por primera vez encuentra una portada que presenta el blog con identidad propia y lista sus artículos por fecha.
  - Una URL inexistente responde con una página de error acorde al tono del sitio.
- **CU-4 — Compartir un artículo:** al compartir el enlace, la tarjeta muestra una imagen generada con el fondo de la identidad y el título del artículo; la misma plantilla corona la página como hero.
  - Cada artículo publicado tiene su imagen; ningún borrador la genera.
- **CU-5 — Seguir el blog:** un lector o una herramienta consume el feed RSS y recibe los artículos nuevos.

## Comportamiento esperado

- **Publicación:** fusionar a la rama principal publica el sitio sin intervención manual; un frontmatter inválido rompe el build; los borradores nunca son públicos.
- **Identidad:** toda página usa la identidad declarada en la guía de estilo; nada se sirve con la apariencia por defecto del generador.
- **Lectura:** la prosa y el código cumplen el contrato de experiencia —contraste, medida de línea, foco visible—; cada bloque copiable lo hace en un gesto con confirmación.
- **Imágenes:** cada artículo publicado obtiene en build su imagen —la misma plantilla para el hero y para la tarjeta de compartir— referenciable por URL absoluta.
- **Descubribilidad:** la portada lista solo artículos publicados por fecha; el mapa del sitio, robots y el feed se regeneran en cada build.

## Criterios de éxito

- El blog responde en su URL pública con identidad propia y un primer artículo navegable desde la portada.
- Compartir un artículo produce una tarjeta con imagen reconocible de Fronteando.
- El feed RSS lista los artículos publicados.
- Publicar es fusionar: no existe paso manual entre el Markdown y la página servida.

## Fuera de alcance

- El material de acompañamiento LLM y las salidas para máquinas: pertenecen a las ideas hermanas del bloque inicial.
- Demos interactivas, newsletter visible al lector, comentarios, búsqueda y versiones en otros idiomas.
- Más allá del primer artículo: el catálogo de contenido no es parte de este conjunto.
