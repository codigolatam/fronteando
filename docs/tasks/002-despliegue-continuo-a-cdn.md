# Despliegue continuo a CDN

## Estado

[ ] Pendiente | **[~] En progreso** | [r] En revisión | [x] Completada | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

Publicar el esqueleto del blog en una URL pública con despliegue continuo, de modo que cada cambio fusionado a la rama principal quede publicado sin pasos manuales.

## Dependencias

- 001

## Entrada

- El proyecto Astro funcional de la tarea precedente.
- El proveedor elegido por el usuario entre las opciones del brief —Cloudflare Pages como opción por defecto: gratuito, CDN global, sin servidor— o un equivalente.
- Acceso del usuario a la cuenta del proveedor para autorizar el despliegue.

## Resultado esperado

- El sitio publicado en una URL pública del proveedor.
- La URL pública real sustituye al valor provisional `https://fronteando.dev` en `site/astro.config.mjs`, dejado por la tarea 001.
- Despliegue automático configurado: la rama principal dispara build y publicación.
- La configuración de despliegue registrada en el repositorio —archivo de configuración del proveedor o documentación del paso que quede manual.

## Criterios de calidad

- La URL pública sirve el sitio compilado.
- Un cambio fusionado a la rama principal se publica sin intervención manual.
- La configuración es reproducible: otro entorno puede recrear el despliegue.

## Procedimiento sugerido

1. Confirmar el proveedor con el usuario.
2. Conectar el repositorio con el servicio —comando de build y directorio de salida de `site/`.
3. Configurar la publicación de la rama principal.
4. Verificar la URL pública y el ciclo completo de publicación.

## Notas

- Desplegar cuando el sitio es aún un esqueleto sin contenido ni diseño es deliberado: valida la tubería de publicación desde el primer día y convierte cada tarea posterior en un cambio publicado.

## Contexto


- Archivos similares: `site/` —el proyecto Astro levantado en 001— es el artefacto a desplegar; `site/astro.config.mjs` declara la URL provisional `https://fronteando.dev` que esta tarea debe sustituir por la pública real (relevo ya registrado en su Resultado esperado).
- Patrones: despliegue continuo desde la rama principal declarado como decisión transversal de la épica; todo lo derivado se produce en build time, sin runtime; la configuración de despliegue debe quedar registrada en el repositorio —archivo de configuración del proveedor o documentación del paso manual—.
- Dominio: ninguno — el proyecto aún no tiene `docs/domains/`.
- Producto: ninguno — el proyecto aún no tiene `product-docs/`.
- PRD: `docs/prd/001-sitio-base-del-blog.md` — CU-1 exige que fusionar a la rama principal publique sin pasos manuales; el comportamiento esperado de publicación es el núcleo de esta tarea.
- Lecciones: `formato-de-codigo-generado` — si se crean archivos de configuración o workflow, escribirlos ya conforme al estilo del proyecto.
- Decisiones: `brief.md` fija hosting gratuito de sitio estático —Cloudflare Pages como opción por defecto, Netlify o similar como equivalente—; la elección final del proveedor es entrada del usuario, no asunción.
- Entorno: no hay CLIs de proveedor (`wrangler`, `netlify`) ni credenciales instaladas; el repositorio ya tiene remoto en GitHub (`codigolatam/fronteando`), que es lo que la integración Git del proveedor necesita.

## Conectividad


**Veredicto:** conectada.

La base que la tarea asume ya existe: `site/` compila a `dist/` con `npm run build`, el repositorio está en GitHub y `astro.config` tiene el punto de anclaje de la URL. Lo externo —la cuenta del proveedor y la autorización de la integración— es entrada declarada de la tarea y se resuelve con el usuario durante la ejecución, no una carencia del codebase que exija tarea puente.

## Plan técnico


`site/` compila a `dist/` estático y el despliegue publica ese artefacto en CDN. El proveedor decidido es Cloudflare Pages con su integración Git —un merge a `master` dispara build y publicación sin CI propio ni secrets—; la parte no automatizable, la autorización de la cuenta, la ejecuta el usuario guiada por la documentación que queda en el repositorio.

- [x] Registrar la configuración de despliegue en el repo: `site/.nvmrc` con la versión de Node y sección de despliegue en `site/README.md` con los ajustes del proyecto Pages (directorio raíz, comando de build, directorio de salida)
  - Aporta: cumple «configuración reproducible» —otro entorno recrea el despliegue leyendo el repo— y fija el Node del build remoto igual al local.
  - Contexto: Pages lee `.nvmrc` desde el directorio de build; `engines >=22.22.0` ya está declarado en `package.json` y la versión local es 24.
- [ ] Conectar el repositorio con Cloudflare Workers Builds — paso del usuario con la guía documentada
  - Aporta: es la integración que convierte cada merge en publicación.
  - Contexto: el agente no puede autorizar la cuenta de Cloudflare; el paso manual queda documentado en `site/README.md`, que es lo que el criterio de reproducibilidad exige. El `name` de `wrangler.jsonc` debe coincidir con el worker del dashboard (`fronteando`) o el build falla.
- [ ] Sustituir la URL provisional de `astro.config` por la pública real
  - Aporta: el relevo registrado en esta tarea —`fronteando.dev` por el `*.pages.dev` asignado o el dominio propio— deja el origen canónico correcto para el RSS y las OG de 007/008.
  - Contexto: la URL se conoce tras el primer despliegue; verificar que responde antes de escribirla.
- [ ] Verificar el ciclo completo: un push a `master` dispara el build remoto y la URL pública sirve el sitio
  - Aporta: la evidencia end-to-end del criterio «un cambio fusionado se publica sin intervención manual».

## Suite de pruebas esperada


- Un merge o push a `master` dispara el build en Cloudflare Pages y publica sin intervención manual — CU-1 (I).
- La URL pública responde 200 sirviendo el HTML compilado del sitio — CU-1 (O).
- `astro.config.mjs` declara la URL pública real, sin rastro del provisional `fronteando.dev` — CU-1 (B).
- Otro entorno puede recrear el despliegue leyendo solo lo registrado en el repo — CU-1, prueba de arnés documental.
- El build remoto corre con la versión de Node declarada en el repo — CU-1 (B).

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
