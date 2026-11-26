import { getCollection } from 'astro:content';
import { enhanceArticleHtml, type TocItem } from './markdown';

export interface PostSummary {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  tag: string;
  words: string;
  readTime: string;
  keywords: string[];
  html: string;
  toc: TocItem[];
}

/**
 * Computes CJK character + Latin word count and estimated reading time automatically
 * from raw Markdown source whenever not manually specified in frontmatter.
 */
function computeReadingMetrics(markdownBody: string): { words: string; readTime: string } {
  const cleaned = markdownBody
    .replace(/```[\s\S]*?```/g, (code) => code.replace(/```\w*/g, ''))
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`~|-]/g, ' ');

  const cjkChars = (cleaned.match(/[\u4e00-\u9fff\u3400-\u4dbf]/g) || []).length;
  const latinWords = (cleaned.replace(/[\u4e00-\u9fff\u3400-\u4dbf]/g, ' ').match(/[A-Za-z0-9_]+/g) || []).length;
  const totalUnits = Math.max(100, cjkChars + latinWords);

  const minutes = Math.max(1, Math.ceil(totalUnits / 400));
  return {
    words: totalUnits.toLocaleString('en-US'),
    readTime: `${minutes} 分钟`,
  };
}

function extractExcerpt(markdownBody: string, maxLen = 110): string {
  const plain = markdownBody
    .replace(/^#\s+[^\n]+\n+/m, '')
    .replace(/^>.*$/gm, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/\|[^\n]+\|/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[#*_`~>-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  return plain.length > maxLen ? `${plain.slice(0, maxLen)}...` : plain;
}

export async function getAllPosts(): Promise<PostSummary[]> {
  const entries = await getCollection('posts', ({ data }) => !data.draft);

  const items: PostSummary[] = entries.map((entry) => {
    const body = entry.body || '';
    const autoMetrics = computeReadingMetrics(body);
    const slug = entry.data.slug || entry.id;
    const rawHtml = entry.rendered?.html || '';
    const html = enhanceArticleHtml(rawHtml);

    const rawHeadings = entry.rendered?.metadata?.headings || [];
    const toc: TocItem[] = rawHeadings
      .filter((h) => h.depth === 2 || h.depth === 3)
      .map((h) => ({
        id: h.slug,
        text: h.text,
        level: h.depth,
      }));

    return {
      id: entry.id,
      slug,
      title: entry.data.title,
      description: entry.data.description || extractExcerpt(body),
      date: entry.data.date,
      tag: entry.data.tag || '深度长文',
      words: entry.data.words || autoMetrics.words,
      readTime: entry.data.readTime || autoMetrics.readTime,
      keywords: entry.data.keywords || [entry.data.tag || '文章'],
      html,
      toc,
    };
  });

  return items.sort((a, b) => b.date.localeCompare(a.date));
}
