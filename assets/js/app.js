var innerWidth = window.innerWidth;
var innerHeight = window.innerHeight;
var gameRatio = innerWidth / innerHeight;
var game = new Phaser.Game(Math.ceil(800 * gameRatio), 800, Phaser.WebGL, 'gameContainer');

game.global = {};

// List of states
game.state.add('Boot', Game.Boot);
game.state.add('Preloader', Game.Preloader);
game.state.add('Menu', Game.Menu);
game.state.add('Waiting', Game.Waiting);
game.state.add('Play', Game.Play);
game.state.add('Gameover', Game.Gameover);

// Start boot state
game.state.start('Boot');