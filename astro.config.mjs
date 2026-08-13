// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://liuh886.github.io',
  base: '/OceanHub',
  trailingSlash: 'always',
  vite: {
    plugins: [tailwindcss()]
  }
});
