var Game = {};

Game.Boot = {
    init: function () {
        this.game.stage.backgroundColor = '#e2e2e2';
        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true;
    },
    preload: function() {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.setScreenSize(true);
        this.load.image('progressBar', '/gfx/progress_bar.png');
    },
    create: function() {
        this.physics.startSystem( Phaser.Physics.ARCADE );
        this.state.start( 'Preloader' );
    }


};
