import "./store-demo.svelte";
import type { DemoModule } from "../fronteando-demo";

// The store piece compiles to <demo-store-reactivo>; the adapter only
// places it inside the host fragment, as with every Svelte CE piece.
export const mount: DemoModule["mount"] = (_host, container) => {
  container.appendChild(document.createElement("demo-store-reactivo"));
};
