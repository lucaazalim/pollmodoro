import { env } from '$env/dynamic/public';

export {};

export const onTurnstileLoadCallbackName = 'onTurnstileLoad';
export const turnstileWidgetId = 'turnstile-widget';

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

export function renderTurnstileWidget(callback: (token: string) => void) {
	window.onTurnstileLoad = () => {
		turnstile.render(`#${turnstileWidgetId}`, {
			sitekey: env.PUBLIC_TURNSTILE_SITE_KEY || '',
			theme: 'auto',
			size: 'flexible',
			callback
		});
	};
}

export function resetTurnstileWidget() {
	turnstile.reset(`#${turnstileWidgetId}`);
}
