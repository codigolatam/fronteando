# Changelog

Todos los cambios notables de este proyecto se documentan en este archivo.

El formato sigue [Keep a Changelog](https://keepachangelog.com/en/2.0.0/)
y el proyecto se adhiere a [Versionado Semántico](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- El blog existe como sitio desplegado: cada merge a la rama principal lo compila y publica automáticamente en Cloudflare Workers (docs/epics/001-sitio-base-del-blog.md).
- El sitio sirve con la identidad visual «terminal viva»: tokens de `DESIGN.md` aplicados, temas claro y oscuro conmutables, tipografía IBM Plex y bloques de código copiables.
- Cada rama genera una URL de preview en `workers.dev` al construirse, para revisar los cambios renderizados antes de fusionar.
- El blog tiene contenido: colección de artículos en Markdown con frontmatter validado —un incumplimiento rompe el build y los borradores no se publican—, página de lectura por artículo en `/articulos/<slug>` con metadatos visibles y código resaltado con la paleta del tema. El primer artículo, la presentación del proyecto, queda publicado.
- La portada presenta el blog y lista los artículos publicados por fecha con un previo de su contenido —marcador `<!--more-->` o primer párrafo—; cada página lleva metadatos Open Graph y canonical; el sitio gana página 404 propia, `sitemap.xml` y `robots.txt` generados en cada build.
- El blog se puede seguir: feed RSS en `/rss.xml` generado en cada build con los artículos publicados —título, fecha, resumen, enlace y categorías—, descubrible desde el `<link rel="alternate">` del head y el enlace `rss` del pie.
- Cada artículo genera en build su tarjeta de compartir —PNG de 1200×630 con la identidad del sitio, el título y la fecha— que se sirve como `og:image` y `twitter:image` con URL absoluta, así los enlaces compartidos en redes y apps de mensajería muestran una vista previa propia.
- Cada artículo declara su pilar de conocimiento (`categoria`) y su grado (`nivel`, opcional): el frontmatter los exige contra un enum de pilares ortogonales, y la página del artículo y las tarjetas de portada los muestran en una línea `clave: valor` bajo la fecha.
- El blog publica su primer artículo técnico: «Un store reactivo en vanilla JS», que construye paso a paso la primitiva de reactividad de los frameworks —signal, efectos con auto-registro de dependencias y una store con Proxy— con código ejecutable y sus límites honestos.
- Los artículos técnicos se pueden leer acompañados de un asistente: cada pieza que lo declara muestra al inicio una nota para copiar el protocolo —o abrirlo precargado en ChatGPT o Claude— y pausas marcadas en el texto donde contrastar la comprensión (docs/epics/002-lectura-acompanada-por-llm.md).
- Cada artículo existe también como documento de texto plano en su propia dirección `/articulos/<slug>.md` —la fuente markdown con un preámbulo de título y URL canónica, pausas en su posición y sin el material de acompañamiento—, descubrible desde los metadatos de la página con `rel="alternate"`, enlazada para el lector en la línea de metadatos del artículo y señalada por el protocolo de lectura acompañada, de modo que llevarla a un asistente o consumirla con un agente deja de ser recomponer la página a mano (docs/epics/003-blog-legible-para-maquinas.md).
- Los artículos pueden llevar piezas interactivas con la directiva `:::demo`, enmarcadas en el color de acento como la región interactiva de la página: cada una se carga solo en la página que la declara, reserva su altura desde el primer render y conserva un fallback legible sin JavaScript y en el `.md` (docs/epics/004-demos-de-codigo-ejecutables.md). La primera la estrena el artículo del store reactivo: una demo que ejecuta el programa del texto con el código a la vista, la línea en curso marcada, el estado interno (`efectoActivo`, suscriptores por propiedad) y una traza de cada paso —también reproducible paso a paso—, donde se ve que subir `nivel` no reejecuta el saludo y cambiar `nombre` sí. La segunda la usa el carrito a lo bruto: el propio componente enredado del listado, funcionando donde el texto lo presenta —y en su segunda instancia, con la edición de cantidad, el lector comprueba tocando que el botón «Quitar» muere tras el `innerHTML`, justo como advierte el artículo.
