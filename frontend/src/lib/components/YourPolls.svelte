<script lang="ts">
	import { Progress } from '$lib/components/ui/progress';
	import { localStore } from '$lib/localStore.svelte';
	import { pollStore, type GetPollOutput } from '$lib/stores';
	import { getPercentage } from '$lib/utils';
	import { TrendingUp } from '@lucide/svelte';
	import { sineInOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';

	let pollIds = localStore('polls', [] as string[]);
	let polls: GetPollOutput[] = [];

	$: Promise.all(
		pollIds.value.map(async (id) => {
			return pollStore.fetchPoll({ id });
		})
	).then((fetchedPolls) => {
		polls = fetchedPolls;
	});
</script>

<div class="space-y-5" in:fade={{ duration: 500, easing: sineInOut }}>
	<h2 class="text-3xl font-bold">Your Polls</h2>
	<div class="bg-card rounded-lg border p-5 shadow-sm">
		<p class="text-card-foreground">
			Pollmodoro doesn’t require you to log in — that means all polls are anonymous. This page shows
			the polls you’ve created on <strong>this device</strong>. They're saved in your browser so
			only you can see them, and only from here. If you clear your browser data or switch devices,
			your saved polls will disappear.
		</p>
	</div>
	{#if polls.length !== 0}
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
			{#each polls as poll}
				<a href="/polls/{poll.id}" class="block">
					<div
						class="bg-card rounded-lg border p-4 shadow-sm transition-all hover:scale-[102%] hover:shadow-md"
					>
						<!-- Poll Header -->
						<div class="mb-3">
							<h3 class="line-clamp-1 font-bold">{poll.title}</h3>
							{#if poll.description}
								<p class="text-muted-foreground mt-1 line-clamp-2 text-sm">{poll.description}</p>
							{/if}
						</div>

						<!-- Total Votes -->
						<div class="text-muted-foreground mb-3 flex items-center gap-1.5 text-sm">
							<div class="bg-muted-foreground rounded-full p-1">
								<TrendingUp class="text-background size-3" />
							</div>
							Total votes: {poll.totalVotes}
						</div>

						<!-- Poll Options with Progress -->
						<div class="space-y-2">
							{#each poll.options as option}
								{@const percentage = getPercentage(option.votesCount, poll.totalVotes)}
								<div class="space-y-1">
									<div class="flex items-center justify-between text-sm">
										<span class="line-clamp-1 font-medium">{option.optionText}</span>
										<div class="ml-2 flex flex-shrink-0 items-center gap-2">
											<span class="font-semibold">{option.votesCount}</span>
											<span class="text-muted-foreground">({percentage}%)</span>
										</div>
									</div>
									<Progress value={percentage} class="h-1.5" />
								</div>
							{/each}
						</div>
					</div>
				</a>
			{/each}
		</div>
	{/if}
</div>
