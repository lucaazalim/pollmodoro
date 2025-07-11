<script lang="ts">
	import { page } from '$app/state';
	import { Clipboard, Mail, Share2 } from '@lucide/svelte';
	import { toast } from 'svelte-sonner';
	import FacebookIcon from './icons/FacebookIcon.svelte';
	import RedditIcon from './icons/RedditIcon.svelte';
	import WhatsAppIcon from './icons/WhatsAppIcon.svelte';
	import XIcon from './icons/XIcon.svelte';
	import Button from './ui/button/button.svelte';
	import Input from './ui/input/input.svelte';
	import Card from './Card.svelte';

	type Props = {
		pollTitle: string;
	};

	let { pollTitle }: Props = $props();
	const pollUrl = page.url.href;

	const encodedPollUrl = encodeURIComponent(pollUrl);

	async function copyToClipboard() {
		try {
			await navigator.clipboard.writeText(window.location.href);
			toast.info('Link copied to clipboard!');
		} catch (err) {
			console.error('Failed to copy: ', err);
			toast.error('Failed to copy link');
		}
	}
</script>

<Card class="space-y-4">
	<h2 class="mb-5 flex flex-row items-center gap-2 text-xl font-bold">
		<Share2 class="text-muted" />
		Share this poll
	</h2>
	<div class="flex flex-row gap-2">
		<Input value={pollUrl} readonly aria-label="Poll URL" />
		<Button
			variant="outline"
			size="lg"
			onclick={copyToClipboard}
			aria-label="Copy poll URL to clipboard"
		>
			<Clipboard />
		</Button>
	</div>
	<hr />
	<div class="grid grid-cols-4 gap-2 sm:flex">
		<Button
			variant="outline"
			size="lg"
			href="mailto:?subject=Check out this poll&body=I found this interesting poll: {pollUrl}"
			aria-label="Share poll via email"
		>
			<Mail />
		</Button>
		<Button
			variant="outline"
			size="lg"
			href="https://x.com/share?text=Check out this poll!&url={encodedPollUrl}"
			target="_blank"
			rel="noopener noreferrer"
			aria-label="Share poll on X (formerly Twitter)"
		>
			<XIcon />
		</Button>
		<Button
			variant="outline"
			size="lg"
			href="https://api.whatsapp.com/send?text={pollTitle}%20-%20{encodedPollUrl}"
			target="_blank"
			rel="noopener noreferrer"
			aria-label="Share poll on WhatsApp"
		>
			<WhatsAppIcon />
		</Button>
		<Button
			variant="outline"
			size="lg"
			href="https://www.facebook.com/sharer/sharer.php?u={encodedPollUrl}"
			target="_blank"
			rel="noopener noreferrer"
			aria-label="Share poll on Facebook"
		>
			<FacebookIcon />
		</Button>
		<Button
			variant="outline"
			size="lg"
			href="https://www.reddit.com/submit?url={encodedPollUrl}&title={pollTitle}%20-%20Pollmodoro"
			target="_blank"
			rel="noopener noreferrer"
			aria-label="Share poll on Reddit"
		>
			<RedditIcon />
		</Button>
	</div>
</Card>
