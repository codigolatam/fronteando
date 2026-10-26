import { describe, expect, it } from "vitest";
import type { CollectionEntry } from "astro:content";
import { assistantUrlsOf, pausesOf, protocolOf } from "./accompaniment";

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
          data: {
            title: "El carrito a lo bruto",
            agente: declared,
            nivel: "intermedio",
          },
        }),
      );
      expect(out).toContain("# Lectura acompañada");
      expect(out).toContain("## Ficha del artículo");
      expect(out).toContain("Título: El carrito a lo bruto");
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
  describe("when a :::pausa block sits inside a code fence", () => {
    it("ignores it", () => {
      const body =
        "```md\n:::pausa\nEjemplo falso.\n:::\n```\n\n:::pausa\nLa real.\n:::\n";
      expect(pausesOf(body)).toEqual(["La real."]);
    });

    it("keeps the fence open until a closing run at least as long", () => {
      const body =
        "````md\n```\n:::pausa\nEjemplo falso.\n:::\n````\n\n:::pausa\nLa real.\n:::\n";
      expect(pausesOf(body)).toEqual(["La real."]);
    });
  });

  describe("when a pause block opens with more than three colons", () => {
    it("closes it on a line with the same number of colons", () => {
      expect(pausesOf("::::pausa\nUno.\n::::\n")).toEqual(["Uno."]);
    });

    it("keeps a shorter closing line inside it as content", () => {
      expect(pausesOf("::::pausa\nUno.\n:::\nDos.\n::::")).toEqual([
        "Uno. ::: Dos.",
      ]);
    });
  });

  describe("when the body has no pause blocks", () => {
    it("returns an empty array", () => {
      expect(pausesOf("Sin pausas.")).toEqual([]);
    });
  });

  describe("when a pause block is empty", () => {
    it("keeps the block when its closing line follows directly", () => {
      expect(pausesOf(":::pausa\n:::")).toEqual([""]);
    });

    it("keeps the block when a blank line precedes its closing line", () => {
      expect(pausesOf(":::pausa\n\n:::\n\n:::pausa\nLa real.\n:::")).toEqual([
        "",
        "La real.",
      ]);
    });

    it("does not merge it with the pause block that follows", () => {
      expect(
        pausesOf(":::pausa\n:::\n\nTexto\n\n:::pausa\nLa real.\n:::"),
      ).toEqual(["", "La real."]);
    });
  });

  describe("when a pause block runs to the end of the body", () => {
    it("keeps it as the last pause", () => {
      expect(pausesOf(":::pausa\nÚltima.")).toEqual(["Última."]);
    });
  });
});

describe("assistantUrlsOf", () => {
  const chatgpt = "https://chatgpt.com/?q=";
  const claude = "https://claude.ai/new?q=";

  describe("when measuring the protocol against provider limits", () => {
    it("offers both assistants when the protocol fits every limit", () => {
      const urls = assistantUrlsOf("texto corto");
      expect(urls.chatgpt).toBe(
        `${chatgpt}${encodeURIComponent("texto corto")}`,
      );
      expect(urls.claude).toBe(`${claude}${encodeURIComponent("texto corto")}`);
    });

    it("offers only Claude when the protocol exceeds the ChatGPT limit", () => {
      const urls = assistantUrlsOf("x".repeat(6001));
      expect(urls.chatgpt).toBeUndefined();
      expect(urls.claude).toBe(
        `${claude}${encodeURIComponent("x".repeat(6001))}`,
      );
    });

    it("keeps Claude at the 10000 character boundary", () => {
      const urls = assistantUrlsOf("x".repeat(10000));
      expect(urls.chatgpt).toBeUndefined();
      expect(urls.claude).toBeDefined();
    });

    it("offers no links when the protocol exceeds every limit", () => {
      const urls = assistantUrlsOf("x".repeat(10001));
      expect(urls).toEqual({});
    });

    it("keeps both links at the ChatGPT limit boundary", () => {
      const urls = assistantUrlsOf("x".repeat(6000));
      expect(urls.chatgpt).toBeDefined();
      expect(urls.claude).toBeDefined();
    });

    it("url-encodes the protocol, including accents and newlines", () => {
      const urls = assistantUrlsOf("línea 1\nlínea 2");
      expect(urls.chatgpt).toBe(
        `${chatgpt}${encodeURIComponent("línea 1\nlínea 2")}`,
      );
      expect(urls.chatgpt).not.toContain("\n");
    });
  });
});
