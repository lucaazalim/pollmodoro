import { env } from '$env/dynamic/public';
import type { AppRouter } from '$backend/router';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { inferRouterOutputs } from '@trpc/server';

const trpcUrl = env.PUBLIC_TRPC_URL || 'http://localhost:8787/trpc';

export const trpc = createTRPCClient<AppRouter>({
	links: [httpBatchLink({ url: trpcUrl })]
});

export type { AppRouter };
export type PollWithResults = inferRouterOutputs<AppRouter>['getPoll'];
