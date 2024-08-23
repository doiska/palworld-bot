import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import { fetchApi } from '../lib/api.js';

@ApplyOptions<Command.Options>({
	name: 'restart',
	description: 'restart'
})
export class RestartCommand extends Command {
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((command) =>
			command
				.setName(this.name)
				.setDescription(this.description)
				.addNumberOption((o) =>
					o.setName('waittime').setDescription('Wait time in seconds').setRequired(false).setMinValue(1).setMaxValue(60)
				)
		);
	}

	public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
		await interaction.deferReply();

		const waittime = interaction.options.getNumber('waittime') || 10;

		await fetchApi('/announce', { message: 'Saving...' });
		await fetchApi('/save', { method: 'POST' });
		await fetchApi('/announce', { message: 'Saved!' });

		await fetchApi('/shutdown', {
			waittime,
			message: `Server will be restarted in ${waittime} seconds.`
		});

		return interaction.editReply({
			content: `Saved successfully, restarting in ${waittime} seconds.`
		});
	}
}
