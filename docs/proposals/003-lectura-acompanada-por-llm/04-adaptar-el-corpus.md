# Adaptar el corpus publicado a la lectura acompañada

## Tipo

mantenimiento

## Objetivo

Declarar el acompañamiento en los tres artículos publicados para que el
blog entero presente la funcionalidad, sin alterar su contenido
editorial más allá de las marcas de pausa.

## Dependencias

- Borrador 03 — la adaptación se verifica sobre la experiencia ya
  renderizada.

## Entrada

- La convención de declaración del borrador 01 y la experiencia en
  página del borrador 03.
- `site/src/content/articulos/` — `hola-fronteando`,
  `un-store-reactivo-en-vanilla-js` y `carrito-a-lo-bruto`.

## Resultado esperado

- Cada artículo publicado que lo amerite lleva su declaración —contexto
  y pausas— y muestra la tarjeta y las marcas.

## Criterios de calidad

- Las pausas caen en puntos pedagógicos reales —donde verificar la
  comprensión aporta, no donde quepan—.
- El contenido editorial no cambia salvo las marcas de pausa y los
  metadatos de declaración.
- `check`, `lint` y `build` en verde.

## Procedimiento sugerido

1. Por artículo: decidir el contexto —nivel del lector, prerequisitos—
   y las pausas con qué se verifica en cada una.
2. Declararlas y verificar el render de cada artículo.

## Notas

- El post `meta` —«Hola, Fronteando»— puede declarar contexto sin
  pausas, o quedar sin acompañamiento si la pieza no lo amerita: la
  declaración opt-in también cubre el caso de no acompañar.
