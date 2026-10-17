# Brief — Un store reactivo en vanilla JS

[Ejemplo de brief completado y aprobado, construido sobre un post real
ya publicado. Sirve para ver la plantilla `assets/brief.md` llena: qué
nivel de detalle espera cada sección y cómo se ve un brief listo para
`redactar-post`.]

## Estado

- estado: aprobado
- aprobado: 2026-10-16

**Pieza:** docs/editorial/store-reactivo-vanilla.md
**Tarea:** docs/tasks/011-redactar-post-mini-store.md

## Encuadre

- **Audiencia:** lectores que usan React, Vue o Solid a diario y que
  intuyen que hay un mecanismo simple debajo del estado reactivo, pero
  nunca lo han construido; saben funciones, closures y el DOM básico.
- **Promesa:** «después de leer esto, el lector podrá construir un
  store reactivo en vanilla JS que actualice el DOM sin frameworks»
- **Arco:**
  - Gancho y previo: la tensión («Parece magia. No lo es») resuelta
    dentro del previo.
  - El resultado primero: el programa completo funcionando, antes de
    explicar nada.
  - Estado que notifica: `signal`, suscripciones y el truco que las
    conecta.
  - El efecto que se registra solo: `effect` y el tracking de
    dependencias.
  - De un valor a un objeto: la `store` y el Proxy.
  - Lo que falta para ser un framework: los límites honestos.
  - El punto: cierre con puerta a la serie.
- **Ejemplo conductor:** un solo programa que crece sección a sección
  (contador con `signal` y `effect` que reescribe `document.title`);
  cada mecanismo nuevo se añade al mismo ejemplo.
- **Alcance:** sin reconciliación de DOM, sin componentes, sin
  middleware; el ejemplo reescribe el título entero — escalarlo es
  justamente lo que los frameworks resuelven.
- **Metadatos:** `slug` un-store-reactivo-en-vanilla-js · `categoria`
  fundamentos · `nivel` intermedio · `tags` javascript, reactividad

## Temas de investigación

- [x] ¿`queueMicrotask` basta para agrupar efectos del mismo tick o
      hace falta `requestAnimationFrame`? — verificado ejecutándolo:
      respuesta en `## Material`.
- [x] ¿Cómo nombran los frameworks el agrupado de actualizaciones? —
      `batching` y `scheduling`; la casa ya usa `batching` sin
      cursiva.
- [x] ¿`Proxy` permite interceptar escrituras sobre propiedades
      arbitrarias del objeto estado? — sí, con `set()` en el handler;
      snippet verificado en `## Material`.

## Material

- `queueMicrotask` agrupa los efectos del mismo tick antes del render:
  verificado ejecutando en Node — una escritura triple dispara una
  sola ejecución del efecto.

  ```js
  let queued = false;
  const batch = (fn) => {
    if (queued) return;
    queued = true;
    queueMicrotask(() => {
      queued = false;
      fn();
    });
  };
  // salida verificada: el efecto corre una vez por tres escrituras
  ```

- El `Proxy` atrapa cualquier propiedad sin declararlas:

  ```js
  new Proxy(estado, {
    set(obj, prop, val) {
      obj[prop] = val;
      notificar(prop);
      return true;
    },
  });
  ```

- Nombres de la industria para el mecanismo: `signal` (Solid, Preact),
  `ref` (Vue), `store` (Svelte); el post usa `signal` y `effect` por
  cercanía al lector de frameworks.

## Borrador del outline

- Gancho: «Cambia una variable y la pantalla se actualiza sola…
  Parece magia. No lo es.» — `<!--more-->` inmediatamente después y el
  párrafo de promesa («unas cincuenta líneas que hacen lo esencial»).
- Resultado primero: el programa completo de quince líneas con su
  comentario de salida (`count.value = 1` y el título ya dice
  «count: 1»).
- Sección por pieza: `signal` (estado que notifica), `effect`
  (registro de dependencias), `store` (Proxy sobre el objeto).
- Límites honestos: `document.title` se reescribe entero; la
  reconciliación fina del DOM es lo que los frameworks aportan.
- Cierre: una frase que baja el telón y la última que abre la serie
  («De esa pregunta va la siguiente serie»).

## Checklist de publicación

- [ ] El gancho planta una tensión y la resuelve dentro del previo
- [ ] `<!--more-->` inmediatamente tras el gancho (el previo sale del
      cuerpo, decisión D002)
- [ ] El previo es una unidad: un párrafo breve y autocontenido,
      diseñado como tal
- [ ] `description` enuncia la promesa en una frase, sin adjetivos
      valorativos
- [ ] Frontmatter completo: `title`, `description`, `date`,
      `categoria`, `tags` (`nivel` solo si el encuadre lo decidió)
- [ ] `date` con la hora real del commit o del merge
- [ ] `categoria` es el pilar decidido en el encuadre; ningún tag
      coincide con una categoría
- [ ] Cada snippet corre tal cual aparece (ejecutado antes de
      incluirse) o se marca explícitamente como extracto
- [ ] Los límites honestos tienen sección propia; el cierre abre una
      puerta
- [ ] Ronda de escritura completa (`revisar-redaccion` y luego
      `pulir-escritura`) sobre la versión final
- [ ] La salida del contador aparece como comentario en el snippet,
      tal cual la verá el lector

[Los ítems se marcan durante la escritura, conforme `redactar-post`
los verifica; el último es un ítem específico del post, añadido por el
encuadre a la lista universal.]
