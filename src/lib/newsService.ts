/**
 * News Data Service
 * Integrates data APIs from:
 * 1. vikiboss/60s (Daily 60 seconds news & micro-quote)
 * 2. newsnext/newsnow (Multi-source real-time hot news aggregator)
 */

export interface Daily60sData {
  date: string;
  dayOfWeek: string;
  lunarDate?: string;
  news: string[];
  tip: string;
  image: string;
  link: string;
  updated: string;
}

export interface HotNewsItem {
  id: string;
  title: string;
  url: string;
  extra?: {
    info?: string;
    hover?: string;
    date?: string;
    icon?: string | { url: string; scale?: number };
    diff?: number;
  };
  pubDate?: number | string;
}

export interface HotNewsSource {
  id: string;
  name: string;
  column: 'tech' | 'general' | 'finance';
  title?: string;
  home: string;
  color: string;
  items: HotNewsItem[];
  updatedTime?: number;
}

export const SOURCE_CONFIGS: Record<string, { name: string; column: 'tech' | 'general' | 'finance'; home: string; color: string; label: string }> = {
  v2ex: { name: 'V2EX', column: 'tech', home: 'https://v2ex.com', color: '#7c3aed', label: '程序员交流社区' },
  github: { name: 'GitHub Trending', column: 'tech', home: 'https://github.com/trending', color: '#181717', label: '全球今日热门代码库' },
  hackernews: { name: 'Hacker News', column: 'tech', home: 'https://news.ycombinator.com', color: '#ff6600', label: '硅谷极客精选热榜' },
  ithome: { name: 'IT之家', column: 'tech', home: 'https://www.ithome.com', color: '#dc2626', label: '数码科技一手资讯' },
  sspai: { name: '少数派', column: 'tech', home: 'https://sspai.com', color: '#da282a', label: '高效数字生活指南' },
  juejin: { name: '稀土掘金', column: 'tech', home: 'https://juejin.cn', color: '#1e80ff', label: '开发者热门技术实践' },
  zhihu: { name: '知乎', column: 'general', home: 'https://www.zhihu.com', color: '#0084ff', label: '全网热议深度讨论' },
  weibo: { name: '微博热搜', column: 'general', home: 'https://weibo.com', color: '#e6162d', label: '实时全网话题热度' },
  bilibili: { name: '哔哩哔哩', column: 'general', home: 'https://www.bilibili.com', color: '#fb7299', label: '热门视频与年轻潮流' },
  toutiao: { name: '今日头条', column: 'general', home: 'https://www.toutiao.com', color: '#ed4040', label: '综合热点大事件' },
  baidu: { name: '百度热搜', column: 'general', home: 'https://www.baidu.com', color: '#2932e1', label: '全网实时检索风向' },
  douyin: { name: '抖音', column: 'general', home: 'https://www.douyin.com', color: '#0f0f0f', label: '短视频热门趋势' },
  'cls-hot': { name: '财联社', column: 'finance', home: 'https://www.cls.cn', color: '#d9232e', label: '权威财经金融快讯' },
  'wallstreetcn-hot': { name: '华尔街见闻', column: 'finance', home: 'https://wallstreetcn.com', color: '#126ae5', label: '全球资本市场雷达' },
  'xueqiu-hotstock': { name: '雪球热股', column: 'finance', home: 'https://xueqiu.com', color: '#0083e6', label: '证券投资关注排行' },
};

const WEEK_DAYS = ['日', '一', '二', '三', '四', '五', '六'];

function getDayOfWeek(dateStr: string): string {
  const date = new Date(dateStr);
  return `星期${WEEK_DAYS[date.getDay()] || '三'}`;
}

/**
 * Format today's date in YYYY-MM-DD for Shanghai timezone
 */
