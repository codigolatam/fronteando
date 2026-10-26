# Adaptar el corpus publicado a la lectura acompañada

## Estado

[ ] Pendiente | [~] En progreso | **[r] En revisión** | [x] Completada | [!] Bloqueada

## Tipo

mantenimiento

## Objetivo

Declarar el acompañamiento en los artículos técnicos publicados para
que el blog presente la funcionalidad donde aporta, y dejar
explícitamente fuera —con el opt-out— las piezas que no se benefician
del agente, sin alterar el contenido editorial más allá de las marcas
de pausa.

## Dependencias

- 024 — la adaptación se verifica sobre la experiencia ya
  renderizada.

## Entrada

- La convención de declaración del borrador 01 y la experiencia en
  página del borrador 03.
- `site/src/content/articulos/` — `hola-fronteando`,
  `un-store-reactivo-en-vanilla-js` y `carrito-a-lo-bruto`.

## Resultado esperado

- `un-store-reactivo-en-vanilla-js` y `carrito-a-lo-bruto` llevan su
  declaración —contexto y pausas— y muestran la tarjeta y las marcas.
- `hola-fronteando` lleva el opt-out explícito: ni tarjeta ni marcas, y
  la exclusión queda declarada como decisión editorial.

## Criterios de calidad

- Las pausas caen en puntos pedagógicos reales —donde verificar la
  comprensión aporta, no donde quepan—.
- «Hola, Fronteando» no muestra tarjeta ni marcas: su exclusión queda
  declarada con el opt-out, no por ausencia.
- El contenido editorial no cambia salvo las marcas de pausa y los
  metadatos de declaración.
- `check`, `lint` y `build` en verde.

## Procedimiento sugerido

1. Por artículo técnico: decidir el contexto —nivel del lector,
   prerequisitos— y las pausas con qué se verifica en cada una.
2. Declarar el opt-out en «Hola, Fronteando».
3. Verificar el render de cada artículo: tarjeta y marcas donde hay
   acompañamiento, nada donde hay opt-out.

## Notas

- «Hola, Fronteando» queda fuera de la adaptación por decisión
  editorial: recibe el opt-out explícito, no pausas — la pieza `meta`
  presenta el proyecto y no se beneficia de la lectura acompañada.

## Revisión

- Subagente: 2026-10-25 — Aprueba
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
