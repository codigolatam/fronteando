# Brief — La vista como función del estado

## Estado

- estado: aprobado
- aprobado: 2026-10-28

**Pieza:** docs/editorial/piezas/mvc-vista.md
**Tarea:** docs/tasks/032-capitulo-3-serie-mvc.md

## Encuadre

- **Audiencia:** lectores que vienen del capítulo 2 (ya tienen el modelo que notifica) o que mantienen componentes donde el código que pinta creció por acumulación; saben DOM básico (`innerHTML`, `querySelector`, `addEventListener`).
- **Promesa:** «después de leer esto, el lector podrá convertir el código que pinta su componente en un `render(modelo)` que regenera la vista completa (el primer pintado incluido) y entender qué queda por separar»
- **Arco:**
  - Gancho y previo: la tensión (el carrito ya se actualiza solo, pero el código que lo pinta es un suscriptor que creció por acumulación y el marcado inicial ya puede mentir) resuelta dentro del previo.
  - El resultado primero: `render`, suscripción y primer pintado funcionando, con la salida de los clics verificada.
  - Qué pinta el suscriptor de hoy: diagnóstico: el suscriptor toca tres elementos a mano y el marcado estático repite el estado inicial (una segunda fuente de verdad que puede mentir).
  - La vista: `render(modelo)` genera el marcado completo del componente; el host queda vacío.
  - El primer pintado: suscribir y llamar a `actualizar()` una vez; el `$0` del HTML desaparece porque ya no hay HTML que escribir a mano.
  - Los botones dentro del render: cada repintado recrea los nodos y hay que reconectar los manejadores; la vista decide qué pasa al pulsar, y eso toca el modelo directamente (la letanía de Rascia como contraste). Aquí entra la pieza interactiva `vista-instrumentada`: el carrito funcionando junto a un registro en vivo que muestra cada notificación del modelo y el repintado que dispara.
  - Los límites de este paso: se repinta también lo que no cambia, los manejadores viven dentro de la vista a discreción, e `innerHTML` interpola datos sin escapar.
  - El punto: la pantalla es función del estado; falta quién traduce los eventos (la puerta al controlador).
- **Ejemplo conductor:** el mismo carrito del arco (catálogo, contador, líneas con «Quitar» y total) refactorizado: el marcado estático del HTML desaparece y todo lo que se ve lo produce `render(modelo)`.
- **Alcance:** sin reconciliación ni `diffing` del DOM (repintar todo es la decisión honesta del capítulo); sin edición de cantidad (sigue fuera, como en el capítulo 2); los manejadores no se separan aún (esa separación es el capítulo 4).
- **Metadatos:**
  - `slug` la-vista-como-funcion-del-estado
  - `categoria` arquitectura
  - `nivel` intermedio
  - `tags` javascript, mvc, dom
  - `agente.tema` propuesto: «explica cómo convertir el código que pinta un componente en una función render que regenera toda la vista desde el modelo, con el primer pintado incluido»

## Temas de investigación

- [x] ¿`render(modelo)` generando el marcado completo en un host vacío, con suscripción y llamada inicial, reproduce las cifras del arco? (verificado con clics reales en happy-dom: inicial `0 / $0`, tres «Añadir» → `3 / $250` y 3 líneas, «Quitar» → `2 / $205` y 2 líneas)
- [x] ¿La variante «la vista captura los eventos» tiene respaldo en las fuentes del género? (sí: Stearns la describe explícitamente como la variante moderna; la investigación de referencias ya la registra)
- [x] ¿`render` es término aceptado por la casa? (sí: `EDITORIAL.md` lo lista entre los anglicismos técnicos admitidos sin cursiva)

## Material

El refactor verificado completo: host vacío, `render` produce todo el marcado, `conectar` recablea los botones tras cada repintado, y el arranque suscribe y pinta una vez.

```js
function render(modelo) {
  host.innerHTML = `
    <ul id="catalogo">
      ${productos.map((p) => `<li>${p.nombre} — $${p.precio} <button data-agregar="${p.id}">Añadir</button></li>`).join("")}
    </ul>
    <h3>Tu carrito (<span id="contador">${modelo.unidades}</span>)</h3>
    <ul id="carrito">
      ${modelo.lineas.map((l) => `<li>${l.nombre} x${l.cantidad} — $${l.precio * l.cantidad} <button data-quitar="${l.linea}">Quitar</button></li>`).join("")}
    </ul>
    <p>Total: <span id="total">$${modelo.total}</span></p>`;
}
```

```js
function conectar(modelo) {
  for (const b of host.querySelectorAll("[data-agregar]"))
    b.addEventListener("click", () =>
      modelo.agregar(productos.find((p) => p.id === Number(b.dataset.agregar))),
    );
  for (const b of host.querySelectorAll("[data-quitar]"))
    b.addEventListener("click", () => modelo.quitar(Number(b.dataset.quitar)));
}
```

