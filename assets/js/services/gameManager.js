Game.Manager.on('playerConnected', function (player) {
  Game.Player = player;
});

Game.Manager.on('getAllPlayers', function (players) {
  Game.Players = players;
});

Game.Manager.on('start', function () {
  game.state.start('Play');
});

Game.Manager.playerStart = function () {
  Game.Manager.emit('playerStart', Game.Player);
};

Game.Manager.started = function () {
  Game.Manager.emit('started', Game.Player);
};

Game.Manager.on('getCondition', function () {
  if (!Game.Play.dead) {
    if (Game.Players[Game.Player].position && Game.Players[Game.Player].angle) {
      Game.Manager.emit('condition', {
        id: Game.Player,
        pos: Game.Players[Game.Player].position,
        angle: Game.Players[Game.Player].angle
      });
    }
  }
});

Game.Manager.die = function () {
  Game.Manager.emit('die', Game.Player);
};

Game.Manager.on('die', function (player) {
  Game.Play.heroes[player].die();
});

Game.Manager.on('condition', function (condition) {
  if (!Game.Play.dead) {
    Game.Play.updateCopters(condition);
  }
});

Game.Manager.playerEnd = function () {
  Game.Manager.emit('playerEnd', Game.Player);
};


Game.Manager.sendingDead = function () {
  Game.Manager.emit('sendingDead', Game.Player);
};

Game.Manager.reqMap = function (height) {
  Game.Manager.emit('getMap', height);
};

Game.Manager.on('getMap', function (map) {
  Game.Map = map;
});