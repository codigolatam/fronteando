import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const articulos = defineCollection({
  loader: glob({ base: "./src/content/articulos", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    nivel: z.enum(["principiante", "intermedio", "avanzado"]).optional(),
    categoria: z.enum([
      "fundamentos",
      "arquitectura",
      "visual",
      "accesibilidad",
      "rendimiento",
      "ecosistema",
      "meta",
    ]),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    agente: z
      .union([
        z.literal(false),
        z.object({
          tema: z.string(),
          prerequisitos: z.array(z.string()).default([]),
        }),
      ])
      .optional(),
  }),
});

export const collections = { articulos };
