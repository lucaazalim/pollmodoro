import { getContext, setContext } from 'svelte';

export {};

export const onTurnstileLoadCallbackName = 'onTurnstileLoad';
export const turnstileWidgetId = 'turnstile-widget';
const turnstileContextKey = 'turnstile-script';

type TurnstileContext = {
	loaded: boolean;
};

declare global {
	const turnstile: {
		render: (
			selector: string,
			options: {
				sitekey: string;
				theme?: 'light' | 'dark' | 'auto';
				size?: 'normal' | 'compact' | 'flexible';
				callback: (token: string) => void;
			}
		) => void;
		reset: (widgetId: string) => void;
	};
}

declare global {
	interface Window {
		[onTurnstileLoadCallbackName]: () => void;
	}
}

export function setTurnstileContext(context: TurnstileContext) {
	setContext(turnstileContextKey, context);
}

export function getTurnstileContext(): TurnstileContext {
	return getContext(turnstileContextKey);
}
