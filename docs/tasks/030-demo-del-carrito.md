# Demo viva del carrito a lo bruto

## Estado

[ ] Pendiente | **[~] En progreso** | [r] En revisión | [x] Completada | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

Convertir el ejemplo del artículo «El carrito a lo bruto» en una
pieza interactiva donde el lector usa el componente —catálogo,
añadir, quitar y total— en el lugar donde el texto lo presenta, en
vez de leerlo como listado estático.

## Dependencias

- 028 — el mecanismo que hospeda la pieza en el artículo.

## Entrada

- El artículo `site/src/content/articulos/carrito-a-lo-bruto.md` —
  su sección «El resultado primero» y el código completo del carrito
  que el texto desmonta después.
- El mecanismo y el convenio de autoría del borrador 01, más lo que
  la primera pieza real (borrador 02) haya depurado.
- `DESIGN.md` — la superficie de la demo sale de los tokens.

## Resultado esperado

- Donde el artículo muestra el carrito como listado estático, el
  lector encuentra el componente funcionando: añade productos, los
  quita y ve el total actualizarse —y puede volver al código impreso
  para reconocer qué parte hace qué—.
- El texto del artículo se adapta: la presentación que hoy compensa
  la ausencia de funcionamiento se ajusta para referir lo que el
  lector puede tocar, preservando el argumento central —el código
  funciona y aun así nadie quiere mantenerlo—.
- La pieza ejercita un perfil distinto del mecanismo que la primera:
  un componente de UI reconocible frente a una vista instrumentada de
  estado interno.

## Criterios de calidad

- El carrito funciona en su lugar de lectura: añadir, quitar y total
  responden como describe el texto.
- La demo reproduce el componente tal como el artículo lo construye —
  el lector que lee el listado reconoce en la demo lo que tocó—.
- Sin JavaScript el artículo sigue contando lo esencial y el `.md`
  queda legible para un agente.
- La superficie sigue `DESIGN.md`; el texto adaptado respeta la voz
  editorial y el `agente` declarado sigue funcionando con sus pausas
  en posición.
- `check`, `lint`, `test`, `build` y `format:check` en verde; la demo
  se verifica renderizada en el navegador.

## Procedimiento sugerido

1. Diseñar la demo: el componente funcionando tal como el artículo lo
   construye, en el lugar donde hoy se presenta el resultado.
2. Construir la pieza con el convenio del borrador 01 e insertarla.
3. Ajustar el texto del artículo a la presencia de la demo.
4. Verificar renderizado, el `.md` resultante y las puertas.

## Contexto

- **Archivos similares:**
  - `site/src/content/articulos/carrito-a-lo-bruto.md` — el
    artículo: «El resultado primero» presenta el carrito como dos
    listados estáticos (HTML + JS) y el párrafo posterior describe
    lo que haría el clic; «La petición más normal del mundo» muestra
    el extracto con `<input>` de cantidad que mata el botón «Quitar».
    Tres `:::pausa` activas y `agente` declarado.
  - `site/src/demos/store-reactivo/` — la primera pieza real:
    modelo de estructura (componente Svelte + `index.ts` adaptador +
    tests por unidad) y de integración (directiva con `altura` /
    `altura-estrecha`, fallback de tres lectores).
  - `site/src/demos/contador/` y `site/src/demos/fronteando-demo.ts`
    — la pieza de referencia del convenio y el anfitrión: contrato
    `mount(host, container)`, atributos de la directiva llegan como
    atributos del elemento (`host.getAttribute`).
  - `site/src/utils/demo-directive.ts` — la directiva: valida
    longitudes CSS y transporta la reserva de altura en el HTML.
- **Patrones:**
  - Componente de UI reconocible (perfil distinto al de la pieza del
    store): la pieza ES el carrito del listado, no una vista
    instrumentada —la honestidad aquí es ejecutar el mismo código
    enredado del artículo, no reescribirlo—.
  - Svelte CE: `piece.svelte` con `<svelte:options>`, `index.ts`
    adaptador; estilos scoped con tokens `--*` heredados.
  - Para ejecutar el listado tal cual, el código del artículo corre
    con un `document` acotado a la pieza (parámetro/scope), no con el
    documento global.
- **Dominio/Producto:** el proyecto no tiene `docs/dominio` ni
  `docs/producto` —ninguna aplica.
