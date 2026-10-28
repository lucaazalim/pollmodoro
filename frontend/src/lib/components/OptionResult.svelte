<script lang="ts">
	import { getI18n } from '$lib/i18n';
	import { Progress } from './ui/progress';

	const { m, formatNumber, formatPercent } = getI18n();

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
			<span class="text-foreground font-semibold">{formatNumber(votes)}</span>
			· {formatPercent(percentage)}
		</span>
	</div>
	<Progress
		value={percentage}
		class="h-1.5"
		aria-label={m.vote.optionVotes(formatPercent(percentage), text)}
	/>
</div>
