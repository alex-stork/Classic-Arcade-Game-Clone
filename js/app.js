(function() {
    let lives = 5;
    let round = 1;
    let multiplier = 50;
    let roundComplete = false;
    let gameOver = false;

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
            this.speed = newSpeed * multiplier;
        }

        let enemyXleftMax = this.x - 50;
        let enemyXRightMax = this.x + 50;
        let enemyYTopMax = this.y - 50;
        let enemyYBottomMax = this.y + 50;
        //When a user collides with the bug, player loses a life
        if (player.x > enemyXleftMax && player.x < enemyXRightMax && player.y > enemyYTopMax && player.y < enemyYBottomMax) {
            lives--;

            if(lives <= 0) {
                setTimeout(function () {
                    gameOver = true;
                    roundComplete = true;
                    document.getElementById("endGame").style.display = 'block';
                    document.getElementById("statsEndGame").innerHTML = `<h2>You made it to Round ${round} and ran out of lives. Try again!</h2>`
                }, 100)
            } 
            
            else {
                document.querySelector("#lives").innerHTML = `Lives Left: ${lives}`
                player.resetPosition();
            }
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
        lives = 5;
        round = 1;
    };

    Player.prototype.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
    };

    Player.prototype.handleInput = function(direction) {
        if (direction === 'left') { //Prevents player from going off canvas on left side
            if (this.x > 50) {
                this.x -= this.horizontal_move;
            } 
        }

        if (direction === 'right') {
            if (this.x < 400) { //Prevents player from going off canvas on right side
                this.x += this.horizontal_move;
            } 
        }

        if (direction === 'up') {
            if (this.y > 50) {

            this.y -= this.vertical_move;
            }

            if (this.y < 50) {
                setTimeout(function () {
                    roundComplete = true;
                    if(endRound == true && endGame == false) {
                        document.getElementById("endRound").style.display = 'block';
                    }
                    document.getElementById("stats").innerHTML = `<h2>You beat Round ${round} and have ${lives} lives left.</h2>`
                }, 100)
            }
        }

        if (direction === 'down') {
            if (this.y < 400) {
                this.y += this.vertical_move;
            }
        }
    };

    // Now instantiate your objects.
    window.player = new Player();
    let bug1 = new Enemy(-100, 60, (Math.floor(Math.random() * 4 + 1) * 60));
    let bug2 = new Enemy(-100, 140, (Math.floor(Math.random() * 4 + 1) * 60));
    let bug3 = new Enemy(-100, 220, (Math.floor(Math.random() * 4 + 1) * 60));

    // Place all enemy objects in an array called allEnemies
    window.allEnemies = [bug1, bug2, bug3];

        Player.prototype.resetPosition = function () {
            this.x = 202;
            this.y = 404;
        };

    // This listens for key presses and sends the keys to your
    // Player.handleInput() method. You don't need to modify this.
    document.addEventListener('keyup', function(e) {
        if(roundComplete == false && gameOver == false) {
            let allowedKeys = {
                37: 'left',
                38: 'up',
                39: 'right',
                40: 'down',
            };

            player.handleInput(allowedKeys[e.keyCode]);
        }
    });

    //If there are no lives remaining, Enter will reset game, otherwise Enter will go to next round
        addEventListener('keyup', function (e) {
                if (e.keyCode === 13) {
                    if (roundComplete == true && gameOver == false) {
                        document.querySelector("#endRound").style.display = "none";
                        roundComplete = false;
                        player.resetPosition();
                        multiplier += 10;
                        round += 1;
                        document.getElementById("round").innerHTML = `Round ${round}`;
                }
                    else if (gameOver == true) {
                        document.querySelector("#endGame").style.display = "none";
                        player.resetPosition();
                        roundComplete = false;
                        gameOver = false;
                        lives = 5;
                        round = 1;
                        multiplier = 50;
                        document.getElementById("round").innerHTML = `Round ${round}`;
                    }
            }
    });
})()