import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://hexjasur.github.io',
  base: '/Jasurbek',
  vite: {
    plugins: [tailwindcss()],
  },
});
