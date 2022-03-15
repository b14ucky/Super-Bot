const { getSong } = require("genius-lyrics-api");
const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lyrics')
		.setDescription('Wyświetla tekst utworu!')
        .addStringOption(option => 
           option.setName('title')
            .setDescription('Wpisz tytuł utworu, którego tekst chcesz wyszukać!')
            .setRequired(true)
        )
        .addStringOption(option => 
           option.setName('artist')
            .setDescription('Wpisz nazwę artysty, którego tekst utworu chcesz wyszukać!')
            .setRequired(false)
        ),
	async execute(int) {
        const embed = new MessageEmbed();

        embed.setColor('#a83232');
        embed.setTimestamp();
        embed.setFooter({
            text: 'super bot od super mnie',
            iconURL: int.member.displayAvatarURL({ dynamic: true })
        });
        
        embed.setTitle('Szukam...');
        await int.reply({
            embeds: [embed],
            ephemeral: true
        });

        const title = int.options.getString('title');
        const artist = int.options.getString('artist') ? int.options.getString('artist') : ' ';

        const options = {
            apiKey: client.config.app.geniusToken,
            title: title,
            artist: artist,
            optimizeQuery: true
        };

        getSong(options).then(function (song) {
            embed.setTitle(song.title)
                .setDescription(song.lyrics)
                .setThumbnail(song.albumArt)
                .setURL(song.url);
            return int.editReply({
                embeds: [embed]
            });    
        });
        
    }
};