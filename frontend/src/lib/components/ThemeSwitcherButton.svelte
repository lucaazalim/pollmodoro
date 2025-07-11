<script lang="ts">
	import MoonIcon from '@lucide/svelte/icons/moon';
	import SunIcon from '@lucide/svelte/icons/sun';

	import { Button } from '$lib/components/ui/button/index.js';
	import { toggleMode } from 'mode-watcher';
</script>

<Button
	onclick={toggleMode}
	variant="outline"
	size="icon"
	aria-label="Toggle dark mode"
	aria-describedby="theme-description"
>
	<SunIcon
		class="size-4 scale-100 rotate-0 !transition-all dark:scale-0 dark:-rotate-90"
		aria-hidden="true"
	/>
	<MoonIcon
		class="absolute size-4 scale-0 rotate-90 !transition-all dark:scale-100 dark:rotate-0"
		aria-hidden="true"
	/>
	<span class="sr-only">Toggle theme</span>
</Button>
<div id="theme-description" class="sr-only">
	Switch between light and dark mode for better viewing experience
</div>
