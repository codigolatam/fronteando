# Brief — El controlador cierra el ciclo

## Estado

- estado: borrador
- aprobado:

**Pieza:** docs/editorial/piezas/mvc-controlador.md
**Tarea:** docs/tasks/033-capitulo-4-serie-mvc.md

## Encuadre

- **Audiencia:** lectores que vienen del capítulo 3 (la vista ya es una función del estado, pero los manejadores viven dentro de ella y tocan el modelo) o que mantienen componentes donde los listeners deciden de todo; saben DOM básico (`addEventListener`, `closest`, `dataset`).
- **Promesa:** «después de leer esto, el lector podrá sacar los manejadores de eventos de su vista a un controlador que solo traduce clics a acciones del modelo —y ver el ciclo completo evento → acción → modelo → notificación → vista—»
- **Arco:**
  - Gancho y previo: la tensión (la vista ya es una función del estado, pero sus botones recién nacidos siguen llamando al modelo directamente: la vista decide qué pasa al pulsar) resuelta dentro del previo.
  - El resultado primero: el carrito completo con las tres piezas separadas funcionando, con la salida de los clics verificada.
  - Quién decide hoy: diagnóstico —`conectar` recablea manejadores tras cada repintado y cada botón llama al modelo a discreción; la vista acumula dos trabajos.
  - La separación: los manejadores salen de la vista a un controlador; los botones dejan de anunciar qué llamar (`data-agregar`) y pasan a declarar intención (`data-accion`).
  - El controlador: un listener delegado sobre el host —que no se destruye en los repintados— traduce evento a acción; `conectar` desaparece entero.
  - El ciclo cerrado: evento → acción → modelo → notificación → vista, con el diagrama en palabras; la vista ya no toca el modelo (se cumple la regla de Rascia citada en el capítulo 3).
  - Los límites de este paso: el controlador conoce la forma del DOM (`data-*`, selectores); el modelo sigue sin validar acciones (cualquier llamada externa también puede mutarlo); y la pregunta abierta —esto escala?
  - El punto: las tres piezas separadas y el carrito mantenible; la puerta al último capítulo (los límites del MVC a mano).
- **Ejemplo conductor:** el mismo carrito del arco sobre el modelo del capítulo 2 y el `render` del capítulo 3: `conectar` se retira y un único listener delegado traduce cada clic en una acción.
- **Alcance:** sin comandos deshacer/rehacer ni cola de acciones (el «controlador» aquí es el cable que traduce eventos, no una capa de aplicación); sin validación del lado del modelo; sin separar el catálogo del carrito.
- **Metadatos:**
  - `slug` el-controlador-cierra-el-ciclo
  - `categoria` arquitectura
  - `nivel` intermedio
  - `tags` javascript, mvc, dom
  - `agente.tema` propuesto: «explica cómo sacar los manejadores de eventos de la vista a un controlador que traduce clics a acciones del modelo, cerrando el ciclo evento → acción → modelo → notificación → vista»

## Temas de investigación

- [x] ¿La delegación sobre el host persistente (que `render` no recrea, solo escribe su `innerHTML`) elimina el recableado por completo? (verificado con clics reales en happy-dom: inicial `0 u / $0`, tres «Añadir» → `3 u / $250` y 3 líneas, «Quitar» → `2 u / $205`, y un «Añadir» posterior a varios repintados sigue funcionando sin volver a conectar nada)
- [x] ¿`data-accion` + `data-id`/`data-linea` + `closest` bastan para traducir cada botón a su acción? (verificado en el mismo harness: `e.target.closest("[data-accion]")` encuentra el botón y `dataset` da los argumentos)
- [x] ¿Quién suscribe a quién según las fuentes? (Rascia: el controlador conecta modelo y vista y los ata a los eventos; Stearns: el controlador solo conecta y persiste — encaja con nuestro arranque, donde el controlador registra el listener y la suscripción)

## Material

El refactor verificado completo: `render` ahora emite intenciones (`data-accion`), un listener delegado las traduce y `conectar` desaparece.

```js
// en render, los botones declaran intención, no llamadas:
`<button data-accion="agregar" data-id="${p.id}">Añadir</button>`
`<button data-accion="quitar" data-linea="${l.linea}">Quitar</button>`
```

```js
const carrito = new Carrito();
carrito.suscribir(() => render(carrito));

host.addEventListener("click", (e) => {
  const boton = e.target.closest("[data-accion]");
  if (!boton) return;
  const acciones = {
    agregar: () => carrito.agregar(productos.find((p) => p.id === Number(boton.dataset.id))),
    quitar: () => carrito.quitar(Number(boton.dataset.linea)),
  };
  acciones[boton.dataset.accion]?.();
});

render(carrito); // el primer render también sale de la vista
```

Salida verificada (clics reales, happy-dom): `inicial: 0 u / $0 / 0 líneas` · `3 añadir: 3 u / $250 / 3 líneas` · `quitar: 2 u / $205 / 2 líneas` · `añadir de nuevo (tras repintados): 3 u / $250 / 3 líneas`.

Detalle técnico que sostiene el capítulo: el listener vive sobre `host`, un elemento que `render` no recrea (solo reescribe su `innerHTML`), así que sobrevive a todos los repintados sin recablearse — la diferencia con los botones del capítulo 3, que morían con sus nodos.

Fuentes: Dave Stearns (el controlador conecta modelo y vista y traduce los eventos de usuario a operaciones del modelo); Tania Rascia (el controlador «binds» los eventos a manejadores que llaman al modelo — la vista queda limpia).

Decisión de la pieza interactiva pendiente de la puerta: la `vista-instrumentada` del capítulo 3 ya muestra notificación → repintado; el capítulo 4 puede extenderla para mostrar el ciclo entero (clic → acción → notificación → repintado) o quedarse sin pieza nueva.

## Borrador del outline

- Gancho: la vista ya es una función del estado; la tensión es que sus botones aún llaman al modelo directamente (resuelta en el previo).
- `<!--more-->` + promesa (los manejadores salen a un controlador y el ciclo se cierra).
- Resultado primero: el arranque completo (suscripción, listener delegado, primer render) con la salida de los clics verificada, incluido el «añadir de nuevo» que prueba que nada se recablea.
- Diagnóstico: `conectar` recablea tras cada repintado y cada botón decide qué pasa — la vista tiene dos trabajos (recordar la regla de Rascia del capítulo anterior).
- La separación: de `data-agregar`/`data-quitar` a `data-accion` — el botón declara intención, no el método a llamar.
- El controlador: el listener delegado, `closest`, `dataset`, la tabla de acciones; `conectar` desaparece.
- El ciclo cerrado: evento → acción → modelo → notificación → vista, dicho en palabras; la vista ya no toca el modelo.
- `:::pausa` tras «El controlador»: explica por qué el listener no muere en los repintados si los botones sí.
- `:::pausa` tras «El ciclo cerrado»: cuenta el recorrido completo de un clic en «Quitar».
- Límites honestos: el controlador conoce la forma del DOM; el modelo acepta cualquier llamada externa; ¿esto escala a muchas vistas y suscriptores?
- El punto: las tres piezas separadas — y la pregunta del último capítulo.

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
- [ ] La salida del resultado primero viene de clics reales sobre los botones, incluido el «añadir» posterior a repintados que demuestra que el listener no se recablea
- [ ] Decisión pendiente de la puerta: ¿la `vista-instrumentada` se extiende para mostrar el ciclo completo (clic → acción → notificación → repintado) o el capítulo va sin pieza?
