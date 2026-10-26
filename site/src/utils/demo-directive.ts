import type { MdastPluginDefinition } from "satteri";

// Renders each :::demo{nombre="…"} block as a <fronteando-demo> custom
// element: nombre selects the artifact under src/demos/, every other
// attribute travels to the element as configuration, and the
// directive's children stay inside as the fallback —visible without
// JavaScript and legible in the article's .md—.
export const demoDirective: MdastPluginDefinition = {
  name: "demo",
  containerDirective(node, ctx) {
    if (node.name !== "demo") return;
    const pieceName = node.attributes?.["nombre"];
    if (typeof pieceName !== "string" || pieceName.trim() === "") {
      ctx.report({
        message: 'the :::demo directive requires a "nombre" attribute',
        node,
        severity: "error",
      });
      return;
    }
    const hProperties: Record<string, string> = {};
    for (const [key, value] of Object.entries(node.attributes ?? {})) {
      if (value !== undefined) hProperties[key] = value ?? "";
    }
    hProperties["nombre"] = pieceName.trim();
    ctx.setProperty(node, "data", {
      hName: "fronteando-demo",
      hProperties,
    });
  },
};
