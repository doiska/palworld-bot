import { send } from './channel.js';

export async function fetchApi<T>(endpoint: string, payload?: any, options?: RequestInit) {
	const username = process.env.USERNAME;
	const password = process.env.PASSWORD;

	const response = await fetch(`pal.twokei.com:8212/v1/api${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`, {
		method: JSON.stringify(payload) ? 'POST' : 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`
		},
		body: JSON.stringify(payload),
		...options
	});

	console.log(response);

	if (!response.ok) {
		console.error(await response.text());
		throw new Error('Something went wrong');
	}

	console.log(`Response: ${response.status} ${response.statusText} for ${response.url}`);

	return (await response.json().catch(() => {})) as T;
}

export async function broadcastGlobal(message: string) {
	const timestampWithHours = new Date().toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
	await Promise.allSettled([fetchApi('/announce', { message: `[${timestampWithHours}] ${message}` }), send(`**BROADCAST:** ${message}`)]);
}
