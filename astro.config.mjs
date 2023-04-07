import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
import tailwind from "@astrojs/tailwind";
import robotsTxt from "astro-robots-txt";
// https://astro.build/config
export default defineConfig({
  site: "https://blog.sirius.menu/",
  integrations: [
    mdx(),
    sitemap(),
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    robotsTxt(),
  ],
});
