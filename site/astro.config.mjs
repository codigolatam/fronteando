// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import { satteri } from "@astrojs/markdown-satteri";
import { pauseDirective } from "./src/utils/pause-directive";
import { demoDirective } from "./src/utils/demo-directive";

// https://astro.build/config
export default defineConfig({
  site: "https://www.fronteando.dev",
  integrations: [sitemap(), svelte()],
  markdown: {
    processor: satteri({
      features: { directive: true },
      mdastPlugins: [pauseDirective, demoDirective],
    }),
    shikiConfig: {
      theme: "css-variables",
    },
  },
});
