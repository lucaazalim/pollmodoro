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

<div class="justify-betweeen bg-background flex h-screen flex-col">
	<Header />
	<main class="grow py-8">
		{@render children()}
	</main>
	<Footer />
</div>

<ModeWatcher />
<Toaster richColors />
