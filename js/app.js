(function() {

// Enemies our player must avoid
    var Enemy = function Enemy(x, y, speed) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = 'images/enemy-bug.png';
    };
    
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    Enemy.prototype.update = function(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += this.speed * dt;
        if (this.x > 505) {
            this.x = -100;
            let newSpeed = Math.floor(Math.random() * 4 + 1);
            this.speed = newSpeed * 60;
        }

        let enemyXleftMax = this.x - 70;
        let enemyXRightMax = this.x + 70;
        let enemyYTopMax = this.y - 60;
        let enemyYBottomMax = this.y + 60;
        if (player.x > enemyXleftMax && player.x < enemyXRightMax && player.y > enemyYTopMax && player.y < enemyYBottomMax) {
            player.resetPosition();
        }
    };
    
    // Draw the enemy on the screen, required method for game
    Enemy.prototype.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // Place the player object in a variable called player
    const Player = function Player() {
        this.sprite = 'images/char-boy.png';
        this.x = 202;
        this.y = 404;
        this.horizontal_move = 101;
        this.vertical_move = 83;
    };

    Player.prototype.resetPosition = function() {
        this.x = 202;
        this.y = 404;
    };

    Player.prototype.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
    };

    Player.prototype.handleInput = function(direction) {
        if (direction === 'left') { //Prevents player from going off canvas on left side
            if (this.x >= 50) {
                this.x -= this.horizontal_move;
            } 
        }
        if (direction === 'right') {
            if (this.x <= 400) { //Prevents player from going off canvas on right side
                this.x += this.horizontal_move;
            } 
        }
        if (direction === 'up') {
            if (this.y < 100) {
                player.resetPosition();
            }
            this.y -= this.vertical_move;
        }
        if (direction === 'down') {
            this.y += this.vertical_move;
        }
    };

    // Now instantiate your objects.
    window.player = new Player();
    let bug1 = new Enemy(-80, 60 + 80 * 0, (Math.floor(Math.random() * 4 + 1) * 60));
    let bug2 = new Enemy(-80, 60 + 80 * 1, (Math.floor(Math.random() * 4 + 1) * 60));
    let bug3 = new Enemy(-80, 60 + 80 * 2, (Math.floor(Math.random() * 4 + 1) * 60));

    // Place all enemy objects in an array called allEnemies
    window.allEnemies = [bug1, bug2, bug3];


    // This listens for key presses and sends the keys to your
    // Player.handleInput() method. You don't need to modify this.
    document.addEventListener('keyup', function(e) {
        let allowedKeys = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down',
        };

        player.handleInput(allowedKeys[e.keyCode]);
    });

})()