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
  Game.Manager.emit('playerStart', Game.Player);
};

Game.Manager.started = function(){
  Game.Manager.emit('started', Game.Player);
};

Game.Manager.on('getPosition', function () {
  if(!Game.Play.dead){
    Game.Manager.emit('position', {
      id: Game.Player,
      pos: Game.Players[Game.Player].position,
      angle: Game.Players[Game.Player].angle
    });
  }
});

Game.Manager.playerEnd = function(){
  Game.Manager.emit('playerEnd', Game.Player);
};


Game.Manager.sendingDead = function(){
  Game.Manager.emit('sendingDead', Game.Player);
};

Game.Manager.reqMap = function(height){
  Game.Manager.emit('getMap', height);
};

Game.Manager.on('getMap', function (map) {
  Game.Map = map;
});