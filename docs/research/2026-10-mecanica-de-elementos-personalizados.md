# Mecánica de elementos personalizados como piezas editoriales

> **Fecha:** 2026-10

## Propósito

Especificar cómo se construye y se hospeda un custom element como pieza interactiva editorial (declaración, estilos, carga del script y ciclo de vida) para que el plan técnico de la tarea 028 decida con detalle lo que la investigación de vehículos [R0] solo esbozó.

## Contexto

La investigación general recomendó custom elements como vehículo de la pieza interactiva en artículos markdown de un sitio Astro estático. Quedan por concretar: qué pone el autor en el fuente (atributos, contenido interno), si la pieza usa shadow DOM o light DOM (decisivo para los tokens de `DESIGN.md`), cómo carga su script solo en los artículos que la usan, y cómo se estructura su código. La fuente primaria más valiosa es el repositorio público de samwho [1], el análogo más cercano al patrón propuesto.

## Hallazgos

### El patrón de samwho, en su código

El repo `samwho/visualisations` muestra una clase base `CustomElement` que todos los elementos de sus artículos extienden [1]:

```ts
export default class CustomElement extends HTMLElement {
  static elementName: string;
  static observedAttributes: string[] = [];

  static register() {
    customElements.define(this.elementName, this);
  }

  async connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot!.innerHTML = `<style>:host { display:flex; … }</style>`;
    // container, initApplication(), …
  }

  attributeChangedCallback(name, old, val) {
    this.application?.onAttributeChange(name, val);
  }

  disconnectedCallback() {
    this.application.destroy();
  }
}
```

Detalles relevantes:

- **Shadow DOM con reset propio:** cada pieza aisla sus estilos (el `:host` declara display, ancho y `user-select` dentro del shadow); el artículo no puede romper la pieza ni la pieza ensuciar el artículo.
- **Registro explícito por elemento:** `XElement.register()` invocado desde el `index.ts` del post tras cargar las fuentes (WebFont) en `DOMContentLoaded`. Un bundle por artículo, compilado con Bun/TypeScript.
- **Configuración por atributos de cadena:** `num-servers="1"`, `rps="1"`, `hide-reset` (`observedAttributes` + `attributeChangedCallback` los reenvían a la aplicación viva).
- **Dimensionamiento por custom properties:** el elemento recibe `style="--simulation-height: 200px"`. La pieza reserva altura sin esperar al layout del contenido.
- **Migración evidenciada:** los posts antiguos (load-balancing, memory-allocation) son vanilla JS con `<script>` suelto; desde hashing/retries todo son custom elements (el patrón ganó en su propia evolución) [1].

### Shadow DOM vs. light DOM, y los tokens de diseño

- **Shadow DOM** aísla estilos en ambas direcciones y soporta *slots* para contenido proyectado. Punto decisivo para Fronteando: **las custom properties CSS se heredan a través del límite del shadow** (los tokens `--*` definidos en `:root` por `DESIGN.md` siguen resolviéndose dentro de la pieza, mientras los selectores ordinarios no cruzan). La pieza puede consumir `var(--accent)` sin exponer su interior [2].
- **Light DOM** (el elemento renderiza en sus propios hijos, como hacen los `d-*` de distill) comparte el CSS del sitio sin fricción y deja el contenido al alcance de selectores del artículo (pero la pieza puede romperse con cambios del tema y sus estilos internos pueden fugarse hacia fuera) [3].
- samwho eligió shadow con un `:host` mínimo; distill eligió light DOM porque su contrato es justamente que la plantilla estilice todo. Para Fronteando (piezas con tokens compartidos pero internos protegidos) shadow + custom properties es la combinación que ambos referentes justifican.

### Configuración: atributos vs. contenido interno

