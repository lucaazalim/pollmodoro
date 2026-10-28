<script lang="ts">
	import { page } from '$app/state';
	import { getI18n } from '$lib/i18n';
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

	const { m } = getI18n();

	const pollUrl = $derived(page.url.href);
	const encodedUrl = $derived(encodeURIComponent(pollUrl));
	const encodedTitle = $derived(encodeURIComponent(pollTitle));

	const shareTargets = $derived([
		{
			label: m.share.byEmail,
			href: `mailto:?subject=${encodedTitle}&body=${encodeURIComponent(m.share.emailBody(pollUrl))}`,
			icon: Mail
		},
		{
			label: m.share.on('X'),
			href: `https://x.com/intent/post?text=${encodedTitle}&url=${encodedUrl}`,
			icon: XIcon
		},
		{
			label: m.share.on('WhatsApp'),
			href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
			icon: WhatsAppIcon
		},
		{
			label: m.share.on('Facebook'),
			href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
			icon: FacebookIcon
		},
		{
			label: m.share.on('Reddit'),
			href: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
			icon: RedditIcon
		}
	]);

	async function copyLink() {
		try {
			await navigator.clipboard.writeText(pollUrl);
			toast.success(m.share.copied);
		} catch (error) {
			console.error('Failed to copy link:', error);
			toast.error(m.share.copyFailed);
		}
	}
</script>

<Card class="space-y-4">
	<div class="space-y-1">
		<h2 class="flex items-center gap-2 text-lg font-semibold">
			<Share2 class="text-muted-foreground size-5" aria-hidden="true" />
			{m.share.title}
		</h2>
		<p class="text-muted-foreground text-sm">{m.share.text}</p>
	</div>

	<div class="flex gap-2">
		<Input value={pollUrl} readonly aria-label={m.share.link} class="font-mono text-sm" />
		<Button variant="outline" onclick={copyLink} class="shrink-0">
			<Copy aria-hidden="true" />
			{m.share.copy}
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
