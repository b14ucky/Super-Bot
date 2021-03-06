const { MessageEmbed } = require('discord.js');
const { QueueRepeatMode } = require('discord-player');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('loop')
		.setDescription('Włącza powtarzanie!')
        .addStringOption(option => 
           option.setName('type')
            .setDescription('Wybierz tryb powtarzania!')
            .setRequired(true)
            .addChoice('queue', 'queue')
            .addChoice('song', 'song')
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

        const inSameChannel = int.member.voice.channelId === queue.connection.channel.id
        
        if (queue.playing && !inSameChannel) {
            embed.setTitle('Musisz być w tym samym kanale co ja, aby użyc tej komendy!')
            return int.reply({
                embeds: [embed],
                ephemeral: true
            });
        }

        if (int.options.getString('type') === 'queue') {
            if (queue.repeatMode === 1) queue.setRepeatMode(QueueRepeatMode.OFF);

            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.QUEUE : QueueRepeatMode.OFF);
            
                embed.setTitle(success ? `Powtarzanie kolejki ${queue.repeatMode === 0 ? 'wyłączone' : 'włączone'} 🔁` : `Coś poszło nie tak!`);
            return int.reply({
                embeds: [embed],
                ephemeral: true
            });
        } else {
            if (queue.repeatMode === 2) queue.setRepeatMode(QueueRepeatMode.OFF);

            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.TRACK : QueueRepeatMode.OFF);

                embed.setTitle(success ? `Powtarzanie aktualnego utworu ${queue.repeatMode === 0 ? 'wyłączone' : 'włączone'} 🔂` : `Coś poszło nie tak!`);
            return int.reply({
                embeds: [embed],
                ephemeral: true
            });
        };
    }
};