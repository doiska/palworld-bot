import { fetchApi } from '../lib/api.js';
import { CronJob } from 'cron';
import { send } from '../lib/channel.js';

const currentPlayers = new Set<string>();

export async function playerConnect() {
	const { players } = await fetchApi<{ players: { name: string }[] }>('/players');

	for (const player of players) {
		if (!currentPlayers.has(player.name)) {
			currentPlayers.add(player.name);

			await send(`${player.name} has joined the server.`);
			console.log(`Player ${player.name} connected.`);
		}
	}

	for (const player of currentPlayers) {
		if (!players.some((p) => p.name === player)) {
			currentPlayers.delete(player);

			await send(`${player} has left the server.`);
			console.log(`Player ${player} disconnected.`);
		}
	}
}

CronJob.from({
	cronTime: '*/1 * * * *',
	onTick: playerConnect,
	start: true
});
