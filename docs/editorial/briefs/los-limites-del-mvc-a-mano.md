# Brief — Los límites del MVC a mano

## Estado

- estado: aprobado
- aprobado: 2026-11-01

**Pieza:** docs/editorial/piezas/mvc-limites.md
**Tarea:** docs/tasks/034-capitulo-5-serie-mvc.md

## Encuadre

- **Audiencia:** lectores que vienen del capítulo 4 (el carrito MVC completo funciona, con el ciclo cerrado) y se preguntan si el patrón a mano aguanta un producto real; también quien evalúa si su componente necesita un framework o no.
- **Promesa:** «después de leer esto, el lector podrá nombrar dónde cede el MVC hecho a mano —el repintado total por cambios mínimos, la vista parcial que diverge, el suscriptor que se pisa— y qué problema resolvió la reactividad»
- **Arco:**
  - Gancho y previo: la tensión (el ciclo se cerró y el carrito funciona; el patrón no falla por malo, falla por tamaño) resuelta dentro del previo.
  - El resultado primero: el banco de pruebas corriendo —tres experimentos sobre el carrito del capítulo 4 con sus salidas reales— antes de explicar cada uno.
  - El experimento: qué se va a estresar y con qué código de partida (el carrito del capítulo 4, sin tocar).
  - Prueba uno, el repintado total: quitar una línea reescribe los dieciséis elementos restantes; el render no sabe qué cambió, así que lo repinta todo.
  - Prueba dos, la vista parcial a mano: actualizar solo el contador y el total olvida la lista; el modelo dice dos líneas y el DOM muestra cero —la UI miente y nadie avisa.
  - Prueba tres, el suscriptor que se pisa: una regla de negocio como suscriptor (regalo cuando el total llega a $200) muta el modelo dentro de la notificación; aparece un repintado anidado y, sin guardia, un `RangeError` por recursión infinita.
  - El mapa de límites: qué aguanta el MVC a mano (un componente, pocas vistas, notificación burda a todo el mundo) y qué resolvió la reactividad (granularidad: saber qué cambió y tocar solo eso); el puente al post del mini-store donde encaje, sin forzarlo.
  - Los límites honestos: las cifras son conteos de nodos, no mediciones de tiempo; el boilerplate es tropo del género (Rascia y Stearns lo advierten); otras respuestas históricas (eventos nombrados, PubSub) quedan fuera.
  - El punto: el arco completo —del espagueti al MVC— y la puerta que la serie deja abierta.
- **Ejemplo conductor:** el carrito MVC del capítulo 4 intacto, sometido a tres pruebas de estrés que corren tal cual.
- **Alcance:** sin medición de rendimiento (conteo de nodos repintados, no milisegundos); sin construir diffing ni virtual DOM (se nombran como la respuesta que vino después, no se implementan); sin PubSub ni eventos nombrados como alternativa.
- **Metadatos:**
  - `slug` los-limites-del-mvc-a-mano
  - `categoria` arquitectura
  - `nivel` intermedio
  - `tags` javascript, mvc, dom, reactividad (el cuarto por el puente al mini-store)
  - `agente.tema` propuesto: «evalúa dónde cede el patrón MVC hecho a mano —repintados totales, vistas parciales que divergen, suscriptores que se pisan— y qué problema resolvió la reactividad»

## Temas de investigación

- [x] ¿Qué repinta exactamente el render del capítulo 4 ante un cambio mínimo? (verificado en happy-dom: quitar una línea reescribe el árbol entero —16 elementos tras el cambio, antes 18— para actualizar solo contador, total y una línea)
- [x] ¿Una actualización parcial escrita a mano diverge del modelo? (verificado: suscriptor que solo toca `#contador` y `#total` deja la lista olvidada —el modelo dice 2 líneas y el DOM muestra 0—)
- [x] ¿Un suscriptor que muta el modelo produce notificaciones anidadas? (verificado: la regla «regalo si total ≥ $200» genera un repintado marcado como anidado dentro de la segunda notificación; sin guardia, `RangeError: Maximum call stack size exceeded`)
- [x] ¿La cascada crece con las vistas? (verificado: con la vista del carrito y un badge suscritos, un solo `agregar` produce 2 repintados)
- [x] ¿El caveat de boilerplate es tropo del género? (las referencias del género lo recogen —Rascia y Stearns, ver `docs/research/2026-10-referencias-mvc-vanilla-js.md`—; el capítulo puede usarlo sin atribuirlo como novedad)

## Material

El banco de pruebas verificado completo, sobre el carrito del capítulo 4 (`Carrito` con `suscribir`/`#notificar`, `render` que reescribe `host.innerHTML`).

Prueba uno — el repintado total:

