---
title: "La vista como función del estado"
description: "¿Quién mantiene la pantalla al día cuando cambia el modelo? Un render que la regenera entera en cada notificación, desde el primer pintado."
date: 2026-10-28T02:37:00Z
categoria: arquitectura
nivel: intermedio
tags: ["javascript", "mvc", "dom"]
draft: true
agente:
  tema: "explica cómo convertir el código que pinta un componente en una función render que regenera toda la vista desde el modelo, con el primer pintado incluido"
  prerequisitos:
    [
      "el modelo del capítulo anterior (la clase Carrito con suscribir y notificar); DOM básico (innerHTML, querySelector, addEventListener)",
    ]
---

El carrito ya se actualiza solo: cada cambio del modelo llega a la
pantalla. Pero el código que pinta es un suscriptor que toca tres
elementos a mano, y el marcado inicial repite un estado que puede
mentir. Hoy convertimos todo lo que se ve en una función del estado.

<!--more-->

Vamos a convertir el código que pinta el carrito en una función:
`render(modelo)` produce el marcado completo del componente y hasta el
primer pintado sale de ella. Al terminar podrás hacer que la pantalla
de tu componente sea una función de su estado, y verás qué queda por
separar todavía.

## El resultado primero

Antes de abrir la función conviene ver qué hace. Este es el arranque
del carrito sobre el modelo del
[capítulo anterior](/articulos/sacar-el-estado-del-dom/): un `<div>`
vacío en la página, una suscripción y una llamada inicial.

```js
// extracto: requiere la clase `Carrito` del capítulo anterior, el array `productos`,
// las funciones `render` y `conectar` de más abajo y un `<div id="carrito-app">` vacío
const carrito = new Carrito();
const actualizar = () => {
  render(carrito);
  conectar(carrito);
};
carrito.suscribir(actualizar);
actualizar();
```

Con eso montado, pulsamos «Añadir» en los tres productos y después
«Quitar» en la primera línea. Esto es lo que muestra la pantalla en cada momento:

```text
al montar:               0 ítems / $0
tras 3 «Añadir»:         3 ítems / $250
tras quitar el primero:  2 ítems / $205
```

Las mismas cifras de siempre, con una diferencia: el primer `0 / $0`
ya no está escrito en el HTML: lo produjo `render`. La pantalla
empieza siendo una función del estado, no un marcado que alguien
escribió a mano esperando acertar.

## Lo que el suscriptor hacía a mano

En el capítulo anterior el suscriptor pintaba así: buscaba el
`<span>` del total, el del contador y la `<ul>` del carrito, y tocaba
los tres por separado. Poco código, sí, pero repartido elemento a
elemento, y con una trampa escondida en el propio HTML:

```html
<h3>Tu carrito (<span id="contador">0</span>)</h3>
<ul id="carrito"></ul>
<p>Total: <span id="total">$0</span></p>
```

Ese `0` y ese `$0` son estado escrito a mano en el marcado. Si nadie
se suscribe, la página se queda mostrándolos para siempre, como
vimos en los límites del capítulo anterior: el HTML miente con total
tranquilidad. Hay dos fuentes de verdad y una de ellas es texto que
nadie actualiza.

## La vista

La refactorización es una sola idea: todo lo que se ve lo produce una
función del modelo. El HTML de la página queda reducido a un host
vacío:

```html
<div id="carrito-app"></div>
```

Y `render` genera el marcado completo, catálogo incluido:

```js
// extracto: `productos` es el array del catálogo, ya visto; `host` es el `<div>` anterior
function render(modelo) {
  host.innerHTML = `
    <ul id="catalogo">
      ${productos.map((p) => `<li>${p.nombre} — $${p.precio} <button data-agregar="${p.id}">Añadir</button></li>`).join("")}
    </ul>
    <h3>Tu carrito (<span id="contador">${modelo.unidades}</span>)</h3>
    <ul id="carrito">
      ${modelo.lineas.map((l) => `<li>${l.nombre} x${l.cantidad} — $${l.precio * l.cantidad} <button data-quitar="${l.linea}">Quitar</button></li>`).join("")}
    </ul>
    <p>Total: <span id="total">$${modelo.total}</span></p>`;
}
```

