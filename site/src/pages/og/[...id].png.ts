import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";
import type { APIContext } from "astro";
import { renderOgImage } from "../../utils/og";
import { formatFecha } from "../../utils/format";

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
  const { articulo } = props;
  const meta = formatFecha(articulo.data.date);
  const png = await renderOgImage(articulo.data.title, meta);
  return new Response(new Uint8Array(png), {
    headers: { "Content-Type": "image/png" },
  });
}
