import { SITE_URL } from '$lib/seo';

export const prerender = true;

// Pages that shouldn't be listed say so with `noindex` instead of being blocked here, because a
// crawler has to fetch a page to see that.
export function GET() {
	const body = ['User-agent: *', 'Allow: /', '', `Sitemap: ${SITE_URL}/sitemap.xml`, ''].join('\n');

	return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
