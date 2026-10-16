---
title: "Un store reactivo en vanilla JS"
description: "La magia de los frameworks cabe en cincuenta líneas: estado que notifica, efectos que se registran solos y un Proxy que mantiene la pantalla al día."
date: 2026-10-16T21:15:00Z
nivel: intermedio
categoria: javascript
tags: ["reactividad", "fundamentos"]
---

Cambia una variable y la pantalla se actualiza sola. Si has usado Vue,
Solid, Preact o cualquier framework reciente, ese gesto te es familiar:
escribes `count.value++` y el DOM obedece. Parece magia. No lo es.

<!--more-->

En este artículo vamos a construir ese mecanismo desde cero,
en JavaScript sin librerías: unas cincuenta líneas que hacen lo
esencial de un store reactivo. Al final, `ref()` y `signal()` dejarán
de ser conjuros para convertirse en algo que ya sabes escribir —porque
mientras algo parezca magia, solo queda memorizar la API.

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
que el título se reescriba. Tres piezas lo hacen posible —`signal`,
`effect` y un truco pequeño que las conecta— y las construiremos una a
una.

## Estado que notifica

La primera pieza es la más vieja del mundo: una variable que avisa a
quien se suscriba cuando cambia. Un getter devuelve el valor y un
setter, además de guardarlo, recorre a los suscriptores:

```js
function signal(valorInicial) {
  let valor = valorInicial;
  const suscriptores = new Set();

  return {
    suscribir(fn) {
      suscriptores.add(fn);
    },
    get value() {
      return valor;
    },
    set value(nuevo) {
      valor = nuevo;
      suscriptores.forEach((fn) => fn());
    },
  };
}
```

Y se usa así:

```js
const count = signal(0);

count.suscribir(() => {
  document.title = `count: ${count.value}`;
});

count.value = 1;
count.value = 2;
```

Funciona, pero el defecto salta a la vista: cada consumidor tiene que
acordarse de suscribirse y de repetir dentro lo que lee. Con un
componente real —varias propiedades, varios consumidores— el cableado
manual se convierte en la fuente de los errores: el efecto que nadie
suscribió, la suscripción colgada del dato equivocado.

## El efecto que se registra solo

El paso que convierte esto en reactividad es un cambio de dirección: en
lugar de que el consumidor se suscriba, es el signal quien toma nota de
quién lo está leyendo.

La pieza es una variable global que apunta al efecto en ejecución:

```js
let efectoActivo = null;

function effect(fn) {
  function correr() {
    efectoActivo = correr;
    fn();
    efectoActivo = null;
  }
  correr();
}
```

`effect` envuelve `fn` en `correr`: al ejecutarse, `correr` se declara
efecto activo, ejecuta `fn` y limpia. El suscriptor real es `correr`, no
`fn` — así cada reejecución vuelve a levantar `efectoActivo` y a
registrar lo que lea. Como JavaScript corre en un solo hilo, mientras
`correr` se ejecuta ningún otro efecto puede estar en marcha:
`efectoActivo` es, sin ambigüedad, «el efecto que está corriendo
ahora».

Ahora el getter del signal aprovecha ese dato:

```js
get value() {
  if (efectoActivo) suscriptores.add(efectoActivo);
  return valor;
}
```

Leer `value` dentro de un `effect` registra la dependencia sin que
nadie lo pida: si hay un efecto en ejecución, queda suscrito. Con eso
`suscribir` desaparece y el programa del gancho ya es real:

```js
const count = signal(0);

effect(() => {
  document.title = `count: ${count.value}`;
}); // al ejecutarse, queda suscrito a count

count.value = 1; // reejecuta el efecto
count.value = 2; // y otra vez
```

El grafo de dependencias se construye solo: cada efecto queda anotado
en los signals que lee cada vez que corre. Ese matiz —«cada vez que
corre»— importa; volveremos a él en los límites.

## De un valor a un objeto: la store

Un `signal` envuelve un valor. La generalización natural es un objeto
donde cada propiedad se comporta igual: leer registra, escribir
notifica. Para interceptar lecturas y escrituras de propiedades
arbitrarias existe `Proxy`:

```js
function store(objeto) {
  const suscriptoresPorProp = new Map();
  const subsDe = (prop) => {
    if (!suscriptoresPorProp.has(prop)) {
      suscriptoresPorProp.set(prop, new Set());
    }
    return suscriptoresPorProp.get(prop);
  };

  return new Proxy(objeto, {
    get(obj, prop) {
      if (efectoActivo) subsDe(prop).add(efectoActivo);
      return obj[prop];
    },
    set(obj, prop, nuevo) {
      obj[prop] = nuevo;
      subsDe(prop).forEach((fn) => fn());
      return true;
    },
  });
}
```

La mejora sobre `signal` es que la suscripción es por propiedad: cada
`Set` pertenece a una clave del objeto, así que un efecto solo se
reejecuta cuando cambia algo que de verdad leyó:

```js
const estado = store({ nombre: "ana", nivel: 1 });

effect(() => {
  document.title = `${estado.nombre} · nivel ${estado.nivel}`;
});

estado.nivel = 2; // reejecuta el efecto
estado.nombre = "lu"; // y otra vez
```

Y la prueba de que el grafo es fino: un efecto que solo lee
`estado.nombre` no corre cuando cambia `estado.nivel`. La reactividad
ya no es por variable, es por propiedad.

## Lo que falta para ser un framework

Lo construido es el corazón de la reactividad, no el animal completo.
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
  resuelven —diffing en los de virtual DOM, actualización quirúrgica
  compilada en Solid o Svelte—.
- **Un solo efecto a la vez.** `efectoActivo` es una variable, así que
  los efectos no pueden anidarse; la versión de verdad mantiene una
  pila.

Y sin embargo, la sustancia ya está: leer registra, escribir notifica y
la lista de dependencias la lleva la propia pieza de estado.

## El punto

`ref()` en Vue, `createSignal()` en Solid, `signal()` en Preact: detrás
de cada una está esta misma idea —un contenedor que toma nota de quién
lee y avisa cuando cambia— vestida de API y rodeada de lo que sí cuesta
trabajo: render eficiente, batching, cleanup.

La próxima vez que `count.value++` mueva tu pantalla, ya sabes qué
acaba de ocurrir: un getter anotó a tu efecto y un setter lo volvió a
llamar.

Sincronizar el estado con la vista ya no cuesta nada. La pregunta que
sí queda abierta es cómo estructurar todo lo demás —quién escucha los
eventos, quién decide, qué se guarda dónde—. De esa pregunta va la
siguiente serie.
