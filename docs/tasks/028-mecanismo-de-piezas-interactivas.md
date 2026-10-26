# El mecanismo de piezas interactivas en el artículo

## Estado

[ ] Pendiente | **[~] En progreso** | [r] En revisión | [x] Completada | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

Dar al sitio la capacidad de hospedar piezas interactivas dentro de
los artículos: una forma declarada de insertar una demo donde el
texto la necesita, que la página la ejecute en su lugar con la
apariencia de la guía de estilo, y un convenio de autoría para que
cada pieza nueva sea un artefacto propio del sitio y no un apaño
insertado a mano.

## Dependencias

- Ninguna.

## Entrada

- La colección `articulos` y la página del artículo
  (`site/src/content/`, `site/src/pages/articulos/[...id].astro`).
- La infraestructura de directivas del procesador markdown
  (`satteri`, `pause-directive.ts`): las marcas `:::` ya viajan del
  fuente a la página.
- `DESIGN.md` — las piezas interactivas salen de los tokens de la
  guía.
- `EDITORIAL.md` — donde vive el convenio de autoría del blog.
- La versión en texto plano del artículo (`/articulos/<id>.md`): la
  pieza interactiva no viaja como markdown y la forma de su marca en
  esa versión es parte de esta tarea.

## Resultado esperado

- El autor puede insertar una pieza interactiva en el cuerpo de un
  artículo con una declaración en el fuente —un marcador o forma de
  marcado que el plan decide— sin tocar la página ni el procesador.
- Cada pieza es un artefacto propio del sitio: su markup, su lógica y
  su estilo viven en un lugar convencionado y reutilizable, no
  incrustados a mano en el texto del artículo.
- La pieza se ejecuta en su lugar de lectura y su superficie visible
  sale de los tokens de `DESIGN.md`.
- El comportamiento sin JavaScript está resuelto: lo que la pieza
  deja en su lugar cuando no puede ejecutarse —un texto, el marcador,
  un estado estático— es decisión de esta tarea.
- La versión `.md` del artículo trata la marca de la pieza de una
  forma decidida: el agente que la consume encuentra un texto honesto
  sobre qué hay ahí, no markup ilegible ni silencio.
- `EDITORIAL.md` documenta cómo se declara y se construye una pieza
  nueva.

## Criterios de calidad

- Insertar una pieza no exige editar la plantilla de la página: el
  punto de extensión está en el fuente del artículo.
- Una pieza de ejemplo —mínima, construida para verificar el
  mecanismo— se ejecuta en su lugar de lectura en un artículo real o
  de apoyo, con la apariencia de la guía.
- Sin JavaScript la página no se rompe ni muestra una pieza muerta
  sin explicación.
- El `.md` del artículo con la pieza sigue siendo legible y honesto
  para un agente.
- `check`, `lint`, `test`, `build` y `format:check` en verde; la
  pieza se verifica renderizada en el navegador.

## Procedimiento sugerido

1. Decidir el vehículo de la declaración en el fuente (directiva
   `:::`, HTML en línea, elemento personalizado) y dónde viven los
   artefactos de las piezas —con prueba de concepto si el plan la
   necesita—.
2. Definir el contrato entre fuente, página y artefacto de la pieza:
   cómo se declara, cómo se monta, cómo se carga su lógica.
3. Resolver el comportamiento sin JavaScript y la forma de la marca
   en el `.md`.
4. Construir una pieza mínima que ejercite el mecanismo y documentar
   el convenio en `EDITORIAL.md`.
5. Verificar renderizado y las puertas del proyecto.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
