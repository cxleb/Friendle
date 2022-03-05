

const { Client, MessageAttachment, ClientPresence } = require('discord.js');
const { token } = require('./app.json');
const { words } = require("./data.json");
const Canvas = require('canvas');
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"] });

function Game(started, word) {
	this.started = started;
	this.word = word;
	this.guesses = [];
	this.gameTime = 0;
	this.lastGuess = 0;
	return this;
}
var game = Game(false, "");

function getBoard()
{
	const cellSize = 50;
	if(game.guesses.length === 0)
		return;
	const canvas = Canvas.createCanvas(250, parseInt(game.guesses.length * cellSize));
	const context = canvas.getContext('2d');
	
	const gutter = 1;
	const colors = {green:"#55FF44",grey:"#CCCCCC",yellow:"#FFDB58"};
	for(var i = 0; i < game.guesses.length; i++) {
		const ycol = i * cellSize;
		for(var u = 0; u < 5; u++) {
			const xcol = u * cellSize;
			// figure out what colour the leter is
			var color = colors.grey;
			if(game.word.charAt(u) === game.guesses[i].charAt(u)) {
				color = colors.green;
			}
			else if(game.word.includes(game.guesses[i].charAt(u)))
			{
				color = colors.yellow;
			}

			context.fillStyle = color;
			context.fillRect(xcol + gutter, ycol+gutter, cellSize-gutter, cellSize-gutter);

			context.font = '45px sans-serif';
			context.fillStyle = '#000000';
			const text = game.guesses[i].charAt(u);
			const measure = context.measureText(text);
			context.fillText(text, xcol + ((cellSize - measure.width) / 2), ycol + (cellSize - 10), cellSize);
		}
	}

	const attachment = new MessageAttachment(canvas.toBuffer(), 'profile-image.png');
	return attachment;
}

function createGame(msg) {
	if(Date.now() - game.gameTime < 360000) // one hour
		msg.reply("Has not been an hour since the last game!");
	var word = words[parseInt(Math.random() * words.length)];
	game = Game(true, word);
	msg.reply("Created a new game!");
}

function guess(msg) {
	if(msg.member.user.id === game.lastGuess) {
		msg.reply("You guessed last round!"); 
		return;
	}
	if(!game.started) {
		msg.reply("Please start a game first!"); 
		return;
	}
	var word = msg.options.getString('word').toLowerCase();
	if(word.length != 5) {
		msg.reply("Please enter a 5 letter word!");
		return;
	}
	try
	{
		if(word.match(/[a-z]/g).length!=5) {
			msg.reply("Word should only contain letters!");	
			return;
		}
	}
	catch(e)
	{	
		msg.reply("Your guess should only contain letters!");	
		return;
	}
	if(!words.includes(word))
	{
		msg.reply(word + " is not a valid word!");	
		return;
	}
	game.guesses.push(word);
	if(word === game.word)
	{
		game.started = false;
		msg.reply({content:"Congradulations you won! :partying_face:", files:[getBoard()]});
	}
	else { // well you fucked up
		if(game.guesses.length === 6)
		{
			game.started = false;
			msg.reply({content:"Oh no you ran out of guesses! :slight_frown: The word was " + game.word, files:[getBoard()]});
			
		}
		else
		{
			msg.reply({content:"You guessed "+word+", here is the board!", files:[getBoard()]});
			game.lastGuess = msg.member.user.id;
		}
	}
}

function board(msg) {
	if(!game.started)
		msg.reply("Game has not started yet!");
	else if(game.guesses.length === 0)
		msg.reply("No guesses yet! :eyes:");
	else
		msg.reply({content:"here is the board!", files:[getBoard()]});
}

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', msg => {
	if (!msg.isCommand()) return;
	if(msg.commandName  === "start") {
		createGame(msg);
	}
	else if(msg.commandName  === "guess") {
		guess(msg);
	}
	else if(msg.commandName  === "board") {
		board(msg);
	}
});

client.login(token);