```js
carrito.suscribir(() => render(host, carrito));
carrito.agregar(teclado);
carrito.agregar(raton);
carrito.agregar(monitor);
carrito.quitar(2); // solo cambian contador, total y un <li>
```

Salida verificada: quitar una línea reescribe los 16 elementos que quedan en el árbol (antes del cambio: 18).

Prueba dos — la vista parcial a mano:

```js
// en lugar del render completo, actualizamos solo "lo que cambia":
carrito.suscribir(() => {
  host.querySelector("#contador").textContent = carrito.unidades;
  host.querySelector("#total").textContent = `$${carrito.total}`;
  // nos olvidamos de la <ul> de líneas
});
```

Salida verificada tras tres añadir y un quitar: el modelo dice `2` líneas y el DOM muestra `0` —la divergencia es silenciosa.

Prueba tres — el suscriptor que se pisa:

```js
// regla de negocio como suscriptor: regalo cuando el total llega a $200
let regaloDado = false;
carrito.suscribir((c) => {
  if (!regaloDado && c.total >= 200) {
    regaloDado = true;
    c.agregar({ id: 99, nombre: "Regalo", precio: 0 }); // muta dentro de la notificación
  }
});
```

Salida verificada (clics añadir monitor $180, luego teclado $45):

```
repintado por notificación 1: 1 u / $180
repintado por notificación 2: 2 u / $225
repintado por notificación 3 (anidada): 3 u / $225
```

Y la misma regla sin la guardia `regaloDado`: `RangeError: Maximum call stack size exceeded`.

Cascada — cada vista suscrita repinta entera: con la vista del carrito y un badge de unidades suscritos al mismo modelo, un solo `agregar` produce 2 repintados; la cuenta crece con cada vista nueva.

Fuentes: las referencias del género en `docs/research/2026-10-referencias-mvc-vanilla-js.md` (Rascia y Stearns; el caveat de boilerplate es tropo compartido).

Decisión de la puerta: la `vista-instrumentada` gana un `modo="limites"` que corre el escenario de la regla en vivo —el lector pulsa «Añadir» y ve el repintado anidado en el registro—, coherente con la pieza del capítulo 4.

## Borrador del outline

- Gancho: el ciclo se cerró y el carrito funciona; la tensión es que «funcionar» y «aguantar» no son lo mismo (resuelta en el previo).
- `<!--more-->` + promesa (tres pruebas de estrés sobre el carrito intacto y el mapa de lo que cede).
- Resultado primero: el banco de pruebas corriendo —las tres salidas reales antes de explicarlas.
- El experimento: qué se estresa y con qué código de partida.
- Prueba uno, el repintado total: el render no sabe qué cambió.
- Prueba dos, la vista parcial a mano: la divergencia silenciosa.
- `:::pausa` tras la prueba dos: explica por qué el DOM muestra 0 líneas si el modelo tiene 2.
- Prueba tres, el suscriptor que se pisa: la notificación anidada y el `RangeError` sin guardia.
- (Si se aprueba la demo) `:::demo{nombre="vista-instrumentada" modo="limites"}` tras la prueba tres, con fallback descriptivo y alturas calibradas sobre la pieza montada.
- `:::pausa` tras la prueba tres: cuenta qué pasa dentro de la notificación 2 antes de que termine.
- El mapa de límites: qué aguanta el MVC a mano y qué resolvió la reactividad; el puente al post del mini-store donde encaje.
- Límites honestos: conteos de nodos, no tiempo; el boilerplate como tropo del género; las respuestas históricas que quedaron fuera.
- El punto: el arco cerrado —del espagueti al MVC— y la puerta abierta que queda.

## Checklist de publicación

- [ ] El gancho planta una tensión y la resuelve dentro del previo
- [ ] `<!--more-->` inmediatamente tras el gancho (el previo sale del cuerpo, decisión D002)
- [ ] El previo es una unidad: un párrafo breve y autocontenido, diseñado como tal
- [ ] `description` enuncia la promesa en una frase, sin adjetivos valorativos
- [ ] Frontmatter completo: `title`, `description`, `date`, `categoria`, `tags` (`nivel` solo si el encuadre lo decidió)
- [ ] `date` con la hora real del commit o del merge
- [ ] `categoria` es el pilar decidido en el encuadre; ningún tag coincide con una categoría
- [ ] Cada snippet corre tal cual aparece (ejecutado antes de incluirse) o se marca explícitamente como extracto
- [ ] Los límites honestos tienen sección propia; el cierre abre una puerta
- [ ] Ronda de escritura completa (`revisar-redaccion` y luego `pulir-escritura`) sobre la versión final
- [ ] Las tres salidas del banco de pruebas vienen de ejecución real, no redactadas
- [ ] El puente al post del mini-store entra donde encaja, sin forzarlo
