---
name: gestionar-piezas
description: >
  Gestiona el planeador editorial del blog (el pipeline de contenido
  de docs/editorial/): captura e idea piezas (posibles artículos),
  las promueve de idea a lista verificando sus tres requisitos
  (pregunta del lector, ángulo y soporte) y las mueve por los estados
  del kanban hasta publicado. Usar para dar de alta una idea de
  post, madurar una pieza, arrancar su escritura o actualizar su
  estado en el pipeline.
  Sinónimos: gestor del planeador, planeador editorial, pipeline de
  contenido, backlog editorial, pieza de contenido, kanban editorial.
---

# Gestionar piezas

Instrucciones para que un agente gestione el planeador editorial: el pipeline de contenido que vive en `docs/editorial/` (un índice kanban por estados en `README.md` y un archivo por pieza en `piezas/<slug>.md`). El gestor tiene cuatro operaciones: capturar una pieza, idear en lote, promover de `idea` a `lista` y mover entre estados. Es la frontera que los skills del flujo de escritura (`planear-post`, `redactar-post`, `revisar-post`) ya nombran: ellos ejecutan el contenido; este gestor mueve los marcadores del tablero.

## Cuándo usar

- Cuando el usuario trae una idea de post: capturarla como pieza en `idea`.
- Cuando el usuario pida generar ideas de contenido en lote (lluvia de ideas editorial).
- Cuando una pieza maduró lo suficiente para escribirla: promoverla a `lista`.
- Cuando una pieza `lista` arranca su escritura (a `en redacción`), entra en revisión (a `en revisión`) o se publica (a `publicado`); el ejecutor general informa el cambio y este gestor lo materializa.

## Cuándo no usar

- Para ideas de producto o de siguientes líneas del proyecto: esas van a `docs/ideas/` por `lluvia-de-ideas`.
- Para encuadrar, redactar o revisar el post: eso es el pipeline de nivel 2 (`planear-post`, `redactar-post`, `revisar-post`); el gestor solo mueve el marcador.
- Para crear la tarea `contenido` como tal: la da de alta `crear-tareas`; el gestor la enlaza.
- Para mutaciones mecánicas de los artefactos: se delegan en `consultar-artefactos` y `actualizar-artefactos`.

## Entrada

- La petición del usuario (una idea suelta, un lote a idear, una promoción, un cambio de estado informado por el ejecutor general).
- `docs/editorial/README.md`: el índice kanban con los cinco estados (`idea` → `lista` → `en redacción` → `en revisión` → `publicado`).
- `docs/editorial/piezas/<slug>.md`: el archivo de cada pieza, con su formato en `assets/pieza.md`.
- `EDITORIAL.md` y el corpus publicado en `site/src/content/articulos/` para idear contra la línea editorial real (pilares, series, precedentes).
- Las capacidades de artefactos: `consultar-artefactos` para lecturas; `actualizar-artefactos` para las mutaciones (`añadir-linea` sobre el índice, `mover` de `editorial.sh`).
- `crear-tareas` para el alta de la tarea `contenido` cuando la pieza entra en redacción.

## Salida

- Piezas capturadas o ideadas en `piezas/<slug>.md` con `estado: idea` y su línea en `## idea` del índice.
- Piezas promovidas a `lista` (los tres requisitos verificados y confirmados por el usuario) o movidas entre los demás estados, con el índice y el campo `estado:` sincronizados.
- Al mover a `en redacción`: la tarea `contenido` enlazada desde la pieza (creada vía `crear-tareas` si no existía).
- O la conclusión de que la operación no procede (pieza sin los tres requisitos, estado inconsistente), comunicada con el motivo.

## Principios rectores

1. **Capturar no es comprometer:** `idea` es la bandeja; una pieza puede nacer con campos `[por madurar]` y quedarse ahí indefinidamente sin coste.
2. **`lista` es la única puerta del nivel 1:** exige los tres requisitos presentes en el archivo (pregunta del lector, ángulo, soporte; la verificación es mecánica) más la confirmación del usuario (la intención es decisión humana).
3. **La pieza es la fuente, el índice el mapa:** el campo `estado:` de la pieza manda; el índice lo refleja por posición; todo movimiento sincroniza ambos en el mismo gesto.
4. **El gestor mueve marcadores, no escribe:** encuadre, redacción y revisión pertenecen al pipeline de nivel 2; el gestor entrega una tarea `contenido` enlazada y ahí termina.
5. **Separación de dominios:** contenido en `docs/editorial/`, producto en `docs/ideas/`; una pieza que migra de ideas se marca `procesada` en su origen.

