const MARCADOR = /^<!--\s*more\s*-->$/m;

// Previo del artículo en texto plano: todo lo anterior a <!--more-->
// o, sin marcador, el primer párrafo — sin markup.
export function excerptOf(body: string): string {
  const source = MARCADOR.test(body)
    ? body.split(MARCADOR)[0]
    : (body.split(/\n{2,}/)[0] ?? "");

  return source
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
