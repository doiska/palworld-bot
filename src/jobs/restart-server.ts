import { broadcastGlobal, fetchApi } from '../lib/api.js';
import { CronJob } from 'cron';

export async function restartServer() {
	await broadcastGlobal('Scheduling the server to be restarted in 60 seconds.');

	await fetchApi('/shutdown', {
		waittime: 60,
		message: 'Server will be restarted in 60 seconds.'
	});
}

CronJob.from({
	cronTime: '0 */3 * * *',
	onTick: restartServer,
	start: true,
	utcOffset: -3
});
