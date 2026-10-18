# Serie MVC en vanilla JS

- estado: propuesta
- **Pregunta del arco:** ¿cómo estructuro un componente sin framework sin que el estado, los manejadores de eventos y el DOM se enreden en espagueti inmantenible?
- **Ángulo:** MVC construido pieza a pieza a mano en JavaScript vanilla, con la justificación de cada separación hecha visible (el patrón que el lector asocia a backends o a frameworks); la comprensión por contraste explica qué problema resolvieron después la reactividad y los signals.
- **Soporte:** un componente real que el lector lleva del espagueti al MVC completo (modelo con notificación, vista como función del estado, controlador cerrando el ciclo); el arco deja en cada post una pieza funcional y una pregunta abierta, y cierra enlazando de vuelta al post del store reactivo.
- **Próximo paso:** decidir el componente conductor y el número de posts del arco; el despliegue crea una pieza por post.
- **Notas sueltas:** hermana del post del mini-store ya publicado (este enseñó cómo se sincroniza el estado con la vista; la serie enseña cómo se estructura todo lo demás); primera serie del blog como formato editorial; migra de `docs/ideas/007`.

## Piezas

[por desplegar: al decidirse el arco, cada post nace como pieza en `piezas/` con `- serie:` apuntando aquí]
