<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import ContentDisclaimer from '$lib/components/ContentDisclaimer.svelte';
	import CreateYourOwnPoll from '$lib/components/CreateYourOwnPoll.svelte';
	import PollNotFound from '$lib/components/PollNotFound.svelte';
	import ShareThisPoll from '$lib/components/ShareThisPoll.svelte';
	import TurnstileWidget from '$lib/components/TurnstileWidget.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Progress } from '$lib/components/ui/progress';
	import { getI18n } from '$lib/i18n';
	import { trpc, type PollWithResults } from '$lib/trpc';
	import { cn, getPercentage } from '$lib/utils';
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

	const { m, formatNumber, formatPercent, formatDate } = getI18n();

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
			toast.success(m.vote.success);
		} catch (error) {
			console.error(error);
			toast.error(m.vote.failed);
		} finally {
			// A Turnstile token is single-use, so always get a fresh one.
			resetTurnstile?.();
			submitting = false;
		}
	}
</script>

<svelte:head>
	<title>{poll ? poll.title : m.pollNotFound.title} · Pollmodoro</title>
	{#if poll}
		<meta name="description" content={poll.description || m.vote.metaDescription(poll.title)} />
		<meta property="og:title" content={poll.title} />
		<meta property="og:description" content={poll.description || m.vote.ogDescription} />
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
							<dt class="sr-only">{m.vote.votesLabel}</dt>
							<Users class="size-4" aria-hidden="true" />
							<dd>{m.common.votes(poll.totalVotes)}</dd>
						</div>
						<div class="flex items-center gap-1.5">
							<dt class="sr-only">{m.vote.typeLabel}</dt>
							<ListChecks class="size-4" aria-hidden="true" />
							<dd>{poll.allowMultipleOptions ? m.vote.multipleChoice : m.vote.singleChoice}</dd>
						</div>
						<div class="flex items-center gap-1.5">
							<dt class="sr-only">{m.vote.createdLabel}</dt>
							<Calendar class="size-4" aria-hidden="true" />
							<dd>{m.vote.createdOn(formatDate(poll.createdAt))}</dd>
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
							{poll.allowMultipleOptions ? m.vote.pickOneOrMore : m.vote.pickOne}
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
									<span class="shrink-0 text-end tabular-nums">
										<span class="block text-lg leading-tight font-bold">
											{formatNumber(option.votesCount)}
										</span>
										<span class="text-muted-foreground text-sm">{formatPercent(percentage)}</span>
									</span>
								</div>
								<Progress
									value={percentage}
									class="h-2"
									aria-label={m.vote.optionVotes(formatPercent(percentage), option.optionText)}
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
								{m.vote.submitting}
							{:else if poll.allowMultipleOptions && selectedIds.length > 1}
								{m.vote.submitMany(selectedIds.length)}
							{:else}
								{m.vote.submit}
							{/if}
						</Button>

						<p class="sr-only" aria-live="polite">
							{#if submitting}
								{m.vote.submittingStatus}
							{:else if !canVote}
								{m.vote.cannotVoteStatus}
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
