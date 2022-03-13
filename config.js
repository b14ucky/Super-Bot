module.exports = {
    app: {
        token: `${process.env.TOKEN}`,
        geniusToken: `${process.env.GENIUS_TOKEN}`,
        clientId: '951544421311213658',
        guildId: '806943054798913577',
        production: true,
        playing: '/help',
        version: '1.1.1'
    },

    opt: {
        maxVol: 100,
        addToQueueMessage: false,
        playMessage: false,
        queueEndMessage: true,
        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25
            }
        }
    }
};
