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

        if (!queue || !queue.playing || !queue.tracks[0]) {
            embed.setTitle('Nic nie jest teraz grane/kolejka jest pusta!');
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