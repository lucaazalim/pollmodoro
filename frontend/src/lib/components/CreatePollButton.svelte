<script lang="ts">
	import { ChartBar } from '@lucide/svelte';
	import Button, { type ButtonProps } from './ui/button/button.svelte';

	let props: ButtonProps = $props();
</script>

<Button href="/create" {...props}>
	<ChartBar strokeWidth={3} />
	Create Poll
</Button>
