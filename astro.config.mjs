import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://hexjasur.github.io',
  base: '/Jasurbek',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
