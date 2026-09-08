// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // canonical domain — keep in sync with meta.url in src/data/site.ts
  site: 'https://alifazlollahi.com',
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      // the background shader + animation modules are small; keep them in one chunk
      assetsInlineLimit: 2048,
    },
  },
});
