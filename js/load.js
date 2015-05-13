var loadState = {
  preload: function(){

    // Create the Loading message
    var loadingLabel = game.add.text(game.world.centerX, 150, 'loading...',
      { font: '30px Verdana', fill: '#ffffff' });

    loadingLabel.anchor.setTo(0.5, 0.5);

    // Display the progress Bar
    var progressBar = game.add.sprite(game.world.centerX, 200, 'progressBar');
    progressBar.anchor.setTo(0.5, 0.5);
    game.load.setPreloadSprite(progressBar);

    // Load all of the game assets
    game.load.image('tileset', 'assets/tileset.png');
    game.load.image('bullet', 'assets/bullet.PNG');
    game.load.image('spacebg', 'assets/spaceBG.png');
    game.load.image('ship', 'assets/spiked_ship_small.green.PNG');
    game.load.spritesheet('muteButton','assets/muteButton.png', 28, 22);

    // Load audio files


    // Load menu asset
    game.load.image('background','assets/menu_background.jpg');
  },

  create: function(){
    game.state.start('menu');
  }

};