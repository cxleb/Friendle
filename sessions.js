
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

var games = {};

exports.resetGameByID = function(id) {
    games[id] = new Game();
    return games[id];
}

exports.getGameByID = function(id) {
    if(games[id] === undefined)
        games[id] = new Game();
    return games[id];
}