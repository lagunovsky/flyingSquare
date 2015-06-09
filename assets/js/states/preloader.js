Game.Preloader = {
  preload: function () {
    var loadingLabel = this.add.text(this.world.centerX, this.world.centerY, 'LOADING...', {
      font: "Squada One",
      fontSize: 200,
      fill: '#333'
    });
    loadingLabel.anchor.setTo(0.5, 0.5);
    this.load.audio('menu-music', ['/audio/menu.mp3', '/audio/menu.ogg']);
    this.load.audio('background-music', ['/audio/background.mp3', '/audio/background.ogg']);
    this.load.audio('explosion', ['/audio/explosion.mp3', '/audio/explosion.ogg']);

    var square = this.add.bitmapData(20, 20);
    square.context.fillStyle = '#333';
    square.context.fillRect(0, 0, 20, 20);
    this.cache.addBitmapData('square', square);

    var block = this.add.bitmapData(1, 1);
    block.context.fillStyle = '#444';
    block.context.fillRect(0, 0, 1, 1);
    this.cache.addBitmapData('block', block);
  },

  create: function () {
    this.time.events.add(Phaser.Timer.SECOND * 0.5, function () {
      this.state.start('Menu');
    }, this);
  },

  update: function () {
  }
};
