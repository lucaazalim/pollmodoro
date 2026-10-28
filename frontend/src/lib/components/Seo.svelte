<script lang="ts">
	import { page } from '$app/state';
	import { canonicalUrl, jsonLdScript, localeAlternates, SITE_NAME, SOCIAL_IMAGE } from '$lib/seo';

	type Props = {
		/** The page's own title. The site name is added after it in the browser tab. */
		title: string;
		/** Set when `title` already names the site, so it isn't added twice. */
		titleHasSiteName?: boolean;
		description?: string;
		/** A shorter description for social previews. Defaults to `description`. */
		socialDescription?: string;
		/** Whether search engines should list the page. */
		index?: boolean;
		/** Whether the page is the same in every language, so each translation is linked. */
		translated?: boolean;
		/** Structured data about the page, in schema.org vocabulary. */
		jsonLd?: Record<string, unknown>;
	};

	let {
		title,
		titleHasSiteName = false,
		description,
		socialDescription = description,
		index = true,
		translated = false,
		jsonLd
	}: Props = $props();

	const url = $derived(canonicalUrl(page.url));
</script>

<svelte:head>
	<title>{titleHasSiteName ? title : `${title} · ${SITE_NAME}`}</title>
	{#if description}
		<meta name="description" content={description} />
	{/if}

	{#if index}
		<link rel="canonical" href={url} />
		{#if translated}
			{#each localeAlternates(page.url.pathname) as alternate (alternate.hreflang)}
				<link rel="alternate" hreflang={alternate.hreflang} href={alternate.href} />
			{/each}
		{/if}
	{:else}
		<meta name="robots" content="noindex" />
	{/if}

	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:url" content={url} />
	<meta property="og:title" content={title} />
	{#if socialDescription}
		<meta property="og:description" content={socialDescription} />
	{/if}
	<meta property="og:image" content={SOCIAL_IMAGE.url} />
	<meta property="og:image:width" content={String(SOCIAL_IMAGE.width)} />
	<meta property="og:image:height" content={String(SOCIAL_IMAGE.height)} />
	<meta name="twitter:card" content="summary_large_image" />

	{#if jsonLd}
		{@html jsonLdScript(jsonLd)}
	{/if}
</svelte:head>
