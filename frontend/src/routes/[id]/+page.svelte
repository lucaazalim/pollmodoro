<script lang="ts">
  import { page } from '$app/stores';
  import { Button } from '$lib/components/ui/button';
  import { Label } from '$lib/components/ui/label';
  import { pollStore, voteStore } from '$lib/stores';
  
  let selectedOptions: number[] = [];
  let selectedOption: number | null = null;
  
  // Get poll ID from URL parameters
  $: pollId = $page.params.id;
  
  // Load poll when component mounts or poll ID changes
  $: if (pollId) {
    loadPoll();
  }
  
  async function loadPoll() {
    if (!pollId) return;
    selectedOptions = [];
    selectedOption = null;
    
    try {
      await pollStore.fetchPoll({ id: pollId });
    } catch (error) {
      console.error('Error loading poll:', error);
    }
  }
   async function handleVote() {
    if (!pollId) return;
    
    // Get the option IDs to vote for
    let optionIds: number[] = [];
    if ($pollStore.data?.allowMultipleOptions) {
      optionIds = selectedOptions;
    } else if (selectedOption !== null) {
      optionIds = [selectedOption];
    }

    if (optionIds.length === 0) return;

    try {
      await voteStore.vote({
        pollId,
        optionIds
      });
      
      // Refresh poll data to show updated results
      await loadPoll();
    } catch (error) {
      console.error('Error voting:', error);
    }
  }
  
  function getPercentage(votes: number, total: number): number {
    if (total === 0) return 0;
    return Math.round((votes / total) * 100);
  }
</script>

<svelte:head>
  <title>
    {$pollStore.data?.title || 'Poll'} - Poll App
  </title>
</svelte:head>

<div class="max-w-3xl mx-auto p-6">
  {#if $pollStore.loading}
    <div class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      <span class="ml-2 text-muted-foreground">Loading poll...</span>
    </div>
  {:else if $pollStore.error}
    <div class="bg-destructive/10 border border-destructive/20 rounded-lg p-6 text-center">
      <h2 class="text-xl font-semibold text-destructive mb-2">Error Loading Poll</h2>
      <p class="text-destructive/80">{$pollStore.error}</p>
      <Button
        onclick={loadPoll}
        variant="destructive"
        class="mt-4"
      >
        Try Again
      </Button>
    </div>
  {:else if $pollStore.data}
    {@const poll = $pollStore.data}
    
    <div class="bg-card rounded-lg shadow-sm border">
      <!-- Poll Header -->
      <div class="p-6 border-b">
        <h1 class="text-2xl font-bold mb-2">{poll.title}</h1>
        {#if poll.description}
          <p class="text-muted-foreground mb-4">{poll.description}</p>
        {/if}
        
        <div class="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div class="flex items-center">
            <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Total votes: {poll.totalVotes}
          </div>
          
          <div class="flex items-center">
            <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            {poll.allowMultipleOptions ? 'Multiple selections allowed' : 'Single selection only'}
          </div>
          
          <div class="flex items-center">
            <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
            </svg>
            Created: {new Date(poll.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
      
      <!-- Poll Options -->
      <div class="p-6">
        <div class="space-y-4">
          {#each poll.options as option}
            {@const percentage = getPercentage(option.votesCount, poll.totalVotes)}
            
            <div class="relative">
              <!-- Vote Option -->
              <Label class="block w-full p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors {(poll.allowMultipleOptions ? selectedOptions.includes(option.id) : selectedOption === option.id) ? 'border-primary bg-primary/5' : 'border-border'}">
                <div class="flex items-center justify-between">
                  <div class="flex items-center flex-1">
                    <div class="flex-shrink-0 mr-3">
                      {#if poll.allowMultipleOptions}
                        <input
                          type="checkbox"
                          value={option.id}
                          bind:group={selectedOptions}
                          class="w-4 h-4 accent-primary"
                        />
                      {:else}
                        <input
                          type="radio"
                          name="poll-option"
                          value={option.id}
                          bind:group={selectedOption}
                          class="w-4 h-4 accent-primary"
                        />
                      {/if}
                    </div>
                    
                    <span class="font-medium">{option.optionText}</span>
                  </div>
                  
                  <div class="text-right ml-4">
                    <div class="text-lg font-bold">{option.votesCount}</div>
                    <div class="text-sm text-muted-foreground">{percentage}%</div>
                  </div>
                </div>
              </Label>
              
              <!-- Progress Bar -->
              <div class="absolute bottom-0 left-0 h-1 bg-primary/20 rounded-b-lg transition-all duration-300" 
                   style="width: {percentage}%"></div>
            </div>
          {/each}
        </div>
        
        <!-- Submit Vote Button -->
        <div class="mt-6">
          <Button
            onclick={handleVote}
            disabled={(poll.allowMultipleOptions ? selectedOptions.length === 0 : selectedOption === null) || $voteStore.loading}
            class="w-full"
            size="lg"
          >
            {#if $voteStore.loading}
              <div class="flex items-center justify-center">
                <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                Submitting Vote...
              </div>
            {:else}
              Submit Vote{poll.allowMultipleOptions && selectedOptions.length > 1 ? 's' : ''}
              {#if poll.allowMultipleOptions && selectedOptions.length > 0}
                ({selectedOptions.length} selected)
              {/if}
            {/if}
          </Button>
        </div>
        
        <!-- Error/Success Messages -->
        {#if $voteStore.error}
          <div class="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p class="text-destructive text-sm">{$voteStore.error}</p>
          </div>
        {/if}
        
        {#if $voteStore.data}
          <div class="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
            <p class="text-green-700 dark:text-green-400 text-sm">{$voteStore.data.message}</p>
          </div>
        {/if}
      </div>
    </div>
    
    <!-- Share Poll -->
    <div class="mt-6 text-center">
      <p class="text-sm text-muted-foreground mb-2">Share this poll:</p>
      <div class="flex justify-center">
        <code class="px-3 py-2 bg-muted text-foreground rounded text-sm">
          {window.location.href}
        </code>
      </div>
    </div>
  {:else}
    <div class="text-center py-12">
      <h2 class="text-xl font-semibold text-muted-foreground">Poll not found</h2>
      <p class="text-muted-foreground mt-2">The poll you're looking for doesn't exist or has been removed.</p>
      <Button 
        href="/create" 
        class="mt-4"
      >
        Create a New Poll
      </Button>
    </div>
  {/if}
</div>
