<script lang="ts">
	import { Clipboard, Mail } from '@lucide/svelte';
	import { toast } from 'svelte-sonner';
	import FacebookIcon from './icons/FacebookIcon.svelte';
	import RedditIcon from './icons/RedditIcon.svelte';
	import WhatsAppIcon from './icons/WhatsAppIcon.svelte';
	import XIcon from './icons/XIcon.svelte';
	import Button from './ui/button/button.svelte';
	import Input from './ui/input/input.svelte';

	type Props = {
		pollTitle: string;
		pollUrl?: string;
	};

	let { pollTitle, pollUrl = window.location.href }: Props = $props();

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

<div class="bg-card space-y-3 rounded-lg border p-6 shadow-sm">
	<h2 class="mb-2 text-xl font-bold">Share this poll</h2>
	<div class="flex flex-row gap-2">
		<Input value={window.location.href} readonly aria-label="Poll URL" />
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
	<div class="flex flex-row gap-2">
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
</div>
