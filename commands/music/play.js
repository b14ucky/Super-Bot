const { MessageEmbed } = require('discord.js');
const { QueryType } = require('discord-player');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Gra muzykę!')
        .addStringOption(option => 
           option.setName('url')
            .setDescription('Wpisz tytuł/autora/link utworu/playlisty który/ą chcesz odtworzyć!')
            .setRequired(true)
        ),
	async execute(int) {

        const res = await player.search(int.options.getString('url'), {
            requestedBy: int.member,
            searchEngine: QueryType.AUTO
        });

        const embed = new MessageEmbed();

        embed.setColor('#a83232');
        embed.setTimestamp();
        embed.setFooter({
            text: 'super bot od super mnie',
            iconURL: int.member.displayAvatarURL({ dynamic: true })
        });

        if (!res || !res.tracks.length) {
            embed.setTitle('Nie znalazłem utworu o takim tytule!');
            return int.reply({
                embeds: [embed],
                ephemeral: true
            });
        }

        const queue = await player.createQueue(int.guild, {
            metadata: int.channel
        });

        try {
            if (!queue.connection) await queue.connect(int.member.voice.channel);
        } catch {
            await player.deleteQueue(int.guild.id);
            embed.setTitle('Nie mogę dołączyć do kanału!');
            return int.reply({
                embeds: [embed],
                ephemeral: true
            });
        }

        embed.setTitle(`Ładowanie ${res.playlist ? 'playlisty' : 'utworu'}...`);
        await int.reply({
            embeds: [embed],
            ephemeral: true
        });

        res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

        if (!queue.playing) await queue.play();

        embed.setTitle(`Dodano ${res.playlist ? (res.tracks.length + ' utworów') : res.tracks[0].title} do kolejki`);
        await int.editReply({
            embeds: [embed],
            ephemeral: true
        });
	},
};