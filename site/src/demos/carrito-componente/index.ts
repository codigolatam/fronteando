import "./cart-component-demo.svelte";
import type { DemoModule } from "../fronteando-demo";

// The two-instance piece compiles to <demo-carrito-componente>; the
// adapter places it in the host fragment.
export const mount: DemoModule["mount"] = (_host, container) => {
  const piece = document.createElement("demo-carrito-componente");
  container.appendChild(piece);
};
