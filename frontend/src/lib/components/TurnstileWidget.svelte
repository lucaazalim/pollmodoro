<script lang="ts">
	import { env } from '$env/dynamic/public';
	import { getTurnstileContext, turnstileWidgetId } from '$lib/turnstile';

	type Props = {
		token: string | null;
		reset?: () => void;
	};

	let { token = $bindable(), reset = $bindable() }: Props = $props();

	let turnstileContext = getTurnstileContext();

	$effect(() => {
		if (!turnstileContext.loaded) {
			return;
		}

		turnstile.render(`#${turnstileWidgetId}`, {
			sitekey: env.PUBLIC_TURNSTILE_SITE_KEY || '',
			theme: 'auto',
			size: 'flexible',
			callback: (newToken) => {
				token = newToken;
			}
		});

		console.log('Turnstile widget rendered!');
	});

	reset = () => {
		token = null;
		turnstile.reset(`#${turnstileWidgetId}`);
	};
</script>

<div id={turnstileWidgetId} class="block min-h-[66px] flex-row"></div>
