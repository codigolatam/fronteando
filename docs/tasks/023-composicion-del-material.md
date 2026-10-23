# Componer el material de acompañamiento por artículo

## Estado

**[ ] Pendiente** | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

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

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
