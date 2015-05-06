var playState = {

  create: function(){
    // Called after preload. setup game, sprites, etc...

    // Setting up controls
    this.cursor = game.input.keyboard.createCursorKeys();
    
    // Create a player and add it's sprite to the game center with the sprite center anchored.
    this.player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
    this.player.anchor.setTo(0.5,0.5);
    game.physics.arcade.enable(this.player);
    this.player.body.gravity.y = 500;
    this.player.animations.add('right',[1 ,2], 8, true);
    this.player.animations.add('left', [3,4], 8, true);

    // Create particle effect
    this.emitter = game.add.emitter(0, 0, 15);
    this.emitter.makeParticles('pixel');
    this.emitter.setYSpeed(-150,150);
    this.emitter.setXSpeed(-150,150);
    this.emitter.gravity = 0;

    // Create Enemy group
    // Add the enemies every 2.2 seconds
    // This creates 10 DEAD enemies... they are not rendered.
    this.enemies = game.add.group();
    this.enemies.enableBody = true;
    this.enemies.createMultiple(10, 'enemy');
    this.nextEnemy = 0;

    // Create coin
    this.coin = game.add.sprite(60, 140, 'coin');
    game.physics.arcade.enable(this.coin);
    this.coin.anchor.setTo(0.5, 0.5);

    // Display score
    this.scoreLabel = game.add.text(30, 30, 'score: 0',
      { font: '18px Verdana', fill: '#000000' })
    game.global.score = 0;

    // Connect sounds to actions
    this.jumpSound = game.add.audio('jump');
    this.coinSound = game.add.audio('coin');
    this.deadSound = game.add.audio('dead');

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

    // Collision between player + walls
    game.physics.arcade.collide(this.player, this.layer);

    // Enemy and wall Collision
    game.physics.arcade.collide(this.enemies, this.layer);
    
    // Updates player movement
    this.movePlayer();

    // Player getting coins
    game.physics.arcade.overlap(this.player, this.coin, this.takeCoin, null, this);

    // Enemy and Player Collision
    game.physics.arcade.overlap(this.player, this.enemies, this.playerDie, null, this);

    // Reset the game if player dies
    if (!this.player.inWorld){ this.playerDie(); }

    // Time for spawning nextEnemy
    if (this.nextEnemy < game.time.now){
      var start = 4000, end = 1000, score = 100;
      var delay = Math.max(start - (start-end)*game.global.score/score, end);
      this.addEnemy();
      this.nextEnemy = game.time.now + delay;

    }

  },

  movePlayer: function(){

    if (this.cursor.left.isDown || this.wasd.left.isDown){ 
      this.player.body.velocity.x = -200; 
      this.player.animations.play('left');
    } else if (this.cursor.right.isDown || this.wasd.right.isDown){ 
      this.player.body.velocity.x = 200; 
      this.player.animations.play('right');
    } else { 
      this.player.body.velocity.x = 0; 
      this.player.animations.stop();
      this.player.frame = 0;
    }

    if ((this.cursor.up.isDown || this.wasd.up.isDown) 
      && this.player.body.onFloor()){
      this.jumpSound.play();
      this.player.body.velocity.y = -320;
    }
  },

  createWorld: function(){
    // Add walls to the game.
    this.map = game.add.tilemap('map');
    this.map.addTilesetImage('tileset');

    // Create the layer, by specifying the name of the tiled layer
    // Set the world size to match the size of the layer
    //Enable collisions for the first element of our tileset..blue wall
    this.layer = this.map.createLayer('Tile Layer 1');
    this.layer.resizeWorld();
    this.map.setCollision(1);
  },

  playerDie: function(){
    if (!this.player.alive){ return; }

    this.player.kill();
    this.deadSound.play();
    this.emitter.x = this.player.x;
    this.emitter.y = this.player.y;
    this.emitter.start(true, 600, null, 15);
    game.time.events.add(1000, this.startMenu, this);
  },

  startMenu: function(){
    game.state.start('menu');
  },

  takeCoin: function(){
    this.coin.scale.setTo(0,0);
    game.add.tween(this.coin.scale).to({x:1, y:1}, 300).start();
    game.add.tween(this.player.scale).to({x:1.3, y:1.3}, 
      50).to({x:1, y:1}, 150).start();
    game.global.score += 5;
    this.scoreLabel.text = 'score: ' + game.global.score;

    this.updateCoinPosition();
  },

  updateCoinPosition: function(){

    var coinPosition = [
        {x: 140, y: 60}, {x: 360, y: 60},
        {x: 60, y: 140}, {x: 440, y: 140},
        {x: 130, y: 300}, {x: 370, y: 300},
    ];

    // Remove current coin position from the array
    // so it doesn't appear twice.

    for(var i = 0; i < coinPosition.length; i++){
      if(coinPosition[i].x === this.coin.x){
        coinPosition.splice(i, 1);
      }
    }

    // Randomly select a new position from array
    var newPosition = coinPosition[
    game.rnd.integerInRange(0, coinPosition.length-1)];

    this.coin.reset(newPosition.x, newPosition.y);
  },

  addEnemy: function(){
    var enemy = this.enemies.getFirstDead();

    if(!enemy){ return; } 

    // Initialization of enemy
    enemy.anchor.setTo(0.5, 1);
    enemy.reset(game.world.centerX, 0);
    enemy.body.gravity.y = 500;
    enemy.body.velocity.x = 100 * Phaser.Math.randomSign();
    enemy.body.bounce.x = 1;
    enemy.checkWorldBounds = true;
    enemy.outOfBoundsKill = true;
  }

};
