// clientNewsCache.ts - Lightweight client-side SWR cache & idle scheduler
// Prevents redundant API fetches and DOM thrashing when navigating between pages

const NEWS_TTL_MS = 3 * 60 * 1000; // 3 minutes client memory/session cache

interface CacheEntry<T> {
  data: T;
  ts: number;
}

let mem60s: CacheEntry<any> | null = null;
let inflight60s: Promise<any | null> | null = null;

let memHot: CacheEntry<any[]> | null = null;
let inflightHot: Promise<any[] | null> | null = null;

export function runWhenIdle(fn: () => void, timeoutMs = 1200): void {
  if (typeof window === 'undefined') return;
  const ric = (window as any).requestIdleCallback;
  if (typeof ric === 'function') {
    ric(fn, { timeout: timeoutMs });
  } else {
    setTimeout(fn, 180);
  }
}

function readSession<T>(key: string): CacheEntry<T> | null {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CacheEntry<T>;
    if (parsed && typeof parsed.ts === 'number' && Date.now() - parsed.ts < NEWS_TTL_MS) {
      return parsed;
    }
  } catch {}
  return null;
}

function writeSession<T>(key: string, entry: CacheEntry<T>): void {
  try {
    sessionStorage.setItem(key, JSON.stringify(entry));
  } catch {}
}

export function getCached60sSync(): any | null {
  if (mem60s && Date.now() - mem60s.ts < NEWS_TTL_MS) return mem60s.data;
  const s = readSession<any>('tomatox_swr_60s');
  if (s) {
    mem60s = s;
    return s.data;
  }
  return null;
}

export async function fetchCached60s(force = false): Promise<any | null> {
  if (!force) {
    const cached = getCached60sSync();
    if (cached) return cached;
  }
  if (inflight60s && !force) return inflight60s;

  inflight60s = (async () => {
    try {
      const url = force
        ? `https://news.xujiuran.top/api/news/60s?_t=${Date.now()}`
        : 'https://news.xujiuran.top/api/news/60s';
      const res = await fetch(url, {
        signal: AbortSignal.timeout(5000),
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) return null;
      const json = await res.json();
      const data = json?.data;
      if (data && Array.isArray(data.news) && data.news.length > 0) {
        const entry = { data, ts: Date.now() };
        mem60s = entry;
        writeSession('tomatox_swr_60s', entry);
        return data;
      }
    } catch {} finally {
      inflight60s = null;
    }
    return null;
  })();

  return inflight60s;
}

export function getCachedHotSync(): any[] | null {
  if (memHot && Date.now() - memHot.ts < NEWS_TTL_MS) return memHot.data;
  const s = readSession<any[]>('tomatox_swr_hot');
  if (s) {
    memHot = s;
    return s.data;
  }
  return null;
}

export async function fetchCachedHot(force = false): Promise<any[] | null> {
  if (!force) {
    const cached = getCachedHotSync();
    if (cached) return cached;
  }
  if (inflightHot && !force) return inflightHot;

  inflightHot = (async () => {
    try {
      const url = force
        ? `https://news.xujiuran.top/api/news/hot?_t=${Date.now()}`
        : 'https://news.xujiuran.top/api/news/hot';
      const res = await fetch(url, {
        signal: AbortSignal.timeout(6000),
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        const json = await res.json();
        if (Array.isArray(json) && json.length > 0) {
          const entry = { data: json, ts: Date.now() };
          memHot = entry;
          writeSession('tomatox_swr_hot', entry);
          return json;
        }
      }
    } catch {}

    if (force) {
      try {
        const localRes = await fetch(`/api/hotnews.json?refresh=true&_t=${Date.now()}`);
        if (localRes.ok) {
          const localJson = await localRes.json();
          if (Array.isArray(localJson) && localJson.length > 0) {
            const entry = { data: localJson, ts: Date.now() };
            memHot = entry;
            writeSession('tomatox_swr_hot', entry);
            return localJson;
          }
        }
      } catch {}
    }

    inflightHot = null;
    return null;
  })();

  const out = await inflightHot;
  inflightHot = null;
  return out;
}
