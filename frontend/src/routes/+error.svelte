<script lang="ts">
	import { page } from '$app/state';
	import CreatePollButton from '$lib/components/CreatePollButton.svelte';
	import { Button } from '$lib/components/ui/button';
	import House from '@lucide/svelte/icons/house';
	import RefreshCw from '@lucide/svelte/icons/refresh-cw';
	import { fade } from 'svelte/transition';

	const content = $derived.by(() => {
		if (page.status === 404) {
			return {
				title: 'Page not found',
				message: "There's nothing at this address. Check the link, or head back home.",
				canRetry: false
			};
		}

		return {
			title: 'Something went wrong',
			message:
				page.status >= 500
					? 'The server hit an error. Please try again in a moment.'
					: 'An unexpected error happened. Please try again.',
			canRetry: true
		};
	});
</script>

<svelte:head>
	<title>{content.title} · Pollmodoro</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div
	class="flex min-h-[60vh] flex-col items-center justify-center py-16 text-center"
	in:fade={{ duration: 300 }}
>
	<p class="text-muted-foreground font-mono text-sm">{page.status}</p>
	<h1 class="mt-2 text-2xl font-semibold">{content.title}</h1>
	<p class="text-muted-foreground mt-2 max-w-md text-pretty">{content.message}</p>
	{#if page.error?.message && page.status >= 500}
		<p class="text-muted-foreground mt-2 font-mono text-xs">{page.error.message}</p>
	{/if}

	<div class="mt-8 flex flex-row justify-center gap-3">
		<Button href="/" variant="outline" pushable>
			<House aria-hidden="true" />
			Go home
		</Button>
		{#if content.canRetry}
			<Button onclick={() => window.location.reload()} pushable>
				<RefreshCw aria-hidden="true" />
				Try again
			</Button>
		{:else}
			<CreatePollButton label="Create a poll" />
		{/if}
	</div>
</div>
