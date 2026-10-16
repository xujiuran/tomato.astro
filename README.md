# 🍅 TomatoX Blog (tomato.astro)

> **极简克制 · 审美驱动 · 极速出水 · 实时水合**  
> 个人主站与数字花园：[xujiuran.top](https://xujiuran.top) · GitHub: [@xujiuran](https://github.com/xujiuran?tab=repositories)

---

## 📖 项目简介

`tomato.astro` 是 TomatoX 的个人独立博客与数字花园前端，基于现代前端基石 **Astro 7.x** 与 **Tailwind CSS v4** 构建。

本项目摒弃了现代 Web 臃肿过度的工程化脚手架，以**自主设计的美学规范**与**纸质读物级呼吸感排版**为基石，结合标志性 Tomato 硬核极客红视觉与暗黑/暖白自适应双模，打造首屏即秒开、兼具极客探索气质与生活温度的个人数字花园。

---

## 🌟 核心特色与设计亮点

### 1. ⚡️ 「SSG 静态骨架 + 客户端 SWR 静默水合」创新架构
彻底告别传统静态博客“必须每天定时打包部署才能更新新闻”的痛点：
- **首屏秒开与 SEO（静态构建产物）**：构建时生成的静态 HTML 作为首屏骨架，访客打开瞬间直出渲染，零白屏、对搜索引擎爬虫友好。
- **后台自动静默更新（前端直连 VPS）**：页面在浏览器加载完成后，后台自动异步向自建 VPS 微服务（[`https://news.xujiuran.top`](https://news.xujiuran.top)）拉取今天最新的 60 秒晨报与实时热榜（后端已原生开启 CORS 跨域支持）。若有更新，页面无感平滑刷新。
- **开箱即用的实时性**：无论你何时打包，访客无论何时访问，都能随时看到当天最新的天下要闻与分钟级实时热搜，无需维护繁琐的 CI 定时构建流水线。

### 2. 📰 每日新闻雷达与全网实时风向标 (Daily News & Radar)
不仅是记录文字的博客，更是属于开发者与数字游民的信息降噪控制台：
- **晨起 60 秒看世界**：聚合每日要闻快讯、每日一句金句、历史上的今天与科技动态，自动过滤信息噪音，聚焦核心事实。
- **多维实时热搜风向标**：
  - **极客科技**：GitHub Trending 今日热门代码库、V2EX 热门话题、掘金热榜、少数派 matrix。
  - **全网社会**：知乎热榜（逆向接口鉴权）、微博实时热搜、Bilibili 热门视频、百度热搜。
  - **商业财经**：36氪综合热搜、财联社电报、雪球热门股票与财经话题。
- **极客操控体验**：
  - 支持全平台毫秒级关键字即时检索过滤；
  - 支持 **紧凑 (Dense)** 与 **舒适 (Normal)** 两档内容展示密度切换；
  - 联动自建的轻量级微服务后端 [`tomato.news`](https://github.com/xujiuran/tomato.news)，具备毫秒级响应与多源容灾兜底。

### 3. 🐟 摸鱼人周历与时光流速感 (Moyu & Life Progress)
- **打工人贴心日历**：实时计算当前标准北京时间、农历干支节气、工作日/周末与节假日调休状态。
- **时间流逝可视化**：精确计算并展示本周进度、本月进度、本年流速百分比，感知时光流淌。
- **假日倒数挂件**：距离本周末放假倒计时、元旦、春节、五一、国庆等节假日倒数，兼具趣味性与生活仪式感。

### 4. ✍️ 深度长文与即时随想 (Essays & Micro-Thoughts)
- **技术与产品深度专栏**：沉淀现代前端架构演进、AI Coding 智能体实践、小而美独立产品设计等深度长文。
- **即时碎念 (Memos)**：记录散步、编码、阅读与产品打磨过程中的即时灵感碎片，呈现真实立体的思考脉络。
- **纸质阅读质感**：双轨字体设计微调、严谨字距与行高控制，长时间阅读依然轻松舒适。

### 5. 🧰 精选开源工具与独立产品 (Curated Projects)
- 精选独立开发者日常重度依赖的开源软件、桌面效率工具（如 Mos、Clash Verge Rev、KeyStats 等）。
- 附带直达官网与开源仓库的卡片化展示，传递克制、小而美的工具哲学。

### 6. ⌨️ 全局极客指令面板 (Raycast-Style Command Palette · `⌘K` / `/`)
- **全站秒级模糊检索**：覆盖全部技术文章、随想碎片、极客工具、新闻聚合与系统导航。
- **键盘流全流程操控**：全局快捷键 `⌘K`（或在空白处键入 `/`）毫秒级呼出，支持 `↑` `↓` 切换、`↵` 直达、`ESC` 退出。
- **系统快捷指令集合**：支持快速切换明暗主题、一键复制当前页链接、平滑回顶、启停 Zen 专注白噪音。

### 7. 📖 深度阅读体验套件 (Article Reading Suite)
- **智能悬浮大纲目录 (TOC)**：自动提取 H2/H3 标题并生成带层级的大纲，支持平滑滚动与锚点精准跳转。
- **双向视口滚动监听 (Scroll Spy)**：阅读时侧边栏大纲实时高亮当前小节，并在卡片顶部显示精准阅读百分比（如 `42%`）。
- **视口顶部阅读进度条**：全站无感轻量级红橙渐变进度指示，随时掌控阅读节奏。
- **Mac 风格代码块与一键复制**：经典红黄绿交通灯窗口装饰、语言类型标识，搭配一键无损复制与剪贴板反馈动画。

### 8. 🧱 GitHub 提交与写作产出热力墙 (Activity Heatmap Wall)
- **52 周连续热力矩阵**：以极客风格的方块阵列呈现过去 365 天的代码提交与文章产出节奏。
- **成就连击追踪**：实时计算「当前连续创作天数」与「最长连续打卡纪录」，搭配灵动悬浮气泡查看具体日期活跃详情。

### 9. 🖼️ 单条随想 / 早报「一键生成分享海报卡片」 (Share Card Studio)
- **2.5x Retina 级高保真 Canvas 渲染**：将灵感碎念或每日早报瞬间转换为精美海报图。
- **曜石暗黑 / 温润米白配色一键切换**：适配不同分享平台与个人视觉偏好。
- **双模式操作**：支持直接下载 `.png` 保存到本地，或一键拷贝图片二进制流直接粘贴至微信/推特/TG 发送。

### 10. 💬 基于 GitHub Discussions 的 Giscus 极简评论系统
- **零数据库负载与反垃圾保障**：以 GitHub 授权登录为基石，与技术开发者社区天然契合。
- **深浅主题双向热联动**：博客切换明暗模式时，Giscus 评论区 iframe 零延迟自适应同步更新配色。

### 11. 🎧 常驻 Zen Lo-Fi 编程白噪音播放器 (Persistent Ambient Player)
- **Astro View Transitions 跨路由保活**：基于 `transition:persist` 架构，在首页、文章页、新闻页间任意穿梭跳转，音乐与白噪音播放永不中断！
- **纯净 Web Audio API 过程音效生成**：零外部音频加载开销、零网络延迟、完全支持离线播放，内置：
  - 🌧️ **深夜雨声**（深沉布朗噪音 + 低通滤波）
  - 🌊 **潮汐海浪**（粉红噪音 + 超低频 LFO 涨落调制）
  - 🔥 **暖炉柴火**（温暖基底 + 随机木柴噼啪炸裂脉冲）
  - 🌲 **林间微风**（带通起伏自然风声）
  - 🧘 **432Hz 冥想**（双耳阿尔法波纯正弦差频，助你快速进入心流编码状态）
- **胶囊悬浮控制条**：音波跳动动效、精巧音量滑块与一键静音控制。

---

## 🛠 技术栈与架构基准

| 领域 | 选型与优势 |
| :--- | :--- |
| **核心框架** | **Astro 7.x**：孤岛架构（Islands Architecture），零多余客户端 JS，秒级构建。 |
| **样式引擎** | **Tailwind CSS v4**：基于原生 CSS 变量设计系统，零复杂配置，极速编译。 |
| **动态微服务** | 联动部署于 VPS 的 **tomato.news** (Hono + Node 22/ARM64 Docker)，前后端解耦。 |
| **数据流动** | **SSG 构建兜底 + SWR 浏览器实时水合**，兼备极致性能与即时动态性。 |
| **现代规范** | 原生深色/浅色主题自适应、精细移动端抽屉导航与触控适配、全站 RSS 订阅生成。 |

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
│   │   ├── Footer.astro        # 底栏版权、GitHub 仓库与 RSS
│   │   ├── Daily60sView.astro  # 每日 60 秒早报视图（含 SWR 客户端实时同步）
│   │   ├── HotNewsView.astro   # 全网实时热榜交互组件（搜索/密度/分类/SWR 实时同步）
│   │   ├── HomeDailyNewsSection.astro # 首页热点与早报速览（含 SWR 客户端水合）
│   │   ├── MoyuCalendarSidebar.astro  # 摸鱼日历与时钟侧边栏
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

## 🚀 本地快速开发与构建

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

生成的 `./dist` 目录为高可用纯静态网页，可零配置一键部署至任何主流云平台或自建环境：
- **Cloudflare Pages**（推荐，边缘毫秒级全球加速）
- **自建 VPS (Nginx / Caddy / Docker)**
- **Vercel / Netlify**
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
