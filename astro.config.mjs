import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

/**
 * Custom Shiki HAST transformer:
 * Wraps build-time syntax-highlighted <pre><code> blocks in TomatoX's Mac terminal chrome
 * with zero client-side syntax highlighting bundle overhead.
 */
function tomatoxMacCodeblockTransformer() {
  const h = (tagName, properties = {}, children = []) => ({
    type: 'element',
    tagName,
    properties,
    children,
  });
  const t = (value) => ({ type: 'text', value });

  return {
    name: 'tomatox-mac-codeblock',
    pre(node) {
      const existingClass = Array.isArray(node.properties.class)
        ? node.properties.class.join(' ')
        : String(node.properties.class || '');
      node.properties.class = `${existingClass} p-4 overflow-x-auto scrollbar-thin scrollbar-thumb-zinc-700 !bg-[#121214] m-0`.trim();
    },
    root(hast) {
      const preNode = hast.children[0];
      if (!preNode || preNode.tagName !== 'pre') return;

      const language = String(this.options?.lang || 'text').trim() || 'text';
      const encodedCode = encodeURIComponent(this.source || '');

      const headerNode = h(
        'div',
        {
          class:
            'flex items-center justify-between px-4 py-2.5 bg-[#18181b] border-b border-zinc-800/80 select-none',
        },
        [
          h('div', { class: 'flex items-center gap-2' }, [
            h('span', { class: 'h-3 w-3 rounded-full bg-[#FF5F56] shadow-xs inline-block' }),
            h('span', { class: 'h-3 w-3 rounded-full bg-[#FFBD2E] shadow-xs inline-block' }),
            h('span', { class: 'h-3 w-3 rounded-full bg-[#27C93F] shadow-xs inline-block' }),
            h(
              'span',
              { class: 'ml-2 text-[11px] font-sans font-medium text-zinc-400 tracking-wide' },
              [t(language)]
            ),
          ]),
          h(
            'button',
            {
              type: 'button',
              class:
                'copy-code-btn inline-flex items-center gap-1.5 rounded-lg border border-zinc-700/80 bg-zinc-800/90 px-2.5 py-1 text-[11px] font-sans text-zinc-300 hover:text-white hover:bg-zinc-700 active:scale-95 transition-all cursor-pointer shadow-2xs',
              'data-code': encodedCode,
              title: '复制代码',
            },
            [
              h(
                'svg',
                {
                  class: 'h-3.5 w-3.5 copy-icon-normal',
                  viewBox: '0 0 24 24',
                  fill: 'none',
                  stroke: 'currentColor',
                  'stroke-width': '2',
                  'stroke-linecap': 'round',
                  'stroke-linejoin': 'round',
                },
                [
                  h('rect', { x: '9', y: '9', width: '13', height: '13', rx: '2', ry: '2' }),
                  h('path', { d: 'M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1' }),
                ]
              ),
              h(
                'svg',
                {
                  class: 'h-3.5 w-3.5 copy-icon-success hidden text-emerald-400',
                  viewBox: '0 0 24 24',
                  fill: 'none',
                  stroke: 'currentColor',
                  'stroke-width': '2.5',
                  'stroke-linecap': 'round',
                  'stroke-linejoin': 'round',
                },
                [h('polyline', { points: '20 6 9 17 4 12' })]
              ),
              h('span', { class: 'copy-text' }, [t('复制')]),
            ]
          ),
        ]
      );

      hast.children = [
        h(
          'div',
          {
            class:
              'mac-code-block not-prose relative my-6 rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-[#121214] text-zinc-100 shadow-sm overflow-hidden font-mono text-xs sm:text-[13px] leading-relaxed',
          },
          [headerNode, preNode]
        ),
      ];
    },
  };
}

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
  markdown: {
    shikiConfig: {
      theme: 'github-dark-default',
      wrap: false,
      transformers: [tomatoxMacCodeblockTransformer()],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
