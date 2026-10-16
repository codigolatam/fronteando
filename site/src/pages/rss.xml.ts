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
    site: context.site ?? "https://www.fronteando.dev",
    items: articulos.map((articulo) => ({
      title: articulo.data.title,
      description: articulo.data.description,
      pubDate: articulo.data.date,
      link: `/articulos/${articulo.id}/`,
    })),
  });
}
