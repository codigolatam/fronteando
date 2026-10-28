---
title: "Sacar el estado del DOM: un modelo que notifica sus cambios"
description: "¿Cómo compruebas el total del carrito sin abrir el navegador? Sacando el estado del DOM a un modelo que notifica sus cambios."
date: 2026-10-26T12:00:00Z
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
lo que promete, pero su estado está repartido entre un array, unas
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

Antes de abrir la clase conviene ver qué hace. Este es el modelo del
carrito del capítulo anterior, ejecutado sin ninguna pantalla: añadimos
los tres productos y quitamos el primero, con un suscriptor que imprime
el estado cada vez que el modelo notifica.

```js
// extracto: va a continuación de la clase `Carrito` de la sección «El modelo»
const carrito = new Carrito();
carrito.suscribir((c) => console.log(`${c.unidades} u / $${c.total}`));
carrito.agregar({ id: 1, nombre: "Teclado", precio: 45 });
carrito.agregar({ id: 2, nombre: "Ratón", precio: 25 });
carrito.agregar({ id: 3, nombre: "Monitor", precio: 180 });
carrito.quitar(1);
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
estado está en un objeto que no sabe nada de la página. La clase que
hace posible este código es la que abrimos a continuación.

## Qué sale del DOM

En el carrito a lo bruto, el estado vivía en tres sitios. El array
`carrito` guardaba los productos, las variables `total` y `unidades`
guardaban los números, y cada `<li>` guardaba su nombre y su subtotal
dentro de su texto. Cuando un cambio tocaba una de las copias, había
que acordarse de tocar las demás.

Lo que sale del DOM son los ítems, las cantidades y el total. La
página sigue mostrándolos, pero ya no los guarda: solo los pinta a
partir de los datos. El texto de cada `<li>` tampoco sale como fuente:
era una copia más, y la pantalla solo la repite. El DOM deja de ser la
fuente de verdad y pasa a ser un reflejo de ella.

## El modelo

La clase completa cabe en un bloque. Es el carrito del capítulo
anterior con sus datos en privado y un método para suscribirse; cada
línea entra con cantidad 1 y el modelo no ofrece cambiarla:

```js
class Carrito {
  #lineas = [];
  #siguienteId = 1;
  #suscriptores = [];

  suscribir(fn) {
    this.#suscriptores.push(fn);
  }

  #notificar() {
    for (const fn of this.#suscriptores) fn(this);
  }

  get lineas() {
    return this.#lineas.map((l) => ({ ...l }));
  }

  get unidades() {
    return this.#lineas.reduce((suma, l) => suma + l.cantidad, 0);
  }

  get total() {
    return this.#lineas.reduce((suma, l) => suma + l.precio * l.cantidad, 0);
  }

  agregar(producto) {
    this.#lineas.push({ linea: this.#siguienteId++, ...producto, cantidad: 1 });
    this.#notificar();
  }

  quitar(linea) {
    this.#lineas = this.#lineas.filter((l) => l.linea !== linea);
    this.#notificar();
  }
}
```

En esa clase tomamos tres decisiones que conviene mirar de cerca.

**Los datos son privados.** `#lineas` solo se modifica desde dentro de
la clase, así que nadie puede cambiar el array por accidente desde
fuera. El getter `lineas` devuelve copias: si alguien modifica una
copia, el modelo no se entera, y eso es lo que queremos.

**El total y las unidades se calculan.** `total` y `unidades` no son
variables: son cuentas hechas sobre las líneas en el momento en que
se piden. Ya no tenemos dos sitios que sincronizar, y el primer problema del
capítulo anterior, el estado sin dueño, queda resuelto por diseño.

**Cada cambio termina en una notificación.** Los dos métodos que
modifican el estado, `agregar` y `quitar`, llaman a `#notificar()` al
final, después de mutar. El orden importa: el suscriptor debe leer el
estado ya actualizado.

:::pausa
Explica por qué `total` y `unidades` no pueden desincronizarse de las
líneas, y qué tendrías que cambiar para que sí pudieran.
:::

## Un patrón con nombre

El modelo no sabe quién escucha ni para qué. Solo guarda una lista de
suscriptores y los notifica cuando sus datos cambian. Es el patrón de
observador, y conviene conocerlo con su nombre porque aparece en
muchas herramientas de estado. A mano, cada manejador repintaba el total
y el contador por su cuenta; con el patrón, el modelo notifica una sola
vez y cada suscriptor decide qué hace con la notificación.

