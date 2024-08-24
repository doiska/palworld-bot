import './lib/setup.js';

import { SapphireClient, ApplicationCommandRegistries } from '@sapphire/framework';
import { GatewayIntentBits } from 'discord.js';

ApplicationCommandRegistries.setDefaultGuildIds(['292139685235392512']);

export const client = new SapphireClient({
	intents: [GatewayIntentBits.Guilds]
});

await client.login().then(async () => {
	await import('./jobs/save-server.js');
	await import('./jobs/player-connect.js');
	await import('./jobs/restart-server.js');
});
