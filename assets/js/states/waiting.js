Game.Waiting = {
  create: function () {
    var gameWaiting = this.add.text(this.world.centerX, this.world.centerY, 'Waiting for start of players', {
      font: "Squada One",
      fontSize: 66,
      fill: '#333'
    });
    gameWaiting.angle = (2 + Math.random() * 5) * (Math.random() > 0.5 ? 1 : -1);
    gameWaiting.anchor.setTo(0.5, 0.5);
    var gameWaitingTween = this.add.tween(gameWaiting);
    gameWaitingTween.to({
      angle: -gameWaiting.angle
    }, 100 + Math.random() * 500, Phaser.Easing.Linear.None, true, 0, 1000, true);

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
  }
};
