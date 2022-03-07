class Game {
	constructor() {
		this.started = false;
		this.word = "";
		this.guesses = [];
		this.gameTime = 0;
		this.lastGuess = 0;
		return this;
	}
}

const games = {};

module.exports.resetGameByID = (id) => {
	games[id] = new Game();
	return games[id];
}

module.exports.getGameByID = (id) => {
	if (!games[id]) {
		games[id] = new Game();
	}
	return games[id];
}