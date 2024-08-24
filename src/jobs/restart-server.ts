import { broadcastGlobal, fetchApi } from '../lib/api.js';
import { CronJob } from 'cron';

export async function restartServer() {
	await broadcastGlobal('Scheduling the server to be restarted in 30 seconds.');

	await fetchApi('/shutdown', {
		waittime: 30,
		message: 'Server will be restarted in 30 seconds.'
	});
}

CronJob.from({
	cronTime: '0 */3 * * *',
	onTick: restartServer,
	start: true
});
