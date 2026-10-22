# Planeador editorial

Pipeline de contenido de Fronteando. La unidad publicable es la pieza (un post): cada una vive en `piezas/<slug>.md` y aparece aquí bajo su estado del kanban. Apuntar una pieza en `idea` no implica intención de escribirla; solo pasa a `lista` cuando reúne los tres requisitos verificables: pregunta del lector, ángulo y soporte.

Una serie es un arco de varios posts: vive en `series/<slug>.md` con el marco del arco (pregunta, ángulo y soporte a nivel de serie) y la lista de sus piezas. Las series no ocupan el kanban (no son publicables ellas, lo son sus piezas): figuran en la sección `series` con su estado propio como sufijo (`propuesta` | `en curso`) mientras están activas, y su línea se retira cuando la última pieza queda publicada.

Las ideas de contenido viven aquí; las de producto y siguientes líneas del proyecto viven en `docs/ideas/`. Los briefs de preparación viven en `briefs/<slug>.md` (decisión D003). El gestor es el skill `gestionar-piezas`.

## idea

## lista

- [El Modelo: el estado que notifica](piezas/mvc-modelo.md)
- [La Vista: el render como función del estado](piezas/mvc-vista.md)
- [El Controlador: cerrar el ciclo](piezas/mvc-controlador.md)
- [Los límites del MVC a mano](piezas/mvc-limites.md)

## en redacción

## en revisión

- [El carrito a lo bruto: construir un componente sin patrón](piezas/carrito-a-lo-bruto.md)

## publicado

- [Un store reactivo en vanilla JS](../../site/src/content/articulos/un-store-reactivo-en-vanilla-js.md)

## series

- [Serie MVC en vanilla JS](series/mvc-en-vanilla-js.md) — en curso

