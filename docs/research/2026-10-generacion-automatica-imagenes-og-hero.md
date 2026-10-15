# Generación automática de imágenes OG y hero en un sitio estático

> **Fecha:** 2026-10

## Propósito

Investigar cómo se generan automáticamente las imágenes de cabecera (hero) y de compartir (Open Graph) de un artículo a partir de una plantilla de fondo y su título, en el contexto de un blog estático construido con Astro.

## Contexto

El sitio del blog se construirá como sitio estático sin servidor: toda imagen debe existir como archivo real en el directorio de salida al terminar el build —no hay runtime donde generarla bajo demanda [1][2]. La imagen generada tiene dos consumidores: el hero visual del artículo y la etiqueta `og:image` que leen los scrapers al compartir el enlace.

## Análisis

### 1. Satori + rasterizador en build time

Un árbol de elementos estilo React se renderiza a SVG con Satori (biblioteca de Vercel) y el SVG se rasteriza a PNG con sharp o `@resvg/resvg-js` [1][3][4]. En Astro la integración canónica es un endpoint dinámico —p. ej. `src/pages/og/[...slug].png.ts`— con `getStaticPaths`, que emite un archivo PNG por artículo durante el build [2][5][6]; la alternativa es una integración propia con el hook `astro:build:done` o un script post-build [3][7].

**Ventajas:**
- Encaja con el modelo estático: PNG real por artículo, sin runtime ni llamadas de red en build [1][5].
- La plantilla es un componente —fondo, título, marca— que se diseña con flexbox; el mismo componente sirve a OG y al hero [1][3].
- Todo el sistema cabe en un endpoint o una integración; no requiere mantenedor propio [5].

**Desventajas:**
- Satori solo admite un subconjunto de CSS: flexbox, sin `grid` ni algunos shorthands; conviene diseñar la plantilla en su playground [1][3][7].
- Las fuentes deben empaquetarse en el repositorio para que la salida sea idéntica en cualquier host de build [5].
- Las dependencias nativas (`resvg-js`, sharp) complican su uso dentro de rutas API empaquetadas por Vite; en hooks o endpoints de build funcionan sin problema [7].

### 2. Captura de pantalla con navegador headless

Se diseña la imagen como una página HTML real y se fotografía con Puppeteer o Playwright durante el build [3][8].

**Ventajas:**
- Fidelidad total de CSS: la imagen se diseña en el mismo medio que el sitio [3][8].

**Desventajas:**
- Arrastra una dependencia pesada de Chromium, con problemas conocidos en sistemas de CI [3].
- Es más complejo de mantener que el resto de opciones [3].

### 3. Composición directa con sharp

Una imagen de fondo más una capa de texto en SVG compuestas con sharp, sin pasar por un componente [9].

**Ventajas:**
- Una sola dependencia de procesado; control directo sobre el bitmap de fondo [9].

**Desventajas:**
- Maquetar texto en SVG a mano —saltos de línea, espaciado— es laborioso frente a la plantilla flexbox de Satori; cuanto más evolucione la plantilla, más cuesta (inferencia del agente a partir de las APIs de ambas herramientas).

### 4. Servicio externo o generación en runtime

APIs de generación (Cloudinary, html2img u otros SaaS) o funciones edge tipo `@vercel/og` que producen la imagen bajo demanda [1][6].

**Ventajas:**
- Cero coste en el build y cero código propio de renderizado [6].

**Desventajas:**
- Introduce una dependencia externa o un runtime que el modelo de infraestructura mínima del blog no quiere [1][5][7].
- En un sitio puramente estático sigue haciendo falta escribir los PNG en disco durante el build si se quiere evitar el runtime [6].

## Evaluación comparativa

### Adecuación al modelo «estático, sin servidor»

