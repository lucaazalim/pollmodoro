<script lang="ts">
  // Simple landing page
</script>

<svelte:head>
  <title>Poll App - Create and Share Polls</title>
</svelte:head>

<div class="max-w-4xl mx-auto p-6 text-center">
  <!-- Hero Section -->
  <div class="py-12">
    <h1 class="text-4xl font-bold text-gray-900 mb-4">
      Create and Share Polls Instantly
    </h1>
    <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
      Build type-safe polls with real-time results. Perfect for getting quick feedback, 
      making group decisions, or gathering opinions from your audience.
    </p>
    
    <a 
      href="/create" 
      class="inline-block px-8 py-4 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors shadow-lg"
    >
      Create Your First Poll
    </a>
  </div>
  
  <!-- Features Section -->
  <div class="grid md:grid-cols-3 gap-8 py-12 border-t">
    <div class="text-center">
      <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
        <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
        </svg>
      </div>
      <h3 class="text-lg font-semibold text-gray-900 mb-2">Lightning Fast</h3>
      <p class="text-gray-600">Create polls in seconds and get instant results as votes come in.</p>
    </div>
    
    <div class="text-center">
      <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
        <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      </div>
      <h3 class="text-lg font-semibold text-gray-900 mb-2">Type Safe</h3>
      <p class="text-gray-600">Built with tRPC for end-to-end type safety and better developer experience.</p>
    </div>
    
    <div class="text-center">
      <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
        <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
        </svg>
      </div>
      <h3 class="text-lg font-semibold text-gray-900 mb-2">Easy Sharing</h3>
      <p class="text-gray-600">Share your polls with a simple link and watch responses roll in.</p>
    </div>
  </div>
  
  <!-- How it Works -->
  <div class="py-12 border-t">
    <h2 class="text-2xl font-bold text-gray-900 mb-8">How It Works</h2>
    <div class="grid md:grid-cols-3 gap-8">
      <div class="flex flex-col items-center">
        <div class="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mb-4">1</div>
        <h3 class="font-semibold text-gray-900 mb-2">Create</h3>
        <p class="text-gray-600 text-center">Add your question, options, and choose single or multiple choice.</p>
      </div>
      <div class="flex flex-col items-center">
        <div class="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mb-4">2</div>
        <h3 class="font-semibold text-gray-900 mb-2">Share</h3>
        <p class="text-gray-600 text-center">Get a unique link to share with your audience anywhere.</p>
      </div>
      <div class="flex flex-col items-center">
        <div class="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mb-4">3</div>
        <h3 class="font-semibold text-gray-900 mb-2">Analyze</h3>
        <p class="text-gray-600 text-center">Watch real-time results and percentages as votes come in.</p>
      </div>
    </div>
  </div>
</div>
