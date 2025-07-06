<script>
	import { Plus } from '@lucide/svelte';
	import ThemeSwitcher from './ThemeSwitcher.svelte';
	import Button from './ui/button/button.svelte';
</script>

<nav class="bg-card border-b shadow-sm">
	<div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between py-4">
			<a href="/">
				<div class="flex items-center">
					<img src="/pollmodoro.png" alt="Pollmodoro Logo" class="mr-2 h-8 w-8" />
					<span class="text-foreground font-serif text-xl font-bold">Pollmodoro</span>
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
