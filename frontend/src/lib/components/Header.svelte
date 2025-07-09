<script>
	import CreatePollButton from './CreatePollButton.svelte';
	import ThemeSwitcherButton from './ThemeSwitcherButton.svelte';
	import YourPollsButton from './YourPollsButton.svelte';
</script>

<nav class="bg-card border-b shadow-sm">
	<div class="mx-auto max-w-5xl px-5">
		<div class="flex items-center justify-between gap-5 py-4 max-sm:flex-col">
			<a href="/">
				<div class="group flex items-center gap-2">
					<img
						src="/pollmodoro.png"
						alt="Pollmodoro Logo"
						class="group-hover:-rotate-15 size-8 shrink-0 transition-all ease-in-out"
					/>
					<span class="text-foreground font-serif text-xl font-bold">Pollmodoro</span>
				</div>
			</a>
			<div class="flex flex-row items-center space-x-3">
				<ThemeSwitcherButton />
				<YourPollsButton />
				<CreatePollButton />
			</div>
		</div>
	</div>
</nav>
