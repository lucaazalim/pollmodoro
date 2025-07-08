export {};

export const onTurnstileLoadCallbackName = 'onTurnstileLoad';

declare global {
	const turnstile: {
		render: (
			selector: string,
			options: {
				sitekey: string;
				theme: 'light' | 'dark' | 'auto';
				size: 'normal' | 'compact' | 'flexible';
				callback: (token: string) => void;
			}
		) => void;
	};
}

declare global {
	interface Window {
		[onTurnstileLoadCallbackName]: () => void;
	}
}

export function renderTurnstileWidget(callback: (token: string) => void) {
	window.onTurnstileLoad = () => {
		turnstile.render('#turnstile-widget', {
			sitekey: '0x4AAAAAABkRrcGkRXf88Sft',
			theme: 'auto',
			size: 'flexible',
			callback
		});
	};
}
