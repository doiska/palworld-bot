import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import { fetchApi } from '../lib/api.js';

@ApplyOptions<Command.Options>({
	name: 'save',
	description: 'save'
})
export class InfoCommand extends Command {
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand({
			name: this.name,
			description: this.description
		});
	}

	public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
		await interaction.deferReply();

		await fetchApi('/announce', { message: 'Saving...' });
		await fetchApi('/save', { method: 'POST' });
		await fetchApi('/announce', { message: 'Saved!' });

		return interaction.editReply({
			content: 'Successfully saved!'
		});
	}
}
