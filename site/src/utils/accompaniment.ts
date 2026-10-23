import type { CollectionEntry } from "astro:content";
import commonProtocol from "../data/accompaniment-protocol.md?raw";

const PAUSE_BLOCK = /^:::pausa[ \t]*\r?\n([\s\S]*?)\r?\n:::[ \t]*$/gm;

// A pause indication as plain text on one line: no markup.
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

// The pause indications from the body, in reading order.
// Code fences are stripped first: a :::pausa inside an
// example is not a real pause.
export function pausesOf(body: string): string[] {
  const withoutCode = body.replace(/```[\s\S]*?(```|$)/g, "");
  return [...withoutCode.matchAll(PAUSE_BLOCK)]
    .map((m) => plainText(m[1]))
    .filter((p) => p.length > 0);
}

// Accompanied-reading protocol: common text + article card.
// null when the article does not declare it or opts out.
export function protocolOf(
  article: CollectionEntry<"articulos">,
): string | null {
  const declaration = article.data.agente;
  if (!declaration) return null;

  const lines = [
    `URL: ${import.meta.env.SITE}/articulos/${article.id}/`,
    `Tema: ${declaration.tema}`,
  ];
  if (article.data.nivel) lines.push(`Nivel: ${article.data.nivel}`);
  if (declaration.prerequisitos.length > 0)
    lines.push(`Prerequisitos: ${declaration.prerequisitos.join(", ")}`);

  const details = ["## Ficha del artículo", "", ...lines];
  const pauses = pausesOf(article.body ?? "");
  if (pauses.length > 0) {
    details.push("", "Pausas:", ...pauses.map((p, i) => `${i + 1}. ${p}`));
  }

  return `${commonProtocol.trimEnd()}\n\n${details.join("\n")}\n`;
}
