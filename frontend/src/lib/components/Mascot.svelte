<script lang="ts">
	import type { TomatoMascot } from '$lib/mascot/tomato';
	import { onMount } from 'svelte';
	import type { ClassValue } from 'svelte/elements';
	import { prefersReducedMotion } from 'svelte/motion';

	/** `class` sets the size of the tomato's slot, such as `size-10`. */
	let { class: className }: { class?: ClassValue } = $props();

	let canvas: HTMLCanvasElement;
	let mascot = $state<TomatoMascot>();
	let ready = $state(false);

	export function setHovered(hovered: boolean) {
		mascot?.setHovered(hovered);
	}

	export function cheer() {
		mascot?.cheer();
	}

	$effect(() => {
		mascot?.setReducedMotion(prefersReducedMotion.current);
	});

	onMount(() => {
		let destroyed = false;
		let instance: TomatoMascot | undefined;

		// three.js is only loaded in the browser, after the page is up. Until then, or without
		// WebGL, a picture of the tomato stays in its place.
		import('$lib/mascot/tomato')
			.then(({ createTomatoMascot }) => {
				if (destroyed) return;
				instance = createTomatoMascot(canvas, {
					reducedMotion: prefersReducedMotion.current,
					onReady: () => (ready = true),
					onLost: () => (ready = false)
				});
				mascot = instance;
			})
			.catch(() => {});

		return () => {
			destroyed = true;
			instance?.dispose();
		};
	});
</script>

<!-- The picture and the canvas are twice the size of the slot, so the tomato can hop and spin
     without being cut off. The picture is framed exactly like the canvas. -->
<span class={['relative block shrink-0', className]}>
	<img
		src="/mascot.png"
		alt=""
		width="240"
		height="240"
		class={[
			'pointer-events-none absolute top-1/2 left-1/2 size-[200%] max-w-none -translate-1/2 transition-opacity duration-300',
			ready && 'opacity-0'
		]}
	/>
	<canvas
		bind:this={canvas}
		aria-hidden="true"
		class={[
			'pointer-events-none absolute top-1/2 left-1/2 size-[200%] -translate-1/2 transition-opacity duration-300',
			!ready && 'opacity-0'
		]}
	></canvas>
</span>
