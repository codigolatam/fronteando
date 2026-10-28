# Escribir el capítulo 4 de la serie MVC

## Estado

**[!] Bloqueada** | [ ] Pendiente | [~] En progreso | [r] En revisión | [x] Completada

## Tipo

contenido

## Objetivo

Llevar la pieza «El Controlador: cerrar el ciclo» (`docs/editorial/piezas/mvc-controlador.md`) por el flujo de escritura completo —encuadre → redacción → revisión editorial → publicación—. El capítulo traduce los manejadores de eventos a acciones sobre el modelo y cierra el ciclo: evento → acción → modelo → notificación → vista.

## Dependencias

- docs/tasks/032-capitulo-3-serie-mvc.md

## Entrada

- La pieza del planeador: `docs/editorial/piezas/mvc-controlador.md`, en estado `lista`.
- La serie: `docs/editorial/series/mvc-en-vanilla-js.md`.
- El capítulo 3 publicado (el código de partida: el modelo que notifica y el `render` como función del estado).
- `EDITORIAL.md`: voz, registro, anatomía del post y título descriptivo.
- La lección `docs/lessons/espanol-del-blog.md`: español latinoamericano neutro y giros idiomáticos, no calcos del inglés.

## Resultado esperado

- Un nuevo artículo publicado: el capítulo 4 de la serie, con su previo, feed y OG.
- El carrito completo con las tres piezas separadas: handlers que solo invocan acciones y un componente que ya se puede mantener y extender.
- La pieza pasa de `lista` a `publicado` en el planeador, y la serie refleja el avance.
- El código del post corre tal cual.

## Criterios de calidad

- Los manejadores de eventos solo invocan acciones sobre el modelo; nada toca estado y DOM a discreción.
- El ciclo evento → acción → modelo → notificación → vista queda cerrado y nombrado en el texto.
- El título es idiomático en español y descriptivo, sin calcos del inglés.
- Todo el código del post corre tal cual; `check`, `lint`, `format:check` y `build` en verde.
- El artículo cumple `EDITORIAL.md`, verificado por la revisión editorial.

## Procedimiento sugerido

1. Ejecutar el flujo de contenido: `planear-post` (encuadre aprobado) → `redactar-post` → `revisar-post`.
2. Llevar la pieza a `en redacción` y `en revisión` mediante `gestionar-piezas`, según avance el flujo.
3. Publicar y mover la pieza a `publicado` con el paquete de cierre.

## Notas

- Título de trabajo del capítulo: «El Controlador: cerrar el ciclo» (título de la pieza en el planeador; el definitivo se decide en el encuadre).
- La pieza cierra con la pregunta abierta «¿esto escala?», que prepara el capítulo 5.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
