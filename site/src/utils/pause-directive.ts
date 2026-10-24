import type { MdastPluginDefinition } from "satteri";

// Renders each :::pausa block as a collapsed checkpoint — only when the
// article declares accompaniment (agente in frontmatter).
export const pauseDirective: MdastPluginDefinition = {
  name: "pause",
  containerDirective(node, ctx) {
    if (node.name !== "pausa") return;
    const declaration = ctx.data.astro?.frontmatter?.agente;
    if (typeof declaration !== "object" || declaration === null) return;
    ctx.setProperty(node, "data", {
      hName: "details",
      hProperties: { className: ["pause"] },
    });
    ctx.prependChild(node, {
      type: "html",
      value: "<summary>pausa</summary>",
    });
  },
};
