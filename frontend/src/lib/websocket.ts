import { env } from '$env/dynamic/public';
import type { WebSocketMessage } from '../../../backend/src/utils/types';
import { pollStore, type GetPollOutput } from './stores';

const webSocketUrl = env.PUBLIC_WEBSOCKET_URL || 'ws://localhost:8787/websocket';

export function connectWebSocket(
	pollId: string,
	currentWebSocket: WebSocket | undefined
): WebSocket | undefined {
	if (!pollId || !webSocketUrl) return;

	if (currentWebSocket) {
		currentWebSocket.close();
	}

	const webSocket = new WebSocket(webSocketUrl + `?pollId=${pollId}`);

	webSocket.onopen = () => {
		console.log('Connected to WebSocket');
	};

	webSocket.onmessage = (event) => {
		try {
			const message = JSON.parse(event.data) as WebSocketMessage<GetPollOutput>;

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
