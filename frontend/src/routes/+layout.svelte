<script lang="ts">
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Toaster } from '$lib/components/ui/sonner';
	import { Plus } from '@lucide/svelte';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
	<link rel="manifest" href="/site.webmanifest" />
</svelte:head>

<div class="bg-background min-h-screen">
	<!-- Navigation Header -->
	<nav class="bg-card border-b shadow-sm">
		<div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between py-4">
				<a href="/">
					<div class="flex items-center">
						<img src="/pollmodoro.png" alt="Pollmodoro Logo" class="mr-2 h-8 w-8" />
						<span class="text-foreground text-xl font-bold">Pollmodoro</span>
					</div>
				</a>
				<div class="flex flex-row items-center space-x-4">
					<ThemeSwitcher />
					<Button href="/create">
						<Plus />
						Create Poll
					</Button>
				</div>
			</div>
		</div>
	</nav>

	<!-- Main Content -->
	<main class="py-8">
		{@render children()}
	</main>

	<!-- Footer -->
	<footer class="bg-card border-t py-8">
		<div class="text-muted-foreground mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
			<p class="mb-2">
				Create, share, and analyze polls effortlessly. Get instant feedback from your audience.
			</p>
			<p>
				Open source project •
				<a
					href="https://github.com/lucaazalim/pollmodoro"
					target="_blank"
					rel="noopener noreferrer"
					class="text-primary hover:text-primary/80 underline"
				>
					View on GitHub
				</a>
			</p>
		</div>
	</footer>
</div>

<ModeWatcher />
<Toaster richColors />
