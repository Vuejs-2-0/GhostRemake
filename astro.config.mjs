import { defineConfig } from 'astro/config';
import vue from "@astrojs/vue";
import tailwind from "@astrojs/tailwind";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  integrations: [vue(), tailwind({applyBaseStyles: false})],
  output: "server",
  adapter: cloudflare(),
  vite: {
    resolve: {
      alias: {
        '@': '/src'
      }
    },
    define: {
      global: {}
    }
  },
  build: {
    outDir: 'dist'
  } 
});