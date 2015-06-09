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

Game.Socket.started = function(){
  Game.Socket.emit('started', Game.Socket.id);
};

Game.Socket.reqPosition = function(){
  Game.Socket.emit('reqPosition', Game.Socket.id);
};

Game.Socket.resPosition = function(cb){
  Game.Socket.on('resPosition', function (id) {
    cb(id);
  });
};

Game.Socket.sendingDead = function(){
  Game.Socket.emit('sendingDead', Game.Socket.id);
};

Game.Socket.reqMap = function(height){
  Game.Socket.emit('getMap', height);
};

Game.Socket.on('getMap', function (map) {
  console.log(map);
  Game.Map = map;
});