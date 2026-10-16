import { marked } from 'marked';

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function renderArticleMarkdown(markdownContent: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  let headingCount = 0;

  const renderer = new marked.Renderer();

  // Custom heading renderer
  renderer.heading = function ({ text, depth }: { text: string; depth: number }) {
    headingCount++;
    const rawText = text.replace(/<[^>]*>/g, '').trim();
    const slug =
      rawText
        .toLowerCase()
        .replace(/[^\w\u4e00-\u9fa5\-_]+/g, '-')
        .replace(/^-+|-+$/g, '') || `section-${headingCount}`;

    // Collect for Table of Contents if level 2 or 3
    if (depth === 2 || depth === 3) {
      toc.push({
        id: slug,
        text: rawText,
        level: depth,
      });
    }

    const anchorSvg = `<svg class="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>`;

    return `
      <h${depth} id="${slug}" class="scroll-mt-24 group relative flex items-center gap-2 font-bold tracking-tight text-[var(--text-primary)] ${
        depth === 2
          ? 'text-xl sm:text-2xl mt-8 mb-4 pt-4 border-t border-[var(--border-secondary)]'
          : 'text-lg sm:text-xl mt-6 mb-3 text-[var(--text-primary)]'
      }">
        <span class="group-hover:text-[var(--accent)] transition-colors">${rawText}</span>
        <a href="#${slug}" class="hidden sm:inline-flex items-center text-[var(--text-tertiary)] hover:text-[var(--accent)]" aria-label="锚点跳转">
          ${anchorSvg}
        </a>
      </h${depth}>
    `;
  };

  // Custom code block renderer with Mac-style window controls
  renderer.code = function ({ text, lang }: { text: string; lang?: string }) {
    const language = (lang || 'code').trim();
    const escapedCode = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

    return `
      <div class="mac-code-block relative my-6 rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-[#121214] text-zinc-100 shadow-xl overflow-hidden font-mono text-xs sm:text-[13px] leading-relaxed">
        <!-- Mac Window Header -->
        <div class="flex items-center justify-between px-4 py-2.5 bg-[#18181b] border-b border-zinc-800/80 select-none">
          <!-- Traffic Light Dots -->
          <div class="flex items-center gap-2">
            <span class="h-3 w-3 rounded-full bg-[#FF5F56] shadow-xs inline-block"></span>
            <span class="h-3 w-3 rounded-full bg-[#FFBD2E] shadow-xs inline-block"></span>
            <span class="h-3 w-3 rounded-full bg-[#27C93F] shadow-xs inline-block"></span>
            <span class="ml-2 text-[11px] font-sans font-medium text-zinc-400 tracking-wide">${language}</span>
          </div>

          <!-- Copy Button -->
          <button
            type="button"
            class="copy-code-btn inline-flex items-center gap-1.5 rounded-lg border border-zinc-700/80 bg-zinc-800/90 px-2.5 py-1 text-[11px] font-sans text-zinc-300 hover:text-white hover:bg-zinc-700 active:scale-95 transition-all cursor-pointer shadow-2xs"
            data-code="${encodeURIComponent(text)}"
            title="复制代码"
          >
            <svg class="h-3.5 w-3.5 copy-icon-normal" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <svg class="h-3.5 w-3.5 copy-icon-success hidden text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span class="copy-text">复制</span>
          </button>
        </div>

        <!-- Code Content -->
        <pre class="p-4 overflow-x-auto scrollbar-thin scrollbar-thumb-zinc-700 bg-[#121214] text-zinc-200"><code>${escapedCode}</code></pre>
      </div>
    `;
  };

  const html = marked.parse(markdownContent, { renderer }) as string;
  return { html, toc };
}
