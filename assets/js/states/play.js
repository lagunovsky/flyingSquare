Game.Play = function (game) {

};

Game.Play.prototype = {
    create: function () {
        this.tick = 0;
        this.gameMusic = this.add.audio ( 'background-music', 0.5, true);
        this.explosion = this.add.audio ('explosion', 1, false);
        this.keySpacebar = game.input.keyboard.addKey( Phaser.Keyboard.SPACEBAR );
        this.keySpacebar.onDown.add( this.startGame, this );

        this.readyToPlay = false;
        this.hasStarted = false;
        this.dead = false;

        this.speed = -500;
        this.speedInterval = 200;
        this.speedGain = -50;
        this.speedMin = -5000;

        this.variance = 0;
        this.varianceInterval = 200;
        this.varianceGain = 5;
        this.varianceMax = 150;

        this.blockSize = 20;

        this.createBlockSets();
        this.scoreStyle = { font: '40px Squada One', fill: '#fff', align: 'center' };
	    this.textScore = game.add.text( game.width/2, game.height / 2 - 320, 'SCORE: 0', this.scoreStyle );
        this.textScore.anchor.set(0.5, 0.5);
        if( this.game.device.localStorage ) {
            if( localStorage.bestScoreCurvy ) {
                this.bestScore = localStorage.bestScoreCurvy;
            } else {
                localStorage.bestScoreCurvy = 0;
                this.bestScore = 0;
            }
            this.textBest = game.add.text( game.width/2, game.height / 2 + 340, 'BEST: ' + this.bestScore, this.scoreStyle );
            this.textBest.anchor.set(0.5, 0.5);
        }

        this.readyToPlay = true;

    this.emitterDark = game.add.emitter( 0, 0, 1000 );
	this.emitterDark.makeParticles( game.cache.getBitmapData( 'square' ) );
	this.emitterDark.minParticleScale = 0.1;
	this.emitterDark.maxParticleScale = 0.5;
	this.emitterDark.setYSpeed(-15, 15 );
	this.emitterDark.setXSpeed( -15, 15 );
	this.emitterDark.gravity = -10;

        this.hero = new Game.Copter( {}, this );

    },
    update: function () {
        var self = this;
        if( this.hasStarted ) {
            if( this.tick % this.speedInterval === 0 && !this.dead ) {
                if( this.speed > this.speedMin ) {
                    this.speed += this.speedGain;
                }
            } else if( this.dead ) {
                this.speed *= 0.99;
            }

            if( this.tick % this.varianceInterval === 0 ) {
                if( this.variance < this.varianceMax ) {
                    this.variance += this.varianceGain;
                    this.blockSets[ 0 ].tracer.yVariance = this.variance;
                    this.blockSets[ 0 ].tracer.hVariance = this.variance;
                }
            }

            this.blockSets.forEach( function( blockSet ) {
                blockSet.update();
            });

            this.textScore.setText( 'SCORE: ' + this.tick );
            if( this.game.device.localStorage ) {
                this.textBest.setText( 'BEST: ' + Math.max( this.tick, this.bestScore  ) );
            }

            self.emitterDark.forEachAlive(function(p){
			p.alpha= p.lifespan / self.emitterDark.lifespan;
		});

            if( !this.dead ) {
                this.tick++;
            }
        }

    },
    shutdown: function() {
        this.blockSets[ 0 ].blockGroup.destroy();
        this.blockSets[ 0 ].blockGroup = null;
        this.blockSets.length = 0;
        this.blockSets = null;

        this.hero.destroy();
        this.hero = null;
    },
    startGame: function() {
        if( !this.hasStarted && this.readyToPlay ) {
            this.hasStarted = true;
            this.gameMusic.play();
            this.hero.body.allowGravity = true;
	   }
    },
    createBlockSets: function() {
        this.blockSets = [];
        var blockSize = 20;
        this.blockSets.push( new Game.Blocks({

        }, this ));
    },
    gameover: function() {
        var self = this;
        if( !this.dead ) {
            this.dead = true;
            this.explosion.play();
            this.gameMusic.stop();
            if( this.tick > this.bestScore ) {
			 localStorage.bestScoreCurvy = this.tick;
		}

              game.time.events.add( Phaser.Timer.SECOND* 1.5, function() {
                    game.state.start( 'Play' );
                }, self );
        }
    }

};
