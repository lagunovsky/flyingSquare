Game.Play = {
  create: function () {
    Game.Manager.started();

    this.tick = 0;
    this.gameMusic = this.add.audio('background-music', 0.5, true);
    this.explosion = this.add.audio('explosion', 1, false);
    this.keySpacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.hasStarted = false;
    this.dead = false;
    this.speed = -250;
    this.speedInterval = 50;
    this.speedGain = -10;
    this.speedMin = -5000;

    this.createBlockSets();
    this.createScope();
    this.createCopters();
    this.startGame();
  },
  update: function () {
    if (this.hasStarted) {
      if (this.tick % this.speedInterval === 0 && !this.dead) {
        if (this.speed > this.speedMin) {
          this.speed += this.speedGain;
        }
      } else if (this.dead) {
        this.speed *= 0.99;
      }

      this.blockSets.forEach(function (blockSet) {
        blockSet.update();
      });
      console.log(this.blockSets);

      this.textScore.setText('SCORE: ' + this.tick);
      if (this.game.device.localStorage) {
        this.textBest.setText('BEST: ' + Math.max(this.tick, this.bestScore));
      }

      if (!this.dead) {
        this.tick++;
      }
    }
  },
  updateCopters: function (condition) {
    if (condition.id != Game.Player) {
        this.heroes[condition.id].position.y = condition.pos;
        this.heroes[condition.id].angle = condition.angle;
    }
  },
  startGame: function () {
    if (!this.hasStarted) {
      this.hasStarted = true;
      this.gameMusic.play();
    }
  },
  createBlockSets: function () {
    this.blockSets = [new Game.Blocks(this)];
  },
  createScope: function () {
    this.scoreStyle = {font: '40px Squada One', fill: '#fff', align: 'center'};
    this.textScore = game.add.text(game.width / 2, game.height / 2 - 320, 'SCORE: 0', this.scoreStyle);
    this.textScore.anchor.set(0.5, 0.5);
    if (this.game.device.localStorage) {
      if (localStorage.bestScoreCurvy) {
        this.bestScore = localStorage.bestScoreCurvy;
      } else {
        localStorage.bestScoreCurvy = 0;
        this.bestScore = 0;
      }
      this.textBest = game.add.text(game.width / 2, game.height / 2 + 340, 'BEST: ' + this.bestScore, this.scoreStyle);
      this.textBest.anchor.set(0.5, 0.5);
    }
  },
  createCopters: function () {
    var copters = {};
    this.heroes = {};
    for (var player in Game.Players) {
      if (player != 'count') {
        copters[player] = this.add.bitmapData(32, 32);
        copters[player].context.fillStyle = Game.Players[player].color;
        copters[player].context.fillRect(0, 0, 32, 32);
        this.cache.addBitmapData(player, copters[player]);
        this.heroes[player] = new Copter(this, player);
      }
    }
  },
  gameOver: function (player) {
    Game.Manager.die();
    this.explosion.play();
    if (Game.Player == player) {
      this.dead = true;
      this.gameMusic.stop();
      if (this.tick > this.bestScore) {
        localStorage.bestScoreCurvy = this.tick;
      }
      game.time.events.add(Phaser.Timer.SECOND, function () {
        game.state.start('Gameover');
      }, self);
    }
  }

};
