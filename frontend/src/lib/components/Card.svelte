<script lang="ts">
	import { cn } from "$lib/utils";
	import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLDivElement>;

    let { children, class: clazz, ...props }: Props = $props();
</script>

<div class={cn("bg-card rounded-lg border p-5 shadow-sm text-card-foreground", clazz)} {...props}>
    {@render children?.()}
</div>