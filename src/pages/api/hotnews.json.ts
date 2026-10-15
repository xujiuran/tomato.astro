import type { APIRoute } from 'astro';
import { fetchHotNews } from '../../lib/newsService';

export const GET: APIRoute = async () => {
  try {
    const data = await fetchHotNews();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=180, s-maxage=300',
      },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message || 'Failed to fetch hot news' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });
  }
};
