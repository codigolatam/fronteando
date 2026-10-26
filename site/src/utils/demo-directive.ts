import type { MdastPluginDefinition } from "satteri";

// Heights the author reserves for the piece, by attribute. They travel
// in the markup as custom properties —not as an attribute the element
// reads once JavaScript runs— so the space is held from the first
// render, before the piece upgrades.
const HEIGHT_PROPERTIES = {
  altura: "--demo-min-height",
  "altura-estrecha": "--demo-min-height-narrow",
} as const;

// Plain CSS lengths and math (800px, clamp(…, 40vw, …)); anything else
// would let an attribute write arbitrary declarations into the style.
const CSS_LENGTH = /^[\w\s.,%()+*/-]+$/;

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

    const declarations: string[] = [];
    for (const [attribute, property] of Object.entries(HEIGHT_PROPERTIES)) {
      const height = hProperties[attribute]?.trim();
      if (!height) continue;
      if (!CSS_LENGTH.test(height)) {
        ctx.report({
          message: `the "${attribute}" attribute of :::demo must be a CSS length, got "${height}"`,
          node,
          severity: "error",
        });
        return;
      }
      declarations.push(`${property}: ${height}`);
    }
    if (declarations.length > 0) hProperties["style"] = declarations.join("; ");

    ctx.setProperty(node, "data", {
      hName: "fronteando-demo",
      hProperties,
    });
  },
};
