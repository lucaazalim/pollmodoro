<script lang="ts">
  // Simple landing page
</script>

<svelte:head>
  <title>Poll App - Create and Share Polls</title>
</svelte:head>

<div class="mx-auto max-w-4xl p-6 text-center">
  <!-- Hero Section -->
  <div class="py-12">
    <h1 class="mb-4 text-4xl font-bold text-gray-900">
      Create and Share Polls Instantly
    </h1>
    <p class="mx-auto mb-8 max-w-2xl text-xl text-gray-600">
      Build type-safe polls with real-time results. Perfect for getting quick
      feedback, making group decisions, or gathering opinions from your
      audience.
    </p>

    <a
      href="/create"
      class="inline-block rounded-lg bg-blue-600 px-8 py-4 text-lg font-medium text-white shadow-lg transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
    >
      Create Your First Poll
    </a>
  </div>

  <!-- Features Section -->
  <div class="grid gap-8 border-t py-12 md:grid-cols-3">
    <div class="text-center">
      <div
        class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100"
      >
        <svg
          class="h-6 w-6 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      </div>
      <h3 class="mb-2 text-lg font-semibold text-gray-900">Lightning Fast</h3>
      <p class="text-gray-600">
        Create polls in seconds and get instant results as votes come in.
      </p>
    </div>

    <div class="text-center">
      <div
        class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100"
      >
        <svg
          class="h-6 w-6 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h3 class="mb-2 text-lg font-semibold text-gray-900">Type Safe</h3>
      <p class="text-gray-600">
        Built with tRPC for end-to-end type safety and better developer
        experience.
      </p>
    </div>

    <div class="text-center">
      <div
        class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100"
      >
        <svg
          class="h-6 w-6 text-purple-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
          />
        </svg>
      </div>
      <h3 class="mb-2 text-lg font-semibold text-gray-900">Easy Sharing</h3>
      <p class="text-gray-600">
        Share your polls with a simple link and watch responses roll in.
      </p>
    </div>
  </div>

  <!-- How it Works -->
  <div class="border-t py-12">
    <h2 class="mb-8 text-2xl font-bold text-gray-900">How It Works</h2>
    <div class="grid gap-8 md:grid-cols-3">
      <div class="flex flex-col items-center">
        <div
          class="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 font-bold text-white"
        >
          1
        </div>
        <h3 class="mb-2 font-semibold text-gray-900">Create</h3>
        <p class="text-center text-gray-600">
          Add your question, options, and choose single or multiple choice.
        </p>
      </div>
      <div class="flex flex-col items-center">
        <div
          class="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 font-bold text-white"
        >
          2
        </div>
        <h3 class="mb-2 font-semibold text-gray-900">Share</h3>
        <p class="text-center text-gray-600">
          Get a unique link to share with your audience anywhere.
        </p>
      </div>
      <div class="flex flex-col items-center">
        <div
          class="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 font-bold text-white"
        >
          3
        </div>
        <h3 class="mb-2 font-semibold text-gray-900">Analyze</h3>
        <p class="text-center text-gray-600">
          Watch real-time results and percentages as votes come in.
        </p>
      </div>
    </div>
  </div>
</div>
