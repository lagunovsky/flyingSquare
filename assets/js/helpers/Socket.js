Game.Socket.on('playerConnected', function (player) {
  Game.Player = player;
});

Game.Socket.on('getAllPlayers', function (players) {
  Game.Players = players;
});

Game.Socket.on('start', function () {
  game.state.start('Play');
});

Game.Socket.playerStart = function(){
  Game.Socket.emit('playerStart', Game.Socket.id);
};