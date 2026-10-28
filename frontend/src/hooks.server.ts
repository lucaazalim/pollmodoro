import { detectLocale } from '$lib/i18n/detect';
import { getDirection, LOCALE_COOKIE } from '$lib/i18n/locales';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = ({ event, resolve }) => {
	const locale = detectLocale({
		cookie: event.cookies.get(LOCALE_COOKIE),
		country: event.platform?.cf?.country,
		acceptLanguage: event.request.headers.get('accept-language')
	});

	event.locals.locale = locale;

	return resolve(event, {
		transformPageChunk: ({ html }) =>
			html.replace('%lang%', locale).replace('%dir%', getDirection(locale))
	});
};
