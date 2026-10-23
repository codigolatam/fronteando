---
title: "El carrito a lo bruto: construyendo un componente web sin seguir un patrón"
description: "Un carrito de la compra sin framework que funciona y aun así cuesta mantener: construirlo, pedirle un cambio normal y nombrar el enredo que lo resiste."
date: 2026-10-21T19:56:00Z
categoria: arquitectura
nivel: intermedio
tags: ["javascript", "mvc", "dom"]
---

Añadir productos, quitar productos y calcular el total: el carrito de
compra de este artículo funciona sin necesidad de ningún framework, y
sin embargo es código que nadie quiere mantener porque el estado, los
eventos y el DOM están tan enredados que cualquier cambio conlleva más
riesgo de lo que debería.

<!--more-->

Vamos a construir el carrito y sus funcionalidades (catálogo, añadir,
quitar y total) a lo bruto, sin un patrón de diseño, y después vamos
a pedir el cambio más normal del mundo: que la cantidad de cada
producto se pueda editar en la propia lista. El código se va a
resistir a los cambios debido a la forma en que está construido y al
terminar podrás decir con precisión qué cosas se enredaron en este
componente sin estructura y por qué cada cambio nuevo sale más caro
que el anterior.

## El resultado primero

Antes de mirar su forma y estructura conviene verlo funcionar. Este es
el carrito completo, tal como lo escribe cualquiera cuando el
componente es pequeño y se está trabajando sin un framework:

```html
<ul id="catalogo"></ul>
<h3>Tu carrito (<span id="contador">0</span>)</h3>
<ul id="carrito"></ul>
<p>Total: <span id="total">$0</span></p>
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
  li.innerHTML = `${p.nombre} — $${p.precio} <button>Añadir</button>`;
  li.querySelector("button").addEventListener("click", () => {
    carrito.push({ ...p, cantidad: 1 });
    const item = document.createElement("li");
    item.innerHTML = `${p.nombre} x1 — $${p.precio} <button>Quitar</button>`;
    item.querySelector("button").addEventListener("click", () => {
      item.remove();
      total -= p.precio;
      unidades -= 1;
      document.querySelector("#total").textContent = `$${total}`;
      document.querySelector("#contador").textContent = unidades;
      carrito.splice(carrito.indexOf(carrito.find((c) => c.id === p.id)), 1);
    });
    document.querySelector("#carrito").appendChild(item);
    total += p.precio;
    unidades += 1;
    document.querySelector("#total").textContent = `$${total}`;
    document.querySelector("#contador").textContent = unidades;
  });
  document.querySelector("#catalogo").appendChild(li);
});
```

Al hacer clic en los tres «Añadir» la lista muestra tres líneas, el
contador dice 3 y el total $250. Quitando el teclado quedan dos
líneas y $205. Nada que reprochar: el componente hace lo que promete.

## Un componente como cualquier otro

Nadie escribe este código con mala intención. Es el resultado natural
de ir resolviendo lo que la pantalla pide, una línea cada vez.

El estado está repartido. `carrito` guarda los productos, `total` y
`unidades` guardan los datos numéricos, y el DOM guarda otra parte
de la verdad: cada `<li>` lleva el nombre, la cantidad y el subtotal
dentro de su texto. ¿Cuántos teclados hay en el carrito? Depende de
a quién le preguntes: el array sabe una cosa, el `<li>` otra y el
contador otra. Mientras coincidan, nadie lo nota. Y de las tres
copias, las que viven en el DOM son las traicioneras: no salen en un
`console.log` como el array, pero son las que el usuario tiene
delante.

Los manejadores de eventos tocan de todo. El de «Añadir» agrega datos
al array, crea un nodo, le cablea otro manejador y actualiza dos
`<span>`; el de «Quitar» borra el nodo, toca dos variables, dos
`<span>` y el array. Ninguno tiene una responsabilidad que quepa
en una frase.

Además el cableado es manual y disperso: cada `<li>` nuevo nace con
sus manejadores conectados a mano desde dentro de otro manejador.
Nada conecta las piezas salvo nuestra costumbre de hacerlo siempre
igual.

## La petición más normal del mundo

Llega la solicitud del cambio: que la cantidad de cada producto se
pueda editar en la propia línea del carrito. Es lo que cualquier
tienda hace, un `<input>` por línea. La versión razonable del `<li>`
y su nuevo manejador quedan así:

