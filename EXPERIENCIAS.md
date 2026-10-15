# Experiencias

<!-- Registro append-only de las correcciones que el usuario hace al agente
     durante la ejecución de tareas. Cada entrada documenta la brecha entre
     el resultado esperado y el obtenido.

     Las entradas nunca se editan ni se borran. Gestionado por el skill
     destilar-lecciones. -->

- Id: 20261015T134400
  Tarea: docs/tasks/001-andamiaje-del-sitio.md
  Esperado: el código nuevo sale ya conforme al formatter del proyecto —Prettier: dos espacios, comillas dobles—
  Obtenido: los archivos .astro y astro.config.mjs se escribieron con indentación de tabs y comillas simples, estilo ajeno al del proyecto
  Corrección: escribir el código directamente en el estilo del formatter del proyecto —o pasar el formatter antes de presentarlo— en lugar de confiar en un pase posterior
  Estado: consolidada
