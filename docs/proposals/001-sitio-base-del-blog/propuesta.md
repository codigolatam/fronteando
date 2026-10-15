# Sitio base del blog

## Estado

[ ] Borrador | [p] Pendiente de revisión | **[a] Aprobada** | [d] Descartada

## Problema

Fronteando hoy es solo una intención: no existe el lugar donde los artículos puedan vivir. Quien quiera escribir no tiene dónde dejar su texto con el control que el proyecto pide —contenido propio, con historial y revisión antes de publicar—; quien quiera leer no tiene adónde llegar. Todo lo que el blog quiere ser —el aprendizaje acompañado, los ejemplos de código, la relación con sus lectores— queda en suspenso mientras no haya un sitio que lo sostenga.

Hay además un segundo vacío, menos visible pero igual de real: Fronteando no tiene cara. El diseño esbozado hasta ahora —la guía de estilo declarada en `DESIGN.md`— es una base deliberadamente neutra: valores funcionales que harían al sitio indistinguible de cualquier otro blog técnico. Un medio vive también de ser reconocible: quien llega por primera vez debería encontrar un lugar con identidad propia, y hoy esa identidad no existe.

No resolverlo tiene un coste doble: no se puede publicar nada y, si se publicara sobre la base neutra, el blog existiría sin ser reconocible —un sitio más, sin la cara que su propuesta editorial merece.

## Oportunidad

Resolverlo funda el proyecto: da a los artículos un hogar bajo control propio —con historial y revisión— y a Fronteando la identidad visual que lo haga reconocible desde la primera visita. Supera a la alternativa ya descartada de publicar en plataformas de terceros, que no admiten el control del contenido, las demos ni el material de acompañamiento que la línea editorial exige; y supera también a montar el sitio sobre la base neutra actual, que resolvería el dónde pero no el quién.

## Forma de solución

El blog existe como sitio propio: quien escribe publica artículos desde el repositorio —con control, historial y revisión— y quien lee encuentra un lugar rápido con una identidad visual reconocible, no una plantilla neutra. Categoría: producto nuevo —se crea el subsistema completo que hoy no existe; las piezas internas no se distinguen como cambios porque no hay nada que cambiar—.

## Solución

Se crea el subsistema del blog dentro de este repositorio: un proyecto Astro que compila artículos escritos en Markdown a HTML estático servido desde una CDN, publicado por despliegue continuo desde la rama principal. El código del sitio vive en su propio directorio (`site/`), separado de los artefactos de gestión del proyecto que ya ocupan la raíz.

Sobre ese esqueleto se desarrolla la identidad visual del blog —evolucionando la guía de estilo `DESIGN.md` de base neutra a contrato distintivo en diálogo con el usuario— y se materializa en el tema y el layout. Encima se construyen la colección de artículos con su esquema validado y su página de lectura, la portada con el índice y los metadatos de descubribilidad, el feed RSS que la newsletter futura automatizará y el generador de imágenes de artículo: a partir de una plantilla con el fondo de la identidad y el título, cada artículo publica su imagen como cabecera hero y como recurso de compartir vía Open Graph. El sitio se entrega funcionando en su URL pública con un primer artículo publicado.

## Alternativas consideradas

- Plataforma de terceros (Medium, dev.to, Hashnode, Substack): se descarta porque no admite el control del contenido, las demos interactivas ni el material de acompañamiento que exige la línea editorial —el brief ya la evaluó y la descartó por eso.
- Sitio sobre la base neutra tal cual: montar el blog aplicando `DESIGN.md` sin desarrollar identidad. Se descarta porque resolvería el dónde pero no el quién: el sitio existiría siendo indistinguible, que es justo el segundo vacío del problema.
- CMS o constructor alojado (WordPress, Webflow, Ghost gestionado): se descarta porque renuncia al contenido en repositorio con historial y revisión, y ata el blog a una plataforma ajena que la infraestructura mínima del brief no necesita.

## Fuera de alcance

- El material de acompañamiento LLM —protocolo de inicio, checkpoints, card—: es la idea `lectura-acompanada-por-llm`.
- Las salidas para máquinas —versiones `.md` por artículo, `llms.txt`—: es la idea `blog-legible-para-maquinas`.
- Las demos de código ejecutables: es la idea `demos-de-codigo-ejecutables`.
- La newsletter y su formulario de suscripción: es la idea `newsletter`.
- El catálogo de contenido real: el sitio se entrega con su estructura, su identidad y un primer artículo, no con artículos escritos.
- Interacción del lector —comentarios, búsqueda— y versiones en otros idiomas.

## Investigaciones de apoyo

- `docs/research/2026-10-generacion-automatica-imagenes-og-hero.md` — patrón y alternativas para generar imágenes OG y hero automáticamente en build en un sitio Astro.

## Borradores

- `docs/tasks/001-andamiaje-del-sitio.md` — andamiaje del sitio con Astro
- `docs/tasks/002-despliegue-continuo-a-cdn.md` — despliegue continuo a CDN (depende de 001)
- `docs/tasks/003-identidad-visual-del-blog.md` — identidad visual del blog
- `docs/tasks/004-tema-base-y-layout.md` — tema base y layout (depende de 001 y 003)
- `docs/tasks/005-pagina-de-articulo.md` — colección de artículos y página de artículo (depende de 004)
- `docs/tasks/006-portada-e-indice.md` — portada, índice de artículos y metadatos (depende de 005)
- `docs/tasks/007-feed-rss.md` — feed RSS (depende de 005)
- `docs/tasks/008-imagenes-de-articulo.md` — imágenes de artículo: hero y Open Graph (depende de 005 y 006)

## Revisión

- Usuario: 2026-10-15 — Aprueba
