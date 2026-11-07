---
title: "Los límites del MVC a mano"
description: "El carrito MVC ya funciona. ¿Cuánto aguanta? Tres pruebas de estrés muestran dónde cede el patrón hecho a mano y qué resolvió la reactividad."
date: 2026-11-07T00:55:00Z
categoria: arquitectura
nivel: intermedio
tags: ["javascript", "mvc", "dom", "reactividad"]
agente:
  tema: "evalúa dónde cede el patrón MVC hecho a mano —repintados totales, vistas parciales que divergen, suscriptores que se pisan— y qué problema resolvió la reactividad"
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

Vamos a estresar el carrito del
[capítulo anterior](/articulos/de-clics-a-acciones/) hasta que el
patrón ceda, sin tocar una línea de su código: tres pruebas que corren
tal cual, y al final el mapa de límites (qué aguanta el MVC hecho a
mano y qué problema resolvió la reactividad después).

## El resultado primero

Antes de explicar cada prueba, el banco de estrés corriendo. Las tres
salidas vienen de ejecución real sobre el carrito intacto:

```text
quitar 1 línea → el árbol entero se reescribe: 16 elementos
vista parcial a mano → modelo: 2 líneas, DOM: 0 líneas
regla sin guardia → RangeError: Maximum call stack size exceeded
```

Tres síntomas del mismo límite. Vamos uno por uno.

## El experimento

El código de partida es el del capítulo anterior, sin tocar: la clase
`Carrito` con `suscribir` y `#notificar`, el `render` que reescribe
`host.innerHTML` entero, el listener delegado que traduce `data-accion`
en acciones del modelo. Todo lo que sigue corre sobre esa base (los
snippets llevan la marca `// extracto:` cuando necesitan ese contexto).

## Prueba uno: el repintado no sabe qué cambió

Con tres productos en el carrito, quitamos una línea. Lo que cambia en
la pantalla es poco: el contador, el total y una línea menos.

```js
// extracto: el carrito del capítulo anterior ya suscrito y renderizado
carrito.quitar(2); // solo cambian contador, total y un <li>
```

```text
el árbol entero se reescribe: 16 elementos (antes del cambio: 18)
```

Para tocar tres valores el `render` reescribió los dieciséis elementos
que quedaban. No es un bug: el `render` no sabe qué cambió, así que la
única respuesta honesta que tiene es repintarlo todo. Mientras el
componente es pequeño el costo es invisible; el problema es que crece
con la vista, no con el cambio.

## Prueba dos: la vista parcial a mano diverge

La tentación natural: si solo cambiaron dos números, actualicemos solo
esos dos nodos. Escribimos el suscriptor parcial:

```js
// extracto: requiere el `host` con el marcado del capítulo anterior
carrito.suscribir(() => {
  host.querySelector("#contador").textContent = carrito.unidades;
  host.querySelector("#total").textContent = `$${carrito.total}`;
  // nos olvidamos de la <ul> de líneas
});
```

Tras tres «Añadir» y un «Quitar»:

```text
modelo: 2 líneas
DOM: 0 líneas
```

El modelo dice dos líneas y la pantalla muestra cero. Nadie te avisa: no
hay error, no hay advertencia (la interfaz miente en silencio). La
vista parcial a mano obliga a mantener dos listas sincronizadas a
memoria: la de cosas que pueden cambiar y la de sitios donde se
pintan. Olvidar un sitio no rompe nada visible en el momento del
descuido; rompe la verdad de la pantalla.

:::pausa
Explica por qué el DOM muestra 0 líneas cuando el modelo tiene 2, sin
que haya saltado ningún error.
:::

## Prueba tres: el suscriptor que se pisa

El carrito crece en reglas de negocio: si el total llega a $200, se
regala un producto. Lo natural es escribirla como un suscriptor más:

```js
// extracto: requiere el carrito del capítulo anterior
let regaloDado = false;
carrito.suscribir((c) => {
  if (!regaloDado && c.total >= 200) {
    regaloDado = true;
    c.agregar({ id: 99, nombre: "Regalo", precio: 0 }); // muta dentro de la notificación
  }
});
```

