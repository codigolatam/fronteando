# Alinear los posts publicados con las reglas nuevas de la guía

## Estado

[ ] Pendiente | [~] En progreso | **[r] En revisión** | [x] Completada | [!] Bloqueada

## Tipo

mantenimiento (refactoring)

## Objetivo

Alinear los posts ya publicados y sus demos con las reglas que `EDITORIAL.md` ganó en la tarea 032. Dos cambios, ambos de superficie:

- **Identificadores en inglés** (sección «Forma del post largo»): el carrito de los posts usa nombres en español (`Carrito`, `agregar`, `quitar`, `suscribir`, `productos`); pasan a inglés como el código del proyecto (`docs/lessons/idioma-del-codigo.md`). El comportamiento y las cifras de las salidas no cambian.
- **«Marcado» por «HTML»** (tabla «Palabras problemáticas»): `sacar-el-estado-del-dom.md` usa «marcado» dos veces; se sustituye por «HTML».

Después de esos cambios se ejecuta una **revisión editorial** de cada post publicado contra `EDITORIAL.md` completa (voz, hilo, promesa, resultado primero, límites, cierre, metadatos, palabras problemáticas) para verificar que están bien alineados con la guía vigente, no solo con las dos reglas anteriores. Lo que esa revisión encuentre se anota en el archivo de la tarea y se decide con el usuario antes de tocar prosa.

La prosa sigue en español.

## Dependencias

- Ninguna

## Entrada

- `EDITORIAL.md`: la regla de identificadores en inglés (sección «Forma del post largo») y la tabla «Palabras problemáticas» («marcado» → «HTML»).
- `docs/lessons/idioma-del-codigo.md`.
- Posts publicados con código de ejemplo en `site/src/content/articulos/`: `carrito-a-lo-bruto.md`, `sacar-el-estado-del-dom.md`, `un-store-reactivo-en-vanilla-js.md`, `la-vista-como-funcion-del-estado.md`, `de-clics-a-acciones.md` y `los-limites-del-mvc-a-mano.md`. `hola-fronteando.md` entra solo para la revisión de términos.
- Demos asociadas a esos posts en `site/src/demos/` (`carrito`, `vista-instrumentada`, `store-reactivo`), y sus tests. `contador` no tiene identificadores en español y no se toca.
- Tabla de equivalencias en inglés, aprobada por el usuario antes de renombrar.

## Resultado esperado

- Los bloques de código de los posts publicados indicados, y las demos asociadas, usan identificadores en inglés.
- La prosa de esos posts que nombra esos identificadores (por ejemplo, «la clase `Carrito`») usa los nombres nuevos, y «marcado» queda sustituido por «HTML».
- Cada post publicado tiene una revisión editorial contra `EDITORIAL.md` completa, con los desajustes encontrados anotados en este archivo y resueltos o diferidos por decisión del usuario.
- El resto de cada post no cambia: título, descripción, fecha, slug, estructura y prosa que no nombra código ni usa «marcado».

## Criterios de calidad

- Ningún identificador en español aparece en los bloques de código de los posts publicados ni en las demos asociadas, según la tabla de equivalencias.
- Ninguna ocurrencia de «marcado» ni del resto de palabras proscritas de la tabla queda en los posts publicados.
- La revisión editorial de cada post publicado está anotada en este archivo: desajustes encontrados y qué se hizo con cada uno (corregido aquí o diferido con tarea propia).
- Cada bloque de código modificado corre con los nombres nuevos y produce la misma salida que antes, verificado ejecutándolo.
- `npm test`, `npm run lint`, `npm run check`, `npm run format:check` y `npm run build` en verde.
- Ninguna mención en prosa de un identificador que ya no existe en el código del capítulo que lo menciona. Las APIs de otros frameworks citadas como comparación (`ref()`, `createSignal()`, `signal()`, `onCleanup`, `dispose`) no cuentan como identificadores del proyecto.
- `la-vista-como-funcion-del-estado.md` y la demo `vista-instrumentada` entran en el alcance de esta tarea (decisión del usuario, 2026-11-19): sus identificadores se renombran igual que en el resto de la serie.
- La etiqueta `modo` de la directiva y de la demo se mantiene en español como excepción, junto con sus valores `cantidad`, `controlador` y `limites` (decisión del usuario, 2026-11-19): es sintaxis de la directiva de `EDITORIAL.md` y valores de configuración. Por la misma razón se mantienen los atributos de directiva `nombre`, `altura` y `altura-estrecha`, que son contrato de `:::demo{…}` y de `fronteando-demo.ts`. Se registra aquí como excepción; la tabla de equivalencias no la incluye.
- Las cifras de las salidas y los resultados esperados de las demos no cambian.

