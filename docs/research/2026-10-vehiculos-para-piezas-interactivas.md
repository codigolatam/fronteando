# Vehículos para piezas interactivas dentro de artículos markdown

> **Fecha:** 2026-10

## Propósito

Comparar los vehículos disponibles para hospedar piezas interactivas —demos funcionando, vistas instrumentadas del funcionamiento interno, mini-demos ilustrativas— dentro de los artículos markdown de un sitio Astro estático, para alimentar la decisión del mecanismo de la épica 004.

## Contexto

Fronteando sirve sus artículos desde una colección de contenido `.md` renderizada con un procesador (satteri) que ya soporta directivas `:::` (`:::pausa`). Las piezas son código propio y confiable, corren en el navegador del lector, deben degradar sin JavaScript y convivir con la versión `.md` de cada artículo —el texto que consumen los agentes—.

## Hallazgos

### El género: explorable explanations

Existe una tradición consolidada de artículos donde el lector manipula el ejemplo para construir intuición —los «reactive documents» de Bret Victor y el catálogo de explorabl.es— [1][2]. Fronteando se inscribe en ella: sus referentes no son blogs con un ocasional demo incrustado, sino piezas donde la interactividad es el vehículo pedagógico.

### Cómo lo hacen las referencias, verificado en el DOM

Inspección directa de las páginas en Firefox (octubre 2026):

| Sitio | Vehículo real | Declaración en el fuente |
|---|---|---|
| joshwcomeau.com (guía de flexbox) | Componentes React a medida —15 sliders, 76 botones, 207 SVGs— sobre Next.js; **4 iframes `srcdoc`** para demos que necesitan un documento limpio | Instancias de componente en el árbol del artículo (MDX/Next) |
| redblobgames.com (hexágonos) | `<figure id="diagram-*">` con `<svg>` en línea, hidratadas por scripts de página (`diagrams.js`, `index.js`) y Vue 2 en algunas piezas | Figuras con ID estable en el HTML del artículo |
| ncase.me (sight-and-light, ballot) | **Páginas standalone por simulación** —9 iframes en una, 14 en la otra— cada una con su canvas y script propios | `<iframe src="draftN.html">` |
| ciechanow.ski (GPS) | **62 `<canvas>` —en su mayoría WebGL—** dentro de `div.canvas_container`, hidratados por un script por artículo (`gps.js`) | Contenedores en el HTML del artículo |
| samwho.dev (load balancing) | **Custom elements `s-*`** —`s-simulation`, `s-median-latency-chart`— con configuración en **atributos** (`num-servers="1"`, `rps="1"`), registrados por un bundle JS por post (TypeScript, Bun; fuente pública) | `<s-simulation num-servers="1" …>` directo en el artículo |
| distill.pub | El formato del artículo **entero** son custom elements (`d-article`, `d-figure`, `d-cite`…); las figuras interactivas son componentes Svelte montados dentro de `d-figure` | HTML-first: «mount this component here, with these props» es lo que una pieza distill hace y markdown no lo expresa |

[3][4][5][6][7][8]

Dos familias emergen:

- **Documento standalone embebido por iframe** (ncase, los *interactive examples* de MDN [9]): máximo aislamiento —cada demo es una página con su propio ciclo de vida— a costa de chrome propio, altura fija y estilos desconectados del artículo. ncase lo elige porque sus simulaciones son aplicaciones canvas pesadas y autónomas.
- **Elemento o contenedor declarado en el fuente + hidratación por script** (samwho, ciechanow.ski, redblob, distill, Comeau): la pieza vive en el DOM del artículo, comparte su tipografía y sus tokens, y la declaración viaja con el texto.

samwho.dev es el análogo más cercano a Fronteando: sitio estático, artículos de texto, piezas como custom elements con atributos y un bundle por post —el patrón escala a producción sin React ni MDX—. distill.pub valida los custom elements como formato de artículo serio, no como parche.

### Los vehículos concretos en Astro

