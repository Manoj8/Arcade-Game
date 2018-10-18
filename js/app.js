// Enemies our player must avoid
let characters = ['images/char-boy.png', 'images/char-cat-girl.png', 'images/char-horn-girl.png', 'images/char-pink-girl.png', 'images/char-princess-girl.png'];

let objects = ['images/Heart.png', 'images/Key.png', 'images/Star.png', 'images/Selector.png'];

let gems = ['images/Gem Blue.png', 'images/Gem Green.png', 'images/Gem Orange.png'];

function shuffle(array) //Shuffle the list of cards within an array
{
    let currentIndex = array.length - 1,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function time(secs) //to pad 0 in secs
{
    return secs > 9 ? secs : "0" + secs;
}

let set = setInterval(function () //function for time
    {
        sec++;
        second = document.getElementById("seconds").innerHTML = time(sec % 60);
        minute = document.getElementById("minutes").innerHTML = time(parseInt(sec / 60)) + ":";
    }, 1000);


let chars = shuffle(characters);
let objs = shuffle(objects);
let gem = shuffle(gems);
let count = 0;
let count1 = 0;
let scores = 0;
let over = 3;
let removed = "";
let inc = 0;
score();
var Enemy = function (x, y) {
    this.x = x;
    this.y = y;
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = "images/enemy-bug.png";
};

let won = 0;

function random() {
    if (won < 2)
        return Math.floor(Math.random() * 2) + 1;
    if (won >= 2 && won <= 3)
        return Math.floor(Math.random() * 2) + 2.5;
    if (won === 4)
        return Math.floor(Math.random() * 2) + 3.5;
}
let b1 = random(),
    b2 = random(),
    b3 = random();
let bb1, bb2, bb3;
let eneposy;
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function () {


    if (this.x > 600) {
        this.x = -200;
    }
    if ((this.x === -200) || this.x === 0) {
        b1 = random();
        b2 = random();
        b3 = random();
    }
    bb1 = allEnemies[0].x += b1;
    bb2 = allEnemies[1].x += b2;
    bb3 = allEnemies[2].x += b3;
    eneposy = this.y;
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.plays = chars[0];
}

var playposx;
var playposy;

Player.prototype.update = function () {
    playposx = this.x;
    playposy = this.y;
    if (this.x > 400) {
        this.x = 400;
    } else if (this.x < 0) {
        this.x = 0;
    } else if (this.y > 350) {
        this.y = 400;
    } else if (this.y < 0) {
        if (won < 4) {
            this.x = 200;
            this.y = 400;
            won += 1;
            setTimeout(cls, 1000);
            nxtstg.style.position = "relative";
            nxtstg.style.left = (630) + "px";
            nxtstg.style.top = (-830) + "px";
            nxtstg.style.visibility = "visible";

            function cls() {
                nxtstg.style.visibility = "hidden"
            }
            clearTimeout();
            if (won === 1) {
                this.plays = chars[1];
                scores += 50;
            }
            if (won === 2) {
                this.plays = chars[2];
                scores += 50;
            }
            if (won === 3) {
                this.plays = chars[3];
                scores += 50
            }
            if (won === 4) {
                this.plays = chars[4];
                scores += 50
            }
        } else if (won === 4) {

            this.y = 52;
            if (this.y === 52 && this.x === 400) {
                won++;
                finish();
                this.x = -100;
            }
        }
    }
    if (((playposx >= (bb1 - 72) && playposx <= (bb1 + 77)) && (playposy === eneposy + 165)) || ((playposx >= (bb2 - 72) && playposx <= (bb2 + 77)) && (playposy === eneposy + 78)) || ((playposx >= (bb3 - 72) && playposx <= (bb3 + 77)) && (playposy === eneposy - 9))) {
        over -= 1;
        this.x = 200;
        this.y = 400;
        setTimeout(close, 1000);
        out.style.position = "relative";
        out.style.left = (this.x + 550) + "px";
        out.style.top = (this.y - 815) + "px";
        out.style.visibility = "visible";

        function close() {
            out.style.visibility = "hidden"
        }
        if (scores - 50 >= 0) {
            scores -= 50;
        }
        if (over === 0)
            gameover();
        hearts();
    }
    clearTimeout();
};

Player.prototype.handleInput = function (key) {
    if (key == "up") {
        this.y -= 87;
    } else if (key == "down") {
        this.y += 87;
    } else if (key == "left") {
        this.x -= 100;
    } else if (key == "right") {
        this.x += 100;
    }
};

var player = new Player(200, 360);
var enemypos = [0, 0, 0];
var allEnemies = [];
var enemy;
let position = 0;
enemypos.forEach(function () {
    enemy = new Enemy(0, 225 + position);
    allEnemies.push(enemy);
    position = position - 82;
});

var ob = function (x, y) {
    this.x = x;
    this.y = y;
    this.obimg = objs[0];
};
ob.prototype.render = function () {
    ctx.drawImage(Resources.get(this.obimg), this.x, this.y);
};

ob.prototype.update = function () {
    if ((playposx == this.x - 2) && (playposy == this.y - 16)) {
        this.x = -100;
        scores += 100;

    }

    if (won === 1 && count === 0) {


        this.obimg = objs[1];
        this.x = 0;
        this.y = 70;

        if ((playposx === this.x) && (playposy === this.y - 18)) {
            this.x = -100;
            this.y = -100;
            scores += 100;
            count += 1;
        }
    }


    if (won === 2 && count <= 1) {
        let flag = 0;
        this.obimg = objs[2];
        this.x = 100;
        this.y = 235;
        if ((playposx === this.x) && (playposy === this.y - 9)) {
            this.x = -100;

            flag = 1;
            count++;
            scores += 50;
        }
    }

    if (won === 3 && count <= 2) {
        this.obimg = objs[1];
        this.x = 100;
        this.y = 155;
        if ((playposx == this.x) && (playposy == this.y - 16)) {
            this.x = -100;
            scores += 100;
            count++;
        }
    }

    if (won == 4) {
        this.obimg = objs[3];
        this.x = 403;
        this.y = 43;
        if ((playposx == this.x - 3) && (playposy == this.y + 9)) {

        }
    }
    if (this.obimg === "images/Heart.png" && this.x === -100 && inc === 0 && over <= 2) {
        let add = document.querySelector("." + removed);
        add.style.visibility = "visible";
        over += 1;
        inc = 1;
    }
    score();
};

var ob1 = new ob(202, 155);

var Gem = function (x, y) {
    this.x = x;
    this.y = y;
    this.gemimg = gem[0];
};
Gem.prototype.render = function () {
    ctx.drawImage(Resources.get(this.gemimg), this.x, this.y);
};

Gem.prototype.update = function () {

    if ((playposx == this.x) && (playposy == this.y - 1)) {
        this.x = -100;
        scores += 100;
    }

    if (won === 1) {
        this.x = -100;

    }
    if (won === 2 && count1 === 0) {
        this.gemimg = gem[1];
        this.x = 303;
        this.y = 55;
        if ((playposx === this.x - 3) && (playposy === this.y - 3)) {
            this.x = -100;
            this.y = -100;
            count1++;
            scores += 100;
        }
    }

    if (won === 3) {
        this.x = -100;
    }

    if (won === 4 && count1 <= 1) {
        this.gemimg = gem[2];
        this.x = 100;
        this.y = 140;
        if ((playposx == this.x) && (playposy == this.y - 1)) {
            this.x = -200;
            count1++;
        }
    }
    score();
};


var Gem1 = new Gem(0, 140);

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.plays), this.x, this.y);
};


