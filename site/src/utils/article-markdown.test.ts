import { describe, expect, it } from "vitest";
import type { CollectionEntry } from "astro:content";
import { markdownDocumentOf } from "./article-markdown";

type Data = CollectionEntry<"articulos">["data"];

// Structural stand-in for a collection entry: markdownDocumentOf
// only reads id, body and data.title.
function article(
  over: { id?: string; body?: string; data?: Partial<Data> } = {},
): CollectionEntry<"articulos"> {
  return {
    id: over.id ?? "carrito-a-lo-bruto",
    body: over.body ?? "",
    data: { title: "El carrito a lo bruto", ...over.data },
  } as CollectionEntry<"articulos">;
}

const body = [
  "Intro al carrito.",
  "",
  "## Estado compartido",
  "",
  "Una lista:",
  "",
  "- estado",
  "- acciones",
  "",
  "```js",
  "const estado = {};",
  "```",
  "",
  "Un [enlace](https://example.com) y `código` en línea.",
  "",
  ":::pausa",
  "Verifica que puedas explicar el `estado` *compartido*.",
  ":::",
  "",
  "Cierre del artículo.",
].join("\n");

describe("markdownDocumentOf", () => {
  it("opens with the title and the canonical URL before the body", () => {
    const out = markdownDocumentOf(article({ body }));
    expect(out.startsWith("# El carrito a lo bruto\n")).toBe(true);
    expect(out).toContain(
      `URL canónica: ${import.meta.env.SITE}/articulos/carrito-a-lo-bruto/\n`,
    );
    expect(out.indexOf("URL canónica:")).toBeLessThan(
      out.indexOf("Intro al carrito."),
    );
  });

  it("reproduces the body intact: headings, code, lists and links", () => {
    const out = markdownDocumentOf(article({ body }));
    expect(out).toContain("## Estado compartido");
    expect(out).toContain("- estado\n- acciones");
    expect(out).toContain("```js\nconst estado = {};\n```");
    expect(out).toContain("[enlace](https://example.com)");
    expect(out).toContain("`código`");
    expect(out).toContain("Cierre del artículo.");
  });

  it("keeps the :::pausa markers at their reading position", () => {
    const out = markdownDocumentOf(article({ body }));
    const pause = out.indexOf(":::pausa");
    expect(pause).toBeGreaterThan(-1);
    expect(pause).toBeGreaterThan(out.indexOf("`código` en línea."));
    expect(pause).toBeLessThan(out.indexOf("Cierre del artículo."));
    expect(out).toContain(
      ":::pausa\nVerifica que puedas explicar el `estado` *compartido*.\n:::",
    );
  });

  it("carries no accompaniment material: no protocol, no card fields", () => {
    const out = markdownDocumentOf(
      article({ body, data: { agente: { tema: "tema", prerequisitos: [] } } }),
    );
    expect(out).not.toContain("# Lectura acompañada");
    expect(out).not.toContain("## Ficha del artículo");
    expect(out).not.toContain("Tema:");
    expect(out).not.toContain("Prerequisitos:");
  });

  it("produces the document regardless of the agente declaration", () => {
    const optOut = markdownDocumentOf(
      article({ body, data: { agente: false } }),
    );
    const undeclared = markdownDocumentOf(article({ body }));
    const declared = markdownDocumentOf(
      article({ body, data: { agente: { tema: "t", prerequisitos: [] } } }),
    );
    expect(optOut).toBe(undeclared);
    expect(declared).toBe(undeclared);
  });
});
