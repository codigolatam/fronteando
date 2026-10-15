# Feed RSS

## Estado

**[ ] Pendiente** | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

Publicar el feed RSS del blog generado en build: el canal por el que lectores —y la futura newsletter— se enteran de contenido nuevo.

## Dependencias

- 005

## Entrada

- La colección de artículos funcionando.
- La URL pública del sitio, configurada en el despliegue del borrador 02.

## Resultado esperado

- `rss.xml` generado en build con todos los artículos publicados: título, fecha, resumen y enlace.
- El feed descubrible desde el sitio: `link` en el head y referencia en el pie.

## Criterios de calidad

- El feed valida como RSS 2.0 y lista los artículos publicados.
- Los borradores no aparecen en el feed.
- Se regenera en cada build sin paso manual.

## Notas

- Es la entrada que la idea `newsletter` automatizará para avisar a suscriptores; dejarla lista ahora desacopla esa línea.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
