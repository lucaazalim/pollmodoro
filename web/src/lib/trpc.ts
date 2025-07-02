import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../../worker/src/index';

// Create the tRPC client
export const trpc = createTRPCProxyClient<AppRouter>({
	links: [
		httpBatchLink({
			url: 'http://localhost:8787/trpc', // Update this to your actual worker URL
			// For production, this would be something like:
			// url: 'https://your-worker-name.your-subdomain.workers.dev/trpc',
			headers: {
				'Content-Type': 'application/json'
			}
		})
	]
});

// Export types for use in components
export type { AppRouter } from '../../../worker/src/index';
