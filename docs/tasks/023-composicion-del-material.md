# Componer el material de acompañamiento por artículo

## Estado

[ ] Pendiente | **[~] En progreso** | [r] En revisión | [x] Completada | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

Que el sitio produzca, para cada artículo con declaración, el texto
completo del protocolo —las instrucciones comunes más el contexto y las
pausas propias— como una pieza única reutilizable por cualquier
superficie.

## Dependencias

- 22.

## Entrada

- El esquema de declaración y el protocolo común del borrador 01.
- La salida es texto plano portable: la misma pieza alimenta la página
  del artículo y, después, las salidas legibles por máquinas de la idea 003.

## Resultado esperado

- Una composición en build que, dado un artículo, devuelve el protocolo
  completo en texto plano; sin declaración, no produce nada.
- La pieza resultante es consumible por la página del artículo y
  exportable para la línea 003.

## Criterios de calidad

- El protocolo compuesto incluye lo común, el contexto y las pausas en
  orden de lectura.
- Un artículo sin declaración no produce material — el opt-in se
  preserva.
- Un solo punto de composición: la página y las futuras salidas toman el
  mismo resultado.

## Procedimiento sugerido

1. Implementar la composición: común más declaración produce el texto
   del protocolo.
2. Probarla contra un artículo con declaración de muestra y otro sin
   ella.

## Notas

- La salida es texto plano; su presentación —tarjeta, `.md`— es
  responsabilidad de cada superficie.
- La ficha del artículo lleva su URL absoluta (site + ruta del artículo): es como el agente sabe de qué texto se habla, y puede leerlo si tiene acceso. Decisión surgida en la revisión de la 022.

## Contexto

- **Archivos similares:**
  - `site/src/data/protocolo-acompanamiento.md` — el protocolo común (entrada de la composición): texto crudo importable con `?raw`; su cierre es agnóstico —«si después de estas reglas viene la URL del artículo o más información sobre él, úsala»—, así que el bloque anexado no tiene formato prescrito y puede ser `clave: valor` plano.
  - `site/src/content.config.ts` — la declaración `agente`: `false` | `{ tema, prerequisitos }` estricto, opcional; `nivel` top-level aporta el nivel del lector.
  - `site/src/utils/excerpt.ts` — hermano directo: utilidad pura que opera sobre `body` crudo con regex (`<!--more-->`) y despoja markup a texto plano; el mismo patrón sirve para extraer los bloques `:::pausa` en orden y aplanar su indicación.
  - `site/src/utils/format.ts` — el patrón de las utils: funciones puras exportadas, sin estado.
  - `site/src/pages/index.astro` — accede a `articulo.body` con guard `?? ""`: el cuerpo crudo está disponible en las entradas pero puede ser indefinido.
  - `site/src/pages/rss.xml.ts` — la URL absoluta del sitio se obtiene del contexto; en módulos de utilidad el equivalente es `import.meta.env.SITE` (del `site` de `astro.config.mjs`: `https://www.fronteando.dev`).
- **Patrones:**
  - Metadato en `clave: valor` (lección `metadatos-clave-valor`): la ficha anexada sigue esa voz —líneas `URL:`, `Tema:`, `Nivel:`, `Prerequisitos:`, `Pausas:` numeradas—, no chips ni markup.
  - Utilidad pura en `src/utils/`, testeable por sus entradas/salidas sin renderizar.
  - La ausencia de `src/env.d.ts` (con `/// <reference types="astro/client" />`) hace que los imports `?raw` y `import.meta.env.SITE` carezcan de tipos: el archivo estándar de Astro hay que crearlo.
- **Dominio:** ninguno aplica.
- **Producto:** ninguno aplica.
- **PRD:** `docs/prd/002-lectura-acompanada-por-llm.md` — CU-1 (el protocolo que el lector copia incluye instrucciones comunes, contexto y pausas en orden de lectura) y CU-4 (el sitio produce el material completo sin que el autor repita lo común). Comportamiento esperado: un solo punto de composición, opt-in preservado (sin declaración no hay material).
- **Lecciones:**
  - `docs/lessons/metadatos-clave-valor.md` — `clave: valor` para el bloque anexado.
  - `docs/lessons/espanol-del-blog.md` e `incisos-entre-parentesis.md` — las cadenas que la composición escribe (cabeceras, conectores) van en la voz del blog.
  - `docs/lessons/lineas-completas-en-artefactos.md` — el protocolo compuesto es un artefacto de ítems: una línea por dato, pausas como lista.
