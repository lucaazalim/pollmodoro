import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageLoad } from './$types.js';
import { createPollSchema } from './schema.js';

export const load: PageLoad = async () => {
	return {
		form: await superValidate(zod(createPollSchema), {
			defaults: {
				title: '',
				description: '',
				options: ['', ''],
				pollType: 'multiple_choice' as const,
				allowMultipleOptions: false
			}
		})
	};
};
