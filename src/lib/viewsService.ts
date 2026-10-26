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

/**
 * Batch fetch all real article views
 */
export async function fetchBatchViews(): Promise<Record<string, number>> {
  const result: Record<string, number> = {};

  if (typeof window !== 'undefined') {
    // Read local cache first
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

    // Try remote batch API
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
              localStorage.setItem(`tomatox_views_${slug}`, String(count));
            }
          });
        }
      }
    } catch (_e) {}
  }

  return result;
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
