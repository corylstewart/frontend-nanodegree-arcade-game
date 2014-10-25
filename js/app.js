// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    //select the roe that the enemy is in
    this.row = Math.floor(Math.random()*3) + 1;
    //place the enemy just off the screen
    this.x = -101;
    //place the enemy in the right row
    this.y = this.row*83 - 26;
    //set the speed of the enemy
    this.speed = 150 + Math.random()*Math.random()*300;
    
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
  //if enemy leaves screen create a new enemy else move the enemy
  if (this.x > 505) {
    console.log(allEnemies.indexOf(this));
    allEnemies.pop(allEnemies.indexOf(this));
    allEnemies.push(new Enemy);
  } else {
    this.x += (dt) * this.speed;
  }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  //link the char
  this.sprite = 'images/char-boy.png'
  //set the staring row and column
  this.row = 5;
  this.col = 2;
  //set the location using pxl offsets
  this.x = this.col * 101;
  this.y = this.row * 83;
}

Player.prototype.update = function() {
  //first we need to see if we are in a state of collision
  //set left and right boundaries of player
  var pleft = this.x+20
  var pright = this.x+82;
  //for each enemy check if in state of collision
  allEnemies.forEach(function(enemy) {
    console.log('bah');
    //set the left and right boundaries of the enemy        
    var eleft = enemy.x+2;
    var eright = enemy.x+98;
    //enemy and player are on same row and boundaries collide
    //we are in a state of collision
    if (this.row == enemy.row &&
      ((pleft < eright && pleft > eleft) ||
      (pright > eleft && pright < eright))) {
	console.log('collision');
    }
    if (this.row == enemy.row) {
	console.log('collision');
    }
  });
}

Player.prototype.render = function(dt) {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(key) {
  switch (key) {
    case 'left' :
      if (this.col > 0) {
	this.col--;
      }
      break;
    case 'right' :
      if (this.col < 4) {
	this.col++;
      }
      break;
    case 'up' :
      if (this.row > 0) {
	this.row--;
      }
      break;
    case 'down' :
      if (this.row < 5) {
	this.row++;
      }
      break;
  }
  this.x = this.col*101;
  this.y = this.row*83 - 10;
}
      
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(), new Enemy(), new Enemy()];
var allEnemies = [];
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});