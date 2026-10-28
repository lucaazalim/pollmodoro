import { getContext, setContext } from 'svelte';
import { getDirection, LOCALE_COOKIE, type Locale } from './locales';
import type { Messages } from './messages/en';

export {
	BASE_LOCALE,
	getDirection,
	isLocale,
	LOCALES,
	type Locale,
	type LocaleInfo
} from './locales';
export type { Messages } from './messages/en';

// Each language is its own chunk, so a visitor only downloads the one they use.
const loaders = import.meta.glob<Messages>('./messages/*.ts', { import: 'default' });

export function loadMessages(locale: Locale): Promise<Messages> {
	return loaders[`./messages/${locale}.ts`]();
}

export type I18n = ReturnType<typeof createI18n>;

export function createI18n(locale: Locale, messages: Messages) {
	const numbers = new Intl.NumberFormat(locale);
	const percentages = new Intl.NumberFormat(locale, { style: 'percent', maximumFractionDigits: 0 });
	const dates = new Intl.DateTimeFormat(locale, { dateStyle: 'medium' });

	return {
		locale,
		dir: getDirection(locale),
		m: messages,
		formatNumber: (value: number) => numbers.format(value),
		/** Formats a whole-number percentage such as `42` as "42%", "42 %" or "%42". */
		formatPercent: (value: number) => percentages.format(value / 100),
		formatDate: (date: Date | string) => dates.format(new Date(date))
	};
}

const key = Symbol('i18n');

export function setI18n(i18n: I18n) {
	setContext(key, i18n);
}

/** The current language, its messages and formatters. Call it while a component initializes. */
export function getI18n(): I18n {
	return getContext<I18n>(key);
}

/** Remembers a language the visitor picked and reloads the page in it. */
export function switchLocale(locale: Locale) {
	const oneYear = 60 * 60 * 24 * 365;
	document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${oneYear}; samesite=lax`;
	window.location.reload();
}