- **PRD:** 004 — CU-1 (ver funcionar el ejemplo en su lugar) es el
  corazón de esta pieza; CU-3 lo resuelve la declaración `:::demo`;
  CU-4/5 los resuelven el mecanismo más un fallback honesto. CU-2
  (vista instrumentada) no aplica: el perfil de esta pieza es el
  componente reconocible.
- **Lecciones:** `texto-para-agentes` (el fallback se evalúa como
  prompt), `nombres-de-tests` (describe/when/it), `idioma-del-codigo`
  (código en inglés), `espanol-del-blog` (texto visible latam
  neutro), `alcance-de-la-verificacion` (el diseño se verifica
  renderizado), `formato-de-codigo-generado` (estilo Prettier desde
  la escritura; `.svelte` ya formatea `prettier-plugin-svelte`).
- **Decisiones:** D007 (piezas en Svelte CE + adaptador `mount`),
  D001 (estático, sin servidor), D006 (la pieza vive en el flujo,
  no en el rail).
- **Investigación:**
  `docs/research/2026-10-el-genero-explorable-explanations.md` —
  tipos de pieza; la del carrito es «simulación jugable»/componente
  de UI, no «vista instrumentada».
- **Vacío detectado:** vitest corre en Node sin DOM (no hay jsdom ni
  happy-dom); el código del carrito es DOM puro, así que la suite
  necesitará un entorno DOM de test o limitarse a lo no visual.

## Conectividad

**Veredicto: parcialmente conectada.**

Todo lo que la pieza asume existe con la forma esperada: el
mecanismo (`:::demo` → `<fronteando-demo>` → `src/demos/<nombre>/`,
con los atributos extra de la directiva llegando como atributos del
elemento), la integración Svelte con modo custom elements, el token
de tier `--demo-font-size` y el resto de tokens que cruzan los dos
shadows, la reserva de altura por HTML y el artículo con su listado
estático donde la pieza encaja.

Lo único que falta es un entorno DOM para los tests: vitest corre en
Node y el código del carrito es DOM puro. Es absorbible por la propia
tarea —una dependencia de desarrollo (`happy-dom` o `jsdom`) con el
pragma de entorno de vitest en el archivo de test—, así que el
sub-flujo continúa; queda declarado para que el plan lo decida.

## Plan técnico

**Resumen del subsistema:** «El carrito a lo bruto» presenta el
componente como dos listados estáticos (HTML + JS) en «El resultado
primero», y un extracto en «La petición más normal del mundo» que
describe un bug real —editar la cantidad mata el botón «Quitar»—.
La pieza ejecuta ese mismo código —con un `document` acotado a la
pieza— en lugar de reescribirlo: el argumento del post es que este
código funciona y aun así nadie quiere mantenerlo.

**Decisiones transversales:**

- El cuerpo del módulo es el listado del post (con los casts
  mínimos de TypeScript), corriendo sobre un `document` acotado al
  contenedor de la pieza: `document.querySelector("#total")`
  resuelve dentro de su shadow. La honestidad es literal: lo que el
  lector lee es lo que ejecuta.
- La misma pieza en dos configuraciones vía el atributo `modo` de la
  directiva: el listado completo en «El resultado primero» y la
  versión con `<input>` de cantidad en «La petición más normal del
  mundo», donde el lector comprueba tocando que el botón «Quitar»
  muere.
- Componente reconocible, no instrumentado: lista de productos con
  «Añadir», carrito con «Quitar», contador y total —los mismos ids
  y estructura del bloque `html` del artículo, vestido con tokens—.
  Sin trazas ni estado interno a la vista.
- Los listados impresos se quedan (son lo que el artículo desmonta
  después); el párrafo compensatorio pasa a invitación.
- Tests con DOM: el carrito es DOM puro y vitest corre en Node, así
  que la tarea añade `happy-dom` como devDependency y el pragma de
  entorno en el archivo de test.

**Diseño y experiencia esperada:**

- Un componente de tienda reconocible, no un panel instrumentado —
  el perfil opuesto al de la pieza del store—.
- Dos zonas, catálogo a la izquierda y carrito a la derecha, por
  container query (~≥560px); apiladas en estrecho, en el orden del
  documento. El esqueleto es el bloque `html` del artículo
  (`#catalogo`, `#contador`, `#carrito`, `#total`) con tokens.
- Chrome en `--demo-font-size` (15px); el total destacado por peso.
  Botones reales con borde de token, ≥44px, foco visible; «Quitar»
  sugiere `--color-danger` al hover.
- Carrito vacío sin ornamento: lista vacía, contador 0, total $0 —
  el listado del artículo tampoco pinta nada—.
