<script lang="ts" module>
	import { type VariantProps, tv } from 'tailwind-variants';
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	export const buttonVariants = tv({
		base: "rounded-lg border border-transparent bg-clip-padding text-sm font-medium focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg:not([class*='size-'])]:size-4 group/button inline-flex shrink-0 items-center justify-center whitespace-nowrap transition-all outline-none select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground hover:bg-primary/80',
				outline:
					'border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50',
				secondary:
					'bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground',
				ghost:
					'hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50',
				destructive:
					'bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40',
				link: 'text-primary underline-offset-4 hover:underline'
			},
			size: {
				default:
					'h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
				xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
				sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
				lg: 'h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
				icon: 'size-8',
				'icon-xs':
					"size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
				'icon-sm':
					'size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg',
				'icon-lg': 'size-9'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	});

	export type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];
	export type ButtonSize = VariantProps<typeof buttonVariants>['size'];

	export type ButtonProps = WithElementRef<HTMLButtonAttributes> &
		WithElementRef<HTMLAnchorAttributes> & {
			variant?: ButtonVariant;
			size?: ButtonSize;
			/**
			 * Renders the button as a 3D "pushable" button, after
			 * https://www.joshwcomeau.com/animation/3d-button/, keeping the variant's colors.
			 */
			pushable?: boolean;
		};
</script>

<script lang="ts">
	let {
		class: className,
		variant = 'default',
		size = 'default',
		pushable = false,
		ref = $bindable(null),
		href = undefined,
		type = 'button',
		disabled,
		children,
		...restProps
	}: ButtonProps = $props();
</script>

{#snippet face()}
	{#if pushable}
		<span class="pushable-shadow" aria-hidden="true"></span>
		<span class="pushable-edge" aria-hidden="true"></span>
		<span class="pushable-front">{@render children?.()}</span>
	{:else}
		{@render children?.()}
	{/if}
{/snippet}

{#if href}
	<a
		bind:this={ref}
		data-slot="button"
		class={cn(buttonVariants({ variant, size }), pushable && 'pushable', className)}
		data-variant={variant}
		data-size={size}
		href={disabled ? undefined : href}
		aria-disabled={disabled}
		role={disabled ? 'link' : undefined}
		tabindex={disabled ? -1 : undefined}
		{...restProps}
	>
		{@render face()}
	</a>
{:else}
	<button
		bind:this={ref}
		data-slot="button"
		class={cn(buttonVariants({ variant, size }), pushable && 'pushable', className)}
		data-variant={variant}
		data-size={size}
		{type}
		{disabled}
		{...restProps}
	>
		{@render face()}
	</button>
{/if}

<style>
	/*
	 * 3D pushable button. The wrapper keeps the layout box; three layers give it
	 * depth: a blurred shadow, a darker edge, and the face that lifts on hover
	 * and sinks on press. Unlayered, so it wins over the Tailwind utilities.
	 */
	.pushable {
		position: relative;
		--pushable-face-bg: var(--primary);
		--pushable-face-fg: var(--primary-foreground);
		--pushable-face-border: transparent;
		--pushable-edge: color-mix(in oklch, var(--primary), black 24%);
		--pushable-edge-dark: color-mix(in oklch, var(--primary), black 48%);
		padding: 0;
		border: 0;
		background: transparent;
		box-shadow: none;
		transform: none;
		transition: filter 250ms;
		-webkit-tap-highlight-color: transparent;
	}

	/* Neutral variants keep their own look: a bordered face on the page background. */
	.pushable:not([data-variant='default']) {
		--pushable-face-bg: var(--background);
		--pushable-face-fg: var(--foreground);
		--pushable-face-border: var(--border);
		--pushable-edge: color-mix(in oklch, var(--foreground), transparent 82%);
		--pushable-edge-dark: color-mix(in oklch, var(--foreground), transparent 74%);
	}

	:global(.dark) .pushable:not([data-variant='default']) {
		--pushable-face-bg: var(--card);
		--pushable-edge: color-mix(in oklch, var(--foreground), transparent 88%);
		--pushable-edge-dark: color-mix(in oklch, var(--foreground), transparent 82%);
	}

	.pushable:hover {
		filter: brightness(1.08);
	}

	.pushable:focus-visible {
		outline: 2px solid var(--primary);
		outline-offset: 4px;
		box-shadow: none;
	}

	.pushable-shadow,
	.pushable-edge {
		position: absolute;
		inset: 0;
		border-radius: inherit;
	}

	.pushable-shadow {
		background: hsl(0 0% 0% / 0.3);
		filter: blur(2px);
		will-change: transform;
		transform: translateY(2px);
		transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
	}

	.pushable-edge {
		background: linear-gradient(
			to left,
			var(--pushable-edge-dark) 0%,
			var(--pushable-edge) 8%,
			var(--pushable-edge) 92%,
			var(--pushable-edge-dark) 100%
		);
	}

	.pushable-front {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		width: 100%;
		height: 100%;
		padding-inline: var(--pushable-px, 0.75rem);
		border: 1px solid var(--pushable-face-border);
		border-radius: inherit;
		background: var(--pushable-face-bg);
		color: var(--pushable-face-fg);
		white-space: nowrap;
		will-change: transform;
		transform: translateY(-4px);
		transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
	}

	.pushable[data-size^='icon'] .pushable-front {
		padding-inline: 0;
	}

	.pushable:hover .pushable-front {
		transform: translateY(-6px);
		transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
	}

	.pushable:hover .pushable-shadow {
		transform: translateY(4px);
		transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
	}

	.pushable:active .pushable-front {
		transform: translateY(-2px);
		transition: transform 34ms;
	}

	.pushable:active .pushable-shadow {
		transform: translateY(1px);
		transition: transform 34ms;
	}

	@media (prefers-reduced-motion: reduce) {
		.pushable,
		.pushable-shadow,
		.pushable-front {
			transition: none;
		}
	}
</style>