export function getShanghaiDate(offsetDays = 0): string {
  const d = new Date(Date.now() + offsetDays * 86400000);
  const formatter = new Intl.DateTimeFormat('zh-CN', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const parts = formatter.formatToParts(d);
  const year = parts.find((p) => p.type === 'year')?.value || '';
  const month = parts.find((p) => p.type === 'month')?.value || '';
  const day = parts.find((p) => p.type === 'day')?.value || '';
  return `${year}-${month}-${day}`;
}

/**
 * Fetch 60s Daily News from vikiboss/60s project repository and endpoints
 */
export async function fetchDaily60s(specificDate?: string): Promise<Daily60sData> {
  const targetDates = specificDate
    ? [specificDate]
    : [getShanghaiDate(0), getShanghaiDate(-1), getShanghaiDate(-2)];

  for (const date of targetDates) {
    const urls = [
      `https://cdn.jsdelivr.net/gh/vikiboss/60s-static-host@main/static/60s/${date}.json`,
      `https://raw.githubusercontent.com/vikiboss/60s-static-host/main/static/60s/${date}.json`,
      `https://cdn.jsdmirror.com/gh/vikiboss/60s-static-host@main/static/60s/${date}.json`,
      `https://60s-static.viki.moe/60s/${date}.json`,
    ];

    for (const url of urls) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500);
        const res = await fetch(url, {
          signal: controller.signal,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko)',
          },
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          const raw = await res.json();
          if (Array.isArray(raw?.news) && raw.news.length > 0) {
            return {
              date: raw.date || date,
              dayOfWeek: getDayOfWeek(raw.date || date),
              news: raw.news,
              tip: raw.tip || '保持好奇与专注，在平淡的日常里蓄力前行。',
              image: raw.image || `https://cdn.jsdmirror.com/gh/vikiboss/60s-static-host@main/static/images/${raw.date || date}.png`,
              link: raw.link || 'https://github.com/vikiboss/60s',
              updated: raw.updated || raw.created || date,
            };
          }
        }
      } catch {
        // Continue to fallback mirror
      }
    }
  }

  // Graceful fallback if completely offline during build
  const fallbackDate = getShanghaiDate(0);
  return {
    date: fallbackDate,
    dayOfWeek: getDayOfWeek(fallbackDate),
    news: [
      '我国南北气温两极分化：北方多地降温超 10℃，华南区域温暖舒适',
      '全国高校科技创新与产业创新对接活动在多地同步开展',
      '新一代高性能开源模型相继发布，AI Agent 在软件工程与科研领域渗透加速',
      '国家铁路客运量持续平稳运行，高品质旅游专列受热捧',
      '消费电子市场新品频出，轻量化穿戴与边缘计算设备关注度大幅提升',
      '开源生态与开放数据协作持续深化，开发者生产力工具迎来快速演进',
    ],
    tip: '专注所爱，保持节奏，每一天都是积攒力量的过程。',
    image: '',
    link: 'https://github.com/vikiboss/60s',
    updated: `${fallbackDate} 08:30`,
  };
}

/**
 * Fetch hot news across platforms using newsnext/newsnow API
 */
export async function fetchHotNews(sourceIds: string[] = Object.keys(SOURCE_CONFIGS)): Promise<HotNewsSource[]> {
  const result: HotNewsSource[] = [];

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    const res = await fetch('https://newsnow.busiyi.world/api/s/entire', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      body: JSON.stringify({ sources: sourceIds }),
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        for (const s of data) {
          const cfg = SOURCE_CONFIGS[s.id];
          if (cfg && Array.isArray(s.items)) {
            result.push({
              id: s.id,
              name: cfg.name,
              column: cfg.column,
              home: cfg.home,
              color: cfg.color,
              items: s.items.slice(0, 20),
              updatedTime: s.updatedTime || Date.now(),
            });
          }
        }
      }
    }
  } catch (err) {
    console.warn('[newsService] fetchHotNews failed, utilizing fallback structure', err);
  }

  // If some or all sources failed or empty, provide minimal mock/cached items
  if (result.length === 0) {
    for (const id of sourceIds.slice(0, 6)) {
      const cfg = SOURCE_CONFIGS[id];
      if (cfg) {
        result.push({
          id,
          name: cfg.name,
          column: cfg.column,
          home: cfg.home,
          color: cfg.color,
          items: [
            {
              id: `${id}-sample-1`,
              title: `${cfg.name} 热门聚焦与前沿讨论`,
              url: cfg.home,
              extra: { info: '实时热搜' },
            },
          ],
          updatedTime: Date.now(),
        });
      }
    }
  }

  return result;
}