- Total y contador anuncian cambios con una sola línea de estado
  (`role="status"`), sin ráfagas de `aria-live`; listas con
  semántica real.
- En `modo="cantidad"`, cada línea lleva el `<input type="number">`
  del segundo listado, sin avisos: el lector descubre el botón
  muerto tocándolo.
- Expectativa de UX: el lector toca y el carrito hace exactamente
  lo que el código promete (3 añadidos → contador 3, total $250);
  en la segunda pieza edita cantidad, ve que todo se actualiza y
  al pulsar «Quitar» en esa línea no pasa nada —la pantalla mintió
  delante de él—.

- [ ] Escribir `cart.ts` en `site/src/demos/carrito/` con el código
      del artículo: `mountCart` (listado completo) y la variante
      con cantidad del extracto; `document` como parámetro acotado
  - Aporta: la pieza corre exactamente lo que el texto desmonta —
    mismo estado repartido, mismos manejadores—
  - Contexto: el cuerpo es el listado del post con los casts
    mínimos de TS (`e.target`, `find` posiblemente undefined);
    `ScopedDocument` expone `querySelector` y `createElement`; las
    búsquedas del código son `#catalogo`, `#carrito`, `#contador`
    y `#total`
- [ ] Construir `cart-demo.svelte` (CE `demo-carrito`): el
      esqueleto `html` del artículo, estilos con tokens y montaje
      de la variante según el atributo `modo`
  - Aporta: la UI reconocible funcionando donde el texto la
    presenta
  - Contexto: controles ≥44px, teclado, `prefers-reduced-motion`;
    el componente monta el carrito tras el primer render; dos
    instancias pueden convivir en el artículo (cada shadow aísla
    los ids)
- [ ] Escribir el `index.ts` adaptador del convenio: lee `modo`
      del host y lo propaga al custom element
  - Aporta: una sola pieza sirve a los dos puntos de lectura
- [ ] Declarar las dos piezas y adaptar el texto:
      `:::demo{nombre="carrito"}` tras el listado JS en «El
      resultado primero» y `:::demo{nombre="carrito"
      modo="cantidad"}` en «La petición más normal del mundo»;
      fallback descriptivo en cada una y párrafos circundantes
      ajustados a invitación
  - Aporta: CU-1 en los dos lugares donde el texto lo promete;
    el `.md` y sin-JS quedan legibles por el fallback
  - Contexto: el fallback de la segunda declara el bug esperado
    (el botón «Quitar» muere tras editar la cantidad); pausas y
    `agente` intactos
- [ ] Añadir `happy-dom` como devDependency y el pragma
      `// @vitest-environment happy-dom` en el test
  - Aporta: la suite prueba DOM real sin servidor
  - Contexto: vitest 4 soporta pragma por archivo; no hace falta
    entorno global
- [ ] Calibrar `altura`/`altura-estrecha` midiendo la pieza
      montada y verificar renderizado (desktop/mobile, temas,
      teclado, fallback, `.md`)
  - Aporta: el criterio exige evidencia renderizada
- [ ] Puertas: `check`, `lint`, `test`, `build`, `format:check`
  - Aporta: la regresión no entra

## Suite de pruebas esperada

- Al montar, el catálogo muestra los tres productos con su
  «Añadir» y el carrito arranca vacío: sin líneas, contador 0 y
  total $0 (CU-1; Z).
- Pulsar «Añadir» en un producto agrega una línea al carrito y
  actualiza contador y total (CU-1; O).
- Añadir los tres productos acumula como describe el texto:
  tres líneas, contador 3 y total $250 (CU-1; M).
- «Quitar» la única línea deja la lista vacía con contador 0 y
  total $0; quitar una entre varias descuenta solo esa (CU-1; B).
- Las búsquedas del código se resuelven dentro de la pieza:
  dos instancias montadas no mezclan su estado ni sus nodos
  (CU-1; I).
- En `modo="cantidad"`, editar la cantidad de una línea
  recalcula subtotal, total y contador; y el botón «Quitar» de
  esa línea queda muerto —el bug del artículo es el
  comportamiento esperado de la demo— (CU-1; E).
- El `.md` muestra los dos `:::demo` con su fallback y sin
  JavaScript se ve el fallback en el lugar de cada pieza
  (CU-4/5; B/I).
- Solo tokens de `DESIGN.md`; operable por teclado; pausas y
  acompañamiento intactos (regresión).

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
