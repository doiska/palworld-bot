import './lib/setup.js';

import './jobs/save-server.js';
import './jobs/player-connect.js';
import './jobs/restart-server.js';

import { SapphireClient, ApplicationCommandRegistries } from '@sapphire/framework';
import { GatewayIntentBits } from 'discord.js';

ApplicationCommandRegistries.setDefaultGuildIds(['292139685235392512']);

export const client = new SapphireClient({
	intents: [GatewayIntentBits.Guilds]
});

await client.login();
