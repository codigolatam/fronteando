import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";
import type { APIContext } from "astro";
import { markdownDocumentOf } from "../../utils/article-markdown";

export async function getStaticPaths() {
  const articulos = await getCollection("articulos", ({ data }) => !data.draft);
  return articulos.map((articulo) => ({
    params: { id: articulo.id },
    props: { articulo },
  }));
}

interface Props {
  articulo: CollectionEntry<"articulos">;
}

export async function GET({ props }: APIContext<Props>) {
  return new Response(markdownDocumentOf(props.articulo), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
