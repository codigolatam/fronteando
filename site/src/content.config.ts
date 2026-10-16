import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const articulos = defineCollection({
  loader: glob({ base: "./src/content/articulos", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    nivel: z.enum(["principiante", "intermedio", "avanzado"]),
    categoria: z.enum([
      "css",
      "javascript",
      "frameworks",
      "accesibilidad",
      "rendimiento",
      "meta",
    ]),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { articulos };
