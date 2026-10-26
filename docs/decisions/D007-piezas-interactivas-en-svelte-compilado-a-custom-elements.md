# D007: Piezas interactivas escritas en Svelte compilado a custom elements

## Estado

Aceptada

## Contexto

La tarea 028 entregó el mecanismo de piezas interactivas con una pieza
de referencia escrita en DOM imperativo: estilos como cadena, markup
por `createElement` y wiring a mano en un solo `index.ts`. Durante la
revisión, el usuario pidió mejor división de las partes y abrió la
puerta a un paso de build adicional con un framework de componentes
compilados.

Las alternativas evaluadas fueron: Svelte 5 en modo custom elements
(componente de un archivo con script, markup y estilos scoped que
compila a un elemento real, precedente directo en las figuras de
Distill); split `?raw` sin dependencias (`piece.html` + `piece.css` +
`index.ts`, que mantiene las piezas en vanilla inspeccionable); y
reestructura interna del archivo único. En contra de Svelte pesaba la
tensión editorial: las piezas del blog demuestran técnicas vanilla, y
un framework podía socavar ese punto.

## Decisión

Las piezas se escriben en Svelte compilado a custom elements: cada
artefacto `site/src/demos/<nombre>/` combina un `piece.svelte` con
`<svelte:options customElement="…" />` y un `index.ts` adaptador que
lo importa y lo anexa en `mount`. El componente crea su propio shadow
con los estilos scoped dentro del shadow del anfitrión
`fronteando-demo`, y los tokens `--*` de `DESIGN.md` heredan a través
de ambos límites.

## Consecuencias

- `@astrojs/svelte` y `svelte` entran como dependencias de build; el
  runtime solo viaja en el chunk lazy de cada pieza y los artículos
  sin demos no pagan nada.
- El contrato `mount(host, container)` del mecanismo no cambia: una
  pieza puede seguir escribiéndose en vanilla si el caso lo pide.
- `EDITORIAL.md` documenta el patrón como convenio de autoría.
