var io = require('socket.io');
var game = require('./game.js');

module.exports = function (http) {
  io = io(http);

  io.on('connection', function (socket) {

    socket.emit('playerConnected', game.addPlayer(socket.id));
    io.emit('getAllPlayers', game.players);

    socket.on('playerStart', function(id){
      if(game.start(id)){
        io.emit('start', 'start');
      }
    });

    socket.on('started', function(){
      game.started();
      io.emit('getAllPlayers', game.players);
    });

    socket.on('reqPosition', function(id){
      io.emit('resPosition', id);
    });

    socket.on('getMap', function(height){
      io.emit('getMap', game.getMap(height));
    });


    socket.on('disconnect', function(){
      game.delPlayer(socket.id);
      io.emit('getAllPlayers', game.players);
    });
  });
};