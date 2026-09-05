<script lang="ts">
	import Card from './Card.svelte';
	import CreatePollButton from './CreatePollButton.svelte';
</script>

<Card class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
	<div class="space-y-1">
		<h2 class="text-lg font-semibold">Have a question of your own?</h2>
		<p class="text-muted-foreground text-sm">
			Polls are free and take about a minute to set up. No account needed.
		</p>
	</div>
	<CreatePollButton label="Create a poll" class="shrink-0" />
</Card>
