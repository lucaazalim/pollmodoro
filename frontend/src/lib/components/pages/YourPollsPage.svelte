<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import CreatePollButton from '$lib/components/CreatePollButton.svelte';
	import LoadSpinner from '$lib/components/LoadSpinner.svelte';
	import OptionResult from '$lib/components/OptionResult.svelte';
	import { getI18n } from '$lib/i18n';
	import { localStore } from '$lib/localStore.svelte';
	import { trpc, type PollWithResults } from '$lib/trpc';
	import { getPercentage } from '$lib/utils';
	import Users from '@lucide/svelte/icons/users';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { z } from 'zod';

	const { m, formatDate } = getI18n();

	const savedPolls = localStore('polls', [] as string[], z.array(z.string()));

	let polls = $state<PollWithResults[]>();

	onMount(async () => {
		// Newest first. Polls that no longer exist are skipped.
		const results = await Promise.allSettled(
			savedPolls.current.toReversed().map((id) => trpc.getPoll.query({ id }))
		);

		polls = results.filter((result) => result.status === 'fulfilled').map((result) => result.value);
	});
</script>

<svelte:head>
	<title>{m.header.yourPolls} · Pollmodoro</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="mx-auto max-w-5xl py-6 sm:py-10" in:fade={{ duration: 400 }}>
	<div class="mb-6">
		<h1 class="text-3xl font-bold tracking-tight">{m.header.yourPolls}</h1>
		<p class="text-muted-foreground mt-1 max-w-2xl text-pretty">{m.yourPolls.intro}</p>
	</div>

	{#if polls === undefined}
		<LoadSpinner class="py-16" label={m.yourPolls.loading} />
	{:else if polls.length === 0}
		<Card class="flex flex-col items-center gap-4 py-12 text-center">
			<p class="text-muted-foreground">{m.yourPolls.empty}</p>
			<CreatePollButton label={m.common.createAPoll} />
		</Card>
	{:else}
		<ul class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
			{#each polls as poll (poll.id)}
				<li>
					<a
						href="/polls/{poll.id}"
						class="bg-card text-card-foreground hover:border-primary/40 focus-visible:ring-ring/50 flex h-full flex-col rounded-xl border shadow-xs transition-colors outline-none focus-visible:ring-3"
					>
						<div class="space-y-1 border-b p-4">
							<h2 class="line-clamp-2 font-semibold wrap-break-word">{poll.title}</h2>
							{#if poll.description}
								<p class="text-muted-foreground line-clamp-2 text-sm wrap-break-word">
									{poll.description}
								</p>
							{/if}
						</div>

						<div class="grow space-y-3 p-4">
							{#each poll.options as option (option.id)}
								<OptionResult
									text={option.optionText}
									votes={option.votesCount}
									percentage={getPercentage(option.votesCount, poll.totalVotes)}
								/>
							{/each}
						</div>

						<div
							class="text-muted-foreground flex items-center justify-between gap-2 border-t p-4 text-sm"
						>
							<span class="flex items-center gap-1.5">
								<Users class="size-4" aria-hidden="true" />
								{m.common.votes(poll.totalVotes)}
							</span>
							<span>{formatDate(poll.createdAt)}</span>
						</div>
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</div>
