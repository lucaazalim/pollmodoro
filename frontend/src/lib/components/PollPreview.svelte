<script lang="ts">
	import { getI18n } from '$lib/i18n';
	import { getPercentage } from '$lib/utils';
	import Card from './Card.svelte';
	import OptionResult from './OptionResult.svelte';

	const { m } = getI18n();

	const votes = [12, 9, 5, 2];
	const options = m.preview.options.map((text, index) => ({ text, votes: votes[index] }));

	const totalVotes = options.reduce((sum, option) => sum + option.votes, 0);
</script>

<Card class="p-0 text-start" aria-label={m.preview.label}>
	<div class="border-b p-5">
		<p class="text-muted-foreground text-xs font-medium tracking-wide uppercase">
			{m.preview.badge}
		</p>
		<p class="mt-1 text-lg font-semibold">{m.preview.question}</p>
	</div>

	<div class="space-y-4 p-5">
		{#each options as option (option.text)}
			<OptionResult
				text={option.text}
				votes={option.votes}
				percentage={getPercentage(option.votes, totalVotes)}
			/>
		{/each}
	</div>

	<div class="text-muted-foreground flex items-center gap-2 border-t px-5 py-3 text-sm">
		<span class="relative flex size-2" aria-hidden="true">
			<span
				class="bg-primary absolute inline-flex size-full rounded-full opacity-75 motion-safe:animate-ping"
			></span>
			<span class="bg-primary relative inline-flex size-2 rounded-full"></span>
		</span>
		{m.preview.footer(totalVotes)}
	</div>
</Card>
