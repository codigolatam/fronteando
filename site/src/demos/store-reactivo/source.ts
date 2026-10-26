import type { DemoEvent, RunnerId } from "./runtime";

// The program the reader sees next to the trace. It is the code the
// runtime executes, written out so each trace event can point at the
// line it happens on; source.test.ts checks that the reads shown here
// are the reads the runtime performs.

export type TokenKind =
  "keyword" | "string" | "function" | "constant" | "comment";
export type Token = readonly [text: string, kind?: TokenKind];
export type SourceLine = readonly Token[];

export const WRITE_LINE = 9;

const EFFECT_LINES: Record<
  RunnerId,
  { start: number; body: number; end: number }
> = {
  title: { start: 2, body: 3, end: 4 },
  greeting: { start: 5, body: 6, end: 7 },
};

const SOURCE_LINES: readonly SourceLine[] = [
  [
    ["const", "keyword"],
    [" estado = "],
    ["store", "function"],
    ["({ nombre: "],
    ['"ana"', "string"],
    [", nivel: "],
    ["1", "constant"],
    [" });"],
  ],
  [],
  [["effect", "function"], ["(() => { "], ["// título", "comment"]],
  [
    ["  document.title = "],
    ["`", "string"],
    ["${estado.nombre}"],
    [" · nivel ", "string"],
    ["${estado.nivel}"],
    ["`", "string"],
    [";"],
  ],
  [["});"]],
  [["effect", "function"], ["(() => { "], ["// saludo", "comment"]],
  [
    ["  saludo.textContent = "],
    ["`Hola, ", "string"],
    ["${estado.nombre}"],
    ["`", "string"],
    [";"],
  ],
  [["});"]],
  [],
  [["// tu escritura aparecerá aquí", "comment"]],
];

export interface Write {
  prop: string;
  value: string;
  // The statement the reader actually ran (from the control that
  // triggered it); when present it is shown verbatim.
  statement?: string;
}

// The last line is the reader's own assignment, once there is one.
export function sourceLines(write: Write | null): readonly SourceLine[] {
  if (!write) return SOURCE_LINES;
  const line: SourceLine = write.statement
    ? [[write.statement]]
    : [
        [`estado.${write.prop} = `],
        [write.value, write.value.startsWith('"') ? "string" : "constant"],
        [";"],
      ];
  return SOURCE_LINES.map((sourceLine, index) =>
    index === WRITE_LINE ? line : sourceLine,
  );
}

export function lineOf(event: DemoEvent): number {
  switch (event.kind) {
    case "notify":
      return WRITE_LINE;
    case "run-start":
    case "skip":
      return EFFECT_LINES[event.runner].start;
    case "subscribe":
    case "write":
      return EFFECT_LINES[event.runner].body;
    case "run-end":
      return EFFECT_LINES[event.runner].end;
  }
}
