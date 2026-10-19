# D005: La serie es la épica editorial y la pieza la unidad publicable

## Estado

Aceptada

## Contexto

El planeador editorial (`docs/editorial/`) rastrea contenido en un
kanban de cinco estados (`idea` → `lista` → `en redacción` →
`en revisión` → `publicado`) con un archivo por pieza. La primera
pieza real del sistema, la serie MVC, resultó ser un arco de varios
posts: el pipeline completo está construido por post (pieza → tarea
`contenido` → brief → artículo → publicado) y una tarjeta-arco en el
kanban no puede expresar el progreso por unidad publicable (post 1
publicado, post 2 en redacción, post 3 sin arrancar).

## Decisión

El planeador tiene dos entidades, espejo del modelo épica/tarea del
desarrollo:

- **Pieza** (`piezas/<slug>.md`): la unidad publicable. Ocupa el
  kanban y declara opcionalmente `- serie: <slug>` cuando es un post
  de un arco.
- **Serie** (`series/<slug>.md`): el arco, con marco propio
  (pregunta del arco, ángulo, soporte a nivel de serie), la lista
  `## Piezas` de sus posts y ciclo propio `propuesta` → `en curso` →
  `cerrada`. No es publicable, así que no ocupa el kanban: figura en
  la sección `## series` del índice con el estado como sufijo de la
  línea, y la línea se retira al cerrarla.

`planear-post` sigue el campo `- serie:` de la pieza y lee el archivo
de la serie como marco del arco, para que los briefs de un mismo arco
sean coherentes entre sí.

## Justificación

La unidad que el kanban debe rastrear con verdad es la publicable.
Fragmentar el arco en una pieza por post mantiene el tablero honesto
por unidad publicada sin cargarlo con intenciones no publicables; la
serie queda como registro permanente del marco que da coherencia a
los posts entre sí. El estado del arco viaja como sufijo en la línea
porque la posición en la sección plana no lo codifica.
