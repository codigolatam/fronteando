import { describe, expect, it, vi } from "vitest";
import { pauseDirective } from "./pause-directive";

// Structural stand-in for the satteri visitor context: the plugin only reads
// the directive name and the frontmatter declaration, and records mutations.
function visitDirective(name: string, agente: unknown) {
  const node = { type: "containerDirective", name };
  const ctx = {
    data: { astro: { frontmatter: { agente } } },
    setProperty: vi.fn(),
    prependChild: vi.fn(),
  };
  pauseDirective.containerDirective?.(node as never, ctx as never);
  return ctx;
}

describe("pauseDirective", () => {
  describe("when the article declares accompaniment", () => {
    it("renders the pause block as a details element", () => {
      const ctx = visitDirective("pausa", { tema: "un carrito" });
      expect(ctx.setProperty).toHaveBeenCalledWith(expect.anything(), "data", {
        hName: "details",
        hProperties: { className: ["pause"] },
      });
    });

    it("prefixes the pause block with its summary", () => {
      const ctx = visitDirective("pausa", { tema: "un carrito" });
      expect(ctx.prependChild).toHaveBeenCalledWith(expect.anything(), {
        type: "html",
        value: "<summary>pausa</summary>",
      });
    });
  });

  describe("when the article does not declare accompaniment", () => {
    it("leaves the pause block unrendered without an agente field", () => {
      const ctx = visitDirective("pausa", undefined);
      expect(ctx.setProperty).not.toHaveBeenCalled();
      expect(ctx.prependChild).not.toHaveBeenCalled();
    });

    it("leaves the pause block unrendered on explicit opt-out", () => {
      const ctx = visitDirective("pausa", false);
      expect(ctx.setProperty).not.toHaveBeenCalled();
      expect(ctx.prependChild).not.toHaveBeenCalled();
    });
  });

  describe("when the directive is not a pausa block", () => {
    it("ignores it even when the article declares accompaniment", () => {
      const ctx = visitDirective("nota", { tema: "un carrito" });
      expect(ctx.setProperty).not.toHaveBeenCalled();
    });
  });
});
