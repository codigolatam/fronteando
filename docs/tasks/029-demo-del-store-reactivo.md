# Demo viva del store reactivo

## Estado

**[ ] Pendiente** | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

Convertir el ejemplo del artículo «Un store reactivo en vanilla JS»
en una pieza interactiva donde el lector ve el store funcionando y,
paso a paso, su funcionamiento interno: qué notifica el signal, qué
efecto se registra y cómo reacciona el DOM.

## Dependencias

- 028 — el mecanismo que hospeda la pieza en el artículo.

## Entrada

- El artículo `site/src/content/articulos/un-store-reactivo-en-vanilla-js.md`
  — su sección «El resultado primero» y el código del store que
  construye paso a paso.
- El mecanismo y el convenio de autoría del borrador 01.
- `DESIGN.md` — la superficie de la demo sale de los tokens.

## Resultado esperado

- Donde el artículo hoy muestra el resultado como listado estático,
  el lector encuentra la demo viva: puede hacer cambiar el estado y
  ver el DOM responder, y puede seguir paso a paso lo que ocurre por
  dentro —el signal notificando, el efecto registrándose, la
  actualización propagándose—.
- El texto del artículo se adapta a la presencia de la demo: la
  explicación que hoy compensa la ausencia de funcionamiento se
  ajusta para referir lo que el lector puede tocar, sin reescribir la
  pieza.
- La pieza es la primera real del mecanismo: valida el convenio de
  autoría con un caso que exige vista propia e instrumentación, no
  solo ejecutar el código impreso.

## Criterios de calidad

- La demo funciona en su lugar de lectura y el lector puede provocar
  cambios de estado y ver el efecto.
- La vista interna paso a paso corresponde con la mecánica que el
  artículo enseña —signal, effect, Proxy—: lo observable no contradice
  el texto.
- Sin JavaScript el artículo sigue contando lo esencial —la decisión
  del mecanismo se respeta— y el `.md` queda legible para un agente.
- La superficie sigue `DESIGN.md`; el texto adaptado respeta la voz
  editorial y el `agente` declarado sigue funcionando: las pausas
  quedan donde la lectura las necesita.
- `check`, `lint`, `test`, `build` y `format:check` en verde; la demo
  se verifica renderizada en el navegador.

## Procedimiento sugerido

1. Diseñar la demo: qué se ve funcionando, qué vista interna paso a
   paso la acompaña y cómo se relaciona con el texto que la rodea.
2. Construir la pieza con el convenio del borrador 01 e insertarla
   donde el artículo presenta el resultado.
3. Ajustar el texto del artículo a la presencia de la demo.
4. Verificar renderizado, el `.md` resultante y las puertas.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
