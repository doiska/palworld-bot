import { broadcastGlobal, fetchApi } from '../lib/api.js';
import { CronJob } from 'cron';

export async function saveServer() {
	await broadcastGlobal('Saving...');
	await fetchApi('/save', { method: 'POST' });
	await broadcastGlobal('Saved!');
}

CronJob.from({
	cronTime: '0 */1 * * *',
	onTick: saveServer,
	start: true,
	runOnInit: true
});
