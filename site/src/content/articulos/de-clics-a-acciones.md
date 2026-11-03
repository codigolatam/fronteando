---
title: "De clics a acciones: el controlador"
description: "¿Quién decide qué pasa al pulsar un botón? Sacar los manejadores de la vista a un controlador que solo traduce clics a acciones del modelo."
date: 2026-10-28T16:00:00Z
categoria: arquitectura
nivel: intermedio
tags: ["javascript", "mvc", "dom"]
draft: true
agente:
  tema: "explica cómo sacar los manejadores de eventos de la vista a un controlador que traduce clics a acciones del modelo, cerrando el ciclo evento → acción → modelo → notificación → vista"
  prerequisitos:
    [
      "la vista del capítulo anterior (render como función del estado); DOM básico (addEventListener, closest, dataset)",
    ]
---

La vista ya es una función del estado: cada cambio del modelo repinta
la pantalla entera. Pero los botones que `render` crea en cada
repintado llaman al modelo directamente, así que la vista sigue
decidiendo qué pasa al pulsar. Hoy sacamos esa decisión a su propia
pieza.

<!--more-->

Vamos a sacar los manejadores de eventos de la vista a un controlador:
los botones dejan de anunciar qué método llamar y pasan a declarar
intención, y un único listener traduce cada clic en una acción sobre
el modelo. Al terminar tendrás el ciclo completo (evento → acción →
modelo → notificación → vista) y las tres piezas del patrón separadas.

## El resultado primero

Antes de abrir el controlador conviene ver qué queda cuando se quita
`conectar`. Así se pone en marcha el carrito completo sobre el
[modelo](/articulos/sacar-el-estado-del-dom/) y la
[vista](/articulos/la-vista-como-funcion-del-estado/) de los capítulos
anteriores:

```js
// extracto: requiere la clase `Carrito`, el array `productos`, la función
// `render` del capítulo anterior (con `data-accion`, más abajo), un
// `<div id="carrito-app">` vacío y `host` apuntando a ese `<div>`
const carrito = new Carrito();
carrito.suscribir(() => render(carrito));

host.addEventListener("click", (e) => {
  const boton = e.target.closest("[data-accion]");
  if (!boton) return;
  const acciones = {
    agregar: () =>
      carrito.agregar(productos.find((p) => p.id === Number(boton.dataset.id))),
    quitar: () => carrito.quitar(Number(boton.dataset.linea)),
  };
  acciones[boton.dataset.accion]?.();
});

render(carrito);
```

Con eso montado, pulsamos «Añadir» en los tres productos, «Quitar» en
la primera línea y «Añadir» otra vez después de varios repintados.
Esto es lo que muestra la pantalla en cada momento:

```text
al montar:               0 ítems / $0
tras 3 «Añadir»:         3 ítems / $250
tras quitar el primero:  2 ítems / $205
tras otro «Añadir»:      3 ítems / $250
```

La última línea es la que importa: después de tres repintados, los
botones siguen respondiendo sin que nadie los haya vuelto a conectar.
`conectar` ya no existe.

## Quién decide hoy

En el [capítulo anterior](/articulos/la-vista-como-funcion-del-estado/)
la vista tenía dos trabajos. `render` generaba
el HTML, y `conectar` recorría los botones recién nacidos para darles
su manejador: cada «Añadir» llamaba a `carrito.agregar` y cada
«Quitar» a `carrito.quitar`. Funcionaba, pero la decisión de qué pasa
al pulsar vivía dentro de la función que pinta.

Eso es lo que la regla de Tania Rascia prohíbe: «the view never
touches the model». Nuestra vista lo tocaba en cada clic, y lo peor no
era la regla incumplida sino la acumulación: cada manejador nuevo que
nazca en `render` tendrá que aprender a llamar al modelo, y cada
repintado tendrá que volver a enseñárselo.

## De llamadas a intenciones

