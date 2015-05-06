var menuState = {
  create: function(){
    // Add the menu background image
    game.add.image(0, 0, 'background');

    // Display game title
    var nameLabel = game.add.text(game.world.centerX, -50, 'M Y X Y L Y X',
      { font: '70px Geo', fill: '#ffffff' });
    nameLabel.anchor.setTo(0.5, 0.5);
    var tween = game.add.tween(nameLabel).to({y: 80}, 
      1000).easing(Phaser.Easing.Bounce.Out).start();

    // Display the score
    if(!localStorage.getItem('bestScore')){ 
      localStorage.setItem('bestScore', 0); 
    }

    if(game.global.score > localStorage.getItem('bestScore')){
      localStorage.setItem('bestScore', game.global.score);
    }

    var text = 'score: ' + game.global.score + '\nbest score: ' +
      localStorage.getItem('bestScore');
    var scoreLabel = game.add.text(game.world.centerX, game.world.centerY, 
                    'score: ' + text,
                    { font: '25px Verdana', fill: '#ffffff', align: 'center' });
    scoreLabel.anchor.setTo(0.5, 0.5);

    // Menu instructions
    var startLabel = game.add.text(game.world.centerX, game.world.height - 80,
                                  'press the up arrow key to start ',
                                  { font:'25px Verdana',fill:'#ffffff' } );
    startLabel.anchor.setTo(0.5, 0.5);
    var startTween = game.add.tween(startLabel).to({angle: -2},
      500).to({angle: 2}, 500).loop().start();

    // Add a mute button
    this.muteButton = game.add.button(20, 20, 'muteButton', this.toggleSound, this);
    this.muteButton.input.useHandCursor = true;
    if(game.sound.mute){ this.muteButton.frame = 1; }

    // Keyboard input for menu
    var upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    upKey.onDown.addOnce(this.start, this);
  },

  toggleSound: function(){
    game.sound.mute = ! game.sound.mute;
    this.muteButton.frame = game.sound.mute ? 1 : 0;
  },

  start: function(){
    game.state.start('play');
  }

};