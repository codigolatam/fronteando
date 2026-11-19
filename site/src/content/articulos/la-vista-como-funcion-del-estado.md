---
title: "La vista como función del estado"
description: "¿Quién mantiene la pantalla al día cuando cambia el modelo? Un render que la regenera entera en cada notificación, incluido el primero."
date: 2026-11-18T16:28:00Z
categoria: arquitectura
nivel: intermedio
tags: ["javascript", "mvc", "dom"]
agente:
  tema: "explica cómo convertir el código que pinta un componente en una función render que regenera toda la vista desde el modelo, con el primer render incluido"
  prerequisitos:
    [
      "el modelo del capítulo anterior (la clase `Cart` con `subscribe` y `#notify`); DOM básico (innerHTML, querySelector, addEventListener)",
    ]
---

El carrito se actualiza solo: su estado vive en un modelo aparte del
DOM y cada cambio llega a la pantalla. Pero el código que aplica esos
cambios toca tres elementos a mano, y el HTML inicial muestra un
estado que puede mentir. Hoy convertimos todo lo que se ve en una
función del estado.

<!--more-->

Vamos a convertir el código que pinta el carrito en una función:
dado el modelo, `render` genera todo el HTML de la vista, incluso la
primera pantalla. Al terminar podrás convertir la parte visual de tu
componente en una función de su estado, y verás qué queda por separar.

## El resultado primero

Antes de abrir la función conviene ver qué hace. Así se inicializa
el carrito sobre el modelo del
[capítulo anterior](/articulos/sacar-el-estado-del-dom/): un `<div>`
vacío en la página, una suscripción y una llamada inicial.

```js
// extracto: requiere la clase `Cart` del capítulo anterior, el arreglo `products`,
// las funciones `render` y `connect` de más abajo y un `<div id="cart-app">` vacío
const cart = new Cart();
const update = () => {
  render(cart);
  connect(cart);
};
cart.subscribe(update);
update();
```

Con eso montado, pulsamos «Añadir» en los tres productos y después
«Quitar» en la primera línea. Esto es lo que muestra la pantalla en cada momento:

```text
al montar:               0 unidades / $0
tras 3 «Añadir»:         3 unidades / $250
tras quitar el primero:  2 unidades / $205
```

Las mismas cifras de siempre, con una diferencia: el primer `0 / $0`
no está escrito en el HTML. Lo produjo `render`. La pantalla empieza
siendo una función del estado, no HTML que alguien escribió a mano
esperando acertar.

## Lo que el suscriptor hacía a mano

En el capítulo anterior el suscriptor pintaba así: buscaba el
`<span>` del total, el del contador y la `<ul>` del carrito, y tocaba
los tres por separado. Poco código, sí, pero repartido elemento a
elemento, y con una trampa escondida en el propio HTML:

```html
<h3>Tu carrito (<span id="counter">0</span>)</h3>
<ul id="cart"></ul>
<p>Total: <span id="total">$0</span></p>
```

Ese `0` y ese `$0` son estado escrito a mano en el HTML. Si nadie
se suscribe, la página se queda mostrándolos para siempre, como
vimos en los límites del capítulo anterior: el HTML miente con total
tranquilidad. Hay dos fuentes de verdad y una de ellas es texto que
nadie actualiza.

## La vista

La refactorización cabe en una idea: todo lo que se ve sale de una
función del modelo. El HTML de la página queda reducido a un
contenedor vacío:

```html
<div id="cart-app"></div>
```

Y `render` genera todo el HTML, catálogo incluido:

```js
// extracto: `products` es el arreglo del catálogo, ya visto
const host = document.querySelector("#cart-app");

function render(model) {
  host.innerHTML = `
    <ul id="catalog">
      ${products.map((p) => `<li>${p.name} — $${p.price} <button data-add="${p.id}">Añadir</button></li>`).join("")}
    </ul>
    <h3>Tu carrito (<span id="counter">${model.units}</span>)</h3>
    <ul id="cart">
      ${model.lines.map((l) => `<li>${l.name} x${l.quantity} — $${l.price * l.quantity} <button data-remove="${l.line}">Quitar</button></li>`).join("")}
    </ul>
    <p>Total: <span id="total">$${model.total}</span></p>`;
}
```

Tres cosas que cambian aquí. La primera: el HTML ya no guarda datos
escritos a mano que puedan mentir. El `0` y el `$0` que antes vivían en
el HTML ahora salen de `model.units` y `model.total`. La segunda:
la vista entera está en un solo lugar. Si lo que se ve tiene una forma
rara, el sitio donde mirar es `render`; si algo raro pasa al pulsar, es
`connect`. La tercera es sutil: los botones llevan atributos
`data-add` y `data-remove` en lugar de nacer con su manejador
puesto, porque el HTML se compone como texto y los nodos todavía no
existen cuando lo escribimos.