document.write('<p class="ouch">ouch!:(</p>');
var out = document.querySelector(".ouch");
out.style.visibility = "hidden";


document.write('<p class="stage">next stage!:)</p>');
var nxtstg = document.querySelector(".stage");
nxtstg.style.visibility = "hidden";

function score() {
    var sc = document.querySelector("#score");
    sc.innerHTML = scores;
}

let sec = 0;
let second;
let minute;



document.addEventListener("keyup", function (e) {
    var allowedKeys = {
        37: "left",
        38: "up",
        39: "right",
        40: "down"
    };
    player.handleInput(allowedKeys[e.keyCode]);
});



hide(); //function that hides the popup initially

function hide() //hide function call
{
    let hid = document.querySelector("#popup");
    hid.style.visibility = "hidden";
    let game = document.querySelector("#Over");
    game.style.visibility = "hidden";
}

function hearts() //displays the stars based on the moves
{
    const h1 = document.querySelector('.first');
    const h2 = document.querySelector('.second');
    const h3 = document.querySelector('.third');
    if (over === 2) {
        h3.style.visibility = "hidden";
        removed = "third";
    }
    if (over === 1) {
        h2.style.visibility = "hidden";
        removed = "second";
    }
    if (over === 0) {
        h1.style.visibility = "hidden";
    }
}

function finish() //function call when the player has won the game and a popup to display the scores
{
    document.getElementById('total').innerHTML = scores; //displays the total number of moves
    //displays the total number of time taken to finish the game
    document.getElementById("timings").innerHTML = minute + "" + second + " minute :)";
    //displays the stars based on moves    
    let bimg = document.querySelector("body");
    bimg.style.backgroundSize = "100% 39.1%";
    let hide = document.querySelector('.opaque');
    hide.style.visibility = "hidden";
    let h1 = document.querySelector('canvas');
    h1.style.visibility = "hidden";
    let pop = document.querySelector('#popup');
    pop.style.visibility = "visible";
    pop.style.zIndex = 1;
    pop.classList.add("win");
    clearInterval(set); //stops the timer in background when the game is complete
}

function gameover() {
    won = 5;
    let bimg = document.querySelector("body");
    bimg.style.backgroundSize = "100% 50.4%";
    let hide = document.querySelector('.opaque');
    hide.style.visibility = "hidden";
    let h1 = document.querySelector('canvas');
    h1.style.visibility = "hidden";
    let pop = document.querySelector('#Over');
    pop.style.visibility = "visible";
    pop.style.zIndex = 1;
    pop.classList.add("over1");
    clearInterval(set);
}
