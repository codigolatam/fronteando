# Sintaxis de declaración de piezas interactivas en el fuente markdown

> **Fecha:** 2026-10

## Propósito

Decidir con qué sintaxis el autor declara una pieza interactiva en el fuente `.md` del artículo —HTML en línea del elemento o directiva de contenedor `:::`— para que el plan de la tarea 028 fije la convención de autoría con evidencia, no por preferencia.

## Contexto

Las investigaciones anteriores fijaron el vehículo (custom elements [R0]) y su mecánica (shadow DOM, atributos, contenido interno como fallback [R1][R2]). Resta la superficie de autoría: cómo se escribe la declaración en el `.md`. Fronteando ya opera una directiva `:::pausa` sobre satteri —un `MdastPluginDefinition` con `containerDirective`, `hName`/`hProperties` y `ctx.prependChild`—, así que ambas vías están disponibles sin dependencias nuevas.

## Hallazgos

### Las sintaxis del ecosistema markdown

Los sistemas que declaran piezas dentro de texto convergen en un marcador de línea con nombre, parámetros y cuerpo:

| Ecosistema | Sintaxis de pieza | Cuerpo |
|---|---|---|
| Hugo | `{{< nombre param="v" >}}` | sin cuerpo o con `{{< >}}…{{< />}}` |
| remark/directivas genéricas | `:::nombre[etiqueta]{attrs}` … `:::` | **markdown pleno** |
| Docusaurus | `:::note` admonitions + MDX `<Comp/>` | markdown pleno |
| MkDocs Material | `!!! note "título"` | markdown indentado |
| GitHub/Obsidian | `> [!NOTE]` | markdown en blockquote |
| MDX | `<Componente prop={x}>` | JSX |

[1][2][3][4]

La propuesta de «generic directives» [1] es la más cercana a nuestro pipeline: `:::` contenedor con nombre, etiqueta opcional `[…]` y atributos `{clave="valor"}`, hijos parseados como markdown —exactamente lo que `:::pausa` ya usa vía satteri—.

### La diferencia decisiva: el markdown dentro

La spec de CommonMark lo fija sin ambigüedad: dentro de un bloque HTML de tipo 7 —cualquier etiqueta desconocida como `<fronteando-demo>`— el contenido **no se interpreta como markdown**; el ejemplo canónico `<Warning>*bar*</Warning>` renderiza `*bar*` literal [5].

Consecuencia directa para Fronteando:

- **HTML en línea** (`<fronteando-demo …>`): el contenido interno —el fallback que sirve al lector sin JS y al agente del `.md`— tendría que escribirse en HTML crudo: `<p>…<code>…</code></p>` a mano. El fallback, que es la parte editorial más delicada (R2), pierde la sintaxis del blog.
- **Directiva `:::`**: los hijos del contenedor son nodos markdown normales —el autor escribe el fallback en markdown pleno (énfasis, código, enlaces) y el pipeline lo convierte. Y el atributo delimita la pieza: `:::demo{nombre="store-reactivo"}`.

### Qué llega a cada consumidor

- **En el HTML**: la directiva emite el elemento (`hName: "fronteando-demo"`) con sus atributos (`hProperties`) y el fallback ya renderizado a HTML como hijos —la vía `:::pausa` demuestra que satteri lo hace con `ctx.setProperty(node, "data", {hName, hProperties})`— [6].
- **En el `.md`**: el agente ve la directiva literal —`:::demo{nombre="store-reactivo"}` seguido del texto del fallback en markdown—. Es más legible que markup HTML: la directiva es texto compacto y el contenido, markdown sin etiquetas. Un nombre de directiva autodescriptivo (`demo`) más un atributo con la pieza (`nombre="store-reactivo"`) le dice al agente qué hay en ese punto [R2].
- **Sin JS**: el elemento emitido renderiza sus hijos —el fallback— hasta que el script lo mejora (R1).

### Costes de cada vía

- HTML en línea: cero trabajo nuevo —funciona hoy— pero degrada la autoría del fallback y el `.md` queda con markup `<fronteando-…>` que el agente debe interpretar.
- Directiva: un `MdastPluginDefinition` más (mismo patrón que `:::pausa`, ~30 líneas), atributos limitados a `clave="valor"` —la configuración compleja queda en el artefacto de la pieza, no en la marca—.

## Conclusión

**Directiva de contenedor `:::demo{nombre="…"}`** como sintaxis de declaración: el cuerpo es el fallback en markdown pleno y los atributos nombran la pieza y su configuración simple. El plugin mdast emite el custom element con el fallback renderizado como hijos. El HTML en línea queda como vía disponible —satteri lo pasa intacto— para casos que la directiva no cubra, pero el convenio documentado es la directiva, coherentemente con `:::pausa`. La decisión fina de nombres (`:::demo` vs otros) y la forma exacta de los atributos se fija en el plan técnico, verificada con el PoC que emita el elemento.

## Limitaciones

- La comparación asume que satteri respeta la propuesta de directivas genéricas al parsear —su plugin de `:::pausa` lo evidencia, pero atributos `{k="v"}` concretos deben verificarse en el PoC—.
- No se midió legibilidad del `.md` por agentes reales —la evaluación es por el criterio de `texto-para-agentes`, no empírica—.
- Las alternativas de otros ecosistemas (shortcodes, admonitions) son contexto, no candidatas: requieren otro pipeline.

## Referencias

- [1] CommonMark forum — «Generic directives/plugins syntax» (propuesta base de remark-directive) — https://talk.commonmark.org/t/generic-directives-plugins-syntax/444
- [2] remarkjs — `remark-directive` (`:name`, `::name`, `:::name{attrs}`) — https://github.com/remarkjs/remark-directive
- [3] Hugo Docs — «Shortcodes» — https://gohugo.io/content-management/shortcodes/
- [4] Docusaurus — «Admonitions» (`:::note`) — https://docusaurus.io/docs/markdown-features/admonitions ; MkDocs — «Admonitions» (`!!!`) — https://squidfunk.github.io/mkdocs-material/reference/admonitions/
- [5] CommonMark Spec 0.31.2 — «HTML blocks» (tipo 7: cualquier tag name; contenido no interpretado) — https://spec.commonmark.org/0.31.2/#html-blocks
- [6] `site/src/utils/pause-directive.ts` — plugin `containerDirective` con `hName`/`hProperties` en producción
- [R0] `docs/research/2026-10-vehiculos-para-piezas-interactivas.md`
- [R1] `docs/research/2026-10-mecanica-de-elementos-personalizados.md`
- [R2] `docs/research/2026-10-degradacion-y-representacion-de-piezas.md`
