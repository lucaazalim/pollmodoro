<script lang="ts">
	import Mascot from '$lib/components/Mascot.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { getI18n } from '$lib/i18n';

	const { m } = getI18n();

	let mascot = $state<Mascot>();
</script>

<!-- A playground for the 3D tomato, with nothing to read. -->
<Seo title={m.mascot.title} index={false} />

<div class="flex min-h-[70vh] flex-col items-center justify-center py-16">
	<h1 class="sr-only">{m.mascot.title}</h1>
	<button
		type="button"
		class="cursor-pointer rounded-full"
		aria-label={m.mascot.poke}
		onpointerenter={() => mascot?.setHovered(true)}
		onpointerleave={() => mascot?.setHovered(false)}
		onfocus={(event) => mascot?.setHovered(event.currentTarget.matches(':focus-visible'))}
		onblur={() => mascot?.setHovered(false)}
		onclick={() => mascot?.cheer()}
	>
		<Mascot bind:this={mascot} class="size-[min(36vw,36vh,18rem)]" />
	</button>
</div>
