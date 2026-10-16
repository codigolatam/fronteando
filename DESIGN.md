# Guía de estilo — Fronteando

Guía de estilo del blog: contrato verificable en dos mitades —la visual,
donde todo valor del código referencia los tokens declarados aquí, y la
de comportamiento, con las garantías de interacción que cruzan la
interfaz— y su fundamentación en los principios que arbitran las
decisiones nuevas. La identidad es propia —«terminal viva»: la interfaz
habla en monospace, la voz de la herramienta que el lector ya usa— y
todos los componentes están pendientes de implementación.

## Principios

1. **La lectura manda:** toda decisión visual se juzga por si sostiene
   leer texto técnico largo; el cuerpo tipográfico, la medida de línea y
   el contraste nunca se sacrifican por ornamento.
2. **El código es contenido:** los bloques de código reciben el mismo
   cuidado que la prosa —legibles, copiables, con resaltado sobrio—.
3. **El acompañamiento no interrumpe:** las cards y los checkpoints de
   LLM se distinguen del contenido sin competir con él —recuadros
   discretos, nunca modales ni banners—.
4. **Rápido por defecto:** la página de lectura carga sin espera; se
   vetan pesos y efectos que cuesten rendimiento sin aportar a leer.

## Atmósfera

Serena y textual, con acento de terminal: la página se compone como un
documento —titulares con peso editorial, prosa en sans— mientras el
chrome de la interfaz —metadatos, navegación, marcadores, botones— habla
en monospace, la voz de la herramienta. Denso en contenido, ligero en
chrome —el texto ocupa el primer plano y la navegación se retira—.
Consecuencia verificable: ningún bloque de contenido muestra más de un
componente destacado —card, checkpoint o acción primaria—; los enlaces
en prosa no cuentan como componente destacado.

## Color

Dos temas —claro y oscuro— con los mismos roles semánticos; el tema
activo sigue `prefers-color-scheme` salvo elección explícita del lector.

Tema claro —papel cálido, nunca blanco puro:

- `--color-background` `#faf9f7` — fondo de la aplicación
- `--color-surface` `#f1efe9` — cards, bloques de código y secciones elevadas
- `--color-text` `#1c1917` — texto principal
- `--color-text-muted` `#6b675f` — metadatos y texto secundario
- `--color-accent` `#0e7a70` — teal fósforo: enlaces, acciones primarias y foco
- `--color-danger` `#a03030` — carmesí: errores de formulario y estados destructivos
- `--color-border` `#e3e0d8` — bordes de cards y separadores

Tema oscuro —la misma terminal, de noche:

- `--color-background` `#16150f` — fondo de la aplicación
- `--color-surface` `#221f1a` — cards, bloques de código y secciones elevadas
- `--color-text` `#ede9e1` — texto principal
- `--color-text-muted` `#a69f90` — metadatos y texto secundario
- `--color-accent` `#2dd4bf` — el mismo fósforo, encendido para el fondo oscuro
- `--color-danger` `#e0655f` — el carmesí, aclarado para el fondo oscuro
- `--color-border` `#3a352a` — bordes de cards y separadores

Reglas de combinación: el acento solo aparece en enlaces, acciones
primarias, foco, el marcador de checkpoint y el cursor de la marca
—reservarlo mantiene su señal de interactividad—; los errores usan
`--color-danger`, nunca el acento —un error en color de acción se leería
como enlace y gastaría la señal—; el texto en `muted` nunca es cuerpo de
artículo —el contraste de lectura larga no se degrada—; el acento del
tema claro sobre `surface` mide ≈4.5:1 —el borde de AA—: sobre ese fondo
el acento nunca baja de tamaño ni de peso.

## Tipografía

Una sola familia con tres cortes —IBM Plex, diseñada como sistema
coordinado para contextos de ingeniería—: la Serif da voz editorial a
los titulares, la Sans lleva la prosa y la Mono es la voz de la
interfaz y del código —la familia única garantiza coherencia entre las
tres voces y tres cortes acotan el costo de carga—. Las familias se
declaran como `--font-display` (Serif), `--font-body` (Sans) y
`--font-mono` (Mono).

