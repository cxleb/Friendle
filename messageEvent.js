const { MessageAttachment } = require('discord.js');
const words = require('./data.json');
const Canvas = require('canvas');
const sessions = require('./sessions.js');

function getBoard(game) {
	const cellSize = 50;
	if (game.guesses.length === 0) return;
	const canvas = Canvas.createCanvas(250, parseInt(game.guesses.length * cellSize));
	const context = canvas.getContext('2d');
	
	const gutter = 1;
	const colors = { green: "#55FF44", grey: "#CCCCCC", yellow: "#FFDB58" };
	for (let i = 0; i < game.guesses.length; i++) {
		const ycol = i * cellSize;
		for (let u = 0; u < 5; u++) {
			const xcol = u * cellSize;
			// figure out what colour the leter is
			let color = colors.grey;
			if (game.word.charAt(u) === game.guesses[i].charAt(u)) {
				color = colors.green;
			} else if (game.word.includes(game.guesses[i].charAt(u))) {
				color = colors.yellow;
			}

			context.fillStyle = color;
			context.fillRect(xcol + gutter, ycol + gutter, cellSize - gutter, cellSize - gutter);

			context.font = '45px sans-serif';
			context.fillStyle = '#000000';
			const text = game.guesses[i].charAt(u);
			const measure = context.measureText(text);
			context.fillText(text, xcol + (cellSize - measure.width) / 2, ycol + cellSize - 10, cellSize);
		}
	}

	return new MessageAttachment(canvas.toBuffer(), 'board.png');
}

function createGame(msg, game) {
	if (Date.now() - game.gameTime < 360000) { // one hour
		msg.reply("Has not been an hour since the last game!");
	}
	const word = words[parseInt(Math.random() * words.length)];
	game.word = word;
	game.started = true;
	msg.reply("Created a new game!");
}

function guess(msg, game) {
	if (msg.member.user.id === game.lastGuess) {
		msg.reply("You guessed last round!"); 
		return;
	}
	if (!game.started) {
		msg.reply("Please start a game first!"); 
		return;
	}
	const word = msg.options.getString('word').toLowerCase();
	if (word.length != 5) {
		msg.reply("Please enter a 5 letter word!");
		return;
	}
	// check if the word contains letters only, we have to check if the result is undefined since match returns undefined when no matches are found
	const letterCheck = word.match(/[a-z]/g);
	if (!letterCheck || letterCheck.length !== 5) {
		msg.reply("Your guess should only contain letters!");
		return;
	}
	// check if the word is actually a word
	if (!words.includes(word)) {
		msg.reply(`${word} is not a valid word!`);	
		return;
	}
	// check if the word was already guessed
	if (game.guesses.includes(word)) {
		msg.reply(`${word} was already guessed!`);	
		return;
	}
	game.guesses.push(word);
	if (word === game.word) {
		game.started = false;
		msg.reply({
			content: "Congratulations, the word was found! :partying_face:",
			files: [getBoard(game)]
		});
	} else if (game.guesses.length === 6) { // well you fucked up
		game.started = false;
		msg.reply({
			content: `Oh no you ran out of guesses! :slight_frown: The word was ${game.word}`,
			files: [getBoard(game)]
		});
	} else {
		msg.reply({
			content: `You guessed ${word}, here is the board!`,
			files: [getBoard(game)]
		});
		game.lastGuess = msg.user.id;
	}
}

function board(msg, game) {
	if (!game.started) {
		msg.reply("Game has not started yet!");
	} else if (game.guesses.length === 0) {
		msg.reply("No guesses yet! :eyes:");
	} else {
		msg.reply({
			content: "Here is the board!",
			files: [getBoard(game)]
		});
	}
}

module.exports.callback = (msg) => {
	let game = sessions.getGameByID(msg.channelId);
	switch (msg.commandName) {
		case "start": {
			game = sessions.resetGameByID(msg.channelId);
			createGame(msg, game);
			break;
		}
		case "guess": {
			guess(msg, game);
			break;
		}
		case "board": {
			board(msg, game);
		}
	}
};