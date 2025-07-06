import { PUBLIC_TRPC_URL } from '$env/static/public';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../../backend/src/index';

// Create the tRPC client
export const trpc = createTRPCProxyClient<AppRouter>({
	links: [
		httpBatchLink({
			url: PUBLIC_TRPC_URL,
			headers: {
				'Content-Type': 'application/json'
			}
		})
	]
});

// Export types for use in components
export type { AppRouter } from '../../../backend/src/index';
