<script lang="ts">
	import { env } from '$env/dynamic/public';
	import { getI18n } from '$lib/i18n';
	import { loadTurnstile } from '$lib/turnstile';
	import { mode } from 'mode-watcher';

	type Props = {
		token: string | null;
		reset?: () => void;
	};

	let { token = $bindable(null), reset = $bindable() }: Props = $props();

	const { locale, m } = getI18n();

	let container: HTMLDivElement;
	let widgetId: string | undefined;

	$effect(() => {
		// Re-render the widget when the site theme changes so it matches.
		const theme = mode.current ?? 'auto';
		let cancelled = false;

		loadTurnstile()
			.then((turnstile) => {
				if (cancelled) return;

				widgetId = turnstile.render(container, {
					sitekey: env.PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA',
					theme,
					// Turnstile falls back to English for languages it doesn't support.
					language: locale,
					size: 'flexible',
					callback: (newToken) => {
						token = newToken;
					},
					'expired-callback': () => {
						token = null;
					},
					'error-callback': () => {
						token = null;
					}
				});
			})
			.catch((error: unknown) => {
				console.error(error);
			});

		return () => {
			cancelled = true;
			token = null;

			if (widgetId) {
				window.turnstile?.remove(widgetId);
				widgetId = undefined;
			}
		};
	});

	reset = () => {
		token = null;

		if (widgetId) {
			window.turnstile?.reset(widgetId);
		}
	};
</script>

<div bind:this={container} class="min-h-[65px]" role="group" aria-label={m.vote.verification}></div>
