var GameConstants = {
  // Game constants will go in here for easy changing.
};

GameConstants.Boot = function (game) {};

GameConstants.Boot.prototype = {

  init: function() {

    // For supporting multi-touch.
    this.input.maxPointers = 1;

    //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
    // this.stage.disableVisibilityChange = true;

    if (this.game.device.desktop) {
      // desktop settings go here
    } else {
      //  Same goes for mobile settings.
      //  In this case we're saying "scale the game, no lower than 480x260 and no higher than 1024x768"
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.setMinMax(480, 260, 1024, 768);
      this.scale.forceLandscape = true;
    }
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
  },

  preload: function () {

    //  Here we load the assets required for our preloader (in this case a loading bar)

    // this.load.image('preloaderBar', 'assets/preloader-bar.png');
    // this.load.image('bullet', 'assets/bullet.png');
    // this.load.spritesheet('greenEnemy', 'assets/enemy.png', 32, 32);
    // this.load.spritesheet('explosion', 'assets/explosion.png', 32, 32);
    // this.load.spritesheet('player', 'assets/player.png', 64, 64);
  },

  create: function () {

    //  By this point the preloader assets have loaded to the cache, we've set the game settings
    //  So now let's start the real preloader going
    this.state.start('Preloader');

  }

};