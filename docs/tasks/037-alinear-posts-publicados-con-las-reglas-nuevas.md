# Alinear los posts publicados con las reglas nuevas de la guía

## Estado

**[ ] Pendiente** | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

## Tipo

mantenimiento (refactoring)

## Objetivo

Alinear los posts ya publicados y sus demos con las reglas que `EDITORIAL.md` ganó en la tarea 032. Dos cambios, ambos de superficie:

- **Identificadores en inglés** (sección «Forma del post largo»): el carrito de los posts usa nombres en español (`Carrito`, `agregar`, `quitar`, `suscribir`, `productos`); pasan a inglés como el código del proyecto (`docs/lessons/idioma-del-codigo.md`). El comportamiento y las cifras de las salidas no cambian.
- **«Marcado» por «HTML»** (tabla «Palabras problemáticas»): `sacar-el-estado-del-dom.md` usa «marcado» dos veces; se sustituye por «HTML».

La prosa sigue en español.

## Dependencias

- Ninguna

## Entrada

- `EDITORIAL.md`: la regla de identificadores en inglés (sección «Forma del post largo») y la tabla «Palabras problemáticas» («marcado» → «HTML»).
- `docs/lessons/idioma-del-codigo.md`.
- Posts publicados con código de ejemplo en `site/src/content/articulos/`: `carrito-a-lo-bruto.md`, `sacar-el-estado-del-dom.md`, `un-store-reactivo-en-vanilla-js.md` y `hola-fronteando.md` si tiene bloques con identificadores en español.
- Demos asociadas a esos posts en `site/src/demos/` (por ejemplo `carrito`, `store-reactivo`, `contador`), y sus tests.
- Tabla de equivalencias en inglés, aprobada por el usuario antes de renombrar.

## Resultado esperado

- Los bloques de código de los posts publicados indicados, y las demos asociadas, usan identificadores en inglés.
- La prosa de esos posts que nombra esos identificadores (por ejemplo, «la clase `Carrito`») usa los nombres nuevos, y «marcado» queda sustituido por «HTML».
- El resto de cada post no cambia: título, descripción, fecha, slug, estructura y prosa que no nombra código ni usa «marcado».

## Criterios de calidad

- Ningún identificador en español aparece en los bloques de código de los posts publicados ni en las demos asociadas, según la tabla de equivalencias.
- Ninguna ocurrencia de «marcado» queda en los posts publicados.
- Cada bloque de código modificado corre con los nombres nuevos y produce la misma salida que antes, verificado ejecutándolo.
- `npm test`, `npm run lint`, `npm run check`, `npm run format:check` y `npm run build` en verde.
- Ninguna mención en prosa de un identificador que ya no existe en el código.
- `la-vista-como-funcion-del-estado.md` y la demo `vista-instrumentada` no se modifican: pertenecen a la tarea 032.
- Las cifras de las salidas y los resultados esperados de las demos no cambian.

## Procedimiento sugerido

1. Inventariar los identificadores en español de los bloques de código de los posts publicados y de las demos asociadas, y las ocurrencias de «marcado».
2. Presentar al usuario la tabla de equivalencias en inglés para su aprobación antes de renombrar.
3. Renombrar en código, tests y prosa, tocando solo los identificadores, y sustituir «marcado» por «HTML».
4. Ejecutar cada bloque de código modificado y comparar su salida con la anterior.
5. Ejecutar las verificaciones del proyecto.

## Notas

- Origen: decisión del usuario, 2026-11-18, al cerrar la revisión de la guía editorial en la tarea 032. Se separa de esa tarea para no ampliar su alcance. El alcance se amplió el mismo día a petición del usuario para incluir la sustitución de «marcado» en los publicados.
- Mientras esta tarea no esté completada, la guía y el capítulo 3 no coinciden en este punto: el capítulo sigue con nombres en español. La alineación del capítulo 3 se decide dentro de la tarea 032.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
