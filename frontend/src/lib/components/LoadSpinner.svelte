<script lang="ts">
	import { cn } from '$lib/utils';
	import LoaderCircle from '@lucide/svelte/icons/loader-circle';

	let { class: className, label = 'Loading' }: { class?: string; label?: string } = $props();
</script>

<div role="status" class={cn('flex items-center justify-center', className)}>
	<LoaderCircle class="text-primary size-8 animate-spin" aria-hidden="true" />
	<span class="sr-only">{label}</span>
</div>
