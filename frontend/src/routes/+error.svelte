<script lang="ts">
	import { page } from '$app/state';
	import CreatePollButton from '$lib/components/CreatePollButton.svelte';
	import PollNotFound from '$lib/components/PollNotFound.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { Button } from '$lib/components/ui/button';
	import { getI18n } from '$lib/i18n';
	import House from '@lucide/svelte/icons/house';
	import RefreshCw from '@lucide/svelte/icons/refresh-cw';
	import { fade } from 'svelte/transition';

	const { m } = getI18n();

	const content = $derived.by(() => {
		if (page.status === 404) {
			return { title: m.error.notFoundTitle, message: m.error.notFoundText, canRetry: false };
		}

		return {
			title: m.error.title,
			message: page.status >= 500 ? m.error.serverText : m.error.text,
			canRetry: true
		};
	});
</script>

{#if page.status === 404 && page.route.id === '/polls/[id]'}
	<PollNotFound />
{:else}
	<Seo title={content.title} index={false} />

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
				{m.common.goHome}
			</Button>
			{#if content.canRetry}
				<Button onclick={() => window.location.reload()} pushable>
					<RefreshCw aria-hidden="true" />
					{m.error.tryAgain}
				</Button>
			{:else}
				<CreatePollButton label={m.common.createAPoll} />
			{/if}
		</div>
	</div>
{/if}
