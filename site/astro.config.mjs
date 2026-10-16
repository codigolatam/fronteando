// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://www.fronteando.dev",
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      theme: "css-variables",
    },
  },
});
