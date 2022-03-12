const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Wyświetla ping bota!'),
	async execute(int) {
        const embed = new MessageEmbed();

        embed.setColor('#a83232');
        embed.setTimestamp();
        embed.setFooter({
            text: 'super bot od super mnie',
            iconURL: int.member.displayAvatarURL({ dynamic: true })
        });
        
        embed.setTitle(`Ping bota: ${Date.now() - int.createdTimestamp}ms\nPing API: ${client.ws.ping}ms`);
        
		await int.reply({
            embeds: [embed],
            ephemeral: true
        });
	},
};