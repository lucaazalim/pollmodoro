import { BASE_LOCALE, isLocale, type Locale } from './locales';

/**
 * The languages used in each country (ISO 3166-1 alpha-2), limited to the ones
 * the site supports, most widely used first. Where the local language isn't
 * supported, a lingua franca most visitors read is listed instead (Portuguese
 * and Chinese speakers everywhere get the one variant the site has, and Malay
 * speakers get Indonesian). Countries with none of these fall back to the
 * browser's language settings, and so do countries where the only supported
 * language would be a minority one, such as Russian in Ukraine and the Baltics.
 */
const COUNTRY_LOCALES: Record<string, Locale[]> = {
	// North America, Central America and the Caribbean
	US: ['en', 'es'],
	CA: ['en', 'fr'],
	MX: ['es'],
	GT: ['es'],
	BZ: ['en', 'es'],
	SV: ['es'],
	HN: ['es'],
	NI: ['es'],
	CR: ['es'],
	PA: ['es'],
	CU: ['es'],
	DO: ['es'],
	PR: ['es', 'en'],
	HT: ['fr'],
	JM: ['en'],
	TT: ['en'],
	BS: ['en'],
	BB: ['en'],
	AG: ['en'],
	DM: ['en'],
	GD: ['en'],
	KN: ['en'],
	LC: ['en'],
	VC: ['en'],
	BM: ['en'],
	KY: ['en'],
	VG: ['en'],
	VI: ['en'],
	TC: ['en'],
	AI: ['en'],
	MS: ['en'],
	GP: ['fr'],
	MQ: ['fr'],
	MF: ['fr'],
	BL: ['fr'],
	PM: ['fr'],
	SX: ['en'],

	// South America
	BR: ['pt-BR'],
	AR: ['es'],
	BO: ['es'],
	CL: ['es'],
	CO: ['es'],
	EC: ['es'],
	PE: ['es'],
	PY: ['es'],
	UY: ['es'],
	VE: ['es'],
	GY: ['en'],
	GF: ['fr'],
	FK: ['en'],

	// Europe
	GB: ['en'],
	IE: ['en'],
	IM: ['en'],
	JE: ['en'],
	GG: ['en'],
	GI: ['en', 'es'],
	MT: ['en'],
	FR: ['fr'],
	MC: ['fr'],
	LU: ['fr', 'de'],
	DE: ['de'],
	AT: ['de'],
	CH: ['de', 'fr'],
	LI: ['de'],
	ES: ['es'],
	AD: ['es', 'fr'],
	PT: ['pt-BR'],
	BY: ['ru'],
	RU: ['ru'],

	// Caucasus and Central Asia
	KZ: ['ru'],
	UZ: ['ru'],
	KG: ['ru'],
	TJ: ['ru'],
	TM: ['ru'],

	// Middle East
	PS: ['ar'],
	JO: ['ar'],
	LB: ['ar', 'fr'],
	SY: ['ar'],
	IQ: ['ar'],
	SA: ['ar'],
	AE: ['ar', 'en'],
	QA: ['ar'],
	BH: ['ar'],
	KW: ['ar'],
	OM: ['ar'],
	YE: ['ar'],

	// South Asia
	IN: ['en'],
	PK: ['en'],
	BT: ['en'],
	MV: ['en'],

	// East and Southeast Asia
	CN: ['zh-CN'],
	TW: ['zh-CN'],
	HK: ['zh-CN', 'en'],
	MO: ['zh-CN', 'pt-BR'],
	JP: ['ja'],
	SG: ['en', 'zh-CN', 'id'],
	MY: ['en', 'id', 'zh-CN'],
	BN: ['en', 'id'],
	ID: ['id'],
	PH: ['en'],
	LA: ['en'],
	TL: ['pt-BR'],

	// North Africa
	EG: ['ar'],
	LY: ['ar'],
	TN: ['ar', 'fr'],
	DZ: ['ar', 'fr'],
	MA: ['ar', 'fr'],
	EH: ['ar'],
	MR: ['ar', 'fr'],
	SD: ['ar'],

	// East Africa
	ER: ['en', 'ar'],
	SO: ['ar'],
	DJ: ['fr', 'ar'],
	KE: ['en'],
	TZ: ['en'],
	UG: ['en'],
	RW: ['en', 'fr'],
	BI: ['fr'],
	SS: ['en'],
	KM: ['fr', 'ar'],
	MG: ['fr'],
	MU: ['en', 'fr'],
	SC: ['en', 'fr'],
	RE: ['fr'],
	YT: ['fr'],

	// Central and West Africa
	CD: ['fr'],
	CG: ['fr'],
	GA: ['fr'],
	CM: ['fr', 'en'],
	CF: ['fr'],
	TD: ['fr', 'ar'],
	GQ: ['es', 'fr'],
	ST: ['pt-BR'],
	NG: ['en'],
	GH: ['en'],
	LR: ['en'],
	SL: ['en'],
	GM: ['en'],
	SN: ['fr'],
	ML: ['fr'],
	BF: ['fr'],
	NE: ['fr'],
	CI: ['fr'],
	GN: ['fr'],
	BJ: ['fr'],
	TG: ['fr'],
	GW: ['pt-BR'],
	CV: ['pt-BR'],

	// Southern Africa
	ZA: ['en'],
	NA: ['en'],
	BW: ['en'],
	ZW: ['en'],
	ZM: ['en'],
	MW: ['en'],
	LS: ['en'],
	SZ: ['en'],
	AO: ['pt-BR'],
	MZ: ['pt-BR'],

	// Oceania
	AU: ['en'],
	NZ: ['en'],
	FJ: ['en'],
	PG: ['en'],
	WS: ['en'],
	TO: ['en'],
	SB: ['en'],
	VU: ['en', 'fr'],
	NC: ['fr'],
	PF: ['fr'],
	WF: ['fr'],
	GU: ['en'],
	AS: ['en'],
	MP: ['en'],
	PW: ['en'],
	FM: ['en'],
	MH: ['en'],
	KI: ['en'],
	NR: ['en'],
	TV: ['en'],
	CK: ['en'],
	NU: ['en']
};

