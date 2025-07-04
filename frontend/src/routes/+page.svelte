<script lang="ts">
	// Modern landing page focused on features and benefits
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
</script>

<svelte:head>
	<title>Poll App - Create and Share Polls</title>
</svelte:head>

<div class="mx-auto max-w-4xl p-6 text-center">
	<!-- Hero Section -->
	<div class="py-16">
		<h1 class="mb-6 text-5xl font-bold text-gray-900">Get Instant Feedback with Smart Polls</h1>
		<p class="mx-auto mb-10 max-w-3xl text-xl leading-relaxed text-gray-600">
			Create engaging polls in seconds, gather meaningful insights, and make better decisions.
			Perfect for teams, educators, content creators, and anyone who values authentic feedback.
		</p>

		<div class="flex flex-col gap-4 sm:flex-row sm:justify-center">
			<a
				href="/create"
				class="inline-block rounded-lg bg-blue-600 px-8 py-4 text-lg font-medium text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
			>
				Create Your First Poll
			</a>
			<a
				href="#features"
				class="inline-block rounded-lg border-2 border-gray-300 px-8 py-4 text-lg font-medium text-gray-700 transition-all hover:border-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
			>
				See Features
			</a>
		</div>
	</div>

	<!-- Key Features Section -->
	<div id="features" class="border-t py-16">
		<h2 class="mb-12 text-3xl font-bold text-gray-900">Why Choose Our Poll Platform?</h2>
		<div class="grid gap-10 md:grid-cols-3">
			<div class="text-center">
				<div
					class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100"
				>
					<Zap class="size-8 text-blue-600" />
				</div>
				<h3 class="mb-3 text-xl font-semibold text-gray-900">Lightning Fast Setup</h3>
				<p class="leading-relaxed text-gray-600">
					No sign-ups, no complications. Create professional polls in under 30 seconds and start
					collecting responses immediately.
				</p>
			</div>

			<div class="text-center">
				<div
					class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100"
				>
					<BarChart3 class="size-8 text-green-600" />
				</div>
				<h3 class="mb-3 text-xl font-semibold text-gray-900">Real-Time Analytics</h3>
				<p class="leading-relaxed text-gray-600">
					Watch votes pour in live with beautiful charts and instant percentage calculations. No
					waiting, no delays.
				</p>
			</div>

			<div class="text-center">
				<div
					class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-100"
				>
					<Share2 class="size-8 text-purple-600" />
				</div>
				<h3 class="mb-3 text-xl font-semibold text-gray-900">Universal Sharing</h3>
				<p class="leading-relaxed text-gray-600">
					Share anywhere with a simple link. Works perfectly on mobile, desktop, and all social
					platforms.
				</p>
			</div>
		</div>
	</div>

	<!-- Advanced Features -->
	<div class="border-t py-16">
		<h2 class="mb-12 text-3xl font-bold text-gray-900">Powerful Features for Every Use Case</h2>
		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
			<div class="text-center">
				<div
					class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100"
				>
					<CheckSquare class="h-6 w-6 text-orange-600" />
				</div>
				<h4 class="mb-2 font-semibold text-gray-900">Multiple Choice</h4>
				<p class="text-sm text-gray-600">Single or multiple selections per voter</p>
			</div>

			<div class="text-center">
				<div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-100">
					<Shield class="h-6 w-6 text-red-600" />
				</div>
				<h4 class="mb-2 font-semibold text-gray-900">Secure & Private</h4>
				<p class="text-sm text-gray-600">Anonymous voting with data protection</p>
			</div>

			<div class="text-center">
				<div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100">
					<Settings class="h-6 w-6 text-teal-600" />
				</div>
				<h4 class="mb-2 font-semibold text-gray-900">Customizable</h4>
				<p class="text-sm text-gray-600">Rich descriptions and flexible options</p>
			</div>

			<div class="text-center">
				<div
					class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100"
				>
					<TrendingUp class="h-6 w-6 text-indigo-600" />
				</div>
				<h4 class="mb-2 font-semibold text-gray-900">Visual Results</h4>
				<p class="text-sm text-gray-600">Beautiful charts and progress bars</p>
			</div>
		</div>
	</div>

	<!-- Use Cases & Benefits -->
	<div class="border-t py-16">
		<h2 class="mb-12 text-3xl font-bold text-gray-900">Perfect for Every Scenario</h2>
		<div class="grid gap-12 lg:grid-cols-2">
			<div class="text-left">
				<h3 class="mb-6 text-2xl font-semibold text-gray-900">For Teams & Organizations</h3>
				<ul class="space-y-4">
					<li class="flex items-start">
						<div
							class="mr-3 mt-1 flex size-8 items-center justify-center rounded-full bg-blue-100 p-2"
						>
							<Users class="size-4 text-blue-600" />
						</div>
						<div>
							<strong class="text-gray-900">Team Decisions:</strong>
							<span class="text-gray-600">
								Quickly gather input on project directions, meeting times, or workplace policies</span
							>
						</div>
					</li>
					<li class="flex items-start">
						<div
							class="mr-3 mt-1 flex size-8 items-center justify-center rounded-full bg-blue-100 p-2"
						>
							<Calendar class="size-4 text-blue-600" />
						</div>
						<div>
							<strong class="text-gray-900">Event Planning:</strong>
							<span class="text-gray-600">
								Choose venues, dates, catering options, or activities with input from all
								stakeholders</span
							>
						</div>
					</li>
					<li class="flex items-start">
						<div
							class="mr-3 mt-1 flex size-8 items-center justify-center rounded-full bg-blue-100 p-2"
						>
							<MessageCircle class="size-4 text-blue-600" />
						</div>
						<div>
							<strong class="text-gray-900">Feedback Collection:</strong>
							<span class="text-gray-600">
								Gather honest opinions on proposals, presentations, or company initiatives</span
							>
						</div>
					</li>
				</ul>
			</div>

			<div class="text-left">
				<h3 class="mb-6 text-2xl font-semibold text-gray-900">For Creators & Educators</h3>
				<ul class="space-y-4">
					<li class="flex items-start">
						<div
							class="mr-3 mt-1 flex size-8 items-center justify-center rounded-full bg-green-100 p-2"
						>
							<Heart class="size-4 text-green-600" />
						</div>
						<div>
							<strong class="text-gray-900">Audience Engagement:</strong>
							<span class="text-gray-600">
								Boost interaction on social media, live streams, or community platforms</span
							>
						</div>
					</li>
					<li class="flex items-start">
						<div
							class="mr-3 mt-1 flex size-8 items-center justify-center rounded-full bg-green-100 p-2"
						>
							<GraduationCap class="size-4 text-green-600" />
						</div>
						<div>
							<strong class="text-gray-900">Educational Quizzes:</strong>
							<span class="text-gray-600">
								Create interactive learning experiences and assess student understanding</span
							>
						</div>
					</li>
					<li class="flex items-start">
						<div
							class="mr-3 mt-1 flex size-8 items-center justify-center rounded-full bg-green-100 p-2"
						>
							<BookOpen class="size-4 text-green-600" />
						</div>
						<div>
							<strong class="text-gray-900">Content Ideas:</strong>
							<span class="text-gray-600">
								Let your audience vote on topics, formats, or directions for future content</span
							>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>

	<!-- How it Works -->
	<div class="border-t py-16">
		<h2 class="mb-12 text-3xl font-bold text-gray-900">How It Works</h2>
		<div class="grid gap-10 md:grid-cols-3">
			<div class="flex flex-col items-center text-center">
				<div
					class="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-2xl font-bold text-white shadow-lg"
				>
					1
				</div>
				<h3 class="mb-4 text-xl font-semibold text-gray-900">Create Your Poll</h3>
				<p class="leading-relaxed text-gray-600">
					Add your question, write compelling options, and choose between single or multiple choice.
					Add descriptions to provide context.
				</p>
			</div>
			<div class="flex flex-col items-center text-center">
				<div
					class="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600 text-2xl font-bold text-white shadow-lg"
				>
					2
				</div>
				<h3 class="mb-4 text-xl font-semibold text-gray-900">Share Everywhere</h3>
				<p class="leading-relaxed text-gray-600">
					Copy your unique poll link and share it on social media, messaging apps, email, or embed
					it in websites. Works everywhere.
				</p>
			</div>
			<div class="flex flex-col items-center text-center">
				<div
					class="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-600 text-2xl font-bold text-white shadow-lg"
				>
					3
				</div>
				<h3 class="mb-4 text-xl font-semibold text-gray-900">Watch Results Live</h3>
				<p class="leading-relaxed text-gray-600">
					See votes and percentages update in real-time. Make informed decisions with clear, visual
					data that updates as responses come in.
				</p>
			</div>
		</div>
	</div>

	<!-- Call to Action -->
	<div class="border-t py-16">
		<div class="mx-auto max-w-2xl text-center">
			<h2 class="mb-4 text-3xl font-bold text-gray-900">Ready to Get Started?</h2>
			<p class="mb-8 text-xl text-gray-600">
				Join other users who trust our platform for their polling needs. No registration required.
			</p>
			<a
				href="/create"
				class="inline-block rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-10 py-4 text-lg font-medium text-white shadow-lg transition-all hover:from-blue-700 hover:to-blue-800 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
			>
				Create Your Poll Now
			</a>
		</div>
	</div>
</div>
