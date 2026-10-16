import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const articulos = (
    await getCollection("articulos", ({ data }) => !data.draft)
  ).sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: "Fronteando",
    description:
      "Blog técnico de desarrollo web frontend, escrito en español: un lugar donde aprenderlo, con o sin asistente de por medio.",
    site: context.site!,
    xmlns: { atom: "http://www.w3.org/2005/Atom" },
    customData: `<language>es</language><atom:link href="${context.site}rss.xml" rel="self" type="application/rss+xml" />`,
    items: articulos.map((articulo) => ({
      title: articulo.data.title,
      description: articulo.data.description,
      pubDate: articulo.data.date,
      link: `/articulos/${articulo.id}/`,
      categories: articulo.data.tags,
    })),
  });
}
