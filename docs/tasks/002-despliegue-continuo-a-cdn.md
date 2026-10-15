# Despliegue continuo a CDN

## Estado

**[ ] Pendiente** | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

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

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
