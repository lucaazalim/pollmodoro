import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { writable } from 'svelte/store';
import { trpc, type AppRouter } from './trpc';

type Inputs = inferRouterInputs<AppRouter>;
type Outputs = inferRouterOutputs<AppRouter>;

// Type helpers for tRPC responses
type CreatePollInput = Inputs['createPoll'];
type CreateVoteInput = Inputs['createVote'];
type GetPollInput = Inputs['getPoll'];

export type GetPollOutput = Outputs['getPoll'];

// Store for managing poll creation
export const createPollStore = (() => {
	const { subscribe, set, update } = writable<{
		loading: boolean;
		error: string | null;
		data: Awaited<ReturnType<typeof trpc.createPoll.mutate>> | null;
	}>({
		loading: false,
		error: null,
		data: null
	});

	const createPoll = async (input: CreatePollInput) => {
		update((state) => ({ ...state, loading: true, error: null }));

		try {
			const result = await trpc.createPoll.mutate(input);
			update((state) => ({ ...state, loading: false, data: result }));
			return result;
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Failed to create poll';
			update((state) => ({ ...state, loading: false, error: errorMessage }));
			throw error;
		}
	};

	const reset = () => set({ loading: false, error: null, data: null });

	return {
		subscribe,
		createPoll,
		reset
	};
})();

// Store for managing voting
export const voteStore = (() => {
	const { subscribe, set, update } = writable<{
		loading: boolean;
		error: string | null;
		data: Awaited<ReturnType<typeof trpc.createVote.mutate>> | null;
	}>({
		loading: false,
		error: null,
		data: null
	});

	const vote = async (input: CreateVoteInput) => {
		update((state) => ({ ...state, loading: true, error: null }));

		try {
			const result = await trpc.createVote.mutate(input);
			update((state) => ({ ...state, loading: false, data: result }));
			return result;
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Failed to vote';
			update((state) => ({ ...state, loading: false, error: errorMessage }));
			throw error;
		}
	};

	const reset = () => set({ loading: false, error: null, data: null });

	return {
		subscribe,
		vote,
		reset
	};
})();

// Store for managing poll fetching
export const pollStore = (() => {
	const { subscribe, set, update } = writable<{
		loading: boolean;
		error: string | null;
		data: Awaited<ReturnType<typeof trpc.getPoll.query>> | null;
	}>({
		loading: false,
		error: null,
		data: null
	});

	const fetchPoll = async (input: GetPollInput) => {
		update((state) => ({ ...state, loading: true, error: null }));

		try {
			const result = await trpc.getPoll.query(input);
			update((state) => ({ ...state, loading: false, data: result }));
			return result;
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Failed to fetch poll';
			update((state) => ({ ...state, loading: false, error: errorMessage }));
			throw error;
		}
	};

	const reset = () => set({ loading: false, error: null, data: null });

	const updatePollData = (pollData: Awaited<ReturnType<typeof trpc.getPoll.query>>) => {
		update((state) => ({ ...state, data: pollData }));
	};

	return {
		subscribe,
		fetchPoll,
		updatePollData,
		reset
	};
})();
