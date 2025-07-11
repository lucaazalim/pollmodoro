<script>
	import CreatePollButton from './CreatePollButton.svelte';
	import ThemeSwitcherButton from './ThemeSwitcherButton.svelte';
	import YourPollsButton from './YourPollsButton.svelte';
</script>

<header>
	<nav class="bg-card border-b shadow-sm" aria-label="Main navigation">
		<div class="mx-auto max-w-5xl px-5">
			<div class="flex items-center justify-between gap-5 py-4 max-sm:flex-col">
				<a href="/" aria-label="Pollmodoro - Go to homepage">
					<div class="group flex items-center gap-2">
						<img
							src="/pollmodoro.png"
							alt="Pollmodoro Logo"
							class="size-8 shrink-0 transition-all ease-in-out group-hover:-rotate-15"
						/>
						<span class="text-foreground font-serif text-xl font-bold">Pollmodoro</span>
					</div>
				</a>
				<div class="flex flex-row items-center space-x-3" role="toolbar" aria-label="Page actions">
					<ThemeSwitcherButton />
					<YourPollsButton />
					<CreatePollButton />
				</div>
			</div>
		</div>
	</nav>
</header>
