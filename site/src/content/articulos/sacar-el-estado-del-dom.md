---
title: "Sacar el estado del DOM: un modelo que notifica sus cambios"
description: "¿Cómo compruebas el total del carrito sin abrir el navegador? Sacando el estado del DOM a un modelo que notifica sus cambios."
date: 2026-10-28T01:59:00Z
categoria: arquitectura
nivel: intermedio
tags: ["javascript", "mvc", "dom"]
agente:
  tema: "explica cómo sacar el estado de un carrito en vanilla JS a una clase que notifica a sus suscriptores, y cómo probar esa lógica en Node sin DOM"
  prerequisitos:
    [
      "JavaScript con clases y métodos privados; DOM básico (querySelector, textContent, createElement, addEventListener)",
    ]
---

El [carrito del capítulo anterior](/articulos/carrito-a-lo-bruto/) hace
lo que promete, pero su estado está repartido entre un arreglo, unas
variables y el texto de la pantalla. Para saber cuánto vale hay que
mirar la página. Hoy sacamos ese estado a una clase que notifica sus
cambios, y así podemos comprobar el total sin abrir el navegador.

<!--more-->

Vamos a construir el modelo del carrito: una clase que guarda las
líneas y calcula el total, y que notifica a quien se haya suscrito
cada vez que algo cambia. Al terminar podrás sacar el estado de tu
componente a un modelo que notifica sus cambios y probar esa lógica
sin tocar el DOM.

## El resultado primero

Antes de abrir la clase conviene ver qué hace. Este es el recorrido del
capítulo anterior ejecutado sobre el modelo nuevo, sin ninguna pantalla: añadimos
los tres productos y quitamos el primero, con un suscriptor que imprime
el estado cada vez que el modelo notifica.

```js
// extracto: va a continuación de la clase `Cart` de la sección «El modelo»
const cart = new Cart();
cart.subscribe((c) => console.log(`${c.units} u / $${c.total}`));
cart.add({ id: 1, name: "Teclado", price: 45 });
cart.add({ id: 2, name: "Ratón", price: 25 });
cart.add({ id: 3, name: "Monitor", price: 180 });
cart.remove(1);
```

Cada línea de la salida corresponde a una notificación:

```text
1 u / $45
2 u / $70
3 u / $250
2 u / $205
```

Tres añadidos dejan $250 y quitar el teclado deja $205, las mismas
cifras del capítulo anterior. La diferencia es dónde viven: ahora el
estado está en un objeto que no sabe nada de la página. Antes de abrir la clase
que lo hace posible conviene nombrar qué sale del DOM y qué se queda.

## Qué sale del DOM

En el carrito a lo bruto, el estado vivía en tres sitios. El arreglo
`cart` guardaba los productos, las variables `total` y `units`
guardaban los números, y cada `<li>` guardaba su nombre y su subtotal
dentro de su texto. Cuando un cambio tocaba una de las copias, había
que acordarse de tocar las demás.

Lo que sale del DOM son las líneas, las cantidades y el total. La
página sigue mostrándolos, pero ya no los guarda: solo los pinta a
partir de los datos. Así, el DOM deja de ser la fuente de verdad y pasa
a ser un reflejo de ella.

## El modelo

La clase completa cabe en un bloque. Es el carrito del capítulo
anterior con sus datos en privado y un método para suscribirse; cada
línea entra con cantidad 1 y el modelo no ofrece cambiarla:

```js
class Cart {
  #lines = [];
  #nextId = 1;
  #subscribers = [];

  subscribe(fn) {
    this.#subscribers.push(fn);
  }

  #notify() {
    for (const fn of this.#subscribers) fn(this);
  }

  get lines() {
    return this.#lines.map((l) => ({ ...l }));
  }

  get units() {
    return this.#lines.reduce((sum, l) => sum + l.quantity, 0);
  }

  get total() {
    return this.#lines.reduce((sum, l) => sum + l.price * l.quantity, 0);
  }

  add(product) {
    this.#lines.push({ line: this.#nextId++, ...product, quantity: 1 });
    this.#notify();
  }

  remove(line) {
    this.#lines = this.#lines.filter((l) => l.line !== line);
    this.#notify();
  }
}
```

Un detalle antes de mirar las decisiones: cada producto trae su `id`,
pero la línea lleva el suyo propio (`line`, que sale de `#nextId`),
porque el mismo producto puede entrar dos veces y hay que poder quitar
una línea sin llevarse la otra.

En esa clase tomamos tres decisiones que conviene mirar de cerca.

**Los datos son privados.** `#lines` solo se modifica desde dentro de
la clase, así que nadie puede cambiar el arreglo por accidente desde
fuera. El getter `lines` (una propiedad que se calcula al leerla) devuelve copias: si alguien modifica una
copia, el modelo no se entera, y eso es lo que queremos.

**El total y las unidades se calculan.** `total` y `units` no son
variables: son cuentas hechas sobre las líneas en el momento en que
se piden. Ya no tenemos dos sitios que sincronizar, y el primer problema del
capítulo anterior, el estado sin una fuente de verdad única, queda resuelto por diseño.

**Cada cambio termina en una notificación.** Los dos métodos que
modifican el estado, `add` y `remove`, llaman a `#notify()` al
final, después de modificar el estado. El orden importa: el suscriptor debe leer el
estado ya actualizado.

