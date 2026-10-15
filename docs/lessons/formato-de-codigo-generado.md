# Formato del código generado

## Lecciones

- **Escribir el código nuevo directamente en el estilo del formatter del proyecto, o pasar el formatter antes de presentarlo.** Por qué: al crear los archivos del andamiaje de `site/` se escribieron con tabs y comillas simples —estilo ajeno a la configuración de Prettier (dos espacios, comillas dobles)— y el usuario tuvo que reformatearlos; el estilo correcto debe salir desde la escritura, no de un pase posterior.
  Disparadores: prettier, format, formatter, .astro, astro.config, archivos nuevos, código generado
  Origen: 20261015T134400
