const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('progress')
		.setDescription('fdjkalj;'),
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

        const progress = queue.createProgressBar();
        const timestamp = queue.getPlayerTimestamp();

        if (timestamp.progress == 'Infinity') {
            embed.setTitle('Gram live, nie ma nic do wyświetlenia!');
            return int.reply({
                embeds: [embed],
                ephemeral: true
            });
        }

        embed.setTitle(`${progress} (${timestamp.progress}%)`);
        int.reply({
            embeds: [embed],
            ephemeral: true
        });
    }
};