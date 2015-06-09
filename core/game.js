var config = require("nconf").argv().file({file: 'config.json'});

var game = {
  players: [],
  addPlayer: function () {
    console.log(game.players.lenght);
  },
  getPlayerColor: function (n) {
    return config.get("game:colors")[n];
  }
};

module.exports = game;