# Brief — El componente empaquetado: el MVC en una clase

## Estado

- estado: aprobado
- aprobado: 2026-11-19

**Pieza:** docs/editorial/piezas/mvc-componente.md
**Tarea:** docs/tasks/038-capitulo-6-serie-mvc.md

## Encuadre

- **Audiencia:** lectores de la serie que tienen el carrito MVC en tres piezas sueltas (modelo que notifica, `render` función del estado, manejador delegado) y se preguntan cómo usarlo como una sola cosa que se instancia con un `new`; saben clases con campos privados (`#`) y DOM básico (`addEventListener`, `closest`, `dataset`).
- **Promesa:** «después de leer esto, el lector podrá empaquetar un componente de tres piezas sueltas en una clase instanciable (`new CartComponent(host)`) donde cada método conserva su rol, con estado privado y ciclo de vida»
- **Arco:**
  - Gancho y previo: la tensión (las tres piezas funcionan, pero usar el carrito exige cablear cuatro cosas a mano cada vez; un componente debería ser un `new`) resuelta dentro del previo.
  - El resultado primero: dos `new CartComponent(host)` en la misma página; añadir en uno deja el otro en `$0`, con la salida verificada y la demo de las dos instancias.
  - El punto de partida: re-ancla del carrito para quien llega sin el capítulo 5 reciente (una frase por pieza y los términos del capítulo: instancia, host, ciclo de vida).
  - Qué hace el `new`: el cableado que sustituye (los pasos del arranque del capítulo 4: `new Cart`, suscribir, escuchar, render inicial, ahora dentro del constructor).
  - La clase por dentro: el listado completo recorrido por roles (el bloque del modelo, `#render`, `#onClick`, constructor y `unmount`); la frontera que importa es de responsabilidades, no de objetos.
  - El estado que no sale: los campos `#` son por instancia, así que dos carritos no pueden compartir nada ni por accidente; `subscribe` gana un `return` con la función de baja.
  - La prueba de fuego: las dos instancias diseccionadas (host, manejador y campos propios) y por qué un clic en una no alcanza a la otra.
  - El ciclo de vida: `unmount` revierte la construcción (listener fuera, suscripción cancelada, host vacío); los nombres de la plataforma (`connectedCallback`/`disconnectedCallback` en custom elements, `mount`/`unmount` en Svelte) como puerta a los componentes de verdad.
  - Límites honestos: dentro de un objeto las fronteras vuelven a ser disciplina (`#render` podría llamar a `this.add` sin notificar y nada lo impediría); el catálogo sigue fijo (un componente real recibiría sus datos como props); los límites del capítulo 5 quedan intactos.
  - El punto: del espagueti a un componente instanciable; la última frase abre la puerta a los custom elements y cierra la serie.
- **Ejemplo conductor:** el carrito MVC de la serie empaquetado en la clase `CartComponent`; la prueba de fuego son dos instancias lado a lado en la misma página, y la demo las muestra vivas.
- **Alcance:** sin props ni configuración (el catálogo queda como dato del módulo; un componente real lo recibiría de fuera); sin shadow DOM ni custom elements de verdad (su institucionalización es justamente lo que el límite honesto nombra); sin reescribir el repintado (los límites del capítulo 5 quedan intactos); los snippets siguen en `js`, como el resto de la serie.
- **Metadatos:**
  - `slug` el-componente-empaquetado
  - `categoria` arquitectura
  - `nivel` intermedio
  - `tags` javascript, mvc, dom (los de la serie, uniformes; `componentes` se consideró como tag nuevo y se descarta)
  - `agente.tema` propuesto: «empaqueta un componente MVC de tres piezas sueltas en una clase instanciable donde cada método conserva su rol (modelo que notifica, render función del estado, manejador delegado), con estado privado y ciclo de vida»
  - `agente.prerequisitos` propuesto: «el carrito MVC de la serie o un MVC equivalente (modelo que notifica, render, delegación de eventos); clases con campos privados `#`»

## Temas de investigación

