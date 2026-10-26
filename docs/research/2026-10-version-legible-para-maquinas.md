# Cómo exponen hoy los sitios la versión para humanos y la versión para agentes

> **Fecha:** 2026-10

## Propósito

Investigar cómo publican hoy los sitios su contenido en forma legible por máquinas —versiones markdown de las páginas, índices para agentes y mecanismos de descubrimiento— para alinear la forma de solución de «blog legible para máquinas» con la convención del mercado.

## Contexto

Fronteando plantea que cada artículo exista también como texto plano consumible por agentes y que el sitio se presente ante ellos. El despliegue corre sobre Cloudflare Workers, lo que hace relevantes tanto las prácticas de generación estática como las capacidades de red que el propio proveedor ofrece.

## Hallazgos

### La convención: `llms.txt`

La propuesta de Jeremy Howard (Answer.AI, septiembre 2024) define un archivo `/llms.txt` en la raíz del sitio —o en una subruta, cubriendo las páginas bajo ella— en markdown, con formato fijo [1][2]:

- Un H1 con el nombre del sitio (única sección obligatoria).
- Un blockquote con un resumen corto del proyecto.
- Secciones opcionales de texto libre (sin encabezados) con detalles.
- Secciones con encabezados H2 que listan enlaces `[nombre](url): notas`; una sección llamada `Optional` marca enlaces prescindibles.

La misma propuesta recomienda que cada página ofrezca su versión markdown en la misma URL con `.md` (`pagina.html.md` o `pagina.md`; para rutas de directorio, `index.md`), y descubrimiento mediante `rel="alternate" type="text/markdown"` y `rel="describedby"` — como elemento `<link>` en el HTML o como encabezado HTTP `Link:` —. Lighthouse ya audita `llms.txt` en su categoría de navegación agéntica, señal de que la convención está consolidándose [5].

### Las versiones markdown por página

Los sitios de documentación serios convergen en el mismo patrón:

| Sitio | URL markdown | Índice | Afordancia humana |
|---|---|---|---|
| Vercel | `url.md` + negociación `Accept` | `llms.txt` | frontmatter YAML en la respuesta (título, URL canónica) |
| Expo | `url/index.md` o `url.md` | `llms.txt` (~54 KB, todas las páginas) | menú «Copy page → Copy Markdown» |
| GitBook | `url.md` | `llms.txt` + `llms-full.txt` | automático en toda la plataforma |
| PostHog | `url.md` (sirve el MDX fuente) | `llms.txt` | «Copy page»: copiar, ver markdown, abrir en ChatGPT/Claude |
| Cloudflare docs | `url/index.md` + `Accept` header | — | botón «Page options» para copiar |

[6][7][8][9]

Detalles convergentes: la URL markdown es la misma de la página más `.md` (durable, citable, pegable en prompts); el contenido servido es el texto fuente o una conversación limpia, sin chrome de interfaz; varios incluyen preámbulo con título y URL canónica para que el agente cite el origen.

### Los dos mecanismos de entrega

- **Estático, en build time:** archivos `.md` emitidos junto al HTML (Tangly documenta el patrón para cualquier host estático; varias integraciones Astro lo implementan) [10][11][12]. Funciona sin servidor que decida.
- **Negociación de contenido en la red:** el cliente pide `Accept: text/markdown` sobre la URL normal. Cloudflare «Markdown for Agents» convierte HTML a markdown en su red, con `Vary: Accept` y un encabezado `x-markdown-tokens`; se activa desde AI Crawl Control en el dashboard [3][4]. Vercel hace lo propio y además sirve markdown cuando detecta un agente sin preferencia explícita [6]. Agentes reales (Claude Code, OpenCode) ya envían estos encabezados [4].

Los dos mecanismos coexisten: Cloudflare publica `/index.md` estáticos *y* negociación; la diferencia es que la conversión de red parte del HTML renderizado, mientras que el `.md` estático puede partir de la fuente markdown original —mayor fidelidad—.

### El corpus completo: `llms-full.txt`

