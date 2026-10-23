# Brief — El carrito a lo bruto: construir un componente sin patrón

## Estado

- estado: aprobado
- aprobado: 2026-10-21

**Pieza:** docs/editorial/piezas/carrito-a-lo-bruto.md
**Tarea:** docs/tasks/018-validar-flujo-con-post-mvc.md

## Encuadre

- **Audiencia:** quien escribe componentes en vanilla JS —widgets, paneles, extensiones donde un framework sería exceso— y ya ha visto enredarse estado, eventos y DOM; conoce el MVC de nombre, asociado a backends o frameworks, sin haberlo construido a mano. Sabe JS y DOM básico; puede llegar del post del store reactivo, que anunció esta serie.
- **Promesa:** «después de leer esto, el lector podrá diagnosticar el enredo de un componente sin patrón —qué tres cosas se mezclaron y por qué un cambio pequeño se vuelve caro—»
- **Arco:**
  - Gancho y previo: la tensión de que el espagueti funciona —eso es lo que lo hace peligroso— resuelta dentro del previo.
  - La promesa: construimos un carrito a lo bruto y le pedimos un cambio legítimo; el lector se lleva el vocabulario del enredo.
  - El resultado primero: el carrito funcionando (catálogo, añadir, quitar, total) antes de mirar sus tripas.
  - La construcción a lo bruto: recorrido compacto por el componente honesto, escrito como lo escribe cualquiera — el mérito no es enseñar a construirlo sino reconocerlo.
  - El cambio que resiste: editar la cantidad en línea; la petición más normal del mundo y el código que se niega.
  - El diagnóstico: las tres cosas enredadas con nombre propio — estado repartido entre variables y DOM, manejadores que tocan de todo, render que destruye y re-cablea.
  - Los límites honestos: el post no separa nada todavía y el espagueti mostrado es código razonable, no un hombre de paja.
  - El cierre: la pregunta que abre el arco —¿cómo separo esto sin framework?— y la puerta al capítulo del Modelo.
- **Ejemplo conductor:** el carrito de la compra construido a lo bruto y el cambio que lo resiste —la cantidad editable en línea—, que expone cómo la cantidad vive en tres sitios (el array, el input y el texto renderizado) y que el re-render destruye el input que el usuario está usando.
- **Alcance:** ninguna separación se adelanta —el arreglo pertenece a los capítulos siguientes, el dolor viene primero—; sin comparativas de frameworks más allá de una mención; sin persistencia ni estilos; la historia del MVC solo como una pincelada con su fuente.
- **Metadatos:**
  - `slug` carrito-a-lo-bruto
  - `categoria` arquitectura
  - `nivel` intermedio
  - `tags` javascript, mvc, dom

## Temas de investigación

- [x] ¿Cómo se ejecutan los snippets con DOM si el repo no trae jsdom ni runner de tests? (resuelto: navegador real; detalle en `## Material`)
- [x] ¿Regenerar el marcado con `innerHTML` destruye los listeners y el estado de los inputs? (verificado en Firefox; salida en `## Material`)
- [x] ¿Quién y cuándo concibió el MVC? (Reenskaug, Xerox PARC, nota del 10 de diciembre de 1979; fuente en `## Material`)

## Material

**Verificación de snippets.** El proyecto no incluye jsdom ni runner de tests; los snippets con DOM se ejecutan en un navegador real (Firefox, `evaluate_script` sobre una página en blanco, con clics y lecturas del DOM resultante) y los tramos de JS puro pueden verificarse en Node 24. Verificado durante la propia planeación.

**El re-render por `innerHTML` destruye listeners y estado.** Ejecutado en Firefox: tras regenerar la lista del carrito con `innerHTML`, el botón viejo sale del DOM (`contains: false`), los botones nuevos quedan sin listeners (su clic no suma) y el input pierde el valor escrito (`""`).

```js
document.body.innerHTML = `<ul id="carrito"><li>Teclado <button>Quitar</button></li></ul><input id="cantidad" value="2">`;
let clicks = 0;
const btnViejo = document.querySelector("button");
btnViejo.addEventListener("click", () => clicks++);
document.body.innerHTML = `<ul id="carrito"><li>Teclado <button>Quitar</button></li><li>Ratón <button>Quitar</button></li></ul><input id="cantidad">`;
// salida verificada: { clicksTrasReRender: 1, valorInputTrasReRender: "", btnViejoSigueEnDOM: false }
```

