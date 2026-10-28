<script lang="ts">
	import { cn } from '$lib/utils';
	import { getI18n } from '$lib/i18n';
	import LoaderCircle from '@lucide/svelte/icons/loader-circle';

	const { m } = getI18n();

	let { class: className, label = m.common.loading }: { class?: string; label?: string } = $props();
</script>

<div role="status" class={cn('flex items-center justify-center', className)}>
	<LoaderCircle class="text-primary size-8 animate-spin" aria-hidden="true" />
	<span class="sr-only">{label}</span>
</div>
