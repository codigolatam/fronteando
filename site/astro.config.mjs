// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { satteri } from "@astrojs/markdown-satteri";

// https://astro.build/config
export default defineConfig({
  site: "https://www.fronteando.dev",
  integrations: [sitemap()],
  markdown: {
    processor: satteri({ features: { directive: true } }),
    shikiConfig: {
      theme: "css-variables",
    },
  },
});