**El cambio que resiste.** Petición: que la cantidad de cada ítem se pueda editar en línea. La resistencia se demuestra sola —la cantidad pasa a vivir en tres sitios (el array de ítems, el `value` del input y el texto del `<li>`); el total hay que recalcularlo en un sitio más; y regenerar la lista mientras el usuario edita destruye el input y su foco: un bug reproducible, no una molestia abstracta.

**Referencias del género.** `docs/research/2026-10-referencias-mvc-vanilla-js.md` caracteriza el género «MVC en vanilla JS»: sus convenciones estables son justificación anti-framework, todo app, construcción incremental por clases y caveat de boilerplate. El capítulo rompe dos a sabiendas —ejemplo fuera de la todo app y el problema antes que el patrón— y mantiene las dos que ya son de la casa (resultado primero, límites honestos). Imprescindibles para capítulos siguientes: Rascia (tutorial incremental) y Stearns (el modelo que emite eventos, materia del capítulo 2).

**Origen del MVC, si el post lo menciona.** Trygve Reenskaug lo concibió en Xerox PARC en 1978–79; la nota «Models-Views-Controllers» está fechada el 10 de diciembre de 1979 (fuente: `http://www.ifi.uio.no/~trygver/1979/mvc-2/1979-12-MVC.pdf`). Matiz por si sale: en la formulación original la Vista también atendía la entrada relevante para sí misma; la versión de Smalltalk-80 que popularizó el patrón es de Jim Althoff.

## Borrador del outline

- Gancho: el espagueti funciona —ese es el problema (la negación de la casa, resuelta dentro del previo)
- `<!--more-->` inmediatamente después + el párrafo de promesa (construimos el carrito y le pedimos un cambio; el lector se lleva el diagnóstico)
- Resultado primero: el carrito completo funcionando —catálogo, añadir, quitar, total— con su comportamiento narrado
- La construcción a lo bruto: recorrido compacto por las tres zonas donde ya se mezcla todo (estado entre variables y DOM, manejadores que mutan ambos, re-render por `innerHTML`)
- El cambio legítimo: la cantidad editable en línea; el código que pide cualquier cliente y los puntos exactos donde duele (cantidad en tres sitios, total recalculado otra vez, el input que pierde el foco)
- El diagnóstico: el enredo con nombre propio —estado sin dueño, manejadores que tocan de todo, render destructivo— y por qué cada síntoma encarece el siguiente cambio
- Los límites honestos: no se separa nada todavía; el código mostrado es el que escribe una persona razonable, no un espantapájaros
- El cierre: la pregunta abierta —quién guarda el estado, quién escucha, quién pinta— con la puerta al capítulo del Modelo y el enlace al mini-store donde el hilo lo pida

## Checklist de publicación

- [x] El gancho planta una tensión y la resuelve dentro del previo
- [x] `<!--more-->` inmediatamente tras el gancho (el previo sale del cuerpo, decisión D002)
- [x] El previo es una unidad: un párrafo breve y autocontenido, diseñado como tal
- [x] `description` enuncia la promesa en una frase, sin adjetivos valorativos
- [x] Frontmatter completo: `title`, `description`, `date`, `categoria`, `tags` (`nivel` solo si el encuadre lo decidió)
- [x] `date` con la hora real del commit o del merge
- [x] `categoria` es el pilar decidido en el encuadre; ningún tag coincide con una categoría
- [x] Cada snippet corre tal cual aparece (ejecutado antes de incluirse) o se marca explícitamente como extracto
- [x] Los límites honestos tienen sección propia; el cierre abre una puerta
- [x] Ronda de escritura completa (`revisar-redaccion` y luego `pulir-escritura`) sobre la versión final
- [x] El carrito espagueti es código honesto, no un hombre de paja: la resistencia del cambio se demuestra, no se declara
- [x] El bug del foco (el input de cantidad destruido por el re-render) se reproduce y se muestra
- [x] Ninguna separación se adelanta: el post termina con el enredo nombrado, no con el arreglo
- [x] El enlace al mini-store se evaluó y se decidió fuera: el enlazado entre posts es criterio de la serie, no del capítulo
