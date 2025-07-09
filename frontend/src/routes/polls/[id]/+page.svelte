<script lang="ts">
	import VotePage from '$lib/components/pages/VotePage.svelte';
	import type { PageProps } from '../$types';

	let { data }: PageProps = $props();
</script>

<VotePage poll={data} />
