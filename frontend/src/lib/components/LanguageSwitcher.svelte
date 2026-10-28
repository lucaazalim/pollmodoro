<script lang="ts">
	import {
		getI18n,
		isLocale,
		LOCALES,
		switchLocale,
		type Locale,
		type LocaleInfo
	} from '$lib/i18n';
	import Check from '@lucide/svelte/icons/check';
	import Languages from '@lucide/svelte/icons/languages';
	import { DropdownMenu } from 'bits-ui';
	import { Button } from './ui/button';

	const { locale, m } = getI18n();

	const languages = (Object.entries(LOCALES) as [Locale, LocaleInfo][]).toSorted(([, a], [, b]) =>
		a.name.localeCompare(b.name)
	);
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			<Button
				{...props}
				variant="outline"
				size="icon"
				class="cursor-pointer"
				aria-label={m.header.language}
				pushable
			>
				<Languages aria-hidden="true" />
			</Button>
		{/snippet}
	</DropdownMenu.Trigger>

	<DropdownMenu.Portal>
		<DropdownMenu.Content
			align="end"
			sideOffset={8}
			class="bg-popover text-popover-foreground z-50 max-h-[min(24rem,var(--bits-dropdown-menu-content-available-height))] w-56 overflow-y-auto rounded-lg border p-1 shadow-md"
		>
			<DropdownMenu.RadioGroup
				value={locale}
				onValueChange={(value) => {
					if (isLocale(value) && value !== locale) switchLocale(value);
				}}
			>
				<DropdownMenu.GroupHeading class="text-muted-foreground px-2 py-1.5 text-xs font-medium">
					{m.header.language}
				</DropdownMenu.GroupHeading>
				{#each languages as [code, { name }] (code)}
					<DropdownMenu.RadioItem
						value={code}
						lang={code}
						class="data-highlighted:bg-muted flex cursor-pointer items-center justify-between gap-2 rounded-md px-2 py-1.5 text-sm outline-none select-none"
					>
						{#snippet children({ checked })}
							{name}
							{#if checked}
								<Check class="text-primary size-4" aria-hidden="true" />
							{/if}
						{/snippet}
					</DropdownMenu.RadioItem>
				{/each}
			</DropdownMenu.RadioGroup>
		</DropdownMenu.Content>
	</DropdownMenu.Portal>
</DropdownMenu.Root>
