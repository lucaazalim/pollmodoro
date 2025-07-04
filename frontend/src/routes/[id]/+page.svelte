<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { pollStore, voteStore } from '$lib/stores';
	import { Calendar, Check, TrendingUp } from '@lucide/svelte';

	let selectedOptions: number[] = [];
	let selectedOption: number | null = null;

	// Get poll ID from URL parameters
	$: pollId = $page.params.id;

	// Load poll when component mounts or poll ID changes
	$: if (pollId) {
		loadPoll();
	}

	async function loadPoll() {
		if (!pollId) return;
		selectedOptions = [];
		selectedOption = null;

		try {
			await pollStore.fetchPoll({ id: pollId });
		} catch (error) {
			console.error('Error loading poll:', error);
		}
	}
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

			// Refresh poll data to show updated results
			await loadPoll();
		} catch (error) {
			console.error('Error voting:', error);
		}
	}

	function getPercentage(votes: number, total: number): number {
		if (total === 0) return 0;
		return Math.round((votes / total) * 100);
	}
</script>

<svelte:head>
	<title>
		{$pollStore.data?.title || 'Poll'} - Poll App
	</title>
</svelte:head>

<div class="mx-auto max-w-3xl p-6">
	{#if $pollStore.loading}
		<div class="flex items-center justify-center py-12">
			<div class="border-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
			<span class="text-muted-foreground ml-2">Loading poll...</span>
		</div>
	{:else if $pollStore.error}
		<div class="bg-destructive/10 border-destructive/20 rounded-lg border p-6 text-center">
			<h2 class="text-destructive mb-2 text-xl font-semibold">Error Loading Poll</h2>
			<p class="text-destructive/80">{$pollStore.error}</p>
			<Button onclick={loadPoll} variant="destructive" class="mt-4">Try Again</Button>
		</div>
	{:else if $pollStore.data}
		{@const poll = $pollStore.data}

		<div class="bg-card rounded-lg border shadow-sm">
			<!-- Poll Header -->
			<div class="border-b p-6">
				<h1 class="mb-2 text-2xl font-bold">{poll.title}</h1>
				{#if poll.description}
					<p class="text-muted-foreground mb-4">{poll.description}</p>
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

						<div class="relative">
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
							<div
								class="bg-primary/20 absolute bottom-0 left-0 h-1 rounded-b-lg transition-all duration-300"
								style="width: {percentage}%"
							></div>
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

				<!-- Error/Success Messages -->
				{#if $voteStore.error}
					<div class="bg-destructive/10 border-destructive/20 mt-4 rounded-lg border p-3">
						<p class="text-destructive text-sm">{$voteStore.error}</p>
					</div>
				{/if}

				{#if $voteStore.data}
					<div class="mt-4 rounded-lg border border-green-500/20 bg-green-500/10 p-3">
						<p class="text-sm text-green-700 dark:text-green-400">
							{$voteStore.data.message}
						</p>
					</div>
				{/if}
			</div>
		</div>

		<!-- Share Poll -->
		<div class="mt-6 text-center">
			<p class="text-muted-foreground mb-2 text-sm">Share this poll:</p>
			<div class="flex justify-center">
				<code class="bg-muted text-foreground rounded px-3 py-2 text-sm">
					{window.location.href}
				</code>
			</div>
		</div>
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
