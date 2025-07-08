<script>
	import CreatePollButton from './CreatePollButton.svelte';
	import ThemeSwitcher from './ThemeSwitcher.svelte';
	import YourPollsButton from './YourPollsButton.svelte';
</script>

<nav class="bg-card border-b shadow-sm">
	<div class="mx-auto max-w-5xl px-4">
		<div class="flex items-center justify-between py-4">
			<a href="/">
				<div class="flex items-center gap-2">
					<img src="/pollmodoro.png" alt="Pollmodoro Logo" class="size-8" />
					<span class="text-foreground font-serif text-xl font-bold max-sm:hidden">Pollmodoro</span>
				</div>
			</a>
			<div class="flex flex-row items-center space-x-4">
				<ThemeSwitcher />
				<YourPollsButton />
				<CreatePollButton />
			</div>
		</div>
	</div>
</nav>