| Rol | Token | Familia | Peso | Altura de línea |
|-----|-------|---------|------|-----------------|
| Título de artículo | `--font-size-title` 36px | Serif | 700 | 1.2 |
| Encabezado de sección | `--font-size-section` 24px | Serif | 700 | 1.3 |
| Cuerpo | `--font-size-body` 20px | Sans | 400 | 1.65 |
| Código en bloque | `--font-size-code` 18px | Mono | 400 | 1.55 |
| Metadatos y chrome | `--font-size-meta` 15px | Mono | 400 | 1.5 |

Pesos declarados —ninguno fuera de esta lista—: Serif solo 700; Sans 400
y 600 —el 600 es el énfasis de `strong` en prosa—; Mono 400 y 500 —el
500 marca checkpoints y la marca del sitio—.

Reglas: el cuerpo nunca baja de 18px —la lectura larga es el uso
principal—; tracking negativo permitido solo en el título del artículo;
la familia monoespaciada se reserva a código, metadatos, navegación,
botones, marcadores y la marca —nunca prosa—; el código en bloque va
ligeramente por debajo del cuerpo —a igual tamaño la mono se ve mayor y
consume la medida útil de la línea de código—; el código inline va en
mono a 0.9em del cuerpo sobre chip de `--color-surface` con borde —la
pieza se distingue sin romper el ritmo de la línea—; los encabezados de
nivel 3 van en Sans 600 a `--font-size-body` —la jerarquía baja cambia
de voz, no de tamaño—; los enlaces en prosa llevan subrayado permanente
además del acento —el color solo no es señal suficiente—; las fuentes
web se cargan con `font-display: swap` y solo en los cortes declarados
—el texto nunca espera a la fuente—.

## Marca

La marca es texto, no logo: `fronteando` en IBM Plex Mono, minúsculas,
con un guion bajo final en `--color-accent` que actúa como cursor de
terminal —estático, nunca parpadea—. Es el único elemento donde el
acento aparece fuera de la interacción —la marca es la firma y su cursor
es la promesa de la terminal viva—.

## Espaciado y forma

- Unidad base `--space-unit`: 8px; los espaciados son múltiplos de ella
  (`--space-1` 8px, `--space-2` 16px, `--space-3` 24px, `--space-4` 32px,
  `--space-6` 48px) —la escala cerrada protege el ritmo vertical y le
  ahorra al lector bloques visualmente irregulares—.
- Radios permitidos: `--radius` 6px para cards, bloques de código e
  inputs; `--radius-pill` solo para botones de acción —la distinción
  separa superficie de control—.
- Sombras: ninguna —la superficie se distingue por color y borde; la
  elevación no aporta a leer—.
- Contenedor: ancho máximo `--container-max` 68ch con gutters
  `--gutter` 24px —protege la medida de línea de la prosa técnica—; en
  pantallas estrechas los gutters son `--gutter-sm` 16px.

## Componentes

- **Card de acompañamiento (bootstrap):** superficie `--color-surface`
  con borde `--color-border`, el protocolo de inicio listo para copiar y
  acciones para abrir la conversación en ChatGPT o Claude; se distingue
  del artículo sin competir con él —el acompañamiento no interrumpe—.
- **Bloque de checkpoint:** recuadro `--color-surface` encabezado por el
  marcador `> NN` en IBM Plex Mono 500 y `--color-accent`, seguido del
  texto sugerido para el acompañante, copiable individualmente —el
  numerado es la referencia que el lector menciona a su LLM y el `>` es
  el rasgo de la terminal viva—.
- **Bloque de código:** fondo `--color-surface`, IBM Plex Mono a `--font-size-code`,
  botón copiar visible al foco o al pasar el puntero; scroll horizontal,
  nunca ajuste de línea —la indentación es contenido—.
- **Botón primario:** pill con fondo `--color-accent` y texto en
  `--color-background` —legible en ambos temas—; hover aclara u oscurece
  el fondo un paso dentro del mismo acento —confirma la interacción sin
  cambiar de señal—; variantes secondary (texto `--color-text` con borde
  `--color-border`) y ghost (texto `--color-text` sin borde) por
  jerarquía de acción —el acento se reserva a la acción primaria—; el
  hover de secondary y ghost colorea el texto en `--color-accent`.
