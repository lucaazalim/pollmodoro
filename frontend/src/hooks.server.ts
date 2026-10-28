import { building } from '$app/environment';
import { detectLocale } from '$lib/i18n/detect';
import { getDirection, LOCALE_COOKIE, LOCALE_PARAM } from '$lib/i18n/locales';
import { SITE_URL } from '$lib/seo';
import type { Handle } from '@sveltejs/kit';

const SITE_HOST = new URL(SITE_URL).host;

export const handle: Handle = async ({ event, resolve }) => {
	const locale = detectLocale({
		// Prerendered files, such as the sitemap, are built once for everyone and have no query.
		param: building ? null : event.url.searchParams.get(LOCALE_PARAM),
		cookie: event.cookies.get(LOCALE_COOKIE),
		country: event.platform?.cf?.country,
		acceptLanguage: event.request.headers.get('accept-language')
	});

	event.locals.locale = locale;

	const response = await resolve(event, {
		transformPageChunk: ({ html }) =>
			html.replace('%lang%', locale).replace('%dir%', getDirection(locale))
	});

	// Keeps copies of the site on other addresses, such as the workers.dev preview, out of
	// search results.
	if (event.url.host !== SITE_HOST) {
		response.headers.set('X-Robots-Tag', 'noindex');
	}

	return response;
};
