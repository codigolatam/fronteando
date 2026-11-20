# Escribir el capítulo 6 de la serie MVC

## Estado

[x] Completada

## Tipo

contenido

## Objetivo

Llevar la pieza «El componente empaquetado: el MVC en una clase» (`docs/editorial/piezas/mvc-componente.md`) por el flujo de escritura completo —encuadre → redacción → revisión editorial → publicación—. Es la coda del arco: la serie separó las piezas para enseñarlas y este capítulo las junta para usar el componente —una clase instanciable cuyos métodos conservan cada uno su rol, con estado privado y ciclo de vida—.

## Dependencias

- Ninguna

## Entrada

- La pieza del planeador: `docs/editorial/piezas/mvc-componente.md`, en estado `lista`.
- La serie: `docs/editorial/series/mvc-en-vanilla-js.md`.
- El capítulo 5 publicado (el código de partida: el carrito MVC completo con sus tres piezas sueltas).
- El post del mini-store publicado: `site/src/content/articulos/un-store-reactivo-en-vanilla-js.md`.
- `EDITORIAL.md`: voz, registro, anatomía del post y título descriptivo.
- Las lecciones del blog: `docs/lessons/espanol-del-blog.md` (giros idiomáticos), `docs/lessons/previos-de-articulos.md`, `docs/lessons/incisos-entre-parentesis.md`, `docs/lessons/idioma-del-codigo.md` y las demás que dispare el contenido.

## Resultado esperado

- Un nuevo artículo publicado: el capítulo 6, coda de la serie, con su previo, feed y OG.
- La pieza pasa de `lista` a `publicado` en el planeador, y la serie se marca `cerrada` al publicarse la última pieza.
- El código del post corre tal cual.

## Criterios de calidad

- La clase demuestra que la separación de responsabilidades sobrevive dentro de un objeto: cada método conserva su rol (el render es función del estado, el manejador delega, el modelo notifica); el empaquetado no se vende como «más simple» sino como instanciación, encapsulamiento y ciclo de vida.
- El resultado primero muestra dos `new Carrito(host)` en la misma página funcionando sin contaminarse.
- La entrada re-ancla el estado del carrito para quien llega días después, sin presumir lectura reciente del capítulo 5.
- El límite honesto enlaza con los componentes reales (custom elements, frameworks) sin sobrevender.
- Todo el código del post corre tal cual; `check`, `lint`, `format:check` y `build` en verde.
- El artículo cumple `EDITORIAL.md`, verificado por la revisión editorial.

## Procedimiento sugerido

1. Ejecutar el flujo de contenido: `planear-post` (encuadre aprobado) → `redactar-post` → `revisar-post`.
2. Llevar la pieza a `en redacción` y `en revisión` mediante `gestionar-piezas`, según avance el flujo.
3. Publicar y mover la pieza a `publicado` con el paquete de cierre, y cerrar la serie.

## Notas

- Título de trabajo del capítulo: «El componente empaquetado: el MVC en una clase» (el definitivo se decide en el encuadre).
- Interacción con la tarea 037 (identificadores en inglés en posts publicados): si esta tarea corre antes que la 037, el capítulo heredaría los identificadores en español de la demo y la 037 tendría que retocarlo después; si corre después, nace ya con la convención alineada. Decidir el orden antes de arrancar.
- Es la última pieza de la serie: al publicarse, la serie pasa a `cerrada` y su línea se retira del planeador.

## Encuadre

- **Brief:** `docs/editorial/briefs/el-componente-empaquetado.md` — aprobado 2026-11-19
- **Promesa:** «después de leer esto, el lector podrá empaquetar un componente de tres piezas sueltas en una clase instanciable (`new CartComponent(host)`) donde cada método conserva su rol, con estado privado y ciclo de vida»

## Desviaciones del plan

- La demo usa `cart-component.ts`, `cart-component-demo.svelte` y `cart-component.test.ts` (alineados con el nombre definitivo de la clase); el Material del brief mencionaba `cart-app.ts`, remanente del nombre descartado.
- El bloque `:::demo` va en «El resultado primero» (como manda el arco del brief) en lugar de junto a «La prueba de fuego», donde el borrador del outline lo situaba.
- El `return` nuevo de `subscribe`, que el arco situaba en «El estado que no sale», se cubre íntegramente en «El ciclo de vida»: es donde la baja se usa y donde editorialmente funciona. Hallazgo menor de la revisión editorial, registrado aquí.

## Revisión

- Subagente: 2026-11-19 — Solicita cambios
- Subagente: 2026-11-19 — Solicita cambios
- Subagente: 2026-11-19 — Solicita cambios
- Subagente: 2026-11-19 — Aprueba
- Usuario (ejecución): 2026-11-19 — Aprueba (PR #38 aprobado en sesión)
- Usuario (cierre): 2026-11-20 — Aprueba
