/** Minimal typings for the parts of the Turnstile client API that we use. */
export type Turnstile = {
	render: (
		container: string | HTMLElement,
		options: {
			sitekey: string;
			theme?: 'light' | 'dark' | 'auto';
			language?: string;
			size?: 'normal' | 'compact' | 'flexible';
			callback: (token: string) => void;
			'expired-callback'?: () => void;
			'error-callback'?: (errorCode: string) => void;
		}
	) => string | undefined;
	reset: (widgetId?: string) => void;
	remove: (widgetId?: string) => void;
};

declare global {
	interface Window {
		turnstile?: Turnstile;
		onTurnstileLoad?: () => void;
	}
}

const TURNSTILE_SCRIPT_URL =
	'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=onTurnstileLoad';

let loading: Promise<Turnstile> | undefined;

/** Loads the Turnstile script on first use and resolves with the API once it is ready. */
export function loadTurnstile(): Promise<Turnstile> {
	if (window.turnstile) {
		return Promise.resolve(window.turnstile);
	}

	loading ??= new Promise<Turnstile>((resolve, reject) => {
		window.onTurnstileLoad = () => {
			if (window.turnstile) {
				resolve(window.turnstile);
			} else {
				reject(new Error('Turnstile loaded but its API is not available.'));
			}
		};

		const script = document.createElement('script');
		script.src = TURNSTILE_SCRIPT_URL;
		script.async = true;
		script.addEventListener('error', () => {
			loading = undefined;
			script.remove();
			reject(new Error('Failed to load the Turnstile script.'));
		});

		document.head.appendChild(script);
	});

	return loading;
}