Convención complementaria (Mintlify/Anthropic), no parte de la especificación: un solo archivo que concatena el markdown de todas las páginas, separadas por reglas horizontales y con su URL cerca de cada encabezado. Recomendado solo para sitios cuyo corpus cabe cómodo en un fetch; siempre generado, nunca mantenido a mano [13][14][15].

### Soporte en el ecosistema Astro

Existen integraciones listas (`astro-llms-md`, `astro-better-gen-markdown-pages`, `@puralex/astro-markdown-for-agents`) que generan `.md` por página, `llms.txt` y `llms-full.txt` a partir del HTML construido [11][12]. Para Fronteando la fuente ya es markdown en la colección de contenido, así que la vía manual también es trivial —es lo que hace PostHog al servir su MDX fuente—.

## Conclusión

La forma alineada con el mercado tiene tres piezas: **(1)** cada artículo disponible como markdown en su misma URL con `.md` (la fuente del artículo, con un preámbulo breve que identifique título y URL canónica); **(2)** un `/llms.txt` en la raíz que declare qué es Fronteando y liste los artículos con enlaces a sus versiones markdown; **(3)** descubrimiento por `rel="alternate" type="text/markdown"` en las páginas. Como cuarta pieza opcional y barata: `llms-full.txt` para un corpus de tres artículos, y la activación de Markdown for Agents en el dashboard de Cloudflare para cubrir la negociación `Accept` sin código. Para el lector humano, la afordancia dominante es un «copiar/ver markdown» junto al artículo —superficie que la nota de acompañamiento ya ocupada naturalmente extiende—.

## Limitaciones

- La convención `llms.txt` es una propuesta, no un estándar; su adopción crece pero no hay garantía de que los agentes la consulten sistemáticamente.
- Datos de consumo posteriores a esta investigación (Ahrefs, 137K dominios, mayo 2026): el 97% de los `llms.txt` publicados nunca fueron solicitados y ningún proveedor de LLM —OpenAI, Anthropic, Google— confirma consumir el archivo; los lectores más frecuentes de los que sí reciben tráfico son GPTBot y Claude-Code. La adopción de publicación es real; la de lectura por agentes, aún no demostrada.
- `llms-full.txt` no está cubierto por la especificación y tiene al menos dos grafías en uso.
- Las fuentes sobre negociación provienen de los propios proveedores (Cloudflare, Vercel); el volumen real de agentes que envían `Accept: text/markdown` no es verificable de forma independiente.
- No se midió cuántos sitios publican `llms.txt` hoy; la evidencia de adopción es anecdótica (sitios de documentación importantes) más el audit de Lighthouse.

## Referencias

- [1] llmstxt.org — «The /llms.txt file, v2» — https://llmstxt.org/
- [2] Answer.AI — «/llms.txt: a proposal» — https://www.answer.ai/posts/2024-09-03-llmstxt
- [3] Cloudflare — «Introducing Markdown for Agents» — https://blog.cloudflare.com/markdown-for-agents/
- [4] Cloudflare Developers — «Markdown for Agents» — https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/
- [5] Chrome for Developers — «llms.txt | Lighthouse» — https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt
- [6] Vercel Docs — «Markdown and Agent Discovery» — https://vercel.com/docs/agent-resources/markdown-access
- [7] Expo Docs — «Documentation for AI agents and LLMs» — https://docs.expo.dev/llms/
- [8] GitBook — «LLM-ready docs» — https://gitbook.com/docs/getting-started/llm-ready-docs
- [9] PostHog — «Markdown and llms.txt» — https://posthog.com/docs/ai-engineering/markdown-llms-txt
- [10] Tangly — «Markdown for agents» — https://docs.tangly.dev/guides/ai-agents/markdown-for-agents
- [11] npm — `astro-llms-md` — https://www.npmjs.com/package/astro-llms-md
- [12] npm — `astro-better-gen-markdown-pages` — https://www.npmjs.com/package/astro-better-gen-markdown-pages
- [13] llmtxt.info — «What is llms-full.txt?» — https://llmtxt.info/llms-full-txt/
- [14] KnownByLLM — «llms.txt vs llms-full.txt» — https://knownbyllm.com/learn/llms-txt-vs-llms-full-txt
- [15] specification.website — «/llms-full.txt» — https://specification.website/spec/agent-readiness/llms-full-txt/
