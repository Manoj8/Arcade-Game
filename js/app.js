let characters = ['images/char-boy.png', 'images/char-cat-girl.png', 'images/char-horn-girl.png',                       'images/char-pink-girl.png', 'images/char-princess-girl.png'];//different characters

let objects = ['images/Heart.png', 'images/Key.png', 'images/Star.png', 'images/Selector.png'];
              //different objects that can be collected by player
let gems = ['images/Gem Blue.png', 'images/Gem Green.png', 'images/Gem Orange.png'];
           //different gem that can be collected by player

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

let set = setInterval(function () //function to display time
{
        sec++;
        second = document.getElementById("seconds").innerHTML = time(sec % 60);
        minute = document.getElementById("minutes").innerHTML = time(parseInt(sec / 60)) + ":";
}, 1000);


let chars = shuffle(characters); //shuffles the characters  
let objs = shuffle(objects); //shuffles different objects
let gem = shuffle(gems); //shuffles different gem
let count = 0,
    count1 = 0,
    scores = 0,
    over = 3,
    removed = "",
    inc = 0,
    won = 0,
    b1 = random(),
    b2 = random(),
    b3 = random(),
    bb1, bb2, bb3, eneposy,playposx,playposy;

score();

var Enemy = function (x, y) //Enemy class
{
    this.x = x;
    this.y = y;
    this.sprite = "images/enemy-bug.png"; //sprite consists of enemy image 
};

function random()   //generates speed of the enemy
{
    let speed = Math.floor(Math.random() * 2);
    if (won < 2)
        return speed + 1.5;
    if (won >= 2 && won <= 3)
        return speed + 2.5;
    if (won === 4)
        return speed + 3.5;
}


Enemy.prototype.update = function () // Update the enemy's position, required method for game
{
    if (this.x > 600) {  //resets enemy's position 
        this.x = -200;
    }
    
    if ((this.x === -200) || this.x === 0) {  //sets speed of enemy
        b1 = random();
        b2 = random();
        b3 = random();
    }
    bb1 = allEnemies[0].x += b1;
    bb2 = allEnemies[1].x += b2;
    bb3 = allEnemies[2].x += b3;
    eneposy = this.y;
};

