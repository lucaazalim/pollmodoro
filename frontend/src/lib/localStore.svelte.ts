import { browser } from '$app/environment';
import type { ZodType } from 'zod';

/**
 * A small piece of reactive state persisted to `localStorage` and validated
 * with a Zod schema. Assign to `current` to update it.
 */
export class LocalStore<T> {
	#value: T = $state.raw() as T;
	readonly #key: string;
	readonly #schema: ZodType<T>;

	constructor(key: string, initial: T, schema: ZodType<T>) {
		this.#key = key;
		this.#schema = schema;
		this.#value = browser ? (this.#read() ?? initial) : initial;
	}

	get current(): T {
		return this.#value;
	}

	set current(value: T) {
		this.#value = this.#schema.parse(value);

		if (browser) {
			localStorage.setItem(this.#key, JSON.stringify(this.#value));
		}
	}

	#read(): T | undefined {
		const item = localStorage.getItem(this.#key);

		if (item === null) return undefined;

		try {
			return this.#schema.parse(JSON.parse(item));
		} catch (error) {
			console.error(`Discarding invalid value stored under "${this.#key}":`, error);
			localStorage.removeItem(this.#key);
			return undefined;
		}
	}
}

export function localStore<T>(key: string, initial: T, schema: ZodType<T>) {
	return new LocalStore(key, initial, schema);
}
