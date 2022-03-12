const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('shuffle')
		.setDescription('Miesza kolejkę!'),
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

        if (!queue.tracks[0]) {
            embed.setTitle('W kolejce jest tylko jeden utwór!');
            return int.reply({
                embeds: [embed],
                ephemeral: true
            });
        }

        await queue.shuffle();

        embed.setTitle(`Kolejka została wymieszana, ${queue.tracks.length} utworów w kolejce!`);
        return int.reply({
            embeds: [embed],
            ephemeral: true
        });
    }
};