- **Satori + rasterizador:** alta. Todo ocurre en build; salen PNG a `dist/` [1][2].
- **Navegador headless:** media. Funciona en build, pero con una dependencia pesada [3].
- **Sharp sola:** alta. Misma mecánica de build, menos ergonomía de plantilla [9].
- **Servicio externo:** baja. Añade runtime o dependencia de red [6].

### Ergonomía de la plantilla

- **Satori:** alta. Componente con flexbox y playground oficial para iterarla [1][3].
- **Navegador headless:** alta. HTML/CSS completo [8].
- **Sharp sola:** baja. Texto en SVG manual [9].
- **Servicio externo:** media. Plantillas del proveedor, fuera del repo [6].

### Reproducibilidad del build

- **Satori / sharp:** alta, con fuentes empaquetadas en el repo [5].
- **Navegador headless:** media; depende del Chromium del host [3].
- **Servicio externo:** baja; el resultado depende del servicio y de la red [6].

## Recomendación

**Satori + `@resvg/resvg-js` en un endpoint dinámico de Astro con `getStaticPaths`.**

Es el patrón dominante para este caso de uso en Astro: la plantilla de fondo y título es un componente, cada artículo emite su PNG en build y el mismo archivo sirve al hero y a `og:image` [1][2][5]. El navegador headless se descarta por su peso y fragilidad en CI; el servicio externo, por la dependencia que el modelo estático evita; sharp sola queda como plan B si la plantilla resulta demasiado simple para justificar Satori. Como alternativa emergente existe Takumi, un renderizador en Rust con bindings nativos que dibuja la tarjeta directamente a PNG sin navegador [10]; no lo recomiendo de entrada por su menor recorrido, pero es un sustituto directo si Satori da problemas.

Detalles de la forma:

- Tamaño canónico OG: 1200×630 px [1][3].
- `og:image` exige URL absoluta: el sitio debe conocer su URL pública en configuración [10].
- Fuentes empaquetadas en el repositorio para salida idéntica en cualquier host [5].
- Los metadatos del artículo (título, resumen) son la entrada de la plantilla; generar la imagen desde los mismos campos evita que tarjeta y página diverjan [10].

## Limitaciones

- Las fuentes son guías prácticas de blogs técnicos y documentación de los proyectos citados, no benchmarks comparativos: el coste real en tiempo de build por artículo no está medido.
- El soporte exacto de propiedades CSS en Satori y en Takumi cambia entre versiones; la plantilla debe validarse en su versión concreta.
- La opción «sharp sola» se evaluó por las capacidades de la API, no sobre una implementación de referencia.

## Referencias

- [1] Arne Bahlo, «Static OG (Open Graph) Images in Astro» — https://arne.me/blog/static-og-images-in-astro
- [2] html2img, «Astro OG Images at Build Time (Plus Hugo and Eleventy)» — https://html2img.com/articles/dynamic-og-images-in-astro-hugo-and-eleventy/
- [3] Sid, «Build-time, dynamic OpenGraph images with Astro & Satori» — https://dietcode.io/p/astro-og/
- [4] JoZapf, «nextjs-static-og-generator» — https://github.com/JoZapf/nextjs-static-og-generator
- [5] DacForge, «Per-page OG images on an Astro site, without the SaaS» — https://dev.to/dacforge/per-page-og-images-on-an-astro-site-without-the-saas-54ak
- [6] Mahad Kalam, «How to generate OpenGraph images with Astro and Satori» — https://skyfall.dev/posts/astro-og-with-satori/
- [7] Arnab, «Build-time OG images in Astro» — https://blog.arnabxd.me/build-time-og-images-in-astro
- [8] Florian/phiilu, «Generate Open Graph images for your static Next.js site» — https://phiilu.com/generate-open-graph-images-for-your-static-next-js-site
- [9] sharp, documentación de composición de imágenes — https://sharp.pixelplumbing.com/api-composite
- [10] SVOCS Docs, «OG Images» — https://svocs.dev/docs/og-images
