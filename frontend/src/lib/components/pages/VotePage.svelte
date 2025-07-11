<script lang="ts">
	import { browser } from '$app/environment';
	import ContentDisclaimer from '$lib/components/ContentDisclaimer.svelte';
	import CreateYourOwnPoll from '$lib/components/CreateYourOwnPoll.svelte';
	import ShareThisPoll from '$lib/components/ShareThisPoll.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Progress } from '$lib/components/ui/progress';
	import { pollStore, voteStore, type GetPollOutput } from '$lib/stores';
	import { cn, getPercentage } from '$lib/utils';
	import { connectWebSocket } from '$lib/websocket';
	import { Calendar, Check, Loader2, TrendingUp } from '@lucide/svelte';
	import { onDestroy } from 'svelte';
	import { toast } from 'svelte-sonner';
	import { fade } from 'svelte/transition';
	import PollNotFound from '../PollNotFound.svelte';
	import TurnstileWidget from '../TurnstileWidget.svelte';
	import Card from '../Card.svelte';

	type Props = {
		poll: GetPollOutput | null;
	};

	let { poll }: Props = $props();

	if (poll) {
		pollStore.updatePollData(poll);
	}

	let webSocket: WebSocket | undefined = undefined;

	let selectedOptions: number[] = $state([]);
	let selectedOption: number | undefined = $state();

	let turnstileToken: string | null = $state(null);
	let resetTurnstileWidget: (() => void) | undefined = $state();

	let submitButtonDisabled = $derived.by(() => {
		if (!poll) return true;

		const noMultiple = poll.allowMultipleOptions && selectedOptions.length === 0;
		const noSingle = !poll.allowMultipleOptions && !selectedOption;
		const isLoading = $voteStore.loading;
		const noTurstileToken = !turnstileToken;

		return noMultiple || noSingle || isLoading || noTurstileToken;
	});

	if (browser && poll) {
		webSocket = connectWebSocket(poll.id, webSocket);
	}

	onDestroy(() => {
		if (webSocket) {
			webSocket.close();
		}
	});

	async function handleVote() {
		if (!poll) {
			return;
		}

		if (!turnstileToken) {
			toast.error('Please complete the captcha before submitting your vote.');
			return;
		}

		let optionIds: number[] = [];

		if ($pollStore.data?.allowMultipleOptions) {
			optionIds = selectedOptions;
		} else if (selectedOption) {
			optionIds = [selectedOption];
		}

		if (optionIds.length === 0) return;

		try {
			await voteStore.vote({
				pollId: poll.id,
				optionIds,
				turnstileToken: turnstileToken || ''
			});

			// Clear selections after successful vote
			selectedOptions = [];
			selectedOption = undefined;

			// Reset Turnstile token
			resetTurnstileWidget?.();

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

<div class="mx-auto h-full max-w-3xl lg:py-5">
	{#if $pollStore.error || !$pollStore.data}
		<PollNotFound />
	{:else}
		{@const poll = $pollStore.data}

		<div in:fade={{ duration: 300 }} class="space-y-5">
			<Card class="p-0" role="main">
				<!-- Poll Header -->
				<header class="border-b p-6">
					<h1 class="text-2xl font-bold text-wrap wrap-break-word">{poll.title}</h1>
					{#if poll.description}
						<p class="text-muted-foreground text-wrap wrap-break-word">{poll.description}</p>
					{/if}
				</header>

				<div class="border-b p-6">
					<div
						class="text-muted-foreground flex flex-wrap gap-4 text-sm"
						role="list"
						aria-label="Poll statistics"
					>
						<div class="flex items-center gap-1.5" role="listitem">
							<div class="bg-muted-foreground rounded-full p-1" aria-hidden="true">
								<TrendingUp strokeWidth={3} class="text-background size-3" />
							</div>
							Total votes: {poll.totalVotes}
						</div>

						<div class="flex items-center gap-1.5" role="listitem">
							<div class="bg-muted-foreground rounded-full p-1" aria-hidden="true">
								<Check strokeWidth={3} class="text-background size-3" />
							</div>
							{poll.allowMultipleOptions ? 'Multiple selections allowed' : 'Single selection only'}
						</div>

						<div class="flex items-center gap-1.5" role="listitem">
							<div class="bg-muted-foreground rounded-full p-1" aria-hidden="true">
								<Calendar strokeWidth={3} class="text-background size-3" />
							</div>
							<span>Created: {new Date(poll.createdAt).toLocaleDateString()}</span>
						</div>
					</div>
				</div>

				<!-- Poll Options -->
				<form class="space-y-4 border-b p-6" aria-labelledby="poll-options-heading">
					<h2 id="poll-options-heading" class="sr-only">Poll Options</h2>
					<fieldset class="space-y-5">
						<legend class="sr-only">
							{poll.allowMultipleOptions ? 'Select one or more options' : 'Select one option'}
						</legend>

						{#each poll.options as option (option.id)}
							{@const percentage = getPercentage(option.votesCount, poll.totalVotes)}

								<!-- Vote Option -->
								<Label
									class={cn(
										'shadow-sm hover:bg-accent block w-full cursor-pointer space-y-3 rounded-lg border p-4 transition-colors',
										{
											'border-primary bg-primary/5':
												poll.allowMultipleOptions && selectedOptions.includes(option.id),
											'border-border': !poll.allowMultipleOptions && selectedOption === option.id
										}
									)}
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
														aria-describedby="option-{option.id}-stats"
													/>
												{:else}
													<input
														type="radio"
														name="poll-option"
														value={option.id}
														bind:group={selectedOption}
														class="accent-primary size-4"
														aria-describedby="option-{option.id}-stats"
													/>
												{/if}
											</div>

											<p class="font-medium/5 line-clamp-3 leading-snug wrap-anywhere">
												{option.optionText}
											</p>
										</div>

										<div class="text-right">
											<div class="-mb-1 text-lg font-bold">
												{option.votesCount.toLocaleString()}
											</div>
											<div class="text-muted-foreground text-sm">
												{percentage}%
											</div>
										</div>
									</div>
									<Progress
										value={percentage}
										class="h-2"
										aria-label="Progress bar showing {percentage}% of votes for this option"
									/>
									<div id="option-{option.id}-stats" class="sr-only">
										{option.optionText}: {option.votesCount} votes, {percentage}% of total
									</div>
								</Label>
						{/each}
					</fieldset>
				</form>

				<div class="space-y-3 border-b p-6">
					<fieldset>
						<legend class="sr-only">Security verification</legend>
						<TurnstileWidget bind:token={turnstileToken} bind:reset={resetTurnstileWidget} />
					</fieldset>

					<!-- Submit Vote Button -->
					<div>
						<Button
							onclick={handleVote}
							disabled={submitButtonDisabled}
							class="w-full"
							size="lg"
							aria-describedby="vote-status"
						>
							{#if $voteStore.loading}
								<div class="flex items-center justify-center gap-1.5">
									<Loader2 class="text-primary-foreground size-4 animate-spin" aria-hidden="true" />
									Submitting Vote...
								</div>
							{:else}
								Submit Vote{poll.allowMultipleOptions && selectedOptions.length > 1 ? 's' : ''}
								{#if poll.allowMultipleOptions && selectedOptions.length > 0}
									({selectedOptions.length} selected)
								{/if}
							{/if}
						</Button>
						<div id="vote-status" class="sr-only" aria-live="polite">
							{#if $voteStore.loading}
								Submitting your vote, please wait...
							{:else if submitButtonDisabled}
								Please select an option and complete the security verification to submit your vote
							{:else}
								Ready to submit vote
							{/if}
						</div>
					</div>
				</div>
			</Card>

			<ShareThisPoll pollTitle={poll.title} />
			<CreateYourOwnPoll />
			<ContentDisclaimer />
		</div>
	{/if}
</div>
