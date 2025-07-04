<script lang="ts">
  import "../app.css";

  let { children } = $props();
</script>

<div class="min-h-screen bg-gray-50">
  <!-- Navigation Header -->
  <nav class="border-b bg-white shadow-sm">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between">
        <div class="flex items-center">
          <a href="/" class="text-xl font-bold text-gray-900"> Poll App </a>
        </div>
        <div class="flex items-center space-x-4">
          <a
            href="/create"
            class="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
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
  <footer class="mt-12 border-t bg-white py-8">
    <div
      class="mx-auto max-w-7xl px-4 text-center text-gray-600 sm:px-6 lg:px-8"
    >
      <p>Built with SvelteKit and tRPC for type-safe full-stack development</p>
    </div>
  </footer>
</div>
