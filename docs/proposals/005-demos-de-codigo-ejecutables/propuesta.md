# Demos de código ejecutables: ejemplos que el lector puede tocar

## Estado

[ ] Borrador | [p] Pendiente de revisión | **[a] Aprobada** | [d] Descartada

## Problema

Un blog de frontend vive de sus ejemplos de código, pero el código
impreso en la página es estático: el lector puede leerlo y copiarlo,
no verlo funcionar ni modificarlo. Los propios artículos de
Fronteando lo reconocen —«antes de mirar su forma y estructura
conviene verlo funcionar»— pero lo que ofrecen es el listado, no el
funcionamiento: para comprobar qué hace un fragmento hay que salir
del artículo, montar un entorno y probar por cuenta propia.

La fricción es suficiente para que la mayoría no lo haga, y para que
«entender de verdad» se quede a medias. Y hay algo que el código
impreso nunca podrá dar aunque el lector se anime a probar: la vista
del funcionamiento interno —el estado que cambia paso a paso, la
máquina detrás del resultado— que es donde vive la mitad de la
explicación.

## Oportunidad

Resolverlo convierte los ejemplos en piezas vivas dentro de la
lectura: el lector ve el fragmento funcionar donde el texto lo
explica, lo toca —un valor, una propiedad— y comprueba el efecto sin
abandonar la página, y las piezas pueden mostrar el funcionamiento
interno que el código impreso no puede dar. Supera a la alternativa
actual —salir del artículo a probar por cuenta propia— porque
conserva el contexto: explicación, código y comportamiento en el
mismo lugar. Y cierra el bloque de funcionalidades que redefinen el
post antes de retomar la escritura: los capítulos de MVC en pausa son
los que más necesitan demos.

## Forma de solución

Donde la explicación lo necesita, el artículo lleva una pieza
interactiva que se ejecuta en su lugar. La pieza no se limita a
correr el código del post: puede ser el ejemplo funcionando, una
versión instrumentada que muestra su funcionamiento interno paso a
paso, o una mini-demo ilustrativa que no aparece en el texto pero
hace tangible la idea —una máquina de estados, un programa mínimo que
materializa el concepto—. El lector no solo ve el resultado: ve por
dentro cómo ocurre. Las piezas existen como artefactos propios del
sitio —un mecanismo reutilizable, no un apaño insertado a mano en
cada post—. Categoría: flujo nuevo —hoy no hay camino dentro del
producto para ver el código funcionar.

## Solución

El sitio gana la capacidad de hospedar piezas interactivas dentro de
los artículos: el autor declara la pieza donde la explicación la
necesita y la página la ejecuta en su lugar, con la apariencia de la
guía de estilo. Cada pieza es un artefacto autorado del sitio —con su
propia vista y su propia lógica de presentación— que el artículo
hospeda: no un bloque de código que se autoejecuta, sino una demo
diseñada para esa explicación concreta.

Con el mecanismo disponible, las dos piezas existentes que más lo
reclaman lo adoptan: el artículo del store reactivo gana una demo que
muestra el store funcionando y su estado interno paso a paso, y el
carrito a lo bruto deja de ser un listado para ser un componente que
el lector usa donde el texto lo presenta.

## Alternativas consideradas

- Playgrounds externos embebidos (CodeSandbox, StackBlitz, CodePen):
  se descarta porque el ejemplo seguiría viviendo fuera del artículo
  —un iframe con su propia interfaz, peso y estilo—, añade una
  dependencia externa a cada pieza y no sirve para las demos
  instrumentadas o ilustrativas, que son autoría del blog y no un
  snippet de playground.
- Una página de demo separada por ejemplo: se descarta porque sigue
  siendo salir del contexto —la explicación y el comportamiento
  volverían a vivir en lugares distintos—, que es justo el problema.
- Solo bloques de código que se ejecutan en su lugar: se descarta
  como forma completa —cubre «correr el ejemplo» pero no la vista del
  funcionamiento interno ni las demos ilustrativas—; puede existir
  como caso simple dentro de la forma, no como la forma entera.

## Fuera de alcance

- Editores completos en la página —múltiples archivos, persistencia,
  compartir código del lector—: la pieza se toca en su lugar, no es
  un IDE.
- Ejecución en servidor o lenguajes de backend: las piezas corren en
  el navegador del lector.
- Sandboxing para código de terceros: las piezas las escribe el autor,
  son código propio y confiable.
- Las demos de los capítulos futuros de la serie MVC: la serie se
  retoma después, con el mecanismo ya disponible.
- La newsletter: es la idea 005.

## Investigaciones de apoyo

- Ninguna.

## Borradores

- `docs/tasks/028-mecanismo-de-piezas-interactivas.md` — el mecanismo de piezas interactivas en el artículo
- `docs/tasks/029-demo-del-store-reactivo.md` — demo viva del store reactivo (depende de 028)
- `docs/tasks/030-demo-del-carrito.md` — demo viva del carrito a lo bruto (depende de 028)

## Revisión

- Usuario: 2026-10-26 — Aprueba
