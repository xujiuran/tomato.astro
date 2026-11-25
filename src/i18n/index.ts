// index.ts - Core i18n runtime helpers & DOM translation binding
import { translations, type Lang, LANGUAGES } from './translations';

export { translations, LANGUAGES, type Lang };

const DEFAULT_LANG: Lang = 'zh-CN';

/**
 * Get currently stored or active language
 */
export function getCurrentLang(): Lang {
  if (typeof window === 'undefined') return DEFAULT_LANG;
  const stored = localStorage.getItem('tomatox_lang') as Lang | null;
  if (stored && ['zh-CN', 'en'].includes(stored)) {
    return stored;
  }
  const htmlLang = document.documentElement.getAttribute('lang') as Lang | null;
  if (htmlLang && ['zh-CN', 'en'].includes(htmlLang)) {
    return htmlLang;
  }
  return DEFAULT_LANG;
}

/**
 * Access nested dictionary value with key like 'nav.home'
 */
export function getNestedTranslation(dict: any, keyPath: string): string | undefined {
  const keys = keyPath.split('.');
  let current = dict;
  for (const k of keys) {
    if (current && typeof current === 'object' && k in current) {
      current = current[k];
    } else {
      return undefined;
    }
  }
  return typeof current === 'string' ? current : undefined;
}

/**
 * Translate a key into target language with optional interpolation
 */
export function t(key: string, lang?: Lang, params?: Record<string, string | number>): string {
  const activeLang = lang || getCurrentLang();
  const dict = (translations as any)[activeLang] || translations['zh-CN'];
  let val = getNestedTranslation(dict, key);

  if (val === undefined && activeLang !== 'zh-CN') {
    val = getNestedTranslation(translations['zh-CN'], key);
  }

  if (val === undefined) return key;

  if (params) {
    Object.entries(params).forEach(([pKey, pVal]) => {
      val = val!.replace(new RegExp(`\\{${pKey}\\}`, 'g'), String(pVal));
    });
  }

  return val;
}

/**
 * Apply translations to DOM elements with data-i18n attributes
 */
export function applyTranslationsToDOM(lang?: Lang, root: ParentNode = document, force = false): void {
  const activeLang = lang || getCurrentLang();
  const targetDoc = (root as Document).documentElement ? (root as Document) : null;
  const docEl = targetDoc ? targetDoc.documentElement : document.documentElement;

  if (targetDoc) {
    docEl.setAttribute('lang', activeLang);
    const appliedLang = docEl.dataset.i18nApplied || 'zh-CN';
    if (!force && appliedLang === activeLang) {
      docEl.dataset.i18nApplied = activeLang;
      return;
    }
    docEl.dataset.i18nApplied = activeLang;
  }

  // 1. Text content
  const textEls = root.querySelectorAll<HTMLElement>('[data-i18n]');
  textEls.forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (!key) return;

    // Optional params can be passed via data-i18n-param-xyz
    let params: Record<string, string | number> | undefined;
    const attrs = el.attributes;
    for (let i = 0; i < attrs.length; i++) {
      const attr = attrs[i];
      if (attr.name.startsWith('data-i18n-param-')) {
        if (!params) params = {};
        params[attr.name.slice(16)] = attr.value;
      }
    }

    const translated = t(key, activeLang, params);
    if (translated) {
      if (el.hasAttribute('data-i18n-html')) {
        if (el.innerHTML !== translated) el.innerHTML = translated;
      } else {
        if (el.textContent !== translated) el.textContent = translated;
      }
    }
  });

  // 2. Title attributes
  const titleEls = root.querySelectorAll<HTMLElement>('[data-i18n-title]');
  titleEls.forEach((el) => {
    const key = el.getAttribute('data-i18n-title');
    if (!key) return;
    const translated = t(key, activeLang);
    if (translated) {
      el.setAttribute('title', translated);
    }
  });

  // 3. Placeholder attributes
  const placeholderEls = root.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('[data-i18n-placeholder]');
  placeholderEls.forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (!key) return;
    const translated = t(key, activeLang);
    if (translated) {
      el.setAttribute('placeholder', translated);
    }
  });

  // 4. Aria label attributes
  const ariaEls = root.querySelectorAll<HTMLElement>('[data-i18n-aria]');
  ariaEls.forEach((el) => {
    const key = el.getAttribute('data-i18n-aria');
    if (!key) return;
    const translated = t(key, activeLang);
    if (translated) {
      el.setAttribute('aria-label', translated);
    }
  });

  // 5. Day of week formatting
  const dayEls = root.querySelectorAll<HTMLElement>('[data-i18n-dayofweek]');
  dayEls.forEach((el) => {
    const rawDay = el.getAttribute('data-day') || '';
    const date = el.getAttribute('data-date') || '';
    if (rawDay) {
      const formattedDay = formatDayOfWeek(rawDay, activeLang);
      el.textContent = date ? `${date} ${formattedDay}` : formattedDay;
    }
  });
}

/**
 * Format day-of-week strings into target language
 */
export function formatDayOfWeek(dayStr: string, lang: Lang): string {
  const map: Record<string, Record<Lang, string>> = {
    '星期一': { 'zh-CN': '星期一', en: 'Monday' },
    '星期二': { 'zh-CN': '星期二', en: 'Tuesday' },
    '星期三': { 'zh-CN': '星期三', en: 'Wednesday' },
    '星期四': { 'zh-CN': '星期四', en: 'Thursday' },
    '星期五': { 'zh-CN': '星期五', en: 'Friday' },
    '星期六': { 'zh-CN': '星期六', en: 'Saturday' },
    '星期日': { 'zh-CN': '星期日', en: 'Sunday' },
    '星期天': { 'zh-CN': '星期天', en: 'Sunday' },
    '周一': { 'zh-CN': '周一', en: 'Mon' },
    '周二': { 'zh-CN': '周二', en: 'Tue' },
    '周三': { 'zh-CN': '周三', en: 'Wed' },
    '周四': { 'zh-CN': '周四', en: 'Thu' },
    '周五': { 'zh-CN': '周五', en: 'Fri' },
    '周六': { 'zh-CN': '周六', en: 'Sat' },
    '周日': { 'zh-CN': '周日', en: 'Sun' },
    '每日快讯': { 'zh-CN': '每日快讯', en: 'Daily Brief' },
  };
  return map[dayStr]?.[lang] || dayStr;
}

/**
 * Change global language and trigger listeners
 */
export function setLanguage(newLang: Lang): void {
  if (!['zh-CN', 'en'].includes(newLang)) return;
  localStorage.setItem('tomatox_lang', newLang);
  document.documentElement.setAttribute('lang', newLang);

  applyTranslationsToDOM(newLang, document, true);

  window.dispatchEvent(
    new CustomEvent('tomatox:lang-change', {
      detail: { lang: newLang },
    })
  );
}
