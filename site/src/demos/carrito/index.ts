import "./cart-demo.svelte";
import type { DemoModule } from "../fronteando-demo";

// The cart piece compiles to <demo-carrito>; the adapter places it in
// the host fragment and forwards the directive's `modo` attribute —
// "cantidad" mounts the buggy second listing instead.
export const mount: DemoModule["mount"] = (host, container) => {
  const piece = document.createElement("demo-carrito");
  const modo = host.getAttribute("modo");
  if (modo) piece.setAttribute("modo", modo);
  container.appendChild(piece);
};
