import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import tailwind from "@astrojs/tailwind";
import swup from '@swup/astro';
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  integrations: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag === "iconify-icon",
        },
      },
    }),
    tailwind({ applyBaseStyles: false }),
    swup({
      globalInstance: true
    })
  ],
  output: "server",
  adapter: cloudflare(),
  vite: {
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  },
  build: {
    rollupOptions: {
      external: ["@internationalized/date"],
    },
  },
});
