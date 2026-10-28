<script lang="ts">
	import { getI18n } from '$lib/i18n';
	import House from '@lucide/svelte/icons/house';
	import { fade } from 'svelte/transition';
	import CreatePollButton from './CreatePollButton.svelte';
	import Seo from './Seo.svelte';
	import { Button } from './ui/button';

	const { m } = getI18n();
</script>

<Seo title={m.pollNotFound.title} index={false} />

<div
	class="flex min-h-[60vh] flex-col items-center justify-center py-16 text-center"
	in:fade={{ duration: 300 }}
>
	<img
		src="/favicon/android-chrome-192x192.png"
		alt=""
		width="64"
		height="64"
		class="size-16 opacity-60 grayscale"
	/>
	<h1 class="mt-6 text-2xl font-semibold">{m.pollNotFound.title}</h1>
	<p class="text-muted-foreground mt-2 max-w-md">{m.pollNotFound.text}</p>
	<div class="mt-8 flex flex-row justify-center gap-3">
		<Button href="/" variant="outline" pushable>
			<House aria-hidden="true" />
			{m.common.goHome}
		</Button>
		<CreatePollButton label={m.common.createAPoll} />
	</div>
</div>
