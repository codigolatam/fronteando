---
title: "Un store reactivo en vanilla JS"
description: "La magia de los frameworks cabe en cincuenta líneas: estado que notifica, efectos que se registran solos y un Proxy que mantiene la pantalla al día."
date: 2026-10-16T21:15:00Z
nivel: intermedio
categoria: fundamentos
tags: ["javascript", "reactividad"]
agente:
  tema: "construir un store reactivo desde cero en JavaScript sin librerías: un signal que notifica, un effect que se registra solo y un Proxy que lo generaliza por propiedad"
  prerequisitos:
    [
      "JavaScript con soltura (funciones, closures)",
      "getters y setters de objetos",
    ]
---

Cambia una variable y la pantalla se actualiza sola. Si has usado Vue,
Solid, Preact o cualquier framework reciente, ese gesto te es familiar:
escribes `count.value++` y el DOM obedece. Parece magia. No lo es.

<!--more-->

En este artículo vamos a construir ese mecanismo desde cero,
en JavaScript sin librerías: unas cincuenta líneas que hacen lo
esencial de un store reactivo. Al final, `ref()` y `signal()` dejarán
de ser conjuros para convertirse en algo que ya sabes escribir (porque
mientras algo parezca magia, solo queda memorizar la API).

## El resultado primero

Antes de desmontar la magia conviene verla funcionar. Este es el
programa completo que vamos a explicar:

```js
const count = signal(0);

effect(() => {
  document.title = `count: ${count.value}`;
});

count.value = 1; // el título del documento ya dice «count: 1»
```

Ninguna línea avisa de nada a nadie: asignar `count.value` basta para
que el título se reescriba. Tres piezas lo hacen posible: `signal`,
`effect` y un truco pequeño que las conecta. Las construiremos una a
una.

Mientras tanto, la demo muestra la versión completa del mecanismo. El estado es
ahora un objeto con dos propiedades, `name` y `level`, y hay dos
efectos que leen de él. Sube `level` y observa qué efectos se ejecutan;
luego cambia `name` y compara.

:::demo{nombre="store-reactivo" altura="760px" altura-estrecha="1220px"}
Demo interactiva del mismo mecanismo con un estado de dos propiedades
(`name` y `level`) y dos efectos: uno escribe el título del documento
y otro un saludo. Este es el programa que ejecuta:

```js
const state = store({ name: "ana", level: 1 });

effect(() => {
  document.title = `${state.name} · nivel ${state.level}`;
});

effect(() => {
  greeting.textContent = `Hola, ${state.name}`;
});
```

Con JavaScript, la demo permite escribir en el estado
(`state.level += 1`, `state.name = "lu"`), marca en el programa la
línea que se ejecuta, muestra el valor de `activeEffect` y el mapa
`subscribersPerProp`, y registra una traza de cada lectura, escritura y
reejecución (también paso a paso). Resultado esperado: al subir `level`
solo se reejecuta el efecto del título, porque el saludo no lee `level`;
al cambiar `name` se reejecutan los dos.
:::

## Estado que notifica

La primera pieza es la más vieja del mundo: una variable que avisa a
quien se suscriba cuando cambia. Un getter devuelve el valor y un setter, además de guardarlo, avisa a
cada suscriptor:

```js
function signal(initialValue) {
  let current = initialValue;
  const subscribers = new Set();

  return {
    subscribe(fn) {
      subscribers.add(fn);
    },
    get value() {
      return current;
    },
    set value(next) {
      current = next;
      subscribers.forEach((fn) => fn());
    },
  };
}
```

Y se usa así: cada escritura en `value` reejecuta a los suscriptores.

```js
const count = signal(0);

count.subscribe(() => {
  document.title = `count: ${count.value}`;
});

count.value = 1; // el título queda «count: 1»
count.value = 2; // el título queda «count: 2»
```

Funciona, pero el defecto salta a la vista: la dependencia se declara
dos veces, una al suscribirse a `count` y otra al leer `count.value`
dentro del manejador. Con un componente real (varias propiedades,
varios consumidores) esa duplicación es la fuente de los errores: el
efecto que nadie suscribió, el que quedó suscrito al dato equivocado.

:::pausa
Explica con tus palabras qué le cuesta al consumidor suscribirse a
mano y qué errores trae ese registro manual.
:::

## El efecto que se registra solo

El paso que convierte esto en reactividad es un cambio de dirección: en
lugar de que el consumidor se suscriba, es el signal quien toma nota de
quién lo está leyendo.

La pieza es una variable global que apunta al efecto en ejecución:

```js
let activeEffect = null;

function effect(fn) {
  function run() {
    activeEffect = run;
    fn();
    activeEffect = null;
  }
  run();
}
```

`effect` envuelve `fn` en `run`: al ejecutarse, `run` se declara
efecto activo, ejecuta `fn` y limpia. El suscriptor real es `run`, no
`fn`: así cada reejecución vuelve a declararse efecto activo y a
registrar lo que lea. Como JavaScript corre en un solo hilo, mientras
`run` se ejecuta ningún otro efecto puede estar en marcha:
`activeEffect` es, sin ambigüedad, «el efecto que está corriendo
ahora».