Un clic en «Añadir» para el monitor ($180) y otro para el teclado
($45) producen:

```text
repintado por notificación 1: 1 u / $180
repintado por notificación 2: 2 u / $225
repintado por notificación 3 (anidada): 3 u / $225
```

La regla se dispara dentro de la segunda notificación y su `agregar`
abre una tercera antes de que la segunda termine. El repintado del
regalo ocurre anidado dentro de la notificación que lo provocó: cualquier
suscriptor que asuma «una notificación, un turno completo» cuenta mal
—y cada vista suscrita multiplica el efecto, porque un solo `agregar`
produce un repintado por vista.

Y la misma regla sin la guardia `regaloDado` no se detiene nunca:

```text
RangeError: Maximum call stack size exceeded
```

La notificación llama a `agregar`, que notifica, que llama a la regla,
que agrega de nuevo. El modelo no distingue «cambio del usuario» de
«cambio que otro suscriptor acaba de causar»: la reentrada es legal y
explosiva.

:::demo{nombre="vista-instrumentada" modo="limites" altura="290px" altura-estrecha="400px"}
Pieza interactiva: el carrito del capítulo anterior con la regla del
regalo suscrita. El lector añade el monitor y el teclado y ve en el
registro cómo la tercera notificación nace anidada dentro de la
segunda.
:::

:::pausa
Cuenta qué ocurre dentro de la segunda notificación antes de que
termine: qué la dispara, qué repinta y en qué orden llegan las
entradas al registro.
:::

## El mapa de límites

Las tres pruebas señalan el mismo sitio desde ángulos distintos:

- **El render no sabe qué cambió.** Repintar todo funciona mientras la
  vista es pequeña; el costo crece con el árbol, no con el cambio.
  Las vistas parciales a mano divergen en silencio.
- **La notificación no sabe a quién le toca.** Todos los suscriptores
  se enteran de todo y cada uno decide si le afecta (o muta a su vez
  y abre una notificación anidada).
- **La sincronización fina entre estado y DOM es trabajo manual.** El
  patrón separa las piezas pero deja en tus manos la pregunta «¿qué
  cambió y qué nodo le corresponde?».

Lo que el MVC a mano aguanta bien: un componente con una vista, pocas
reglas, notificación burda a todo el mundo. Ahí el patrón ordena de
verdad: los capítulos anteriores son la prueba. Lo que no aguanta es
la granularidad: saber qué cambió y tocar solo eso. Ese es el problema
que la reactividad resolvió después, y el [store reactivo del
blog](/articulos/un-store-reactivo-en-vanilla-js/) es justamente esa
respuesta a mano: el estado recuerda quién depende de cada valor y
solo avisa a quien lo usa, en lugar de gritar a todos que algo pasó.

## Los límites honestos

Las cifras de este capítulo son conteos de nodos repintados, no
mediciones de tiempo: en componentes de este tamaño el repintado total
sigue siendo instantáneo, y el límite real se nota antes en la
complejidad del código (dos listas a sincronizar, guardias contra la
reentrada) que en el rendimiento bruto. El boilerplate tampoco es
denuncia nuestra: es el caveat clásico del género (Rascia y Stearns lo
advierten en los mismos tutoriales que citamos en la serie) y aquí lo
convertimos en banco de pruebas. Quedaron fuera las respuestas
históricas intermedias: eventos nombrados, PubSub, observables con
canales; todas responden al mismo límite sin llegar a la granularidad.

## El punto

El arco queda cerrado: del espagueti del primer capítulo al carrito
con modelo, vista y controlador separados, y de ahí al mapa de dónde
cede. El MVC a mano enseña a ordenar el código; el límite que toca es
saber qué cambió. Esa pregunta —«¿quién depende de este valor?»— es la
que la reactividad convirtió en sistema. De cómo se responde con
signals y efectos ya habla el post del store reactivo; de qué forma
toma eso en un framework, la próxima conversación.
