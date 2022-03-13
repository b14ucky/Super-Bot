const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('queue')
		.setDescription('Wyświetla kolejkę!'),
	async execute(int) {
        const queue = player.getQueue(int.guild.id);

        const embed = new MessageEmbed();
        
        const methods = ['', '🔂', '🔁'];

        embed.setColor('#a83232');
        embed.setTimestamp();
        embed.setFooter({
            text: 'super bot od super mnie',
            iconURL: int.member.displayAvatarURL({ dynamic: true })
        });

        if (!queue) {
            embed.setTitle('Nic nie jest aktualnie grane!')
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


        embed.setThumbnail(int.guild.iconURL({ size: 2048, dynamic: true }));
        embed.setAuthor({
            name: `Kolejka serwera - ${int.guild.name} ${methods[queue.repeatMode]}`, 
            iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true })
        });

        const tracks = queue.tracks.map((track, i) => `**${i + 1}** - ${track.title} | ${track.author} (dodane przez: ${track.requestedBy.username})`);

        const songs = queue.tracks.length;
        const nextSongs = songs > 5 ? `Oraz **${songs - 5}** innych` : `**${songs}** utwór/utworów w kolejce...`;

        embed.setDescription(`Teraz gram:  ${queue.current.title}\n\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs}`);
        embed.setColor('#32a852');

        int.reply({
            embeds: [embed],
            ephemeral: true
        });
    }
};