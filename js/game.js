// Initialize Phaser
var game = new Phaser.Game(480, 640, Phaser. AUTO, 'gameDiv');

// Define Globals
game.global = {
    score: 0
};


// Add the states
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);

// Start the game
game.state.start('boot');