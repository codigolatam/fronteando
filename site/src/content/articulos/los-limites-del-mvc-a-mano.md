---
title: "Los límites del MVC a mano"
description: "El carrito MVC ya funciona, pero ¿cuánto aguanta? Tres pruebas de estrés muestran dónde cede el patrón hecho a mano y qué resolvió la reactividad."
date: 2026-11-19T00:53:00Z
categoria: arquitectura
nivel: intermedio
tags: ["javascript", "mvc", "dom", "reactividad"]
agente:
  tema: "evalúa dónde cede el patrón MVC hecho a mano (repintados totales, vistas parciales que divergen, suscriptores que se pisan) y qué problema resolvió la reactividad"
  prerequisitos:
    [
      "el carrito MVC de la serie (modelo que notifica, vista como función del estado, controlador delegado)",
    ]
---

El carrito MVC está completo: modelo que notifica, vista que repinta,
controlador que traduce clics. El ciclo se cerró y funciona. Pero
funcionar y aguantar no son lo mismo: el patrón no falla por malo,
falla por tamaño.

<!--more-->

Vamos a poner el carrito del
[capítulo anterior](/articulos/de-clics-a-acciones/) en situaciones que
crecen: más valores que repintar, más vistas que mantener, más reglas
que se disparan a la vez. Sin tocar ni una línea de su código, veremos
en cuál de ellas cede el patrón y qué problema resolvió la reactividad
después.

## Antes de empezar

Este capítulo se lee mejor con el carrito de los dos anteriores abierto en otra pestaña.
Estos son los términos que vas a encontrar:

- **Repintado:** volver a dibujar elementos de la pantalla a partir del modelo.
  Aquí, `render` repinta toda la vista en cada cambio.
- **Vista parcial:** una vista que solo actualiza algunos de sus elementos,
  en lugar de la pantalla entera.
- **Notificación anidada:** una notificación que dispara otra antes de que
  la primera haya terminado.
- **Pila de llamadas:** la lista de funciones que están abiertas a la vez.
  Cada llamada dentro de otra ocupa un sitio en ella; si la lista se llena,
  el navegador corta la ejecución con un error.

Si tienes poco tiempo, lee el resultado primero y el mapa de límites. La
prueba tres es la más difícil: tómatela con calma.

## El resultado primero

Antes de explicar cada prueba, conviene ver sus salidas. Las tres vienen de
ejecutar el carrito intacto:

```text
quitar 1 línea → el árbol entero se reescribe: 16 elementos
vista parcial a mano → modelo: 2 líneas, DOM: 0 líneas
regla sin guardia → RangeError: Maximum call stack size exceeded
```

Cada línea responde a una prueba: la primera, al repintado total; la segunda,
a la vista parcial; la tercera, a la regla que se llama a sí misma. Vamos una
por una.

## El experimento

El código de partida es el del capítulo anterior, sin cambios. Tiene tres
piezas que nos interesan:

- `Cart`, el modelo, con `subscribe` para suscribirse y `#notify` para avisar
  a los suscriptores.
- `render`, que reescribe `host.innerHTML` entero cada vez que se le llama.
- El controlador, un único manejador sobre el host, que lee `data-action` y llama al modelo.

Cada fragmento de código lleva la marca `// extracto:` cuando necesita
contexto de los capítulos anteriores.

## Prueba uno: el repintado no sabe qué cambió

Con tres productos en el carrito, quitamos una línea. En la pantalla cambian
tres cosas: el contador, el total y una línea menos.

```js
// extracto: el carrito del capítulo anterior ya suscrito y renderizado
cart.remove(2); // solo cambian contador, total y un <li>
```

```text
el árbol entero se reescribe: 16 elementos (antes del cambio: 18)
```

Esos 16 elementos son todo lo que `render` vuelve a crear:

- El catálogo: 1 lista, 3 elementos de lista y 3 botones «Añadir». Son 7.
- El título con el contador: 2.
- La lista del carrito con sus dos líneas: 1 lista, 2 elementos y 2 botones
  «Quitar». Son 5.
- El total: 2.

