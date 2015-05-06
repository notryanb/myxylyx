var playState = {

  create: function(){
    // Called after preload. setup game, sprites, etc...

    // Setting up controls
    this.cursor = game.input.keyboard.createCursorKeys();
    
    // Create level
    this.scrollingBackground();

    // Create a player and add it's sprite to the game center with the sprite center anchored.


    // Create particle effect



    // Display score
    this.scoreLabel = game.add.text(30, 30, 'score: 0',
      { font: '18px Verdana', fill: '#000000' })
    game.global.score = 0;

    // Connect sounds to actions


    // Capture keys so the browser doesn't use them for navigation.
    game.input.keyboard.addKeyCapture([Phaser.Keyboard.UP, 
                                       Phaser.Keyboard.DOWN,
                                       Phaser.Keyboard.LEFT,
                                       Phaser.Keyboard.RIGHT]);

    // Add support for WASD
    this.wasd = {
      up: game.input.keyboard.addKey(Phaser.Keyboard.W),
      left: game.input.keyboard.addKey(Phaser.Keyboard.A),
      right: game.input.keyboard.addKey(Phaser.Keyboard.D)
    }


  },

  update: function(){
    // This is called 60/sec & contains game logic.

  },

  movePlayer: function(){
  // Key events go here

  },

  scrollingBackground: function(){
    // Add walls to the game.
    this.background = this.add.tileSprite(0,0,this.game.width, this.game.height, 'spacebg');
    this.background.autoScroll(0,40);

  },

  playerDie: function(){
  // When you get hit...
  },

  startMenu: function(){
    game.state.start('menu');
  },

  addEnemy: function(){
  // Formula for adding a generic enemy.
  }

};
