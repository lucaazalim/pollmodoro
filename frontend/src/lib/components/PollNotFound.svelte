<script lang="ts">
	import House from '@lucide/svelte/icons/house';
	import { fade } from 'svelte/transition';
	import CreatePollButton from './CreatePollButton.svelte';
	import { Button } from './ui/button';
</script>

<svelte:head>
	<title>Poll not found · Pollmodoro</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div
	class="flex min-h-[60vh] flex-col items-center justify-center py-16 text-center"
	in:fade={{ duration: 300 }}
>
	<img src="/pollmodoro.png" alt="" width="64" height="64" class="size-16 opacity-60 grayscale" />
	<h1 class="mt-6 text-2xl font-semibold">Poll not found</h1>
	<p class="text-muted-foreground mt-2 max-w-md">
		This poll doesn't exist, or the link is wrong. Double-check the address, or create a new poll.
	</p>
	<div class="mt-8 flex flex-row justify-center gap-3">
		<Button href="/" variant="outline" pushable>
			<House aria-hidden="true" />
			Go home
		</Button>
		<CreatePollButton label="Create a poll" />
	</div>
</div>
