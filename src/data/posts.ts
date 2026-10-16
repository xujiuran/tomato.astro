export interface Post {
  title: string;
  description: string;
  date: string;
  slug: string;
  readTime: string;
  words: string;
  tag: string;
  content: string;
}

export const posts: Post[] = [
  {
    title: '你本不需要那么多复杂的依赖：现代 Web 工程的极简法则',
    description: '审视过度工程化与臃肿工具链。现代浏览器与 Node/Astro 本身的能力往往被低估了，本文探讨如何保持依赖最小化，打造飞速且长久健壮的站点。',
    date: '2026-10-12',
    slug: 'minimal-web-engineering',
    readTime: '6 分钟',
    words: '3,240',
    tag: 'Web 技术',
    content: `
在过去的几年中，前端社区经历了一轮又一轮的基础设施重构。从 Webpack 到 Vite，从各种繁杂的 CSS-in-JS 到原子化 CSS，从沉重的全功能客户端单页框架回流到 Islands 架构与纯 HTML 输出。

### 为什么我们总是陷入依赖泥潭？

当我们打开一个现代 Web 项目的 package.json 时，动辄几十甚至上百个第三方包。每次 npm install，都是数万个文件的下载与解析。
很多时候，我们引入一个 200KB 的库，仅仅是为了格式化一个日期，或者做一次深拷贝。

\`\`\`typescript
// 原生现代 Web 能力：零依赖深拷贝与相对时间
const config = {
  theme: 'zen-ink',
  features: { toc: true, commandPalette: true },
  timestamp: Date.now()
};

// 1. 原生结构化克隆（structuredClone 已全平台原生支持）
const clonedConfig = structuredClone(config);

// 2. 原生相对时间国际化格式器
const rtf = new Intl.RelativeTimeFormat('zh-CN', { numeric: 'auto' });
console.log(rtf.format(-3, 'day')); // "3天前"
\`\`\`

### 现代 Web 平台本身的蜕变

你可能忽略了现代浏览器与 Node/Astro 环境所具备的原生能力：
1. **原生深拷贝：** \`structuredClone()\` 已经全平台支持，不再需要 lodash.clonedeep。
2. **原生日期与相对时间：** \`Intl.DateTimeFormat\` 与 \`Intl.RelativeTimeFormat\` 原生支持国际化。
3. **原生 CSS 嵌套与变量：** CSS 原生支持 nesting 与 custom properties，减少了复杂的构建步骤。
4. **Astro 的零 JS 默认哲学：** 将绝大多数静态内容转化为纯 HTML，仅在需要交互的局部水合。

\`\`\`astro
---
// Astro 极简组件：默认 0KB 客户端 JavaScript 开销
interface Props {
  title: string;
}
const { title } = Astro.props;
---
<div class="zen-card">
  <h2 class="title">{title}</h2>
  <slot />
</div>
\`\`\`

### 极简并非排斥工具

极简并不是盲目排斥工具，而是明确每引入一个依赖所带来的维护成本、供应链安全隐患与认知负担。
克制与审美，是软件工程中最优雅的美德。
    `
  },
  {
    title: '在 AI 时代，我是如何构建个人知识库与自动化工作流的',
    description: '不讲虚无缥缈的 Prompt 魔法，聊聊我如何用本地 Markdown + Git + 定制 Agent 将信息输入、筛选、沉淀到公开发布的过程像代码流水线一样组织起来。',
    date: '2026-10-08',
    slug: 'ai-knowledge-workflow',
    readTime: '8 分钟',
    words: '4,100',
    tag: 'AI Coding',
    content: `
信息洪流时代，最大的挑战不是找不到资料，而是如何把有价值的信息沉淀为自己的思考资产。

### 本地优先（Local-first）原则

我的所有笔记和长文草稿均存储在纯纯的本地 Markdown 文件中。Git 作为唯一的版本控制系统。
没有任何专有格式，没有锁定在某个 SaaS 平台的私有数据库里。20 年后，任何文本编辑器依然能打开它们。

\`\`\`bash
# 本地优先知识库 Git 自动化流水线
git add docs/notes/
git commit -m "feat(vault): 沉淀关于现代前端渲染架构与 Agent 设计的系统思考"
git push origin main
\`\`\`

### 信息防火墙与主动输入

为了抵御被动信息轰炸，我们需要筑起输入防火墙：
- **主动拉取胜过被动推荐：** 使用 RSS 订阅与每日热榜聚合，而不是刷短视频与无休止的信息流。
- **本地存储与快照：** 真正优质的技术文章，用脚本转存为纯文本并归档。

\`\`\`typescript
// 快速抓取并清洗文章核心内容
async function archiveArticle(url: string) {
  const resp = await fetch(url);
  const html = await resp.text();
  // 提取纯文本与元数据，归档到本地 vault
  console.log('Archived successfully to local Obsidian vault.');
}
\`\`\`

### 结语

工具是手段，思考才是目的。让 AI 承担繁重的格式整理与初筛工作，把宝贵的专注力留给真正的创作与审美感知。
    `
  },
  {
    title: '从 0 到 1 手搓轻量桌面工具：小而美软件的设计取舍',
    description: '记录一款不足 5MB 的轻量桌面小工具从构思到落地的全过程：为什么放弃 Electron？如何做到零学习成本？以及一个人做产品时的克制与取舍。',
    date: '2026-09-29',
    slug: 'crafting-tiny-tools',
    readTime: '5 分钟',
    words: '2,680',
    tag: '产品设计',
    content: `
当你想做一个功能专注的桌面小工具时，通常面临两条路：
1. 使用 Electron 快速搞定，但打包出来动辄 100MB+，启动内存占用 150MB+。
2. 使用 Rust / Swift / Webview 技术栈，体积不到 5MB，毫秒级冷启。

我选择后者。小巧不仅是对系统资源的尊重，更是一种给用户带来的心理轻盈感。

### 为什么放弃 Electron？

\`\`\`rust
// 使用 Tauri + Rust 编写的轻量系统原生调用
#[tauri::command]
fn get_system_idle_seconds() -> Result<u64, String> {
    // 毫秒级获取 macOS 用户空闲时长，内存占用仅 8MB
    macos_idle::get_idle_seconds().map_err(|e| e.to_string())
}
\`\`\`

### 极简软件的设计三大戒律

1. **零学习成本：** 打开即用，无需配置复杂的设置项。
2. **平时绝不打扰：** 安静待在菜单栏或后台，没有弹出广告，没有冗余常驻。
3. **需要时一击即中：** 快捷键呼出，毫秒级响应，完成任务后立刻淡出。
    `
  },
  {
    title: '重新审视 CSS：为什么现代原生 CSS 让诸多预处理器失去必要性',
    description: '深入分析原生嵌套、CSS Variables、现代容器查询以及颜色函数如何重新定义现代样式编写习惯。',
    date: '2026-09-15',
    slug: 'modern-css-evolution',
    readTime: '7 分钟',
    words: '3,890',
    tag: '前端探索',
    content: `
在过去的十年里，Sass、Less 和各种 CSS 预处理器几乎是现代 Web 开发的绝对标配。没有嵌套、没有变量、没有函数，原生 CSS 曾经显得笨重而冗余。

### 原生能力的跨越式演进

然而今天，浏览器的原生标准早已翻天覆地：
1. **原生 CSS 嵌套（Native CSS Nesting）：** 现已在所有现代浏览器全面落地，无需构建插件即可享用直观的树状层级。
2. **CSS 自定义属性（Variables）：** 原生变量具备真实的运行时层叠与继承能力，这是预处理器的静态编译永远无法做到的（比如零闪烁的明暗模式切换）。
3. **强大的现代色彩函数：** \`color-mix()\`、\`oklch()\` 等现代色彩空间让主题衍生和调色板计算变得优雅且精准。
4. **容器查询（Container Queries）：** 响应式设计不再单纯依附于视口宽度，而是以组件为容器进行自适应，真正实现高复用度的 UI 积木。

\`\`\`css
/* 原生 CSS 嵌套与现代色彩函数 */
.card-container {
  background: color-mix(in oklch, var(--card-bg) 85%, transparent);
  border: 1px solid var(--card-border);
  border-radius: 1rem;
  padding: 1.5rem;
  transition: transform 0.2s ease, border-color 0.2s ease;

  &:hover {
    border-color: var(--accent);
    transform: translateY(-2px);

    & .card-title {
      color: var(--accent);
    }
  }
}
\`\`\`

回归原生，不仅减少了复杂的工具链构建耗时，更让代码拥有面向未来的长久稳定性。
    `
  },
  {
    title: '静心读写：一个独立开发者的数字游民生活与专注力系统',
    description: '如何在算法喂养与信息洪流中保护专注力？建立自己的被动输入防火墙与主动产出系统。',
    date: '2026-08-20',
    slug: 'deep-work-system',
    readTime: '9 分钟',
    words: '4,650',
    tag: '随笔反思',
    content: `
在这个充斥着无限信息流滚动、算法推荐和碎片化通知的时代，专注力成为了人类最稀缺的战略资产。

### 建立个人输入防火墙

我们所消费的信息，最终会塑造我们的思考模型。为了抵御被动过载，我执行了以下三条基石准则：
1. **彻底关闭所有非人际即时通知：** 除了家人与核心生产环境报警，关闭一切 App 的红点与 Push。
2. **异步批处理模式：** 每天只在固定时间段集中阅读与回复，不再把整个人生切碎成 5 分钟的碎片。
3. **高信噪比的信息源聚合：** 用 RSS 与特定热榜做主动检索，拒绝纯算法推荐的无意识沉迷。

\`\`\`typescript
// 专注番茄钟与心流状态机
class DeepWorkSession {
  private durationMinutes: number = 45;
  private isFocusing: boolean = false;

  start() {
    this.isFocusing = true;
    console.log('Zen Mode Activated: Muting all notifications...');
  }
}
\`\`\`

### 专注创造的微环境

在安静的环境下，打开一款无杂质的文本编辑器，配合白噪音或轻缓的 Lo-Fi 音乐，将整颗心投入到代码与文字的雕琢中。
生活慢下来，创作才能深下去。
    `
  }
];
