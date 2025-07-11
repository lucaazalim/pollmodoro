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

		console.log('Turnstile widget rendered with sitekey: ' + env.PUBLIC_TURNSTILE_SITE_KEY);
	});

	reset = () => {
		token = null;
		turnstile.reset(`#${turnstileWidgetId}`);
	};
</script>

<div
	id={turnstileWidgetId}
	class="block min-h-[66px] flex-row"
	role="application"
	aria-label="Security verification"
	aria-describedby="turnstile-description"
></div>
<div id="turnstile-description" class="sr-only">
	Complete this security verification to prove you are human and not a bot
</div>
