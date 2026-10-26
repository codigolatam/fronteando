# Demo viva del store reactivo

## Estado

[ ] Pendiente | [~] En progreso | **[r] En revisión** | [x] Completada | [!] Bloqueada

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

## Contexto

- **Archivos similares:**
  - `site/src/content/articulos/un-store-reactivo-en-vanilla-js.md` —
    el artículo: «El resultado primero» (líneas 29-47) presenta el
    programa completo como listado estático; las tres piezas que
    construye (`signal`, `effect`, `store` con `Proxy`) son el código
    que la demo ejecuta instrumentado. Tres `:::pausa` activas y
    `agente` declarado.
  - `site/src/demos/fronteando-demo.ts` y
    `site/src/demos/contador/` — el mecanismo y la pieza de referencia
    del convenio (D007: `piece.svelte` compilado a CE + `index.ts`
    adaptador).
  - `EDITORIAL.md` sección «Piezas interactivas» — el convenio de
    autoría: `:::demo{nombre="…"}`, fallback de tres lectores, tipos
    de pieza.
- **Patrones:**
  - Vista instrumentada (vocabulario del género): la pieza corre el
    mismo código que el texto enseña, envuelto en una capa que emite
    eventos de traza —nunca una reimplementación que pueda divergir—.
  - Múltiples representaciones (Victor): dos vistas del mismo modelo
    que responden a la misma acción —el programa y su interior—.
  - Svelte CE: `$state`, markup declarativo, `<style>` scoped; el
    estado interno de la pieza vive en el componente, no en el store
    demostrado.
- **Dominio/PRD:** PRD 004 — CU-1 (ver funcionar) y CU-2 (ver el
  funcionamiento interno) son el corazón de esta pieza; CU-4/5 ya los
  resuelve el mecanismo.
- **Lecciones:** `texto-para-agentes` (el fallback se evalúa como
  prompt), `nombres-de-tests`, `idioma-del-codigo`, `espanol-del-blog`
  (el texto de la pieza es editorial: español).
- **Decisiones:** D007 (piezas en Svelte CE), D001 (estático, sin
  servidor), D006 (la pieza vive en el flujo, no en el rail).
- **Investigación:** `docs/research/2026-10-el-genero-explorable-explanations.md`
  — tipos de pieza y representaciones que danzan; los demás documentos
  del corpus de 028 para detalles del mecanismo.

## Conectividad

**Veredicto: conectada.**

Todo lo que la pieza necesita existe con la forma esperada: el
mecanismo (`:::demo` → `<fronteando-demo>` → `src/demos/<nombre>/`),
la integración Svelte con modo custom elements, la pieza de
referencia `contador` que ejemplifica el contrato `mount`, los tokens
de `DESIGN.md` que cruzan ambos shadows y el artículo con su sección
de resultado estático donde la demo encaja. La única construcción
nueva es la pieza misma —su store instrumentado— más el ajuste
editorial del texto circundante; ambos están en el alcance de la
tarea.

## Plan técnico

**Resumen del subsistema:** el artículo enseña tres piezas
(`signal` con suscriptores manuales, `effect` con `efectoActivo`,
`store` con `Proxy` por propiedad) y presenta el programa completo
como código estático en «El resultado primero». La demo reemplaza la
ausencia de funcionamiento con una vista instrumentada: el mismo
código del texto —`store`, `effect`, `efectoActivo`— envuelto en una
capa que emite eventos de traza (get → suscribe, set → notifica,
correr → escribe), mostrado en dos vistas sincronizadas.

**Decisiones transversales:**

- La pieza corre el código del artículo instrumentado, no una
  reimplementación: la traza es honesta porque la mecánica es la del
  texto (la observación no contradice la explicación —criterio de
  calidad—).
- Dos vistas que bailan juntas: «el programa» (título simulado
  `nombre · nivel N` más controles para escribir las dos propiedades
  del ejemplo) y «por dentro» (traza en vivo de get/set/correr y el
  mapa `suscriptoresPorProp` visible).
- La prueba del grafo fino entra en la pieza: un segundo efecto que
  solo lee `nombre`, para que el lector compruebe que cambiar `nivel`
  no lo reejecuta —la propiedad de la que el texto presume en la
  sección «De un valor a un objeto»—.
- La demo se declara tras el bloque de código de «El resultado
  primero» con su fallback honesto; el párrafo circundante pasa de
  compensar la ausencia («ninguna línea avisa de nada») a invitar a
  tocar la pieza —ajuste mínimo, voz intacta, pausas sin mover—.

- [x] Escribir el store instrumentado del artículo en
      `site/src/demos/store-reactivo/` —`signal`/`effect`/`store` del
      texto más una capa que emite eventos de traza (suscribe,
      notifica, corre, escribe)—
  - Aporta: la honestidad de la observación —la pieza ejecuta la
    mecánica que el artículo explica, no una copia—
- [x] Construir `store-demo.svelte` (CE `demo-store-reactivo`) con las
      dos vistas y el `index.ts` adaptador del convenio
  - Aporta: la vista instrumentada —el programa y su interior
    respondiendo a la misma escritura—
  - Contexto: controles nativos (botones/inputs ≥44px), estilos con
    tokens `--*`, `prefers-reduced-motion`, operable por teclado;
    la traza como lista acotada (las entradas recientes primero) con
    rol `log` o `status` para lectores de pantalla
- [x] Declarar la pieza y adaptar el texto: `:::demo{nombre=
      "store-reactivo"}` tras el bloque de código en «El resultado
      primero», fallback descriptivo y párrafo circundante ajustado
  - Aporta: CU-1/CU-2 en el punto donde el artículo lo promete;
    el `.md` y sin-JS quedan legibles por el fallback
- [x] Verificación renderizada en Firefox: dos vistas bailando, grafo
      fino (nivel no reejecuta el efecto de nombre), traza ordenada,
      sin-JS, `.md`, temas y teclado
  - Aporta: el criterio exige evidencia renderizada
- [x] Puertas: check, lint, test, build, format:check
  - Aporta: la regresión no entra

## Suite de pruebas esperada

- La pieza monta en «El resultado primero» y escribir `estado.nivel`
  o `estado.nombre` actualiza la vista del programa (CU-1; B).
- La traza registra cada `get` como suscripción y cada `set` como
  notificación en orden (CU-2; I).
- Cambiar `nivel` no reejecuta el efecto que solo lee `nombre` —el
  grafo fino es demostrable (CU-2; E).
- El store instrumentado es el código del artículo: la traza
  corresponde a la mecánica que el texto enseña (criterio de
  calidad; I).
- Sin JavaScript el fallback se ve en el lugar de la pieza y el
  `.md` muestra `:::demo` con su texto (CU-4/5; B/I).
- Solo tokens de `DESIGN.md`; operable por teclado; pausas y
  acompañamiento intactos (regresión).

## Desviaciones del plan

- El plan mencionaba instrumentar `signal`, `effect` y `store`; la
  pieza ejecuta `effect` + `store`, porque el diseño aprobado muestra
  la versión con `store` (`estado.nombre`, `estado.nivel`). La
  suscripción automática que `signal` introduce queda cubierta por el
  `get` del `Proxy` en la traza.
- La traza muestra la última operación completa (desde el `set` hasta
  los efectos que reejecuta) y anuncia una sola línea de estado por
  operación, para evitar que cada escritura produzca una ráfaga de
  entradas en lectores de pantalla.

## Revisión

- Subagente: 2026-10-26 — Aprueba
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
