# Brief — Sacar el estado del DOM: un modelo que notifica sus cambios

## Estado

- estado: aprobado
- aprobado: 2026-10-26

**Pieza:** docs/editorial/piezas/mvc-modelo.md
**Tarea:** docs/tasks/031-capitulo-2-serie-mvc.md

## Encuadre

- **Audiencia:** quien ya leyó el capítulo 1 y vio cómo el carrito reparte la verdad entre el array, las variables y el DOM. Sabe JS con clases y `addEventListener`, conoce el MVC de nombre y todavía no ha separado nada a mano.
- **Promesa:** «después de leer esto, el lector podrá sacar el estado de su componente a un modelo que notifica sus cambios, y probar esa lógica sin tocar el DOM»
- **Arco:**
  - Gancho y previo: el carrito del capítulo 1 se puede probar solo mirando el DOM; quitar esa dependencia es el primer paso del desenredo. Tensión resuelta dentro del previo.
  - La promesa: el modelo guarda ítems y total, notifica a quien se suscriba y no sabe nada del DOM.
  - Resultado primero: el carrito funcionando sobre el modelo, con la misma salida que el capítulo 1 (tres añadidos, $250; quitar el teclado, $205).
  - Del DOM al modelo: qué datos salen del DOM (ítems, cantidades, total) y cuáles no (el texto de los `<li>`).
  - El modelo que notifica: `suscribir` y la notificación tras cada cambio, con el origen en el patrón que describe Stearns.
  - La prueba sin DOM: el modelo se ejecuta en Node y comprueba el total y las unidades sin navegador.
  - Los límites honestos: el DOM sigue sin actualizarse solo; el suscriptor pinta a mano y eso es el problema que queda para el capítulo de la vista.
  - El cierre: la pregunta abierta —el DOM ya no es la verdad, pero ¿quién lo mantiene al día?— y la puerta al capítulo de la vista.
- **Ejemplo conductor:** el mismo carrito del capítulo 1 (catálogo, añadir, quitar y total), con su estado movido al modelo. La edición de cantidad queda fuera de este capítulo (ver `## Desviaciones` de la tarea).
- **Alcance:** sin vista separada (la pintura sigue en un suscriptor sencillo); sin controlador (los eventos del DOM siguen llamando al modelo desde el propio componente); sin persistencia ni frameworks; sin reactividad fina ni signals (eso es el post del store, enlazado en la serie). El modelo no crea una arquitectura completa, solo la primera separación.
- **Metadatos:**
  - `slug` sacar-el-estado-del-dom
  - `categoria` arquitectura
  - `nivel` intermedio
  - `tags` javascript, mvc, dom

## Temas de investigación

- [x] ¿El snippet del modelo corre tal cual en Node y da las cifras del texto? (resuelto: Node 24.21.0, salida en `## Material`)
- [x] ¿Qué dice Stearns sobre el modelo que notifica? (resuelto: página consultada el 2026-10-26; su clase `Model` base registra oyentes con `addChangeListener` y los notifica en `raiseChange()`; las vistas se re-pintan solas al recibir la notificación; fuente en `## Material`)
- [x] ¿Cómo nombramos el patrón de suscriptores en el post? (resuelto: el método del snippet es `suscribir`, verbo de uso común en español; el post nombra el patrón Observer una vez, en la sección que le da origen, sin jerga adicional)

## Material

**Verificación del modelo.** El snippet de abajo corre tal cual en Node 24.21.0 (`node modelo.mjs`). Salida verificada:

```text
tras 3 agregar: 3 250
tras quitar la línea 1: 2 205
notificaciones: [ '1 u / $45', '2 u / $70', '3 u / $250', '2 u / $205' ]
```

Las cifras son las del capítulo 1 (3 añadidos → $250; quitar el teclado → $205). El método `cambiarCantidad` se retiró del modelo: el capítulo no lo usa.

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

**La fuente: Dave Stearns.** «The Model-View-Controller (MVC) Architecture», última edición del 23 de octubre de 2021 (https://drstearns.github.io/tutorials/mvc/). Su clase `Model` registra oyentes de cambio (`addChangeListener`) y los notifica en `raiseChange()`; la vista escucha y se re-pinta sola. Es la base conceptual del capítulo; el snippet de arriba es una versión mínima, sin JSDoc ni herencia.

## Borrador del outline

- Gancho: el carrito del capítulo 1 solo se puede comprobar mirando la pantalla; el desenredo empieza por quitar esa dependencia (negación de la casa, resuelta dentro del previo).
- `<!--more-->` inmediatamente después + el párrafo de promesa: sacamos ítems y total a un modelo que notifica; el lector se lleva un modelo probable sin DOM.
- Resultado primero: el carrito del capítulo 1 funcionando sobre el modelo, con la misma salida (3 añadidos → $250; quitar → $205).
- Qué sale del DOM: ítems, cantidades y total pasan a la clase; el texto de los `<li>` deja de ser fuente de verdad.
- La clase `Carrito`: el estado privado (`#lineas`), `suscribir` y la notificación tras cada cambio; por qué la notificación va después de mutar.
- El patrón con nombre: el observador que describe Stearns, y en qué se diferencia de lo que ya hacíamos a mano.
- La prueba sin DOM: el modelo corre en Node y el total y las unidades se comprueban sin navegador.
- Los límites honestos: el DOM sigue sin actualizarse solo; el suscriptor pinta a mano; el componente todavía mezcla eventos y composición.
- El cierre: el DOM ya no es la verdad, pero sigue sin actualizarse solo; la pregunta abierta y la puerta al capítulo de la vista.

## Checklist de publicación

- [x] El gancho planta una tensión y la resuelve dentro del previo
- [x] `<!--more-->` inmediatamente tras el gancho (el previo sale del cuerpo, decisión D002)
- [x] El previo es una unidad: un párrafo breve y autocontenido, diseñado como tal (56 palabras)
- [x] `description` enuncia la promesa en una frase, sin adjetivos valorativos (125 caracteres)
- [x] Frontmatter completo: `title`, `description`, `date`, `categoria`, `tags` (`nivel` solo si el encuadre lo decidió)
- [ ] `date` con la hora real del commit o del merge (se ajusta al fusionar el PR)
- [x] `categoria` es el pilar decidido en el encuadre; ningún tag coincide con una categoría
- [x] Cada snippet corre tal cual aparece (ejecutado antes de incluirse) o se marca explícitamente como extracto
- [x] Los límites honestos tienen sección propia; el cierre abre una puerta
- [ ] Ronda de escritura completa (`revisar-redaccion` y luego `pulir-escritura`) sobre la versión final (pendiente: repasar los párrafos reescritos tras la revisión editorial)
- [x] Las cifras del post vienen de una sola versión del ejemplo (no mezclar $255 del modelo con $135 del capítulo 1)
- [x] El título es idiomático en español, sin calcos del inglés
- [x] Los incisos van entre paréntesis y las citas en comillas latinas, según la guía
