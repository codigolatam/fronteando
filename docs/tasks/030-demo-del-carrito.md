# Demo viva del carrito a lo bruto

## Estado

**[ ] Pendiente** | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

Convertir el ejemplo del artículo «El carrito a lo bruto» en una
pieza interactiva donde el lector usa el componente —catálogo,
añadir, quitar y total— en el lugar donde el texto lo presenta, en
vez de leerlo como listado estático.

## Dependencias

- 028 — el mecanismo que hospeda la pieza en el artículo.

## Entrada

- El artículo `site/src/content/articulos/carrito-a-lo-bruto.md` —
  su sección «El resultado primero» y el código completo del carrito
  que el texto desmonta después.
- El mecanismo y el convenio de autoría del borrador 01, más lo que
  la primera pieza real (borrador 02) haya depurado.
- `DESIGN.md` — la superficie de la demo sale de los tokens.

## Resultado esperado

- Donde el artículo muestra el carrito como listado estático, el
  lector encuentra el componente funcionando: añade productos, los
  quita y ve el total actualizarse —y puede volver al código impreso
  para reconocer qué parte hace qué—.
- El texto del artículo se adapta: la presentación que hoy compensa
  la ausencia de funcionamiento se ajusta para referir lo que el
  lector puede tocar, preservando el argumento central —el código
  funciona y aun así nadie quiere mantenerlo—.
- La pieza ejercita un perfil distinto del mecanismo que la primera:
  un componente de UI reconocible frente a una vista instrumentada de
  estado interno.

## Criterios de calidad

- El carrito funciona en su lugar de lectura: añadir, quitar y total
  responden como describe el texto.
- La demo reproduce el componente tal como el artículo lo construye —
  el lector que lee el listado reconoce en la demo lo que tocó—.
- Sin JavaScript el artículo sigue contando lo esencial y el `.md`
  queda legible para un agente.
- La superficie sigue `DESIGN.md`; el texto adaptado respeta la voz
  editorial y el `agente` declarado sigue funcionando con sus pausas
  en posición.
- `check`, `lint`, `test`, `build` y `format:check` en verde; la demo
  se verifica renderizada en el navegador.

## Procedimiento sugerido

1. Diseñar la demo: el componente funcionando tal como el artículo lo
   construye, en el lugar donde hoy se presenta el resultado.
2. Construir la pieza con el convenio del borrador 01 e insertarla.
3. Ajustar el texto del artículo a la presencia de la demo.
4. Verificar renderizado, el `.md` resultante y las puertas.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
