Game.Copter = function( opt, state ) {
	var self = this;
	self.state = state;
	Phaser.Sprite.call( self, game, 200, game.height / 2, game.cache.getBitmapData( 'hero' ) );
	self.anchor.setTo( 0.5, 0.5 );
	game.physics.arcade.enableBody( self );
	self.body.allowGravity = false;
	self.body.width = 32;
	self.body.height = 32;
	self.body.gravity.y = 1000;
	game.add.existing( self );
};

Game.Copter.prototype = Object.create( Phaser.Sprite.prototype );
Game.Copter.prototype.constructor = Game.Copter;

Game.Copter.prototype.update = function() {
	var self = this;

	if( self.state.hasStarted && !this.state.dead ) {
		if(game.input.keyboard.isDown( Phaser.Keyboard.SPACEBAR )) {
			this.body.velocity.y -= 35;
		}
		if( this.body.velocity.y <= -300 ) {
			this.body.velocity.y = -300;
		}
		self.angle = this.body.velocity.y / 6 -  10;
	}

	game.physics.arcade.collide( self, self.state.blockSets[ 0 ].blockGroup, self.die, null, this);
};

Game.Copter.prototype.die = function() {
    var self = this;
	if( !this.state.dead ) {
        self.state.emitterDark.x = this.x;
		self.state.emitterDark.y = this.y;
		self.state.emitterDark.start( true, 2000, null, 100 );
		self.state.emitterDark.forEachAlive(function(p){
            	p.body.velocity.x += self.state.speed / 2;
		});
        		this.alpha = 0;
		this.state.gameover();
	}
};
