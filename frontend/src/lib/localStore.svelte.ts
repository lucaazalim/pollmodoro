import { browser } from '$app/environment';
import { z, type ZodSchema } from 'zod';

export class LocalStore<T> {
	private value = $state<T>() as T;
	private key: string;
	private schema: ZodSchema<T>;

	constructor(key: string, value: T, schema?: ZodSchema<T>) {
		this.key = key;
		this.value = value;
		this.schema = schema ?? z.any();

		if (browser) {
			const item = localStorage.getItem(key);

			if (item) {
				try {
					const parsed = z
						.string()
						.transform((str) => JSON.parse(str))
						.pipe(this.schema)
						.parse(item);

					this.value = parsed;
				} catch (error) {
					console.error(error);
					localStorage.removeItem(key);
				}
			}
		}

		$effect(() => {
			localStorage.setItem(this.key, JSON.stringify(this.value));
		});
	}

	get() {
		return this.value;
	}

	set(value: T) {
		const parsed = this.schema.safeParse(value);

		if (!parsed.success) {
			throw new Error(`Invalid value for local store "${this.key}": ${parsed.error.message}`);
		}

		this.value = parsed.data;
	}
}

export function localStore<T>(key: string, value: T, schema?: ZodSchema<T>) {
	return new LocalStore(key, value, schema);
}
