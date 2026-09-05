<script lang="ts">
	import UserPen from '@lucide/svelte/icons/user-pen';
	import { Button } from './ui/button';
</script>

<Button variant="outline" href="/polls" pushable>
	<UserPen aria-hidden="true" />
	<span class="max-sm:sr-only">Your polls</span>
</Button>
