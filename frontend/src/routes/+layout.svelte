<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import { Toaster } from '$lib/components/ui/sonner';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
	<link rel="manifest" href="/site.webmanifest" />
	<script
		defer
		src="https://cloud.umami.is/script.js"
		data-website-id="de08e990-bcfa-4051-a4c0-47bba8d521c8"
	></script>
</svelte:head>

<div class="justify-betweeen bg-background flex min-h-screen flex-col">
	<Header />
	<main class="grow py-8">
		{@render children()}
	</main>
	<Footer />
</div>

<ModeWatcher />
<Toaster richColors />
