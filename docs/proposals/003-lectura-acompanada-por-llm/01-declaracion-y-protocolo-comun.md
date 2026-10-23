# Definir la declaración de acompañamiento por artículo y el protocolo común

## Tipo

desarrollo

## Objetivo

Definir la forma en que cada artículo declara su acompañamiento —el
contexto del lector y las pausas con su posición— y escribir las
instrucciones comunes del protocolo una sola vez, dejando documentada la
convención para quien escribe.

## Dependencias

- Ninguna.

## Entrada

- La forma de solución aprobada en la propuesta: lo común vive una sola
  vez en el sitio, lo propio con los metadatos del artículo y las pausas
  marcadas dentro del texto.
- `site/src/content.config.ts` — el esquema actual de la colección.
- `EDITORIAL.md` — donde vive la convención para quien escribe.
- `docs/research/2026-10-enlaces-precargados-a-asistentes.md` — el
  protocolo compuesto debe caber en ~6k caracteres para mantener viables
  los enlaces precargados.

## Resultado esperado

- El esquema de la colección `articulos` extendido con la declaración
  de acompañamiento: contexto (tema, nivel del lector, prerequisitos) y
  pausas.
- La forma de marcar una pausa dentro del cuerpo definida, de modo que
  viaje con el contenido al editar.
- El protocolo común escrito en un único lugar del sitio: el rol del
  asistente y las reglas de la lectura acompañada.
- La convención de declaración documentada en `EDITORIAL.md` para los
  próximos posts.

## Criterios de calidad

- La declaración cubre contexto y pausas —posición en el texto y qué se
  verifica en cada una— sin piezas ambiguas.
- Nada del protocolo común se duplica por artículo: un solo origen
  editable.
- La declaración es opt-in: un artículo sin ella se publica igual que
  hoy.
- El protocolo compuesto típico —común más declaración— cabe en el
  presupuesto de ~6k caracteres.

## Procedimiento sugerido

1. Diseñar el esquema de declaración: campos, obligatoriedad y la forma
   de marcar una pausa en el cuerpo.
2. Escribir el protocolo común en el español del blog —rol, reglas y el
   formato de las pausas—, breve por el presupuesto de tamaño.
3. Extender el esquema de la colección y documentar la convención en
   `EDITORIAL.md`.

## Notas

- El esquema definido aquí es la entrada directa de la idea 003 —blog
  legible para máquinas—: conviene que la declaración sea portable como
  texto plano.
