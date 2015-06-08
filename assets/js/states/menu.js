Game.Menu = function (game) {

};

Game.Menu.prototype = {
    create: function() {
        this.music = this.add.audio( 'menu-music', 0.5, true );
	    this.music.play();
        this.keySpacebar = this.input.keyboard.addKey( Phaser.Keyboard.SPACEBAR );
        var gameName = this.add.text(this.world.centerX, -150, 'CURVY COPTER', {
                font: "Squada One",
                fontSize: 100,
                fill: '#333'
        });
        gameName.anchor.setTo(0.5, 0.5);
        var gameNameTween = this.add.tween(gameName);
        gameNameTween.to({y: this.world.centerY-100}, 1000).easing(Phaser.Easing.Bounce.Out).start();

        var gameBegin = this.add.text(this.world.centerX, this.world.centerY+100, 'PRESS SPACEBAR TO BEGIN', {
            font: "Squada One",
            fontSize: 40,
            fill: '#333'
        });
        gameBegin.angle = (2+Math.random()*5)*(Math.random()>0.5?1:-1);
        gameBegin.anchor.setTo(0.5, 0.5);
        var gameBeginTween = this.add.tween(gameBegin);
        gameBeginTween.to({
            angle: -gameBegin.angle
		},200+Math.random()*200,Phaser.Easing.Linear.None,true,0,1000,true);
        var squaresEmitter = this.add.emitter(this.world.centerX, this.world.height+20, 50);
        squaresEmitter.makeParticles(this.cache.getBitmapData( 'square' ));
        squaresEmitter.maxParticleScale = 1.2;
        squaresEmitter.minParticleScale = 0.2;
        squaresEmitter.setYSpeed(-60, -60);
        squaresEmitter.setXSpeed(-3, 3);
        squaresEmitter.gravity = 0;
        squaresEmitter.width = this.world.width;
        squaresEmitter.minRotation = 0;
        squaresEmitter.maxRotation = 45;
        squaresEmitter.flow(25000, 500);
        this.keySpacebar.onDown.addOnce(function () {
            this.music.stop();
            this.state.start('Play');
        }, this);

    }
};
