import { isLocale, LOCALE_PARAM, LOCALES, type Locale } from '$lib/i18n/locales';

/** The production address. Canonical URLs, the sitemap and social previews always point here. */
export const SITE_URL = 'https://pollmodoro.com';

export const SITE_NAME = 'Pollmodoro';

/** The picture shown when a page is shared on social networks and chat apps. */
export const SOCIAL_IMAGE = { url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 };

/** The pages worth finding from a search engine, each available in every language. */
export const INDEXABLE_PATHS = ['/', '/create'];

/**
 * The production address of a page. Query parameters are dropped, except a valid `?lang=`,
 * which is what tells the translations of a page apart.
 */
export function canonicalUrl(url: URL): string {
	const canonical = new URL(url.pathname, SITE_URL);
	const locale = url.searchParams.get(LOCALE_PARAM);

	if (isLocale(locale)) {
		canonical.searchParams.set(LOCALE_PARAM, locale);
	}

	return canonical.href;
}

/**
 * Every translation of a page, for `hreflang` links. Each language has its own address, and
 * `x-default`, the address without `?lang=`, serves the language picked for the visitor.
 */
export function localeAlternates(pathname: string): { hreflang: string; href: string }[] {
	const base = new URL(pathname, SITE_URL);

	const translations = (Object.keys(LOCALES) as Locale[]).map((locale) => {
		const url = new URL(base);
		url.searchParams.set(LOCALE_PARAM, locale);
		return { hreflang: locale, href: url.href };
	});

	return [...translations, { hreflang: 'x-default', href: base.href }];
}

/**
 * A `<script type="application/ld+json">` tag holding `data`. Characters that could close the
 * tag or break out of it are escaped, so text written by users is safe to include.
 */
export function jsonLdScript(data: Record<string, unknown>): string {
	const json = JSON.stringify(data)
		.replaceAll('<', '\\u003c')
		.replaceAll('>', '\\u003e')
		.replaceAll('&', '\\u0026')
		.replaceAll(' ', '\\u2028')
		.replaceAll(' ', '\\u2029');

	return `<script type="application/ld+json">${json}</script>`;
}
