const { Client } = require('discord.js');
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"] });

const commands = require('./deployCommands.js');
const messageEvent = require('./messageEvent.js');
const { guild, token } = require('./app.json');

client.on('ready', async() => {
	console.log('Ready!');
	// add this in when ready to deploy 
	//commands.addApplicationCommands(client.user.id);
	commands.addGuildCommands(client.user.id, guild);
});

client.on('interactionCreate', msg => {
	if (!msg.isCommand()) return;
	messageEvent.callback(msg);
});

client.login(token);