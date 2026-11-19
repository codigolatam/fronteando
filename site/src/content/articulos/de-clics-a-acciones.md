---
title: "De clics a acciones: el controlador"
description: "¿Quién decide qué pasa al pulsar un botón? Sacar los manejadores de la vista a un controlador que solo traduce clics a acciones del modelo."
date: 2026-11-18T23:45:00Z
categoria: arquitectura
nivel: intermedio
tags: ["javascript", "mvc", "dom"]
agente:
  tema: "explica cómo sacar los manejadores de eventos de la vista a un controlador que traduce clics a acciones del modelo, cerrando el ciclo evento → acción → modelo → notificación → vista"
  prerequisitos:
    [
      "la vista del capítulo anterior (render como función del estado); DOM básico (addEventListener, closest, dataset)",
    ]
---

Nuestro carrito ya separa dos cosas: el estado vive en un modelo que
notifica sus cambios y la vista se repinta entera con cada notificación.
Pero los botones que pinta `render` llaman al modelo directamente:
la vista decide qué pasa al pulsar. Un manejador en el contenedor
se lleva esa decisión: traduce cada clic en una acción sobre el modelo.

<!--more-->

Vamos a sacar los manejadores de eventos de la vista a un controlador:
los botones dejan de nombrar el método que llaman y pasan a declarar
qué quiere el usuario. Al terminar tendrás el ciclo completo (evento →
acción → modelo → notificación → vista) y las tres partes del patrón
separadas.

## El resultado primero

Antes de abrir el controlador conviene ver qué queda cuando se quita
`connect`. Así se pone en marcha el carrito completo sobre el
[modelo](/articulos/sacar-el-estado-del-dom/) y la
[vista](/articulos/la-vista-como-funcion-del-estado/) de los capítulos
anteriores, con dos diferencias: `render` pinta los botones con
`data-action` (más abajo) y la pareja `update`/`connect` desapareció:
`render` ya se suscribe directamente:

```js
// extracto: requiere la clase `Cart`, el arreglo `products`, la función
// `render` del capítulo anterior (con `data-action`, más abajo), un
// `<div id="cart-app">` vacío y `host` apuntando a ese `<div>`
const cart = new Cart();
cart.subscribe(() => render(cart));

host.addEventListener("click", (e) => {
  const button = e.target.closest("[data-action]");
  if (!button) return;
  const actions = {
    add: () =>
      cart.add(products.find((p) => p.id === Number(button.dataset.id))),
    remove: () => cart.remove(Number(button.dataset.line)),
  };
  actions[button.dataset.action]?.();
});

render(cart);
```

Con eso montado, pulsamos «Añadir» en los tres productos, «Quitar» en
la primera línea y «Añadir» en «Teclado» otra vez.
Esto es lo que muestra la pantalla en cada momento:

```text
al montar:               0 unidades / $0
tras 3 «Añadir»:         3 unidades / $250
tras quitar el primero:  2 unidades / $205
tras otro «Añadir»:      3 unidades / $250
```

La última línea es la que importa: después de cuatro repintados, los
botones siguen respondiendo sin que nadie los haya vuelto a conectar.
En este capítulo `connect` ya no existe.

## Quién decide hoy

En el [capítulo anterior](/articulos/la-vista-como-funcion-del-estado/)
la vista tenía dos trabajos. `render` generaba
el HTML, y `connect` recorría los botones recién nacidos para darles
su manejador: cada «Añadir» llamaba a `cart.add` y cada
«Quitar» a `cart.remove`. Funcionaba, pero la decisión de qué pasa
al pulsar vivía dentro de la vista.

