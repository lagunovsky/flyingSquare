var
  config = require("nconf").argv().file({file: 'config.json'}),
  debug = require("debug")('game');

var game = {
  players: {
    count: -1
  },
  addPlayer: function (id) {
    game.players.count++;
    if (game.players.count < 4) {
      game.players[id] = {
        color: game.getPlayerColor(game.players.count)
      }
      debug('add %s; players: %o', id, game.players);
      return id;
    }else{
      debug('add close %s;', id);
      return false;
    }


  },
  delPlayer: function(id){
    game.players.count--;
    delete(game.players[id]);
    debug('del %s; players: %o', id, game.players);
  },
  getPlayerColor: function (n) {
    return config.get("game:colors")[n];
  }
};

module.exports = game;