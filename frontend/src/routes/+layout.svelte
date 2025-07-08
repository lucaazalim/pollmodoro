<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import { Toaster } from '$lib/components/ui/sonner';
	import { onTurnstileLoadCallbackName, setTurnstileContext } from '$lib/turnstile';
	import { ModeWatcher } from 'mode-watcher';
	import { onMount } from 'svelte';
	import '../app.css';

	let { children } = $props();

	let turnstileScript = $state({
		loaded: false
	});

	setTurnstileContext(turnstileScript);

	onMount(() => {
		window.onTurnstileLoad = () => {
			console.log('Turnstile script loaded!');
			turnstileScript.loaded = true;
		};
	});
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
	<script
		src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload={onTurnstileLoadCallbackName}"
		async
		defer
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
