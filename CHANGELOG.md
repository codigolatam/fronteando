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
