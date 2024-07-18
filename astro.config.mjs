import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';
// astro.config.ts -- unocss config
import { defineConfig } from 'astro/config'
import UnoCSS from 'unocss/astro'

// https://astro.build/config
export default defineConfig({
	site: 'https://xujiuran.github.io',
  base: '/tomato.astro/',
	integrations: [mdx(), sitemap(), UnoCSS({ injectReset: true })],
});