Enemy.prototype.render = function ()  //draws the enemy on screen
{
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

let Player = function (x, y)  //player class
{
    this.x = x;
    this.y = y;
    this.plays = chars[0];  //character that is set
}

Player.prototype.render = function () //draws the character
{
    ctx.drawImage(Resources.get(this.plays), this.x, this.y);
};

Player.prototype.update = function () //ensures player doesn't go out of page 
{
    playposx = this.x;
    playposy = this.y;
    if (this.x > 400) 
        this.x = 400; 
    else if (this.x < 0) 
        this.x = 0;
    else if (this.y > 350) 
        this.y = 400;
    else if (this.y < 0) 
    {
        //resets player to starting position after completing the stage
        if (won < 4) 
        {
            this.x = 200;
            this.y = 400;
            won += 1;
            
            setTimeout(cls, 1000);
            
            nxtstg.style.position = "relative";
            nxtstg.style.left = (630) + "px";
            nxtstg.style.top = (-830) + "px";
            nxtstg.style.visibility = "visible";

            function cls()
            {
                nxtstg.style.visibility = "hidden"
            }
            clearTimeout();
            //sets different in each stage
            if(won<chars.length)
            {
                this.plays=chars[won];
                scores+=50;
            }
        }
        //player winning
        else if (won === 4) 
        {
            this.y = 52;
            if (this.y === 52 && this.x === 400) 
            {
                won++;
                scores+=100;
                finish();
                this.x = -100;
            }
        }
    }
    //if enemy and player collider
    if (((playposx >= (bb1 - 72) && playposx <= (bb1 + 77)) && (playposy === eneposy + 165)) || ((playposx >= (bb2 - 72) && playposx <= (bb2 + 77)) && (playposy === eneposy + 78)) || ((playposx >= (bb3 - 72) && playposx <= (bb3 + 77)) && (playposy === eneposy - 9))) 
    {
        over -= 1;
        if (over === 0)
        {   
            gameover();
        }
        
        this.x = 200;
        this.y = 400;
        
        setTimeout(close, 1000);
        
        if(won<=4)
        {
            out.style.position = "relative";
            out.style.left = (this.x + 550) + "px";
            out.style.top = (this.y - 815) + "px";
            out.style.visibility = "visible";
        }
        
        function close() 
        {
            out.style.visibility = "hidden"
        }
        
        if (scores - 50 >= 0)
            scores -= 50;
        
        hearts();
    }
    clearTimeout();
};

//Player's movement
Player.prototype.handleInput = function (key) 
{
    if (key == "up")
        this.y -= 87;
    else if (key == "down")
        this.y += 87;
    else if (key == "left")
        this.x -= 100;
    else if (key == "right")
        this.x += 100;
};

let player = new Player(200, 360);
let enemypos = [0, 82, 164];
var allEnemies = [];
let enemy;

//display enemies
enemypos.forEach(function (ypos)
{
    enemy = new Enemy(0, 225 - ypos);
    allEnemies.push(enemy);
});

var Ob = function (x, y) //objects class
{
    this.x = x;
    this.y = y;
    this.obimg = objs[0];
};

Ob.prototype.render = function () //draw an object
{
    ctx.drawImage(Resources.get(this.obimg), this.x, this.y);
};

//checks whether player has collected the objects and sets the score
Ob.prototype.update = function () 
{
    if ((playposx == this.x - 2) && (playposy == this.y - 16)) 
    {
        this.x = -100;
        scores += 100;
    }

    if (won === 1 && count === 0)
    {
        this.obimg = objs[1];
        this.x = 0;
        this.y = 70;

        if ((playposx === this.x) && (playposy === this.y - 18)) 
        {
            this.x = -100;
            scores += 100;
            count += 1;
        }
    }

    if (won === 2 && count <= 1) 
    {
        this.obimg = objs[2];
        this.x = 100;
        this.y = 235;
        if ((playposx === this.x) && (playposy === this.y - 9))
        {
            this.x = -100;
            count++;
            scores += 50;
        }
    }

    if (won === 3 && count <= 2) 
    {
        this.obimg = objs[1];
        this.x = 100;
        this.y = 155;
        if ((playposx == this.x) && (playposy == this.y - 16)) {
            this.x = -100;
            scores += 50;
            count++;
        }
    }

    if (won == 4)
    {
        this.obimg = objs[3];
        this.x = 403;
        this.y = 43;
        if ((playposx == this.x - 3) && (playposy == this.y + 9)) {

        }
    }
    
    //increases life when heart is picked
    if (this.obimg === "images/Heart.png" && this.x === -100 && inc === 0 && over <= 2) 
    {
        let add = document.querySelector("." + removed);
        add.style.visibility = "visible";
        over += 1;
        inc = 1;
        console.log("hh");
    }
    score();
};

var ob1 = new Ob(202, 155); 

var Gem = function (x, y)  //gem class
{
    this.x = x;
    this.y = y;
    this.gemimg = gem[0];
};

Gem.prototype.render = function ()  //draws the gem
{
    ctx.drawImage(Resources.get(this.gemimg), this.x, this.y);
};

//When player collects the gem
Gem.prototype.update = function () 
{
    if ((playposx == this.x) && (playposy == this.y - 1)) 
    {
        this.x = -100;
        scores += 100;
    }

    if (won === 1)
        this.x = -100;

    if (won === 2 && count1 === 0) 
    {
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

    if (won === 3)
        this.x = -100;

    if (won === 4 && count1 <= 1) 
    {
        this.gemimg = gem[2];
        this.x = 100;
        this.y = 140;
        if ((playposx == this.x) && (playposy == this.y - 1)) 
        {
            this.x = -200;
            count1++;
        }
    }
    score();
};

var Gem1 = new Gem(0, 140);

//message to be shown when player collides with enemy
document.write('<p class="ouch">ouch!:(</p>');
var out = document.querySelector(".ouch");
out.style.visibility = "hidden";

//display message when player reaches next stage 
document.write('<p class="stage">next stage!:)</p>');
var nxtstg = document.querySelector(".stage");
nxtstg.style.visibility = "hidden";

function score()  //displays the score
{
   let sc = document.querySelector("#score");
    sc.innerHTML = scores;
}

let sec = 0;
let second;
let minute;

document.addEventListener("keyup", function (e) //assigning arrow keys for player movement
{
   let allowedKeys = 
    {
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

function hearts() //displays remaining life
{
    const h1 = document.querySelector('.first');
    const h2 = document.querySelector('.second');
    const h3 = document.querySelector('.third');
    //removes heart if player touches 
    if (over === 2)
    {
        h3.style.visibility = "hidden";
        removed = "third";
    }
    if (over === 1)
    {
        h2.style.visibility = "hidden";
        removed = "second";
    }
    if (over === 0)
        h1.style.visibility = "hidden";
}

function finish() //function call when the player has won the game and a popup to display the scores
{
    over=5;
    document.getElementById('total').innerHTML = scores; //displays the score
    //displays the total number of time taken to finish the game
    document.getElementById("timings").innerHTML = minute + "" + second + " minute ";
    //resizes the background image   
    let bimg = document.querySelector("body");
    bimg.style.backgroundSize = "100% 37.3%";
    //removes background and displays the modal
    let hide = document.querySelector('.opaque');
    hide.style.visibility = "hidden";
   let hrt = document.querySelector(".third");
    hrt.style.visibility = "hidden";
    let h1 = document.querySelector('canvas');
    h1.style.visibility = "hidden";
    //displays the modal
    let pop = document.querySelector('#popup');
    pop.style.visibility = "visible";
    pop.style.zIndex = 1;
    pop.classList.add("win");
    clearInterval(set); //stops the timer in background when the game is completed
}

function gameover()
{
    won = 5;
    //sets the size of the background image
    let bimg = document.querySelector("body");
    bimg.style.backgroundSize = "100% 47.8%";
    //removes background and displays the modal
    let hide = document.querySelector('.opaque');
    hide.style.visibility = "hidden";
    let h1 = document.querySelector('canvas');
    h1.style.visibility = "hidden";
    //displays the modal
    let pop = document.querySelector('#Over');
    pop.style.visibility = "visible";
    pop.style.zIndex = 1;
    pop.classList.add("over1");
    clearInterval(set);//stops the timer in background when the game is completed
}
