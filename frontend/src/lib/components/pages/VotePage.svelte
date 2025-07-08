<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import ContentDisclaimer from '$lib/components/ContentDisclaimer.svelte';
	import CreateYourOwnPoll from '$lib/components/CreateYourOwnPoll.svelte';
	import LoadSpinner from '$lib/components/LoadSpinner.svelte';
	import ShareThisPoll from '$lib/components/ShareThisPoll.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Progress } from '$lib/components/ui/progress';
	import { pollStore, voteStore } from '$lib/stores';
	import { resetTurnstileWidget } from '$lib/turnstile';
	import { getPercentage } from '$lib/utils';
	import { connectWebSocket } from '$lib/websocket';
	import { Calendar, Check, TrendingUp } from '@lucide/svelte';
	import { onDestroy } from 'svelte';
	import { toast } from 'svelte-sonner';
	import { fade } from 'svelte/transition';
	import TurnstileWidget from '../TurnstileWidget.svelte';

	let selectedOptions: number[] = [];
	let selectedOption: number | null = null;
	let webSocket: WebSocket | null = null;
	let turnstileToken: string | null = null;

	// Get poll ID from URL parameters
	const pollId = page.params.id;

	// Load poll and connect WebSocket
	if (pollId) {
		selectedOptions = [];
		selectedOption = null;

		try {
			pollStore.fetchPoll({ id: pollId });
		} catch (error) {
			toast.error('Failed to load poll. Please try again.');
		}

		if (browser) {
			webSocket = connectWebSocket(pollId, webSocket);
		}
	}

	onDestroy(() => {
		if (webSocket) {
			webSocket.close();
		}
	});

	async function handleVote() {
		if (!turnstileToken) {
			toast.error('Please complete the captcha before submitting your vote.');
			return;
		}

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
				optionIds,
				turnstileToken: turnstileToken || ''
			});

			// Clear selections after successful vote
			selectedOptions = [];
			selectedOption = null;

			// Reset Turnstile token
			turnstileToken = null;
			resetTurnstileWidget();

			// Show success message
			toast.success('Your vote has been successfully submitted!');
		} catch (error) {
			console.error(error);
			toast.error('Failed to submit vote. Please try again.');
		}
	}
</script>

<svelte:head>
	<title>
		{$pollStore.data?.title || 'Poll'} - Pollmodoro
	</title>
</svelte:head>

<div class="mx-auto max-w-3xl p-6">
	{#if $pollStore.loading}
		<div class="flex items-center justify-center py-12">
			<LoadSpinner />
			<span class="text-muted-foreground ml-2">Loading poll...</span>
		</div>
	{:else if $pollStore.error}
		<div class="bg-destructive/10 border-destructive/20 rounded-lg border p-6 text-center">
			<h2 class="text-destructive mb-2 text-xl font-semibold">Error Loading Poll</h2>
			<p class="text-destructive/80">{$pollStore.error}</p>
		</div>
	{:else if $pollStore.data}
		{@const poll = $pollStore.data}

		<div in:fade={{ duration: 300 }} class="space-y-5">
			<div class="bg-card rounded-lg border shadow-sm">
				<!-- Poll Header -->
				<div class="space-y-3 border-b p-6">
					<h1 class="wrap-break-word text-wrap text-2xl font-bold">{poll.title}</h1>
					{#if poll.description}
						<p class="wrap-break-word text-muted-foreground text-wrap">{poll.description}</p>
					{/if}

					<div class="text-muted-foreground flex flex-wrap gap-4 text-sm">
						<div class="flex items-center gap-1.5">
							<div class="bg-muted-foreground rounded-full p-1">
								<TrendingUp strokeWidth={3} class="text-background size-3" />
							</div>
							Total votes: {poll.totalVotes}
						</div>

						<div class="flex items-center gap-1.5">
							<div class="bg-muted-foreground rounded-full p-1">
								<Check strokeWidth={3} class="text-background size-3" />
							</div>
							{poll.allowMultipleOptions ? 'Multiple selections allowed' : 'Single selection only'}
						</div>

						<div class="flex items-center gap-1.5">
							<div class="bg-muted-foreground rounded-full p-1">
								<Calendar strokeWidth={3} class="text-background size-3" />
							</div>
							<span>Created: {new Date(poll.createdAt).toLocaleDateString()}</span>
						</div>
					</div>
				</div>

				<!-- Poll Options -->
				<div class="space-y-4 border-b p-6">
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
								<div class="flex items-center justify-between gap-4">
									<div class="flex flex-row items-center justify-between gap-3">
										<div>
											{#if poll.allowMultipleOptions}
												<input
													type="checkbox"
													value={option.id}
													bind:group={selectedOptions}
													class="accent-primary size-4"
												/>
											{:else}
												<input
													type="radio"
													name="poll-option"
													value={option.id}
													bind:group={selectedOption}
													class="accent-primary size-4"
												/>
											{/if}
										</div>

										<p class="wrap-anywhere font-medium/5 line-clamp-3 leading-snug">
											{option.optionText}
										</p>
									</div>

									<div class="text-right">
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

				<div class="space-y-3 border-b p-6">
					<TurnstileWidget bind:token={turnstileToken} />

					<!-- Submit Vote Button -->
					<div>
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
									<div
										class="mr-2 size-4 animate-spin rounded-full border-b-2 border-current"
									></div>
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