- **Input y formulario de newsletter:** borde `--color-border`, radio
  `--radius`, foco con contorno `--color-accent`.
- **Navegación:** cabecera con la marca `fronteando_` y enlaces a
  secciones en IBM Plex Mono, minúsculas; sin menús desplegables —la
  arquitectura del blog es plana—.
- **Chip de metadato:** nivel y categoría del artículo van en IBM
  Plex Mono sobre `--color-surface` con borde `--color-border` y
  radio `--radius` (la misma forma del chip de código inline); la
  fecha y los tags van en texto plano muted (lo estructural se
  distingue de lo descriptivo sin tocar el acento, reservado a lo
  interactivo).

## Estados

- **Loading:** el envío del formulario de newsletter muestra estado de
  espera en el propio botón —nada desplaza el contenido—.
- **Empty:** las listas vacías (p. ej. búsqueda sin resultados) declaran
  el vacío en una línea, sin ilustración.
- **Error:** los errores de formulario aparecen junto al campo, en
  `--color-danger`, con texto que indica cómo corregir —el error tiene
  rol propio para no confundirse con una acción—.
- **Deshabilitado:** opacidad 0.5 y sin interacción —se percibe como
  inerte sin parecer ausente—.

## Layout

Columna única centrada en la medida de lectura: cabecera, contenido del
artículo con sus bloques intercalados, pie con newsletter y enlaces. Sin
barras laterales —la atención del lector va a una sola corriente de
contenido—. En pantallas estrechas todo colapsa a la misma columna con
los gutters reducidos a 16px.

## Movimiento

Sin animación decorativa: solo transiciones de estado de ≤150ms en
hover, foco y confirmación de copiado —confirman la interacción sin
robar atención a la lectura—. El cursor de la marca es estático:
parpadear sería animación decorativa.

## Contrato de experiencia

- **Lectura estable:** ningún bloque se inserta, desplaza u oculta tras
  el primer render —sin banners tardíos ni contenido que aparece—; el
  intercambio de fuentes (`font-display: swap`) no cuenta como
  desplazamiento de bloques; se comprueba midiendo que no hay cambios de
  layout estructurales en carga.
- **Tema coherente:** todos los tokens de color cambian juntos al
  alternar el tema —no hay superficies del tema contrario ni texto
  heredado—; se comprueba alternando `prefers-color-scheme`.
- **Todo lo copiable, en un gesto:** cada bloque pensado para copiarse
  —bootstrap, checkpoints, código— tiene su botón copiar con
  confirmación visible; se comprueba en cada bloque.
- **Operable por teclado:** orden de tabulación sigue el orden de
  lectura y el foco siempre es visible; se comprueba recorriendo la
  página completa sin puntero.
- **Objetivos de 44px:** todo elemento interactivo tiene al menos
  44×44px de área pulsable; se comprueba en móvil.
- **Contraste suficiente:** todo texto cumple AA (≥4.5:1 sobre su
  fondo); se comprueba sobre cada par texto/fondo usado, en ambos temas.

## Orientación para decisiones nuevas

Ante un componente o pantalla sin regla: elegir el rol semántico que le
corresponde (¿es superficie, texto, acento, borde?), declarar sus estados
obligatorios —hover, foco, deshabilitado—, aplicar los tokens del rol,
verificar el par texto/fondo en ambos temas y justificar la decisión con
la razón en dos dimensiones —qué protege y qué cambia para el lector—. Si
la duda es estética, los principios arbitran: lo que sostiene la lectura
y no interrumpe, gana.

## Anti-patrones

Prohibido:

- Valores literales de color, tamaño o espaciado fuera de `:root`.
- Gradientes y sombras de caja.
- Fuentes web fuera de las tres familias IBM Plex, o cortes y pesos
  distintos de los declarados (Serif 700; Sans 400/600; Mono 400/500).
- Modales, overlays y banners que tapen el contenido.
- Animación decorativa o que dure más de 150ms —incluye el parpadeo del
  cursor de la marca—.
- Iconos emoji como ilustración.
