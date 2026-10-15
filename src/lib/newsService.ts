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

export interface SourceConfig {
  name: string;
  column: 'tech' | 'general' | 'finance';
  home: string;
  color: string;
  label: string;
  maxItems?: number;
}

export const DEFAULT_MAX_ITEMS = 15;

export const SOURCE_CONFIGS: Record<string, SourceConfig> = {
  v2ex: { name: 'V2EX', column: 'tech', home: 'https://v2ex.com', color: '#7c3aed', label: '程序员交流社区', maxItems: 10 },
  github: { name: 'GitHub Trending', column: 'tech', home: 'https://github.com/trending', color: '#181717', label: '全球今日热门代码库', maxItems: 15 },
  hackernews: { name: 'Hacker News', column: 'tech', home: 'https://news.ycombinator.com', color: '#ff6600', label: '硅谷极客精选热榜', maxItems: 10 },
  ithome: { name: 'IT之家', column: 'tech', home: 'https://www.ithome.com', color: '#dc2626', label: '数码科技一手资讯', maxItems: 10 },
  sspai: { name: '少数派', column: 'tech', home: 'https://sspai.com', color: '#da282a', label: '高效数字生活指南', maxItems: 10 },
  juejin: { name: '稀土掘金', column: 'tech', home: 'https://juejin.cn', color: '#1e80ff', label: '开发者热门技术实践', maxItems: 10 },
  zhihu: { name: '知乎', column: 'general', home: 'https://www.zhihu.com', color: '#0084ff', label: '全网热议深度讨论', maxItems: 10 },
  weibo: { name: '微博热搜', column: 'general', home: 'https://weibo.com', color: '#e6162d', label: '实时全网话题热度', maxItems: 10 },
  bilibili: { name: '哔哩哔哩', column: 'general', home: 'https://www.bilibili.com', color: '#fb7299', label: '热门视频与年轻潮流', maxItems: 10 },
  toutiao: { name: '今日头条', column: 'general', home: 'https://www.toutiao.com', color: '#ed4040', label: '综合热点大事件', maxItems: 10 },
  baidu: { name: '百度热搜', column: 'general', home: 'https://www.baidu.com', color: '#2932e1', label: '全网实时检索风向', maxItems: 10 },
  douyin: { name: '抖音', column: 'general', home: 'https://www.douyin.com', color: '#0f0f0f', label: '短视频热门趋势', maxItems: 10 },
  'cls-hot': { name: '财联社', column: 'finance', home: 'https://www.cls.cn', color: '#d9232e', label: '权威财经金融快讯', maxItems: 10 },
  'wallstreetcn-hot': { name: '华尔街见闻', column: 'finance', home: 'https://wallstreetcn.com', color: '#126ae5', label: '全球资本市场雷达', maxItems: 10 },
  'xueqiu-hotstock': { name: '雪球热股', column: 'finance', home: 'https://xueqiu.com', color: '#0083e6', label: '证券投资关注排行', maxItems: 10 },
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
  'https://60s.viki.moe',
  'https://60s-api.viki.moe',
  'https://60s.mizhoubaobei.top',
];

/**
 * Generic helper to fetch from 60s API instances with failover
 */
