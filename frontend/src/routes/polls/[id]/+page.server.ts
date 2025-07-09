import { trpc, type AppRouter } from '$lib/trpc';
import { error } from '@sveltejs/kit';
import { TRPCClientError } from '@trpc/client';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const pollId = params.id;

	try {
		return { poll: await trpc.getPoll.query({ id: pollId }) };
	} catch (e) {
		if (e instanceof TRPCClientError) {
			const err = e as TRPCClientError<AppRouter>;

			if (err.shape?.data.code === 'NOT_FOUND') {
				return { poll: null };
			}

			error(err.shape?.data.httpStatus || 500, {
				message: e.message
			});
		} else {
			error(500, {
				message: 'An unexpected error occurred while fetching the poll.'
			});
		}
	}
};
