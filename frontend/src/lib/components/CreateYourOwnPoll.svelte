<script lang="ts">
	import { getI18n } from '$lib/i18n';
	import Card from './Card.svelte';
	import CreatePollButton from './CreatePollButton.svelte';

	const { m } = getI18n();
</script>

<Card class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
	<div class="space-y-1">
		<h2 class="text-lg font-semibold">{m.createYourOwn.title}</h2>
		<p class="text-muted-foreground text-sm">{m.createYourOwn.text}</p>
	</div>
	<CreatePollButton label={m.common.createAPoll} class="shrink-0" />
</Card>
