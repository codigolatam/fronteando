import { Resvg } from "@resvg/resvg-js";
import satori from "satori";

import { OG_HEIGHT, OG_WIDTH } from "./og-size";
import fontMono400 from "../assets/fonts/ibm-plex-mono-latin-400-normal.woff?inline";
import fontMono500 from "../assets/fonts/ibm-plex-mono-latin-500-normal.woff?inline";
import fontSerif700 from "../assets/fonts/ibm-plex-serif-latin-700-normal.woff?inline";

// Valores del tema oscuro de DESIGN.md — el PNG no tiene CSS; cada
// constante lleva el nombre del token que representa.
const colorBackground = "#16150f"; // --color-background
const colorSurface = "#221f1a"; // --color-surface
const colorText = "#ede9e1"; // --color-text
const colorTextMuted = "#a69f90"; // --color-text-muted
const colorAccent = "#2dd4bf"; // --color-accent
const colorBorder = "#3a352a"; // --color-border

interface OgElement {
  type: string;
  props: {
    style?: Record<string, string | number>;
    children?: OgElement | OgElement[] | string;
  };
}

const toBuffer = (dataUri: string) =>
  Buffer.from(dataUri.slice(dataUri.indexOf(",") + 1), "base64");

const fonts = [
  { name: "IBM Plex Mono", data: toBuffer(fontMono400), weight: 400 },
  { name: "IBM Plex Mono", data: toBuffer(fontMono500), weight: 500 },
  { name: "IBM Plex Serif", data: toBuffer(fontSerif700), weight: 700 },
] as const;

function template(title: string, meta: string): OgElement {
  const titleSize = title.length > 50 ? 56 : 68;
  return {
    type: "div",
    props: {
      style: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: "64px 72px",
        boxSizing: "border-box",
        backgroundColor: colorBackground,
        fontFamily: "IBM Plex Mono",
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              fontSize: 30,
              fontWeight: 500,
              color: colorText,
            },
            children: [
              { type: "span", props: { children: "fronteando" } },
              {
                type: "span",
                props: {
                  children: "_",
                  style: { color: colorAccent },
                },
              },
            ],
          },
        },
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              fontFamily: "IBM Plex Serif",
              fontWeight: 700,
              fontSize: titleSize,
              lineHeight: 1.2,
              lineClamp: 4,
              color: colorText,
            },
            children: title,
          },
        },
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: 24,
              color: colorTextMuted,
              borderTop: `1px solid ${colorBorder}`,
              paddingTop: 24,
            },
            children: [
              { type: "span", props: { children: meta } },
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    backgroundColor: colorSurface,
                    color: colorTextMuted,
                    border: `1px solid ${colorBorder}`,
                    borderRadius: 6,
                    padding: "8px 16px",
                    fontSize: 20,
                  },
                  children: "fronteando.dev",
                },
              },
            ],
          },
        },
      ],
    },
  };
}

export async function renderOgImage(
  title: string,
  meta: string,
): Promise<Buffer> {
  const svg = await satori(
    template(title, meta) as unknown as Parameters<typeof satori>[0],
    {
      width: OG_WIDTH,
      height: OG_HEIGHT,
      fonts: fonts.map((f) => ({ ...f, style: "normal" as const })),
    },
  );
  return new Resvg(svg).render().asPng();
}
