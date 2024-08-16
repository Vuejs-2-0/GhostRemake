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
          isCustomElement: (tag) => ["iconify-icon","twic-img"].includes(tag),
        },
      },
    }),
    tailwind({ applyBaseStyles: false }),
    swup({
      globalInstance: true,
      cache: false
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
