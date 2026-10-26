// viewsService.ts - Client & Build helper for TomatoX article view counts

export const BASE_POST_VIEWS: Record<string, number> = {
  'minimal-web-engineering': 486,
  'ai-knowledge-workflow': 362,
  'crafting-tiny-tools': 295,
  'modern-css-evolution': 328,
  'deep-work-system': 441,
};

// Base URL for self-hosted Hono API (tomato.news)
const API_BASE_URL = 'https://news.xujiuran.top';

/**
 * Format view numbers nicely (e.g. 1,234 or 1.2w)
 */
export function formatViewCount(views: number): string {
  if (typeof views !== 'number' || isNaN(views)) return '--';
  if (views >= 10000) {
    return (views / 10000).toFixed(1) + 'w';
  }
  return views.toLocaleString('zh-CN');
}

/**
 * Fetch views for a single article with local fallback
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
    // API not reachable or timeout, silently use fallback
  }

  return fallback;
}

/**
 * Increment and get views for an article (session-deduplicated)
 */
export async function incrementAndGetViews(slug: string): Promise<number> {
  if (typeof window === 'undefined') return BASE_POST_VIEWS[slug] || 120;

  const sessionKey = `tomatox_viewed_${slug}`;
  let hasViewedThisSession = false;
  try {
    hasViewedThisSession = !!sessionStorage.getItem(sessionKey);
  } catch {}

  // If already viewed in current session, just fetch latest count without incrementing
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

  // Fallback: local increment
  const current = getLocalViewsFallback(slug);
  const next = current + 1;
  try {
    localStorage.setItem(`tomatox_views_${slug}`, String(next));
  } catch {}
  return next;
}

/**
 * Batch fetch all article views
 */
export async function fetchBatchViews(): Promise<Record<string, number>> {
  const result: Record<string, number> = { ...BASE_POST_VIEWS };

  // Overlay local cached views first
  if (typeof window !== 'undefined') {
    Object.keys(BASE_POST_VIEWS).forEach((slug) => {
      const stored = localStorage.getItem(`tomatox_views_${slug}`);
      if (stored) {
        const parsed = parseInt(stored, 10);
        if (!isNaN(parsed) && parsed > result[slug]) {
          result[slug] = parsed;
        }
      }
    });

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
    if (stored) {
      const parsed = parseInt(stored, 10);
      if (!isNaN(parsed)) return parsed;
    }
  }
  return BASE_POST_VIEWS[slug] || 120;
}
