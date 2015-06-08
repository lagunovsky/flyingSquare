Phaser.Utils.Rand = function( min, max ) {
	return ( game.rnd.integerInRange( min * 1000, max * 1000 ) / 1000 );
};
