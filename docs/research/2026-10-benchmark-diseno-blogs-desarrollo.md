# Benchmark de diseño frente a blogs de desarrollo web

> **Fecha:** 2026-10

## Propósito

Comparar el diseño de Fronteando con blogs populares de desarrollo web para identificar prácticas que mejoren la lectura, y aplicar las que encajen. `DESIGN.md` queda fuera de la referencia: las observaciones vienen solo de los sitios comparados y de la revisión del sitio local en el navegador.

## Método

Las referencias se revisaron con el navegador en escritorio (1280px) y móvil (390px), y el sitio local con las mismas medidas. Las observaciones se toman de lo visible en las capturas y de medidas de posición y tamaño tomadas en el DOM.

## Sitios de referencia

Se eligieron tres sitios por temática: publican tutoriales y artículos técnicos de frontend, en inglés, con lectores que buscan explicaciones de CSS, JavaScript y diseño web.

- **web.dev (Google):** blog oficial de frontend con noticias, tutoriales y buenas prácticas. Fuente: <https://web.dev/blog/>.
- **CSS-Tricks:** referencia histórica de CSS y frontend, con artículos largos y mucho código. Fuente: <https://css-tricks.com/>.
- **Josh W. Comeau:** tutoriales interactivos de CSS, React y JavaScript. Es el más cercano a Fronteando por su tono didáctico y sus piezas interactivas. Fuente: <https://www.joshwcomeau.com/>.

## Observaciones por sitio

### web.dev

- Navegación global con el elemento activo subrayado en azul: el lector sabe dónde está.
- Cabecera con buscador visible y tipografía sans clara.
- Las tarjetas de la portada tienen imagen, título y etiquetas de tema, con una jerarquía visual clara.
- Modo claro y oscuro disponibles desde la cabecera.
- En móvil (390px), la navegación se pliega en un menú de hamburguesa y el título de la sección ocupa una sola línea.

### CSS-Tricks

- Cabecera de alto contraste con navegación en mayúsculas.
- En móvil (390px), el hero ocupa casi toda la primera pantalla y compite con un bloque publicitario bajo él.
- La portada es un bloque hero con llamada a la acción principal («Latest articles») y mucho peso visual.
- Mezcla contenido con publicidad y membresías, lo que resta foco a la lectura. No es una práctica para imitar.

### Josh W. Comeau

- La cabecera y el contenido comparten el mismo borde izquierdo: la columna de texto y la navegación se leen como una sola retícula.
- Columna lateral de contenido popular y categorías junto al listado, con las categorías como etiquetas.
- Portada con fondo oscuro y una ilustración que da identidad al sitio.
- En móvil (390px), la lista de artículos va en una sola columna con interlineado amplio y el menú se pliega en hamburguesa.
- Las medidas de lectura de sus artículos no se midieron en esta revisión; solo se observó la portada.

## Revisión del sitio local

Medido en el navegador con el tema de la página activo y tamaños de ventana de 1280px y 390px.

- **Cabecera y texto desalineados en escritorio.** Con la columna lateral de acompañamiento (desde 1240px), el contenido del artículo empieza en x=100 y la cabecera en x=256. El ancho de `.site-main` crece, pero el de la cabecera no.
- **Sin indicador de sección activa.** En la página de un artículo, «artículos» no se distingue de los demás elementos de navegación.
- **Título demasiado grande en móvil.** A 390px, el título de 36px ocupa tres líneas y desplaza el contenido útil hacia abajo.
- **Medida de lectura.** En escritorio, el texto del artículo tiene unos 64 caracteres por línea a 20px con interlineado 1.65. Está dentro del rango cómodo, así que no se cambia.
- **Sin desbordamiento horizontal** en móvil ni en escritorio.

## Prácticas

### Aplicadas

1. **Alinear cabecera y pie con el contenido cuando hay columna lateral.** Práctica observada en Josh W. Comeau: la navegación y el texto comparten el borde izquierdo. Resuelve la desalineación de la revisión local. Se aplica con una regla dentro del mismo bloque de 1240px que ya ajusta `.site-main`, sin cambiar la medida del texto (D006).
2. **Marcar la sección activa en la navegación.** Práctica observada en web.dev. Se aplica con `aria-current="page"` en el enlace «artículos», cuando la página es la portada o un artículo, y se subraya con tokens propios de la sección activa (`--nav-current-width` y `--nav-current-offset`, de 2px). Usa color de acento y subrayado, sin añadir elementos.
3. **Reducir el título de artículo en pantallas estrechas.** Práctica observada en web.dev, donde el título de la sección ocupa una sola línea en móvil. En el sitio local, el título de 36px ocupaba tres líneas en 390px. Se aplica con un token nuevo, `--font-size-title-narrow` (30px), dentro de una consulta de 640px que solo afecta a la página de artículo, para no usar un valor literal.

### Descartadas

- **Cambiar la paleta o las fuentes.** Ninguno de los sitios comparados justifica el cambio, y la identidad de Fronteando ya define los tokens actuales.
- **Añadir imágenes de cabecera o un hero en la portada.** CSS-Tricks y web.dev lo usan, pero el blog es de texto y la portada ya cumple su función de índice (CU-3 del PRD).
- **Añadir categorías o contenido popular en una columna lateral.** Josh W. Comeau lo usa, pero el sitio no tiene aún suficientes artículos para que sea útil, y la columna lateral ya está ocupada por la nota de acompañamiento.
- **Publicidad y membresías.** Resta foco a la lectura; no es una práctica a imitar.
- **Cambiar la medida de lectura.** Ya está en el rango cómodo.