```js
const carrito = new Carrito();
const actualizar = () => {
  render(carrito);
  conectar(carrito);
};
carrito.suscribir(actualizar);
actualizar(); // el primer pintado también es función del estado
```

Salida verificada (clics reales, happy-dom): `inicial: 0 / $0 / catálogo: 3` · `tras 3 añadir: 3 / $250 / líneas: 3` · `tras quitar: 2 / $205 / líneas: 2`.

Decisiones tomadas al preparar:

- **`innerHTML` con plantilla en lugar de `createElement`:** el post enseña «la vista produce HTML»; una plantilla que devuelve el marcado entero lo muestra más directo que una función que monta nodos a mano. El coste (interpolar datos sin escapar) se declara en los límites (los nombres son literales del catálogo).
- **El catálogo también lo pinta `render`:** todo lo visible lo produce la función, y repintar lo que nunca cambia entra como límite honesto. `productos` se lee del cierre, igual que en el capítulo 2.
- **Los manejadores se recablean dentro del flujo de la vista:** es el mismo patrón que el suscriptor del capítulo 2 ya usaba, ahora explícito como `conectar`; que la vista decida qué pasa al pulsar (y toque el modelo) es la semilla del capítulo 4.

La pieza interactiva `vista-instrumentada` (decisión de la puerta: entra al capítulo): artefacto nuevo en `site/src/demos/vista-instrumentada/` siguiendo el convenio de `carrito` y `store-reactivo` (Svelte compilado a custom element, `index.ts` con `mount(host, container)`). Muestra el mismo carrito del capítulo funcionando y, junto a él, un registro en vivo: cada clic en «Añadir» o «Quitar» produce una línea del tipo «notificación N → repintado: M líneas, $X», haciendo visible el ciclo notificación → render que la prosa describe. El `:::demo` se declara en la sección «Los botones dentro del render», donde el ciclo queda completo en el texto; el fallback describe la pieza como figura honesta.

Fuentes: Dave Stearns, [«The Model-View-Controller (MVC) Architecture»](https://drstearns.github.io/tutorials/mvc/) (las vistas escuchan el modelo y se repintan solas, y él mismo nombra la variante en que la vista captura los eventos de usuario); Tania Rascia, [«How to Build a Simple MVC App From Scratch in JavaScript»](https://www.taniarascia.com/javascript-mvc-todo-app/) (la letanía «the view never touches the model», contraste directo con nuestro `conectar`).

## Borrador del outline

- Gancho: el carrito ya se actualiza solo; la tensión es dónde quedó el código que pinta (resuelta en el previo).
- `<!--more-->` inmediatamente después + el párrafo de promesa (un `render(modelo)` que lo pinta todo, primer pintado incluido).
- Resultado primero: el bloque de arranque (`render`, `conectar`, suscripción y llamada inicial) con la salida de los clics verificada (incluida la línea `inicial`, que demuestra que el primer pintado ya es función del estado).
- Diagnóstico: el suscriptor del capítulo 2 toca tres elementos a mano; y el marcado estático repite el estado inicial (`$0` y `0` escritos en el HTML son una segunda fuente de verdad).
- La vista: `render(modelo)` completo; el host queda como un `<div>` vacío y ya no hay marcado que pueda mentir.
- El primer pintado: por qué `actualizar()` se llama una vez al arrancar; la pantalla nunca muestra un estado que el modelo no tenga.
- Los botones dentro del render: `conectar` y los `data-*`; la vista decide qué pasa al pulsar y toca el modelo directamente (contraste con la letanía de Rascia y la variante de Stearns).
- `:::demo{nombre="vista-instrumentada"}` tras esa sección, con fallback descriptivo y alturas calibradas sobre la pieza montada.
- `:::pausa` tras «El primer pintado»: predecir qué muestra la página antes de la primera notificación, y explicar por qué ya no puede mentir.
- `:::pausa` tras «Los botones dentro del render»: qué tendría que pasar para que la vista no tocara el modelo.
- Límites honestos: se repinta también lo que no cambió (catálogo incluido); los manejadores viven dentro de la vista a discreción; `innerHTML` interpola datos sin escapar.
- El punto: la pantalla es función del estado, pero los eventos siguen entrando por cualquier lado; quién los traduce es la pregunta del siguiente capítulo.

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
- [ ] La salida del resultado primero viene de clics reales sobre los botones, no de llamadas directas al modelo
- [ ] La línea `inicial` de la salida demuestra el primer pintado como función del estado
- [ ] La pieza `vista-instrumentada` (aprobada en la puerta) se declara con `:::demo`, lleva fallback honesto escrito como figura y alturas medidas sobre la pieza montada
- [ ] El registro en vivo de la pieza muestra el ciclo notificación → repintado que la prosa describe
