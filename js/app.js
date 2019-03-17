(function () {
    //Initializing variables necessary to play game and to display stats 
    let lives = 5;
    let round = 1;
    let multiplier = 50;
    let roundComplete = false;
    let gameOver = false;

    var Enemy = function Enemy(x, y, speed) {
        //These are the bugs the player must avoid.
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = 'images/enemy-bug.png';
    };

    Enemy.prototype.update = function (dt) {
        //Movement is multiplied by dt parameter to ensure the game runs at the
        //same speed for all computers.
        // Parameter: dt, a time delta between ticks
        this.x += this.speed * dt;
        //If the enemy passes the end of the screen on the right it's position will 
        //be reset on the left. Speed in which the enemy goes is randomized.
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
            if (lives <= 0) {
                setTimeout(function () {
                    document.querySelector("#lives").innerHTML = "Lives Left: 0";
                    gameOver = true;
                    roundComplete = true;
                    document.getElementById("endGame").style.display = 'block';
                    document.getElementById("statsEndGame").innerHTML = `<h2>You made it to Round ${round} and ran out of lives. Try again!</h2>`
                }, 100)
            } else {
                document.querySelector("#lives").innerHTML = `Lives Left: ${lives}`
                player.resetPosition();
            }
        }
    };

    // Draw the enemy on the screen, required method for game
    Enemy.prototype.render = function () {
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

    Player.prototype.resetPosition = function () {
        this.x = 202;
        this.y = 404;
        lives = 5;
        round = 1;
    };

    Player.prototype.render = function () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
    };

    Player.prototype.handleInput = function (direction) {
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
                roundComplete = true;
                setTimeout(function () {
                    if (roundComplete == true && gameOver == false) {
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

    // Player and enemies instantiated 
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
    document.addEventListener('keyup', function (e) {
        if (roundComplete == false && gameOver == false) {
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
    //At the end of each round, speed multiplier is increased so bugs are faster and
    //round is harder
    addEventListener('keyup', function (e) {
        if (e.keyCode === 13) {
            if (roundComplete == true && gameOver == false) {
                document.querySelector("#endRound").style.display = "none";
                roundComplete = false;
                player.resetPosition();
                multiplier += 10;
                round += 1;
                document.getElementById("round").innerHTML = `Round ${round}`;
                document.querySelector("#lives").innerHTML = `Lives Left: ${lives}`
            } else if (gameOver == true) {
                document.querySelector("#endGame").style.display = "none";
                player.resetPosition();
                roundComplete = false;
                gameOver = false;
                lives = 5;
                round = 1;
                multiplier = 50;
                document.getElementById("round").innerHTML = `Round ${round}`;
                document.querySelector("#lives").innerHTML = `Lives Left: ${lives}`
            }
        }
    });
})()