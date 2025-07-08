<script>
	import { renderTurnstileWidget, turnstileWidgetId } from '$lib/turnstile';
	import { onMount } from 'svelte';

	let { token = $bindable() } = $props();

	onMount(() => {
		renderTurnstileWidget((t) => (token = t));
	});
</script>

<div id={turnstileWidgetId} class="block min-h-[66px] flex-row"></div>
