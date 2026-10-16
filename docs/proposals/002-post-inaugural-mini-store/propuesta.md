# Post inaugural: mini store reactivo en vanilla JS

## Estado

[ ] Borrador | [p] Pendiente de revisión | **[a] Aprobada** | [d] Descartada

## Problema

El lector de frontend usa a diario la reactividad de los frameworks —`ref()`, `signal()`, estado que «se actualiza solo»— como una caja negra: la magia funciona, pero no sabe qué hay debajo ni por qué esa forma concreta. Esa opacidad tiene un coste pedagógico real: sin el mecanismo, solo queda memorizar APIs.

Para el blog hay un segundo problema, simétrico: la línea editorial de lectura acompañada necesita un artículo real sobre el que descubrir la forma de sus estructuras. Sin contenido técnico publicado, el protocolo de acompañamiento se diseñaría a ciegas —checkpoints, bootstrap y material sin un texto que los ponga a prueba.

## Oportunidad

Resolverlo con un solo post autónomo —la reactividad implementada desde cero en vanilla JS— produce el «ajá» más fuerte posible como carta de presentación del blog: la magia de los frameworks deja de serlo. A la vez, su escritura y lectura son el experimento que dimensiona las estructuras de acompañamiento de la línea 002, sin depender de infraestructura nueva y publicable de inmediato. Supera a la alternativa obvia —la serie MVC— en velocidad: un post se publica antes que cinco.

## Forma de solución

Un artículo nuevo publicado en la colección del blog que lleva al lector a construir, paso a paso y sobre un único ejemplo, un store reactivo mínimo en JavaScript vanilla —desde la suscripción manual de cambios hasta el registro automático de dependencias—, cerrando con los límites honestos de la pieza y su relación con la reactividad que los frameworks dan por hecha. Categoría: paso nuevo en un flujo existente — el flujo de lectura ya existe; falta el primer eslabón de contenido técnico.

## Solución

Redactar y publicar el post inaugural siguiendo el plan de redacción aprobado en la idea: un único ejemplo conductor —un contador que se actualiza solo en el DOM— llevado de punta a punta por el arco de seis pasos: gancho con el resultado final, estado que notifica con suscripción manual, el truco del `efectoActivo` que autorregistra dependencias, la `store` generalizada con `Proxy`, los límites honestos de la pieza y el cierre que reconoce `signal()`/`ref()` como esta misma idea vestida de API y abre la puerta a la serie de patrones. El post se publica como artículo estándar —texto y código copiable—, sin estructuras de acompañamiento, que llegarán con la línea 002 en una reescritura posterior.

## Alternativas consideradas

- La serie MVC como contenido inaugural: se descarta — un post único se publica antes y prueba la línea editorial ya; la serie queda como línea posterior (idea 007) y se beneficia del post.
- Ensayo conceptual sin construcción ejecutable: se descarta — el valor del post es que el lector escriba la pieza y vea la magia desmontarse línea a línea; el concepto leído sin tocar no produce el «ajá».
- Publicar directamente con estructuras de acompañamiento: se descarta — la línea 002 aún no las define; el post va primero precisamente para revelar su forma sobre contenido real.

## Fuera de alcance

- Bootstrap, checkpoints y demás material de acompañamiento — lo define la línea 002.
- Demos interactivas embebidas en la página (línea 004) — el código del post es copiable, no ejecutable in situ.
- Implementación completa de un framework — batching, diffing del DOM, schedulers, cleanup robusto —; el post llega hasta el mecanismo honesto.
- Versiones `.md`/`llms.txt` del contenido (línea 003).

## Investigaciones de apoyo

- Prueba de concepto ejecutada durante el refinamiento: `signal` + `effect` con auto-registro de dependencias y `store` sobre `Proxy` con suscriptores por propiedad verificados corriendo en Node — el código del post está probado antes de escribirse.

## Borradores

- `docs/tasks/011-redactar-post-mini-store.md` — redactar y publicar el post inaugural

## Revisión

- Usuario: 2026-10-16 — Aprueba
