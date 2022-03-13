const { MessageEmbed } = require('discord.js');

module.exports = (client, int) => {
    if (!int.isCommand() && !int.isButton()) return;

    const queue = player.getQueue(int.guildId);

    const embed = new MessageEmbed();

    embed.setColor('#a83232');
    embed.setTimestamp();
    embed.setFooter({
        text: 'super bot od super mnie',
        iconURL: int.member.displayAvatarURL({ dynamic: true })
    });

    switch (int.customId) {
        case 'saveTrack': {
            if (!queue || !queue.playing) {
                embed.setColor('#a83232');
                embed.setTitle('Nic nie jest teraz grane!');
                return int.reply({
                    embeds: [embed],
                    ephemeral: true
                });
            }

            int.member.send(`Zapisałeś/aś ${queue.current.title} | ${queue.current.author} z serwera ${int.member.guild.name} `).then(() => {
                embed.setTitle('Wysłałem ci tytuł utworu w prywatnej wiadomości!');
                return int.reply({
                    embeds: [embed],
                    ephemeral: true
                });
            }).catch(error => {
                embed.setTitle('Nie mogę ci wysłać prywatnej wiadomości!');
                return int.reply({
                    embeds: [embed],
                    ephemeral: true
                });
            });
        }
    }

    const command = client.commands.get(int.commandName);

    if (!command) return;

    try {
        command.execute(int);
    } catch (error) {
        console.error(error);

        int.reply({
            content: "Coś poszło nie tak",
            ephemeral: true
        })
    }
};