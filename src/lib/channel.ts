import { client } from '../main.js';
import { type MessageCreateOptions, TextChannel } from 'discord.js';

export async function send(message: string | MessageCreateOptions) {
	const channel = await client.channels.fetch('1276298092404281425');
	await (channel as TextChannel).send(message);
}
