// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { Locale } from '$lib/i18n/locales';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			locale: Locale;
		}
		// interface PageData {}
		// interface PageState {}
		interface Platform {
			/** Request metadata from Cloudflare, including the visitor's country. */
			cf?: { country?: string };
		}
	}
}

export {};
