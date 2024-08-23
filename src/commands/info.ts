import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import { fetchApi } from '../lib/api.js';

@ApplyOptions<Command.Options>({
	name: 'info',
	description: 'info'
})
export class InfoCommand extends Command {
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand({
			name: this.name,
			description: this.description
		});
	}

	public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
		const data = await fetchApi<{ servername: string; description: string; version: string }>('/info');

		return interaction.reply({
			content: `${data.servername} v${data.version}`
		});
	}
}
