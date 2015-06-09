var io = require('socket.io');
var game = require('./game.js');

module.exports = function (http) {
  io = io(http);

  io.on('connection', function (socket) {

    socket.emit('playerConnected', game.addPlayer(socket.id));
    io.emit('getAllPlayers', game.players);


    socket.on('disconnect', function(){
      game.delPlayer(socket.id);
    });
  });
};