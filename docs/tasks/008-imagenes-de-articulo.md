# Imágenes de artículo: hero y Open Graph

## Estado

**[ ] Pendiente** | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

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

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
