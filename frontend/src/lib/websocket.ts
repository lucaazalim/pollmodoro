import { env } from '$env/dynamic/public';
import type { WebSocketMessage } from '$backend/utils/types';
import type { PollWithResults } from './trpc';

const webSocketUrl = env.PUBLIC_WEBSOCKET_URL || 'ws://localhost:8787/websocket';

const MAX_RECONNECT_DELAY = 30_000;

/**
 * Opens a WebSocket that receives live results for a poll and reconnects with
 * backoff if the connection drops. Returns a function that closes it for good.
 */
export function subscribeToPollResults(
	pollId: string,
	onResults: (poll: PollWithResults) => void
): () => void {
	const url = new URL(webSocketUrl);
	url.searchParams.set('pollId', pollId);

	let socket: WebSocket | undefined;
	let reconnectTimer: ReturnType<typeof setTimeout> | undefined;
	let attempt = 0;
	let closed = false;

	function connect() {
		socket = new WebSocket(url);

		socket.addEventListener('open', () => {
			attempt = 0;
		});

		socket.addEventListener('message', (event) => {
			try {
				const message = JSON.parse(event.data) as WebSocketMessage<PollWithResults>;

				if (message.type === 'results') {
					onResults(message.data);
				}
			} catch (error) {
				console.error('Could not parse WebSocket message:', error);
			}
		});

		socket.addEventListener('close', () => {
			if (closed) return;

			const delay = Math.min(1000 * 2 ** attempt, MAX_RECONNECT_DELAY);
			attempt += 1;
			reconnectTimer = setTimeout(connect, delay);
		});
	}

	connect();

	return () => {
		closed = true;
		clearTimeout(reconnectTimer);
		socket?.close();
	};
}