El primer cambio es en los botones. Dejan de llevar el nombre del
método que llaman (`data-agregar`, `data-quitar`) y pasan a declarar
qué quiere el usuario:

```html
<button data-accion="agregar" data-id="1">Añadir</button>
<button data-accion="quitar" data-linea="2">Quitar</button>
```

`data-accion` dice «qué» y `data-id`/`data-linea` dicen «sobre qué».
El botón ya no sabe que existe `agregar`: describe una intención, y
quién la interpreta es otro.

## El controlador

El segundo cambio es quién escucha. En lugar de un manejador por
botón, un único listener sobre el `host` (el `<div>` que `render`
llena pero no recrea) traduce cada clic en la acción que declara:

```js
// extracto: el listener del resultado primero, de nuevo
host.addEventListener("click", (e) => {
  const boton = e.target.closest("[data-accion]");
  if (!boton) return;
  const acciones = {
    agregar: () =>
      carrito.agregar(productos.find((p) => p.id === Number(boton.dataset.id))),
    quitar: () => carrito.quitar(Number(boton.dataset.linea)),
  };
  acciones[boton.dataset.accion]?.();
});
```

Tres cosas que conviene mirar. La primera: el listener vive sobre un
elemento que sobrevive a los repintados (`render` reescribe su
`innerHTML` pero no lo reemplaza), así que se conecta una sola vez y
nunca se recablea. La segunda: `closest` encuentra el botón aunque el
clic caiga en cualquier nodo interior, y `dataset` trae los
argumentos. La tercera: la tabla `acciones` es el único sitio del
programa que conoce los métodos del modelo; los botones solo nombran
intenciones.

Esa tabla es el controlador: la pieza que recibe los eventos del
usuario y los convierte en operaciones del modelo. Stearns lo describe
así en su
[tutorial de MVC](https://drstearns.github.io/tutorials/mvc/): el
controlador conecta la vista y el modelo, traduciendo los eventos de
usuario en operaciones sobre el modelo. Ni pinta ni guarda estado:
traduce.

:::pausa
Explica por qué el listener del controlador no muere en los repintados
si los botones sí, y qué habría que cambiar si `render` reemplazara el
`host` entero.
:::

## El ciclo cerrado

Con el controlador en su sitio, el recorrido de un clic queda completo
y en una sola dirección: el usuario pulsa «Quitar» (evento), el
controlador lee `data-accion` y llama a `carrito.quitar` (acción), el
modelo quita la línea y avisa a sus suscriptores (notificación), y la
suscripción vuelve a llamar a `render` (vista). Nadie se salta el
orden: la vista no toca el modelo, el modelo no toca la vista, y los
eventos entran por una sola puerta.

La pieza siguiente es el carrito de este capítulo funcionando, con el
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
hasta el `<li>` nuevo en pantalla, nombrando cada pieza que toca.
:::

## Los límites de este paso

Las tres piezas están separadas, pero hay cosas que esta separación
no resuelve.

- **El controlador conoce la forma del DOM.** Lee `data-accion` y los
  atributos que `render` escribe: si la vista cambia los nombres, el
  controlador hay que tocarlo también. La frontera entre ambos es una
  convención, no un contrato.
- **El modelo acepta cualquier llamada externa.** `agregar` y `quitar`
  son públicos: nada impide que otro código (o la consola) los llame
  sin pasar por el controlador. La disciplina la ponemos nosotros, no
  el programa.
- **Un solo `render` lo repinta todo.** Con una vista que cambia poco
  no se nota; con varias suscripciones y vistas parciales, cada
  notificación empieza a costar. Cuánto aguanta este diseño es la
  pregunta del último capítulo.

## El punto

El carrito ya tiene sus tres piezas separadas: el modelo guarda el
estado y notifica, la vista es una función del estado, y el
controlador traduce clics a acciones. Mantenerlo ya no exige tocarlo
todo a la vez. La pregunta que queda es otra: ¿hasta dónde aguanta
este MVC hecho a mano? Eso es lo que estresa el último capítulo.