- **Atributos** son cadenas: sirven para flags y valores simples (`num-servers="2"`). Para configuración compleja el convenio habitual es un atributo JSON o un hijo `<script type="application/json">` que el elemento parsea en `connectedCallback` [4].
- **Contenido interno** es HTML pleno: aloja el fallback no-JS y, en shadow DOM, puede proyectarse por slots. Las dos cosas se mezclan: `<store-demo estado-inicial="0">` + contenido descriptivo dentro.
- Nombres: los custom elements exigen un guion en el nombre; samwho usa prefijo `s-`, distill `d-`: un prefijo de sitio (`fronteando-` o similar) es la convención observable [1][3].

### Carga del script en Astro

Los `<script>` procesados de Astro son TypeScript por defecto, se empaquetan con sus imports, salen como `type="module"` y se **deduplican por página** (un componente usado diez veces incluye su script una sola vez) [5]. La propia documentación de Astro recomienda custom elements para rehidratar componentes («`this.querySelector()` en vez de buscar en toda la página») [5].

Implicación para la carga condicional: si el `<script>` vive dentro de un componente que la página del artículo solo renderiza cuando el frontmatter declara piezas, el bundle de demos solo viaja en esos artículos (sin sistema de hidratación ni directivas `client:*`, porque un custom element no es una isla de framework). `is:inline` queda reservado para el código que deba correr intacto (no aplica a bundles) [5][6].

### Ciclo de vida y tamaño reservado

- El navegador trata el elemento no registrado como un `span` anónimo y sus hijos renderizan; al registrarse la definición, el elemento *se mejora* (`upgrade`): la mejora progresiva es nativa de la plataforma [7].
- `connectedCallback` async permite cargas diferidas (fuente, datos); `disconnectedCallback` debe liberar listeners/tickers (el código de samwho destruye la aplicación ahí) [1].
- Para evitar saltos de layout al mejorar, la pieza reserva altura declarada (samwho la parametriza con una custom property por instancia) [1].

## Conclusión

La pieza de Fronteando es una clase `HTMLElement` con **shadow DOM + `:host` mínimo**, que consume los tokens `--*` del sitio a través del límite del shadow; se **configura por atributos** de cadena y recibe su **contenido fallback como hijos** (proyectados por slots cuando proceda). Vive como artefacto propio (un directorio por pieza con su clase, su estilo y su aplicación), se registra desde un script procesado de Astro que el artículo incluye solo si declara piezas, y libera recursos en `disconnectedCallback`. Los nombres llevan prefijo de sitio y cada instancia puede declarar su altura por custom property.

## Limitaciones

- El código de samwho es de un solo autor y con canvas/PIXI como superficie: su forma de clase base es sólida, pero su stack de render (PIXI/GSAP) no aplica a piezas de DOM de Fronteando.
- La carga condicional por frontmatter está inferida del modelo de componentes de Astro (el script viaja solo si el componente se renderiza); la convención exacta (prop en frontmatter vs. detección) la fija el plan.
- No se verificó aún que una directiva `:::` de satteri pueda emitir markup de custom element con hijos (punto del plan de 028).
- El comportamiento de `:defined`/upgrade con bundles diferidos se describe por la spec; los detalles de *timing* se medirán en la implementación.

## Referencias

- [1] samwho — `visualisations` (fuente: `CustomElement.ts`, `hashing/index.ts`, README) — https://github.com/samwho/visualisations
- [2] MDN — «Using custom elements» / shadow DOM y herencia de custom properties — https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements
- [3] distillpub — `template` (componentes `d-*` en light DOM) — https://github.com/distillpub/template
- [4] web.dev — «Custom Element Best Practices» (atributos, configuración, `type="application/json"`) — https://web.dev/articles/custom-elements-best-practices
- [5] Astro Docs — «Client-Side Scripts» (procesado, deduplicación, `is:inline`, patrón custom element) — https://docs.astro.build/en/guides/client-side-scripts/
- [6] Astro — issue #11937 (carga condicional de scripts de componente) — https://github.com/withastro/astro/issues/11937
- [7] WHATWG — HTML Standard §4.13.1.6 «Upgrading elements after their creation» — https://html.spec.whatwg.org/multipage/custom-elements.html
- [R0] Investigación general — `docs/research/2026-10-vehiculos-para-piezas-interactivas.md`
