# Sitio base del blog: el lugar donde publicar los artículos

> **Tipo:** idea de funcionalidad — épica (complejidad media)
> **Fecha:** 2026-10
> **Orden sugerido:** 1 de 5 (bloque inicial) — sin el sitio nada de lo demás se manifiesta; es la línea que estructura a todas las hermanas.

## Problema

Fronteando hoy es solo una intención: no existe el lugar donde los artículos puedan vivir. Quien quiera escribir no tiene dónde dejar su texto con control, historial y revisión antes de publicar; quien quiera leer no tiene adónde llegar. Todo lo que el blog quiere ser —el aprendizaje acompañado, los ejemplos de código, la relación con sus lectores— queda en suspenso mientras no haya un sitio que lo sostenga.

Al equipo que lo gestiona le pesa además una exigencia concreta: el contenido debe ser propio, estar bajo su control y costar poco de mantener — el proyecto arranca de cero, sin infraestructura ni audiencia previa que lo condicionen.

## Qué desbloquea

- **La publicación misma:** convertir un artículo escrito en una página que cualquiera puede visitar.
- **El hogar del contenido:** un repositorio donde los textos viven con su historia, su revisión y su esquema.
- **La identidad del sitio:** la cara visible de Fronteando, con la guía de estilo ya declarada en `DESIGN.md` como contrato.
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
