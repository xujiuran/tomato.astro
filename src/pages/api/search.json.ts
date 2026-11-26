import type { APIRoute } from 'astro';
import { searchIndex, type SearchItem } from '../../data/searchIndex';
import { getAllPosts } from '../../lib/posts';

export const GET: APIRoute = async () => {
  const posts = await getAllPosts();

  const postItems: SearchItem[] = posts.map((post) => ({
    id: `post-${post.slug}`,
    title: post.title,
    description: post.description,
    category: 'post',
    categoryLabel: '文章',
    url: `/posts/${post.slug}`,
    iconType: 'post',
    badge: post.tag,
    keywords: post.keywords,
  }));

  return new Response(JSON.stringify([...postItems, ...searchIndex]), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
