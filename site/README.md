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
