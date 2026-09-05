<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	let { children, class: className, ...rest }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div
	class={cn('bg-card text-card-foreground rounded-xl border p-6 shadow-xs', className)}
	{...rest}
>
	{@render children?.()}
</div>
