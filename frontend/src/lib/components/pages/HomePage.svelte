<script lang="ts">
	// Modern landing page focused on features and benefits
	import CreatePollButton from '$lib/components/CreatePollButton.svelte';
	import { Button } from '$lib/components/ui/button';
	import {
		BarChart3,
		BookOpen,
		Calendar,
		CheckSquare,
		GraduationCap,
		Heart,
		MessageCircle,
		Settings,
		Share2,
		Shield,
		TrendingUp,
		Users,
		Zap
	} from '@lucide/svelte';
	import { sineInOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';
</script>

<svelte:head>
	<title>Pollmodoro - Create and Share Polls</title>
	<meta
		name="description"
		content="Create engaging polls in seconds, gather meaningful insights, and make better decisions. Perfect for teams, educators, content creators, and anyone who values authentic feedback."
	/>
</svelte:head>

<div class="mx-auto max-w-5xl px-6 text-center" in:fade={{ duration: 500, easing: sineInOut }}>
	<!-- Hero Section -->
	<section aria-labelledby="hero-heading">
		<div class="py-16">
			<h1 id="hero-heading" class="text-foreground mb-6 text-5xl font-bold">
				Get Instant Feedback with Pollmodoro
			</h1>
			<p class="text-muted-foreground mx-auto mb-10 max-w-3xl text-xl leading-relaxed">
				Create engaging polls in seconds, gather meaningful insights, and make better decisions.
				Perfect for teams, educators, content creators, and anyone who values authentic feedback.
			</p>

			<div class="flex flex-col gap-4 sm:flex-row sm:justify-center">
				<CreatePollButton class="text-lg font-medium" size="lg" />
				<Button
					href="/polls/hMRwidAt-KmMdCIjITyfd"
					variant="outline"
					class="text-lg font-medium"
					size="lg"
					aria-label="View a demo poll to see how Pollmodoro works"
				>
					Check a demo poll
				</Button>
			</div>
		</div>
	</section>

	<!-- Key Features Section -->
	<section id="features" class="border-t py-16" aria-labelledby="features-heading">
		<h2 id="features-heading" class="text-foreground mb-12 text-3xl font-bold">
			Why Choose Pollmodoro?
		</h2>
		<div class="grid gap-10 md:grid-cols-3" role="list">
			<article class="text-center" role="listitem">
				<div
					class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-900/20"
					aria-hidden="true"
				>
					<Zap class="size-8 text-blue-600 dark:text-blue-400" />
				</div>
				<h3 class="text-foreground mb-3 text-xl font-semibold">Lightning Fast Setup</h3>
				<p class="text-muted-foreground leading-relaxed">
					No sign-ups, no complications. Create professional polls in under 30 seconds and start
					collecting responses immediately.
				</p>
			</article>

			<article class="text-center" role="listitem">
				<div
					class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 dark:bg-green-900/20"
					aria-hidden="true"
				>
					<BarChart3 class="size-8 text-green-600 dark:text-green-400" />
				</div>
				<h3 class="text-foreground mb-3 text-xl font-semibold">Real-Time Analytics</h3>
				<p class="text-muted-foreground leading-relaxed">
					Watch votes pour in live with beautiful charts and instant percentage calculations. No
					waiting, no delays.
				</p>
			</article>

			<article class="text-center" role="listitem">
				<div
					class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-100 dark:bg-purple-900/20"
					aria-hidden="true"
				>
					<Share2 class="size-8 text-purple-600 dark:text-purple-400" />
				</div>
				<h3 class="text-foreground mb-3 text-xl font-semibold">Universal Sharing</h3>
				<p class="text-muted-foreground leading-relaxed">
					Share anywhere with a simple link. Works perfectly on mobile, desktop, and all social
					platforms with built-in spam protection.
				</p>
			</article>
		</div>
	</section>

	<!-- Advanced Features -->
	<section class="border-t py-16" aria-labelledby="advanced-features-heading">
		<h2 id="advanced-features-heading" class="text-foreground mb-12 text-3xl font-bold">
			Powerful Features for Every Use Case
		</h2>
		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4" role="list">
			<article class="text-center" role="listitem">
				<div
					class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 dark:bg-orange-900/20"
					aria-hidden="true"
				>
					<CheckSquare class="h-6 w-6 text-orange-600 dark:text-orange-400" />
				</div>
				<h4 class="text-foreground mb-2 font-semibold">Multiple Choice</h4>
				<p class="text-muted-foreground text-sm">Single or multiple selections per voter</p>
			</article>

			<article class="text-center" role="listitem">
				<div
					class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 dark:bg-red-900/20"
					aria-hidden="true"
				>
					<Shield class="h-6 w-6 text-red-600 dark:text-red-400" />
				</div>
				<h4 class="text-foreground mb-2 font-semibold">Secure & Private</h4>
				<p class="text-muted-foreground text-sm">
					Anonymous voting with bot protection and data security
				</p>
			</article>

			<article class="text-center" role="listitem">
				<div
					class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 dark:bg-teal-900/20"
					aria-hidden="true"
				>
					<Settings class="h-6 w-6 text-teal-600 dark:text-teal-400" />
				</div>
				<h4 class="text-foreground mb-2 font-semibold">Customizable</h4>
				<p class="text-muted-foreground text-sm">Rich descriptions and flexible options</p>
			</article>

			<article class="text-center" role="listitem">
				<div
					class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-900/20"
					aria-hidden="true"
				>
					<TrendingUp class="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
				</div>
				<h4 class="text-foreground mb-2 font-semibold">Visual Results</h4>
				<p class="text-muted-foreground text-sm">Beautiful charts and progress bars</p>
			</article>
		</div>
	</section>

	<!-- Use Cases & Benefits -->
	<section class="border-t py-16" aria-labelledby="use-cases-heading">
		<h2 id="use-cases-heading" class="text-foreground mb-12 text-3xl font-bold">
			Perfect for Every Scenario
		</h2>
		<div class="grid gap-12 lg:grid-cols-2">
			<article class="text-left">
				<h3 class="text-foreground mb-6 text-center text-2xl font-semibold">
					For Teams & Organizations
				</h3>
				<ul class="space-y-4 text-left" role="list">
					<li class="flex items-start" role="listitem">
						<div
							class="mt-1 mr-3 flex size-8 items-center justify-center rounded-full bg-blue-100 p-2 dark:bg-blue-900/20"
							aria-hidden="true"
						>
							<Users class="size-4 text-blue-600 dark:text-blue-400" />
						</div>
						<div>
							<strong class="text-foreground">Team Decisions:</strong>
							<span class="text-muted-foreground">
								Quickly gather input on project directions, meeting times, or workplace policies</span
							>
						</div>
					</li>
					<li class="flex items-start" role="listitem">
						<div
							class="mt-1 mr-3 flex size-8 items-center justify-center rounded-full bg-blue-100 p-2 dark:bg-blue-900/20"
							aria-hidden="true"
						>
							<Calendar class="size-4 text-blue-600 dark:text-blue-400" />
						</div>
						<div>
							<strong class="text-foreground">Event Planning:</strong>
							<span class="text-muted-foreground">
								Choose venues, dates, catering options, or activities with input from all
								stakeholders</span
							>
						</div>
					</li>
					<li class="flex items-start" role="listitem">
						<div
							class="mt-1 mr-3 flex size-8 items-center justify-center rounded-full bg-blue-100 p-2 dark:bg-blue-900/20"
							aria-hidden="true"
						>
							<MessageCircle class="size-4 text-blue-600 dark:text-blue-400" />
						</div>
						<div>
							<strong class="text-foreground">Feedback Collection:</strong>
							<span class="text-muted-foreground">
								Gather honest opinions on proposals, presentations, or company initiatives</span
							>
						</div>
					</li>
				</ul>
			</article>

			<article class="text-left">
				<h3 class="text-foreground mb-6 text-center text-2xl font-semibold">
					For Creators & Educators
				</h3>
				<ul class="space-y-4 text-left" role="list">
					<li class="flex items-start" role="listitem">
						<div
							class="mt-1 mr-3 flex size-8 items-center justify-center rounded-full bg-green-100 p-2 dark:bg-green-900/20"
							aria-hidden="true"
						>
							<Heart class="size-4 text-green-600 dark:text-green-400" />
						</div>
						<div>
							<strong class="text-foreground">Audience Engagement:</strong>
							<span class="text-muted-foreground">
								Boost interaction on social media, live streams, or community platforms</span
							>
						</div>
					</li>
					<li class="flex items-start" role="listitem">
						<div
							class="mt-1 mr-3 flex size-8 items-center justify-center rounded-full bg-green-100 p-2 dark:bg-green-900/20"
							aria-hidden="true"
						>
							<GraduationCap class="size-4 text-green-600 dark:text-green-400" />
						</div>
						<div>
							<strong class="text-foreground">Educational Quizzes:</strong>
							<span class="text-muted-foreground">
								Create interactive learning experiences and assess student understanding</span
							>
						</div>
					</li>
					<li class="flex items-start" role="listitem">
						<div
							class="mt-1 mr-3 flex size-8 items-center justify-center rounded-full bg-green-100 p-2 dark:bg-green-900/20"
							aria-hidden="true"
						>
							<BookOpen class="size-4 text-green-600 dark:text-green-400" />
						</div>
						<div>
							<strong class="text-foreground">Content Ideas:</strong>
							<span class="text-muted-foreground">
								Let your audience vote on topics, formats, or directions for future content</span
							>
						</div>
					</li>
				</ul>
			</article>
		</div>
	</section>

	<!-- How it Works -->
	<section class="border-t py-16" aria-labelledby="how-it-works-heading">
		<h2 id="how-it-works-heading" class="text-foreground mb-12 text-3xl font-bold">How It Works</h2>
		<div class="grid gap-10 md:grid-cols-3" role="list">
			<article class="flex flex-col items-center text-center" role="listitem">
				<div
					class="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-2xl font-bold text-white shadow-lg dark:from-blue-400 dark:to-blue-500"
					aria-hidden="true"
				>
					1
				</div>
				<h3 class="text-foreground mb-4 text-xl font-semibold">Create Your Poll</h3>
				<p class="text-muted-foreground leading-relaxed">
					Add your question, write compelling options, and choose between single or multiple choice.
					Add descriptions to provide context.
				</p>
			</article>
			<article class="flex flex-col items-center text-center" role="listitem">
				<div
					class="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600 text-2xl font-bold text-white shadow-lg dark:from-green-400 dark:to-green-500"
					aria-hidden="true"
				>
					2
				</div>
				<h3 class="text-foreground mb-4 text-xl font-semibold">Share Everywhere</h3>
				<p class="text-muted-foreground leading-relaxed">
					Copy your unique poll link and share it on social media, messaging apps, email, or embed
					it in websites. Works everywhere.
				</p>
			</article>
			<article class="flex flex-col items-center text-center" role="listitem">
				<div
					class="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-600 text-2xl font-bold text-white shadow-lg dark:from-purple-400 dark:to-purple-500"
					aria-hidden="true"
				>
					3
				</div>
				<h3 class="text-foreground mb-4 text-xl font-semibold">Watch Results Live</h3>
				<p class="text-muted-foreground leading-relaxed">
					See votes and percentages update in real-time. Make informed decisions with clear, visual
					data that updates as responses come in.
				</p>
			</article>
		</div>
	</section>

	<!-- Call to Action -->
	<section class="border-t py-16" aria-labelledby="cta-heading">
		<div class="mx-auto max-w-2xl text-center">
			<h2 id="cta-heading" class="text-foreground mb-4 text-3xl font-bold">
				Ready to Get Started?
			</h2>
			<p class="text-muted-foreground mb-8 text-xl">
				Join other users who trust our platform for their polling needs. No registration required.
			</p>
			<CreatePollButton class="text-lg font-medium" size="lg" />
		</div>
	</section>
</div>
