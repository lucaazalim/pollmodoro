export type LocaleInfo = { name: string; dir?: 'rtl' };

/**
 * Every language the site is translated into. Each one has a matching file in
 * `./messages`. `name` is the language's name in that language, as shown in the
 * language picker.
 */
export const LOCALES = {
	ar: { name: 'العربية', dir: 'rtl' },
	de: { name: 'Deutsch' },
	en: { name: 'English' },
	es: { name: 'Español' },
	fr: { name: 'Français' },
	id: { name: 'Bahasa Indonesia' },
	ja: { name: '日本語' },
	'pt-BR': { name: 'Português (Brasil)' },
	ru: { name: 'Русский' },
	'zh-CN': { name: '简体中文' }
} satisfies Record<string, LocaleInfo>;

export type Locale = keyof typeof LOCALES;

export const BASE_LOCALE: Locale = 'en';

/** The cookie that remembers a language the visitor picked by hand. */
export const LOCALE_COOKIE = 'locale';

export function isLocale(value: unknown): value is Locale {
	return typeof value === 'string' && Object.hasOwn(LOCALES, value);
}

export function getDirection(locale: Locale): 'ltr' | 'rtl' {
	const info: LocaleInfo = LOCALES[locale];
	return info.dir ?? 'ltr';
}
