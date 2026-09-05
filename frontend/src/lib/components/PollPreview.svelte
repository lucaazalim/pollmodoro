<script lang="ts">
	import { getPercentage } from '$lib/utils';
	import Card from './Card.svelte';
	import OptionResult from './OptionResult.svelte';

	const options = [
		{ text: 'The pizza place around the corner', votes: 12 },
		{ text: 'Tacos', votes: 9 },
		{ text: 'Sushi', votes: 5 },
		{ text: "Whatever, I'm not picky", votes: 2 }
	];

	const totalVotes = options.reduce((sum, option) => sum + option.votes, 0);
</script>

<Card class="p-0 text-left" aria-label="Example of a poll">
	<div class="border-b p-5">
		<p class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Example poll</p>
		<p class="mt-1 text-lg font-semibold">Where should we go for lunch on Friday?</p>
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
		{totalVotes} votes · results update live
	</div>
</Card>
