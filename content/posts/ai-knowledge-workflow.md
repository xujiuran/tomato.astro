---
title: "在 AI 时代，我是如何构建个人知识库与自动化工作流的"
description: "不讲虚无缥缈的 Prompt 魔法，聊聊我如何用本地 Markdown + Git + 定制 Agent 将信息输入、筛选、沉淀到公开发布的过程像代码流水线一样组织起来。"
date: "2026-10-08"
tag: "AI Coding"
keywords: ["ai","agent","workflow","知识库","工作流","markdown","git","自动化"]
---

信息洪流时代，最大的挑战不是找不到资料，而是如何把有价值的信息沉淀为自己的思考资产。

### 本地优先（Local-first）原则

我的所有笔记和长文草稿均存储在纯纯的本地 Markdown 文件中。Git 作为唯一的版本控制系统。
没有任何专有格式，没有锁定在某个 SaaS 平台的私有数据库里。20 年后，任何文本编辑器依然能打开它们。

```bash
# 本地优先知识库 Git 自动化流水线
git add docs/notes/
git commit -m "feat(vault): 沉淀关于现代前端渲染架构与 Agent 设计的系统思考"
git push origin main
```

### 信息防火墙与主动输入

为了抵御被动信息轰炸，我们需要筑起输入防火墙：
- **主动拉取胜过被动推荐：** 使用 RSS 订阅与每日热榜聚合，而不是刷短视频与无休止的信息流。
- **本地存储与快照：** 真正优质的技术文章，用脚本转存为纯文本并归档。

```typescript
// 快速抓取并清洗文章核心内容
async function archiveArticle(url: string) {
  const resp = await fetch(url);
  const html = await resp.text();
  // 提取纯文本与元数据，归档到本地 vault
  console.log('Archived successfully to local Obsidian vault.');
}
```

### 结语

工具是手段，思考才是目的。让 AI 承担繁重的格式整理与初筛工作，把宝贵的专注力留给真正的创作与审美感知。
