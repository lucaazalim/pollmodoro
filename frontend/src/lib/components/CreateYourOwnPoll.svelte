<script>
	import { Plus } from '@lucide/svelte';
	import Button from './ui/button/button.svelte';
	import CreatePollButton from './CreatePollButton.svelte';
</script>

<div
	class="bg-card flex flex-row items-center justify-between gap-5 rounded-lg border p-6 shadow-sm"
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
	<CreatePollButton/>
</div>