Ahora el getter del signal aprovecha ese dato:

```js
get value() {
  if (activeEffect) subscribers.add(activeEffect);
  return current;
}
```

Leer `value` dentro de un `effect` registra la dependencia sin que
nadie lo pida: si hay un efecto en ejecución, queda suscrito. Solo cambia el getter, con una línea más, y con ella `subscribe` deja de
hacer falta. El programa del gancho ya es real:

```js
const count = signal(0);

effect(() => {
  document.title = `count: ${count.value}`;
}); // al ejecutarse, queda suscrito a count

count.value = 1; // reejecuta el efecto
count.value = 2; // y otra vez
```

Cada efecto queda anotado en los signals que lee, cada vez que corre:
el mapa de quién depende de qué se dibuja solo. Ese matiz («cada vez que
corre») importa; volveremos a él en los límites.

:::pausa
Explica quién toma nota de quién: por qué el suscriptor es `run`
y no `fn`.
:::

## De un valor a un objeto: el store

Un `signal` envuelve un valor. La generalización natural es un objeto
donde cada propiedad se comporta igual: leer registra, escribir
notifica. Para interceptar lecturas y escrituras de propiedades
arbitrarias existe `Proxy`:

```js
function store(target) {
  const subscribersPerProp = new Map();
  const subsOf = (prop) => {
    if (!subscribersPerProp.has(prop)) {
      subscribersPerProp.set(prop, new Set());
    }
    return subscribersPerProp.get(prop);
  };

  return new Proxy(target, {
    get(obj, prop) {
      if (activeEffect) subsOf(prop).add(activeEffect);
      return obj[prop];
    },
    set(obj, prop, next) {
      obj[prop] = next;
      subsOf(prop).forEach((fn) => fn());
      return true;
    },
  });
}
```

La mejora sobre `signal` es que la suscripción es por propiedad: cada
`Set` pertenece a una clave del objeto, así que un efecto solo se
reejecuta cuando cambia algo que de verdad leyó:

```js
const state = store({ name: "ana", level: 1 });

effect(() => {
  document.title = `${state.name} · nivel ${state.level}`;
});

state.level = 2; // reejecuta el efecto
state.name = "lu"; // y otra vez
```

Y la prueba de que el grafo es de grano fino: un efecto que solo lee
`state.name` no corre cuando cambia `state.level`. La reactividad
ya no es por variable, es por propiedad.

:::pausa
Explica por qué un efecto que solo lee `state.name` no se
reejecuta cuando cambia `state.level`.
:::

## Lo que falta para ser un framework

Lo construido es el corazón de la reactividad, no el framework
completo.
Conviene nombrar lo que quedó fuera, porque cada omisión es una
pregunta que los frameworks tuvieron que responder:

- **Los efectos no se limpian.** Cada ejecución anota lo que el efecto
  leyó, pero nada borra lo anotado antes: si un efecto lee una
  propiedad en una ejecución y deja de leerla en la siguiente, la
  suscripción vieja permanece. Los frameworks descartan las
  dependencias viejas en cada ejecución y ofrecen `onCleanup` o
  `dispose`.
- **No hay batching.** Cada escritura dispara los efectos al momento:
  diez `set` seguidos son diez reejecuciones. Los frameworks agrupan
  las notificaciones en un solo pase.
- **El render no existe.** Nuestro efecto reescribe `document.title`
  entero; escalar eso al DOM es justamente lo que los frameworks
  resuelven (diffing en los frameworks de virtual DOM, actualización
  quirúrgica compilada en Solid o Svelte).
- **Un solo efecto a la vez.** `activeEffect` es una variable: un
  `effect` que creara otro dentro de su `fn` la pisaría, y las lecturas
  del efecto exterior que vinieran después ya no registrarían nada. La
  versión de verdad mantiene una pila.

Y sin embargo, la sustancia ya está (en unas cincuenta líneas): leer
registra, escribir notifica y la lista de dependencias la lleva la
propia pieza de estado.

## El punto

`ref()` en Vue, `createSignal()` en Solid, `signal()` en Preact: detrás
de cada una está esta misma idea (un contenedor que toma nota de quién
lee y avisa cuando cambia) envuelta en una API y rodeada de lo que sí cuesta
trabajo: render eficiente, batching, limpieza.

La próxima vez que `count.value++` mueva tu pantalla, ya sabes qué
acaba de ocurrir: un getter anotó a tu efecto y un setter lo volvió a
llamar.

Sincronizar el estado con la vista ya no cuesta nada. La pregunta que
sí queda abierta es cómo estructurar todo lo demás (quién escucha los
eventos, quién decide, qué se guarda dónde). De esa pregunta va [la serie del carrito](/articulos/carrito-a-lo-bruto/).
