const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token } = require('./app.json');

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

const rest = new REST({ version: '9' }).setToken(token);

module.exports.addApplicationCommands = (appid) => {
	rest.put(Routes.applicationCommands(appid), { body: commands })
		.then(() => console.log('Successfully registered application commands.'))
		.catch(console.error);
};

module.exports.addGuildCommands = (appid, guildid) => {
	rest.put(Routes.applicationGuildCommands(appid, guildid), { body: commands })
		.then(() => console.log('Successfully registered guild commands.'))
		.catch(console.error);
};