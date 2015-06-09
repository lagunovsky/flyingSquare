var Game = {
  Socket: io('localhost:3000'),
  Map: {},
  Players: {},
  PlayersPosition: {},
  Player: ''
};

Game.Boot = {
  init: function () {
    this.game.stage.backgroundColor = '#e2e2e2';
    this.input.maxPointers = 1;
    this.stage.disableVisibilityChange = true;
  },
  preload: function () {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.setScreenSize(true);
    this.load.image('progressBar', '/gfx/progress_bar.png');
    Game.Socket.reqMap(game.height);
  },
  create: function () {
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.state.start('Preloader');
  }
};