import "./view-demo.svelte";
import type { DemoModule } from "../fronteando-demo";

// The instrumented view compiles to <demo-vista-instrumentada>; the
// adapter places it in the host fragment.
export const mount: DemoModule["mount"] = (_host, container) => {
  container.appendChild(document.createElement("demo-vista-instrumentada"));
};
