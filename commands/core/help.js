const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Wyświetla pomoc!'),
	async execute(int) {
        const embed = new MessageEmbed();

        embed.setColor('#32a852');
        embed.setAuthor({
            name: client.user.username, 
            iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true })
        });

        const commands = client.commands;

        embed.addField(`Dostępne komendy (${commands.size}):`, commands.map(x => `\`/${x.data.name}\``).join(', '));

        embed.setTimestamp();
        embed.setFooter({
            text: `super bot od super mnie wersja: ${client.config.app.version}`,
            iconURL: int.member.displayAvatarURL({ dynamic: true })
        });

        int.reply({
            embeds: [embed],
            ephemeral: true
        });
    }
};
