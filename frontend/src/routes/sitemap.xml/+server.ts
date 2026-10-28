import { INDEXABLE_PATHS, localeAlternates } from '$lib/seo';

export const prerender = true;

// Every translation of every indexable page gets an entry, each listing all the others, as
// https://developers.google.com/search/docs/specialty/international/localized-versions#sitemap
// asks. Polls aren't listed: they're shared by link and kept out of search results.
export function GET() {
	const entries = INDEXABLE_PATHS.flatMap((path) => {
		const alternates = localeAlternates(path);

		const links = alternates
			.map(({ hreflang, href }) => {
				return `<xhtml:link rel="alternate" hreflang="${hreflang}" href="${escapeXml(href)}"/>`;
			})
			.join('');

		return alternates.map(({ href }) => `<url><loc>${escapeXml(href)}</loc>${links}</url>`);
	});

	const body = [
		'<?xml version="1.0" encoding="UTF-8"?>',
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
		...entries,
		'</urlset>',
		''
	].join('\n');

	return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}

function escapeXml(value: string): string {
	return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}
