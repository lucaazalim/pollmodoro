<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class="min-h-screen bg-gray-50">
	<!-- Navigation Header -->
	<nav class="bg-white shadow-sm border-b">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex justify-between h-16">
				<div class="flex items-center">
					<a href="/" class="text-xl font-bold text-gray-900">
						Poll App
					</a>
				</div>
				<div class="flex items-center space-x-4">
					<a
						href="/create"
						class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
					>
						Create Poll
					</a>
				</div>
			</div>
		</div>
	</nav>

	<!-- Main Content -->
	<main class="py-8">
		{@render children()}
	</main>
	
	<!-- Footer -->
	<footer class="bg-white border-t py-8 mt-12">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
			<p>Built with SvelteKit and tRPC for type-safe full-stack development</p>
		</div>
	</footer>
</div>