- **Elementos personalizados:** Astro renderiza HTML nativamente, así que un `<store-demo>` en el `.md` pasa intacto a la página —markdown deja el HTML en línea sin tocarlo—. Se registra con `customElements.define` desde un `<script>` procesado en la página (los scripts de Astro se empaquetan, admiten TypeScript y se deduplican) [10][11]. El contenido interno del elemento es la degradación sin JS *y* el texto que viaja en el `.md`: los dos consumidores comparten la misma fuente.
- **Directiva `:::` del procesador:** la infraestructura ya existe (`pause-directive` sobre satteri): una marca tipo `:::demo` podría emitir el elemento personalizado desde el fuente, dando una sintaxis más editorial que el HTML en línea.
- **MDX (`@astrojs/mdx`):** permite importar componentes dentro del artículo [12]. Exige migrar los artículos a `.mdx`, añadir la integración y —coste decisivo— el fuente con imports JSX viajaría en el `.md`, degradando la lectura para agentes.
- **Iframe a página propia:** patrón ncase/MDN —válido pero sobredimensionado para código propio con tokens compartidos—. Su variante ligera, `srcdoc` (Comeau), queda como *escape hatch* si una pieza futura necesitara un documento aislado sin crear una página aparte.

### Degradación sin JavaScript

Las referencias divergen: redblob y Comeau sirven figuras estáticas que el script anima (la pieza nace visible); samwho declara elementos vacíos que solo cobran vida con JS —sin fallback real—; ncase no ofrece alternativa al iframe. Fronteando puede superar a la referencia más cercana (samwho) usando el contenido interno del elemento como estado inicial legible —aprovechando que el elemento no-JS ya renderiza su innerHTML—.

## Conclusión

**Elementos personalizados como vehículo de la pieza**, declarados en el fuente del artículo —HTML en línea o una directiva `:::` que lo emita; la decisión fina pertenece al plan técnico, con prueba de concepto si satteri lo requiere—. Cada pieza es un artefacto propio en un directorio convencionado (`src/demos/` o similar) que la página carga solo cuando el artículo la declara. La degradación sin JS y la forma en el `.md` son el mismo contenido: el texto interno que el autor pone dentro del elemento —una descripción honesta o un estado estático— sirve a los dos consumidores. `srcdoc` queda como escape hatch documentado para aislamiento puntual.

## Limitaciones

- La inspección cubre seis referentes influyentes del género, no una muestra representativa del mercado.
- No se verificó en código que satteri propague una directiva `:::` nueva a un elemento personalizado —la infraestructura de `:::pausa` lo sugiere, pero el plan debe confirmarlo—.
- El texto que un agente extrae del markup de elemento personalizado en el `.md` merece verificación en la implementación.
- El coste de hidratación de decenas de piezas por página no se midió —las referencias llegan a 62 canvas sin problema, pero Fronteando no tiene presupuesto de performance establecido—.

## Referencias

- [1] Bret Victor — «Explorable Explanations» — https://worrydream.com/ExplorableExplanations/
- [2] explorabl.es — «ALL OF IT» (catálogo) — https://explorabl.es/all/
- [3] joshwcomeau.com — «An Interactive Guide to Flexbox» (inspección DOM) — https://www.joshwcomeau.com/css/interactive-guide-to-flexbox/
- [4] redblobgames.com — «Hexagonal Grids» (inspección DOM) — https://www.redblobgames.com/grids/hexagons/
- [5] ncase.me — «Sight & Light» y «To Build a Better Ballot» (inspección DOM) — https://ncase.me/sight-and-light/ , https://ncase.me/ballot/
- [6] ciechanow.ski — «GPS» (inspección DOM) — https://ciechanow.ski/gps/
- [7] samwho.dev — «Load Balancing» (inspección DOM) — https://samwho.dev/load-balancing/ ; fuente: https://github.com/samwho/visualisations
- [8] distill.pub — template y componentes `d-*` — https://github.com/distillpub/template , https://github.com/distillpub/post--example
- [9] MDN — «Code examples on MDN» — https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Page_structures/Code_examples
- [10] Astro Docs — «Client-Side Scripts» — https://docs.astro.build/en/guides/client-side-scripts/
- [11] navillus.dev — «How to use Web Components in Astro» — https://navillus.dev/blog/web-components-in-astro/
- [12] Astro Docs — «@astrojs/mdx» — https://docs.astro.build/en/guides/integrations-guide/mdx/
