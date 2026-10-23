import { describe, expect, it } from "vitest";
import type { CollectionEntry } from "astro:content";
import { pausesOf, protocolOf } from "./accompaniment";

type Data = CollectionEntry<"articulos">["data"];

// Structural stand-in for a collection entry: protocolOf only reads
// id, body and data.agente / data.nivel.
function article(
  over: { id?: string; body?: string; data?: Partial<Data> } = {},
): CollectionEntry<"articulos"> {
  return {
    id: over.id ?? "carrito-a-lo-bruto",
    body: over.body ?? "",
    data: over.data ?? {},
  } as CollectionEntry<"articulos">;
}

const declared = {
  tema: "un carrito construido sin patrón",
  prerequisitos: ["javascript básico", "DOM"],
};

const withPauses = [
  "Intro.",
  "",
  ":::pausa",
  "Verifica que puedas explicar el `estado` *compartido*.",
  ":::",
  "",
  "Medio.",
  "",
  ":::pausa",
  "Verifica por qué cada cambio sale más caro,",
  "en dos líneas.",
  ":::",
  "",
  "Fin.",
].join("\n");

describe("protocolOf", () => {
  describe("when the article declares accompaniment", () => {
    it("composes the common protocol, the article card and the pauses", () => {
      const out = protocolOf(
        article({
          body: withPauses,
          data: { agente: declared, nivel: "intermedio" },
        }),
      );
      expect(out).toContain("# Lectura acompañada");
      expect(out).toContain("## Ficha del artículo");
      expect(out).toContain("Tema: un carrito construido sin patrón");
      expect(out).toContain("Nivel: intermedio");
      expect(out).toContain("Prerequisitos: javascript básico, DOM");
      expect(out).toContain("Pausas:\n1. Verifica");
    });

    it("numbers the pauses in body order", () => {
      const out = protocolOf(
        article({ body: withPauses, data: { agente: declared } }),
      );
      const i1 = out!.indexOf("1. Verifica que puedas explicar el estado");
      const i2 = out!.indexOf("2. Verifica por qué cada cambio sale más caro");
      expect(i1).toBeGreaterThan(-1);
      expect(i2).toBeGreaterThan(i1);
    });

    it("emits the absolute URL from site and the article route", () => {
      const out = protocolOf(article({ data: { agente: declared } }));
      expect(out).toContain(
        `URL: ${import.meta.env.SITE}/articulos/carrito-a-lo-bruto/`,
      );
    });

    it("flattens marked-up multi-line pause indications to plain text", () => {
      const out = protocolOf(
        article({ body: withPauses, data: { agente: declared } }),
      );
      expect(out).toContain(
        "1. Verifica que puedas explicar el estado compartido.",
      );
      expect(out).toContain(
        "2. Verifica por qué cada cambio sale más caro, en dos líneas.",
      );
      expect(out).not.toContain("`estado`");
    });

    it("omits empty prerequisitos and missing nivel lines", () => {
      const out = protocolOf(
        article({
          body: withPauses,
          data: { agente: { tema: "tema", prerequisitos: [] } },
        }),
      );
      expect(out).not.toContain("Prerequisitos:");
      expect(out).not.toContain("Nivel:");
    });

    it("produces a protocol without a pauses section when none are marked", () => {
      const out = protocolOf(
        article({ body: "Sin pausas.", data: { agente: declared } }),
      );
      expect(out).toContain("## Ficha del artículo");
      expect(out).not.toContain("Pausas:");
    });
  });

  describe("when the article does not declare accompaniment", () => {
    it("returns null", () => {
      expect(protocolOf(article({ data: {} }))).toBeNull();
    });

    it("returns null on explicit opt-out", () => {
      expect(protocolOf(article({ data: { agente: false } }))).toBeNull();
    });
  });
});

describe("pausesOf", () => {
  it("ignores a :::pausa block inside a code fence", () => {
    const body =
      "```md\n:::pausa\nEjemplo falso.\n:::\n```\n\n:::pausa\nLa real.\n:::\n";
    expect(pausesOf(body)).toEqual(["La real."]);
  });

  it("returns an empty array when there are no pauses", () => {
    expect(pausesOf("Sin pausas.")).toEqual([]);
  });
});
