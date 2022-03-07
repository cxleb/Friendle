const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const messageEvent = require("./messageEvent.js");
const { guild, token } = require('./app.json');

const commands = [
	new SlashCommandBuilder()
		.setName('start')
		.setDescription('Starts a new Friendle Game!'),
	new SlashCommandBuilder()
		.setName('guess')
		.setDescription('Guess the word!')
		.addStringOption(option => option
			.setName('word')
			.setDescription('The word to guess!')
			.setRequired(true)),
	new SlashCommandBuilder()
		.setName('board')
		.setDescription('See the board!'),
].map(command => command.toJSON());

const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"] });

client.on('ready', async() => {

	const rest = new REST({ version: '9' }).setToken(token);
	await rest.put(Routes.applicationCommands(client.user.id), { body: commands })
		.then(() => console.log('Successfully registered application commands.'))
		.catch(console.error);

	await rest.put(Routes.applicationGuildCommands(client.user.id, guild), { body: commands })
		.then(() => console.log('Successfully registered application commands.'))
		.catch(console.error);

	console.log('Ready!');
});

client.on('interactionCreate', msg => {
	if (!msg.isCommand()) return;
	messageEvent.callback(msg);
});

client.login(token);