## Procedimiento sugerido

1. Inventariar los identificadores en español de los bloques de código de los posts publicados y de las demos asociadas, y las ocurrencias de «marcado».
2. Presentar al usuario la tabla de equivalencias en inglés para su aprobación antes de renombrar.
3. Renombrar en código, tests y prosa, tocando solo los identificadores, y sustituir «marcado» por «HTML».
4. Ejecutar cada bloque de código modificado y comparar su salida con la anterior.
5. Revisar cada post publicado contra `EDITORIAL.md` completa y anotar en este archivo los desajustes encontrados.
6. Presentar los desajustes al usuario: los que apruebe se corrigen aquí; los que cambien la sustancia de un post se diferencian en una tarea propia.
7. Ejecutar las verificaciones del proyecto.

## Notas

- Origen: decisión del usuario, 2026-11-18, al cerrar la revisión de la guía editorial en la tarea 032. Se separa de esa tarea para no ampliar su alcance. El alcance se amplió el mismo día a petición del usuario para incluir la sustitución de «marcado» en los publicados.
- Mientras esta tarea no esté completada, la guía y el capítulo 3 no coinciden en este punto: el capítulo sigue con nombres en español. La alineación del capítulo 3 se decide dentro de la tarea 032.
- Ejecución sin plan registrado: la tarea se ejecutó sin secciones de contexto, conectividad, plan técnico ni suite aprobadas. Esto se reconoce como hallazgo de proceso de la revisión técnica; el plan retroactivo queda pendiente de aprobación del usuario.
- La tabla de equivalencias se acordó en la conversación (identificadores en inglés según la lista de `Carrito`, `add`, `remove`, `subscribe`, `subscribers`, `products`, `name`, `price`, `quantity`, `units`, `lines`, `line`, `counter`, `catalog`, `state`, `level`, `greeting`, `activeEffect`, `subscribersPerProp`, `subsOf`, `run`, `connect`, `update`, `actions`, `action`, `button`, `gift`, `giftGiven`, `inRule`, `model`, `nextId`, `sum`, `current`, `initialValue`, `target`, `next`) y sus valores por defecto para ids del DOM y `data-*` se aplicaron. No hay tabla escrita en el repositorio.
- Equivalencias de vocabulario en prosa: «línea» para cada entrada del carrito; «unidades» para la suma de cantidades; «arreglo» en lugar de «array»; «fuente de verdad»; «registrar manejadores» en lugar de «cablear»; «HTML» en lugar de «marcado»; «front-end».

## Revisión

- Subagente (revisión editorial de los 7 posts, 2026-11-19): Aprueba con cambios menores. Cambios aplicados: frontmatter de `la-vista` (prerrequisito con `Cart`), prueba dos de `los-limites` (el «Quitar» se hace desde código), concordancia en `carrito-a-lo-bruto` y «coste» en lugar de «costo».
- Subagente (revisión de términos de la serie, 2026-11-19): sin hallazgos de severidad alta. Aplicados: «de grano fino», «emisores con eventos nombrados», «fuera de esta serie», «envuelta en una API», «una ejecución completa» y «el controlador» en lugar de «manejador delegado». `tómatela con calma` se mantiene.
- Subagente (revisión técnica del diff, 2026-11-19): Solicita cambios. Corregido: etiqueta de la demo `demo-carrito` → `demo-cart` (la demo no se montaba), «simplemente» eliminado, comentario `// título` → `// title` en la demo del store, alias `Estado` → `State` en `source.test.ts`, texto de salida de `los-limites` alineado con el registro de la demo y orden cronológico indicado. El alcance, la prosa revisada y la excepción de `modo` están decididos por el usuario (2026-11-19).
- Subagente (segunda revisión técnica, 2026-11-19): tests 86/86, eslint, prettier, astro check y build en verde. Los cambios de `description` de `hola-fronteando.md` («front-end») forman parte de la prosa revisada que el usuario mantuvo.
- Subagente (revisión de redacción por artículo, 2026-11-19): siete revisiones de narrativa, progresión, explicación y ejemplos, con cambios aplicados uno por artículo (commits `30e4e6a`…`dd34a18`). Las cifras y las afirmaciones se comprobaron contra las demos antes de aplicarlas.
- Subagente (revisión final previa al cierre, 2026-11-19): primera pasada solicitó cambios (un número de repintados, dos frases de `la-vista` y una pausa retirada sin registrar), corregidos en `ad9dd6c`, `1c030b1` y `d07828a`. Segunda pasada: aprueba, sin bloqueantes. Queda como observación menor, que no bloquea: el bloque de `un-store-reactivo` muestra `store({ name, level })`, pero en `runtime.ts` el Proxy se crea en línea dentro de `createProgram`; el comportamiento es equivalente y lo cubren los tests.

