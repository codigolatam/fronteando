# Colección de artículos y página de artículo

## Estado

**[ ] Pendiente** | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

Dar al blog su contenido: la colección de artículos en Markdown con esquema validado y la página que los presenta para leer.

## Dependencias

- 004

## Entrada

- El tema y el layout implementados.
- El modelo de contenido del brief: el artículo como unidad, escrito en Markdown en el repositorio.
- Un primer artículo real de muestra —la presentación del blog—, escrito con el usuario o redactado para su revisión.

## Resultado esperado

- Colección de contenido de artículos con esquema validado: título, fecha, resumen, etiquetas y estado de borrador o publicado.
- Página de artículo que renderiza el Markdown sobre el tema: prosa legible, código resaltado, metadatos visibles.
- URL por artículo y orden por fecha.
- Un primer artículo publicado que demuestra el pipeline completo, de Markdown a página.

## Criterios de calidad

- El build falla ante un frontmatter que incumpla el esquema: la validación es real.
- La página de artículo cumple la guía de estilo en prosa y código.
- Los borradores no se publican.

## Procedimiento sugerido

1. Declarar la colección con su esquema.
2. Crear la ruta y la plantilla de artículo.
3. Escribir o incorporar el primer artículo.
4. Verificar build, esquema y render.

## Notas

- El esquema no incluye todavía los campos del acompañamiento —checkpoints y contexto—: es la idea `lectura-acompanada-por-llm`, que los declarará sobre esta colección.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
