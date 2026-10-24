import type { CollectionEntry } from "astro:content";
import commonProtocol from "../data/accompaniment-protocol.md?raw";

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
// Code fences are skipped: a :::pausa inside an
// example is not a real pause. A pause opens on a :::pausa line and
// closes on the next ::: line, or at the end of the body.
export function pausesOf(body: string): string[] {
  const pauses: string[] = [];
  let open: { colons: number; lines: string[] } | null = null;
  let fence: string | null = null;
  for (const line of body.split(/\r?\n/)) {
    const run = line.match(/^\s*(`{3,}|~{3,})/)?.[1];
    if (fence) {
      if (
        run &&
        run[0] === fence[0] &&
        run.length >= fence.length &&
        line.trim() === run
      ) {
        fence = null;
      }
      open?.lines.push(line);
    } else if (run) {
      fence = run;
      open?.lines.push(line);
    } else if (open && closesPause(line, open.colons)) {
      pauses.push(plainText(open.lines.join("\n")));
      open = null;
    } else if (open) {
      open.lines.push(line);
    } else {
      const start = line.match(/^(:{3,})pausa[ \t]*$/);
      if (start) open = { colons: start[1].length, lines: [] };
    }
  }
  if (open) pauses.push(plainText(open.lines.join("\n")));
  return pauses;
}

function closesPause(line: string, colons: number): boolean {
  const run = line.match(/^(:{3,})[ \t]*$/)?.[1];
  return run !== undefined && run.length >= colons;
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

// Provider limits in characters of prompt, per the research
// (docs/research/2026-10-enlaces-precargados-a-asistentes.md).
const PROVIDER_LIMITS = { chatgpt: 6000, claude: 10000 } as const;

// Preloaded assistant links, one per provider whose limit fits the
// protocol. A missing key means "too long": copying is the guaranteed
// path and the links are only a convenience.
export function assistantUrlsOf(protocol: string): {
  chatgpt?: string;
  claude?: string;
} {
  const urls: { chatgpt?: string; claude?: string } = {};
  const query = encodeURIComponent(protocol);
  if (protocol.length <= PROVIDER_LIMITS.chatgpt) {
    urls.chatgpt = `https://chatgpt.com/?q=${query}`;
  }
  if (protocol.length <= PROVIDER_LIMITS.claude) {
    urls.claude = `https://claude.ai/new?q=${query}`;
  }
  return urls;
}
