const { Client, MessageAttachment, ClientPresence } = require('discord.js');
const { token } = require('./app.json');
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"] });

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', msg => {
	const messageEvent = require("./messageEvent.js");
    messageEvent.callback(msg);
});

client.login(token);