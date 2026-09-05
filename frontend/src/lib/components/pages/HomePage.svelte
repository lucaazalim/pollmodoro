<script lang="ts">
	import CreatePollButton from '$lib/components/CreatePollButton.svelte';
	import PollPreview from '$lib/components/PollPreview.svelte';
	import { Button } from '$lib/components/ui/button';
	import Code from '@lucide/svelte/icons/code';
	import ListChecks from '@lucide/svelte/icons/list-checks';
	import ShieldCheck from '@lucide/svelte/icons/shield-check';
	import UserRoundX from '@lucide/svelte/icons/user-round-x';
	import VenetianMask from '@lucide/svelte/icons/venetian-mask';
	import Wallet from '@lucide/svelte/icons/wallet';
	import { fade } from 'svelte/transition';

	const steps = [
		{
			title: 'Write the question',
			text: 'Add a title, an optional description, and two to ten options. Decide whether people can pick more than one.'
		},
		{
			title: 'Share the link',
			text: 'Every poll gets its own link. Paste it in a chat, an email, or a post. Nobody needs an account to vote.'
		},
		{
			title: 'Watch the results',
			text: 'Votes show up as they come in, with counts and percentages. Keep the page open and it stays up to date.'
		}
	];

	const details = [
		{
			icon: UserRoundX,
			title: 'No accounts',
			text: 'Nothing to sign up for. Polls you create are remembered in this browser under "Your polls".'
		},
		{
			icon: VenetianMask,
			title: 'Anonymous voting',
			text: "Voting doesn't ask for a name or an email address."
		},
		{
			icon: ListChecks,
			title: 'Single or multiple choice',
			text: 'Let people pick one option, or as many as they like.'
		},
		{
			icon: ShieldCheck,
			title: 'Bot protection',
			text: 'Creating a poll and voting go through Cloudflare Turnstile to keep automated votes out.'
		},
		{
			icon: Wallet,
			title: 'Free',
			text: 'There is no paid version and no limit on the number of polls.'
		},
		{
			icon: Code,
			title: 'Open source',
			text: 'Built with SvelteKit and Cloudflare Workers. The code is on GitHub.'
		}
	];
</script>

<svelte:head>
	<title>Pollmodoro · Quick polls, no sign-up</title>
	<meta
		name="description"
		content="Pollmodoro is a free poll maker with no sign-up. Write a question, share the link, and watch the results update live."
	/>
	<meta property="og:title" content="Pollmodoro · Quick polls, no sign-up" />
	<meta
		property="og:description"
		content="Write a question, share the link, and watch the results update live. Free, no account needed."
	/>
	<meta property="og:image" content="https://pollmodoro.com/pollmodoro.png" />
</svelte:head>

<div class="mx-auto max-w-5xl px-5" in:fade={{ duration: 400 }}>
	<!-- Hero -->
	<section
		class="grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24"
		aria-labelledby="hero-heading"
	>
		<div class="text-center lg:text-left">
			<img
				src="/pollmodoro.png"
				alt="The Pollmodoro tomato mascot"
				width="80"
				height="80"
				class="mx-auto size-20 lg:mx-0"
			/>
			<h1
				id="hero-heading"
				class="mt-6 font-serif text-4xl leading-tight font-bold tracking-tight text-balance sm:text-5xl"
			>
				Make a poll. Share a link. See the votes.
			</h1>
			<p class="text-muted-foreground mx-auto mt-6 max-w-xl text-lg text-pretty lg:mx-0">
				Pollmodoro is a free poll maker with no sign-up. Write a question, add up to ten options,
				and send the link to whoever needs to answer. Results update live as votes come in.
			</p>
			<div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
				<CreatePollButton
					label="Create a poll"
					size="lg"
					class="h-11 text-base [--pushable-px:1.25rem]"
				/>
				<Button
					href="/polls/hMRwidAt-KmMdCIjITyfd"
					variant="outline"
					size="lg"
					class="h-11 text-base [--pushable-px:1.25rem]"
					pushable
				>
					See an example poll
				</Button>
			</div>
		</div>

		<PollPreview />
	</section>

	<!-- How it works -->
	<section class="border-t py-16" aria-labelledby="how-heading">
		<h2 id="how-heading" class="text-2xl font-bold tracking-tight">How it works</h2>
		<ol class="mt-8 grid gap-8 md:grid-cols-3">
			{#each steps as step, index (step.title)}
				<li class="flex gap-4 md:flex-col">
					<span
						class="bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-bold tabular-nums"
						aria-hidden="true"
					>
						{index + 1}
					</span>
					<div>
						<h3 class="font-semibold">{step.title}</h3>
						<p class="text-muted-foreground mt-1 text-sm leading-relaxed">{step.text}</p>
					</div>
				</li>
			{/each}
		</ol>
	</section>

	<!-- Good to know -->
	<section class="border-t py-16" aria-labelledby="details-heading">
		<h2 id="details-heading" class="text-2xl font-bold tracking-tight">Good to know</h2>
		<ul class="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
			{#each details as detail (detail.title)}
				<li class="flex gap-4">
					<span
						class="bg-muted text-foreground flex size-9 shrink-0 items-center justify-center rounded-lg"
						aria-hidden="true"
					>
						<detail.icon class="size-4" />
					</span>
					<div>
						<h3 class="font-semibold">{detail.title}</h3>
						<p class="text-muted-foreground mt-1 text-sm leading-relaxed">{detail.text}</p>
					</div>
				</li>
			{/each}
		</ul>
	</section>

	<!-- Closing -->
	<section class="border-t py-16 text-center" aria-labelledby="closing-heading">
		<h2 id="closing-heading" class="font-serif text-2xl font-bold tracking-tight">
			That's all there is to it.
		</h2>
		<p class="text-muted-foreground mt-2">A question, a few options, and a link to share.</p>
		<div class="mt-6">
			<CreatePollButton
				label="Create a poll"
				size="lg"
				class="h-11 text-base [--pushable-px:1.25rem]"
			/>
		</div>
	</section>
</div>
