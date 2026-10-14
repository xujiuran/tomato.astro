export interface RecommendedProject {
  name: string;
  desc: string;
  highlight: string;
  tags: string[];
  link: string;
  logoUrl: string;
  icon?: string;
  badge: string;
  category: 'productivity' | 'system' | 'health' | 'network';
}

export const recommendedProjects: RecommendedProject[] = [
  {
    name: 'Mole',
    desc: '一套轻量深度、安全开源的 macOS 系统清理与空间管理套件，快速扫描大文件、卸载残留与开发废弃物。',
    highlight: '极简无后台常驻，精准定位各种应用卸载残留与 Node/Xcode 缓存，彻底告别 Mac 磁盘焦虑。',
    tags: ['macOS', '系统清理', '开源利器', '深度瘦身'],
    link: 'https://mole.fit/zh/',
    logoUrl: '/images/tools/mole.png',
    icon: '🧹',
    badge: 'macOS · 开源',
    category: 'system',
  },
  {
    name: 'Raycast',
    desc: 'macOS 革命性极速启动器与生产力中枢，替代原生 Spotlight，支持插件生态、剪贴板历史、AI 与快捷脚本。',
    highlight: '键盘流用户的终极效率利器，海量社区插件覆盖日常开发、窗口管理与搜索，效率倍增。',
    tags: ['macOS', '启动器', '生产力', '工作流'],
    link: 'https://www.raycast.com/',
    logoUrl: '/images/tools/raycast.png',
    icon: '🚀',
    badge: '生产力核心',
    category: 'productivity',
  },
  {
    name: 'Easydict',
    desc: '简洁易用的 macOS 划词翻译与多引擎词典，开箱即用，支持数十种主流翻译引擎与大模型 AI 聚合对比。',
    highlight: '查词体验无与伦比，鼠标划词即显示多种翻译结果对比，阅读外文技术文档与英文源码的必备神器。',
    tags: ['macOS', '翻译查词', '开源', 'AI聚合'],
    link: 'https://github.com/tisfeng/easydict',
    logoUrl: '/images/tools/easydict.png',
    icon: '📖',
    badge: '开源 · 划词翻译',
    category: 'productivity',
  },
  {
    name: 'Shui (喝水助手)',
    desc: '极简克制的 macOS 菜单栏喝水提醒与健康作息小工具，陪伴开发者在深度专注中保持规律补水。',
    highlight: '设计纯粹不打扰，支持自定义打卡节奏与优雅提示音，长程敲代码防亚健康的贴心伴侣。',
    tags: ['macOS', '菜单栏', '健康习惯', '开源'],
    link: 'https://github.com/rock-zhang/Shui',
    logoUrl: '/images/tools/shui.png',
    icon: '💧',
    badge: '开源 · 菜单栏',
    category: 'health',
  },
  {
    name: 'Clash Verge Rev',
    desc: '现代化的跨平台代理网络客户端，基于 Tauri 框架打造，界面优雅简洁，内存开销轻量，规则配置强大。',
    highlight: '相比老旧客户端更清爽快速，Tauri 原生级低资源占用，订阅管理与分流规则一目了然。',
    tags: ['跨平台', '网络分流', 'Tauri', '开源'],
    link: 'https://github.com/clash-verge-rev/clash-verge-rev',
    logoUrl: '/images/tools/clash-verge.png',
    icon: '🌐',
    badge: '跨平台 · 网络利器',
    category: 'network',
  },
  {
    name: 'KeyStats',
    desc: '轻巧低占用的 macOS 键盘与鼠标输入统计应用，以直观热力图和图表记录每日敲击数据与打字习惯。',
    highlight: '满足极客对键入数据的好奇心，清晰查看代码输出密度与工作高峰时段，劳逸结合一览无余。',
    tags: ['macOS', '按键统计', '热力图', '开源'],
    link: 'https://github.com/debugtheworldbot/keyStats',
    logoUrl: '/images/tools/keystats.png',
    icon: '⌨️',
    badge: '开源 · 数据洞察',
    category: 'health',
  },
  {
    name: 'Mos',
    desc: '让外接普通鼠标拥有媲美 macOS 妙控触控板的平滑顺畅滚动，支持滚轮独立反转和平滑插值算法。',
    highlight: '外接非苹果鼠标的必备救星，彻底消灭生硬滚动的顿挫感，网页与代码翻阅如同丝般顺滑。',
    tags: ['macOS', '平滑滚动', '外设优化', '开源'],
    link: 'https://github.com/Caldis/Mos',
    logoUrl: '/images/tools/mos.png',
    icon: '🖱️',
    badge: '开源 · 外设神器',
    category: 'system',
  },
];
