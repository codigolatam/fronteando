# Sitio base del blog: el lugar donde publicar los artículos

> **Tipo:** idea de funcionalidad — épica (complejidad media)
> **Fecha:** 2026-10
> **Orden sugerido:** 1 de 5 (bloque inicial) — sin el sitio nada de lo demás se manifiesta; es la línea que estructura a todas las hermanas.
> **Procesada en:** docs/proposals/001-sitio-base-del-blog/propuesta.md

## Problema

Fronteando hoy es solo una intención: no existe el lugar donde los artículos puedan vivir. Quien quiera escribir no tiene dónde dejar su texto con el control que el proyecto pide —contenido propio, con historial y revisión antes de publicar—; quien quiera leer no tiene adónde llegar. Todo lo que el blog quiere ser —el aprendizaje acompañado, los ejemplos de código, la relación con sus lectores— queda en suspenso mientras no haya un sitio que lo sostenga.

Hay además un segundo vacío, menos visible pero igual de real: Fronteando no tiene cara. El diseño esbozado hasta ahora —la guía de estilo declarada en `DESIGN.md`— es una base deliberadamente neutra: valores funcionales que harían al sitio indistinguible de cualquier otro blog técnico. Un medio vive también de ser reconocible: quien llega por primera vez debería encontrar un lugar con identidad propia, y hoy esa identidad no existe.

No resolverlo tiene un coste doble: no se puede publicar nada y, si se publicara sobre la base neutra, el blog existiría sin ser reconocible —un sitio más, sin la cara que su propuesta editorial merece.

## Qué desbloquea

- **La publicación misma:** convertir un artículo escrito en una página que cualquiera puede visitar.
- **El hogar del contenido:** un repositorio donde los textos viven con su historia, su revisión y su esquema.
- **La identidad visual propia:** la cara reconocible de Fronteando, desarrollada sobre la guía de estilo declarada en `DESIGN.md` —hoy una base neutra— como contrato.
- **La base estructural:** el terreno sobre el que se montan el acompañamiento, las salidas para máquinas, las demos y la newsletter.

## Flujos de trabajo que se hacen viables

- El autor escribe un artículo en Markdown dentro del repositorio, lo somete a revisión y lo publica sin tocar infraestructura.
- El lector llega a una página rápida, navega entre artículos y encuentra un sitio con identidad propia.
- El equipo despliega a una CDN sin servidor ni base de datos que mantener, con costo mínimo o nulo.

## Ventajas como producto

- **Base estructural:** todas las demás líneas del producto se apoyan aquí; hacerla bien simplifica todo lo que viene.
- **Control editorial:** el contenido es del proyecto desde el primer artículo, con la trazabilidad que un medio serio necesita.
- **Rendimiento como rasgo:** un sitio estático rápido no es solo técnica: es la primera impresión de un blog que habla de rendimiento.

## Tensión que introduce en el roadmap

Condiciona a todas sus hermanas: `lectura-acompanada-por-llm`, `blog-legible-para-maquinas`, `demos-de-codigo-ejecutables` y `newsletter` necesitan el sitio para existir. La tensión real es de alcance: la tentación es absorber el acompañamiento dentro del montaje inicial, cuando conviene que el sitio base entregue el blog mínimo publicable y deje el diferenciador para su propia línea.
