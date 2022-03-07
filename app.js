const { Client } = require('discord.js');
const messageEvent = require("./messageEvent.js");
const { token } = require('./app.json');

const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"] });

client.on('ready', async() => {
	console.log('Ready!');
});

client.on('interactionCreate', msg => {
	if (!msg.isCommand()) return;
	messageEvent.callback(msg);
});

client.login(token);