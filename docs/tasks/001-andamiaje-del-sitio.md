# Andamiaje del sitio con Astro

## Estado

[ ] Pendiente | [~] En progreso | [r] En revisión | **[x] Completada** | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

Dejar el esqueleto desplegable del blog: un proyecto Astro funcional dentro del repositorio que compila a HTML estático, listo para recibir identidad y contenido.

## Dependencias

- Ninguna

## Entrada

- El brief del proyecto (`brief.md`), que fija Astro como generador y el sitio estático como decisión de implementación.
- El directorio `site/` como hogar del código del blog, separado de los artefactos de gestión del proyecto que ocupan la raíz.

## Resultado esperado

- Proyecto Astro inicializado en `site/` con la estructura de un blog: páginas, layout base mínimo y directorio de contenido.
- Scripts funcionando: `npm run dev` sirve el sitio en local y `npm run build` produce el HTML estático.
- Una página de prueba que renderiza correctamente y servirá de banco para el tema.
- `.gitignore` y herramientas de calidad (lint y formato) configuradas según las convenciones de Astro.

## Criterios de calidad

- `npm run build` termina sin errores y produce el sitio estático.
- `npm run dev` sirve una página accesible en local.
- Los artefactos de gestión del proyecto —`TODO.md`, `docs/`, `.agents/`— quedan intactos en la raíz.

## Procedimiento sugerido

1. Inicializar el proyecto Astro en `site/` con la plantilla mínima.
2. Configurar `astro.config` con la URL del sitio y Markdown.
3. Crear el layout base mínimo y una página de prueba.
4. Configurar scripts, `.gitignore` y formato.
5. Verificar dev y build de punta a punta.

## Notas

- La ubicación `site/` es la decisión sugerida para no mezclar el código del blog con los artefactos de gestión; si en la ejecución se prefiere otra, ajustar.
- No añadir componentes de acompañamiento LLM ni demos: pertenecen a otras ideas del bloque inicial.

## Contexto


- Archivos similares: ninguno — `site/` aún no existe; es un arranque en verde. La plantilla mínima de Astro fija la estructura de páginas y layout.
- Patrones: el código del sitio vive en `site/`, separado de los artefactos de gestión en la raíz (plan técnico de la épica); todo lo derivado se produce en build time, sin runtime; los valores visuales referencian los tokens de `DESIGN.md` —en esta tarea solo aplica al layout base mínimo—.
- Dominio: ninguno — el proyecto aún no tiene `docs/domains/`.
- Producto: ninguno — el proyecto aún no tiene `product-docs/`.
- PRD: `docs/prd/001-sitio-base-del-blog.md` — la tarea habilita la base de CU-1 (publicar exige que el build exista y pueda romperse); el resto de casos de uso aterriza en tareas posteriores del conjunto.
- Lecciones: ninguna aplica — el proyecto aún no tiene `docs/lessons/`.
- Decisiones: ninguna registrada en `docs/decisions/` —aún no existe el directorio—; las vigentes viven en `brief.md` (Astro como generador, sitio estático servido desde CDN) y en el plan técnico de la épica enlazada.

## Conectividad


**Veredicto:** conectada.

La tarea es de arranque en verde y todo lo que asume está presente: Node.js v24 y npm 11 disponibles en el entorno (Astro exige Node >= 18.17), el directorio `site/` está vacío como destino previsto —su ausencia es el punto de partida, no una carencia— y las decisiones que la guían (`brief.md`, épica) ya declaran el generador, la ubicación y el modelo estático. No falta capacidad base externa a la tarea.

## Plan técnico


La raíz del repositorio contiene solo artefactos de gestión y documentación; no hay código de producto. La tarea crea `site/` como un proyecto Astro aislado —paquete propio con sus dependencias y scripts— cuya estructura dicta la plantilla mínima del generador. El layout queda deliberadamente neutro: la identidad visual llega en 003/004 y el esquema de la colección en 005.

- [x] Inicializar el proyecto Astro en `site/` con la plantilla mínima e instalar dependencias
  - Aporta: materializa el hogar del blog que fija la épica y produce la estructura (`src/pages`, `astro.config`) con los scripts `dev`/`build` que exigen los criterios.
  - Contexto: `npm create astro` es interactivo; la ejecución debe usar la plantilla mínima con flags no interactivos (`--template`, `--install`, `--no-git` o equivalente) para no bloquearse.
- [x] Configurar `astro.config` con la URL del sitio
  - Aporta: fija el origen canónico del que dependen las URLs absolutas de RSS y OG (007 y 008).
  - Contexto: aún no hay dominio ni URL pública —002 la asigna—; se declara el valor provisional `https://fronteando.dev` y queda de 002 actualizarlo al real.
- [x] Crear el layout base mínimo (`src/layouts/`) y la página de prueba
  - Aporta: establece el punto de extensión que 004 convertirá en layout completo, y una página banco para verificar dev y build de punta a punta.
  - Contexto: neutro a propósito —documento HTML con `lang="es"`, charset, viewport y `<slot />`, y una página que lo usa; sin tokens ni identidad visual.
- [x] Crear el directorio de contenido `src/content/` sin colección definida
  - Aporta: deja el hogar de los artículos declarado sin anticipar el esquema, que es frontera de 005.
  - Contexto: no declarar `content.config.ts` ni esquema; un marcador (`.gitkeep`) basta para que el directorio exista en git.
- [x] Configurar `.gitignore` de `site/` y las herramientas de calidad
  - Aporta: cubre `node_modules/`, `dist/` y las salidas de Astro; deja formato y chequeo funcionando según la convención de Astro.
  - Contexto: la convención es Prettier + `prettier-plugin-astro` para formato y `astro check` (`@astrojs/check` + `typescript`) como chequeo estático; ESLint queda fuera —la plantilla mínima no lo trae y `astro check` ya cubre el diagnóstico.

## Suite de pruebas esperada


El PRD no declara caso de uso de andamiaje; las expectativas anclan a CU-1 —la publicación exige que el build exista en verde— o se marcan como pruebas de arnés.

- `npm run build` en `site/` termina con éxito y produce `dist/` con el HTML estático de la página de prueba — CU-1 (O).
- `npm run dev` sirve la página de prueba: responde 200 con el HTML renderizado — CU-1 (I).
- El build con `src/content/` vacío —cero artículos— termina sin errores — CU-1 (Z).
- La página de prueba renderiza dentro del layout base: documento HTML completo con `lang="es"`, charset y viewport — arnés, banco para el tema.
- Los comandos de calidad (`astro check`, formato) terminan en verde sobre el código inicial — arnés.

## Revisión

- Subagente: 2026-10-15 — Aprueba
- Usuario (ejecución): 2026-10-15 — Aprueba
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
