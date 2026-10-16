import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";
import type { APIContext } from "astro";
import { renderOgImage } from "../../utils/og";

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

export async function GET({ props }: APIContext) {
  const { articulo } = props as Props;
  const fecha = articulo.data.date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
  const meta = [fecha, ...articulo.data.tags].join(" · ");
  const png = await renderOgImage(articulo.data.title, meta);
  return new Response(new Uint8Array(png), {
    headers: { "Content-Type": "image/png" },
  });
}
