<script lang="ts">
	import { getI18n } from '$lib/i18n';
	import Moon from '@lucide/svelte/icons/moon';
	import Sun from '@lucide/svelte/icons/sun';
	import { toggleMode } from 'mode-watcher';
	import { Button } from './ui/button';

	const { m } = getI18n();
</script>

<Button
	onclick={toggleMode}
	variant="outline"
	size="icon"
	class="cursor-pointer"
	aria-label={m.header.toggleTheme}
	pushable
>
	<Sun
		class="size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
		aria-hidden="true"
	/>
	<Moon
		class="absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
		aria-hidden="true"
	/>
</Button>
