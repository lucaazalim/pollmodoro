<script lang="ts">
	import { dev } from '$app/environment';
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
		console.log('Mounting layout...');
		window.onTurnstileLoad = () => {
			console.log('Turnstile script loaded!');
			turnstileScript.loaded = true;
		};
	});
</script>

<svelte:head>
	<script
		src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload={onTurnstileLoadCallbackName}"
		async
		defer
	></script>

	{#if !dev}
		<script
			defer
			src="https://cloud.umami.is/script.js"
			data-website-id="de08e990-bcfa-4051-a4c0-47bba8d521c8"
		></script>
	{/if}
</svelte:head>

<svelte:window />

<!-- Skip to main content link for screen readers -->
<a
	href="#main-content"
	class="focus:bg-primary focus:text-primary-foreground focus:ring-ring sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:px-4 focus:py-2 focus:ring-2 focus:outline-none"
>
	Skip to main content
</a>

<div class="justify-betweeen bg-background flex h-screen flex-col">
	<Header />
	<main id="main-content" class="grow p-5" tabindex="-1">
		{@render children()}
	</main>
	<Footer />
</div>

<ModeWatcher />
<Toaster richColors />
