const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear')
		.setDescription('Czyści kolejkę!'),
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
            embed.setTitle('Nic nie jest teraz grane/kolejka jest pusta!');
            return int.reply({
                embeds: [embed],
                ephemeral: true
            });
        }

        const inSameChannel = int.member.voice.channelId === queue.connection.channel.id
        
        if (queue.playing && !inSameChannel) {
            embed.setTitle('Musisz być w tym samym kanale co ja, aby użyc tej komendy!')
            return int.reply({
                embeds: [embed],
                ephemeral: true
            })
        }

        if (!queue.tracks[0]) {
            embed.setTitle('W kolejce jest tylko jeden utwór!')
            return int.reply({
                embeds: [embed],
                ephemeral: true
            });
        }

        await queue.clear();

        embed.setTitle('Kolejka została wyczyszczona!');
        int.reply({
            embeds: [embed],
            ephemeral: true
        });
    }
};