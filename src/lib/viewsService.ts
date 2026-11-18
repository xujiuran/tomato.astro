// viewsService.ts - Pure 100% real visitor view counts client helper

// Base URL for self-hosted Hono API (tomato.news)
const API_BASE_URL = 'https://news.xujiuran.top';

/**
 * Format view numbers nicely (e.g. 0, 12, 1,234 or 1.2w)
 */
export function formatViewCount(views: number): string {
  if (typeof views !== 'number' || isNaN(views) || views < 0) return '0';
  if (views >= 10000) {
    return (views / 10000).toFixed(1) + 'w';
  }
  return views.toLocaleString('zh-CN');
}

/**
 * Fetch real views for a single article with local fallback
 */
export async function fetchViewsForSlug(slug: string): Promise<number> {
  const fallback = getLocalViewsFallback(slug);
  if (typeof window === 'undefined') return fallback;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);
    const res = await fetch(`${API_BASE_URL}/api/views/${encodeURIComponent(slug)}`, {
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (res.ok) {
      const json = await res.json();
      if (json && json.data && typeof json.data.views === 'number') {
        const remoteViews = json.data.views;
        localStorage.setItem(`tomatox_views_${slug}`, String(remoteViews));
        return remoteViews;
      }
    }
  } catch (_e) {
    // API not reachable or timeout, silently use local fallback
  }

  return fallback;
}

/**
 * Increment and get real views for an article (session-deduplicated)
 */
export async function incrementAndGetViews(slug: string): Promise<number> {
  if (typeof window === 'undefined') return 0;

  const sessionKey = `tomatox_viewed_${slug}`;
  let hasViewedThisSession = false;
  try {
    hasViewedThisSession = !!sessionStorage.getItem(sessionKey);
  } catch {}

  // If already viewed in current browser session, fetch latest count without incrementing
  if (hasViewedThisSession) {
    return fetchViewsForSlug(slug);
  }

  // Mark as viewed in this session
  try {
    sessionStorage.setItem(sessionKey, '1');
  } catch {}

  // Attempt server increment
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);
    const res = await fetch(`${API_BASE_URL}/api/views/${encodeURIComponent(slug)}`, {
      method: 'POST',
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (res.ok) {
      const json = await res.json();
      if (json && json.data && typeof json.data.views === 'number') {
        const nextViews = json.data.views;
        localStorage.setItem(`tomatox_views_${slug}`, String(nextViews));
        if (batchViewsMemCache) batchViewsMemCache.data[slug] = nextViews;
        return nextViews;
      }
    }
  } catch (_e) {
    // Network or server error fallback
  }

  // Fallback: local increment from actual history
  const current = getLocalViewsFallback(slug);
  const next = current + 1;
  try {
    localStorage.setItem(`tomatox_views_${slug}`, String(next));
  } catch {}
  return next;
}

let batchViewsMemCache: { data: Record<string, number>; ts: number } | null = null;
let batchViewsInflight: Promise<Record<string, number>> | null = null;
const VIEWS_TTL_MS = 60 * 1000;

/**
 * Synchronously read cached article views from memory or localStorage (0ms)
 */
export function getCachedViewsMapSync(): Record<string, number> {
  if (batchViewsMemCache) return batchViewsMemCache.data;
  const result: Record<string, number> = {};
  if (typeof window !== 'undefined') {
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('tomatox_views_')) {
          const slug = key.replace('tomatox_views_', '');
          const val = parseInt(localStorage.getItem(key) || '0', 10);
          if (!isNaN(val)) {
            result[slug] = val;
          }
        }
      }
    } catch {}
  }
  return result;
}

/**
 * Batch fetch all real article views (deduplicated & TTL cached)
 */
export async function fetchBatchViews(): Promise<Record<string, number>> {
  if (batchViewsMemCache && Date.now() - batchViewsMemCache.ts < VIEWS_TTL_MS) {
    return batchViewsMemCache.data;
  }
  if (batchViewsInflight) return batchViewsInflight;

  batchViewsInflight = (async () => {
    const result = { ...getCachedViewsMapSync() };

    if (typeof window !== 'undefined') {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 3000);
        const res = await fetch(`${API_BASE_URL}/api/views`, {
          signal: controller.signal,
        });
        clearTimeout(timeout);

        if (res.ok) {
          const json = await res.json();
          if (json && json.data && typeof json.data === 'object') {
            Object.entries(json.data).forEach(([slug, count]) => {
              if (typeof count === 'number') {
                result[slug] = count;
                try {
                  localStorage.setItem(`tomatox_views_${slug}`, String(count));
                } catch {}
              }
            });
            batchViewsMemCache = { data: result, ts: Date.now() };
          }
        }
      } catch (_e) {} finally {
        batchViewsInflight = null;
      }
    }

    return result;
  })();

  return batchViewsInflight;
}

function getLocalViewsFallback(slug: string): number {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(`tomatox_views_${slug}`);
    if (stored !== null) {
      const parsed = parseInt(stored, 10);
      if (!isNaN(parsed)) return parsed;
    }
  }
  return 0;
}
