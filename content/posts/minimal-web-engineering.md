---
title: "你本不需要那么多复杂的依赖：现代 Web 工程的极简法则"
description: "审视过度工程化与臃肿工具链。现代浏览器与 Node/Astro 本身的能力往往被低估了，本文探讨如何保持依赖最小化，打造飞速且长久健壮的站点。"
date: "2026-10-12"
tag: "Web 技术"
keywords: ["astro","javascript","minimal","极简","依赖","性能优化","前端","工程化"]
---

在过去的几年中，前端社区经历了一轮又一轮的基础设施重构。从 Webpack 到 Vite，从各种繁杂的 CSS-in-JS 到原子化 CSS，从沉重的全功能客户端单页框架回流到 Islands 架构与纯 HTML 输出。

### 为什么我们总是陷入依赖泥潭？

当我们打开一个现代 Web 项目的 package.json 时，动辄几十甚至上百个第三方包。每次 npm install，都是数万个文件的下载与解析。
很多时候，我们引入一个 200KB 的库，仅仅是为了格式化一个日期，或者做一次深拷贝。

```typescript
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
```

### 现代 Web 平台本身的蜕变

你可能忽略了现代浏览器与 Node/Astro 环境所具备的原生能力：
1. **原生深拷贝：** `structuredClone()` 已经全平台支持，不再需要 lodash.clonedeep。
2. **原生日期与相对时间：** `Intl.DateTimeFormat` 与 `Intl.RelativeTimeFormat` 原生支持国际化。
3. **原生 CSS 嵌套与变量：** CSS 原生支持 nesting 与 custom properties，减少了复杂的构建步骤。
4. **Astro 的零 JS 默认哲学：** 将绝大多数静态内容转化为纯 HTML，仅在需要交互的局部水合。

```astro
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
```

### 极简并非排斥工具

极简并不是盲目排斥工具，而是明确每引入一个依赖所带来的维护成本、供应链安全隐患与认知负担。
克制与审美，是软件工程中最优雅的美德。