Eso es lo que la regla de Tania Rascia prohíbe en su
[tutorial de MVC](https://www.taniarascia.com/javascript-mvc-todo-app/):
«the view never touches the model». Nuestra vista lo tocaba en cada
clic, y lo peor no
era la regla incumplida sino la acumulación: cada manejador nuevo que
nazca en `connect` tendrá que aprender a llamar al modelo, y cada
repintado ya tenía que volver a conectarlos: los nodos morían con el
`innerHTML` y nacían sordos.

## De llamadas a intenciones

El primer cambio es en los botones. Dejan de llevar el nombre del
método que llaman (`data-add`, `data-remove`) y pasan a declarar
qué quiere el usuario. En `render`, los dos botones de la plantilla
quedan así:

```js
// extracto: dentro de `render`, en lugar de `data-add` y `data-remove`
const addButton = `<button data-action="add" data-id="${p.id}">Añadir</button>`;
const removeButton = `<button data-action="remove" data-line="${l.line}">Quitar</button>`;
```

`data-action` dice «qué» y `data-id`/`data-line` dicen «sobre qué».
El botón sigue nombrando una acción, pero ya no sabe qué método la
cumple: esa correspondencia la decide quien interpreta la intención.

## El controlador

El segundo cambio es quién escucha. En lugar de un manejador por
botón, uno solo sobre el `host` (el `<div>` que `render` llena pero no
recrea) traduce cada clic en la acción que declara. El patrón tiene
nombre: delegación de eventos, un manejador en el contenedor que
atiende los clics de todos sus descendientes:

```js
// extracto: el manejador del resultado primero, de nuevo
host.addEventListener("click", (e) => {
  const button = e.target.closest("[data-action]");
  if (!button) return;
  const actions = {
    add: () =>
      cart.add(products.find((p) => p.id === Number(button.dataset.id))),
    remove: () => cart.remove(Number(button.dataset.line)),
  };
  actions[button.dataset.action]?.();
});
```

Tres cosas que conviene mirar. La primera: el manejador vive sobre un
elemento que sobrevive a los repintados (`render` reescribe su
`innerHTML` pero no lo reemplaza), así que se conecta una sola vez y no
hace falta volver a conectarlo. La segunda: `closest` encuentra el
botón aunque el clic caiga en cualquier nodo interior, y `dataset` trae
los argumentos. La tercera: la tabla `actions` es el único sitio del
programa que llama a los métodos que cambian el modelo; los botones solo
nombran intenciones. Es un objeto y no un `switch` porque las acciones
quedan como datos: añadir una es añadir una entrada, no otro `case`.

Esa tabla es el controlador: la parte que recibe los eventos del
usuario y los convierte en operaciones del modelo. Dave Stearns
describe el controlador clásico con esa tarea y con la de conectar
modelo y vista, en su
[tutorial de MVC](https://drstearns.github.io/tutorials/mvc/). En
las variantes más recientes, dice, esa tarea pasa a la vista, que es la
que crea los elementos y está mejor situada para atender sus eventos.
Nuestro controlador recupera la tarea clásica sin pintar nada: el
manejador se apoya en el `host`, que sigue siendo de la vista, y la
tabla solo traduce.

:::pausa
Explica por qué el manejador del controlador no muere en los repintados
si los botones sí, y qué habría que cambiar si `render` reemplazara el
`host` entero.
:::

## El ciclo cerrado

Con las tres partes en su sitio, el recorrido de un clic queda completo
y en una sola dirección: el usuario pulsa «Quitar» (evento), el
controlador lee `data-action` y llama a `cart.remove` (acción), el
modelo quita la línea y notifica a sus suscriptores (notificación), y la
suscripción vuelve a llamar a `render` (vista). Nadie se salta el
orden: la vista no toca el modelo, el modelo no toca la vista, y los
eventos entran por una sola puerta.

A continuación, el carrito de este capítulo funcionando, con el
registro en vivo: ahora cada línea cuenta el ciclo entero, del clic a
la pantalla.

:::demo{nombre="vista-instrumentada" modo="controlador" altura="290px" altura-estrecha="400px"}
El carrito del capítulo funcionando junto al registro del modelo:
cada «Añadir» o «Quitar» produce una línea «clic → acción X →
notificación N → repintado: M u / $Y» en el registro, la más nueva
arriba. Resultado esperado: tres añadidos dejan tres líneas,
contador 3 y total $250; quitar la primera línea deja $205. La línea
fija de arriba recuerda el render inicial, que no llegó por
notificación.
:::

:::pausa
Cuenta el recorrido completo de un clic en «Añadir»: desde el evento
hasta el `<li>` nuevo en pantalla, nombrando cada parte que toca.
:::

## Los límites de este paso

Las tres partes están separadas, pero hay cosas que esta separación
no resuelve.

- **El controlador conoce la forma del DOM.** Lee `data-action` y los
  atributos que `render` escribe: si la vista cambia los nombres, el
  controlador hay que tocarlo también. La frontera entre ambos es una
  convención, no un contrato.
- **El modelo acepta cualquier llamada externa.** `add` y `remove`
  son públicos: nada impide que otro código (o la consola) los llame
  sin pasar por el controlador. La disciplina la ponemos nosotros, no
  el programa.
- **Un solo `render` lo repinta todo.** Con una vista que cambia poco
  no se nota; con varias suscripciones y vistas parciales, cada
  notificación empieza a costar. Cuánto aguanta este diseño es la
  pregunta del último capítulo.

## El punto

El carrito ya tiene sus tres partes separadas: el modelo guarda el
estado y notifica, la vista es una función del estado, y el controlador
traduce clics a acciones. Cada parte tiene ya su sitio, aunque la
frontera entre ellas siga siendo una convención. La pregunta que queda
es hasta dónde aguanta este MVC hecho a mano.
