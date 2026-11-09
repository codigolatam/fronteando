# Escribir el capítulo 3 de la serie MVC

## Estado

[ ] Pendiente | [~] En progreso | **[r] En revisión** | [x] Completada | [!] Bloqueada

## Tipo

contenido

## Objetivo

Llevar la pieza «La Vista: el render como función del estado» (`docs/editorial/piezas/mvc-vista.md`) por el flujo de escritura completo —encuadre → redacción → revisión editorial → publicación—. El capítulo refactoriza el carrito sobre el modelo del capítulo 2: un `render(modelo)` regenera la vista completa y desaparece la manipulación dispersa del DOM.

## Dependencias

- docs/tasks/031-capitulo-2-serie-mvc.md

## Entrada

- La pieza del planeador: `docs/editorial/piezas/mvc-vista.md`, en estado `lista`.
- La serie: `docs/editorial/series/mvc-en-vanilla-js.md`.
- El capítulo 2 publicado: `site/src/content/articulos/sacar-el-estado-del-dom.md` (el código de partida: el modelo `Carrito` que notifica a sus suscriptores).
- `EDITORIAL.md`: voz, registro, anatomía del post y título descriptivo.
- La lección `docs/lessons/espanol-del-blog.md`: español latinoamericano neutro y giros idiomáticos, no calcos del inglés.

## Resultado esperado

- Un nuevo artículo publicado: el capítulo 3 de la serie, con su previo, feed y OG.
- La pieza pasa de `lista` a `publicado` en el planeador, y la serie refleja el avance.
- El código del post corre tal cual.

## Criterios de calidad

- La vista se regenera desde el modelo: un `render` produce el HTML completo a partir del estado, sin manipulación del DOM repartida por el código.
- La notificación del modelo dispara el redibujado.
- El título es idiomático en español y descriptivo, sin calcos del inglés.
- Todo el código del post corre tal cual; `check`, `lint`, `format:check` y `build` en verde.
- El artículo cumple `EDITORIAL.md`, verificado por la revisión editorial.

## Procedimiento sugerido

1. Ejecutar el flujo de contenido: `planear-post` (encuadre aprobado) → `redactar-post` → `revisar-post`.
2. Llevar la pieza a `en redacción` y `en revisión` mediante `gestionar-piezas`, según avance el flujo.
3. Publicar y mover la pieza a `publicado` con el paquete de cierre.

## Notas

- Título de trabajo del capítulo: «La Vista: el render como función del estado» (título de la pieza en el planeador; el definitivo se decide en el encuadre).
- Candidata natural a pieza interactiva: una vista instrumentada que haga visible la notificación del modelo en vivo (conversado en la tarea 031; la decisión corresponde al encuadre, no es requisito previo).

## Encuadre

- **Brief:** `docs/editorial/briefs/la-vista-como-funcion-del-estado.md` — aprobado 2026-10-28
- **Promesa:** «después de leer esto, el lector podrá convertir el código que pinta su componente en un `render(modelo)` que regenera la vista completa (el primer pintado incluido) y entender qué queda por separar»

## Desviaciones del brief

- El registro en vivo de la pieza usa una línea fija «render inicial» fuera de la lista de notificaciones, en lugar de una entrada más del registro: así el mensaje no se desplaza cuando el registro llega a su tope de cinco entradas.
- El bloque `text` del resultado primero muestra estados de pantalla («0 ítems / $0») en lugar de salida de consola, porque el programa del capítulo pinta en el DOM y no imprime nada.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
