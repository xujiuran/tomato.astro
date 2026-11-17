// friends.ts - Curated friend links and blogroll data

export interface FriendLink {
  name: string;
  url: string;
  description: string;
  author?: string;
  avatar?: string;
  tag?: string;
  badge?: string;
  primaryColor?: string;
}

export const friends: FriendLink[] = [
  {
    name: 'Divergence',
    author: 'Dr. Leaves',
    url: 'https://www.drleaves.icu/',
    description: '个人实验室 —— 一些顺手的工具，一些写下来的东西。世界线变动率观测站。',
    tag: '个人实验室 · 工具与记录',
    badge: '世界线 α',
    primaryColor: '#ff8a2a',
  },
];

export const myBlogrollInfo = {
  name: 'TomatoX 随笔',
  author: 'TomatoX',
  url: 'https://xujiuran.top',
  avatar: 'https://xujiuran.top/favicon.svg',
  description: '写代码、做工具、认真生活的数字手艺人 · 极简克制与深度沉淀。',
  feed: 'https://xujiuran.top/rss.xml',
};