Con tres líneas en el carrito, la lista tenía 7 elementos en lugar de 5, y el
árbol sumaba 18.

Para cambiar tres valores, `render` reescribió los dieciséis elementos. No es
un fallo: `render` no sabe qué cambió, así que su única respuesta honesta es
repintarlo todo. Con un carrito pequeño el coste es invisible. El problema es
que el coste crece con el tamaño de la vista, no con el tamaño del cambio.

:::pausa
Predice cuántos elementos se reescriben si, en lugar de una línea, quitas
dos. Después cuenta los elementos dentro de `#cart-app` con las herramientas
de desarrollo del navegador y compara.
:::

## Prueba dos: la vista parcial a mano diverge

La tentación natural: si solo cambiaron el contador y el total, actualicemos
solo esos dos nodos. Sustituimos `render` por un suscriptor que toca
únicamente esos dos elementos:

```js
// extracto: el `host` ya pintado, y este suscriptor en lugar del render del capítulo anterior
cart.subscribe(() => {
  host.querySelector("#counter").textContent = cart.units;
  host.querySelector("#total").textContent = `$${cart.total}`;
  // nos olvidamos de la <ul> de líneas
});
```

Hacemos tres «Añadir» (teclado, ratón y monitor) y un «Quitar» desde código
(`cart.remove(1)`), porque en pantalla no hay ningún «Quitar» que pulsar: la
lista nunca se repinta. Compara lo que dice el modelo con lo que se ve:

|          | Modelo | Pantalla |
| -------- | ------ | -------- |
| Líneas   | 2      | 0        |
| Contador | 2      | 2        |
| Total    | $205   | $205     |

El contador y el total están bien porque el suscriptor los actualiza en cada
notificación. La lista no, porque nadie la vuelve a pintar. El modelo dice dos
líneas y la pantalla no muestra ninguna. No hay error ni advertencia: la
interfaz miente en silencio.

La vista parcial a mano obliga a mantener dos listas de memoria: la de lo que
puede cambiar y la de los sitios donde se pinta. Si olvidas un sitio, no
aparece ningún error. La pantalla deja de decir la verdad.

:::pausa
Explica por qué el DOM muestra 0 líneas cuando el modelo tiene 2, sin que
haya saltado ningún error.
:::

## Prueba tres: el suscriptor que se pisa

El carrito crece en reglas de negocio: si el total llega a $200, se regala un
producto. Lo natural es escribir esa regla como un suscriptor más:

```js
// extracto: requiere el carrito del capítulo anterior
let giftGiven = false;
cart.subscribe((c) => {
  if (!giftGiven && c.total >= 200) {
    giftGiven = true;
    c.add({ id: 99, name: "Regalo", price: 0 }); // modifica dentro de la notificación
  }
});
```

Un clic en «Añadir» para el monitor ($180) y otro para el teclado ($45)
producen estas notificaciones, de la más antigua a la más reciente:

```text
clic → acción add → notificación 1 → repintado: 1 u / $180
clic → acción add → notificación 2 → repintado: 2 u / $225
regla → acción gift → notificación 3 (anidada) → repintado: 3 u / $225
```

Sigamos la secuencia paso a paso:

1. Clic en «Añadir» del monitor. `add` notifica (notificación 1). Los
   suscriptores se ejecutan en el orden en que se suscribieron: primero
   `render` (1 u / $180) y después la regla, que no hace nada porque el total
   es menor que $200.
2. Clic en «Añadir» del teclado. `add` notifica (notificación 2). `render`
   repinta (2 u / $225) y la regla ve que el total ya supera $200.
3. La regla llama a `add` para el regalo. Eso notifica otra vez (notificación
   3, anidada dentro de la 2). `render` repinta (3 u / $225) y la regla ya no
   actúa, porque `giftGiven` vale `true`.
4. Termina la notificación 3 y después la 2, que no tiene más suscriptores.

El problema no es el regalo. Es que la notificación 2 sigue abierta mientras
ocurre la 3. Cualquier suscriptor que asuma «una notificación, una ejecución
completa» cuenta mal.

