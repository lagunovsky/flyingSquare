var
  config = require("nconf").argv().file({file: 'config.json'}),
  debug = require("debug")('game');

var game = {
  colors: config.get("game:colors"),
  players: {
    count: -1
  },
  addPlayer: function (id) {
    game.players.count++;
    if (game.players.count < 4) {
      game.players[id] = {
        color: game.getPlayerColor(),
        start: false
      };
      debug('add %s; players: %o', id, game.players);
      return id;
    } else {
      debug('add close %s;', id);
      return false;
    }
  },
  delPlayer: function (id) {
    game.players.count--;
    game.colors.push(game.players[id].color);
    delete(game.players[id]);
    debug('del %s; players: %o', id, game.players);
  },
  getPlayerColor: function () {
    return game.colors.pop(game.colors.indexOf());
  },
  start: function (id) {
    game.players[id].start = true;
    debug('start %s; players: %o', id, game.players);
    var flag = true;
    for (var player in game.players) {
      if (player != 'count') {
        if (game.players[player].start == false) {
          flag = false;
          break;
        }
      }
    }
    return flag;
  },
  started: function(){
    for (var player in game.players) {
      game.players[player].start = false;
    }
  },
  restart: function(){

  }
};

module.exports = game;