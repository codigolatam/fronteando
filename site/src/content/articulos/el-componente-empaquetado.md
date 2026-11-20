---
title: "El componente empaquetado: el MVC en una clase"
description: "¿Cómo usar el carrito MVC sin cablear tres piezas a mano cada vez? Empaquetándolo en una clase: dos instancias en la misma página lo demuestran."
date: 2026-11-19T23:37:30Z
categoria: arquitectura
nivel: intermedio
tags: ["javascript", "mvc", "dom"]
agente:
  tema: "empaqueta un componente MVC de tres piezas sueltas en una clase instanciable donde cada método conserva su rol (modelo que notifica, render función del estado, manejador delegado), con estado privado y ciclo de vida"
  prerequisitos:
    [
      "el carrito MVC de la serie o un MVC equivalente (modelo que notifica, render, delegación de eventos)",
      "clases en JavaScript con campos privados `#`",
    ]
---

El carrito ya separa sus tres piezas y funciona. Pero usarlo exige
cablearlas a mano cada vez: crear el modelo, suscribir el render,
registrar el manejador, pintar la primera pantalla. Un componente
debería ser un `new`. Hoy pasa a serlo.

<!--more-->

Vamos a empaquetar el carrito en una clase: `new CartComponent(host)`
pone en marcha las tres piezas de una vez y `unmount` las desmonta
revirtiendo cada paso. Al terminar tendrás dos instancias funcionando en la
misma página (la prueba de que la separación sobrevive dentro de un
objeto) y el mapa de lo que el empaquetado compra y lo que no.

## Antes de empezar

Este capítulo es la coda de la serie y se lee mejor con el carrito
fresco: el [modelo](/articulos/sacar-el-estado-del-dom/) guarda el
estado y notifica sus cambios, la
[vista](/articulos/la-vista-como-funcion-del-estado/) es una función que
lo repinta entero y el
[controlador](/articulos/de-clics-a-acciones/) traduce clics a
acciones desde un manejador delegado. Cuánto aguanta ese diseño quedó
medido en el [capítulo anterior](/articulos/los-limites-del-mvc-a-mano/).

Tres términos vuelven todo el rato:

- **Instancia:** cada objeto que la clase crea con `new`. Cada uno
  lleva su propio estado.
- **Host:** el elemento del DOM donde la instancia pinta y escucha los
  clics.
- **Ciclo de vida:** el par montar y desmontar: lo que el constructor
  construye y `unmount` revierte.

Con esos tres términos en la mesa, vamos al resultado: dos instancias
vivas en la misma página.

## El resultado primero

Antes de abrir la clase conviene verla funcionar. Dos hosts en la
página y dos `new`:

```html
<div id="cart-a"></div>
<div id="cart-b"></div>
```

```js
// extracto: requiere la clase `CartComponent` de más abajo y el arreglo
// `products` del capítulo 2, sobre los dos `<div>` de arriba
const hostA = document.querySelector("#cart-a");
const hostB = document.querySelector("#cart-b");
const a = new CartComponent(hostA);
const b = new CartComponent(hostB);
```

Pulsamos «Teclado» y «Monitor» en el carrito A. Esto es lo que muestra
cada pantalla:

```text
A: Tu carrito (2) — Total: $225
B: Tu carrito (0) — Total: $0
```

Añadir en A no toca a B: cada instancia lleva su modelo, su manejador y
su pedazo de página. Las dos conviven en la pieza siguiente;
pruébalas.

:::demo{nombre="carrito-componente" altura="365px" altura-estrecha="719px"}
Pieza interactiva: dos instancias de `CartComponent` lado a lado,
etiquetadas «Carrito A» y «Carrito B». Añade productos en una y observa
que la otra se queda en `Tu carrito (0)` y `Total: $0`: cada instancia
tiene su propio estado, su propio manejador y su propio trozo de
página.
:::

## Qué hace el `new`

Un solo `new` hace lo que el carrito del
[capítulo 4](/articulos/de-clics-a-acciones/) montaba en cuatro pasos.
Así arrancaba entonces:

```js
// extracto: el arranque del capítulo 4, sobre un `<div id="cart-app">`
const cart = new Cart();
cart.subscribe(() => render(cart));
host.addEventListener("click", (e) => {
  /* la tabla de acciones */
});
render(cart);
```

El constructor de `CartComponent` cumple esos mismos cuatro pasos,
aunque el registro y la suscripción van intercambiados (entre esos dos
el orden no importa; lo que importa es que la primera pantalla salga la
última):

```js
// extracto: dentro de la clase de más abajo
constructor(host) {
  this.#host = host;
  this.#host.addEventListener("click", this.#onClick);
  this.#unsubscribeRender = this.subscribe(() => this.#render());
  this.#render();
}
```

