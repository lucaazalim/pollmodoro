<script lang="ts">
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
	import { Toaster } from '$lib/components/ui/sonner';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';

	let { children } = $props();
</script>

<div class="bg-background min-h-screen">
	<!-- Navigation Header -->
	<nav class="bg-card border-b shadow-sm">
		<div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
			<div class="flex h-16 justify-between">
				<div class="flex items-center">
					<a href="/" class="text-foreground text-xl font-bold"> Poll App </a>
				</div>
				<div class="flex flex-row items-center space-x-4">
					<ThemeSwitcher />
					<a
						href="/create"
						class="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 transition-colors"
					>
						Create Poll
					</a>
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
