<script>
	import { Home } from '@lucide/svelte';
	import { fade } from 'svelte/transition';
	import CreatePollButton from './CreatePollButton.svelte';
	import Button from './ui/button/button.svelte';
</script>

<div
	class="flex h-full flex-col items-center justify-center text-center"
	in:fade={{ duration: 300 }}
>
	<div class="mx-auto max-w-md">
		<div class="mb-8">
			<h2 class="text-foreground mt-4 text-2xl font-semibold">Poll Not Found</h2>
			<p class="text-foreground/80 mt-2">
				This poll may not exist or has been removed. Please check the URL or try again later.
			</p>
		</div>
		<div class="flex flex-row justify-center gap-3">
			<Button href="/" class="flex items-center gap-2">
				<Home strokeWidth={3} class="size-4" />
				Go Home
			</Button>
			<CreatePollButton variant="outline" />
		</div>
	</div>
</div>
