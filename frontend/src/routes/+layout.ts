import { loadMessages } from '$lib/i18n';
import type { LayoutLoad } from './$types';

// Runs on the server and again in the browser, where it loads only the
// detected language's messages.
export const load: LayoutLoad = async ({ data }) => {
	return { locale: data.locale, messages: await loadMessages(data.locale) };
};
