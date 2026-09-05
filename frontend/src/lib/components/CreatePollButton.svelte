<script lang="ts">
	import AnimatedHorizontalChartIcon from './icons/AnimatedHorizontalChartIcon.svelte';
	import { Button, type ButtonSize, type ButtonVariant } from './ui/button';

	type Props = {
		variant?: ButtonVariant;
		size?: ButtonSize;
		class?: string;
		label?: string;
	};

	let {
		variant = 'default',
		size = 'default',
		class: className,
		label = 'Create poll'
	}: Props = $props();
</script>

<Button href="/create" {variant} {size} class={className} pushable>
	<AnimatedHorizontalChartIcon aria-hidden="true" />
	{label}
</Button>
