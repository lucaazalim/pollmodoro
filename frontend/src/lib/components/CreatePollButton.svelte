<script lang="ts">
	import { getI18n } from '$lib/i18n';
	import AnimatedHorizontalChartIcon from './icons/AnimatedHorizontalChartIcon.svelte';
	import { Button, type ButtonSize, type ButtonVariant } from './ui/button';

	type Props = {
		variant?: ButtonVariant;
		size?: ButtonSize;
		class?: string;
		label?: string;
		/** Shows only the icon on small screens, keeping the label for screen readers. */
		compact?: boolean;
	};

	const { m } = getI18n();

	let {
		variant = 'default',
		size = 'default',
		class: className,
		label = m.common.createPoll,
		compact = false
	}: Props = $props();
</script>

<Button href="/create" {variant} {size} class={className} pushable>
	<AnimatedHorizontalChartIcon aria-hidden="true" />
	<span class={compact ? 'max-sm:sr-only' : undefined}>{label}</span>
</Button>
