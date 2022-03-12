const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('nowplaying')
		.setDescription('Wyświetla aktualnie grany utwór!'),
	async execute(int) {
        const queue = player.getQueue(int.guild.id);

        const embed = new MessageEmbed();

        if (!queue || !queue.playing) {
            embed.setColor('#a83232');
            embed.setTimestamp();
            embed.setFooter({
                text: 'super bot od super mnie',
                iconURL: int.member.displayAvatarURL({ dynamic: true })
            });
            embed.setTitle('Nic nie jest teraz grane!');
            return int.reply({
                embeds: [embed],
                ephemeral: true
            });
        }

        const track = queue.current;

        embed.setColor('#32a852');
        embed.setThumbnail(track.thumbnail);
        embed.setAuthor({
            name: track.title,
            iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true })
        });

        const methods = ['wyłączone', 'utworu', 'kolejki'];

        const timestamp = queue.getPlayerTimestamp();
        const trackDuration = timestamp.progress == 'Infinity' ? 'infinity (live)' : track.duration;

        embed.setDescription(`Głośność **${queue.volume}**%\nDługość **${trackDuration}**\nPowtarzanie:  **${methods[queue.repeatMode]}**\nDodano przez  ${track.requestedBy}`);

        embed.setTimestamp();
        embed.setFooter({
            text: 'super bot od super mnie',
            iconURL: int.member.displayAvatarURL({ dynamic: true })
        });

        const saveButton = new MessageButton();

        saveButton.setLabel('Zapisz utwór');
        saveButton.setCustomId('saveTrack');
        saveButton.setStyle('SUCCESS');

        const row = new MessageActionRow().addComponents(saveButton);

        int.reply({
            embeds: [embed],
            components: [row],
            ephemeral: true
        });
    }
};