- [x] ¿Las tres piezas caben en una sola clase donde cada método conserva su rol y dos instancias no se contaminan? (verificado con vitest + happy-dom: la clase absorbe modelo, vista y controlador; `new CartComponent(hostA)` y `new CartComponent(hostB)` conviven, añadir en A deja A en `$225` con 2 líneas y B en `$0` sin líneas; código en `## Material`)
- [x] ¿Qué exige el desmontaje? (el listener necesita una referencia estable, el campo `#onClick` con función flecha, y la suscripción del render necesita cancelación: `subscribe` devuelve la función de baja, un `return` retrocompatible con lo publicado; tras `unmount` el host queda vacío y las mutaciones ya no repintan; verificado en la misma ejecución)
- [x] ¿Los `id` que escribe `render` (`catalog`, `counter`, `cart`, `total`) chocan al haber dos instancias? (nada los consulta dentro del programa desde el capítulo 3, la delegación opera por `data-action`; duplicarlos en una página sería HTML inválido, así que la versión en clase los retira y la demo estila por `[data-action]`; verificado en la misma ejecución)
- [x] ¿Cómo se llaman los equivalentes de ciclo de vida en la plataforma y en los frameworks? (`connectedCallback`/`disconnectedCallback` en custom elements, MDN; `mount`/`unmount` en Svelte; `root.unmount()` en React; fuentes en `## Material`)

## Material

La clase empaquetada, verificada por ejecución (vitest + happy-dom, clics reales): el modelo, la vista y el controlador son ahora métodos de `CartComponent`, cada uno en su rol; `subscribe` devuelve la función de baja; `unmount` revierte la construcción.

```js
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

Salida verificada (clics reales, happy-dom, sin los `id` del render): al montar, `Tu carrito (0)` y `Total: $0`; dos instancias en la misma página («Teclado» y «Monitor» en A dejan `Total: $225` con 2 líneas mientras B queda en `Total: $0` sin líneas); tras `unmount`, el host queda vacío y un `add` posterior notifica a suscriptores pero no repinta nada.

Dos decisiones de diseño resueltas en la verificación:

- **Los `id` del render se retiran en la clase.** Nada los consulta desde el capítulo 3 (la delegación trabaja por `data-action`); con dos instancias en una página se duplicarían y el HTML sería inválido. La demo estila por `[data-action]` en su lugar.
- **`subscribe` devuelve la función de baja.** Es el único cambio que el modelo «publicado» sufre: una línea más, retrocompatible (quien ignore el retorno no nota nada). El post lo presenta como lo que es: el ciclo de vida exige poder darse de baja.

Nombres de ciclo de vida para el cierre, con fuente: en custom elements, `connectedCallback` se llama al insertar el elemento y `disconnectedCallback` al retirarlo ([MDN, Using custom elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements)); Svelte expone `mount` y `unmount` como API imperativa ([documentación de Svelte](https://svelte.dev/docs/svelte/imperative-component-api)); React ofrece `root.unmount()` sobre la raíz creada con `createRoot`. La prosa los usa como prueba de que el ciclo de vida que inventamos a mano es el mismo que la plataforma institucionalizó.

La demo del capítulo es nueva: `site/src/demos/carrito-componente/` con dos instancias de `CartComponent` lado a lado (rejilla de dos columnas que se apila en pantallas estrechas, como la de `vista-instrumentada`), cada una con su etiqueta («carrito A», «carrito B») para que el lector vea a qué instancia pertenece cada cambio. Su `cart-app.ts` lleva la clase del post verbatim en TypeScript y su test ejecuta la prueba de fuego (dos instancias que no se contaminan y el `unmount` que desmonta) sobre el mismo harness happy-dom de `vista-instrumentada`.

## Borrador del outline

- Gancho: la serie separó las piezas para enseñarlas y funcionan, pero usar el carrito todavía exige cablear cuatro cosas a mano cada vez; un componente debería ser un `new` (tensión resuelta dentro del previo).
- `<!--more-->` + promesa: empaquetar el carrito en una clase instanciable sin disolver las responsabilidades; al final, dos instancias vivas en la misma página y un `unmount` que lo desmonta todo.
- El punto de partida: una frase por pieza (el modelo notifica, la vista es función del estado, el controlador delega) y los términos del capítulo (instancia, host, ciclo de vida) para quien llega de fuera.
- Resultado primero: `new CartComponent(hostA); new CartComponent(hostB);` más la salida («Teclado» y «Monitor» en A → `Total: $225`; B intacto en `Total: $0`) y la demo de las dos instancias.
- Qué hace el `new`: el arranque del capítulo 4 paso a paso (crear el modelo, suscribir el render, registrar el listener, render inicial) y dónde vive cada paso ahora.
- La clase por dentro: el listado completo, recorrido por roles (los datos y la notificación del modelo, `#render` de la vista, `#onClick` del controlador y el constructor con `unmount` del ciclo de vida); la tesis en una frase: la frontera que importa es de responsabilidades, no de objetos.
- `:::pausa` tras «La clase por dentro»: nombra el rol de cada método y di cuál no existía antes.
- El estado que no sale: los campos `#` por instancia y el `return` nuevo de `subscribe`.
- La prueba de fuego: por qué un clic en A no alcanza a B (host, listener y campos propios; `closest` acotado al árbol del host) y qué pasó con los `id` del render.
- `:::demo{nombre="carrito-componente"}` junto a la prueba de fuego: dos instancias etiquetadas A y B lado a lado, con fallback descriptivo y alturas medidas sobre la pieza montada.
- `:::pausa` tras la prueba de fuego: explica por qué añadir en A no toca a B, nombrando cada cosa que es propia de la instancia.
- El ciclo de vida: `unmount` revierte el constructor en orden inverso; los nombres de la plataforma (`connectedCallback`/`disconnectedCallback`, `mount`/`unmount` de Svelte, `root.unmount()` de React) como destino natural de esta forma.
- Límites honestos: dentro de un objeto las fronteras son disciplina otra vez (`#render` podría llamar a `this.add` sin notificar); el catálogo sigue fijo (sin props); el repintado total del capítulo 5 intacto; los componentes reales (custom elements con shadow DOM, componentes de framework) son este mismo empaquetado institucionalizado.
- El punto: del espagueti del primer capítulo a un componente que se instancia con un `new`; la serie cierra y la última frase abre la puerta a los custom elements.