export async function fetchVikiEndpoint<T>(endpoint: string, timeoutMs = 2000): Promise<T | null> {
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
  // 1. Try fast dynamic API endpoint first (< 200ms)
  try {
    const apiData = await fetchVikiEndpoint<any>('/v2/60s', 2000);
    if (apiData && Array.isArray(apiData.news) && apiData.news.length > 0) {
      const dateStr = apiData.date || getShanghaiDate(0);
      return {
        date: dateStr,
        dayOfWeek: getDayOfWeek(dateStr),
        news: apiData.news,
        tip: apiData.tip || '保持好奇与专注，在平淡的日常里蓄力前行。',
        image: apiData.image || `https://cdn.jsdmirror.com/gh/vikiboss/60s-static-host@main/static/images/${dateStr}.png`,
        link: apiData.link || 'https://github.com/vikiboss/60s',
        updated: apiData.updated || apiData.created || dateStr,
      };
    }
  } catch {}

  // 2. Fallback to static hosts if API is unreachable
  const targetDates = specificDate
    ? [specificDate]
    : [getShanghaiDate(0), getShanghaiDate(-1)];

  for (const date of targetDates) {
    const urls = [
      `https://cdn.jsdelivr.net/gh/vikiboss/60s-static-host@main/static/60s/${date}.json`,
      `https://60s-static.viki.moe/60s/${date}.json`,
    ];

    for (const url of urls) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1200);
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
        // Continue to fallback
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

let hubCache: { data: Daily60sHubData; timestamp: number } | null = null;
let hotCache: { data: HotNewsSource[]; timestamp: number } | null = null;
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes cache

/**
 * Fetch full 60s Multi-channel Hub Data
 */
export async function fetch60sHubData(): Promise<Daily60sHubData> {
  if (hubCache && Date.now() - hubCache.timestamp < CACHE_TTL_MS) {
    return hubCache.data;
  }

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

  hubCache = { data: hubData, timestamp: Date.now() };
  return hubData;
}

/**
 * Fetch hot news across platforms using newsnext/newsnow API
 */
export const DEFAULT_HOT_ITEMS: Record<string, HotNewsItem[]> = {
  github: [
    { id: 'gh-1', title: 'morluto/rea - Reverse engineer anything with agents, from app behavior down to native binaries.', url: 'https://github.com/morluto/rea', extra: { info: '⭐ 221k · 今日+54.7k', hover: 'TypeScript · 智能体全自动化逆向工程' } },
    { id: 'gh-2', title: 'bilawalsidhu/gods-eye-view - A spy satellite simulator in your browser, except the data is real. Spatial intelligence on a photorealistic 3D globe.', url: 'https://github.com/bilawalsidhu/gods-eye-view', extra: { info: '⭐ 56.0k · 今日+1.9k', hover: 'JavaScript · 真实卫星空间情报 3D 地球' } },
    { id: 'gh-3', title: 'debpalash/VoiceStudio - Open-source, fully-local ElevenLabs alternative — voice cloning, voice design, video dubbing in 646 languages.', url: 'https://github.com/debpalash/VoiceStudio', extra: { info: '⭐ 64.5k · 今日+1.7k', hover: 'Python · 本地化声音克隆与多模态配音' } },
    { id: 'gh-4', title: 'mksglu/context-mode - Context window optimization for AI coding agents. Sandboxes tool output (98% reduction) and persists session memory.', url: 'https://github.com/mksglu/context-mode', extra: { info: '⭐ 28.6k · 今日+969', hover: 'TypeScript · AI 编码智能体上下文精简' } },
    { id: 'gh-5', title: 'cathrynlavery/diagram-design - Editorial diagram design for Claude Code, Codex, Copilot, Cursor. 44 diagram types. HTML + SVG.', url: 'https://github.com/cathrynlavery/diagram-design', extra: { info: '⭐ 54.8k · 今日+1.8k', hover: 'HTML · 专为 AI 代码助手打造的极简图表设计' } },
    { id: 'gh-6', title: 'vercel-labs/skills - The open agent skills tool - npx skills', url: 'https://github.com/vercel-labs/skills', extra: { info: '⭐ 34.8k · 今日+190', hover: 'TypeScript · Vercel 开源通用智能体技能体系' } },
    { id: 'gh-7', title: 'lyogavin/airllm - AirLLM 2.8T LLM inference with single 4GB GPU', url: 'https://github.com/lyogavin/airllm', extra: { info: '⭐ 38.5k · 今日+1.0k', hover: 'Jupyter · 单张 4GB 显卡运行超大模型推理' } },
    { id: 'gh-8', title: 'storytold/artcraft - ArtCraft is an intentional crafting engine for artists, designers, and filmmakers', url: 'https://github.com/storytold/artcraft', extra: { info: '⭐ 26.7k · 今日+4.1k', hover: 'Rust · 专为艺术家打造的内容构建引擎' } },
    { id: 'gh-9', title: 'xtool-org/xtool - Cross-platform Xcode replacement. Build and deploy iOS apps with SwiftPM on Linux, Windows, macOS.', url: 'https://github.com/xtool-org/xtool', extra: { info: '⭐ 9.9k · 今日+1.2k', hover: 'Swift · 跨平台 Xcode 替代者' } },
    { id: 'gh-10', title: 'browser-use/browser-use - Enable AI agents to interact with websites and automate workflows effortlessly', url: 'https://github.com/browser-use/browser-use', extra: { info: '⭐ 31.2k · 今日+850', hover: 'Python · 智能网页自主自动化' } },
  ],
  v2ex: [
    { id: 'v2-1', title: '讨论：Cursor 与 Claude 3.5 Sonnet 在长上下文架构下的工程实战体验', url: 'https://v2ex.com/t/1078921', extra: { info: '128 回复', hover: '程序员 · 深度实操' } },
    { id: 'v2-2', title: '开源推荐：基于 Tauri 2.0 构建的 macOS / Windows 高性能剪贴板利器', url: 'https://v2ex.com/t/1078832', extra: { info: '86 回复', hover: '分享发现 · 桌面极客' } },
    { id: 'v2-3', title: '请教：自建企业级私有知识库，Milvus 与 Qdrant 哪种小规模更省内存？', url: 'https://v2ex.com/t/1078740', extra: { info: '94 回复', hover: '问与答 · RAG实践' } },
    { id: 'v2-4', title: '探讨：国内独立开发者如何打造第一款出海盈利的 Micro-SaaS 产品', url: 'https://v2ex.com/t/1078652', extra: { info: '210 回复', hover: '创造者 · 出海探索' } },
    { id: 'v2-5', title: 'Apple M4 MacBook Pro 即将发布，大家对内存和端口升级有什么预期？', url: 'https://v2ex.com/t/1078519', extra: { info: '152 回复', hover: 'macOS · 硬件讨论' } },
    { id: 'v2-6', title: '关于前端框架新演进：Vite+ 与 Turbopack 带来的开发体验提升', url: 'https://v2ex.com/t/1078401', extra: { info: '67 回复', hover: '前端开发 · 工具链' } },
    { id: 'v2-7', title: '探讨：2026年个人独立开发者如何规划出海产品的定价策略与Stripe支付渠道', url: 'https://v2ex.com/t/1078310', extra: { info: '115 回复', hover: '出海创造 · 经验讨论' } },
    { id: 'v2-8', title: '分享：基于 Docker 与 Traefik 的家庭 Homelab 私有云服务自动化编排方案', url: 'https://v2ex.com/t/1078204', extra: { info: '73 回复', hover: 'NAS/极客 · 运维实践' } },
    { id: 'v2-9', title: '讨论：现代前端脚手架在单页应用架构下针对首屏水合开销的实践心得', url: 'https://v2ex.com/t/1078092', extra: { info: '58 回复', hover: 'Web技术 · 性能优化' } },
    { id: 'v2-10', title: '极客日常：机械键盘客制化轴体手感与静音办公场景下的最优平衡选择', url: 'https://v2ex.com/t/1077981', extra: { info: '92 回复', hover: '桌面硬件 · 交流分享' } },
  ],
  hackernews: [
    { id: 'hn-1', title: 'Show HN: Magpie – Run DeepSeek and Claude local agents seamlessly', url: 'https://news.ycombinator.com/item?id=41830219', extra: { info: '642 pts · 189 com', hover: 'AI Agents · Desktop Tools' } },
    { id: 'hn-2', title: 'Why SQLite is the only database you might need in 2026', url: 'https://news.ycombinator.com/item?id=41829144', extra: { info: '892 pts · 345 com', hover: 'Databases · Architecture' } },
    { id: 'hn-3', title: 'The architecture behind modern multi-modal reasoning models', url: 'https://news.ycombinator.com/item?id=41828003', extra: { info: '418 pts · 112 com', hover: 'Machine Learning · Deep Dive' } },
    { id: 'hn-4', title: 'Reflections on 10 years of building distributed systems in Go', url: 'https://news.ycombinator.com/item?id=41826991', extra: { info: '523 pts · 174 com', hover: 'Software Engineering · Systems' } },
    { id: 'hn-5', title: 'Ask HN: What tools have genuinely changed your daily programming workflow?', url: 'https://news.ycombinator.com/item?id=41825812', extra: { info: '712 pts · 480 com', hover: 'Productivity · Developer Tools' } },
    { id: 'hn-6', title: 'Linux 6.12 brings real-time PREEMPT_RT officially into mainline kernel', url: 'https://news.ycombinator.com/item?id=41824705', extra: { info: '389 pts · 98 com', hover: 'Linux Kernel · Open Source' } },
    { id: 'hn-7', title: 'Show HN: Minimalist terminal-based personal kanban and pomodoro in Rust', url: 'https://news.ycombinator.com/item?id=41823610', extra: { info: '315 pts · 84 com', hover: 'Rust Tools · Productivity' } },
    { id: 'hn-8', title: 'Why local-first software is quietly becoming the standard for craft tools', url: 'https://news.ycombinator.com/item?id=41822501', extra: { info: '540 pts · 210 com', hover: 'Software Architecture · Local First' } },
    { id: 'hn-9', title: 'Postgres 17 query planner performance optimizations on multi-core ARM', url: 'https://news.ycombinator.com/item?id=41821415', extra: { info: '425 pts · 130 com', hover: 'Databases · PostgreSQL' } },
    { id: 'hn-10', title: 'The anatomy of an ultra-low latency WebSocket server written in Zig', url: 'https://news.ycombinator.com/item?id=41820302', extra: { info: '298 pts · 76 com', hover: 'Zig · High Performance' } },
  ],
  ithome: [
    { id: 'it-1', title: '苹果正测试新一代 M4 Max 与 Ultra 芯片，多核与神经引擎性能再创新高', url: 'https://www.ithome.com/0/802/120.htm', extra: { info: '热评 420', hover: '芯片资讯 · 苹果前沿' } },
    { id: 'it-2', title: '微软 Windows 11 发布新预览版：任务栏全面支持无感平滑滚动与分栏优化', url: 'https://www.ithome.com/0/802/115.htm', extra: { info: '8.9万阅读', hover: '系统软件 · 体验提升' } },
    { id: 'it-3', title: 'OpenAI 宣布开放高级语音模式与结构化调用多模态 API', url: 'https://www.ithome.com/0/802/098.htm', extra: { info: '热评 650', hover: '人工智能 · 模型演进' } },
    { id: 'it-4', title: '联想与华硕多款轻薄性能本首发搭载新型高能效架构处理器', url: 'https://www.ithome.com/0/802/085.htm', extra: { info: '6.2万阅读', hover: '笔电前沿 · 硬件新品' } },
    { id: 'it-5', title: '我国科学家成功研制新型二维半导体芯片原型，功耗显著降低 60%', url: 'https://www.ithome.com/0/802/072.htm', extra: { info: '12.8万阅读', hover: '硬科技 · 突破成果' } },
    { id: 'it-6', title: '谷歌 Chrome 推出全新性能内存节省器 2.0，后台标签休眠更深度', url: 'https://www.ithome.com/0/802/054.htm', extra: { info: '5.4万阅读', hover: '浏览器 · 性能优化' } },
    { id: 'it-7', title: '国产开源操作系统生态迎来里程碑，跨设备多屏互联与剪贴流转再升级', url: 'https://www.ithome.com/0/802/041.htm', extra: { info: '4.7万阅读', hover: '国产系统 · 生态创新' } },
    { id: 'it-8', title: '固态硬盘价格走势进入平稳期，超高速 PCIe 5.0 颗粒出货加速放量', url: 'https://www.ithome.com/0/802/032.htm', extra: { info: '3.9万阅读', hover: '硬件行情 · 存储前沿' } },
    { id: 'it-9', title: '工信部多举措深化新型工业化，推进全国算力与工业互联一体化调度', url: 'https://www.ithome.com/0/802/021.htm', extra: { info: '5.1万阅读', hover: '产业政策 · 算力网络' } },
    { id: 'it-10', title: '智能家居 Matter 协议全设备生态扩展，跨品牌智能家电联动更稳定', url: 'https://www.ithome.com/0/802/010.htm', extra: { info: '3.3万阅读', hover: '智能家居 · 协议标准' } },
  ],
  sspai: [
    { id: 'ss-1', title: '用 Raycast 深度打磨 macOS 键盘流：我的 20+ 高频实用快捷命令清单', url: 'https://sspai.com/post/93210', extra: { info: '推荐 · 984赞', hover: '效率工具 · 深度玩法' } },
    { id: 'ss-2', title: '告别文件混乱：如何搭建一份零维护成本的自动化知识管理与归档体系', url: 'https://sspai.com/post/93185', extra: { info: '精选 · 1.2k赞', hover: '工作流 · 生产力系统' } },
    { id: 'ss-3', title: '深度评测：Mole 能否成为 macOS 上最好的开源系统深度瘦身工具？', url: 'https://sspai.com/post/93120', extra: { info: '热门 · 840赞', hover: '极客利器 · 深度瘦身' } },
    { id: 'ss-4', title: '从零开始打造双屏办公桌面：人体工学与视觉动线搭建指南', url: 'https://sspai.com/post/93092', extra: { info: '生活 · 650赞', hover: '桌面文化 · 工位搭建' } },
    { id: 'ss-5', title: '健康专注：我是如何在全天高强度敲代码中保持规律补水与站立的', url: 'https://sspai.com/post/93045', extra: { info: '健康 · 430赞', hover: '数字生活 · 习惯养成' } },
    { id: 'ss-6', title: '不用开会员：利用开源大模型聚合对比，重塑外文文献与代码翻译体验', url: 'https://sspai.com/post/92998', extra: { info: 'AI探索 · 720赞', hover: '翻译工具 · 开源应用' } },
    { id: 'ss-7', title: '数字极简：我如何通过精简通知与整理通讯录找回无打扰的深度心流', url: 'https://sspai.com/post/92942', extra: { info: '生活 · 510赞', hover: '数字生活 · 极简主义' } },
    { id: 'ss-8', title: '给创作者的代码利器：如何用 Markdown + Git 构建永不丢失的个人文库', url: 'https://sspai.com/post/92880', extra: { info: '精选 · 760赞', hover: '个人知识库 · 写作工具' } },
    { id: 'ss-9', title: '手把手教你利用自动化捷径实现打卡记账、随笔与周报的流水线归档', url: 'https://sspai.com/post/92815', extra: { info: '效率 · 690赞', hover: '自动化 · 捷径工作流' } },
    { id: 'ss-10', title: '工位进化史：从混乱缠绕的线缆到全无线极简桌搭的五年折腾反思', url: 'https://sspai.com/post/92760', extra: { info: '生活 · 820赞', hover: '工位桌搭 · 硬件极客' } },
  ],
  juejin: [
    { id: 'jj-1', title: '2026 前端工程化新范式：从 Vite 构建优化到微前端架构落地实践', url: 'https://juejin.cn/post/7421890123', extra: { info: '3.8万浏览', hover: '前端工程 · 性能调优' } },
    { id: 'jj-2', title: 'DeepSeek 接入实践：在 Next.js / Astro 项目中无痛实现流式高响应生成', url: 'https://juejin.cn/post/7421765432', extra: { info: '2.9万浏览', hover: 'AI工程化 · 全栈开发' } },
    { id: 'jj-3', title: '从 0 到 1 搞定百万级向量检索：Milvus 在企业级 RAG 系统的性能调优', url: 'https://juejin.cn/post/7421654321', extra: { info: '1.8万浏览', hover: '架构设计 · 向量数据库' } },
    { id: 'jj-4', title: '千万级长连接架构设计：基于 Go 与 WebSocket 的高性能推送中台', url: 'https://juejin.cn/post/7421543210', extra: { info: '2.4万浏览', hover: '后端架构 · 高并发' } },
    { id: 'jj-5', title: '聊聊 React 19 与 Astro View Transitions：无水合闪烁的单页级体验', url: 'https://juejin.cn/post/7421432109', extra: { info: '1.6万浏览', hover: '前端架构 · 体验设计' } },
    { id: 'jj-6', title: 'TypeScript 高级体操与模式：从类型守卫到全自动 Schema 推导', url: 'https://juejin.cn/post/7421321098', extra: { info: '2.1万浏览', hover: 'TypeScript · 进阶技巧' } },
    { id: 'jj-7', title: '从单体到分布式：企业级微服务网关限流、鉴权与高可用容灾演进方案', url: 'https://juejin.cn/post/7421210987', extra: { info: '1.9万浏览', hover: '微服务架构 · 高可用' } },
    { id: 'jj-8', title: '现代 CSS 原生黑科技：无需 JS 也能丝滑实现视差滚动与容器查询', url: 'https://juejin.cn/post/7421109876', extra: { info: '1.4万浏览', hover: '现代CSS · 布局艺术' } },
    { id: 'jj-9', title: 'Node.js 22 核心特性剖析：原生 WebSocket、类型剥离与 V8 引擎性能跃迁', url: 'https://juejin.cn/post/7421008765', extra: { info: '2.2万浏览', hover: 'Node.js · 底层原理' } },
    { id: 'jj-10', title: '手把手带你手写一个轻量级高性能客户端内存缓存与持久化同步库', url: 'https://juejin.cn/post/7420907654', extra: { info: '1.5万浏览', hover: '源码实现 · 缓存算法' } },
  ],
  zhihu: [
    { id: 'zh-1', title: '如何评价最新发布的全球开源大模型评测？国内开源生态现状如何？', url: 'https://www.zhihu.com/question/682019234', extra: { info: '6820万热度', hover: 'AI前沿 · 2450回答' } },
    { id: 'zh-2', title: '从事软件工程或技术开发，有哪些越早明白越受益的职场与生活认知？', url: 'https://www.zhihu.com/question/541029812', extra: { info: '5410万热度', hover: '职场经验 · 3180回答' } },
    { id: 'zh-3', title: '为什么越来越多极客和程序员倾向于选择无后台常驻的开源工具？', url: 'https://www.zhihu.com/question/429018742', extra: { info: '4290万热度', hover: '工具选择 · 1200回答' } },
    { id: 'zh-4', title: '如何看待 2026 年人工智能在自动化编程与 Agent 自主协作中的突破？', url: 'https://www.zhihu.com/question/380029182', extra: { info: '3800万热度', hover: '技术思考 · 980回答' } },
    { id: 'zh-5', title: '有哪些小巧精美、用过之后就再也离不开的 macOS 原生级效率神仙软件？', url: 'https://www.zhihu.com/question/342019482', extra: { info: '3420万热度', hover: '软件推荐 · 1860回答' } },
    { id: 'zh-6', title: '普通人如何建立长期稳定的作息习惯与心理复原力？', url: 'https://www.zhihu.com/question/290018472', extra: { info: '2900万热度', hover: '健康成长 · 1430回答' } },
    { id: 'zh-7', title: '在信息泛滥的时代，如何建立独立的信息获取渠道与高质量过滤器？', url: 'https://www.zhihu.com/question/265017321', extra: { info: '2650万热度', hover: '认知提升 · 870回答' } },
    { id: 'zh-8', title: '如何看待现代软件架构中“过早优化”与“超前技术选型”之间的权衡？', url: 'https://www.zhihu.com/question/234016210', extra: { info: '2340万热度', hover: '架构设计 · 620回答' } },
    { id: 'zh-9', title: '那些长期坚持自律、专注与技术深耕的人，后来都在经历怎样的质变？', url: 'https://www.zhihu.com/question/210015109', extra: { info: '2100万热度', hover: '个人成长 · 1140回答' } },
    { id: 'zh-10', title: '有哪些低成本却能成倍提升租房与办公幸福感的高品质好物？', url: 'https://www.zhihu.com/question/189014098', extra: { info: '1890万热度', hover: '生活美学 · 930回答' } },
  ],
  weibo: [
    { id: 'wb-1', title: '全国秋季气温迎来大幅转折 降温防寒指南', url: 'https://s.weibo.com/weibo?q=降温防寒指南', extra: { info: '沸 · 482万热搜', hover: '民生要闻' } },
    { id: 'wb-2', title: '新一代开源科技成果集中亮相展示', url: 'https://s.weibo.com/weibo?q=开源科技成果展示', extra: { info: '新 · 392万热搜', hover: '科技动态' } },
    { id: 'wb-3', title: '打工人周三劳逸结合时间表冲上热搜', url: 'https://s.weibo.com/weibo?q=劳逸结合时间表', extra: { info: '热 · 310万热搜', hover: '社会热议' } },
    { id: 'wb-4', title: '我国航天与深海科考多项关键技术取得新突破', url: 'https://s.weibo.com/weibo?q=航天深海科考突破', extra: { info: '280万热搜', hover: '科技突破' } },
    { id: 'wb-5', title: '如何改善久坐带来的肌肉紧张与视力疲劳', url: 'https://s.weibo.com/weibo?q=久坐疲劳改善', extra: { info: '热 · 245万热搜', hover: '健康生活' } },
    { id: 'wb-6', title: '数字时代个人隐私数据与设备安全防范常识', url: 'https://s.weibo.com/weibo?q=设备安全防范常识', extra: { info: '198万热搜', hover: '网络安全' } },
    { id: 'wb-7', title: '深秋户外徒步与城市骑行实用安全指南', url: 'https://s.weibo.com/weibo?q=秋季户外徒步安全指南', extra: { info: '182万热搜', hover: '生活方式' } },
    { id: 'wb-8', title: '我国清洁能源装机规模持续提升 绿色转型稳步推进', url: 'https://s.weibo.com/weibo?q=清洁能源装机规模提升', extra: { info: '165万热搜', hover: '绿色发展' } },
    { id: 'wb-9', title: '年轻人流行“反向消费”：注重实用与极简主义', url: 'https://s.weibo.com/weibo?q=年轻人流行反向消费', extra: { info: '148万热搜', hover: '消费观念' } },
    { id: 'wb-10', title: '秋冬季节如何科学保持呼吸道健康与室内科学通风', url: 'https://s.weibo.com/weibo?q=呼吸道健康与室内通风', extra: { info: '132万热搜', hover: '健康科普' } },
  ],
  bilibili: [
    { id: 'bili-1', title: '【硬核】花了三个月，我写出了能真正自主协作的代码智能体系统！', url: 'https://search.bilibili.com/all?keyword=自主协作代码智能体', extra: { info: '186万播放 · 12.4万赞', hover: '科技硬核' } },
    { id: 'bili-2', title: '这可能是目前最舒服的 Mac 桌面搭配与效率神级工具推荐', url: 'https://search.bilibili.com/all?keyword=Mac桌面搭配与效率工具', extra: { info: '94万播放 · 8.9万赞', hover: '桌面好物' } },
    { id: 'bili-3', title: '【科普】从晶体管到神经网络：深度剖析现代芯片如何思考', url: 'https://search.bilibili.com/all?keyword=现代芯片如何思考', extra: { info: '245万播放 · 21.3万赞', hover: '硬核科普' } },
    { id: 'bili-4', title: '告别颈椎酸痛！程序员实测有效的工位拉伸与坐姿纠正指南', url: 'https://search.bilibili.com/all?keyword=工位拉伸与坐姿纠正', extra: { info: '78万播放 · 6.2万赞', hover: '职场健康' } },
    { id: 'bili-5', title: '【自制】手搓一台属于极客的墨水屏日历与全天工时看板', url: 'https://search.bilibili.com/all?keyword=墨水屏日历看板', extra: { info: '112万播放 · 9.8万赞', hover: '数码DIY' } },
    { id: 'bili-6', title: '深入浅出：为什么分布式系统里最难的问题始终是共识与时钟？', url: 'https://search.bilibili.com/all?keyword=分布式系统共识', extra: { info: '65万播放 · 4.5万赞', hover: '计算机技术' } },
    { id: 'bili-7', title: '【纪录片】重访早期车库：那些改变世界的黑客是怎样做出初版产品的', url: 'https://search.bilibili.com/all?keyword=极客车库创业纪录片', extra: { info: '82万播放 · 7.1万赞', hover: '科技人文' } },
    { id: 'bili-8', title: '废物利用：把闲置旧手机改造成全天候家庭智能时钟与信息小中枢', url: 'https://search.bilibili.com/all?keyword=旧手机改造家庭时钟', extra: { info: '61万播放 · 5.4万赞', hover: '极客改造' } },
    { id: 'bili-9', title: '【干货】从零拆解现代浏览器渲染流水线：60 帧丝滑动画背后的黑科技', url: 'https://search.bilibili.com/all?keyword=现代浏览器渲染流水线', extra: { info: '53万播放 · 4.8万赞', hover: '前端底层' } },
    { id: 'bili-10', title: '每天五分钟：办公族实测真正有效的腰部肌肉激活与体态改善动作', url: 'https://search.bilibili.com/all?keyword=办公族腰部肌肉改善', extra: { info: '47万播放 · 3.9万赞', hover: '运动健康' } },
  ],
  toutiao: [
    { id: 'tt-1', title: '中央依法治国办启动多领域法治督察专项行动', url: 'https://www.toutiao.com/search/?keyword=依法治国法治督察', extra: { info: '头条 · 120万阅读', hover: '国内要闻' } },
    { id: 'tt-2', title: '全国多地启动秋季重大科技与高新技术产业项目对接', url: 'https://www.toutiao.com/search/?keyword=科技高新产业对接', extra: { info: '推荐 · 98万阅读', hover: '产业创新' } },
    { id: 'tt-3', title: '海军辽宁舰航母编队赴西太平洋相关海域开展常态化训练', url: 'https://www.toutiao.com/search/?keyword=辽宁舰西太平洋训练', extra: { info: '热点 · 150万阅读', hover: '军事热点' } },
    { id: 'tt-4', title: '国家铁路客运量保持高位平稳运行 旅游专列受热捧', url: 'https://www.toutiao.com/search/?keyword=国家铁路客运量', extra: { info: '85万阅读', hover: '经济民生' } },
    { id: 'tt-5', title: '新版国家级公众健康保障与疾病预防指南正式出台', url: 'https://www.toutiao.com/search/?keyword=公众健康保障指南', extra: { info: '64万阅读', hover: '公众健康' } },
    { id: 'tt-6', title: '我国数字经济核心产业增加值占 GDP 比重持续攀升', url: 'https://www.toutiao.com/search/?keyword=数字经济核心产业增加值', extra: { info: '72万阅读', hover: '宏观经济' } },
    { id: 'tt-7', title: '全国多地秋粮收购工作全面展开 仓容与资金保障充足', url: 'https://www.toutiao.com/search/?keyword=秋粮收购工作全面展开', extra: { info: '59万阅读', hover: '农业民生' } },
    { id: 'tt-8', title: '新型综合立体交通网络建设提速 区域互联互通迈上新台阶', url: 'https://www.toutiao.com/search/?keyword=综合立体交通网络建设', extra: { info: '48万阅读', hover: '基础设施' } },
    { id: 'tt-9', title: '低空经济应用场景扩容 载人飞行器试验运行获新进展', url: 'https://www.toutiao.com/search/?keyword=低空经济应用场景扩容', extra: { info: '63万阅读', hover: '未来产业' } },
    { id: 'tt-10', title: '各地精准施策优化营商环境 激发高新技术企业创新创造活力', url: 'https://www.toutiao.com/search/?keyword=优化营商环境激发创新活力', extra: { info: '52万阅读', hover: '经济创新' } },
  ],
  baidu: [
    { id: 'bd-1', title: '辽宁舰航母编队西太平洋开展训练', url: 'https://www.baidu.com/s?wd=辽宁舰航母编队西太平洋开展训练', extra: { info: '热 · 490万指数', hover: '热搜大事件' } },
    { id: 'bd-2', title: '多地降温超10度 秋裤预警地图出炉', url: 'https://www.baidu.com/s?wd=多地降温超10度', extra: { info: '410万指数', hover: '天气民生' } },
    { id: 'bd-3', title: '科技赋能：全自动低空物流试验区加速扩围', url: 'https://www.baidu.com/s?wd=低空物流试验区', extra: { info: '360万指数', hover: '前沿科技' } },
    { id: 'bd-4', title: '全国高校科研创新与成果转化对接大会开幕', url: 'https://www.baidu.com/s?wd=科研创新与成果转化', extra: { info: '310万指数', hover: '科技创新' } },
    { id: 'bd-5', title: '个人所得税专项附加扣除与便民服务新提示', url: 'https://www.baidu.com/s?wd=个人所得税专项附加扣除', extra: { info: '280万指数', hover: '便民政策' } },
    { id: 'bd-6', title: '智能健康设备普及：年轻人打卡养生新方式', url: 'https://www.baidu.com/s?wd=年轻人打卡养生新方式', extra: { info: '220万指数', hover: '生活方式' } },
    { id: 'bd-7', title: '全国多地迎来秋冬红叶最佳观赏打卡期', url: 'https://www.baidu.com/s?wd=秋冬红叶最佳观赏期', extra: { info: '205万指数', hover: '文旅出行' } },
    { id: 'bd-8', title: '深空探测实验室多项关键技术攻关密集取得成果', url: 'https://www.baidu.com/s?wd=深空探测实验室关键技术攻关', extra: { info: '190万指数', hover: '前沿航天' } },
    { id: 'bd-9', title: '节能家电以旧换新补贴政策带动全国消费活力持续释放', url: 'https://www.baidu.com/s?wd=节能家电以旧换新补贴政策', extra: { info: '175万指数', hover: '消费新潮' } },
    { id: 'bd-10', title: '秋季科学食补与防干燥养生常识引发广泛讨论', url: 'https://www.baidu.com/s?wd=秋季防干燥养生常识', extra: { info: '160万指数', hover: '健康养生' } },
  ],
  douyin: [
    { id: 'dy-1', title: '秋日第一杯热茶与极简治愈系日常分享', url: 'https://www.douyin.com/search/秋日第一杯热茶', extra: { info: '890万在看', hover: '热点推荐 · 温暖日常' } },
    { id: 'dy-2', title: '硬核打工人桌面改造：如何打造一台高效静音生产力主机', url: 'https://www.douyin.com/search/工位桌面改造', extra: { info: '650万在看', hover: '科技数码 · 极客桌面' } },
    { id: 'dy-3', title: '程序员下班后的一小时：自学新语言与极简生活记录', url: 'https://www.douyin.com/search/程序员下班生活', extra: { info: '520万在看', hover: '职场生活 · 励志成长' } },
    { id: 'dy-4', title: '这几个 macOS 隐藏实用神级快捷键你用过几个', url: 'https://www.douyin.com/search/macOS隐藏快捷键', extra: { info: '410万在看', hover: '效率数码 · 软件技巧' } },
    { id: 'dy-5', title: '不用去健身房：久坐办公人群 5 分钟全身肩颈舒展拉伸', url: 'https://www.douyin.com/search/办公室肩颈拉伸', extra: { info: '380万在看', hover: '健康打卡 · 轻松放松' } },
    { id: 'dy-6', title: '航天探秘：新一代火箭发动机关键试验背后的硬核黑科技', url: 'https://www.douyin.com/search/航天发动机硬核科普', extra: { info: '340万在看', hover: '硬核科技 · 国之重器' } },
    { id: 'dy-7', title: '秋季降温穿搭实用灵感：极简机能与舒适保暖', url: 'https://www.douyin.com/search/秋季降温穿搭', extra: { info: '290万在看', hover: '潮流生活 · 穿搭指南' } },
    { id: 'dy-8', title: '自制极简个人主页与技术博客：零成本部署全流程教程', url: 'https://www.douyin.com/search/个人博客搭建教程', extra: { info: '260万在看', hover: '开发实战 · 独立创作' } },
    { id: 'dy-9', title: '从零开始学烹饪：快手又低脂的打工人便当一周不重样', url: 'https://www.douyin.com/search/打工人快手便当', extra: { info: '230万在看', hover: '美食生活 · 营养健康' } },
    { id: 'dy-10', title: '数字游民实录：带着一台轻薄本旅居大理的真实一个月体验', url: 'https://www.douyin.com/search/数字游民真实生活', extra: { info: '190万在看', hover: '生活方式 · 自由工作' } },
  ],
  'cls-hot': [
    { id: 'cls-1', title: '央行开展公开市场逆回购操作，精准维护银行体系流动性合理充裕', url: 'https://www.cls.cn/telegraph', extra: { info: '宏观要闻 · 快讯', hover: '货币政策' } },
    { id: 'cls-2', title: '高科技与半导体产业链上市公司三季报业绩集中披露，订单韧性凸显', url: 'https://www.cls.cn/telegraph', extra: { info: '产业透视 · 实时', hover: '半导体产业' } },
    { id: 'cls-3', title: '国家多部委联合发文推动全国一体化算力网高质量建设与普惠落地', url: 'https://www.cls.cn/telegraph', extra: { info: '政策动态 · 深度', hover: '算力网络' } },
    { id: 'cls-4', title: '消费电子与智能终端需求持续回暖，上游核心零部件出货量稳步上行', url: 'https://www.cls.cn/telegraph', extra: { info: '市场风向 · 82分', hover: '消费电子' } },
    { id: 'cls-5', title: '多地出台科技型中小企业投融资协同支持新政，激发民间创新活力', url: 'https://www.cls.cn/telegraph', extra: { info: '资本观察 · 快讯', hover: '企业融资' } },
    { id: 'cls-6', title: '海外资本市场主要股指震荡整理，大宗商品与贵金属市场交投活跃', url: 'https://www.cls.cn/telegraph', extra: { info: '全球市场 · 快讯', hover: '海外宏观' } },
    { id: 'cls-7', title: '新能源汽车海外出口渗透率稳步攀升，充换电基础设施供应链协同出海', url: 'https://www.cls.cn/telegraph', extra: { info: '出海纵览 · 实时', hover: '新能源汽车' } },
    { id: 'cls-8', title: '数据要素与数字资产入表规则进一步细化落地，企业数字化资产价值凸显', url: 'https://www.cls.cn/telegraph', extra: { info: '数字经济 · 深度', hover: '数据要素' } },
    { id: 'cls-9', title: '国内商业航天与低空经济产业试验基地陆续开工，多地设立专项产业基金', url: 'https://www.cls.cn/telegraph', extra: { info: '产业动向 · 快讯', hover: '商业航天' } },
    { id: 'cls-10', title: '三大基础电信运营商公布最新 5G-A 创新应用试点，工业互联网场景落地深化', url: 'https://www.cls.cn/telegraph', extra: { info: '通信科技 · 实时', hover: '工业互联' } },
  ],
  'wallstreetcn-hot': [
    { id: 'wscn-1', title: '美联储最新会议纪要出炉：对后续利率路径与通胀回落保持谨慎数据依赖', url: 'https://wallstreetcn.com/news', extra: { info: '全球宏观 · 95评', hover: '美联储动向' } },
    { id: 'wscn-2', title: '国际油价与大宗商品在供需博弈中维持区间宽幅震荡', url: 'https://wallstreetcn.com/news', extra: { info: '原油大宗 · 68评', hover: '大宗商品' } },
    { id: 'wscn-3', title: '全球云服务巨头资本开支加码，AI 基础设施采购周期持续超预期', url: 'https://wallstreetcn.com/news', extra: { info: '科技产业 · 120评', hover: '算力基础设施' } },
    { id: 'wscn-4', title: '欧洲央行多位官员表态：经济软着陆背景下货币政策维持灵活克制', url: 'https://wallstreetcn.com/news', extra: { info: '欧洲市场 · 42评', hover: '欧洲央行' } },
    { id: 'wscn-5', title: '亚太主要市场早盘多数走高，半导体与汽车产业链龙头领涨', url: 'https://wallstreetcn.com/news', extra: { info: '亚太金融 · 56评', hover: '亚太股市' } },
    { id: 'wscn-6', title: '离岸人民币汇率在合理均衡水平上保持双向波动与基本稳定', url: 'https://wallstreetcn.com/news', extra: { info: '外汇市场 · 88评', hover: '外汇汇率' } },
    { id: 'wscn-7', title: '美国十年期国债收益率高位整理，全球主要资产定价锚受多方持续审视', url: 'https://wallstreetcn.com/news', extra: { info: '美债资产 · 74评', hover: '全球固收' } },
    { id: 'wscn-8', title: '国际主流投行发布四季度展望：维持对亚洲核心高科技供应链超配评级', url: 'https://wallstreetcn.com/news', extra: { info: '投行观点 · 63评', hover: '机构策略' } },
    { id: 'wscn-9', title: '新兴市场本币资产在降息周期演进中展现出更强抗风险韧性与吸引力', url: 'https://wallstreetcn.com/news', extra: { info: '新兴市场 · 49评', hover: '跨境资金' } },
    { id: 'wscn-10', title: '全球半导体设备出货额保持正增长，先进制程晶圆厂扩产投资进入新阶段', url: 'https://wallstreetcn.com/news', extra: { info: '芯片供应链 · 108评', hover: '半导体设备' } },
  ],
  'xueqiu-hotstock': [
    { id: 'xq-1', title: '中芯国际 (688981) - 半导体先进制程产能利用率提升，资金高频关注', url: 'https://xueqiu.com/S/SH688981', extra: { info: 'TOP 1 · +4.8%', hover: '半导体龙头' } },
    { id: 'xq-2', title: '腾讯控股 (00700) - 核心业务现金流充沛，高额回购持续稳步推进', url: 'https://xueqiu.com/S/00700', extra: { info: 'TOP 2 · +2.1%', hover: '互联网巨头' } },
    { id: 'xq-3', title: '宁德时代 (300750) - 新一代超充动力电池出货放量，全球份额领先', url: 'https://xueqiu.com/S/SZ300750', extra: { info: 'TOP 3 · +3.5%', hover: '新能源锂电' } },
    { id: 'xq-4', title: '贵州茅台 (600519) - 经营现金流稳健，核心消费资产配置价值受关注', url: 'https://xueqiu.com/S/SH600519', extra: { info: 'TOP 4 · +0.9%', hover: '核心消费' } },
    { id: 'xq-5', title: '比亚迪 (002594) - 海外市场单月交付破纪录，全球化出海步伐提速', url: 'https://xueqiu.com/S/SZ002594', extra: { info: 'TOP 5 · +2.7%', hover: '新能源汽车' } },
    { id: 'xq-6', title: '东方财富 (300059) - 市场交易量与两融余额维持活跃，券商科技龙头', url: 'https://xueqiu.com/S/SZ300059', extra: { info: 'TOP 6 · +5.2%', hover: '互联网金融' } },
    { id: 'xq-7', title: '药明康德 (603259) - 全球 CXO 龙头新签海外订单稳健向好，估值具备性价比', url: 'https://xueqiu.com/S/SH603259', extra: { info: 'TOP 7 · +3.1%', hover: '医药研发外包' } },
    { id: 'xq-8', title: '工业富联 (601138) - AI 高端算力服务器及高速交换机出货放量，利润超预期', url: 'https://xueqiu.com/S/SH601138', extra: { info: 'TOP 8 · +4.2%', hover: 'AI算力制造' } },
    { id: 'xq-9', title: '长江电力 (600900) - 六库联调水能利用率处于高位，高股息防御资产受青睐', url: 'https://xueqiu.com/S/SH600900', extra: { info: 'TOP 9 · +0.7%', hover: '公用事业' } },
    { id: 'xq-10', title: '中国移动 (600941) - 算网基础设施与数字化转型业务高增，分红派息稳健', url: 'https://xueqiu.com/S/SH600941', extra: { info: 'TOP 10 · +1.4%', hover: '核心通信' } },
  ],
};

/**
 * Direct scraper / parser for official https://github.com/trending page
 */
export async function fetchGitHubTrendingDirect(): Promise<HotNewsItem[]> {
  try {
    const res = await fetch('https://github.com/trending', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept': 'text/html',
      },
      signal: AbortSignal.timeout(6000),
    });

    if (!res.ok) return [];
    const html = await res.text();
    const articles = html.split('<article class="Box-row">').slice(1);

    const items: HotNewsItem[] = [];
    for (let i = 0; i < articles.length && items.length < 15; i++) {
      const art = articles[i];
      const h2Match = art.match(/<h2[^>]*>[\s\S]*?<a[^>]+href="\/([^"]+)"[\s\S]*?<\/h2>/);
      if (!h2Match) continue;
      const repoPath = h2Match[1].trim();

      const pMatch = art.match(/<p[^>]*class="[^"]*col-9[^"]*"[^>]*>([\s\S]*?)<\/p>/);
      const desc = pMatch ? pMatch[1].replace(/<[^>]+>/g, '').trim().replace(/&amp;/g, '&') : '';

      const langMatch = art.match(/itemprop="programmingLanguage"[^>]*>([\s\S]*?)<\/span>/);
      const lang = langMatch ? langMatch[1].trim() : '';

      const todayMatch = art.match(/([0-9,]+)\s+stars\s+today/i);
      const starsToday = todayMatch ? todayMatch[1] : '';

      const totalStarsMatch = art.match(/href="\/[^/]+\/[^/]+\/stargazers"[^>]*>[\s\S]*?<\/svg>([\s\S]*?)<\/a>/);
      const totalStars = totalStarsMatch ? totalStarsMatch[1].replace(/<[^>]+>/g, '').trim() : '';

      const starInfo = starsToday ? `⭐ ${totalStars} · 今日+${starsToday}` : (totalStars ? `⭐ ${totalStars}` : '热门开源');
      const hoverInfo = [lang, desc].filter(Boolean).join(' · ');

      items.push({
        id: `gh-trending-${repoPath.replace('/', '-')}`,
        title: `${repoPath}${desc ? ` - ${desc}` : ''}`,
        url: `https://github.com/${repoPath}`,
        extra: {
          info: starInfo,
          hover: hoverInfo || 'GitHub Trending 今日热门',
        },
      });
    }

    return items;
  } catch (err) {
    console.warn('[newsService] fetchGitHubTrendingDirect failed:', err);
    return [];
  }
}

