<script lang="ts">
	import AnimatedHorizontalChartIcon from './icons/AnimatedHorizontalChartIcon.svelte';
	import Button, { type ButtonProps } from './ui/button/button.svelte';

	let props: ButtonProps = $props();
</script>

<Button href="/create" {...props}>
	<AnimatedHorizontalChartIcon />
	<!-- <ChartBar strokeWidth={3} /> -->
	Create Poll
</Button>
