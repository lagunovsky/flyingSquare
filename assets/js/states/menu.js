Game.Menu = {
  create: function () {
    this.music = this.add.audio('menu-music', 0.5, true);
    //this.music.play();
    this.keySpacebar = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    var gameName = this.add.text(this.world.centerX, 0, 'FlyingSquare!', {
      font: "Squada One",
      fontSize: 100,
      fill: '#333'
    });
    gameName.anchor.setTo(0.5, 0.5);
    var gameNameTween = this.add.tween(gameName);
    gameNameTween.to({
      y: this.world.centerY - 200
    }, 1000).easing(Phaser.Easing.Bounce.Out).start();


    var gamePlayers = this.add.text(this.world.centerX, 0, 'Players:', {
      font: "Squada One",
      fontSize: 30,
      fill: '#333'
    });
    gamePlayers.anchor.setTo(0.5, 0.5);
    var gamePlayersTween = this.add.tween(gamePlayers);
    gamePlayersTween.to({
      y: this.world.centerY - 80
    }, 1000).easing(Phaser.Easing.Bounce.Out).start();

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

    Game.Menu.countUser = Game.Players.count;
    Game.Menu.players = this.add.graphics(0, 0);
    Game.Menu.flags = {
      identifier: true,
      message: true
    };
    Game.Menu.renderConnectedUsers();
    Game.Menu.renderStartMessage();

    this.keySpacebar.onDown.addOnce(function () {
      //this.music.stop();
      Game.Manager.playerStart();
      this.state.start('Waiting');
    }, this);
  },
  update: function () {
    if (Game.Menu.countUser != Game.Players.count) {
      Game.Menu.countUser = Game.Players.count;
      Game.Menu.renderConnectedUsers();
    }
  },
  renderConnectedUsers: function () {
    var indent = 0;
    var count = 0;

    Game.Menu.players.clear();
    for (var playerID in Game.Players) {
      if (playerID != 'count') {
        var playerColor = Phaser.Color.hexToColor(Game.Players[playerID].color);
        playerColor = Phaser.Color.getColor(playerColor.r, playerColor.g, playerColor.b);
        var r = 40;
        if (playerID == Game.Player) {
          r = 55;
        }
        Game.Menu.players.beginFill(playerColor, 1);

        count++;
        indent = count * 60 - 150;
        Game.Menu.players.drawCircle(this.world.centerX + indent, this.world.centerY, r);

        if (playerID == Game.Player && Game.Menu.flags.identifier) {
          Game.Menu.flags.identifier = false;
          Game.Menu.you = this.add.text(this.world.centerX + indent - 7, this.world.centerY - 15, 'Y', {
            font: "Squada One",
            fontSize: 35,
            fill: '#FFFFFF'
          });
          Game.Menu.you.angle = (2 + Math.random() * 5) * (Math.random() > 0.5 ? 1 : -1);
          Game.Menu.youTween = this.add.tween(Game.Menu.you);
          Game.Menu.youTween.to({
            angle: -Game.Menu.you.angle
          }, 600, Phaser.Easing.Linear.None, true, 0, 2000, true);
        }

        if(!Game.Menu.flags.identifier && playerID == Game.Player){
          Game.Menu.you.position.x = this.world.centerX + indent - 7;
        }

      }
    }
  },

  renderStartMessage: function () {
    var msg = 'PRESS SPACEBAR TO BEGIN';
    if (Game.Player == false) {
      msg = 'ALL SLOTS OCCEPIED';
    }
    if (Game.Menu.flags.message) {
      Game.Menu.flags.message = false;
      var gameBegin = this.add.text(this.world.centerX, this.world.centerY + 100, msg, {
        font: "Squada One",
        fontSize: 40,
        fill: '#333'
      });
      gameBegin.angle = (2 + Math.random() * 5) * (Math.random() > 0.5 ? 1 : -1);
      gameBegin.anchor.setTo(0.5, 0.5);
      var gameBeginTween = this.add.tween(gameBegin);
      gameBeginTween.to({
        angle: -gameBegin.angle
      }, 200 + Math.random() * 200, Phaser.Easing.Linear.None, true, 0, 1000, true);
    }
  }
};
