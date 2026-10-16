# D002: Previo de artículos desde el cuerpo con marcador `<!--more-->`

## Estado

Aceptada

## Contexto

La portada lista los artículos con un previo. El `description` del
frontmatter cumple otra función —resumen corto para metadatos y
tarjetas sociales— y no sirve como vista del contenido. Las
estrategias habituales van del párrafo inicial automático (Jekyll,
Hugo) al delimitador explícito (`<!--more-->` de WordPress, Pagecord y
la práctica extendida en Astro) y a un campo `excerpt` dedicado.

## Decisión

Derivamos el previo de cada artículo de su cuerpo Markdown: todo lo
anterior a un marcador `<!--more-->` en línea propia, o el primer
párrafo cuando no hay marcador. El previo se sirve como texto plano
despojado de markup, con `description` como respaldo si sale vacío.

## Justificación

El delimitador es la convención más extendida en publicaciones
técnicas: da control editorial exacto sobre dónde corta el previo sin
un campo nuevo que escribir y mantener, y es invisible en el artículo
publicado. El fallback al primer párrafo deja el previo a coste cero
en los artículos sin marcador. Texto plano porque los listados de las
publicaciones técnicas (Medium, dev.to) muestran previos sin formato y
Astro no expone un renderizador de fragmentos. Frente a un campo
`excerpt` en el frontmatter: duplicaría escritura y se desactualizaría
del cuerpo.

Consecuencias: un artículo cuyo lead no lo represente debe usar el
marcador; el previo pierde el formato inline —enlaces y código quedan
como texto—, aceptable en una tarjeta de índice.

## Referencias

- `docs/tasks/006-portada-e-indice.md`
- `site/src/utils/excerpt.ts`
