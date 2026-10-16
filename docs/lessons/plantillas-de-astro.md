# Plantillas de Astro

## Lecciones

- **Forzar con `{" "}` todo espacio entre texto y etiqueta que cruce un salto de línea en una plantilla `.astro`.** Por qué: el compilador de Astro trata la plantilla con semántica JSX y elimina el whitespace con saltos de línea adyacente a etiquetas, en vez de colapsarlo a un espacio como haría HTML —`algo de\n<strong>` compila a `algo de<strong>`—; la misma trampa puede quedar disimulada por el padding de un elemento inline, así que al escribir prosa con markup en `.astro` conviene revisar todos los bordes texto-etiqueta, no solo el que se nota.
  Disparadores: .astro, páginas Astro, contenido con markup inline, strong, code, enlace, espacio que falta, whitespace, JSX
  Origen: 20261016T094353
