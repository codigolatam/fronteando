import type { CollectionEntry } from "astro:content";

// The article as a plain-text document: an H1 restores the title
// the page renders outside the body, the canonical URL lets the
// agent cite the origin, and the source body travels intact —
// :::pausa markers included. The accompaniment material (protocol,
// card) does not travel.
export function markdownDocumentOf(
  article: CollectionEntry<"articulos">,
): string {
  const url = `${import.meta.env.SITE}/articulos/${article.id}/`;
  const body = (article.body ?? "").trim();
  return `# ${article.data.title}\n\nURL canónica: ${url}\n\n${body}\n`;
}
