import { trpc } from '$lib/trpc';
import { error } from '@sveltejs/kit';
import { TRPCClientError } from '@trpc/client';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	try {
		return { poll: await trpc.getPoll.query({ id: params.id }) };
	} catch (e) {
		if (e instanceof TRPCClientError) {
			if (e.data?.code === 'NOT_FOUND') {
				return { poll: null };
			}

			error(e.data?.httpStatus ?? 500, { message: e.message });
		}

		error(500, { message: 'An unexpected error occurred while loading the poll.' });
	}
};
