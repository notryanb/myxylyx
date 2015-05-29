// Create Enemy Object

var Enemy = function (game, key) {
  Phaser.Sprite.call(this, game, 0, 0, key);

  this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
  this.anchor.setTo(0.5,0.5);
  this.exists = false;
  this.scaleSpeed = 0;

};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.spawn = function (x, y, angle, speed, gx, gy) {

    gx = gx || 0;
    gy = gy || 0;

    this.reset(x, y);
    this.scale.set(1);

    this.game.physics.arcade.velocityFromAngle(angle, speed, this.body.velocity);

    this.angle = angle;

    this.body.gravity.set(gx, gy);

};

////////////////////////////////////////////////////
//         Create a basic type of enemy          //
////////////////////////////////////////////////////
var EnemyType = {};

EnemyType.Grunt = function (game) {
  Phaser.Group.call(this, game, game.world, 'enemy', false, true, Phaser.Physics.ARCADE);

  this.nextSpawn = 0;
  this.enemySpeed = 150;
  this.spawnRate = 1000;

  for (var i = 0; i < 15; i++) {
    this.add(new Enemy(this.game, 'enemy'), true)
  }
  return this;
};

EnemyType.Grunt.prototype = Object.create(Phaser.Group.prototype);
EnemyType.Grunt.prototype.constructor = EnemyType.Grunt;

EnemyType.Grunt.prototype.spawn = function (source) {

    if (this.game.time.time < this.nextSpawn) { return; }

    var x = source.x + 50;
    var y = source.y + 50;

    this.getFirstExists(false).spawn(x, y, 90, this.enemySpeed, 50, 50);

    this.nextSpawn = this.game.time.time + this.spawnRate;

};



  
var playState = {

  create: function(){

    // Setting up controls
    this.cursors = game.input.keyboard.createCursorKeys();

    // Capture keys so the browser does not use them
    this.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);
    
    // Create level with scrolling BG
    this.scrollingBackground();

    // Create bullets
    this.singleBullet = new Weapon.SingleBullet(this.game);

    // Create a player and add it's sprite to the game center with the sprite center anchored.
    this.player = game.add.sprite(game.world.centerX,game.world.height-100,'ship');
    this.player.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(this.player); 
    this.player.body.collideWorldBounds = true;


    // Create Enemy
    this.enemy = new EnemyType.Grunt(this.game);
    this.enemy.spawn(this.game);
    this.enemy.spawn(this.game);
    this.enemy.spawn(this.game);
    this.enemy.spawn(this.game);
    


    // Display score
    this.scoreLabel = game.add.text(30, 30, 'SCORES!: 0',
      { font: '18px Verdana', fill: '#00ff00' })
    game.global.score = 0;

    // Connect sounds to actions





  },

  update: function(){
    // This is called 60/sec & contains game logic.
    this.movePlayer();
  },

  movePlayer: function(){
  // Key events go here

        this.speed = 300;
        this.player.body.velocity.set(0);

        if (this.cursors.left.isDown) {
            this.player.body.velocity.x = -this.speed;
        }
        else if (this.cursors.right.isDown) {
            this.player.body.velocity.x = this.speed;
        }

        if (this.cursors.up.isDown) {
            this.player.body.velocity.y = -this.speed;
        }
        else if (this.cursors.down.isDown) {
            this.player.body.velocity.y = this.speed;
        }

        if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            this.singleBullet.fire(this.player);
        }
  },

  scrollingBackground: function(){
    // Add walls to the game.
    this.background = this.add.tileSprite(0,0,this.game.width, this.game.height, 'spacebg');
    this.background.autoScroll(0,40);

  },

  playerDie: function(){
  // When you get hit...
  },

  // Call this when game over
  startMenu: function(){
    game.state.start('menu');
  },

  addEnemy: function(){
  // Formula for adding a generic enemy.
  }

};
