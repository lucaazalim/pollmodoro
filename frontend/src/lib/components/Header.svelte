<script lang="ts">
	import CreatePollButton from './CreatePollButton.svelte';
	import ThemeSwitcherButton from './ThemeSwitcherButton.svelte';
	import YourPollsButton from './YourPollsButton.svelte';
</script>

<header
	class="bg-background/80 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 border-b backdrop-blur"
>
	<nav
		class="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-5"
		aria-label="Main navigation"
	>
		<a href="/" class="group flex items-center gap-2" aria-label="Pollmodoro home">
			<img
				src="/pollmodoro.png"
				alt=""
				width="32"
				height="32"
				class="size-8 shrink-0 transition-transform duration-300 ease-out group-hover:-rotate-12"
			/>
			<span class="font-serif text-xl font-bold">Pollmodoro</span>
		</a>

		<div class="flex items-center gap-2">
			<YourPollsButton />
			<ThemeSwitcherButton />
			<CreatePollButton />
		</div>
	</nav>
</header>