## Checklist de publicación

- [x] El gancho planta una tensión y la resuelve dentro del previo
- [x] `<!--more-->` inmediatamente tras el gancho (el previo sale del cuerpo, decisión D002)
- [x] El previo es una unidad: un párrafo breve y autocontenido, diseñado como tal
- [x] `description` enuncia la promesa en una frase, sin adjetivos valorativos
- [x] Frontmatter completo: `title`, `description`, `date`, `categoria`, `tags` (`nivel` solo si el encuadre lo decidió)
- [ ] `date` con la hora real del commit o del merge
- [x] `categoria` es el pilar decidido en el encuadre; ningún tag coincide con una categoría
- [x] Cada snippet corre tal cual aparece (ejecutado antes de incluirse) o se marca explícitamente como extracto
- [x] Los límites honestos tienen sección propia; el cierre abre una puerta
- [x] Ronda de escritura completa (`revisar-redaccion` y luego `pulir-escritura`) sobre la versión final
- [x] El resultado primero muestra las dos instancias sin contaminarse, con la salida de clics reales verificada
- [x] El `return` nuevo de `subscribe` se presenta como cambio respecto al modelo publicado
- [x] Los `id` retirados del render se explican en prosa (nadie los consulta desde el capítulo 3)
- [x] Los nombres de ciclo de vida de la plataforma y frameworks van citados con su fuente
- [x] La entrada re-ancla el carrito para quien llega sin el capítulo 5 reciente
- [x] La demo `carrito-componente` muestra dos instancias etiquetadas que no se contaminan, con su test de la prueba de fuego en verde
- [x] El cierre cierra la serie (última pieza) y abre la puerta a los custom elements