- **Decisiones:** ninguna vigente aplica directamente (D002 inspiró el marcador en el cuerpo, ya incorporado al diseño).
- **Vacíos detectados:** falta `src/env.d.ts` (tipos de `?raw` e `import.meta.env`); se crea dentro de la tarea.

## Conectividad

**Conectada.** Todo lo que la composición necesita existe: el campo
`agente` del esquema (de la 022), el protocolo común como archivo de
datos importable con `?raw` (verificado en la 022 a través de Vite),
`articulo.body` disponible en las entradas para extraer los bloques
`:::pausa` por regex (mismo patrón que `excerptOf` con `<!--more-->`),
`import.meta.env.SITE` para la URL absoluta y la forma `clave: valor`
instalada como voz de metadatos. Único hueco absorbible: `src/env.d.ts`
no existe y los imports `?raw`/`import.meta.env` necesitan sus tipos —
crearlo es una pieza pequeña dentro del alcance.

## Plan técnico

Las entradas de la colección traen la declaración `agente` (de la 022) y el `body` crudo; el protocolo común es un `.md` importable con `?raw`; la URL se deriva de `import.meta.env.SITE` + `/articulos/<id>/`. La composición es una utilidad pura en `src/utils/` al estilo de `excerptOf`/`formatFecha`: misma entrada, mismo resultado para página y salidas futuras.

- [x] Crear `site/src/env.d.ts` con `/// <reference types="astro/client" />`
  - Aporta: tipa los imports `*?raw` e `import.meta.env.SITE` que la composición necesita; es el archivo estándar de Astro que el proyecto no tenía
- [x] Crear `site/src/utils/accompaniment.ts` con `pausesOf(body)` y `protocolOf(article)`
  - Aporta: `pausesOf` extrae los bloques `:::pausa` en orden de aparición y aplana cada indicación a texto plano (regex sobre el crudo, patrón de `excerptOf`); `protocolOf` devuelve `null` sin declaración y con `agente: false`, y con declaración produce protocolo común + bloque `## Ficha del artículo` en `clave: valor` (`URL:` absoluta, `Tema:`, `Nivel:` y `Prerequisitos:` omitidas si vacías, `Pausas:` numeradas por orden en el cuerpo)
  - Contexto: artículo declarado con cero `:::pausa` degrada —produce el protocolo sin sección de pausas, no falla (decisión del usuario); el código va en inglés (corrección del usuario), el contenido que compone sigue en español del blog; `## Ficha del artículo` + `clave: valor` casa con la voz de metadatos de la casa
- [x] Ejercitar la composición contra entradas de muestra por la pipeline de Vite y verificar la suite
  - Aporta: no hay runner de pruebas; la verificación es por salida inspeccionada (`ssrLoadModule` con entradas estructurales), como en la 022
- [x] Arnés: `check`, `lint`, `format:check`, `build` en verde
  - Aporta: confirma que `env.d.ts` tipa el import `?raw` y que nada del sitio existente se rompe

## Suite de pruebas esperada

- **CU-1 — Iniciar la lectura acompañada:**
  - Un artículo con declaración y una pausa produce un texto que contiene el protocolo común, la ficha con su URL absoluta y la pausa numerada. (O)
  - Con varias pausas, la lista sigue el orden de aparición en el cuerpo. (M)
  - La URL es absoluta: `site` de la config + la ruta del artículo. (I)
  - Una indicación de pausa multi-línea o con markup queda como texto plano en la ficha. (B)
- **CU-4 — Declarar el acompañamiento:**
  - `prerequisitos` vacío omite la línea, no la deja hueca; `nivel` ausente igual. (Z)
  - Declarado con cero `:::pausa` en el cuerpo, el protocolo sale sin sección de pausas (degrada, no rompe). (B)
- **CU-3 — Leer sin acompañamiento:**
  - Sin `agente`, la composición devuelve `null`. (Z)
  - Con `agente: false`, devuelve `null` — el opt-out se preserva. (I)
- **Arnés:**
  - `check`, `lint`, `format:check` y `build` en verde; `env.d.ts` tipa el import `?raw`.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
