import { env } from '$env/dynamic/public';
import type { PollWithResults, WebSocketMessage } from '../../../backend/src/db/types';
import { pollStore } from './stores';

const webSocketUrl = env.PUBLIC_WEBSOCKET_URL || 'ws://localhost:8787/websocket';

export function connectWebSocket(
	pollId: string,
	currentWebSocket: WebSocket | null
): WebSocket | null {
	if (!pollId || !webSocketUrl) return null;

	if (currentWebSocket) {
		currentWebSocket.close();
	}

	const webSocket = new WebSocket(webSocketUrl + `?pollId=${pollId}`);

	webSocket.onopen = () => {
		console.log('Connected to WebSocket');
	};

	webSocket.onmessage = (event) => {
		try {
			const message = JSON.parse(event.data) as WebSocketMessage<PollWithResults>;

			if (message.type === 'results' && message.data) {
				pollStore.updatePollData(message.data);
			}
		} catch (error) {
			console.error('Error parsing WebSocket message:', error);
		}
	};

	webSocket.onclose = () => {
		console.log('Disconnected from WebSocket');
	};

	webSocket.onerror = (error) => {
		console.error('WebSocket error:', error);
	};

	return webSocket;
}
