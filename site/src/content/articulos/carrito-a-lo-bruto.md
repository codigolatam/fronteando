---
title: "El carrito a lo bruto: construir un componente sin patrón"
description: "Un carrito de la compra sin framework que funciona y aun así cuesta mantener: construirlo, pedirle un cambio normal y nombrar el enredo que lo resiste."
date: 2026-10-21T19:56:00Z
categoria: arquitectura
nivel: intermedio
tags: ["javascript", "mvc", "dom"]
---

Añade productos, quita productos, el total cuadra: el carrito de la
compra de este artículo funciona sin tocar ningún framework. Y sin
embargo es código que nadie quiere mantener, porque el estado, los
eventos y el DOM están tan enredados que cualquier cambio cuesta más
de lo que debería.

<!--more-->

Vamos a construir ese carrito a lo bruto (catálogo, añadir, quitar y
total, sin patrón de por medio) y después le vamos a pedir el cambio
más normal del mundo: que la cantidad de cada producto se pueda editar
en la propia lista. El código se va a resistir, y la resistencia tiene
nombre: al terminar podrás decir con precisión qué tres cosas se
enredaron en un componente sin estructura y por qué cada cambio nuevo
sale más caro que el anterior.

## El resultado primero

Antes de mirarle las tripas conviene verlo funcionar. Este es el
carrito completo, tal como lo escribe cualquiera cuando el componente
es pequeño y el framework parece exceso:

```html
<ul id="catalogo"></ul>
<h3>Tu carrito (<span id="contador">0</span>)</h3>
<ul id="carrito"></ul>
<p>Total: <span id="total">0 €</span></p>
```

```js
const productos = [
  { id: 1, nombre: "Teclado", precio: 45 },
  { id: 2, nombre: "Ratón", precio: 25 },
  { id: 3, nombre: "Monitor", precio: 180 },
];
const carrito = [];
let total = 0;
let unidades = 0;

productos.forEach((p) => {
  const li = document.createElement("li");
  li.innerHTML = `${p.nombre} — ${p.precio} € <button>Añadir</button>`;
  li.querySelector("button").addEventListener("click", () => {
    carrito.push({ ...p, cantidad: 1 });
    const item = document.createElement("li");
    item.innerHTML = `${p.nombre} x1 — ${p.precio} € <button>Quitar</button>`;
    item.querySelector("button").addEventListener("click", () => {
      item.remove();
      total -= p.precio;
      unidades -= 1;
      document.querySelector("#total").textContent = `${total} €`;
      document.querySelector("#contador").textContent = unidades;
      carrito.splice(carrito.indexOf(carrito.find((c) => c.id === p.id)), 1);
    });
    document.querySelector("#carrito").appendChild(item);
    total += p.precio;
    unidades += 1;
    document.querySelector("#total").textContent = `${total} €`;
    document.querySelector("#contador").textContent = unidades;
  });
  document.querySelector("#catalogo").appendChild(li);
});
```

Pulsando los tres «Añadir» la lista muestra tres líneas, el contador
dice 3 y el total 250 €. Quitando el teclado quedan dos líneas y 205
€. Nada que reprochar: el componente hace lo que promete.

## Un componente como otro cualquiera

Nadie escribe este código con mala intención. Es el resultado natural
de ir resolviendo lo que la pantalla pide, una línea cada vez (y sin
embargo, si lo lees con atención, las decisiones ya están tomadas).

El estado está repartido. `carrito` guarda los productos, `total` y
`unidades` guardan dos números, y el propio DOM guarda otro trozo de
la verdad: cada `<li>` lleva el nombre, la cantidad y el subtotal
soldados en su texto. ¿Cuántos teclados hay en el carrito? Depende de
a quién le preguntes: el array sabe una cosa, el `<li>` otra y el
contador otra. Mientras coincidan, nadie lo nota.

Los manejadores tocan de todo. El de «Añadir» empuja al array, crea un
nodo, le cablea otro manejador y actualiza dos `<span>`; el de
«Quitar» borra el nodo, toca dos variables, dos `<span>` y el array.
Ninguno tiene una responsabilidad que quepa en una frase.

Y el cableado es manual y disperso: cada `<li>` nuevo nace con sus
manejadores conectados a mano desde dentro de otro manejador. Nada
conecta las piezas salvo nuestra costumbre de hacerlo siempre igual.

## La petición más normal del mundo

Llega el cambio: que la cantidad de cada producto se pueda editar en
la propia línea del carrito. Es lo que cualquier tienda hace, un
`<input>` por línea. La versión razonable del `<li>` y su nuevo
manejador quedan así:

```js
// extracto: dentro del manejador de «Añadir», el <li> cambia
item.innerHTML = `${p.nombre} x<input type="number" value="1" min="1"> — <span class="subtotal">${p.precio} €</span> <button>Quitar</button>`;
item.querySelector("input").addEventListener("change", (e) => {
  const cantidad = Number(e.target.value);
  const i = carrito.findIndex((c) => c.id === p.id);
  carrito[i].cantidad = cantidad;
  total = carrito.reduce((s, c) => s + c.precio * c.cantidad, 0);
  unidades = carrito.reduce((s, c) => s + c.cantidad, 0);
  document.querySelector("#total").textContent = `${total} €`;
  document.querySelector("#contador").textContent = unidades;
  // y para que el <li> enseñe el subtotal nuevo, lo re-renderizamos
  item.innerHTML = `${p.nombre} x<input type="number" value="${cantidad}" min="1"> — <span class="subtotal">${p.precio * cantidad} €</span> <button>Quitar</button>`;
});
```

Fíjate en lo que ese `change` tuvo que hacer para una sola edición:
tocar el array, recalcular dos variables, pintar dos `<span>` y
reescribir el `<li>` entero. Cantidad, unidades y subtotal viven ahora
en tres sitios a la vez (el array, el `value` del input y el texto del
`<li>`), y todas hay que mantenerlas a mano.

Pero lo peor no es el trabajo extra: es que funciona y aun así rompe
cosas. Ejecutado de verdad, cambiar la cantidad del teclado a 3
actualiza todo correctamente (total 135 €, contador 3, subtotal 135
€) y en ese mismo instante el botón «Quitar» de esa línea deja de
funcionar: el `innerHTML` dejó el botón viejo fuera del DOM y el nuevo
nació sin manejadores. El input que acababas de usar corrió
la misma suerte. La pantalla miente: parece un carrito normal y es un
carrito con un botón muerto.

## El diagnóstico: tres cosas enredadas

El carrito no está mal programado; está enredado. Y el enredo tiene
tres caras reconocibles:

**El estado no tiene dueño.** La verdad vive repartida entre un array,
unas variables sueltas y el propio DOM, y ninguna es la referencia de
las demás. Cada actualización debe acordarse de todas las copias; la
que se olvide es el bug de mañana.

**Los manejadores deciden de todo.** Cada evento ejecuta directamente
sus consecuencias (mutar estado, repintar, cablear) sin pasar por
ningún sitio común. Añadir una vía nueva (un input, un cupón, un
contador más) significa repetir la cascada en un sitio más.

**El render destruye y re-cablea.** Actualizar el marcado con
`innerHTML` crea nodos nuevos que nacen sin manejadores ni estado:
cada cambio pequeño obliga a rehacer el cableado a mano, y el que se
olvide de un botón deja una interfaz que parece viva y está muerta.

De las tres, la última tiene ya media respuesta en este blog:
[«Un store reactivo en vanilla JS»](/articulos/un-store-reactivo-en-vanilla-js/)
enseñaba cómo un mecanismo mínimo mantiene la pantalla al día sin
re-cablear nada a mano. Las otras dos siguen abiertas.

Cada síntoma encarece el siguiente cambio. Por eso el código espagueti
no se rompe de golpe: se encarece gota a gota, hasta que el cambio más
tonto cuesta una tarde.

## Lo que este post no arregla (todavía)

Este capítulo se queda en el diagnóstico a propósito: no hemos
separado nada, y el carrito del final sigue tan enredado como el del
principio. Desenredarlo (quién guarda el estado, quién escucha, quién
pinta) es exactamente el trabajo de los capítulos que siguen.

Tampoco el ejemplo es un espantapájaros: es el código que escribe una
persona razonable con prisa razonable, y sus síntomas son los de un
componente real pequeño. Uno más grande no introduce problemas nuevos;
hace que estos cuesten más.

Y aunque el patrón que falta aquí tiene nombre y décadas (Modelo,
Vista y Controlador, que [Trygve Reenskaug concibió en Xerox
PARC](http://www.ifi.uio.no/~trygver/1979/mvc-2/1979-12-MVC.pdf)
allá por 1979), conocerlo de nombre no te dice dónde cortar tu
componente. Por eso la serie lo construye pieza a pieza en lugar de
copiarlo de un diagrama.

## El punto

El espagueti no es un código roto: es un código sin reparto. Tres
preguntas quedan flotando sobre el carrito (quién guarda el estado,
quién decide lo que pasa y quién pinta) y el enredo es lo
que ocurre cuando todas se responden con «donde caiga». La siguiente
parada de la serie responde la primera: el Modelo, el estado que por
fin tiene un sitio.