Dave Stearns describe este mismo diseño en su [tutorial sobre MVC](https://drstearns.github.io/tutorials/mvc/):
un modelo que mantiene una lista de oyentes y los notifica cuando sus
datos cambian, y una vista que se vuelve a pintar sola al recibir la
notificación. Nuestro modelo pasa el propio carrito al suscriptor, para
que pueda leer el estado sin tener una referencia aparte.

## Probarlo sin DOM

Guarda la clase de arriba y este bloque en un archivo `.mjs` y ejecútalo con `node`.

```js
// extracto: requiere la clase `Carrito` en el mismo archivo, antes de este bloque
import assert from "node:assert/strict";

const carrito = new Carrito();
carrito.agregar({ id: 1, nombre: "Teclado", precio: 45 });
carrito.agregar({ id: 2, nombre: "Ratón", precio: 25 });
carrito.agregar({ id: 3, nombre: "Monitor", precio: 180 });
assert.equal(carrito.unidades, 3);
assert.equal(carrito.total, 250);

carrito.quitar(1);
assert.equal(carrito.unidades, 2);
assert.equal(carrito.total, 205);
console.log("el carrito cuadra: 2 líneas, $205");
```

No hay ninguna línea de DOM. Si el total estuviera mal, la prueba lo
diría en la terminal, sin abrir una página ni buscar un `<span>`.

:::pausa
Predice qué total dará el carrito si, tras quitar el teclado, añades
otro teclado, y comprueba la predicción con `node`.
:::

## Conectar el modelo con la pantalla

El modelo no pinta nada. Para que la página se entere de los cambios,
alguien tiene que suscribirse y pintar. Este es el marcado del carrito,
el mismo del capítulo anterior:

```html
<ul id="catalogo"></ul>
<h3>Tu carrito (<span id="contador">0</span>)</h3>
<ul id="carrito"></ul>
<p>Total: <span id="total">$0</span></p>
```

El catálogo ya no guarda nada: cada «Añadir» le pide al modelo que
agregue el producto.

```js
// extracto: sigue a `const carrito = new Carrito();` del bloque anterior
const productos = [
  { id: 1, nombre: "Teclado", precio: 45 },
  { id: 2, nombre: "Ratón", precio: 25 },
  { id: 3, nombre: "Monitor", precio: 180 },
];

for (const producto of productos) {
  const li = document.createElement("li");
  li.textContent = `${producto.nombre} — $${producto.precio} `;
  const añadir = document.createElement("button");
  añadir.textContent = "Añadir";
  añadir.addEventListener("click", () => carrito.agregar(producto));
  li.append(añadir);
  document.querySelector("#catalogo").append(li);
}
```

El suscriptor pinta el carrito a partir del modelo:

```js
// extracto: sigue al bloque anterior
const totalEl = document.querySelector("#total");
const contadorEl = document.querySelector("#contador");
const listaEl = document.querySelector("#carrito");

carrito.suscribir((c) => {
  totalEl.textContent = `$${c.total}`;
  contadorEl.textContent = c.unidades;
  listaEl.replaceChildren(
    ...c.lineas.map((l) => {
      const li = document.createElement("li");
      li.textContent = `${l.nombre} x${l.cantidad} — $${l.precio * l.cantidad} `;
      const quitar = document.createElement("button");
      quitar.textContent = "Quitar";
      quitar.addEventListener("click", () => carrito.quitar(l.linea));
      li.append(quitar);
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
  la página se queda con su marcado inicial: `$0` y la lista vacía. El
  modelo no puede evitarlo.
- **El código que pinta sigue junto al que cambia los datos.** Quien
  llama a `agregar` y a `quitar` es el mismo componente que decide cómo
  se ve la lista, así que la separación todavía está a medias.
- **El suscriptor repinta todo en cada notificación.** Con tres líneas
  no se nota. Con una lista larga, habrá que decidir qué repintar y cuándo.

## El punto

El DOM ya no es la verdad, pero sigue sin actualizarse solo. ¿Quién
lo mantiene al día sin que tengamos que escribir cada suscriptor a
mano? Esa es la pregunta del siguiente capítulo: la vista.
