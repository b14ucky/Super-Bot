const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('remove')
		.setDescription('Usuwa utwór z kolejki!')
        .addIntegerOption(option => 
           option.setName('position')
            .setDescription(`Wpisz pozycję utworu, który chcesz usunąć!`)
            .setRequired(true)
        ),
	async execute(int) {
        const queue = player.getQueue(int.guild.id);

        const embed = new MessageEmbed();

        embed.setColor('#a83232');
        embed.setTimestamp();
        embed.setFooter({
            text: 'super bot od super mnie',
            iconURL: int.member.displayAvatarURL({ dynamic: true })
        });

        if (!queue || !queue.playing) {
            embed.setTitle('Nic nie jest teraz grane!');
            return int.reply({
                embeds: [embed],
                ephemeral: true
            });
        }

        const position = int.options.getInteger('position');

        if (position > queue.tracks.length) {
            embed.setTitle('W kolejce nie ma tylu piosenek!');
            return await int.reply({
                embeds: [embed],
                ephemeral: true
            });
        }

        if (position <= 0) {
            embed.setTitle(`Wybierz poprawny numer od 1 do ${queue.tracks.length}!`);
            return await int.reply({
                embeds: [embed],
                ephemeral: true
            });
        }

        const track = queue.tracks[position - 1];

        await queue.remove(track);

        embed.setTitle(`Usunięto ${track.title}`);
        int.reply({
            embeds: [embed],
            ephemeral: true
        });
        
    }
};