Game.Gameover = {
  create: function () {
    Game.Manager.playerEnd();

    this.keySpacebar = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    var gameWaiting = this.add.text(this.world.centerX, this.world.centerY, 'You ' + Game.Players[Game.Player].place, {
      font: "Squada One",
      fontSize: 96,
      fill: '#333'
    });
    gameWaiting.angle = (2 + Math.random() * 5) * (Math.random() > 0.5 ? 1 : -1);
    gameWaiting.anchor.setTo(0.5, 0.5);


    var gameBegin = this.add.text(this.world.centerX, this.world.centerY + 100, 'PRESS SPACEBAR TO START MENU', {
      font: "Squada One",
      fontSize: 35,
      fill: '#333'
    });
    gameBegin.angle = (2 + Math.random() * 5) * (Math.random() > 0.5 ? 1 : -1);
    gameBegin.anchor.setTo(0.5, 0.5);
    var gameBeginTween = this.add.tween(gameBegin);
    gameBeginTween.to({
      angle: -gameBegin.angle
    }, 200 + Math.random() * 200, Phaser.Easing.Linear.None, true, 0, 1000, true);

    var squaresEmitter = this.add.emitter(this.world.centerX, this.world.height + 20, 100);
    squaresEmitter.makeParticles(this.cache.getBitmapData('square'));
    squaresEmitter.maxParticleScale = 1.2;
    squaresEmitter.minParticleScale = 0.2;
    squaresEmitter.setYSpeed(-100, -100);
    squaresEmitter.setXSpeed(-30, 30);
    squaresEmitter.gravity = 0;
    squaresEmitter.width = this.world.width;
    squaresEmitter.minRotation = 0;
    squaresEmitter.maxRotation = 45;
    squaresEmitter.flow(25000, 500);


    this.keySpacebar.onDown.addOnce(function () {
      //this.music.stop();
      this.state.start('Menu');
    }, this);
  }
};
