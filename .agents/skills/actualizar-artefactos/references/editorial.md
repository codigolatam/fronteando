# Reglas del índice del planeador editorial

Reglas del artefacto «índice del planeador editorial»: el tablero kanban del pipeline de contenido. Hogar: `actualizar-artefactos`; consumidor: `gestionar-piezas`.

## Ubicación y literales

- El índice es `docs/editorial/README.md`.
- Los literales llevan los valores del proyecto; un proyecto que difiere los edita aquí.

## Formato del artefacto

- Un documento Markdown con un preámbulo —título y comentarios de formato— seguido de secciones `## `.
- Las secciones del kanban son los cinco estados de la pieza: `## idea`, `## lista`, `## en redacción`, `## en revisión`, `## publicado`; la última sección es `## series`, lista plana que no codifica estado por posición.
- Cada ítem es una línea de primer nivel que empieza por `- ` —`- [<título>](piezas/<slug>.md)` para piezas, `- [<título>](series/<slug>.md) — <estado>` para series—; la posición de la línea de pieza bajo su sección declara el estado del kanban.
- Una línea en blanco separa bloques: encabezados `## ` llevan blanco antes y después, y no hay blancos repetidos.

## Operaciones

El agente muta el archivo directamente siguiendo estas reglas; cada una es escritura canónica —reescribe solo lo que declara— y falla sin escribir ante lo no localizable.

En las tres operaciones, `<texto>` debe casar por subcadena con **exactamente una** línea `- ` dentro de las secciones del índice (el preámbulo no cuenta) y `<sección>`/`<estado>` casa por igualdad exacta con el encabezado `## `. Cero o varios casamientos, o sección ausente: fallo con diagnóstico y sin escribir.

### `mover <estado> <texto>`

Mueve la línea casada al final de la lista de `## <estado>` —tras el último ítem de la sección, antes del siguiente encabezado o del final del archivo—. Idempotente sobre una línea que ya está en la sección destino.

### `retirar <texto>`

Elimina la línea casada. Es la operación del cierre de serie.

### `añadir <sección> <línea>`

Añade `<línea>` al final de `## <sección>`. La línea debe empezar por `- `; sin el prefijo es invocación inválida. Idempotente: si la línea exacta ya figura en cualquier sección, no duplica.

### Normalización

Toda mutación termina normalizando los blancos del documento: una línea en blanco antes y después de cada encabezado `## ` —incluido el blanco tras el encabezado de una sección que quedó o estaba vacía— y sin líneas en blanco repetidas.
