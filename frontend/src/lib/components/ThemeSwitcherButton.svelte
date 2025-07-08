<script lang="ts">
	import MoonIcon from '@lucide/svelte/icons/moon';
	import SunIcon from '@lucide/svelte/icons/sun';

	import { Button } from '$lib/components/ui/button/index.js';
	import { toggleMode } from 'mode-watcher';
</script>

<Button onclick={toggleMode} variant="outline" size="icon">
	<SunIcon class="size-4 rotate-0 scale-100 !transition-all dark:-rotate-90 dark:scale-0" />
	<MoonIcon
		class="absolute size-4 rotate-90 scale-0 !transition-all dark:rotate-0 dark:scale-100"
	/>
	<span class="sr-only">Toggle theme</span>
</Button>
