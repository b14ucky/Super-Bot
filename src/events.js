const { MessageEmbed } = require('discord.js');

const embed = new MessageEmbed();

player.on('error', (queue, error) => {
    console.log(`Error: ${error.message}`);
});

player.on('connectionError', (queue, error) => {
    console.log(`Connection Error:  ${error.message}`);
});

embed.setColor('#a83232');
embed.setTimestamp();

player.on('trackStart', (queue, track) => {
    if (!client.config.opt.playMessage) return;
    embed.setTitle(`Gram ${track.title} w kanale ${queue.connection.channel.name}!`);
    embed.setFooter({
        text: 'super bot od super mnie',
        iconURL: queue.metadata.client.user.displayAvatarURL({ size: 1024, dynamic: true })
    });
    queue.metadata.send({ embeds: [embed] });
});

player.on('trackAdd', (queue, track) => {
    if (!client.config.opt.addToQueueMessage) return;
    embed.setTitle(`Dodano ${track.title} do kolejki!`);
    embed.setFooter({
        text: 'super bot od super mnie',
        iconURL: queue.metadata.client.user.displayAvatarURL({ size: 1024, dynamic: true })
    });
    queue.metadata.send({ embeds: [embed] });
});

player.on('botDisconnect', (queue) => {
    embed.setTitle('Ktoś mnie wyrzucił z kanału, czyszcze kolejkę...');
    embed.setFooter({
        text: 'super bot od super mnie',
        iconURL: queue.metadata.client.user.displayAvatarURL({ size: 1024, dynamic: true })
    });
    queue.metadata.send({ embeds: [embed] });
});

player.on('channelEmpty', (queue) => {
    embed.setTitle('Kanał jest pusty, wychodze i czyszcze kolejkę...');
    embed.setFooter({
        text: 'super bot od super mnie',
        iconURL: queue.metadata.client.user.displayAvatarURL({ size: 1024, dynamic: true })
    });
    queue.metadata.send({ embeds: [embed] });
});

player.on('queueEnd', (queue) => {
    if (!client.config.opt.queueEndMessage) return;
    embed.setTitle('Zakończono odtwarzanie kolejki!');
    embed.setFooter({
        text: 'super bot od super mnie',
        iconURL: queue.metadata.client.user.displayAvatarURL({ size: 1024, dynamic: true })
    });
    queue.metadata.send({ embeds: [embed] });
});