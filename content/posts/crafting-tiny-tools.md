---
title: "从 0 到 1 手搓轻量桌面工具：小而美软件的设计取舍"
description: "记录一款不足 5MB 的轻量桌面小工具从构思到落地的全过程：为什么放弃 Electron？如何做到零学习成本？以及一个人做产品时的克制与取舍。"
date: "2026-09-29"
tag: "产品设计"
keywords: ["desktop","tools","swift","rust","桌面应用","极简软件","轻量"]
---

当你想做一个功能专注的桌面小工具时，通常面临两条路：
1. 使用 Electron 快速搞定，但打包出来动辄 100MB+，启动内存占用 150MB+。
2. 使用 Rust / Swift / Webview 技术栈，体积不到 5MB，毫秒级冷启。

我选择后者。小巧不仅是对系统资源的尊重，更是一种给用户带来的心理轻盈感。

### 为什么放弃 Electron？

```rust
// 使用 Tauri + Rust 编写的轻量系统原生调用
#[tauri::command]
fn get_system_idle_seconds() -> Result<u64, String> {
    // 毫秒级获取 macOS 用户空闲时长，内存占用仅 8MB
    macos_idle::get_idle_seconds().map_err(|e| e.to_string())
}
```

### 极简软件的设计三大戒律

1. **零学习成本：** 打开即用，无需配置复杂的设置项。
2. **平时绝不打扰：** 安静待在菜单栏或后台，没有弹出广告，没有冗余常驻。
3. **需要时一击即中：** 快捷键呼出，毫秒级响应，完成任务后立刻淡出。
