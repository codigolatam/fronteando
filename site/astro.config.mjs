// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { satteri } from "@astrojs/markdown-satteri";
import { pauseDirective } from "./src/utils/pause-directive";

// https://astro.build/config
export default defineConfig({
  site: "https://www.fronteando.dev",
  integrations: [sitemap()],
  markdown: {
    processor: satteri({
      features: { directive: true },
      mdastPlugins: [pauseDirective],
    }),
    shikiConfig: {
      theme: "css-variables",
    },
  },
});