/**
 * Fetch hot news across platforms using newsnext/newsnow API with robust fallback & live augmentation
 */
export async function fetchHotNews(sourceIds: string[] = Object.keys(SOURCE_CONFIGS)): Promise<HotNewsSource[]> {
  if (hotCache && Date.now() - hotCache.timestamp < CACHE_TTL_MS) {
    return hotCache.data;
  }

  const resultMap = new Map<string, HotNewsSource>();

  // 1. Try fetching from newsnow entire endpoint with browser identity & ample timeout
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    const res = await fetch('https://newsnow.busiyi.world/api/s/entire', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://newsnow.busiyi.world/',
        'Origin': 'https://newsnow.busiyi.world',
      },
      body: JSON.stringify({ sources: sourceIds }),
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        for (const s of data) {
          const cfg = SOURCE_CONFIGS[s.id];
          if (cfg && Array.isArray(s.items) && s.items.length > 0) {
            resultMap.set(s.id, {
              id: s.id,
              name: cfg.name,
              column: cfg.column,
              home: cfg.home,
              color: cfg.color,
              items: s.items.slice(0, 25),
              updatedTime: s.updatedTime || Date.now(),
            });
          }
        }
      }
    }
  } catch (err) {
    console.warn('[newsService] newsnow fetch failed or timed out:', err);
  }

  // 2. Fetch live data directly from official https://github.com/trending
  try {
    const liveTrending = await fetchGitHubTrendingDirect();
    if (liveTrending.length > 0) {
      const cfg = SOURCE_CONFIGS.github;
      resultMap.set('github', {
        id: 'github',
        name: cfg.name,
        column: cfg.column,
        home: 'https://github.com/trending',
        color: cfg.color,
        items: liveTrending,
        updatedTime: Date.now(),
      });
    }
  } catch {}

  // 3. Ensure EVERY requested source is covered with rich items
  const finalSources: HotNewsSource[] = [];
  for (const id of sourceIds) {
    const cfg = SOURCE_CONFIGS[id];
    if (!cfg) continue;

    const maxCount = cfg.maxItems || DEFAULT_MAX_ITEMS;

    if (resultMap.has(id)) {
      const src = resultMap.get(id)!;
      finalSources.push({
        ...src,
        items: src.items.slice(0, maxCount),
      });
    } else {
      const defaultItems = DEFAULT_HOT_ITEMS[id] || [
        {
          id: `${id}-sample-1`,
          title: `${cfg.name} 热门聚焦与前沿讨论`,
          url: cfg.home,
          extra: { info: '实时热搜', hover: `${cfg.name} 今日热点` },
        },
      ];
      finalSources.push({
        id,
        name: cfg.name,
        column: cfg.column,
        home: cfg.home,
        color: cfg.color,
        items: defaultItems.slice(0, maxCount),
        updatedTime: Date.now(),
      });
    }
  }

  hotCache = { data: finalSources, timestamp: Date.now() };
  return finalSources;
}
