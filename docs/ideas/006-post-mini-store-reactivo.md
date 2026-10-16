# Mini store reactivo: el post inaugural técnico

> **Tipo:** idea de contenido — post único (complejidad media)
> **Fecha:** 2026-10
> **Orden sugerido:** 1 de 2 (contenido técnico) — post autónomo que prueba la línea editorial sin esperar a la infraestructura de acompañamiento.

## Problema

El lector de frontend usa a diario la reactividad de los frameworks —`ref()`, `signal()`, estado que «se actualiza solo»— como una caja negra: la magia funciona, pero no sabe qué hay debajo ni por qué esa forma concreta. Esa opacidad tiene un coste pedagógico real: sin el mecanismo, solo queda memorizar APIs. Y para el blog hay un segundo problema: la línea editorial de lectura acompañada necesita un artículo real sobre el que descubrir la forma de sus estructuras —sin contenido, el protocolo se diseñaría a ciegas.

## Qué desbloquea

- **El mecanismo desmitificado:** la reactividad de los frameworks reducida a lo que es —registro de dependencias al leer, notificación al escribir— implementable en vanilla JS.
- **El primer contenido técnico del blog:** un post completo sobre el que probar y descubrir la forma de la lectura acompañada.
- **El puente a la serie de patrones:** el store deja planteada la pregunta que la serie MVC responde —cómo estructurar, no solo cómo sincronizar—.

## Flujos de trabajo que se hacen viables

- El lector construye `signal`, `effect` y una `store` con `Proxy` paso a paso, y ve la UI actualizarse sin cablear nada a mano.
- El lector vuelve a `ref()` o `signal()` de su framework reconociendo la misma idea vestida de API.
- El autor reescribe el post con las estructuras de acompañamiento cuando la línea 002 las defina, con evidencia real de dónde se necesitan.

## Ventajas como producto

- **El «ajá» como carta de presentación:** desmontar la magia de los frameworks en ~50 líneas es la promesa editorial más fuerte que puede hacer un post inaugural.
- **Material de descubrimiento:** su escritura y lectura son el experimento que dimensiona checkpoints, bootstrap y demás piezas de la línea editorial.
- **Velocidad:** un solo post, sin depender de infraestructura nueva, publicable de inmediato.

## Plan de redacción

**Audiencia:** quien conoce JS moderno básico —closures, getters, `Set`, `Proxy` de nombre—, usa u oye hablar de frameworks y nunca ha mirado debajo de la reactividad.

**Promesa:** «la reactividad de los frameworks modernos cabe en ~50 líneas de vanilla JS; al escribirla dejas de usar magia».

**Ejemplo conductor:** un contador visible en el DOM —botón que incrementa y `document.title`/párrafo que se actualizan solos—; un solo ejemplo llevado de punta a punta.

**Arco del post:**

1. El gancho — el resultado primero: `count.value++` y la pantalla se actualiza sola. Prometer desmontar la magia.
2. Estado que notifica — getter/setter con un `Set` de suscriptores y suscripción *manual*: primero se siente lo tedioso de registrar a mano.
3. El truco — `efectoActivo` global: cada `effect` se autorregistra en los signals que lee. El momento ajá del post.
4. Generalizar — `store` sobre `Proxy` para objetos con varias propiedades, cada una con sus suscriptores.
5. Los límites honestos — cleanup de efectos, re-render sin diffing, batching ausente: esto no es un framework, es su corazón. Puente: los frameworks añaden render eficiente y ergonomía sobre esta misma idea.
6. Cierre — el lector reconoce `ref()`/`signal()` como esto mismo vestido de API, y queda planteada la pregunta que abre la serie MVC: sincronizar ya no cuesta, ¿cómo se estructura el resto?

**Alcance del post base:** artículo estándar del sitio —texto y bloques de código copiables—, sin bootstrap ni checkpoints; la reescritura con las estructuras de acompañamiento llega con la línea 002, que este post sirve para dimensionar.

## Tensión que introduce en el roadmap

Condiciona a `lectura-acompanada-por-llm`: el protocolo se diseña sobre este post real, así que el contenido va primero y la infraestructura editorial se dimensiona contra él. Comparte arco temático con su hermana `serie-mvc-en-vanilla-js`: el store responde «cómo sincroniza» y la serie responde «cómo estructurar»; leídas en ese orden se refuerzan.