Sin la guardia (una variable que impide repetir la acción), la regla no se
detiene nunca. Cada notificación llama a `add`, que notifica otra vez, y así
sin fin. Cada llamada anidada ocupa un sitio en la pila de llamadas. Cuando la
pila se llena, el navegador corta con un error:

```text
RangeError: Maximum call stack size exceeded
```

Que una notificación dispare otra antes de terminar es legal para el modelo. El modelo no distingue un «cambio del usuario» de un «cambio
que otro suscriptor acaba de causar». Por eso la guardia es necesaria, y por
eso el patrón deja la responsabilidad en quien escribe el suscriptor.

:::demo{nombre="vista-instrumentada" modo="limites" altura="290px" altura-estrecha="400px"}
Pieza interactiva: el carrito del capítulo anterior con la regla del
regalo suscrita. El lector añade el monitor y el teclado y ve en el
registro cómo la tercera notificación nace anidada dentro de la
segunda.
:::

:::pausa
Explica en tus palabras por qué la notificación 3 aparece antes de que
termine la 2. Qué la dispara y qué repinta.
:::

## El mapa de límites

Las tres pruebas señalan el mismo sitio desde ángulos distintos. Cada límite
tiene su prueba:

- **El render no sabe qué cambió** (prueba uno). Repintar todo funciona
  mientras la vista es pequeña. El coste crece con el tamaño de la vista,
  aunque el cambio sea del mismo tamaño de siempre.
- **La vista parcial diverge en silencio** (prueba dos). Decidir a mano qué
  nodos tocar produce pantallas que mienten sin avisar.
- **La notificación no sabe a quién le toca** (prueba tres). Todos los
  suscriptores se enteran de todo. Cada uno decide si le afecta, y uno puede
  modificar el modelo mientras los demás siguen leyendo la misma notificación.

El MVC a mano aguanta bien en un componente con una vista, pocas reglas y
cambios que afectan a casi toda la pantalla. Ahí el patrón ordena el código,
como muestran los capítulos anteriores. Lo que no aguanta es la granularidad:
saber qué cambió y tocar solo eso.

Eso es lo que resolvió la reactividad. En el
[store reactivo](/articulos/un-store-reactivo-en-vanilla-js/), escribir
`state.level` vuelve a ejecutar el efecto del título y no el del saludo,
porque el saludo nunca leyó `level`. Cada valor sabe quién depende de él y
solo avisa a esos.

:::pausa
Piensa en un proyecto tuyo: ¿qué vista repinta más de lo que cambió? Nombra
un suscriptor que decida si le afecta un cambio y explica cómo lo sabe.
:::

## Lo que este experimento no mide

Las cifras de este capítulo cuentan nodos repintados, no milisegundos. En un
componente de este tamaño, repintar todo sigue siendo instantáneo. El límite
real aparece antes en el código: dos listas que sincronizar y guardas que
impidan las notificaciones anidadas.

El código repetitivo (el boilerplate) es el precio conocido de este patrón.
[Rascia](https://www.taniarascia.com/javascript-mvc-todo-app/) y
[Stearns](https://drstearns.github.io/tutorials/mvc/) lo advierten en los
tutoriales que citamos en la serie.

Existen alternativas intermedias: emisores con eventos nombrados, el patrón de
publicación y suscripción (PubSub) y observables como los de RxJS. Todas
siguen avisando a todos los suscriptores, así que ninguna llega a acotar qué
nodo hay que tocar.

## El punto

Lo que te llevas de este capítulo:

- Repintar todo es correcto y barato mientras la vista es pequeña. Su coste
  crece con la vista.
- Las vistas parciales a mano divergen sin avisar, porque nada comprueba que
  las dos listas sigan coincidiendo.
- Una notificación avisa a todos. Si un suscriptor modifica el modelo mientras
  se notifica, las notificaciones se anidan y la regla puede llamarse a sí
  misma.
- La reactividad responde a la pregunta «¿quién depende de este valor?», y
  así solo avisa a quien lo usa.

El arco queda cerrado: del espagueti del primer capítulo al carrito con
modelo, vista y controlador separados, y de ahí al mapa de dónde cede. Qué
forma toma eso en un framework queda para otra conversación.
