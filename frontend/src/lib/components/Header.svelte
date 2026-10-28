<script lang="ts">
	import { getI18n } from '$lib/i18n';
	import CreatePollButton from './CreatePollButton.svelte';
	import LanguageSwitcher from './LanguageSwitcher.svelte';
	import Mascot from './Mascot.svelte';
	import ThemeSwitcherButton from './ThemeSwitcherButton.svelte';
	import YourPollsButton from './YourPollsButton.svelte';

	const { m } = getI18n();

	let mascot = $state<Mascot>();
</script>

<header
	class="bg-background/80 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 border-b backdrop-blur"
>
	<nav
		class="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-5"
		aria-label={m.header.mainNavigation}
	>
		<a
			href="/"
			class="flex items-center gap-2"
			aria-label={m.header.home}
			onpointerenter={() => mascot?.setHovered(true)}
			onpointerleave={() => mascot?.setHovered(false)}
			onfocus={(event) => mascot?.setHovered(event.currentTarget.matches(':focus-visible'))}
			onblur={() => mascot?.setHovered(false)}
			onclick={() => mascot?.cheer()}
		>
			<Mascot bind:this={mascot} class="size-10" />
			<span class="font-serif text-xl font-bold max-sm:hidden">Pollmodoro</span>
		</a>

		<div class="flex items-center gap-2">
			<YourPollsButton />
			<LanguageSwitcher />
			<ThemeSwitcherButton />
			<CreatePollButton compact />
		</div>
	</nav>
</header>
