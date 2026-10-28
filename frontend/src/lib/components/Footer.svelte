<script lang="ts">
	import { getI18n } from '$lib/i18n';

	const { m } = getI18n();

	// The author link sits wherever the translation puts `{author}`.
	const [beforeAuthor, afterAuthor = ''] = m.footer.builtBy.split('{author}');
</script>

<footer class="border-t">
	<div
		class="text-muted-foreground mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-5 py-8 text-sm sm:flex-row"
	>
		<p>
			{beforeAuthor}<a
				href="https://azal.im"
				target="_blank"
				rel="noopener noreferrer"
				class="text-foreground font-medium underline-offset-4 hover:underline"
			>
				Luca Azalim<span class="sr-only"> {m.common.opensInNewTab}</span>
			</a>{afterAuthor}
		</p>
		<a
			href="https://github.com/lucaazalim/pollmodoro"
			target="_blank"
			rel="noopener noreferrer"
			class="text-foreground font-medium underline-offset-4 hover:underline"
		>
			{m.footer.source}<span class="sr-only"> {m.common.opensInNewTab}</span>
		</a>
	</div>
</footer>
