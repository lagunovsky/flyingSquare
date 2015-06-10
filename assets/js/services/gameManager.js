Game.Manager.on('playerConnected', function (player) {
  Game.Player = player;
});

Game.Manager.on('getAllPlayers', function (players) {
  Game.Players = players;
});

Game.Manager.on('start', function () {
  game.state.start('Play');
});

Game.Manager.playerStart = function(){
  Game.Manager.emit('playerStart', Game.Manager.id);
};

Game.Manager.started = function(){
  Game.Manager.emit('started', Game.Manager.id);
};

Game.Manager.reqPosition = function(){
  Game.Manager.emit('reqPosition', Game.Manager.id);
};

Game.Manager.resPosition = function(cb){
  Game.Manager.on('resPosition', function (id) {
    cb(id);
  });
};

Game.Manager.sendingDead = function(){
  Game.Manager.emit('sendingDead', Game.Manager.id);
};

Game.Manager.reqMap = function(height){
  Game.Manager.emit('getMap', height);
};

Game.Manager.on('getMap', function (map) {
  console.log(map);
  Game.Map = map;
});