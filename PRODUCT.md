# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary audience:** Technical peers, senior engineers, design-minded developers, and potential collaborators evaluating TomatoX's product engineering craft, full-stack depth, and personal brand identity.
- **Secondary audience:** Repeat readers and indie-web peers visiting for long-form essays, micro-thoughts, curated macOS/developer toolkits, friend links, and daily 60s news / 15-platform hot-trend signals.

## Product Purpose

TomatoX (xujiuran.top) is a personal digital workshop and essay publication crafted by TomatoX, a full-stack engineer and indie creator. The homepage (`/`) must establish an unforgettable, high-conviction visual identity in the first viewport—proving product-engineering taste and technical rigor while seamlessly routing visitors into deep-dive essays, live news radar, curated tools, and personal notes.

## Positioning

Unlike generic developer blog templates or heavy SPA portfolios, TomatoX pairs sub-second static-first Astro architecture ("SSG skeleton + idle SWR client hydration") with authentic real-time telemetry (15-platform hot radar, 60s daily morning brief, Beijing workday/moyu dashboard, and real article view counts) and custom geometric industrial brand assets (`TomatoX` chamfered wordmark & octagonal mecha-tomato emblem).

## Operating Context

- **Rollout scope:** Redesign the visual world on the Homepage (`/`) first as a design comp (`comp-first`) before expanding the approved visual system across inner routes (`/posts`, `/news`, `/thoughts`, `/projects`, `/links`, `/about`), while preserving dedicated reading ergonomics and typography on article detail pages (`/posts/[...slug]`).
- **Live telemetry & tools:** Integrates self-hosted API endpoints at `https://news.xujiuran.top` (`/api/news/60s`, `/api/news/hot`, `/api/views`), local `Cmd+K` command palette, share-poster studio, and bilingual runtime switching (`zh-CN`, `en`).

## Capabilities and Constraints

- **Framework & Delivery:** Astro 7 static build (`npm run build`), Tailwind CSS 4, zero-jank `ClientRouter` view transitions with persisted shell chrome (`transition:persist`).
- **Localization:** Must preserve bilingual support (`zh-CN`, `en`) via `data-i18n` attributes and `src/i18n/translations.ts`.
- **Theme Parity:** Must support both Light and Dark themes (`html.dark` class + `localStorage.theme` + circular ripple View Transition toggle).
- **Mandatory Modules on Homepage:** Hero/Identity statement, aesthetic motto, Recent Posts (`3` items with live view counts + link to 38+ archive), Daily News & 15-Platform Hot Radar preview, Micro-Thoughts (`#128`, `#127`), Curated Geek Toolkit (`Mole`, `Raycast`, `Easydict`, `Shui`), and Moyu Weekly Work-Life Calendar & countdowns.
- **Factuality constraint:** Preserve real blog metadata (`xujiuran.top`, `https://github.com/xujiuran`, real post slugs/dates/counts, real tool links, real RSS/blogroll info); never invent fake client logos, metrics, or non-existent open-source projects ("暂无个人开源作品").

## Brand Commitments

- **Brand Name:** TomatoX · 随笔 (`xujiuran.top`)
- **Existing Brand Assets (preserve or build upon, never drop):** `TomatoXWordmark` (45° beveled crimson geometric lettering with cyber-emerald laser-cut `X` accent) and octagonal faceted crimson+emerald tomato emblem; motto *"Be yourself and don't go with the flow."* / *"保持专注与敏锐，做有审美和价值的小事。"*
- **Design Workflow Default:** `comp-first` recorded in `.impeccable/config.json` for landing/showcase surfaces.

## Evidence on Hand

- `src/data/posts.ts`: 5 full technical/reflection essays (`minimal-web-engineering`, `ai-knowledge-workflow`, `crafting-tiny-tools`, `modern-css-evolution`, `deep-work-system`) + 38 total archive count reference.
- `src/data/projects.ts`: 7 curated productivity/system/health/network tools with crisp local Retina icons (`public/images/tools/*.png`).
- `src/data/friends.ts`: Blogroll including `Divergence` (`https://www.drleaves.icu/`).
- `src/lib/newsService.ts`: Real-time 60s digest, 15 hot platforms, and Beijing Moyu calendar calculations.
- `public/images/icons/*.png` & `public/images/icons/*.svg`: Custom icon assets.

## Product Principles

1. **Engineering Craft Is Visible:** Performance, restraint, typographic hierarchy, and structural precision speak louder than decorative chrome.
2. **Living, Authentic Surface:** Real-time news, live Beijing clock/calendar state, and genuine article view counts keep the personal site alive without bloat.
3. **Calm Reading, Bold Identity:** Expressive brand identity leads at the front door (`/`), while long-form reading surfaces (`/posts/[...slug]`) remain distraction-free.
4. **Zero-Friction Bilingual/Multilingual Parity:** Every UI label and interactive control adapts cleanly across Chinese, English, Japanese, and Korean.
