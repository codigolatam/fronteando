import type { CollectionEntry } from "astro:content";
import commonProtocol from "../data/protocolo-acompanamiento.md?raw";

const PAUSA_BLOCK = /^:::pausa[ \t]*\r?\n([\s\S]*?)\r?\n:::[ \t]*$/gm;

// Indicación de una pausa a texto plano en una línea: sin markup.
function plainText(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^>\s?/gm, "")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    .replace(/(\*\*|__)([\s\S]*?)\1/g, "$2")
    .replace(/(\*|_)([^*_]*?)\1/g, "$2")
    .replace(/`([^`]*)`/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

// Las indicaciones de las pausas del cuerpo, en orden de lectura.
// Los fences de código se despojan antes: un :::pausa dentro de un
// ejemplo no es una pausa real.
export function pausesOf(body: string): string[] {
  const withoutCode = body.replace(/```[\s\S]*?(```|$)/g, "");
  return [...withoutCode.matchAll(PAUSA_BLOCK)]
    .map((m) => plainText(m[1]))
    .filter((p) => p.length > 0);
}

// Protocolo de lectura acompañada: común + ficha del artículo.
// null cuando el artículo no lo declara o declara el opt-out.
export function protocolOf(
  article: CollectionEntry<"articulos">,
): string | null {
  const decl = article.data.agente;
  if (!decl) return null;

  const lines = [
    `URL: ${import.meta.env.SITE}/articulos/${article.id}/`,
    `Tema: ${decl.tema}`,
  ];
  if (article.data.nivel) lines.push(`Nivel: ${article.data.nivel}`);
  if (decl.prerequisitos.length > 0)
    lines.push(`Prerequisitos: ${decl.prerequisitos.join(", ")}`);

  const ficha = ["## Ficha del artículo", "", ...lines];
  const pauses = pausesOf(article.body ?? "");
  if (pauses.length > 0) {
    ficha.push("", "Pausas:", ...pauses.map((p, i) => `${i + 1}. ${p}`));
  }

  return `${commonProtocol.trimEnd()}\n\n${ficha.join("\n")}\n`;
}
