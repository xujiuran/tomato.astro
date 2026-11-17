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
  if (stored && ['zh-CN', 'en', 'ja', 'ko'].includes(stored)) {
    return stored;
  }
  const htmlLang = document.documentElement.getAttribute('lang') as Lang | null;
  if (htmlLang && ['zh-CN', 'en', 'ja', 'ko'].includes(htmlLang)) {
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
export function applyTranslationsToDOM(lang?: Lang, root: ParentNode = document): void {
  const activeLang = lang || getCurrentLang();
  document.documentElement.setAttribute('lang', activeLang);

  // 1. Text content
  const textEls = root.querySelectorAll<HTMLElement>('[data-i18n]');
  textEls.forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (!key) return;

    // Optional params can be passed via data-i18n-param-xyz
    const params: Record<string, string | number> = {};
    Array.from(el.attributes).forEach((attr) => {
      if (attr.name.startsWith('data-i18n-param-')) {
        const paramKey = attr.name.replace('data-i18n-param-', '');
        params[paramKey] = attr.value;
      }
    });

    const translated = t(key, activeLang, Object.keys(params).length ? params : undefined);
    if (translated) {
      el.textContent = translated;
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
}

/**
 * Change global language and trigger listeners
 */
export function setLanguage(newLang: Lang): void {
  if (!['zh-CN', 'en', 'ja', 'ko'].includes(newLang)) return;
  localStorage.setItem('tomatox_lang', newLang);
  document.documentElement.setAttribute('lang', newLang);

  applyTranslationsToDOM(newLang);

  window.dispatchEvent(
    new CustomEvent('tomatox:lang-change', {
      detail: { lang: newLang },
    })
  );
}