/** Other language codes that map to a supported language. */
const LANGUAGE_ALIASES: Record<string, Locale> = {
	pt: 'pt-BR',
	zh: 'zh-CN',
	ms: 'id',
	// Old code for Indonesian that some browsers still send.
	in: 'id'
};

/** Maps a BCP 47 language tag such as `pt-PT` or `zh-Hant-HK` to a supported locale. */
export function matchLocale(tag: string): Locale | undefined {
	const [language] = tag.trim().toLowerCase().split(/[-_]/);

	if (LANGUAGE_ALIASES[language]) return LANGUAGE_ALIASES[language];
	return isLocale(language) ? language : undefined;
}

/** Parses an `Accept-Language` header into supported locales, most preferred first. */
export function parseAcceptLanguage(header: string | null): Locale[] {
	if (!header) return [];

	return header
		.split(',')
		.map((part, index) => {
			const [tag, ...params] = part.trim().split(';');
			const q = params.find((param) => param.trim().startsWith('q='));
			return { tag, index, quality: q ? Number(q.trim().slice(2)) : 1 };
		})
		.filter(({ tag, quality }) => tag && tag !== '*' && quality > 0)
		.toSorted((a, b) => b.quality - a.quality || a.index - b.index)
		.map(({ tag }) => matchLocale(tag))
		.filter((locale) => locale !== undefined);
}

type DetectionInput = {
	/** A language set by the page address, from the `?lang=` query parameter. */
	param?: string | null;
	/** A language the visitor picked by hand, from the locale cookie. */
	cookie?: string;
	/** The visitor's country, from Cloudflare's IP geolocation. */
	country?: string;
	acceptLanguage: string | null;
};

/**
 * Picks the language for a request:
 *
 * 1. A language set by the page address (`?lang=`).
 * 2. A language the visitor picked by hand.
 * 3. The language of the country the visitor is in. When the country has more
 *    than one (Switzerland, Belgium, Canada...), the browser's language
 *    settings choose between them.
 * 4. The browser's language settings, when the country is unknown or speaks none
 *    of the supported languages.
 * 5. English.
 */
export function detectLocale({ param, cookie, country, acceptLanguage }: DetectionInput): Locale {
	if (isLocale(param)) return param;
	if (isLocale(cookie)) return cookie;

	const preferred = parseAcceptLanguage(acceptLanguage);
	const countryLocales = country ? COUNTRY_LOCALES[country.toUpperCase()] : undefined;

	if (countryLocales) {
		return preferred.find((locale) => countryLocales.includes(locale)) ?? countryLocales[0];
	}

	return preferred[0] ?? BASE_LOCALE;
}
