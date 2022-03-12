const { readdirSync } = require('fs');
const { Routes } = require('discord-api-types/v9');
const { REST } = require('@discordjs/rest');
const { Collection } = require('discord.js');

client.commands = new Collection();

const events = readdirSync('./events/').filter(file => file.endsWith('.js'));

console.log(`Loading events...`);

for (const file of events) {
    const event = require(`../events/${file}`);
    console.log(`-> Loaded event ${file.split('.')[0]}`);
    client.on(file.split('.')[0], event.bind(null, client));
    delete require.cache[require.resolve(`../events/${file}`)];
};


console.log('Loading commands...')

commands = [];

readdirSync('./commands/').forEach(dirs => {
    const commandFiles = readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));

    
    for (const file of commandFiles) {
    	const command = require(`../commands/${dirs}/${file}`);
    	commands.push(command.data.toJSON());
        client.commands.set(command.data.name, command);
        console.log(`-> Loaded command ${command.data.name}`)
    }
});

const rest = new REST({ version: '9' }).setToken(client.config.app.token);

(async () => {
    try {
        if (client.config.app.production) {
            await rest.put(Routes.applicationCommands(client.config.app.clientId), 
               {
                body: commands
            });
            console.log('Successfully registered application commands globally.');
        } else {
            await rest.put(Routes.applicationGuildCommands(client.config.app.clientId, client.config.app.guildId), 
               {
                body: commands
            });
            console.log('Successfully registered application commands locally.');
            
        }
    } catch (error) {
        console.error(error);
    }
})();
