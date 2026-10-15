# Tema base y layout

## Estado

**[ ] Pendiente** | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

Materializar la identidad visual definida en `DESIGN.md` como el tema del sitio: tokens, tipografía, layout de lectura y estilos de prosa y código.

## Dependencias

- 001
- 003

## Entrada

- `DESIGN.md` actualizado con la identidad visual acordada.
- El proyecto Astro funcional y su página de prueba.
- El enfoque de `aplicar-guia-estilo` como guía de cumplimiento del contrato.

## Resultado esperado

- Tokens de diseño declarados como custom properties en `:root`, según la guía.
- Layout de página completo: cabecera con el nombre del sitio y navegación, columna de lectura, pie.
- Estilos de prosa para el contenido —títulos, párrafos, listas, enlaces— y de bloques de código con su botón copiar, según el contrato de la guía.
- La página de prueba del andamiaje muestra el tema aplicado.

## Criterios de calidad

- Todo valor visual del código referencia los tokens de la guía: sin literales fuera de `:root`.
- El layout cumple el contrato de experiencia: lectura estable, foco visible, objetivos de 44px, contraste AA.
- El resultado se verifica renderizado, con evidencia visual —no solo estática.

## Procedimiento sugerido

1. Declarar los tokens de `DESIGN.md` como custom properties.
2. Construir el layout base: cabecera, columna de lectura, pie.
3. Aplicar la escala tipográfica y los estilos de prosa y código.
4. Verificar contra la guía con evidencia renderizada.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
