# Fronteando — sitio

El blog de Fronteando, construido con [Astro](https://astro.build) como
sitio estático. Vive separado de los artefactos de gestión del proyecto,
que ocupan la raíz del repositorio.

## Comandos

| Comando                | Acción                                             |
| ---------------------- | -------------------------------------------------- |
| `npm run dev`          | Sirve el sitio en local                            |
| `npm run build`        | Compila el sitio estático a `dist/`                |
| `npm run preview`      | Sirve el resultado del build                       |
| `npm run check`        | Chequeo estático de las plantillas (`astro check`) |
| `npm run format`       | Formatea el código con Prettier                    |
| `npm run format:check` | Verifica el formato sin escribir                   |

## Estructura

```text
site/
├── public/            # recursos estáticos servidos tal cual
├── src/
│   ├── layouts/       # layout base de las páginas
│   ├── pages/         # rutas del sitio
│   └── content/       # hogar de la colección de artículos
└── astro.config.mjs   # configuración de Astro (URL del sitio)
```

## Despliegue

El sitio se publica en **Cloudflare Workers** como worker de assets
estáticos —la plataforma que unifica lo que antes era Pages— mediante
su integración Git (Workers Builds): cada merge a `master` dispara el
build y la publicación sin pasos manuales.

La configuración vive en el repositorio:

- `wrangler.jsonc` declara el worker `fronteando` y el directorio de
  assets `./dist` —el `name` debe coincidir con el proyecto del
  dashboard o el build falla—.
- `.wrangler/deploy/config.json` en la raíz del repositorio redirige a
  esa configuración: los builds de preview de Workers Builds ejecutan
  `npx wrangler preview` desde la raíz del repo e ignoran el
  «root directory» del proyecto, así que sin el redireccionamiento
  wrangler corre sin config y falla.
- `.nvmrc` fija la versión de Node del build remoto.
- `wrangler` va fijado como dependencia de desarrollo para que el
  despliegue remoto y el local usen la misma versión.

La conexión del repositorio se hace una sola vez desde el dashboard —
requiere la cuenta del proyecto— con estos ajustes:

| Ajuste                | Valor                               |
| --------------------- | ----------------------------------- |
| Nombre del worker     | `fronteando`                        |
| Rama de producción    | `master`                            |
| Directorio raíz       | `site`                              |
| Comando de build      | `npm ci && npm run build`           |
| Comando de despliegue | `npx wrangler deploy` (por defecto) |

Pasos para recrear la integración: Workers & Pages → Create
application → GitHub → autorizar y seleccionar
`codigolatam/fronteando` → aplicar los ajustes de la tabla → Save and
Deploy.
