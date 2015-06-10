var
  io = require('socket.io'),
  game = require('./game.js'),
  debug = require("debug")('gameManager');

var gameManager = function(http, game){
    this.connection = io(http);
    this.connection.on('connection', function (socket) {
      socket.emit('playerConnected', game.addPlayer(socket.id));
      gameManager.connection.emit('getAllPlayers', game.players);

      socket.on('playerStart', function(id){
        debug('req.playerStart');
        if(game.start(id)){
          debug('res.playerStart');
          gameManager.connection.emit('start');
        }
      });

      socket.on('started', function(){
        debug('req.playerStart');
        game.started();
        debug('res.getAllPlayers');
        gameManager.connection.emit('getAllPlayers', game.players);
      });

      socket.on('getMap', function(height){
        debug('req.getMap');
        debug('res.getMap');
        gameManager.connection.emit('getMap', game.getMap(height));
      });

      socket.on('disconnect', function(){
        debug('req.disconnect');
        game.delPlayer(socket.id);
        debug('res.disconnect');
        gameManager.connection.emit('getAllPlayers', game.players);
      });
    });
};

module.exports = function(http, game){
  return gameManager(http, game);
};