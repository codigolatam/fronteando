import { describe, expect, it, vi } from "vitest";
import { markdownToHtml } from "satteri";
import { demoDirective } from "./demo-directive";
import { pauseDirective } from "./pause-directive";

// Structural stand-in for the satteri visitor context: the plugin reads
// the directive name and attributes, and records mutations/diagnostics.
function visitDirective(
  name: string,
  attributes?: Record<string, string | null>,
) {
  const node = { type: "containerDirective", name, attributes };
  const ctx = {
    setProperty: vi.fn(),
    report: vi.fn(),
  };
  demoDirective.containerDirective?.(node as never, ctx as never);
  return ctx;
}

describe("demoDirective", () => {
  describe("when the directive declares a piece", () => {
    it("renders it as a fronteando-demo element carrying nombre", () => {
      const ctx = visitDirective("demo", { nombre: "store-reactivo" });
      expect(ctx.setProperty).toHaveBeenCalledWith(expect.anything(), "data", {
        hName: "fronteando-demo",
        hProperties: { nombre: "store-reactivo" },
      });
    });

    it("forwards the rest of the attributes to the element", () => {
      const ctx = visitDirective("demo", {
        nombre: "store-reactivo",
        modo: "pasos",
      });
      expect(ctx.setProperty).toHaveBeenCalledWith(expect.anything(), "data", {
        hName: "fronteando-demo",
        hProperties: { nombre: "store-reactivo", modo: "pasos" },
      });
    });

    it("reserves the declared heights in the markup as custom properties", () => {
      const ctx = visitDirective("demo", {
        nombre: "store-reactivo",
        altura: "800px",
        "altura-estrecha": "clamp(1000px, 300vw, 1300px)",
      });
      expect(ctx.setProperty).toHaveBeenCalledWith(expect.anything(), "data", {
        hName: "fronteando-demo",
        hProperties: {
          nombre: "store-reactivo",
          altura: "800px",
          "altura-estrecha": "clamp(1000px, 300vw, 1300px)",
          style:
            "--demo-min-height: 800px; --demo-min-height-narrow: clamp(1000px, 300vw, 1300px)",
        },
      });
    });

    it("emits no style when no height is declared", () => {
      const ctx = visitDirective("demo", { nombre: "x" });
      const [, , data] = ctx.setProperty.mock.calls[0];
      expect(data.hProperties).not.toHaveProperty("style");
    });

    it("trims whitespace around nombre", () => {
      const ctx = visitDirective("demo", { nombre: " store-reactivo " });
      expect(ctx.setProperty).toHaveBeenCalledWith(expect.anything(), "data", {
        hName: "fronteando-demo",
        hProperties: { nombre: "store-reactivo" },
      });
    });

    it("emits flag attributes without value as empty attributes", () => {
      const ctx = visitDirective("demo", { nombre: "x", estatico: null });
      expect(ctx.setProperty).toHaveBeenCalledWith(expect.anything(), "data", {
        hName: "fronteando-demo",
        hProperties: { nombre: "x", estatico: "" },
      });
    });
  });

  describe("when the directive lacks a piece name", () => {
    it("reports a build diagnostic and emits no element", () => {
      const ctx = visitDirective("demo", { modo: "pasos" });
      expect(ctx.report).toHaveBeenCalledWith(
        expect.objectContaining({ severity: "error" }),
      );
      expect(ctx.setProperty).not.toHaveBeenCalled();
    });

    it("reports a diagnostic when nombre is empty", () => {
      const ctx = visitDirective("demo", { nombre: "" });
      expect(ctx.report).toHaveBeenCalledWith(
        expect.objectContaining({ severity: "error" }),
      );
      expect(ctx.setProperty).not.toHaveBeenCalled();
    });
  });

  describe("when a declared height is not a plain CSS length", () => {
    it("reports a build diagnostic instead of writing it into the style", () => {
      const ctx = visitDirective("demo", {
        nombre: "x",
        altura: "1px; background: red",
      });
      expect(ctx.report).toHaveBeenCalledWith(
        expect.objectContaining({ severity: "error" }),
      );
      expect(ctx.setProperty).not.toHaveBeenCalled();
    });
  });

  describe("when the directive is not a demo block", () => {
    it("ignores it", () => {
      const ctx = visitDirective("pausa", { nombre: "x" });
      expect(ctx.setProperty).not.toHaveBeenCalled();
      expect(ctx.report).not.toHaveBeenCalled();
    });
  });

  describe("when compiled through satteri", () => {
    const compile = async (source: string) => {
      const result = await markdownToHtml(source, {
        features: { directive: true },
        mdastPlugins: [pauseDirective, demoDirective],
        data: {
          astro: {
            frontmatter: { agente: { tema: "x" } },
            headings: [],
            localImagePaths: new Set<string>(),
            remoteImagePaths: new Set<string>(),
          },
        },
      });
      return result.html;
    };

    it("emits the element with the fallback rendered as children", async () => {
      const html = await compile(
        ':::demo{nombre="store-reactivo"}\nDemo del *store*.\n:::\n',
      );
      expect(html).toContain('<fronteando-demo nombre="store-reactivo">');
      expect(html).toContain("Demo del <em>store</em>.");
      expect(html).toContain("</fronteando-demo>");
    });

    it("leaves :::pausa and the rest of the document intact", async () => {
      const html = await compile(
        ':::pausa\nVerifica la pausa.\n:::\n\n:::demo{nombre="x"}\nPieza.\n:::\n',
      );
      expect(html).toContain("<details");
      expect(html).toContain("Verifica la pausa.");
      expect(html).toContain('<fronteando-demo nombre="x">');
    });
  });
});
