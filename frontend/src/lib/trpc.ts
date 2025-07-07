import { PUBLIC_TRPC_URL } from '$env/static/public';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../../backend/src/router';

const tRPCUrl = PUBLIC_TRPC_URL || 'http://localhost:8787/trpc';

// Create the tRPC client
export const trpc = createTRPCProxyClient<AppRouter>({
	links: [
		httpBatchLink({
			url: tRPCUrl,
			headers: {
				'Content-Type': 'application/json'
			}
		})
	]
});

// Export types for use in components
export type { AppRouter } from '../../../backend/src/router';
