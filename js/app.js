// Enemies our player must avoid 
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random() * 300) + 250;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x  + (dt * this.speed);


    //If enemy leaves screen on the right, reappear on left.
    if(this.x > 700){
      this.x = -100
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y){


  //Note: If you want to change character, must make sure the image is
  //loaded in engine.js under Resources.load
  
  this.sprite = 'images/char-princess-girl.png';
  this.x = x;
  this.y = y;

}

Player.prototype = Object.create(Enemy.prototype);
Player.prototype.constructor = Player;


Player.prototype.update = function(){
 
 //If player makes it across, alert success and reset player:
   if(this.y < -10){
      alert("You made it!!");
      this.reset();
  }

  //If player moves off screen, alert and reset player:
    if(this.y > 400 || this.x < 0 || this.x > 400){
        alert("Don't run away!  I thought we were having fun.");
        this.reset();
  }


}

Player.prototype.reset = function(){
  this.x = 200;
  this.y = 400;

}




Player.prototype.handleInput = function(keyCode){
    if(keyCode === 'left'){
      this.x = this.x - 50;

    }

    if(keyCode === 'up'){
      this.y = this.y - 50;

    }

    if(keyCode === 'right'){
      this.x = this.x + 50;

    }

    if(keyCode === 'down'){
      this.y = this.y + 50;

    }

}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy1 = new Enemy(40, 100);
var enemy2 = new Enemy(30, 200);
var enemy3 = new Enemy(10, 300);
var enemy4 = new Enemy(10, 250);

var allEnemies = [enemy1, enemy2, enemy3, enemy4];

var player = new Player(200, 400);



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


//If player collides with enemy, alert message appears and
//player position resets:


var checkCollisions = function(){
  
  for(var i=0; i< allEnemies.length; i++){
    if(Math.abs(player.x - allEnemies[i].x) < 40 &&
        Math.abs(player.y - allEnemies[i].y) < 40){
        console.log("collision");

      //Alert random message from array of collisionMessages:
        alert(collisionMessages[Math.floor(Math.random() * 6)]);
        player.reset();
    }

  }

}


var collisionMessages = ["Ouch!", "That one really hurt!", "Darn bugs!",
"Do you plan on improving at this?", "Someone needs some motor skills practice.",
  "I'd sure like to make it to that lovely stream some day.",
  "What did I do to you?", "Focus, please!"];








