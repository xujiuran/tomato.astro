/**
 * News Data Service
 * Integrates data APIs from:
 * 1. vikiboss/60s (Daily 60s, AI News, Bing Wallpaper, Epic Free Games, Moyu, History, IT News, Douban, Whois)
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

export interface AINewsItem {
  title: string;
  detail: string;
  link: string;
  source?: string;
  date?: string;
}

export interface BingWallpaperData {
  title: string;
  headline?: string;
  description?: string;
  main_text?: string;
  cover: string;
  cover_4k: string;
  copyright?: string;
  update_date?: string;
}

export interface EpicGameItem {
  id: string;
  title: string;
  cover: string;
  original_price?: number;
  original_price_desc?: string;
  description: string;
  start_date?: string;
  end_date?: string;
}

export interface TodayHistoryItem {
  year: string;
  title: string;
  description: string;
  link?: string;
  event_type?: string;
}

export interface MoyuData {
  date?: {
    gregorian?: string;
    weekday?: string;
    lunar?: { monthCN?: string; dayCN?: string; yearGanZhi?: string };
  };
  today?: { isWeekend?: boolean; isHoliday?: boolean; isWorkday?: boolean };
  progress?: {
    week?: string;
    month?: string;
    year?: string;
  };
  nextWeekend?: number;
  nextHoliday?: { name?: string; date?: string; countdown?: number };
  countdown?: {
    weekend?: number;
    newYear?: number;
    springFestival?: number;
    laborDay?: number;
    nationalDay?: number;
  };
  moyuQuote?: string;
}

export interface DoubanMovieItem {
  rank: number;
  title: string;
  rating: number;
  rating_count?: number;
  card_subtitle?: string;
  cover: string;
  cover_proxy?: string;
  id?: string;
}

export interface ITNewsItem {
  title: string;
  description: string;
  link: string;
  created?: string;
}

export interface WhoisData {
  domain: string;
  status?: string[];
  registrar?: string;
  nameservers?: string[];
  created?: string;
  updated?: string;
  expires?: string;
  duration_desc?: string;
}

export interface Daily60sHubData {
  digest: Daily60sData;
  aiNews: AINewsItem[];
  bing?: BingWallpaperData | null;
  epicGames: EpicGameItem[];
  todayHistory: TodayHistoryItem[];
  moyu: MoyuData | null;
  doubanMovies: DoubanMovieItem[];
  itNews: ITNewsItem[];
  whois: WhoisData | null;
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

export const VIKI_60S_HOSTS = [
  'https://60s.mizhoubaobei.top',
  'https://60s.okbaike.com',
  'https://60s.zellon.top',
];

/**
 * Generic helper to fetch from 60s API instances with failover
 */
export async function fetchVikiEndpoint<T>(endpoint: string, timeoutMs = 3500): Promise<T | null> {
  for (const host of VIKI_60S_HOSTS) {
    try {
      const res = await fetch(`${host}${endpoint}`, {
        signal: AbortSignal.timeout(timeoutMs),
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko)',
        },
      });
      if (res.ok) {
        const json = await res.json();
        if (json && json.data) {
          return json.data as T;
        }
      }
    } catch {
      // try next mirror
    }
  }
  return null;
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
 * Fetch full 60s Multi-channel Hub Data
 */
export async function fetch60sHubData(): Promise<Daily60sHubData> {
  const [digest, aiRes, epicGames, historyRes, moyu, doubanMovies, itNews, whois] = await Promise.all([
    fetchDaily60s(),
    fetchVikiEndpoint<{ date: string; news: AINewsItem[] }>('/v2/ai-news'),
    fetchVikiEndpoint<EpicGameItem[]>('/v2/epic'),
    fetchVikiEndpoint<{ items: TodayHistoryItem[] }>('/v2/today-in-history'),
    fetchVikiEndpoint<MoyuData>('/v2/moyu'),
    fetchVikiEndpoint<DoubanMovieItem[]>('/v2/douban/weekly/movie'),
    fetchVikiEndpoint<ITNewsItem[]>('/v2/it-news'),
    fetchVikiEndpoint<WhoisData>('/v2/whois?domain=xujiuran.top'),
  ]);

  return {
    digest,
    aiNews: aiRes?.news || [
      {
        title: '阿里千问推出在线强化学习框架 QwenGyre',
        detail: '面向超长程智能体任务的在线强化学习框架，提升复杂代码与推理 benchmark 通过率。',
        link: 'https://github.com/QwenLM',
        source: '开源社区',
      },
    ],
    epicGames: epicGames || [
      {
        id: 'terrascape',
        title: 'TerraScape',
        cover: 'https://cdn1.epicgames.com/spt-assets/a740a2eed807469f88b9dff17e7cd3a3/terrascape-j7p8d.png',
        original_price_desc: '¥53.00',
        description: '温馨惬意的中世纪城市建造解谜游戏，在浮空岛屿上打造壮丽王国。',
      },
    ],
    todayHistory: historyRes?.items || [
      {
        year: '1947',
        title: '查克·叶格突破音障',
        description: '美国飞行员查克·叶格驾驶贝尔X-1火箭动力飞机首次超越音速。',
      },
    ],
    moyu: moyu || {
      countdown: { weekend: 2, newYear: 78, springFestival: 112 },
      progress: { week: '50%', month: '45%', year: '78%' },
      moyuQuote: '工作是做不完的，钱也是赚不完的，按时下班，多喝热水。',
    },
    doubanMovies: doubanMovies || [
      {
        rank: 1,
        title: '罗斯',
        rating: 8.5,
        card_subtitle: '剧情 / 德国 奥地利',
        cover: 'https://img3.doubanio.com/view/photo/m_ratio_poster/public/p2935294362.jpg',
      },
    ],
    itNews: itNews || [],
    whois: whois || {
      domain: 'xujiuran.top',
      registrar: 'Spaceship, Inc.',
      nameservers: ['riya.ns.cloudflare.com', 'igor.ns.cloudflare.com'],
      status: ['clientTransferProhibited'],
      created: '2026/09/30',
      expires: '2027/09/30',
    },
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
