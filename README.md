# 🍅 TomatoX Blog (tomato.astro)

> **极简克制 · 审美驱动 · 极速出水**  
> 个人主站与数字花园：[xujiuran.top](https://xujiuran.top) · GitHub: [@xujiuran](https://github.com/xujiuran?tab=repositories)

---

## 📖 项目简介

`tomato.astro` 是 TomatoX 的个人独立博客与数字花园前端，基于现代前端基石 **Astro 7.x** 与 **Tailwind CSS v4** 构建。

项目汲取了 **Tw93 的克制极简美学** 与 **Viki 的温暖生活质感**，摒弃了现代 Web 臃肿过度的工程化脚手架，以**默认零 JS 运行时**为理念，打造首屏即秒开、排版如纸质读物般舒适、兼具硬核极客气质与人文温度的个人自留地。

---

## 🌟 核心特色亮点

### 1. 📰 每日新闻雷达与全网实时风向标 (News & Radar)
不仅是一个静态博客，更是一个属于开发者与数字游民的信息降噪控制台：
- **晨起 60 秒看世界**：聚合每日要闻快讯、每日一句金句、历史上的今天与科技动态，自动过滤信息垃圾，聚焦核心事实。
- **全网热榜多维风向标**：
  - **极客科技**：GitHub Trending 实时趋势、V2EX 热门话题、掘金热榜、少数派 matrix。
  - **全网社会**：知乎热榜（支持 Cookie 鉴权逆向接口）、微博热搜、Bilibili 热门、百度热搜。
  - **商业财经**：36氪综合热搜、财联社电报、雪球热门。
- **高能交互设计**：
  - 支持全平台毫秒级关键字即时检索过滤；
  - 支持 **紧凑 (Dense)** 与 **舒适 (Normal)** 两档内容展示密度切换；
  - 联动自建的轻量级微服务后端 [`tomato.news`](https://github.com/xujiuran/tomato.news)，具备毫秒级响应与多源故障降级兜底。

### 2. 🐟 摸鱼人周历与生活流速感 (Moyu & Life Progress)
- **打工人贴心日历**：实时计算当前日期、农历甲子、节假日与调休判定。
- **时间流逝可视化**：精确展示本周进度、本月进度、本年流速百分比，时刻提醒珍惜韶华。
- **生活倒计时**：距离本周末放假倒计时、元旦、春节、五一、国庆等节假日倒数，兼具趣味与仪式感。

### 3. ✍️ 深度长文与即时随想 (Essays & Micro-Thoughts)
- **深度专栏**：专注于**现代前端架构、AI Coding 智能体工作流、微型工具产品工程**等深度沉淀。
- **即时碎念 (Memos)**：记录散步、编码、阅读与产品打磨过程中的即时灵感，类似个人私密动态流。
- **极致排版**：采用精挑细选的衬线/无衬线双轨字体搭配、行高与段间距微调，支持深浅双主题无缝切换。

### 4. 🧰 精选开源工具与好物推荐 (Curated Projects)
- 精选个人开发与日常重度依赖的开源软件、桌面工具（如 Mos、Clash Verge Rev、KeyStats 等）。
- 附带直达官网与开源仓库的卡片化展示，展示独立开发者的审美取向。

---

## ⚡️ 技术栈与架构哲学

| 领域 | 选型与优势 |
| :--- | :--- |
| **核心框架** | **Astro 7.x**：孤岛架构（Islands Architecture），页面默认输出为纯静态 HTML，极低 TTFB。 |
| **样式引擎** | **Tailwind CSS v4**：基于最新原生 CSS 变量体系，零繁琐配置，样式体积极小。 |
| **微服务联动** | 联动部署于 VPS 的 **tomato.news** (Hono + TypeScript) 动态服务，前后端解耦。 |
| **性能基准** | Lighthouse 性能、可访问性、SEO 评分接近全满分，首屏直出无任何水合白屏。 |
| **现代规范** | 原生深色/浅色自适应主题、完美响应式（移动端优化抽屉与触控）、全站 RSS 订阅生成。 |

---

## 📁 目录结构

```text
tomato.astro/
├── public/                     # 静态公共资源
│   ├── favicon.svg             # 专属品牌 Tomato 图标
│   └── images/                 # 图标与多媒体资源库
├── src/
│   ├── components/             # 高复用极简组件
│   │   ├── BaseHead.astro      # 全局 SEO、元信息与字体引入
│   │   ├── Header.astro        # 顶栏导航（含桌面端与移动端弹层）
│   │   ├── Footer.astro        # 底栏版权、GitHub 与 RSS
│   │   ├── Daily60sView.astro  # 每日 60 秒早报视图
│   │   ├── HotNewsView.astro   # 全网实时热榜交互组件（搜索/密度/分类）
│   │   ├── HomeDailyNewsSection.astro # 首页热点与早报速览
│   │   ├── MoyuCalendarSidebar.astro  # 摸鱼日历与进度侧边栏
│   │   └── TomatoXWordmark.astro      # 定制纯 CSS 品牌标识
│   ├── layouts/
│   │   └── BaseLayout.astro    # 核心页面骨架布局
│   ├── lib/
│   │   └── newsService.ts      # 新闻与热榜数据聚合器（多源容灾兜底）
│   ├── pages/
│   │   ├── index.astro         # 博客门户主页
│   │   ├── news/index.astro    # 每日新闻与全网风向标总览页
│   │   ├── posts/              # 深度文章归档
│   │   ├── thoughts/           # 随想与碎片备忘
│   │   ├── projects.astro      # 开源项目与精选好物
│   │   ├── about.astro         # 关于作者与站点
│   │   └── rss.xml.ts          # RSS 动态订阅源
│   └── styles/
│       └── global.css          # 全局设计规范、色彩系统与暗黑适配
└── astro.config.mjs            # Astro 配置文件
```

---

## 🛠 本地快速启动

```bash
# 1. 克隆仓库
git clone git@github.com:xujiuran/tomato.astro.git
cd tomato.astro

# 2. 安装依赖（推荐 Node >= 22）
npm install

# 3. 启动本地开发服务
npm run dev

# 4. 构建生产静态包
npm run build

# 5. 本地预览生产构建产物
npm run preview
```

本地服务默认运行在：`http://localhost:4321`

---

## 🚢 部署说明

由于本项目基于 Astro 静态预渲染架构，生成的 `./dist` 目录为高可用纯静态网页，可零配置一键部署至任何主流云平台：
- **Cloudflare Pages**（推荐，边缘毫秒级全球加速）
- **Vercel / Netlify**
- **自建 VPS (Nginx / Caddy / Docker)**
- **GitHub Pages**

---

## 📮 联络与友链

- **个人主站**：[https://xujiuran.top](https://xujiuran.top)
- **开源主页**：[https://github.com/xujiuran](https://github.com/xujiuran?tab=repositories)
- **RSS 订阅**：[https://xujiuran.top/rss.xml](https://xujiuran.top/rss.xml)

---

<div align="center">
  <sub>Built with ❤️ by TomatoX · Powered by Astro & Tailwind CSS</sub>
</div>