Tres cosas que cambian aquí. La primera: ya no hay marcado inicial que
pueda mentir, porque ya no hay marcado inicial. El `0` y el `$0` que
antes vivían en el HTML ahora salen de `modelo.unidades` y
`modelo.total`. La segunda: la vista entera está en un solo lugar; si
la pantalla muestra algo raro, la función `render` es el único sitio
donde mirar. La tercera es sutil: los botones llevan atributos
`data-agregar` y `data-quitar` en lugar de nacer con su manejador
puesto, porque el HTML se escribe como texto y los nodos todavía no
existen cuando se compone.

## El primer pintado

El arranque del resultado primero tiene dos líneas que hacen todo el
trabajo:

```js
// extracto: el arranque del resultado primero, de nuevo
carrito.suscribir(actualizar);
actualizar();
```

La primera es la de siempre: cada notificación del modelo dispara
`actualizar`, que repinta y recablea. La segunda es la que faltaba:
una llamada inicial para que la primera pantalla también la pinte
`render`. Antes, el estado inicial lo escribía el HTML a mano y la
página solo se ponía al día con la primera notificación; ahora el
primer pintado sigue el mismo camino que todos los demás. La pantalla
nunca muestra un estado que el modelo no tenga.

:::pausa
Predice qué muestra la página antes de la primera notificación, y
explica por qué ya no puede quedarse enseñando datos de mentira.
:::

## Los botones dentro del render

Cada repintado destruye los nodos y crea otros nuevos, así que hay
que volver a conectar los manejadores después de pintar. Para eso
sirven los `data-*` y la función `conectar`, la otra mitad de
`actualizar`:

```js
// extracto: sigue a `render`; `host` es el mismo `<div id="carrito-app">`
function conectar(modelo) {
  for (const b of host.querySelectorAll("[data-agregar]"))
    b.addEventListener("click", () =>
      modelo.agregar(productos.find((p) => p.id === Number(b.dataset.agregar))),
    );
  for (const b of host.querySelectorAll("[data-quitar]"))
    b.addEventListener("click", () => modelo.quitar(Number(b.dataset.quitar)));
}
```

Es el mismo patrón que el suscriptor del capítulo anterior ya usaba
para sus «Quitar», ahora con nombre propio y aplicado a todos los
botones. Y funciona, pero mira quién decide qué pasa al pulsar: la
propia vista. Cada botón recién nacido llama a `agregar` o a `quitar`
del modelo directamente.

La literatura del patrón lo dice sin rodeos. Tania Rascia, en su
[tutorial de MVC](https://www.taniarascia.com/javascript-mvc-todo-app/),
lo resume en una letanía: «the view never touches the model». La vista
no toca el modelo; la nuestra lo toca en cada clic. Dave Stearns
[matiza la regla](https://drstearns.github.io/tutorials/mvc/): en la
variante moderna la vista sí captura los eventos de usuario, como hace
la nuestra. Decidir qué se hace con ellos es otro trabajo, y es el paso
que queda.

La pieza siguiente es el carrito de este capítulo funcionando, con un
registro en vivo: cada notificación del modelo y el
repintado que provoca. El primer renglón recuerda que el pintado
inicial no vino de ninguna notificación.

:::demo{nombre="vista-instrumentada" altura="290px" altura-estrecha="400px"}
El carrito del capítulo funcionando junto al registro del modelo:
cada «Añadir» o «Quitar» produce una línea «notificación N →
repintado: M u / $X» en el registro, la más nueva arriba. Resultado
esperado: tres añadidos dejan tres notificaciones, contador 3 y
total $250; quitar la primera línea deja $205. La línea fija de
arriba del registro recuerda el pintado inicial, que no llegó por
notificación.
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
  de texto (el campo de cantidad que sigue fuera del arco), cada
  repintado borraría su contenido y le quitaría el foco mientras
  escribes.
- **Los manejadores viven dentro de la vista y tocan el modelo a
  discreción.** Funciona, pero es la separación que falta: quien
  decide qué pasa al pulsar no debería ser quien pinta.
- **`innerHTML` interpola datos sin escapar.** Aquí los nombres son
  literales del catálogo y no pasa nada; con datos que vinieran del
  usuario, esta plantilla sería una puerta abierta.

## El punto

El DOM ya no es fuente de verdad ni de marcado: todo lo que se ve
sale de `render(modelo)`, desde el primer pintado. Lo que queda suelto
son los eventos: los clics entran por dentro de la vista y alcanzan el
modelo sin intermediario. ¿Quién traduce un «Añadir» en una acción, y
una acción en un cambio del modelo? Ese es el trabajo del controlador,
y es el siguiente capítulo.
