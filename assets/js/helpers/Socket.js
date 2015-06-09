Game.Socket.on('playerConnected', function (player) {
  Game.Player = player;
  console.log(player);
});

Game.Socket.on('getAllPlayers', function (players) {
  Game.Players = players;
  console.log(Game.Players);
});