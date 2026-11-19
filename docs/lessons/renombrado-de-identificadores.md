# Renombrado de identificadores

## Lecciones

- **Protege las cadenas visibles y los comentarios antes de renombrar, y revisa el diff de cada archivo además de los tests.** Por qué: un script de renombrado alteró «el carrito cuadra», «El modelo» y un valor dentro de una cadena de la demo; los tests pasaban porque no fijaban esas cadenas.
  Disparadores: renombrar, renombrado, identificador, sustituir, script, traducir, inglés, cadena visible, código
  Origen: 20261119T162545

- **Tras una transformación automática, verifica con diff y grep que cambió exactamente lo previsto.** Por qué: un perl sin `-p` no procesó ningún archivo, y una frase con carácter no ASCII no se protegió por falta de `use utf8`; nada avisó.
  Disparadores: perl, sed, script, transformación, regex, utf8, sustitución, codificación
  Origen: 20261119T162546

- **Busca en todo el repositorio los nombres que cruzan archivos antes y después de renombrarlos.** Por qué: `demo-carrito` cambió en el componente y no en su adaptador; la demo no se montaba y los tests no lo detectaron.
  Disparadores: custom element, etiqueta, componente, adaptador, svelte, renombrar, clave, atributo, mount
  Origen: 20261119T162547

- **Los valores de la sintaxis de una directiva son contrato con el contenido, no identificadores.** Por qué: `modo="cantidad"` pasó a `"quantity"` y dejó de coincidir con el post que lo declara.
  Disparadores: directiva, :::demo, modo, atributo, contrato, valor, markdown, frontmatter
  Origen: 20261119T162548
