<script lang="ts">
	import { getI18n } from '$lib/i18n';
	import UserPen from '@lucide/svelte/icons/user-pen';
	import { Button } from './ui/button';

	const { m } = getI18n();
</script>

<Button variant="outline" href="/polls" pushable>
	<UserPen aria-hidden="true" />
	<span class="max-sm:sr-only">{m.header.yourPolls}</span>
</Button>
