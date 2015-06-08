Game.Preloader = function (game) {
};

Game.Preloader.prototype = {
    preload: function() {
        var loadingLabel = this.add.text(this.world.centerX, this.world.centerY, 'LOADING...', {
            font: "Squada One",
            fontSize: 200,
            fill: '#333'
        });
        loadingLabel.anchor.setTo(0.5, 0.5);
        this.load.audio( 'menu-music', [ 'assets/audio/menu.mp3', 'assets/audio/menu.ogg' ] );
        this.load.audio( 'background-music', ['assets/audio/background.mp3', 'assets/audio/background.ogg' ] );
        this.load.audio( 'explosion', ['assets/audio/explosion.mp3', 'assets/audio/explosion.ogg' ] );

        var square = this.add.bitmapData( 20, 20 );
	    square.context.fillStyle = '#333';
	    square.context.fillRect( 0, 0, 20, 20 );
	    this.cache.addBitmapData( 'square', square );

        var block = this.add.bitmapData( 1, 1 );
        block.context.fillStyle = '#444';
        block.context.fillRect( 0, 0, 1, 1 );
        this.cache.addBitmapData( 'block', block );
        var block2 = this.add.bitmapData( 1, 1 );
        block2.context.fillStyle = '#959595';
        block2.context.fillRect( 0, 0, 1, 1 );
        this.cache.addBitmapData( 'block2', block2 );
        var block3 = this.add.bitmapData( 1, 1 );
        block3.context.fillStyle = '#262525';
        block3.context.fillRect( 0, 0, 1, 1 );
        this.cache.addBitmapData( 'block3', block3 );

        var copter = this.add.bitmapData( 32, 32 );
        copter.context.fillStyle = '#111';
        copter.context.fillRect( 0, 0, 32, 32 );
        this.cache.addBitmapData( 'hero', copter );

    },

    create: function() {
        this.time.events.add( Phaser.Timer.SECOND* 0.5, function() {
                this.state.start('Menu');
			}, this );
    },

    update: function() {
    }
}