## El primer render

El programa del resultado primero tiene dos líneas que hacen todo el
trabajo:

```js
// extracto: el mismo programa del resultado primero
cart.subscribe(update);
update();
```

La primera es la de siempre: cada notificación del modelo llama a
`update`, que repinta la vista y vuelve a conectar los botones.
La segunda es la que faltaba: una llamada inicial, para que la primera
pantalla también la produzca `render`. Antes, el estado inicial lo
escribía el HTML a mano y la página solo se ponía al día cuando
llegaba la primera notificación; ahora la primera vista sale por el
mismo camino que todas las demás. La pantalla nunca muestra un estado
que el modelo no tenga.

:::pausa
Predice qué muestra la página antes de la primera notificación, y
explica por qué ya no puede quedarse enseñando datos de mentira.
:::

## Los botones dentro del render

Cada repintado destruye los nodos y crea otros nuevos, así que hay
que volver a conectar los manejadores después de pintar. Para eso
sirven los `data-*` y la función `connect`, la otra mitad de
`update`:

```js
// extracto: sigue a `render`; `host` es el mismo `<div id="cart-app">`
function connect(model) {
  for (const b of host.querySelectorAll("[data-add]"))
    b.addEventListener("click", () =>
      model.add(products.find((p) => p.id === Number(b.dataset.add))),
    );
  for (const b of host.querySelectorAll("[data-remove]"))
    b.addEventListener("click", () => model.remove(Number(b.dataset.remove)));
}
```

Es el mismo patrón que el suscriptor del capítulo anterior ya usaba
para sus «Quitar», ahora con nombre y aplicado a todos los
botones. Y funciona, pero mira quién decide qué pasa al pulsar: la
propia vista. Cada botón recién nacido llama a `add` o a `remove`
del modelo directamente.

El patrón tiene una regla explícita sobre eso. Tania Rascia, en su
[tutorial de MVC](https://www.taniarascia.com/javascript-mvc-todo-app/),
la deja en una sola línea: «the view never touches the model». La
vista nunca toca el modelo; la nuestra lo toca en cada clic. Dave
Stearns [matiza la regla](https://drstearns.github.io/tutorials/mvc/):
en la variante moderna la vista sí captura los eventos de usuario,
como hace la nuestra. Decidir qué se hace con ellos es otro trabajo, y
es el paso que queda.

La pieza siguiente es el carrito de este capítulo funcionando, con un
registro en vivo: cada notificación del modelo y el repintado que
provoca. La línea fija sobre el registro recuerda que el render
inicial no llegó por notificación.

:::demo{nombre="vista-instrumentada" altura="290px" altura-estrecha="400px"}
El carrito del capítulo funcionando junto al registro del modelo:
cada «Añadir» o «Quitar» produce una línea «notificación N →
repintado: M u / $X» en el registro, la más nueva arriba. Resultado
esperado: tres añadidos dejan tres notificaciones, contador 3 y
total $250; quitar la primera línea deja $205. La línea fija sobre el
registro recuerda el render inicial, que no llegó por notificación.
:::

:::pausa
Explica qué tendría que cambiar para que la vista dejara de tocar el
modelo: quién recibiría los clics y qué haría con ellos.
:::

## Los límites de este paso

La pantalla ya es una función del estado, pero esta vista paga un
precio que conviene nombrar.

- **Repinta también lo que no cambia.** Cada notificación reescribe el
  catálogo entero, que nunca cambia, y recrea todos los nodos. Con
  tres productos no se nota; con una lista larga, sí.
- **Los nodos se destruyen y recrean.** Si una línea tuviera un campo
  de texto (el campo de cantidad que sigue fuera de esta serie), cada
  repintado borraría su contenido y le quitaría el foco mientras
  escribes.
- **Los manejadores viven dentro de la vista y tocan el modelo a
  discreción.** Funciona, pero es la separación que falta: quien
  decide qué pasa al pulsar no debería ser quien pinta.
- **`innerHTML` interpola datos sin escapar.** Aquí los nombres son
  literales del catálogo y no pasa nada; con datos que vinieran del
  usuario, esta plantilla abriría la puerta a la inyección de HTML (XSS).

## El punto

El DOM ya no es fuente de verdad ni de HTML: todo lo que se ve
sale de `render(model)`, desde el primer render. Lo que queda suelto
son los eventos: los clics entran por dentro de la vista y alcanzan el
modelo sin intermediario. ¿Quién traduce un «Añadir» en una acción, y
una acción en un cambio del modelo? Ese es el trabajo del controlador,
y es el siguiente capítulo.
