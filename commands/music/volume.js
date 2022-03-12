const maxVol = client.config.opt.maxVol;
const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('volume')
		.setDescription('Zmienia głośność odtwarzania!')
        .addIntegerOption(option => 
           option.setName('level')
            .setDescription(`Wybierz poziom głośności (1-${maxVol})!`)
            .setRequired(false)
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

        const vol = int.options.getInteger('level');

        if (!vol) {
            embed.setTitle(`Aktualna głośność to ${queue.volume}\nAby zmienić głośność wpisz liczbę od 1 do ${maxVol}!`);
            return int.reply({
                embeds: [embed],
                ephemeral: true
            });
        }

        if (queue.volume === vol) {
            embed.setTitle(`Głośność jest już ustawiona na ${vol}%`);
            return int.reply({
                embeds: [embed],
                ephemeral: true
            });
        }

        if (vol < 0 || vol > maxVol) {
            embed.setTitle(`Wybierz poprawną liczbę z przedziału od 1 do ${maxVol}!`);
            return int.reply({
                embeds: [embed],
                ephemeral: true
            });
        }
            
        const success = queue.setVolume(vol);

        embed.setTitle(success ? `Głośność ${vol}/${maxVol}%` : `Coś poszło nie tak!`);
        return int.reply({
            embeds: [embed],
            ephemeral: true
        });
    }
};