## Procedimiento

### Capturar una pieza

1. **Dialogar lo mínimo** para bajar la idea a los campos del formato (qué pregunta responde, qué aportaríamos, con qué se sostiene); lo que no salga queda `[por madurar]` sin drama.
2. **Crear `piezas/<slug>.md`** desde `assets/pieza.md` con `estado: idea` (escritura directa: la pieza es archivo nuevo).
3. **Registrar en el índice** delegando en `actualizar-artefactos` «añadir la línea `- [<título>](piezas/<slug>.md)` a la sección `idea` del índice del planeador».

### Idear en lote

4. **Proponer piezas contra la línea editorial real:** leer `EDITORIAL.md` y el corpus (pilares poco cubiertos, series abiertas, preguntas naturales de la audiencia) y presentar al usuario nombres con una línea por pieza; el usuario filtra antes de escribir.
5. **Escribir cada pieza confirmada** como en capturar (una por archivo, todas en `idea`). Algunas pueden nacer ya con los tres campos y promoverse a `lista` en el mismo gesto si el usuario lo confirma.

### Promover a `lista`

6. **Verificar los tres requisitos** en el archivo de la pieza: pregunta del lector, ángulo y soporte presentes y con contenido real (no `[por madurar]`). Si falta alguno, madurar en diálogo con el usuario rellenando el archivo; la pieza sigue en `idea` hasta completarse.
7. **Confirmar con el usuario** la promoción (pasar a `lista` declara intención de escribirla).
8. **Sobre el sí:** actualizar `- estado: lista` en la pieza (escritura directa) y mover su línea en el índice delegando «mover la línea de la pieza a la sección `lista` del índice del planeador» en `actualizar-artefactos` (operación `mover` de `editorial.sh`).

### Mover entre estados

9. **A `en redacción`:** exige una tarea `contenido` que enlace la pieza (si no existe, se da de alta delegando en `crear-tareas`; el enlace a `piezas/<slug>.md` va en la `## Entrada` de la tarea, que es donde `planear-post` lo lee); escribir la línea `**Tarea:**` en la pieza, actualizar su `estado:` y mover la línea del índice. La escritura en sí la arranca el ejecutor general, no el gestor.
10. **A `en revisión` y a `publicado`:** el ejecutor general informa el cambio; el gestor actualiza `estado:` y mueve la línea. En `publicado` la línea del índice se reescribe por edición directa para enlazar el artículo resultante (`site/src/content/articulos/<slug>.md`) en lugar de la pieza, como ya hace la entrada del store.
11. **Estados inconsistentes:** si la pieza y el índice discrepan, el archivo manda y el índice se corrige; si la pieza no existe o el texto casa más de una línea, `mover` falla y se resuelve manualmente antes de seguir.

## Finalización

El skill ha terminado cuando:

- La operación pedida quedó materializada (pieza capturada/ideada/promovida/movida) con índice y `estado:` sincronizados, o
- Se informó de que no procede (requisitos faltantes, inconsistencia irresoluble) con el motivo.

## Referencias

- `assets/pieza.md` — La plantilla del archivo de pieza.
- `docs/research/2026-10-procesos-gestion-editorial.md` — Kanban por estados, separación captura/lista y el registro mínimo de idea.
- `docs/decisions/D003-brief-editorial-artefacto-propio.md` — El layout de `docs/editorial/` que el planeador adopta y el `estado` por campos.
- `docs/decisions/D004-el-post-nace-borrador-y-la-revision-lo-publica.md` — Quién mueve a `en revisión` y a `publicado`.
- `.agents/skills/lluvia-de-ideas/SKILL.md` — El patrón de captura por conversación que idear reutiliza (para ideas de producto, no de contenido).
- `.agents/skills/planear-post/SKILL.md` — La primera capacidad del nivel 2; consume la pieza `lista` enlazada desde la tarea.
