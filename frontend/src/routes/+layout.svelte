<script lang="ts">
	import { dev } from '$app/environment';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import { Toaster } from '$lib/components/ui/sonner';
	import { createI18n, setI18n } from '$lib/i18n';
	import serifFont from '@fontsource-variable/merriweather/files/merriweather-latin-wght-normal.woff2?url';
	import { ModeWatcher } from 'mode-watcher';
	import { untrack } from 'svelte';
	import '../app.css';

	let { children, data } = $props();

	// The language only changes with a full page reload, so the first value is the only one.
	const i18n = untrack(() => createI18n(data.locale, data.messages));
	setI18n(i18n);
</script>

<svelte:head>
	<!-- The home page's heading is set in this font, so it's fetched early instead of after the
	     stylesheet, to avoid the heading swapping fonts once it's already on screen. -->
	<link rel="preload" href={serifFont} as="font" type="font/woff2" crossorigin="anonymous" />
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
	class="focus:bg-primary focus:text-primary-foreground sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:rounded-md focus:px-4 focus:py-2"
>
	{i18n.m.layout.skipToContent}
</a>

<div class="flex min-h-svh flex-col">
	<Header />
	<main id="main-content" class="flex-1 px-5" tabindex="-1">
		{@render children()}
	</main>
	<Footer />
</div>

<Toaster richColors position="bottom-center" dir={i18n.dir} />