### Revisión editorial por post

- `carrito-a-lo-bruto.md`: aprueba con cambios menores. Concordancia en la frase de los incisos corregida; «cableado» → «registrar manejadores»; «dueño» → «fuente de verdad»; «bug» → «fallo»; «maqueta» → «HTML».
- `sacar-el-estado-del-dom.md`: aprueba. «marcado» → «HTML» (dos veces); «ítems» → «líneas»; «sin dueño» → «sin una fuente de verdad única»; «oyentes» → «suscriptores».
- `un-store-reactivo-en-vanilla-js.md`: aprueba. Identificadores en backticks de la prosa renombrados; «cableado» → «registro manual de suscriptores»; «cleanup» → «limpieza»; «grano fino»; «envuelta en una API».
- `la-vista-como-funcion-del-estado.md`: aprueba con cambios menores. Frontmatter con `Cart`; «ítems» → «unidades» en la salida; «fuera de esta serie»; «con nombre» en lugar de «con nombre propio».
- `de-clics-a-acciones.md`: aprueba. «ítems» → «unidades»; «En este capítulo `connect` ya no existe» aclara el alcance.
- `los-limites-del-mvc-a-mano.md`: aprueba con cambios menores tras reescritura de claridad aprobada por el usuario: secciones «Antes de empezar», tabla modelo/pantalla, secuencia de la prueba tres, sección «Lo que este experimento no mide», cierre con puntos de revisión. Correcciones: «Tras tres «Añadir» y un «Quitar»» explicita que el «Quitar» es desde código; «costo» → «coste»; «simplemente» eliminado; «reentrada» sustituida; «manejador delegado» → «el controlador»; «emisores con eventos nombrados»; salida alineada con el registro de la demo.
- `hola-fronteando.md`: aprueba. «frontend» → «front-end» en prosa y description; «hola mundo» entre comillas latinas.

### Ronda de redacción posterior a la revisión técnica (2026-11-19)

Siete commits, uno por artículo (`30e4e6a`…`dd34a18`), más tres correcciones tras la revisión final (`ad9dd6c`, `1c030b1`, `d07828a`). Sin cambios de código de demo ni de cifras de salida.

- `carrito-a-lo-bruto`: gancho en dos frases; diagnóstico acortado sin perder causas; la prueba del teclado usa el escenario del test (teclado como única línea, $135).
- `sacar-el-estado-del-dom`: explica `line` frente al `id` del producto; el cierre deja de decir que el DOM no se actualiza solo.
- `un-store-reactivo-en-vanilla-js`: se nombra la dependencia duplicada; caso concreto para «un solo efecto a la vez»; la salida se comenta en el bloque de uso; puerta final a la serie.
- `la-vista-como-funcion-del-estado`: previo enlaza el capítulo anterior; salida intermedia «1 unidad / $45»; «tres cosas» en tres párrafos; regla de Rascia atribuida a MVC.
- `de-clics-a-acciones`: delegación de eventos nombrada antes de usarla; `actions` justificada frente a `switch`; resultado primero con dos diferencias; «cinco repintados» tras la corrección.
- `los-limites-del-mvc-a-mano`: glosario con «suscriptor»; desglose de 16 elementos; explicación de la notificación anidada; prueba dos con el olvido concreto; resumen por límite; pausa de proyecto propio restaurada (cuatro pausas).
- `hola-fronteando`: negrita del previo retirada; repetición de front-end repartida; cierre con puerta al primer capítulo.
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
