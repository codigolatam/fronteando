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

El sitio se publica en **Cloudflare Pages** por integración Git: cada
merge a `master` dispara el build y la publicación sin pasos manuales.
La conexión del repositorio se hace una sola vez desde el dashboard de
Cloudflare —requiere la cuenta del proyecto—; los ajustes quedan
registrados aquí para que el despliegue sea recreable:

| Ajuste               | Valor               |
| -------------------- | ------------------- |
| Proyecto             | `fronteando`        |
| Rama de producción   | `master`            |
| Directorio raíz      | `site`              |
| Comando de build     | `npm run build`     |
| Directorio de salida | `dist`              |
| Versión de Node      | la de `.nvmrc` (24) |

Pasos para recrear la integración: Workers & Pages → Create → Pages →
Connect to Git → autorizar `codigolatam/fronteando` → aplicar los
ajustes de la tabla → Save and Deploy.
