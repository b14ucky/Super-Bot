module.exports = (client, int) => {
    if (!int.isCommand() && !int.isButton()) return;

    const queue = player.getQueue(int.guildId);

    switch (int.customId) {
        case 'saveTrack': {
            if (!queue || !queue.playing) return int.reply({
                content: `Nic nie jest teraz grane`,
                ephemeral: true,
                components: []
            });

            int.member.send(`Zapisałeś/aś ${queue.current.title} | ${queue.current.author} z serwera ${int.member.guild.name} `).then(() => {
                return int.reply({
                    content: `Wysłałem ci tytuł utworu w prywatnej wiadomości`,
                    ephemeral: true,
                    components: []
                });
            }).catch(error => {
                return int.reply({
                    content: `Nie mogę ci wysłać prywatnej wiadomości`,
                    ephemeral: true,
                    components: []
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