```js
// extracto: dentro del manejador de «Añadir», el <li> cambia
item.innerHTML = `${p.nombre} x<input type="number" value="1" min="1"> — <span class="subtotal">$${p.precio}</span> <button>Quitar</button>`;
item.querySelector("input").addEventListener("change", (e) => {
  const cantidad = Number(e.target.value);
  const i = carrito.findIndex((c) => c.id === p.id);
  carrito[i].cantidad = cantidad;
  total = carrito.reduce((s, c) => s + c.precio * c.cantidad, 0);
  unidades = carrito.reduce((s, c) => s + c.cantidad, 0);
  document.querySelector("#total").textContent = `$${total}`;
  document.querySelector("#contador").textContent = unidades;
  // y para que el <li> enseñe el subtotal nuevo, lo re-renderizamos
  item.innerHTML = `${p.nombre} x<input type="number" value="${cantidad}" min="1"> — <span class="subtotal">$${p.precio * cantidad}</span> <button>Quitar</button>`;
});
```

Fíjate en lo que ese `change` tuvo que hacer para una sola edición:
tocar el array, recalcular dos variables, pintar dos `<span>` y
reescribir el `<li>` entero. Los datos de cantidad, unidades y
subtotal ahora viven en tres sitios a la vez (el array, el `value`
del input y el texto del `<li>`), y todas hay que mantenerlas a mano.

Lo peor no es el trabajo extra: es que funciona y aun así rompe
cosas. Al ejecutarlo de verdad, cambiar la cantidad del teclado a 3
actualiza todo correctamente (total $135, contador 3, subtotal
$135) y en ese mismo instante el botón «Quitar» de esa línea deja de
funcionar: el `innerHTML` eliminó el botón viejo del DOM y el nuevo
nació sin manejadores. El input corrió la misma suerte: con un nodo
nuevo el foco se perdió a mitad de la edición.

La pantalla miente: parece un carrito normal y es un carrito con un
botón muerto y un campo que ya no escucha los cambios.

## El diagnóstico: tres cosas enredadas

El carrito no está mal programado, está enredado, y el enredo tiene
tres caras reconocibles:

**El estado no tiene dueño.** La verdad vive repartida entre un array,
unas variables sueltas y el propio DOM, y ninguna es la referencia de
las demás. Cada actualización debe aplicarse en todas las copias. Que
una se olvide es un bug el día de mañana.

**Los manejadores deciden de todo.** Cada evento ejecuta directamente
las acciones (mutar estado, repintar, cablear) sin pasar por ningún
sitio común. Añadir una vía nueva (un input, un cupón, un contador
más) significa repetir la cascada en un sitio más.

**El render destruye y re-cablea.** Actualizar la maqueta con
`innerHTML` crea nodos nuevos que nacen sin manejadores ni estado:
cada cambio pequeño obliga a gestionar el cableado a mano, y si se te
olvida un botón la interfaz deja de funcionar.

Cada síntoma encarece el siguiente cambio. Por eso el código espagueti
no se rompe de golpe hasta que el cambio más simple te lleva toda una
tarde.

## Lo que este post no soluciona (todavía)

Este capítulo se queda en el diagnóstico a propósito: no hemos
separado nada, y el carrito del final sigue siendo tan enredado como
el del principio. Desenredarlo (separar en capas quién guarda el
estado, quién escucha los eventos, quién pinta los elementos) es
exactamente el trabajo de los capítulos siguientes.

El ejemplo tampoco es una versión difícil de ver, es el código que
escribe una persona razonable con prisa y tiene la forma de un
componente real pequeño. En uno más grande no se introducen problemas
nuevos sino que hace que estos cuesten más.

Habrá quien ya esté pensando en las soluciones de manual: delegar los
eventos en el `<ul>` padre (que nunca se regenera y por tanto nunca
pierde sus manejadores) o tocar solo el trozo que cambia (un
`textContent` en el `.subtotal` en lugar de rehacer el `<li>`
entero). Los dos funcionan pero ninguno mejora nada: son dos líneas
más que hay que acordarse de mantener. El carrito con esos parches
sigue sin gestionar su estado ni tener un sitio común para sus
decisiones.

Aunque el patrón que falta aquí tiene nombre y décadas de historia
(Modelo, Vista y Controlador, que [Trygve Reenskaug concibió en Xerox
PARC](http://www.ifi.uio.no/~trygver/1979/mvc-2/1979-12-MVC.pdf)
allá por 1979), conocerlo de nombre no te dice dónde cortar tu
componente. Por eso en esta serie lo construimos pieza a pieza en
lugar de copiarlo de un diagrama.

## El punto

El ejemplo del carrito en la forma que tiene muestra algunos errores
comunes: el estado se escribe en la pantalla, la pantalla se lee como
estado y los eventos gestionan tanto la lógica como la composición
visual. Tres preguntas quedan flotando sobre el carrito: quién guarda
el estado, quién decide lo que pasa y quién pinta los elementos. El
enredo es lo que ocurre cuando todas se responden con «donde caiga».
La siguiente parte de la serie responde la primera pregunta: el estado
se gestiona mediante un Modelo.
