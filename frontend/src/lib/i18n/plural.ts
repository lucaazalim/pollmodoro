export type PluralForms = { [K in Intl.LDMLPluralRule]?: string } & {
	other: string;
	/** A form for exactly that count, such as `=0`, taking precedence over the plural rules. */
	[exact: `=${number}`]: string | undefined;
};

/**
 * Returns a function that picks the plural form of a message for a count, using
 * the plural rules of `locale`, and replaces `#` in it with the formatted count.
 *
 * Forms a language doesn't use are ignored, and `other` is the fallback.
 *
 * @example
 * const p = plural('en');
 * p(1, { one: '# vote', other: '# votes' }); // "1 vote"
 */
export function plural(locale: string) {
	const rules = new Intl.PluralRules(locale);
	const numbers = new Intl.NumberFormat(locale);

	return (count: number, forms: PluralForms) =>
		(forms[`=${count}`] ?? forms[rules.select(count)] ?? forms.other).replaceAll(
			'#',
			numbers.format(count)
		);
}
