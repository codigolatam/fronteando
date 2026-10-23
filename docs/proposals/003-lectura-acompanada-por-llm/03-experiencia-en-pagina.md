# Experiencia de lectura acompañada en la página del artículo

## Tipo

desarrollo

## Objetivo

Que la página del artículo presente el acompañamiento al lector —la
tarjeta con el protocolo listo para copiar, los enlaces de apertura
precargada y las marcas de pausa junto al contenido— cuando el artículo
lo declara.

## Dependencias

- Borradores 01 y 02.

## Entrada

- El material compuesto del borrador 02.
- `DESIGN.md` y la guía de estilo — la tarjeta y las marcas son piezas
  visuales nuevas.
- `docs/research/2026-10-enlaces-precargados-a-asistentes.md` —
  formatos, límites y fragilidad de los enlaces precargados.

## Resultado esperado

- Una tarjeta al inicio del artículo con el protocolo listo para copiar
  y enlaces «abrir en ChatGPT/Claude» cuando el protocolo cabe en el
  límite del proveedor; cuando no, solo copiar.
- Marcas de pausa junto al contenido, en los puntos que el artículo
  declara.
- Los artículos sin declaración no muestran nada nuevo.

## Criterios de calidad

- Todo valor visual referencia tokens declarados en `DESIGN.md`.
- Copiar el protocolo funciona con degradación declarada si no hay
  JavaScript.
- Los enlaces precargados van correctamente codificados y dentro del
  límite del proveedor; fuera de él, degradan a copiar.
- Accesible: la tarjeta no interrumpe la lectura y las marcas son
  distinguibles sin depender solo del color.
- Evidencia renderizada en ambos temas.

## Procedimiento sugerido

1. Diseñar la tarjeta y las marcas con los tokens de la guía.
2. Construir el componente e integrarlo en la página del artículo.
3. Verificar renderizado en ambos temas con un artículo declarado.

## Notas

- `aplicar-guia-estilo` gobierna la pieza visual: tokens antes que
  literales, evidencia renderizada antes de darse por conforme.
