import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://xujiuran.top',
  compressHTML: true,
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  devToolbar: {
    enabled: false,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