Línea a línea: guarda el `host` que le pasa quien instancia (antes lo
buscábamos en el `document`), registra el manejador delegado sobre él,
suscribe el render al modelo y pinta la primera pantalla. Dos
diferencias importan y las dos son nuevas: el manejador es un campo de
la clase (`#onClick`, con la referencia fija que `removeEventListener`
va a necesitar) y `subscribe` devuelve algo (`#unsubscribeRender`, la
función de baja). Volvemos a las dos en el ciclo de vida.

## La clase por dentro

La clase completa, con el rol de cada bloque marcado donde los
capítulos lo dejaron:

```js
// extracto: `products` es el arreglo del catálogo del capítulo 2;
// instanciar la clase exige un elemento host del DOM
class CartComponent {
  #lines = [];
  #nextId = 1;
  #subscribers = [];
  #host;
  #unsubscribeRender;

  constructor(host) {
    this.#host = host;
    this.#host.addEventListener("click", this.#onClick);
    this.#unsubscribeRender = this.subscribe(() => this.#render());
    this.#render();
  }

  // el modelo
  subscribe(fn) {
    this.#subscribers.push(fn);
    return () => {
      this.#subscribers = this.#subscribers.filter((s) => s !== fn);
    };
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

  // la vista
  #render() {
    this.#host.innerHTML = `
      <ul>
        ${products.map((p) => `<li>${p.name} — $${p.price} <button data-action="add" data-id="${p.id}">Añadir</button></li>`).join("")}
      </ul>
      <h3>Tu carrito (${this.units})</h3>
      <ul>
        ${this.#lines.map((l) => `<li>${l.name} x${l.quantity} — $${l.price * l.quantity} <button data-action="remove" data-line="${l.line}">Quitar</button></li>`).join("")}
      </ul>
      <p>Total: $${this.total}</p>`;
  }

  // el controlador
  #onClick = (e) => {
    const button = e.target.closest("[data-action]");
    if (!button) return;
    const actions = {
      add: () =>
        this.add(products.find((p) => p.id === Number(button.dataset.id))),
      remove: () => this.remove(Number(button.dataset.line)),
    };
    actions[button.dataset.action]?.();
  };

  unmount() {
    this.#host.removeEventListener("click", this.#onClick);
    this.#unsubscribeRender();
    this.#host.innerHTML = "";
  }
}
```

Recórrela por roles. El bloque del modelo es el del capítulo 2 casi
intacto: los datos privados, `subscribe`, `#notify`, los getters
calculados y `add`/`remove` que terminan en notificación (su único
cambio es el `return` de `subscribe`, y llega más abajo). `#render` es
la vista del capítulo 3, tal como la dejó el capítulo 4, convertida en
método (con un detalle que llega en la prueba de fuego): sigue siendo
función del estado, pero el `host` al que escribe es el de la
instancia.
`#onClick` es el controlador: el mismo manejador delegado, declarado
como campo para que la referencia sobreviva.

La frontera que importa aquí no es de objetos, es de responsabilidades:
cada método conserva el rol que le tocó en la separación. La clase es
la envoltura que los convierte en una sola cosa.

:::pausa
Nombra el rol de cada miembro de `CartComponent` y di cuál no existía
en los capítulos anteriores.
:::

## El estado que no sale

¿Por qué dos instancias no comparten estado? Porque los campos `#` son
por instancia: cada `new CartComponent` crea su propio `#lines`, su
`#nextId` y su `#subscribers`. Lo único que comparten es el catálogo
`products`, que vive en el módulo y solo se lee. No hay un estado «del
carrito» en el programa; hay un estado por carrito, inalcanzable desde
fuera.

El mecanismo no es nuevo: es el mismo que ya protegía `#lines` dentro
de `Cart` en el capítulo 2. Lo que cambia es el perímetro: ahora
también cubre el host, la suscripción que repinta y el manejador, que
en la versión suelta vivían en el módulo (el host como variable; los
otros dos, registros sin referencia guardada). Lo público queda
reducido a la API del modelo (`subscribe`, los getters, `add`,
`remove`) más `unmount`.

## La prueba de fuego

Las dos instancias del resultado primero no se contaminan; ahora
desarmemos por qué. Un clic en el carrito A no alcanza al B por tres
razones que se encadenan:

- El manejador de A está registrado sobre `hostA`: solo oye los clics
  que ocurren dentro de ese árbol. El de B, sobre `hostB`, ni se
  entera.
- Cuando se dispara, `#onClick` llama a `this.add`: el `this` de cada método
  es su instancia, así que el clic solo puede tocar su propio modelo.
- Y si el modelo de A notifica, solo se enteran los suscriptores de su
  `#subscribers`. `#render` de A escribe `hostA.innerHTML`; nada sale
  de ese host ni nada entra de otro.

Queda un detalle visible en el código: el render ya no escribe `id`
dentro del HTML. Los tenía desde el capítulo 2 (`catalog`,
`counter`, `cart`, `total`), pero ni la vista ni el controlador los
consultan desde que la vista entera se regenera en el capítulo 3: eran
nombres globales de documento sin dueño. Con dos instancias en la
página se duplicarían, y un `id` duplicado es HTML inválido. Dentro de
la clase sobraban, así que salieron; si estilas por selector, apunta a
`[data-action]`, que es justo para lo que quedaron.

:::pausa
Explica por qué añadir un producto en el carrito A no toca al B:
nombra las tres cosas que son propias de cada instancia.
:::

## El ciclo de vida

Montar fue un `new`. Desmontar es `unmount`:

```js
// extracto: el final de la clase
unmount() {
  this.#host.removeEventListener("click", this.#onClick);
  this.#unsubscribeRender();
  this.#host.innerHTML = "";
}
```

Cada línea revierte una del constructor: suelta el
manejador, cancela la suscripción que repinta y vacía el host. Las dos
primeras piden algo que el programa suelto no necesitaba: una
referencia estable al manejador (por eso `#onClick` es un campo y no
una función anónima del `addEventListener`) y una forma de darse de
baja de la suscripción. Esa forma es el `return` nuevo de `subscribe`:

```js
// extracto: la suscripción, con la baja incluida
subscribe(fn) {
  this.#subscribers.push(fn);
  return () => {
    this.#subscribers = this.#subscribers.filter((s) => s !== fn);
  };
}
```

Un `return` más respecto al modelo publicado, y compatible con él:
quien ignore el retorno no nota nada. Después de `unmount`, un `add`
sigue notificando a sus suscriptores (el modelo no sabe que la pantalla
se fue), pero ya no hay nadie repintando; la verificación del
desmontaje es que un `add` posterior deja el host vacío.

Ese par, montar y desmontar, tiene nombre propio en la plataforma: un
custom element recibe
[`connectedCallback`](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements)
al insertarse y `disconnectedCallback` al retirarse, y ahí dentro vive
justamente lo que nuestro constructor y nuestro `unmount` hacen a mano.
Svelte expone lo mismo como
[`mount` y `unmount`](https://svelte.dev/docs/svelte/imperative-component-api)
en su API imperativa; React lo llama
[`root.unmount()`](https://react.dev/reference/react-dom/client/createRoot#root-unmount).
El ciclo de vida
que acabamos de inventar no es una idea nuestra: es el que los
componentes de verdad ya resolvieron.

## Lo que la clase no compra

El empaquetado compra instanciación, encapsulamiento y ciclo de vida.
Lo que no compra conviene nombrarlo:

- **La frontera interna vuelve a ser disciplina.** Con `Cart` aparte,
  el modelo no podía tocar el DOM ni queriendo: no tenía referencia.
  Dentro de `CartComponent`, `#render` podría llamar a `this.add`
  directamente, y `add` podría olvidar su `#notify`; nada se lo
  impediría. Lo que el objeto garantizaba ahora lo garantiza la
  convención, igual que dentro de un componente de framework.
- **El catálogo sigue fijo.** `products` vive en el módulo, fuera de la
  clase. Un componente real recibiría sus datos de fuera (atributos,
  props, parámetros del `mount`); el nuestro nace con el surtido
  incluido.
- **Los límites del capítulo anterior quedan intactos.** Sigue
  repintándose todo en cada notificación y los suscriptores siguen
  enterándose de todo. El empaquetado cambia la forma del componente,
  no su coste.
- **No hay shadow DOM ni aislamiento de estilos.** Las dos instancias
  comparten la hoja de estilos del documento, así que los estilos de la
  página pueden alcanzar el HTML de cada una. Los `id` que retiramos
  eran la versión pequeña del mismo problema en el otro sentido: lo del
  componente podía chocar con lo de la página.

Lo que sí queda claro es de dónde sale la forma: un custom element es
esta misma envoltura con los callbacks de ciclo de vida ya puestos, y
un componente de framework es la misma envoltura con props y un repintado
que el framework calcula. `CartComponent` es el molde; la plataforma lo
incorporó.

## El punto

La separación que la serie fue construyendo no estaba en los objetos:
está en los roles. Dentro de `CartComponent` el modelo sigue
notificando, la vista sigue siendo función del estado y el manejador
sigue traduciendo clics. Lo que el `new` compra es instanciación,
encapsulamiento y ciclo de vida, y dos carritos en la misma página lo
prueban.

La serie, que arrancó con el
[carrito a lo bruto](/articulos/carrito-a-lo-bruto/), queda completa
aquí. La puerta que queda abierta lleva a los componentes de la
plataforma: esta envoltura hecha a mano es exactamente lo que un custom
element te da ya hecha, con sus callbacks y un shadow DOM que de verdad
aísla. Cuando quieras ese componente, ya sabes qué hay dentro.
