<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import ContentDisclaimer from '$lib/components/ContentDisclaimer.svelte';
	import CreateYourOwnPoll from '$lib/components/CreateYourOwnPoll.svelte';
	import PollNotFound from '$lib/components/PollNotFound.svelte';
	import ShareThisPoll from '$lib/components/ShareThisPoll.svelte';
	import TurnstileWidget from '$lib/components/TurnstileWidget.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Progress } from '$lib/components/ui/progress';
	import { trpc, type PollWithResults } from '$lib/trpc';
	import { cn, formatDate, getPercentage } from '$lib/utils';
	import { subscribeToPollResults } from '$lib/websocket';
	import Calendar from '@lucide/svelte/icons/calendar';
	import ListChecks from '@lucide/svelte/icons/list-checks';
	import LoaderCircle from '@lucide/svelte/icons/loader-circle';
	import Users from '@lucide/svelte/icons/users';
	import { toast } from 'svelte-sonner';
	import { fade } from 'svelte/transition';

	type Props = {
		poll: PollWithResults | null;
	};

	let { poll: loadedPoll }: Props = $props();

	// Starts from the server-loaded poll and is overridden by live results.
	let poll = $derived(loadedPoll);

	let selectedOption = $state<number | undefined>();
	let selectedOptions = $state<number[]>([]);
	let turnstileToken = $state<string | null>(null);
	let resetTurnstile = $state<() => void>();
	let submitting = $state(false);

	const selectedIds = $derived.by(() => {
		if (!poll) return [];
		if (poll.allowMultipleOptions) return selectedOptions;
		return selectedOption === undefined ? [] : [selectedOption];
	});

	const canVote = $derived(selectedIds.length > 0 && turnstileToken !== null && !submitting);

	$effect(() => {
		const pollId = loadedPoll?.id;
		if (!pollId) return;

		return subscribeToPollResults(pollId, (results) => {
			poll = results;
		});
	});

	async function vote() {
		if (!poll || !turnstileToken || selectedIds.length === 0) return;

		submitting = true;

		try {
			await trpc.createVote.mutate({
				pollId: poll.id,
				optionIds: selectedIds,
				turnstileToken
			});

			selectedOption = undefined;
			selectedOptions = [];
			toast.success('Your vote is in.');
		} catch (error) {
			console.error(error);
			toast.error('Your vote could not be submitted. Please try again.');
		} finally {
			// A Turnstile token is single-use, so always get a fresh one.
			resetTurnstile?.();
			submitting = false;
		}
	}
</script>

<svelte:head>
	<title>{poll ? `${poll.title} · Pollmodoro` : 'Poll not found · Pollmodoro'}</title>
	{#if poll}
		<meta
			name="description"
			content={poll.description || `Vote on "${poll.title}" on Pollmodoro.`}
		/>
		<meta property="og:title" content={poll.title} />
		<meta
			property="og:description"
			content={poll.description || 'Vote on this poll and see the results live.'}
		/>
	{/if}
</svelte:head>

<div class="mx-auto max-w-3xl py-6 sm:py-10">
	{#if !poll}
		<PollNotFound />
	{:else}
		<div class="space-y-5" in:fade={{ duration: 300 }}>
			<Card class="p-0">
				<header class="space-y-2 border-b p-6">
					<h1 class="text-2xl font-bold tracking-tight text-pretty wrap-break-word">
						{poll.title}
					</h1>
					{#if poll.description}
						<p class="text-muted-foreground text-pretty wrap-break-word">{poll.description}</p>
					{/if}
					<dl class="text-muted-foreground flex flex-wrap gap-x-5 gap-y-1 pt-2 text-sm">
						<div class="flex items-center gap-1.5">
							<dt class="sr-only">Votes</dt>
							<Users class="size-4" aria-hidden="true" />
							<dd>{poll.totalVotes} {poll.totalVotes === 1 ? 'vote' : 'votes'}</dd>
						</div>
						<div class="flex items-center gap-1.5">
							<dt class="sr-only">Type</dt>
							<ListChecks class="size-4" aria-hidden="true" />
							<dd>{poll.allowMultipleOptions ? 'Multiple choice' : 'Single choice'}</dd>
						</div>
						<div class="flex items-center gap-1.5">
							<dt class="sr-only">Created</dt>
							<Calendar class="size-4" aria-hidden="true" />
							<dd>Created {formatDate(poll.createdAt)}</dd>
						</div>
					</dl>
				</header>

				<form
					class="space-y-6 p-6"
					onsubmit={(event) => {
						event.preventDefault();
						vote();
					}}
				>
					<fieldset class="space-y-3">
						<legend class="sr-only">
							{poll.allowMultipleOptions ? 'Pick one or more options' : 'Pick one option'}
						</legend>

						{#each poll.options as option (option.id)}
							{@const percentage = getPercentage(option.votesCount, poll.totalVotes)}
							{@const selected = selectedIds.includes(option.id)}

							<label
								class={cn(
									'hover:bg-muted/50 has-focus-visible:ring-ring/50 block cursor-pointer space-y-3 rounded-lg border p-4 transition-colors has-focus-visible:ring-3',
									selected && 'border-primary bg-primary/5 hover:bg-primary/10'
								)}
							>
								<div class="flex items-start justify-between gap-4">
									<div class="flex min-w-0 items-start gap-3">
										{#if poll.allowMultipleOptions}
											<input
												type="checkbox"
												value={option.id}
												bind:group={selectedOptions}
												class="accent-primary mt-1 size-4 shrink-0"
												disabled={submitting}
											/>
										{:else}
											<input
												type="radio"
												name="option"
												value={option.id}
												bind:group={selectedOption}
												class="accent-primary mt-1 size-4 shrink-0"
												disabled={submitting}
											/>
										{/if}
										<span class="leading-snug font-medium wrap-anywhere">{option.optionText}</span>
									</div>
									<span class="shrink-0 text-right tabular-nums">
										<span class="block text-lg leading-tight font-bold">{option.votesCount}</span>
										<span class="text-muted-foreground text-sm">{percentage}%</span>
									</span>
								</div>
								<Progress
									value={percentage}
									class="h-2"
									aria-label="{percentage}% of votes for {option.optionText}"
								/>
							</label>
						{/each}
					</fieldset>

					<div class="space-y-3 border-t pt-6">
						<TurnstileWidget bind:token={turnstileToken} bind:reset={resetTurnstile} />

						<Button
							type="submit"
							pushable
							disabled={!canVote}
							class="h-11 w-full text-base"
							size="lg"
						>
							{#if submitting}
								<LoaderCircle class="animate-spin" aria-hidden="true" />
								Submitting…
							{:else if poll.allowMultipleOptions && selectedIds.length > 1}
								Vote for {selectedIds.length} options
							{:else}
								Vote
							{/if}
						</Button>

						<p class="sr-only" aria-live="polite">
							{#if submitting}
								Submitting your vote.
							{:else if !canVote}
								Pick an option and complete the verification to vote.
							{/if}
						</p>
					</div>
				</form>
			</Card>

			<ShareThisPoll pollTitle={poll.title} />
			<CreateYourOwnPoll />
			<ContentDisclaimer />
		</div>
	{/if}
</div>
