<script lang="ts">
	import { page } from '$app/state';
	import Copy from '@lucide/svelte/icons/copy';
	import Mail from '@lucide/svelte/icons/mail';
	import Share2 from '@lucide/svelte/icons/share-2';
	import { toast } from 'svelte-sonner';
	import Card from './Card.svelte';
	import FacebookIcon from './icons/FacebookIcon.svelte';
	import RedditIcon from './icons/RedditIcon.svelte';
	import WhatsAppIcon from './icons/WhatsAppIcon.svelte';
	import XIcon from './icons/XIcon.svelte';
	import { Button } from './ui/button';
	import { Input } from './ui/input';

	type Props = {
		pollTitle: string;
	};

	let { pollTitle }: Props = $props();

	const pollUrl = $derived(page.url.href);
	const encodedUrl = $derived(encodeURIComponent(pollUrl));
	const encodedTitle = $derived(encodeURIComponent(pollTitle));

	const shareTargets = $derived([
		{
			label: 'Share by email',
			href: `mailto:?subject=${encodedTitle}&body=${encodeURIComponent(`Vote on this poll: ${pollUrl}`)}`,
			icon: Mail
		},
		{
			label: 'Share on X',
			href: `https://x.com/intent/post?text=${encodedTitle}&url=${encodedUrl}`,
			icon: XIcon
		},
		{
			label: 'Share on WhatsApp',
			href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
			icon: WhatsAppIcon
		},
		{
			label: 'Share on Facebook',
			href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
			icon: FacebookIcon
		},
		{
			label: 'Share on Reddit',
			href: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
			icon: RedditIcon
		}
	]);

	async function copyLink() {
		try {
			await navigator.clipboard.writeText(pollUrl);
			toast.success('Link copied to clipboard.');
		} catch (error) {
			console.error('Failed to copy link:', error);
			toast.error('The link could not be copied.');
		}
	}
</script>

<Card class="space-y-4">
	<div class="space-y-1">
		<h2 class="flex items-center gap-2 text-lg font-semibold">
			<Share2 class="text-muted-foreground size-5" aria-hidden="true" />
			Share this poll
		</h2>
		<p class="text-muted-foreground text-sm">Anyone with the link can vote.</p>
	</div>

	<div class="flex gap-2">
		<Input value={pollUrl} readonly aria-label="Poll link" class="font-mono text-sm" />
		<Button variant="outline" onclick={copyLink} class="shrink-0">
			<Copy aria-hidden="true" />
			Copy
		</Button>
	</div>

	<div class="flex flex-wrap gap-2">
		{#each shareTargets as target (target.label)}
			<Button
				variant="outline"
				size="icon"
				href={target.href}
				target={target.href.startsWith('mailto:') ? undefined : '_blank'}
				rel="noopener noreferrer"
				aria-label={target.label}
			>
				<target.icon aria-hidden="true" />
			</Button>
		{/each}
	</div>
</Card>
