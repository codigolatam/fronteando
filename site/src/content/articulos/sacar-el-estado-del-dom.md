---
title: "Sacar el estado del DOM: un modelo que avisa cuando cambia"
description: "Pasamos el estado del carrito a una clase que avisa de sus cambios: el total deja de depender de la pantalla y se puede comprobar en la terminal."
date: 2026-10-26T12:00:00Z
categoria: arquitectura
nivel: intermedio
tags: ["javascript", "mvc", "dom"]
draft: true
agente:
  tema: "un modelo en vanilla JS que guarda el estado de un carrito y avisa a quien se suscriba cuando cambia, para sacar el estado del DOM y probar su lógica sin navegador"
  prerequisitos:
    [
      "JavaScript con clases y métodos privados, DOM básico (querySelector, textContent)",
    ]
---

El carrito del capítulo anterior hace lo que promete, pero su estado
está repartido entre un array, unas variables y el texto de la
pantalla. Para saber cuánto vale hay que mirar la página. Hoy sacamos
ese estado a una clase que avisa de sus cambios, y así podemos
comprobar el total sin abrir el navegador.

<!--more-->

Vamos a construir el modelo del carrito: una clase que guarda las
líneas y el total, y que avisa a quien se haya suscrito cada vez que
algo cambia. Al terminar podrás sacar el estado de tu componente a un
modelo que avisa de sus cambios y probar esa lógica sin tocar el DOM.

## El resultado primero

Antes de abrir la clase conviene ver qué hace. Este es el carrito del
capítulo anterior ejecutado sobre el modelo, sin ninguna pantalla: tres
añadidos y un quitar, con un suscriptor que imprime el estado cada vez
que el modelo avisa.

```js
const carrito = new Carrito();
carrito.suscribir((c) => console.log(`${c.unidades} u / $${c.total}`));
carrito.agregar({ id: 1, nombre: "Teclado", precio: 45 });
carrito.agregar({ id: 2, nombre: "Ratón", precio: 25 });
carrito.agregar({ id: 3, nombre: "Monitor", precio: 180 });
carrito.quitar(1);
```

Cada línea de la salida corresponde a un aviso:

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
partir de los datos. El DOM deja de ser la fuente de verdad y pasa a
ser un reflejo de ella.

## El modelo

La clase completa cabe en un bloque. Es el mismo carrito del capítulo
anterior, con sus datos en privado y un método para suscribirse:

```js
class Carrito {
  #lineas = [];
  #siguienteId = 1;
  #suscriptores = [];

  suscribir(fn) {
    this.#suscriptores.push(fn);
  }

  #avisar() {
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
    this.#avisar();
  }

  quitar(linea) {
    this.#lineas = this.#lineas.filter((l) => l.linea !== linea);
    this.#avisar();
  }

  cambiarCantidad(linea, cantidad) {
    this.#lineas.find((l) => l.linea === linea).cantidad = cantidad;
    this.#avisar();
  }
}
```

Hay tres decisiones en esa clase que conviene mirar de cerca.

**Los datos son privados.** `#lineas` solo se modifica desde dentro de
la clase, así que nadie puede cambiar el array por accidente desde
fuera. El getter `lineas` devuelve copias: si alguien modifica una
copia, el modelo no se entera, y eso es lo que queremos.

**El total y las unidades se calculan.** `total` y `unidades` no son
variables: son cuentas hechas sobre las líneas en el momento en que
se piden. Ya no hay dos sitios que sincronizar, y el primer problema
del capítulo anterior, el estado sin dueño, queda resuelto por
diseño.

**Cada cambio termina en un aviso.** Los tres métodos que modifican
el estado llaman a `#avisar()` al final, después de mutar. El orden
importa: el suscriptor debe leer el estado ya nuevo.

:::pausa
Explica por qué `total` y `unidades` no pueden desincronizarse de las
líneas, y qué tendrías que cambiar para que sí pudieran.
:::

## Un patrón con nombre

El modelo no sabe quién escucha ni para qué. Solo guarda una lista de
suscriptores y los avisa cuando sus datos cambian. Es el patrón de
observador, y conviene conocerlo con su nombre porque aparece en muchas
herramientas de estado.

Dave Stearns describe este mismo arreglo en su [tutorial sobre MVC](https://drstearns.github.io/tutorials/mvc/):
un modelo que mantiene una lista de oyentes y los avisa cuando sus
datos cambian, y una vista que se vuelve a pintar sola al recibir el
aviso. Nuestro modelo pasa el propio carrito al suscriptor, para que
pueda leer el estado sin tener una referencia aparte.

## Probarlo sin DOM

Guarda la clase de arriba y este bloque en un archivo `.mjs`. Ejecútalo
con `node` sin cambiar nada.

```js
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
alguien tiene que suscribirse y pintar. Con el mismo marcado del
capítulo anterior (`#contador`, `#carrito` y `#total`), el suscriptor
se ve así:

```js
const totalEl = document.querySelector("#total");
const contadorEl = document.querySelector("#contador");
const listaEl = document.querySelector("#carrito");

carrito.suscribir((c) => {
  totalEl.textContent = `$${c.total}`;
  contadorEl.textContent = c.unidades;
  listaEl.replaceChildren(
    ...c.lineas.map((l) => {
      const li = document.createElement("li");
      li.textContent = `${l.nombre} x${l.cantidad} — $${l.precio * l.cantidad}`;
      return li;
    }),
  );
});
```

Cada aviso repinta el total, el contador y la lista entera. Es poco
código, y los datos solo viven en el modelo: la pantalla es una copia
que se regenera en cada cambio.

## Los límites de este paso

Este paso deja tres cosas sin resolver, y conviene nombrarlas.

- **La pantalla no se actualiza sola.** Si alguien olvida suscribirse,
  la página vuelve a mostrar datos viejos. El modelo no puede evitarlo.
- **El código que pinta sigue junto al que cambia los datos.** Quien
  llama a `agregar` y a `quitar` es el mismo componente que decide cómo
  se ve la lista, así que la separación todavía está a medias.
- **El suscriptor repinta todo en cada aviso.** Con tres líneas no se
  nota. Con una lista larga, habrá que decidir qué se repinta y cuándo.

## El cierre

El DOM ya no es la verdad, pero sigue sin actualizarse solo. ¿Quién
lo mantiene al día sin que tengamos que escribir cada suscriptor a
mano? Esa es la pregunta del siguiente capítulo: la vista.
