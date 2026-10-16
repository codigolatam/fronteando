# Sitio base del blog

## Estado

[x] Planificada | [ ] Completada

## Objetivo

Fronteando existe como sitio público: los artículos escritos en Markdown se compilan a páginas con identidad visual propia, se publican por despliegue continuo sin pasos manuales y el lector encuentra portada, lectura legible, feed RSS e imágenes generadas —con un primer artículo ya en el aire.

## Alcance

- **Dentro:** andamiaje Astro en `site/`, despliegue continuo a CDN, evolución de `DESIGN.md` a identidad propia, tema y layout, colección de artículos con página de lectura, portada con metadatos, feed RSS y generador de imágenes hero/OG.
- **Fuera:** acompañamiento LLM (idea `lectura-acompanada-por-llm`), salidas `.md`/`llms.txt` (`blog-legible-para-maquinas`), demos interactivas (`demos-de-codigo-ejecutables`), newsletter (`newsletter`), catálogo de contenido, comentarios, búsqueda y otros idiomas.

## Piezas

- [ ] docs/tasks/001-andamiaje-del-sitio.md — andamiaje del sitio con Astro
- [ ] docs/tasks/002-despliegue-continuo-a-cdn.md — despliegue continuo a CDN
- [ ] docs/tasks/003-identidad-visual-del-blog.md — identidad visual del blog
- [ ] docs/tasks/004-tema-base-y-layout.md — tema base y layout
- [ ] docs/tasks/005-pagina-de-articulo.md — colección de artículos y página de artículo
- [ ] docs/tasks/006-portada-e-indice.md — portada, índice de artículos y metadatos
- [ ] docs/tasks/007-feed-rss.md — feed RSS
- [ ] docs/tasks/008-imagenes-de-articulo.md — imágenes de artículo: hero y Open Graph
- [ ] docs/tasks/009-urls-de-preview-de-rama.md — URLs de preview de rama

## Plan técnico

- **Orden:** 001 andamiaje → 002 despliegue (publica el esqueleto y valida la tubería) ∥ 003 identidad (trabajo de documento, en paralelo) → 004 tema → 005 artículo → 006 portada ∥ 007 RSS → 008 imágenes.
- **Dependencias:** 002 necesita 001; 004 necesita 001 y 003; 005 necesita 004; 006 y 007 necesitan 005; 008 necesita 005 y 006. 001 y 003 no tienen dependencias y pueden arrancar en paralelo.
- **Decisiones transversales:**
  - Todo lo derivado se produce en build time —imágenes, feed, mapa del sitio—: no hay runtime.
  - El código del sitio vive en `site/`, separado de los artefactos de gestión del proyecto.
  - `DESIGN.md` es el contrato verificable: todo valor visual referencia sus tokens; `aplicar-guia-estilo` valida cada pieza de frontend.
  - El esquema de la colección es la frontera donde la idea `lectura-acompanada-por-llm` declarará sus campos después: no se anticipan.
  - Despliegue continuo: cada merge a la rama principal publica; 002 lo establece sobre el esqueleto.
  - El primer artículo sirve de banco end-to-end del pipeline.

## Criterio de cierre

El blog está publicado en su URL pública con identidad propia, un primer artículo navegable desde la portada, feed RSS activo e imagen hero/OG generada automáticamente por artículo.

## Revisión

- Usuario: 2026-10-15 — Aprueba
