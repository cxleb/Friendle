const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token, application, guild } = require('./fucky.json');

const commands = [
	new SlashCommandBuilder().setName('start')
							 .setDescription('Starts a new Friendle Game!'),
	new SlashCommandBuilder().setName('guess')
	    					 .setDescription('Guess the word!')
							 .addStringOption(option =>
								option.setName('word')
									  .setDescription('The word to guess!')
									  .setRequired(true)),
	new SlashCommandBuilder().setName('board')
							 .setDescription('See the board!'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(application, guild), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);

rest.put(Routes.applicationCommands(application), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);

// rest.get(Routes.applicationCommands(application))
//     .then(data => {
// 		console.log("app")
//         //const promises = [];
//         for (const command of data) {
//             //const deleteUrl = `${Routes.applicationCommands(application)}/${command.id}`;
//             //promises.push(rest.delete(deleteUrl));
// 			console.log(command.name);
//         }
//         //return Promise.all(promises);
//     });

// delete the commmands

// rest.get(Routes.applicationGuildCommands(application, guild))
//     .then(data => {
// 		console.log("app")
//         const promises = [];
//         for (const command of data) {
//             const deleteUrl = `${Routes.applicationGuildCommands(application, guild)}/${command.id}`;
//             promises.push(rest.delete(deleteUrl));
// 			console.log(command.name);
//         }
//         return Promise.all(promises);
//     });