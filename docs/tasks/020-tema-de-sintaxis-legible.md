# Mejorar el tema de sintaxis del código

## Estado

[ ] Pendiente | **[~] En progreso** | [r] En revisión | [x] Completada | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

Mejorar el resaltado de sintaxis de los bloques de código para que distinga los elementos léxicos —palabras clave, cadenas, funciones, comentarios, números— en ambos temas del sitio: hoy el código es difícil de leer porque el resaltado no enfatiza las diferencias.

## Dependencias

- Ninguna

## Entrada

- `site/astro.config.mjs` — `shikiConfig` con `theme: "css-variables"`: los colores léxicos salen de variables CSS, no de un tema empaquetado.
- `site/src/styles/global.css` — donde viven las variables del tema y donde deben declararse los colores del resaltado por tema claro y oscuro.
- `DESIGN.md` — la paleta y los tokens del sitio; el resaltado debe salir de ella, no de colores ajenos.
- El skill `aplicar-guia-estilo` — valida que todo valor visual proviene de tokens y exige evidencia renderizada.
- `site/src/content/articulos/carrito-a-lo-bruto.md` — el post con más bloques de código, banco de pruebas natural.

## Resultado esperado

- Variables de resaltado definidas por elemento léxico para los temas claro y oscuro, derivadas de la paleta del sitio.
- Evidencia renderizada: un bloque de código variado legible y distinguido en ambos temas.

## Criterios de calidad

- Los elementos léxicos principales —keyword, string, function, comment, number, punctuation— son distinguibles entre sí y del texto plano.
- Contraste suficiente (objetivo AA) sobre el fondo del bloque de código en ambos temas.
- Todo color referencia los tokens de `DESIGN.md`; ningún literal fuera de la paleta sin justificar.
- `check`, `lint`, `format:check` y `build` en verde; evidencia renderizada adjunta al PR.

## Procedimiento sugerido

1. Inspeccionar el resaltado actual renderizado (dev server en background) e identificar qué variables `--astro-code-*` faltan o repiten color.
2. Definir la asignación de variables por elemento léxico desde los tokens de `DESIGN.md`, para ambos temas.
3. Verificar con `aplicar-guia-estilo` —estática y renderizada— sobre el capítulo 1 y ajustar.
4. Publicar por el ciclo general.

## Notas

- El tema `css-variables` de Shiki emite clases `--astro-code-token-*`; sin variables declaradas el navegador hereda el color del texto — por eso hoy no hay énfasis.
- Si la paleta de `DESIGN.md` no cubre los roles léxicos, extenderla documentando la decisión antes de asignar literales.

## Contexto

- `Decisiones:` `DESIGN.md` es el contrato verificable — toda decisión visual referencia sus tokens.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
