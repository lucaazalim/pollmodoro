<script lang="ts">
	import { Progress } from './ui/progress';

	type Props = {
		text: string;
		votes: number;
		percentage: number;
	};

	let { text, votes, percentage }: Props = $props();
</script>

<div class="space-y-1.5">
	<div class="flex items-center justify-between gap-3 text-sm">
		<span class="truncate font-medium">{text}</span>
		<span class="text-muted-foreground shrink-0 tabular-nums">
			<span class="text-foreground font-semibold">{votes}</span>
			· {percentage}%
		</span>
	</div>
	<Progress value={percentage} class="h-1.5" aria-label="{percentage}% of votes for {text}" />
</div>
