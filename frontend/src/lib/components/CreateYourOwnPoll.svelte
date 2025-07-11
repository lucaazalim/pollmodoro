<script>
	import { Plus } from '@lucide/svelte';
	import CreatePollButton from './CreatePollButton.svelte';
	import Card from './Card.svelte';
</script>

<Card
	class="flex flex-col justify-between gap-5 sm:flex-row sm:items-center"
>
	<div class="space-y-3">
		<h2 class="flex flex-row items-center gap-2 text-xl font-bold">
			<Plus class="text-muted" />
			Create your own poll
		</h2>
		<p class="max-w-sm text-sm">
			Create, share, and analyze polls effortlessly. Get instant feedback from your audience.
		</p>
	</div>
	<CreatePollButton />
</Card>
