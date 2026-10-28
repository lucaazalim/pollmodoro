<script lang="ts">
	import CreatePollButton from '$lib/components/CreatePollButton.svelte';
	import PollPreview from '$lib/components/PollPreview.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { Button } from '$lib/components/ui/button';
	import { getI18n } from '$lib/i18n';
	import { SITE_NAME, SITE_URL, SOCIAL_IMAGE } from '$lib/seo';
	import Code from '@lucide/svelte/icons/code';
	import ListChecks from '@lucide/svelte/icons/list-checks';
	import ShieldCheck from '@lucide/svelte/icons/shield-check';
	import UserRoundX from '@lucide/svelte/icons/user-round-x';
	import VenetianMask from '@lucide/svelte/icons/venetian-mask';
	import Wallet from '@lucide/svelte/icons/wallet';
	import { fade } from 'svelte/transition';

	const { locale, m } = getI18n();

	const steps = [m.home.steps.write, m.home.steps.share, m.home.steps.watch];

	const details = [
		{ icon: UserRoundX, ...m.home.details.noAccounts },
		{ icon: VenetianMask, ...m.home.details.anonymous },
		{ icon: ListChecks, ...m.home.details.choice },
		{ icon: ShieldCheck, ...m.home.details.bots },
		{ icon: Wallet, ...m.home.details.free },
		{ icon: Code, ...m.home.details.openSource }
	];
</script>

<Seo
	title={m.home.metaTitle}
	titleHasSiteName
	description={m.home.metaDescription}
	socialDescription={m.home.ogDescription}
	translated
	jsonLd={{
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'WebSite',
				'@id': `${SITE_URL}/#website`,
				url: `${SITE_URL}/`,
				name: SITE_NAME,
				description: m.home.metaDescription,
				inLanguage: locale
			},
			{
				'@type': 'WebApplication',
				'@id': `${SITE_URL}/#app`,
				url: `${SITE_URL}/`,
				name: SITE_NAME,
				description: m.home.heroText,
				image: SOCIAL_IMAGE.url,
				applicationCategory: 'UtilitiesApplication',
				operatingSystem: 'Any',
				browserRequirements: 'Requires JavaScript',
				isAccessibleForFree: true,
				inLanguage: locale,
				featureList: details.map((detail) => detail.title),
				creator: { '@type': 'Person', name: 'Luca Azalim', url: 'https://azal.im' },
				isPartOf: { '@id': `${SITE_URL}/#website` }
			}
		]
	}}
/>

<div class="mx-auto max-w-5xl px-5" in:fade={{ duration: 400 }}>
	<!-- Hero -->
	<section
		class="grid grid-cols-1 items-center gap-12 py-16 lg:grid-cols-2 lg:py-24"
		aria-labelledby="hero-heading"
	>
		<div class="text-center lg:text-start">
			<h1
				id="hero-heading"
				class="font-serif text-4xl leading-tight font-bold tracking-tight text-balance sm:text-5xl"
			>
				{m.home.heroTitle}
			</h1>
			<p class="text-muted-foreground mx-auto mt-6 max-w-xl text-lg text-pretty lg:mx-0">
				{m.home.heroText}
			</p>
			<div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
				<CreatePollButton
					label={m.common.createAPoll}
					size="lg"
					class="h-11 text-base [--pushable-px:1.25rem]"
				/>
				<Button
					href="/polls/hMRwidAt-KmMdCIjITyfd"
					variant="outline"
					size="lg"
					class="h-11 text-base [--pushable-px:1.25rem]"
					pushable
				>
					{m.home.seeExample}
				</Button>
			</div>
		</div>

		<PollPreview />
	</section>

	<!-- How it works -->
	<section class="border-t py-16" aria-labelledby="how-heading">
		<h2 id="how-heading" class="text-2xl font-bold tracking-tight">{m.home.howItWorks}</h2>
		<ol class="mt-8 grid gap-8 md:grid-cols-3">
			{#each steps as step, index (step.title)}
				<li class="flex gap-4 md:flex-col">
					<span
						class="bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-bold tabular-nums"
						aria-hidden="true"
					>
						{index + 1}
					</span>
					<div>
						<h3 class="font-semibold">{step.title}</h3>
						<p class="text-muted-foreground mt-1 text-sm leading-relaxed">{step.text}</p>
					</div>
				</li>
			{/each}
		</ol>
	</section>

	<!-- Good to know -->
	<section class="border-t py-16" aria-labelledby="details-heading">
		<h2 id="details-heading" class="text-2xl font-bold tracking-tight">{m.home.goodToKnow}</h2>
		<ul class="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
			{#each details as detail (detail.title)}
				<li class="flex gap-4">
					<span
						class="bg-muted text-foreground flex size-9 shrink-0 items-center justify-center rounded-lg"
						aria-hidden="true"
					>
						<detail.icon class="size-4" />
					</span>
					<div>
						<h3 class="font-semibold">{detail.title}</h3>
						<p class="text-muted-foreground mt-1 text-sm leading-relaxed">{detail.text}</p>
					</div>
				</li>
			{/each}
		</ul>
	</section>

	<!-- Closing -->
	<section class="border-t py-16 text-center" aria-labelledby="closing-heading">
		<h2 id="closing-heading" class="font-serif text-2xl font-bold tracking-tight">
			{m.home.closingTitle}
		</h2>
		<p class="text-muted-foreground mt-2">{m.home.closingText}</p>
		<div class="mt-6">
			<CreatePollButton
				label={m.common.createAPoll}
				size="lg"
				class="h-11 text-base [--pushable-px:1.25rem]"
			/>
		</div>
	</section>
</div>
