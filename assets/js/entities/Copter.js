Copter = function (state, player) {
  Phaser.Sprite.call(this, game, 200, game.height / 2, game.cache.getBitmapData(player));
  game.physics.arcade.enableBody(this);
  this.body.allowGravity = true;
  this.body.width = 32;
  this.body.height = 32;
  this.body.gravity.y = 1000;

  this.anchor.setTo(0.5, 0.5);
  this.state = state;
  this.player = player;

  this.createEmitter(this);
  game.add.existing(this);
};

Copter.prototype = Object.create(Phaser.Sprite.prototype);

Copter.prototype.update = function () {
  if (this.player == Game.Player) {
    if (this.state.hasStarted && !this.state.dead) {
      if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        this.body.velocity.y -= 32;
      }
      if (this.body.velocity.y <= -300) {
        this.body.velocity.y = -300;
      }
      this.angle = this.body.velocity.y / 6 - 10;

      Game.Players[Game.Player].position = this.body.y;
      Game.Players[Game.Player].angle = this.angle;
    }
  }
  game.physics.arcade.collide(this, Game.Blocks.blockGroup, this.die);
};

Copter.prototype.createEmitter = function (copter) {
  copter.emitterDark = game.add.emitter(0, 0, 20);
  copter.emitterDark.makeParticles(game.cache.getBitmapData(copter.player));
  copter.emitterDark.minParticleScale = 0.1;
  copter.emitterDark.maxParticleScale = 0.5;
  copter.emitterDark.setYSpeed(-15, 15);
  copter.emitterDark.setXSpeed(-15, 15);
  copter.emitterDark.gravity = -10;
};

Copter.prototype.emit = function (copter) {
  copter.emitterDark.x = copter.x;
  copter.emitterDark.y = copter.y;
  copter.emitterDark.start(true, 2000, null, 100);
  copter.emitterDark.forEachAlive(function (p) {
    p.body.velocity.x += copter.state.speed / 2;
  });
  copter.alpha = 0;
};

Copter.prototype.die = function (copter) {
  copter.emit(copter);
  copter.state.gameOver(copter.player);
};