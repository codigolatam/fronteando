# Revisar el diseño del sitio con benchmark frente a blogs de desarrollo web

## Estado

**[ ] Pendiente** | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

Mejorar el diseño visual y de lectura del sitio comparándolo con blogs populares de desarrollo web. La tarea busca sitios comparables por temática, los revisa en un navegador real, describe las mejores prácticas que muestran y aplica las que encajen con el sitio.

## Dependencias

Ninguna

## Entrada

- El sitio en `site/` y su estado actual de diseño, revisado en un navegador.
- Navegador para abrir y revisar los sitios de referencia.
- Selección de blogs de desarrollo web populares y comparables por temática (documentación técnica, artículos largos, código de ejemplo).
- Excluido de esta referencia: `DESIGN.md`. No se toma como fuente de decisiones de diseño en esta tarea.

## Resultado esperado

- Un documento de investigación en `docs/research/` con los sitios de referencia elegidos, por qué son comparables, las observaciones de cada uno y la lista de mejores prácticas descritas.
- Cambios de diseño aplicados sobre el sitio (CSS, HTML o componentes en `site/`) que implementan las prácticas seleccionadas.
- Registro en esta tarea de qué prácticas se aplicaron y cuáles se descartaron, con su razón.

## Criterios de calidad

- Hay al menos tres sitios de referencia, cada uno abierto con Firefox y revisado en vista de escritorio y móvil.
- Cada práctica descrita indica el sitio o sitios donde se observó y el problema del sitio actual que resuelve.
- Los cambios aplicados no alteran el contenido de los artículos ni el comportamiento de las demos interactivas.
- El build del sitio y las pruebas existentes pasan tras los cambios.
- Las páginas principales (portada, índice de artículos y página de artículo) se revisan renderizadas tras los cambios, sin errores visibles de layout en escritorio ni en móvil.
- Ningún cambio se justifica por `DESIGN.md`.

## Procedimiento sugerido

1. Seleccionar al menos tres blogs de desarrollo web populares y comparables, y anotar por qué lo son.
2. Abrir cada sitio con el navegador, revisar su portada, un artículo y su navegación en escritorio y móvil, y capturar observaciones.
3. Abrir el sitio local y revisar las mismas vistas con los mismos criterios.
4. Describir las mejores prácticas observadas y priorizarlas según el impacto en la lectura.
5. Aplicar las prácticas priorizadas sobre el sitio y verificar el resultado renderizado.
6. Registrar en esta tarea las prácticas aplicadas y las descartadas.

## Notas

- Tarea general de diseño, sin hito propio.
- `DESIGN.md` queda fuera de la referencia de esta tarea. Si algún cambio aplicado contradice ese documento, no se modifica en esta tarea; se anota aquí para decidir después.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
