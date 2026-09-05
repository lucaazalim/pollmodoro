<script lang="ts">
	import { dev } from '$app/environment';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import { Toaster } from '$lib/components/ui/sonner';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	{#if !dev}
		<script
			defer
			src="https://cloud.umami.is/script.js"
			data-website-id="de08e990-bcfa-4051-a4c0-47bba8d521c8"
		></script>
	{/if}
</svelte:head>

<ModeWatcher themeColors={{ light: '#ffffff', dark: '#09090b' }} />

<a
	href="#main-content"
	class="focus:bg-primary focus:text-primary-foreground sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:px-4 focus:py-2"
>
	Skip to main content
</a>

<div class="flex min-h-svh flex-col">
	<Header />
	<main id="main-content" class="flex-1 px-5" tabindex="-1">
		{@render children()}
	</main>
	<Footer />
</div>

<Toaster richColors position="bottom-center" />
