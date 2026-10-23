import { defineConfig } from "vitest/config";
import astroConfig from "./astro.config.mjs";

export default defineConfig({
  define: {
    "import.meta.env.SITE": JSON.stringify(astroConfig.site),
  },
});