## Segunda ronda: portada

Tras la primera ronda, el usuario pidió revisar la portada con un benchmark de sitios parecidos a Josh W. Comeau: explicaciones interactivas y listados de artículos técnicos.

### Sitios de referencia

- **ishadeed.com (Ahmad Shadeed):** explicaciones visuales de CSS y blog de diseño de layouts. Fuente: <https://ishadeed.com/>.
- **lea.verou.me/blog (Lea Verou):** blog técnico de CSS con artículos largos y demos. Fuente: <https://lea.verou.me/blog/>.
- **ohyescss.com:** demos de CSS que se explican jugando con ellas. Fuente: <https://ohyescss.com/>.

### Observaciones

- **ishadeed.com:** la portada abre con una frase de presentación grande en color de acento, antes de cualquier contenido.
- **lea.verou.me/blog:** cada entrada se separa con claridad y sus metadatos (fecha y tiempo de lectura) caben en una sola línea.
- **ohyescss.com:** filtros por categoría y alternancia entre cuadrícula y lista. Requiere JavaScript y una decisión de producto, así que no se aplicó.

### Portada de Josh W. Comeau (revisión de escritorio y móvil)

- Un encabezado de sección pequeño, en mayúsculas y color de acento («ARTICLES AND TUTORIALS»), introduce el listado antes de la primera entrada.
- La entrada más reciente tiene un tratamiento más amplio que las demás: título, subtítulo, extracto de varias líneas y enlace «Read more».
- Una columna lateral con categorías como etiquetas navegables («Browse by category») y contenido popular. Es la pieza que más se diferencia de Fronteando, y se descartó en la primera ronda por el número de artículos.
- La portada abre con una ilustración grande que da identidad al sitio.

### Prácticas aplicadas en la portada

1. **Presentación bajo el título.** Práctica observada en ishadeed.com. El problema del sitio: la portada abría directamente con la lista, sin decir qué es el blog. Usa la misma descripción que ya define la página, así que no duplica texto. Tamaño de sección y color de texto secundario, sin color de acento.
2. **Separadores entre entradas.** Práctica observada en lea.verou.me. El problema del sitio: las entradas se leían como un bloque continuo y no se distinguía dónde terminaba cada artículo. Un borde y más espacio superior lo resuelven.
3. **Etiqueta «último artículo».** Josh W. Comeau destaca su entrada más reciente con un tratamiento más amplio que al resto. El problema del sitio: la portada no distinguía la entrada más reciente de las demás. Aquí la práctica se aplica con una etiqueta en lugar de un tratamiento más grande, para no cambiar el peso visual de la entrada. La etiqueta usa texto secundario de mono y no es interactiva.

### Prácticas descartadas en la portada

- **Filtros por categoría y vista en cuadrícula.** Requieren JavaScript y una decisión de producto sobre las categorías. Queda como propuesta aparte.
- **Imagen o demo destacada en la portada.** Ninguna de las referencias la necesita para explicar el blog, y el sitio aún tiene pocos artículos.
- **Mover la metadata de nivel y pilar.** La lección `metadatos-clave-valor` fija su formato actual.
- **Columna lateral con categorías y contenido popular (Josh W. Comeau).** Es la práctica de Josh que más se acerca a un índice temático. Requiere una decisión de producto sobre la taxonomía, y la columna lateral de Fronteando ya está reservada para la nota de acompañamiento en 1240px (D006). Queda como propuesta aparte.
- **Encabezado de sección en mayúsculas (Josh W. Comeau).** Añadiría un encabezado por encima del listado sin resolver el problema de la entrada más reciente, que es el que se atiende con la etiqueta. Se descarta para no añadir una capa más a la portada.

### Revisión y verificación de la portada

- Escritorio (1280px) en tema oscuro: presentación, etiqueta y separadores visibles; la entrada más reciente se distingue.
- Móvil (390px) en tema claro: sin desbordamiento horizontal. La portada conserva su título de 36px; la reducción a 30px aplica solo a la página de artículo.
- Presentación en móvil: ocupa cuatro líneas a 24px. Es legible, pero ocupa mucho alto; si el usuario lo considera pesado, puede pasar a 20px.

## Verificación

- `prettier --check`, `astro check`, `eslint`, `vitest` (74 pruebas) y `astro build`: en verde tras los cambios.
- Escritorio (1280px) en tema oscuro y claro: cabecera y texto alineados en x=100; «artículos» aparece subrayado y en color de acento.
- Móvil (390px): el título de artículo mide 30px, el de la portada 36px, y no hay desbordamiento horizontal.
- Las páginas se revisaron renderizadas, sin errores visibles de layout.

## Referencias

- Sitios: web.dev (<https://web.dev/blog/>), CSS-Tricks (<https://css-tricks.com/>), Josh W. Comeau (<https://www.joshwcomeau.com/>).
- `docs/decisions/D006-columna-lateral-para-el-acompanamiento-en-pantallas-anchas.md`: la columna lateral y su medida.
- `docs/prd/001-sitio-base-del-blog.md`: casos de uso CU-2, CU-3 y CU-4.
