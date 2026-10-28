# Escribir el capítulo 5 de la serie MVC y cerrar el arco

## Estado

**[!] Bloqueada** | [ ] Pendiente | [~] En progreso | [r] En revisión | [x] Completada

## Tipo

contenido

## Objetivo

Llevar la pieza «Los límites del MVC a mano» (`docs/editorial/piezas/mvc-limites.md`) por el flujo de escritura completo —encuadre → redacción → revisión editorial → publicación— y cerrar el arco de la serie. El capítulo estresa el carrito MVC hasta que el patrón cede (vistas parciales, renders en cascada, suscriptores que se pisan) y deja el mapa de límites: qué problema resolvió después la reactividad.

## Dependencias

- docs/tasks/033-capitulo-4-serie-mvc.md

## Entrada

- La pieza del planeador: `docs/editorial/piezas/mvc-limites.md`, en estado `lista`.
- La serie: `docs/editorial/series/mvc-en-vanilla-js.md`.
- El capítulo 4 publicado (el código de partida: el carrito MVC completo).
- El post del mini-store publicado: `site/src/content/articulos/un-store-reactivo-en-vanilla-js.md` (el puente natural del cierre).
- Las referencias del género: `docs/research/2026-10-referencias-mvc-vanilla-js.md` (el caveat de boilerplate es tropo del género que este capítulo puede usar).
- `EDITORIAL.md`: voz, registro, anatomía del post y título descriptivo.
- La lección `docs/lessons/espanol-del-blog.md`: español latinoamericano neutro y giros idiomáticos, no calcos del inglés.

## Resultado esperado

- Un nuevo artículo publicado: el capítulo 5 y cierre de la serie, con su previo, feed y OG.
- La pieza pasa de `lista` a `publicado` en el planeador, y el documento de la serie se marca como completada.
- El código del post corre tal cual.

## Criterios de calidad

- Los límites se demuestran con código que corre (vistas parciales, suscriptores que se pisan), no solo se afirman.
- El cierre enlaza de vuelta al post del mini-store donde encaje, sin forzarlo.
- El mapa de límites es honesto: qué aguanta el MVC a mano y qué problema resolvió la reactividad.
- El título es idiomático en español y descriptivo, sin calcos del inglés.
- Todo el código del post corre tal cual; `check`, `lint`, `format:check` y `build` en verde.
- El artículo cumple `EDITORIAL.md`, verificado por la revisión editorial.

## Procedimiento sugerido

1. Ejecutar el flujo de contenido: `planear-post` (encuadre aprobado) → `redactar-post` → `revisar-post`.
2. Llevar la pieza a `en redacción` y `en revisión` mediante `gestionar-piezas`, según avance el flujo.
3. Publicar y mover la pieza a `publicado` con el paquete de cierre, y marcar la serie como completada.

## Notas

- Título de trabajo del capítulo: «Los límites del MVC a mano» (título de la pieza en el planeador; el definitivo se decide en el encuadre).
- Es el cierre del arco: al publicarse, la serie pasa a completada y el hito del índice se agota (`cerrar-conjunto`).

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