:::pausa
Explica por qué `total` y `units` no pueden desincronizarse de las
líneas, y qué tendrías que cambiar para que sí pudieran.
:::

## Un patrón con nombre

El modelo no sabe quién escucha ni para qué. Solo guarda una lista de
suscriptores y los notifica cuando sus datos cambian. Ese diseño tiene nombre,
patrón de observador, y conviene conocerlo porque aparece en muchas
herramientas de estado, empezando por los stores de los frameworks
front-end. A mano, cada manejador repintaba el total
y el contador por su cuenta; con el patrón, el modelo notifica una sola
vez y cada suscriptor decide qué hace con la notificación.

Dave Stearns describe este mismo diseño en su [tutorial sobre MVC](https://drstearns.github.io/tutorials/mvc/):
un modelo que mantiene una lista de suscriptores y los notifica cuando sus
datos cambian, y una vista que se vuelve a pintar sola al recibir la
notificación. Nuestro modelo pasa el propio carrito al suscriptor, para
que pueda leer el estado sin tener una referencia aparte. Y un modelo
que no conoce la página se puede ejecutar, y probar, fuera de ella.

## Probarlo sin DOM

Guarda la clase de arriba y este bloque en un archivo `.mjs` y ejecútalo con `node`.

```js
// extracto: requiere la clase `Cart` en el mismo archivo, antes de este bloque
import assert from "node:assert/strict";

const cart = new Cart();
cart.add({ id: 1, name: "Teclado", price: 45 });
cart.add({ id: 2, name: "Ratón", price: 25 });
cart.add({ id: 3, name: "Monitor", price: 180 });
assert.equal(cart.units, 3);
assert.equal(cart.total, 250);

cart.remove(1);
assert.equal(cart.units, 2);
assert.equal(cart.total, 205);
console.log("el carrito cuadra: 2 líneas, $205");
```

No hay ni un nodo del DOM. Si el total estuviera mal, la prueba lo
diría en la terminal, sin abrir una página ni buscar un `<span>`.

:::pausa
Predice qué total y cuántas líneas tendrá el carrito si, tras quitar
el teclado, añades otro teclado; comprueba la predicción con `node`.
:::

## Conectar el modelo con la pantalla

El modelo no pinta nada. Para que la página se entere de los cambios,
alguien tiene que suscribirse y pintar. Este es el HTML del carrito,
el mismo del capítulo anterior:

```html
<ul id="catalog"></ul>
<h3>Tu carrito (<span id="counter">0</span>)</h3>
<ul id="cart"></ul>
<p>Total: <span id="total">$0</span></p>
```

El catálogo ya no guarda nada: cada «Añadir» le pide al modelo que
añada el producto.

```js
// extracto: va tras la clase `Cart` y `const cart = new Cart();`
const products = [
  { id: 1, name: "Teclado", price: 45 },
  { id: 2, name: "Ratón", price: 25 },
  { id: 3, name: "Monitor", price: 180 },
];

for (const product of products) {
  const li = document.createElement("li");
  li.textContent = `${product.name} — $${product.price} `;
  const addButton = document.createElement("button");
  addButton.textContent = "Añadir";
  addButton.addEventListener("click", () => cart.add(product));
  li.append(addButton);
  document.querySelector("#catalog").append(li);
}
```

El suscriptor pinta el carrito a partir del modelo:

```js
// extracto: sigue al bloque anterior
const totalEl = document.querySelector("#total");
const counterEl = document.querySelector("#counter");
const listEl = document.querySelector("#cart");

cart.subscribe((c) => {
  totalEl.textContent = `$${c.total}`;
  counterEl.textContent = c.units;
  listEl.replaceChildren(
    ...c.lines.map((l) => {
      const li = document.createElement("li");
      li.textContent = `${l.name} x${l.quantity} — $${l.price * l.quantity} `;
      const remove = document.createElement("button");
      remove.textContent = "Quitar";
      remove.addEventListener("click", () => cart.remove(l.line));
      li.append(remove);
      return li;
    }),
  );
});
```

Cada notificación repinta el total, el contador y la lista entera. Es
poco código, y los datos solo viven en el modelo: la pantalla es una
copia que se regenera en cada cambio.

## Los límites de este paso

Este paso deja cuatro cosas sin resolver, y conviene nombrarlas.

- **La cantidad no se puede editar.** El capítulo anterior tenía un campo
  por línea; aquí cada producto entra con cantidad 1 y el modelo no
  ofrece cambiarla. Editar la cantidad queda fuera de este capítulo.
- **La pantalla no se actualiza sola.** Si alguien olvida suscribirse,
  la página se queda con su HTML inicial: `$0` y la lista vacía. El
  modelo no puede evitarlo.
- **El código que pinta sigue junto al que cambia los datos.** Quien
  llama a `add` y a `remove` es el mismo componente que decide cómo
  se ve la lista, así que la separación todavía está a medias.
- **El suscriptor repinta todo en cada notificación.** Con tres líneas
  no se nota. Con una lista larga, habrá que decidir qué repintar y cuándo.

## El punto

El DOM ya no es la fuente de verdad: ahora solo refleja lo que el
modelo notifica. Pero ese reflejo lo escribimos a mano, suscriptor por
suscriptor, junto al código que cambia los datos. ¿Cómo se organiza la
parte que pinta? Esa es la pregunta del siguiente capítulo: la vista.
