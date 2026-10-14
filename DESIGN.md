# Guía de estilo — Fronteando

Guía de estilo del blog: contrato verificable en dos mitades —la visual,
donde todo valor del código referencia los tokens declarados aquí, y la
de comportamiento, con las garantías de interacción que cruzan la
interfaz— y su fundamentación en los principios que arbitran las
decisiones nuevas. Es la propuesta inicial: los valores se ajustan en
diálogo con el usuario vía `documentar-guia-estilo` y todos los
componentes están pendientes de implementación.

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

Serena y textual: interfaz de publicación, no de aplicación. Denso en
contenido, ligero en chrome —el texto ocupa el primer plano y la
navegación se retira—. Consecuencia verificable: ninguna pantalla
muestra más de un elemento de acento por bloque de contenido.

## Color

Paleta de tema claro, con roles semánticos:

- `--color-background` `#ffffff` — fondo de la aplicación
- `--color-surface` `#f6f6f4` — cards, bloques de código y secciones elevadas
- `--color-text` `#1a1a18` — texto principal
- `--color-text-muted` `#6b6b66` — metadatos y texto secundario
- `--color-accent` `#2456c8` — enlaces, acciones primarias y foco
- `--color-border` `#e2e2de` — bordes de cards y separadores

Reglas de combinación: el acento solo aparece en enlaces, acciones
primarias, foco y el marcador de checkpoint —reservarlo mantiene su
señal de interactividad—; el texto en `muted` nunca es cuerpo de artículo
—el contraste de lectura larga no se degrada—.

## Tipografía

| Rol | Familia | Tamaño | Peso | Altura de línea |
|-----|---------|--------|------|-----------------|
| Título de artículo | system-ui | 32px | 700 | 1.2 |
| Encabezado de sección | system-ui | 22px | 600 | 1.3 |
| Cuerpo | system-ui | 18px | 400 | 1.65 |
| Código | ui-monospace | 15px | 400 | 1.55 |
| Metadatos | system-ui | 14px | 400 | 1.5 |

Reglas: el cuerpo nunca baja de 16px —la lectura larga es el uso
principal—; tracking negativo permitido solo en el título del artículo;
la familia monoespaciada se reserva a código y salidas técnicas.

## Espaciado y forma

- Unidad base: 8px; los espaciados son múltiplos de ella —la unidad única
  elimina los ajustes a ojo entre elementos—.
- Radios permitidos: 6px para cards, bloques de código e inputs; pill
  solo para botones de acción —la distinción separa superficie de
  control—.
- Sombras: ninguna —la superficie se distingue por color y borde; la
  elevación no aporta a leer—.
- Contenedor: ancho máximo 68ch con gutters de 24px —protege la medida
  de línea de la prosa técnica—.

## Componentes

- **Card de acompañamiento (bootstrap):** superficie `--color-surface`
  con borde `--color-border`, el protocolo de inicio listo para copiar y
  acciones para abrir la conversación en ChatGPT o Claude; se distingue
  del artículo sin competir con él —el acompañamiento no interrumpe—.
- **Bloque de checkpoint:** recuadro con marcador numerado y su prompt
  sugerido, copiable individualmente; el numerado es la referencia que el
  lector menciona a su LLM.
- **Bloque de código:** fondo `--color-surface`, familia de código, botón
  copiar visible al foco o al pasar el puntero; scroll horizontal, nunca
  ajuste de línea —la indentación es contenido—.
- **Botón primario:** pill con fondo `--color-accent` y texto blanco;
  variantes secondary (borde) y ghost (solo texto) por jerarquía de
  acción.
- **Input y formulario de newsletter:** borde `--color-border`, radio
  6px, foco con contorno `--color-accent`.
- **Navegación:** cabecera con el nombre del sitio y enlaces a secciones;
  sin menús desplegables —la arquitectura del blog es plana—.

## Estados

- **Loading:** el envío del formulario de newsletter muestra estado de
  espera en el propio botón —nada desplaza el contenido—.
- **Empty:** las listas vacías (p. ej. búsqueda sin resultados) declaran
  el vacío en una línea, sin ilustración.
- **Error:** los errores de formulario aparecen junto al campo, en
  `--color-accent` para visibilidad, con texto que indica cómo corregir.
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
robar atención a la lectura—.

## Contrato de experiencia

- **Lectura estable:** nada desplaza ni oculta el texto tras el primer
  render —sin banners tardíos ni contenido que se inserta—; se comprueba
  midiendo que no hay cambios de layout en carga.
- **Todo lo copiable, en un gesto:** cada bloque pensado para copiarse
  —bootstrap, checkpoints, código— tiene su botón copiar con
  confirmación visible; se comprueba en cada bloque.
- **Operable por teclado:** orden de tabulación sigue el orden de
  lectura y el foco siempre es visible; se comprueba recorriendo la
  página completa sin puntero.
- **Objetivos de 44px:** todo elemento interactivo tiene al menos
  44×44px de área pulsable; se comprueba en móvil.
- **Contraste suficiente:** todo texto cumple AA (≥4.5:1 sobre su
  fondo); se comprueba sobre cada par texto/fondo usado.

## Orientación para decisiones nuevas

Ante un componente o pantalla sin regla: elegir el rol semántico que le
corresponde (¿es superficie, texto, acento, borde?), declarar sus estados
obligatorios —hover, foco, deshabilitado—, aplicar los tokens del rol y
justificar la decisión con la razón en dos dimensiones —qué protege y
qué cambia para el lector—. Si la duda es estética, los principios
arbitran: lo que sostiene la lectura y no interrumpe, gana.

## Anti-patrones

Prohibido:

- Valores literales de color, tamaño o espaciado fuera de `:root`.
- Gradientes y sombras de caja.
- Fuentes web de display que cuesten tiempo de carga sin aportar a leer.
- Modales, overlays y banners que tapen el contenido.
- Animación decorativa o que dure más de 150ms.
- Iconos emoji como ilustración.
