<script lang="ts">
	import { page } from '$app/state';
	import CreatePollButton from '$lib/components/CreatePollButton.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Home, RefreshCw } from '@lucide/svelte';
	import { sineInOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';

	const { error, status } = page;

	const errorConfigs = {
		404: {
			title: 'Page Not Found',
			message: "The page you're looking for doesn't exist or has been moved.",
			showCreateButton: true
		},
		500: {
			title: 'Server Error',
			message: "We're experiencing technical difficulties. Please try again later.",
			showCreateButton: false
		}
	} as const;

	const defaultErrorConfig = {
		title: 'Something Went Wrong',
		message: 'An unexpected error occurred. Please try again.',
		showCreateButton: true
	};

	let errorConfig = $derived(
		errorConfigs[status as keyof typeof errorConfigs] || defaultErrorConfig
	);
</script>

<svelte:head>
	<title>{errorConfig.title} - Pollmodoro</title>
	<meta
		name="description"
		content="{errorConfig.message} Return to Pollmodoro homepage to create polls and gather feedback."
	/>
	<meta name="robots" content="noindex, follow" />
</svelte:head>

<div
	class="flex h-full flex-col items-center justify-center text-center"
	in:fade={{ duration: 500, easing: sineInOut }}
>
	<div class="mx-auto max-w-md">
		<div class="mb-8">
			<h2 class="text-foreground mt-4 text-2xl font-semibold">
				{errorConfig.title}
			</h2>
			<p class="text-foreground/80 mt-2">
				{errorConfig.message}
			</p>
			{#if error?.message && status >= 500}
				<p class="text-muted mt-2 text-sm">
					Error: {error.message}
				</p>
			{/if}
		</div>

		<div class="flex flex-row justify-center gap-3">
			<Button href="/" class="flex items-center gap-2">
				<Home strokeWidth={3} class="size-4" />
				Go Home
			</Button>
			{#if errorConfig.showCreateButton}
				<CreatePollButton variant="outline" />
			{:else}
				<Button
					onclick={() => window.location.reload()}
					variant="outline"
					class="flex items-center gap-2"
				>
					<RefreshCw class="h-4 w-4" />
					Try Again
				</Button>
			{/if}
		</div>
	</div>
</div>
