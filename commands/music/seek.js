const ms = require('ms');
const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('seek')
		.setDescription('Przewija utwór!')
        .addStringOption(option => 
           option.setName('time')
            .setDescription('Wpisz czas do którego chcesz przewinąć (np. 5s, 10s, 20 seconds, 1m)!')
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

        const inSameChannel = int.member.voice.channelId === queue.connection.channel.id
        
        if (queue.playing && !inSameChannel) {
            embed.setTitle('Musisz być w tym samym kanale co ja, aby użyc tej komendy!')
            return int.reply({
                embeds: [embed],
                ephemeral: true
            })
        }

        const timeToMS = ms(int.options.getString('time'));

        if (timeToMS >= queue.current.durationMS) {
            embed.setTitle('Podany czas jest dłuższy od długości utworu!\n*Spróbuj np.: 5s, 10s, 20 seconds, 1m...');
            return int.reply({
                embeds: [embed],                
                ephemeral: true
            });
        }

        await queue.seek(timeToMS);

        embed.setTitle(`Przewinięto do ${ms(timeToMS, { long: true })}`);
        int.reply({
            embeds: [embed],
            ephemeral: true
        });
        
    }
};