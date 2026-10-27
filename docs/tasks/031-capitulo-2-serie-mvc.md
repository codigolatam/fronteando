# Escribir el capítulo 2 de la serie MVC

## Estado

[ ] Pendiente | [~] En progreso | **[r] En revisión** | [x] Completada | [!] Bloqueada

## Tipo

contenido

## Objetivo

Llevar la pieza «Sacar el estado del DOM: un modelo que notifica sus cambios» (`docs/editorial/piezas/mvc-modelo.md`) por el flujo de escritura completo —encuadre → redacción → revisión editorial → publicación—. El capítulo refactoriza el carrito del capítulo 1 para que los ítems y el total vivan en un modelo que notifica a sus suscriptores, sin tocar el DOM.

## Dependencias

- docs/tasks/018-validar-flujo-con-post-mvc.md

## Entrada

- La pieza del planeador: `docs/editorial/piezas/mvc-modelo.md`, en estado `lista`.
- La serie: `docs/editorial/series/mvc-en-vanilla-js.md`.
- El capítulo 1 publicado: `site/src/content/articulos/carrito-a-lo-bruto.md` (el código de partida).
- `EDITORIAL.md`: voz, registro, anatomía del post y título descriptivo.
- La lección `docs/lessons/espanol-del-blog.md`: español latinoamericano neutro y giros idiomáticos, no calcos del inglés.

## Resultado esperado

- Un nuevo artículo publicado: el capítulo 2 de la serie, con su previo, feed y OG.
- La pieza pasa de `lista` a `publicado` en el planeador, y la serie refleja el avance.
- El código del post corre tal cual.

## Criterios de calidad

- El modelo se lee y se prueba sin tocar el DOM.
- El título es idiomático en español y descriptivo, sin calcos del inglés.
- Todo el código del post corre tal cual; `check`, `lint`, `format:check` y `build` en verde.
- El artículo cumple `EDITORIAL.md`, verificado por la revisión editorial.

## Procedimiento sugerido

1. Ejecutar el flujo de contenido: `planear-post` (encuadre aprobado) → `redactar-post` → `revisar-post`.
2. Llevar la pieza a `en redacción` y `en revisión` mediante `gestionar-piezas`, según avance el flujo.
3. Publicar y mover la pieza a `publicado` con el paquete de cierre.

## Notas

- Título de trabajo del capítulo: «Sacar el estado del DOM: un modelo que notifica sus cambios». Se revisó dos veces por idiomaticidad: «el estado que notifica» y «avisa» eran calcos del inglés («notificar» es el verbo instalado del patrón en español, verificado en fuentes técnicas en español).

## Encuadre

- **Brief:** `docs/editorial/briefs/sacar-el-estado-del-dom.md` — aprobado 2026-10-26
- **Promesa:** «después de leer esto, el lector podrá sacar el estado de su componente a un modelo que notifica sus cambios, y probar esa lógica sin tocar el DOM»

## Desviaciones del brief

- Se añadió la sección «Conectar el modelo con la pantalla» con el suscriptor que pinta a mano: el brief lo declaraba en el alcance, pero no en el outline. No cambia la promesa.
- El resultado primero muestra el programa y su salida antes de la clase, como pide la anatomía; el orden del outline se mantuvo.
- La edición de cantidad queda fuera de este capítulo: el método `cambiarCantidad` se retiró del modelo y el ejemplo conductor del brief se ajustó a catálogo, añadir, quitar y total. Decisión del usuario tras la revisión editorial (la alternativa era mostrar la edición en el post).

## Revisión

- Subagente (revisión editorial, ronda 1): 2026-10-26 — Solicita cambios
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
