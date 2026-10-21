# Serie MVC en vanilla JS

- estado: en curso
- **Pregunta del arco:** ¿cómo estructuro un componente sin framework sin que el estado, los manejadores de eventos y el DOM se enreden en espagueti inmantenible?
- **Ángulo:** MVC construido pieza a pieza a mano en JavaScript vanilla, con la justificación de cada separación hecha visible (el patrón que el lector asocia a backends o a frameworks); la comprensión por contraste explica qué problema resolvieron después la reactividad y los signals.
- **Soporte:** un componente real que el lector lleva del espagueti al MVC completo (modelo con notificación, vista como función del estado, controlador cerrando el ciclo); el arco deja en cada post una pieza funcional y una pregunta abierta, y cierra enlazando de vuelta al post del store reactivo.
- **Próximo paso:** escribir el capítulo 1 (carrito a lo bruto) — pieza enlazada desde la tarea 018; el resto del arco espera en `lista`.
- **Notas sueltas:** hermana del post del mini-store ya publicado (este enseñó cómo se sincroniza el estado con la vista; la serie enseña cómo se estructura todo lo demás); primera serie del blog como formato editorial; migra de `docs/ideas/007`.

## Piezas

Componente conductor: el carrito de la compra, que el lector lleva del espagueti al MVC completo.

1. [El carrito a lo bruto: construir un componente sin patrón](../piezas/carrito-a-lo-bruto.md) — el problema sentido y el diagnóstico del enredo.
2. [El Modelo: el estado que notifica](../piezas/mvc-modelo.md) — el estado sale del DOM y anuncia sus cambios.
3. [La Vista: el render como función del estado](../piezas/mvc-vista.md) — la pantalla se regenera desde el modelo.
4. [El Controlador: cerrar el ciclo](../piezas/mvc-controlador.md) — los eventos se vuelven acciones y el ciclo se cierra.
5. [Los límites del MVC a mano](../piezas/mvc-limites.md) — dónde cede el patrón y qué problema resolvió la reactividad.
