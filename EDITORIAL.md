# Guía editorial

La `DESIGN.md` de la escritura: el contrato de voz, estructura y
metadatos que todo artículo de Fronteando cumple. Los skills de
contenido (`planear-post`, `redactar-post` y `revisar-post`) la
consultan; los skills genéricos de escritura (`revisar-redaccion`,
`pulir-escritura`) son su mecánica de apoyo y la referencia para la
documentación del proyecto, que no se rige por esta guía.

**Contenido**

- [Voz y registro](#voz-y-registro)
- [Anatomía del post](#anatomía-del-post)
- [Contrato de metadatos](#contrato-de-metadatos)
- [Lectura acompañada](#lectura-acompañada)
- [Piezas interactivas](#piezas-interactivas)
- [Taxonomía](#taxonomía)
- [Niveles de edición](#niveles-de-edición)
- [Manuales de referencia](#manuales-de-referencia)
- [Palabras problemáticas](#palabras-problemáticas)
- [Ejemplos de la casa](#ejemplos-de-la-casa)
- [Fuera de alcance](#fuera-de-alcance)

## Voz y registro

Fronteando escribe **contenido de fondo, no recetas**: piezas para
entender por qué, no instrucciones para copiar.

- **Primera persona del plural** para el proyecto («vamos a
  construir», «nuestro efecto»); **segunda persona** para el lector
  («tu pantalla», «ya sabes qué acaba de ocurrir»). Nunca tercera
  persona
  impersonal cuando cabe una de las dos.
- **Claro antes que denso.** Se prefiere la frase que no exige
  deducir nada a la telegráfica: la subordinada que explicita la
  causa gana a la elipsis. Cada párrafo desarrolla una idea y cada
  frase trabaja; el relleno se corta, pero la explicitud no es
  relleno.
- **Conversacional de trabajo.** La prueba: ¿hablaría así con un
  colega técnico? (Y la de voz alta: intro y cierre se leen en voz
  alta; lo forzado se reescribe.) Metáforas simples y de uso común
  (una figura que el lector tenga que traducir es relleno) y
  preguntas retóricas sí; solemnidad y burocracia no.
- **Honesto antes que entusiasta.** Los límites se nombran, los
  trade-offs se declaran. La confianza la da admitir lo que falta, no
  fingir que no falta nada.
- **Sin _gatekeeping_.** Proscritos «simplemente», «obviamente»,
  «fácil», «solo hay que»: nada es obvio para quien lo está
  aprendiendo.
- **Español latinoamericano neutro, con anglicismos técnicos
  aceptados.** La variante es la neutra del continente: entre dos
  formas correctas se elige la que se entiende en todas partes y
  los regionalismos quedan fuera. `store`, `signal`, `batching`,
  `render`, `diffing`, `cleanup` van así, sin cursiva ni comillas;
  el español no tiene equivalente instalado. Los calcos
  síntácticos no valen: «Con eso dicho» por _with that said_ queda
  fuera. La lista es orientativa, no cerrada (el criterio es el
  equivalente instalado: trade-offs, snippet entran por la misma
  puerta). Los extranjerismos no asimilados llevan cursiva
  (_gatekeeping_).
- **Ortotipografía de la casa:** comillas latinas «» para citas y
  usos metalingüísticos; los incisos van entre paréntesis (la casa
  los prefiere sobre la raya larga, que solo queda como recurso
  excepcional).

## Anatomía del post

Un post es una promesa cumplida: si no cabe en «después de leer esto,
el lector podrá ___», el post no está listo. La anatomía describe el
post técnico (el género de la casa); las piezas meta (presentaciones,
notas) adaptan los pasos donde aplican.

1. **El gancho.** Una o dos frases (o un párrafo breve de preparación
   con su resolución) que plantan una tensión y la resuelven dentro
   del previo; la negación («Parece magia. No lo es») es el patrón
   distintivo de la casa, no el único camino.
2. **El previo.** Todo lo anterior a `<!--more-->`: breve (un
   párrafo, unas sesenta palabras como mucho), autocontenido, con el
   gancho resuelto adentro. Se diseña como unidad, no como sobrante
   del primer párrafo.
3. **La promesa.** El párrafo tras el corte declara qué se construye o
   qué se aprende y qué se lleva el lector (sin calentamiento). Sus
   anclas concretas (cantidades, nombres propios del diagnóstico)
   reaparecen en el cuerpo del post.
4. **El resultado primero.** Mostrar el programa funcionando antes de
   explicarlo: el final gana la atención que la explicación sostiene.
5. **Las secciones.** Encabezados descriptivos que permiten aprender
   hojeando; cada sección aporta algo que el arco necesita. Las
   tangentes se cortan.
6. **Los límites honestos.** Sección propia que nombra lo que quedó
   fuera y por qué importa (cada omisión es una pregunta legítima).
7. **El cierre.** La conclusión (el último párrafo) en dos o tres
   frases, la última una puerta abierta: lo que sigue, la pregunta
   que queda.

**El código.** Todo fragmento corre tal cual está escrito (verificado
ejecutándolo antes de publicar) o se marca explícitamente como
extracto. Snippets cortos que muestran la salida que el lector verá y
explican el porqué, no solo el qué.

## Contrato de metadatos

- **Frontmatter completo:** `title`, `description`, `date`,
  `categoria`, `tags` (los exige la casa; el esquema además da
  default a `draft` y `tags`, y `nivel` es opcional). `draft` ausente
  equivale a `false`: publicado; un borrador en revisión interna
  lleva `draft: true`.
- **`nivel`:** el grado al que apunta el post (`principiante`,
  `intermedio` o `avanzado`); lo elige el encuadre y lo muestra la UI.
  Opcional: las piezas que no enseñan por grados (meta, noticias o
  explicaciones de ecosistema) lo omiten.
- **`categoria`:** el pilar de conocimiento al que pertenece el post;
  los valores los fija el esquema de la colección (la lista crece
  cuando el blog abre un pilar nuevo).
- **Fecha con hora real** del commit/merge (dos artículos el mismo
  día empatan en el orden por fecha; ver
  `docs/lessons/fechas-de-publicacion.md`).
- **`<!--more-->` inmediatamente tras el gancho**: el previo sale
  del cuerpo (decisión D002), no del `description`. Todo post nuevo
  lleva el marcador; sin él el sistema cae al primer párrafo
  (respaldo, no diseño, válido solo en piezas anteriores a esta
  regla).
- **Título descriptivo:** nombra el contenido en palabras del
  lector; el gerundio entra cuando describe la acción del post, no
  por costumbre.
- **`description`:** la promesa en una frase escrita para leerse
  fuera del post: alimenta la meta descripción (SERP), las tarjetas
  OG y el RSS — la ve quien aún no ha abierto nada. Máximo ~150
  caracteres, la tensión o el gancho dentro, sin adjetivos
  valorativos. No es el previo: es su propia pieza.

## Lectura acompañada

Las piezas que enseñan se pueden leer acompañadas de un asistente: el
lector copia un protocolo a su asistente y recorre el artículo
deteniéndose en pausas marcadas para contrastar lo que entendió. Las
instrucciones comunes del acompañamiento viven en un solo lugar
(`site/src/data/accompaniment-protocol.md`); cada artículo declara
solo lo propio.

- **`agente` en el frontmatter:** el contexto que ajusta el protocolo:
  `tema` (de qué trata el post, en palabras del lector) y
  `prerequisitos` (lista de lo que conviene saber antes, opcional).
  El nivel del lector lo aporta `nivel`: las piezas acompañadas lo
  declaran siempre.
- **Los tres estados:** un artículo sin `agente` no está declarado
  (quizá le toque después); `agente: false` declara la decisión de no
  acompañarlo (la opción de las piezas meta y de cualquier artículo
  que no se beneficie del acompañamiento). Ausente y `false` no son lo
  mismo: el segundo es decisión editorial explícita.
- **Las pausas** se escriben donde ocurren, con un bloque `:::pausa`
  en línea propia cuyo contenido es la verificación de la pausa (qué
  debe poder decir o hacer el lector para seguir). El orden en el
  texto da la numeración (Pausa 1, 2…) y cada pausa viaja con su
  contenido al editar.

  ```md
  :::pausa
  Explica con tus palabras por qué el estado vive en un solo lugar
  antes de seguir.
  :::
  ```

  El bloque siempre se cierra con `:::` en línea propia: sin el cierre
  el bloque se traga el resto del texto sin avisar.

- **Dónde poner pausas:** al cerrar una unidad de sentido que exige
  comprensión (un concepto nuevo, un resultado contraintuitivo), no
  tras la mecánica. Dos o tres por post suelen bastar: cada pausa es
  un punto donde perderse cuesta caro.

## Piezas interactivas

Los artículos pueden hospedar piezas interactivas (demos, simulaciones,
visualizaciones instrumentadas) declaradas en el cuerpo del texto con
una directiva de contenedor:

```md
:::demo{nombre="store-reactivo"}
Pieza interactiva: el _store_ del artículo, funcionando. El lector
pulsa **+** y observa cómo cambia el estado interno.
:::
```

- **`nombre` es obligatorio** y selecciona el artefacto de la pieza en
  `site/src/demos/<nombre>/index.ts`. Los demás atributos de la
  directiva (`{modo="pasos"}`…) llegan al elemento como configuración.
  `altura="320px"` reserva altura mínima para que la pieza no desplace
  el texto al montar; se escribe en el HTML, así que el espacio está
  ahí desde el primer render (solo para quien tiene JavaScript: sin él
  el marco envuelve únicamente el fallback). Si la pieza se reorganiza
  en pantallas estrechas, `altura-estrecha` da la altura para ≤657px.
  Ambas aceptan una longitud CSS simple (`760px`, `clamp(…)`); se
  calibran midiendo la pieza montada, no a ojo.
- **El cuerpo de la directiva es el fallback**, escrito en markdown
  pleno. Sirve a tres lectores: el humano sin JavaScript, el humano que
  aún está cargando la página y el agente que lee el `.md` del artículo.
  Se escribe como descripción honesta estilo figura —qué es la pieza,
  qué hace, qué puede tocar el lector— y se evalúa como prompt para el
  agente, no solo como prosa.
- **Cada pieza es un artefacto propio:** un directorio
  `site/src/demos/<nombre>/` cuyo `index.ts` exporta
  `mount(host, container)`. Recibe el elemento `fronteando-demo` y un
  fragmento donde construir su interfaz —controles nativos, estilos con
  los tokens `--*` de `DESIGN.md`, que cruzan el límite del shadow DOM—
  y puede devolver una función de limpieza. La pieza se ejecuta en
  shadow DOM: aislada de los estilos de la página, pero heredando los
  tokens.
- **Las piezas se escriben en Svelte** compilado a custom elements:
  un `piece.svelte` con `<svelte:options customElement="demo-x" />`
  junto al `index.ts`, que importa el componente y lo monta con
  `container.appendChild(document.createElement("demo-x"))`. Los
  estilos scoped del componente viven en su propio shadow y los
  tokens `--*` los alcanzan por herencia. La pieza `contador` es la
  implementación de referencia del convenio.
- **Tipos de pieza** (vocabulario del género, ver
  `docs/research/2026-10-el-genero-explorable-explanations.md`):
  simulación jugable, vista instrumentada de un sistema, stepper guiado
  y documento reactivo.
- **Sin JavaScript la página no se rompe:** el lector ve el fallback en
  el lugar de la pieza, y si el `nombre` no tiene artefacto registrado
  el fallback también permanece. Nunca se publica una pieza cuyo
  fallback sea vacío o engañoso.
- **La pieza es parte del artículo, no decoración:** se declara donde
  el texto la necesita, es operable por teclado y respeta
  `prefers-reduced-motion`.

## Taxonomía

Las categorías separan; los tags unen. Reglas de la casa:

- **Una categoría por post.** Es vocabulario cerrado (lo fija el
  esquema): elegirla es una decisión, no un relleno. Las categorías
  son especializaciones ortogonales, no tecnologías (`javascript` no
  es categoría porque casi todo el blog lo usa; es tag). La prueba:
  si dos categorías pueden reclamar el mismo post, la taxonomía está
  mal, no el post.
- **Los tags son específicos y varios:** tecnologías, conceptos, APIs.
  Planos, sin jerarquía; se reutilizan los existentes antes de
  inventar uno nuevo.
- **Ningún término vive en ambas listas.** Lo que es categoría no es
  tag y viceversa (el solape rompe el filtrado y confunde al lector).
- **Agregar una categoría** abre un pilar del blog: es cambio de
  esquema y decisión editorial, no un campo de texto libre.

## Niveles de edición

El flujo de escritura separa dos niveles, los de la taxonomía
editorial estándar:

- **Sustantiva** (estructura, promesa, veracidad, adecuación a la
  audiencia): la hace `revisar-post` con contexto aislado, verificando
  contra esta guía y ejecutando el código contra la prosa.
- **Mecánica** (estilo, ortografía, ortotipografía): la hace la ronda
  de escritura (`revisar-redaccion` y luego `pulir-escritura`) dentro
  de `redactar-post`.

**Regla dura:** la mecánica corre sobre la versión final. Cualquier
párrafo reescrito tras la ronda (por revisión técnica o editorial)
necesita una pasada nueva sobre lo cambiado.

## Manuales de referencia

Jerarquía, como en las guías canónicas:

1. **Esta guía**: manda en todo lo que declara.
2. **Los skills genéricos**: `revisar-redaccion` (consistencia,
   anglicismos, ritmo) y `pulir-escritura` (RAE, Fundéu,
   ortotipografía) para lo que esta guía no cubre.
3. **La práctica del propio blog**: cuando la regla no está escrita,
   el precedente manda; la excepción consistente se anota y se vuelve
   regla.

## Palabras problemáticas

| Proscrito                                                      | Usar                                        |
| -------------------------------------------------------------- | ------------------------------------------- |
| «corrida»                                                      | «ejecución»                                 |
| «corre X» transitivo («corre `fn`»)                            | «ejecuta X» («corre» intransitivo admitido) |
| «Con eso dicho»                                                | «Y sin embargo», «Dicho esto»               |
| «simplemente», «obviamente», «fácil», «solo hay que»           | (suprimir)                                  |
| nominalizaciones que esconden el verbo («la suscripción de X») | el verbo («suscribirse a X»)                |

La tabla crece con cada corrección del usuario (toda palabra
prohibida entra con su sustituto).

## Ejemplos de la casa

- Gancho con negación: «Parece magia. No lo es.»
- Resultado primero: «Antes de desmontar la magia conviene verla
  funcionar.»
- Límite honesto: «Nuestro efecto reescribe `document.title` entero;
  escalar eso al DOM es justamente lo que los frameworks resuelven.»
- Cierre con puerta: «De esa pregunta va la siguiente serie.»

## Fuera de alcance

- **Documentación del proyecto** (task files, investigaciones,
  decisiones): se rigen por los skills genéricos, no por esta guía.
- **Mantenimiento de publicados** (corregir o actualizar artículos
  que envejecen: tensión conocida, declarada en
  `docs/research/2026-10-procesos-gestion-editorial.md`, sin proceso
  aún.
