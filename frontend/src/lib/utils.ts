import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export type WithoutChild<T> = T extends { child?: unknown } ? Omit<T, 'child'> : T;
export type WithoutChildren<T> = T extends { children?: unknown } ? Omit<T, 'children'> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & {
	ref?: U | null;
};

export function getPercentage(votes: number, total: number): number {
	if (total === 0) return 0;
	return Math.round((votes / total) * 100);
}

const dateFormatter = new Intl.DateTimeFormat('en', { dateStyle: 'medium' });

/** Formats a date the same way on the server and in the browser to avoid hydration mismatches. */
export function formatDate(date: Date | string): string {
	return dateFormatter.format(new Date(date));
}
