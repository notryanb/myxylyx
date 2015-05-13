  // Create Bullet Object

  var Bullet = function (game, key) {

      Phaser.Sprite.call(this, game, 0, 0, key);

      this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

      this.anchor.set(0.5);

      this.checkWorldBounds = true;
      this.outOfBoundsKill = true;
      this.exists = false;

      this.tracking = false;
      this.scaleSpeed = 0;

  };

  Bullet.prototype = Object.create(Phaser.Sprite.prototype);
  Bullet.prototype.constructor = Bullet;

  Bullet.prototype.fire = function (x, y, angle, speed, gx, gy) {

      gx = gx || 0;
      gy = gy || 0;

      this.reset(x, y);
      this.scale.set(1);

      this.game.physics.arcade.velocityFromAngle(angle, speed, this.body.velocity);

      this.angle = angle;

      this.body.gravity.set(gx, gy);

  };

  Bullet.prototype.update = function () {

      if (this.tracking)
      {
          this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
      }

      if (this.scaleSpeed > 0)
      {
          this.scale.x += this.scaleSpeed;
          this.scale.y += this.scaleSpeed;
      }

  };

  var Weapon = {};

  ////////////////////////////////////////////////////
  //  A single bullet is fired in front of the ship //
  ////////////////////////////////////////////////////

  Weapon.SingleBullet = function (game) {

      Phaser.Group.call(this, game, game.world, 'Single Bullet', false, true, Phaser.Physics.ARCADE);

      this.nextFire = 1000;
      this.bulletSpeed = 600;
      this.fireRate = 100;

      for (var i = 0; i < 64; i++)
      {
          this.add(new Bullet(game, 'bullet'), true);
      }

      return this;

  };

  Weapon.SingleBullet.prototype = Object.create(Phaser.Group.prototype);
  Weapon.SingleBullet.prototype.constructor = Weapon.SingleBullet;

  Weapon.SingleBullet.prototype.fire = function (source) {

      if (this.game.time.time < this.nextFire) { return; }

      var x = source.x + 10;
      var y = source.y + 10;

      this.getFirstExists(false).fire(x, y, 270, this.bulletSpeed, 0, 0);

      this.nextFire = this.game.time.time + this.fireRate;

  };


var playState = {

  create: function(){
    // Called after preload. setup game, sprites, etc...

    // Setting up controls
    this.cursor = game.input.keyboard.createCursorKeys();
    
    // Create level
    this.scrollingBackground();

    // Create a player and add it's sprite to the game center with the sprite center anchored.
    this.player = game.add.sprite(game.world.centerX,game.world.height-100,'ship');
    this.player.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(this.player); 
    this.player.body.collideWorldBounds = true;

    // Create bullet
    this.singleBullet = new Weapon.SingleBullet(this.game);


    // Display score
    this.scoreLabel = game.add.text(30, 30, 'SCORES!: 0',
      { font: '18px Verdana', fill: '#00ff00' })
    game.global.score = 0;

    // Connect sounds to actions


    // Define Key input
    this.cursors = game.input.keyboard.createCursorKeys();
    this.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);


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

  startMenu: function(){
    game.state.start('menu');
  },

  addEnemy: function(){
  // Formula for adding a generic enemy.
  }

};
