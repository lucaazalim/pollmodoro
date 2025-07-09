import type { GetPollOutput } from '$lib/stores';
import { trpc, type AppRouter } from '$lib/trpc';
import { error } from '@sveltejs/kit';
import { TRPCClientError } from '@trpc/client';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }): Promise<GetPollOutput> => {
	const pollId = params.id;

	try {
		return await trpc.getPoll.query({ id: pollId });
	} catch (e) {
		if (e instanceof TRPCClientError) {
			const err = e as TRPCClientError<AppRouter>;

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
