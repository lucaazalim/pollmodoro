<script lang="ts">
	import { page } from '$app/state';
	import ContentDisclaimer from '$lib/components/ContentDisclaimer.svelte';
	import CreateYourOwnPoll from '$lib/components/CreateYourOwnPoll.svelte';
	import ShareThisPoll from '$lib/components/ShareThisPoll.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Progress } from '$lib/components/ui/progress';
	import { pollStore, voteStore } from '$lib/stores';
	import { getPercentage } from '$lib/utils';
	import { connectWebSocket } from '$lib/websocket';
	import { Calendar, Check, TrendingUp } from '@lucide/svelte';
	import { onDestroy } from 'svelte';
	import { toast } from 'svelte-sonner';

	let selectedOptions: number[] = [];
	let selectedOption: number | null = null;
	let websocket: WebSocket | null = null;

	// Get poll ID from URL parameters
	$: pollId = page.params.id;

	// Load poll and connect WebSocket
	$: if (pollId) {
		selectedOptions = [];
		selectedOption = null;

		try {
			pollStore.fetchPoll({ id: pollId });
		} catch (error) {
			toast.error('Failed to load poll. Please try again.');
		}

		websocket = connectWebSocket(pollId, websocket);
	}

	onDestroy(() => {
		if (websocket) {
			websocket.close();
		}
	});

	async function handleVote() {
		if (!pollId) return;

		// Get the option IDs to vote for
		let optionIds: number[] = [];
		if ($pollStore.data?.allowMultipleOptions) {
			optionIds = selectedOptions;
		} else if (selectedOption !== null) {
			optionIds = [selectedOption];
		}

		if (optionIds.length === 0) return;

		try {
			await voteStore.vote({
				pollId,
				optionIds
			});

			// Show success message
			toast.success('Your vote has been successfully submitted!');

			// Clear selections after successful vote
			selectedOptions = [];
			selectedOption = null;

			// Poll data will be updated automatically via WebSocket
		} catch (error) {
			toast.error('Failed to submit vote. Please try again.');
		}
	}
</script>

<svelte:head>
	<title>
		{$pollStore.data?.title || 'Poll'} - Pollmodoro
	</title>
</svelte:head>

<div class="mx-auto max-w-3xl space-y-5 p-6">
	{#if $pollStore.loading}
		<div class="flex items-center justify-center py-12">
			<div class="border-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
			<span class="text-muted-foreground ml-2">Loading poll...</span>
		</div>
	{:else if $pollStore.error}
		<div class="bg-destructive/10 border-destructive/20 rounded-lg border p-6 text-center">
			<h2 class="text-destructive mb-2 text-xl font-semibold">Error Loading Poll</h2>
			<p class="text-destructive/80">{$pollStore.error}</p>
		</div>
	{:else if $pollStore.data}
		{@const poll = $pollStore.data}

		<div class="bg-card rounded-lg border shadow-sm">
			<!-- Poll Header -->
			<div class="space-y-3 border-b p-6">
				<h1 class="text-2xl font-bold">{poll.title}</h1>
				{#if poll.description}
					<p class="text-muted-foreground">{poll.description}</p>
				{/if}

				<div class="text-muted-foreground flex flex-wrap gap-4 text-sm">
					<div class="flex items-center gap-1.5">
						<div class="bg-muted-foreground rounded-full p-1">
							<TrendingUp class="text-background size-3" />
						</div>
						Total votes: {poll.totalVotes}
					</div>

					<div class="flex items-center gap-1.5">
						<div class="bg-muted-foreground rounded-full p-1">
							<Check class="text-background size-3" />
						</div>
						{poll.allowMultipleOptions ? 'Multiple selections allowed' : 'Single selection only'}
					</div>

					<div class="flex items-center gap-1.5">
						<div class="bg-muted-foreground rounded-full p-1">
							<Calendar class="text-background size-3" />
						</div>
						<span>Created: {new Date(poll.createdAt).toLocaleDateString()}</span>
					</div>
				</div>
			</div>

			<!-- Poll Options -->
			<div class="p-6">
				<div class="space-y-4">
					{#each poll.options as option}
						{@const percentage = getPercentage(option.votesCount, poll.totalVotes)}

						<div class="space-y-2">
							<!-- Vote Option -->
							<Label
								class="hover:bg-accent block w-full cursor-pointer rounded-lg border p-4 transition-colors {(
									poll.allowMultipleOptions
										? selectedOptions.includes(option.id)
										: selectedOption === option.id
								)
									? 'border-primary bg-primary/5'
									: 'border-border'}"
							>
								<div class="flex items-center justify-between">
									<div class="flex flex-1 items-center">
										<div class="mr-3 flex-shrink-0">
											{#if poll.allowMultipleOptions}
												<input
													type="checkbox"
													value={option.id}
													bind:group={selectedOptions}
													class="accent-primary h-4 w-4"
												/>
											{:else}
												<input
													type="radio"
													name="poll-option"
													value={option.id}
													bind:group={selectedOption}
													class="accent-primary h-4 w-4"
												/>
											{/if}
										</div>

										<span class="font-medium">{option.optionText}</span>
									</div>

									<div class="ml-4 text-right">
										<div class="text-lg font-bold">{option.votesCount}</div>
										<div class="text-muted-foreground text-sm">
											{percentage}%
										</div>
									</div>
								</div>
							</Label>

							<!-- Progress Bar -->
							<Progress value={percentage} class="h-2" />
						</div>
					{/each}
				</div>

				<!-- Submit Vote Button -->
				<div class="mt-6">
					<Button
						onclick={handleVote}
						disabled={(poll.allowMultipleOptions
							? selectedOptions.length === 0
							: selectedOption === null) || $voteStore.loading}
						class="w-full"
						size="lg"
					>
						{#if $voteStore.loading}
							<div class="flex items-center justify-center">
								<div class="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-current"></div>
								Submitting Vote...
							</div>
						{:else}
							Submit Vote{poll.allowMultipleOptions && selectedOptions.length > 1 ? 's' : ''}
							{#if poll.allowMultipleOptions && selectedOptions.length > 0}
								({selectedOptions.length} selected)
							{/if}
						{/if}
					</Button>
				</div>
			</div>
		</div>

		<ShareThisPoll pollTitle={poll.title} />
		<CreateYourOwnPoll />
		<ContentDisclaimer />
	{:else}
		<div class="py-12 text-center">
			<h2 class="text-muted-foreground text-xl font-semibold">Poll not found</h2>
			<p class="text-muted-foreground mt-2">
				The poll you're looking for doesn't exist or has been removed.
			</p>
			<Button href="/create" class="mt-4">Create a New Poll</Button>
		</div>
	{/if}
</div>
