Game.Blocks = function( opt, state ) {
	var self = this;
	self.state = state;
	self.blockGroup = game.add.group();
	self.blockGroup.enableBody = true;
	self.blockGroup.createMultiple( 300, game.cache.getBitmapData( 'block' ) );
	self.tick = 0;

	self.tracer = {
		y: game.height / 2 - 300,
		yMin: 150,
		yMax: game.height - 100,
		yVariance: self.state.variance,
		h: 500,
		hMin: 300,
		hMax: 700,
		hVariance: self.state.variance
	};

	self.fillScreen( 0, true );
};

Game.Blocks.prototype.update = function() {
	var self = this;
	var xMin = 100,
		xMax = 0;

	self.blockGroup.forEachAlive( function( block ) {
		if( self.state.hasStarted ) {
			block.body.velocity.x = self.state.speed;
		}
		xMin = Math.min( xMin, block.body.x + self.state.blockSize );
		xMax = Math.max( xMax, block.body.x + self.state.blockSize );
	});

	self.blockGroup.forEachAlive( function( block ) {
		if( block.x + block.body.width < 0 ) {
			block.kill();
		}
	});

	self.fillScreen( xMax, false );
};

Game.Blocks.prototype.updateTracer = function() {
	var self = this;

	self.tracer.y += Phaser.Utils.Rand( -self.tracer.yVariance, self.tracer.yVariance );
	self.tracer.y = Math.min( Math.max( self.tracer.yMin, self.tracer.y ), self.tracer.yMax );

	self.tracer.h += Phaser.Utils.Rand( -self.tracer.hVariance, self.tracer.hVariance );
	self.tracer.h = Math.min( Math.max( self.tracer.hMin, self.tracer.h ), self.tracer.hMax );

	if( self.tracer.y + self.tracer.h > self.tracer.yMax ) {
		var halfDiff = ( self.tracer.y + self.tracer.h - self.tracer.yMax ) / 2;
		self.tracer.y -= halfDiff;
		self.tracer.h -= halfDiff;
	}
};

Game.Blocks.prototype.fillScreen = function( width, initial ) {
	var self = this;

	if( initial || self.state.hasStarted ) {

		while( width < game.width + self.state.blockSize - self.state.speed ) {
			self.updateTracer();

			self.tick++;

			var blockTop,
				blockTopY,
				blockTopH,
				blockBot,
				blockBotY,
				blockBotH;

			blockTopY = 0;
			blockTopH = self.tracer.y;
			blockBotY = blockTopH + self.tracer.h;
			blockBotH = game.height - blockBotY;

			newBlockTop = self.createOne( width, blockTopY, self.state.blockSize, blockTopH );
			newBlockBot = self.createOne( width, blockBotY, self.state.blockSize, blockBotH );
			if( !initial ) {
				newBlockTop.body.velocity.x = self.state.speed;
				newBlockBot.body.velocity.x = self.state.speed;
			}

			width += self.state.blockSize;
		}
	}
};

Game.Blocks.prototype.createOne = function( x, y, w, h ) {
	var self = this;
	if( self.blockGroup.countDead() ) {
		var block = self.blockGroup.getFirstDead();
	} else {
		var block = self.blockGroup.create( x, y, game.cache.getBitmapData( 'block' ) );
	}
	block.reset( x, y );
	block.body.allowGravity = false;
	block.body.immovable = true;
	block.scale.x = w+10;
	block.scale.y = h+10;
	return block;
};
