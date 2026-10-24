# D006: Columna lateral para el acompañamiento en pantallas anchas

## Estado

Aceptada

## Contexto

La nota de lectura acompañada es una pieza de uso puntual: se copia el
protocolo al inicio y no forma parte del texto. En la columna única
interrumpe el arranque de la lectura y desaparece al hacer scroll, así
que copiar desde una pausa tardía obliga a volver arriba. Las pausas, en
cambio, marcan posiciones del texto y deben seguir en el flujo. La guía
de estilo reserva la columna única para la lectura.

## Decisión

Usamos una columna lateral de `--rail-width` (280px) para la nota de
lectura acompañada. Aparece solo en artículos con acompañamiento
declarado y desde 1240px. La nota es pegajosa y está siempre abierta en
esa columna; el texto conserva su medida de `--container-max`. Por debajo
de 1240px, la nota vuelve a la columna única como línea plegada, y las
pausas no cambian de posición.

## Justificación

Consideramos cuatro alternativas:

- **Nota plegada en la columna única:** interrumpe el arranque y se
  pierde al hacer scroll. Se conserva por debajo de 1240px.
- **Nota abierta bajo la metadata:** empuja el inicio del texto unos
  360px (altura abierta de la nota menos la línea plegada).
- **Columna lateral en anchos intermedios (601–1239px):** obliga a
  estrechar el texto por debajo de su medida de lectura.
- **Caja en la columna lateral:** pesa más que el texto que acompaña. Con
  espina gris la nota casi desaparecía en ambos temas; con espina de
  acento, la función queda visible sin competir.

La columna lateral es la única alternativa que mantiene la función a la
vista sin tocar el texto. Tiene dos costos. La regla de columna única
deja de ser absoluta, y la excepción queda acotada a la UI de
acompañamiento. Además, la nota se apoya en las filas del grid: si es más
alta que el artículo, empuja el texto hacia abajo (170px medidos en un
artículo corto). Quitar esa dependencia evita el desplazamiento, pero la
nota cae sobre el pie en el mismo caso. Ninguna de las dos variantes
cumple la condición de estabilidad en todos los casos, así que la
decisión se acepta con esta limitación documentada.

## Referencias

- `docs/tasks/024-experiencia-en-pagina.md`: tarea que introduce la nota
  y la columna.
- `DESIGN.md`, sección «Layout»: excepción a la columna única.
