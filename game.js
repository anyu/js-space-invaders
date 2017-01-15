/************************************************************************
Setup
************************************************************************/
var canvas = document.getElementById("board");
var context = canvas.getContext("2d");
 
var NUM_ROWS = 10;
var NUM_COLS = 4;

var alienType = ["imgs/alien1_gif.png", "imgs/alien2.png", "imgs/alien3.png", "imgs/alien4.png"];
var invasionSpeed = 0.1;
var shipSpeed = 1;

var alienMobLeftBound = canvas.width/9;
var alienMobRightBound = canvas.width/3;
var changeDirection = false;

var alienMob = [];

for (var i = 0; i < NUM_ROWS; i++) {
    alienMob[i] = new Array();
    for (j = 0; j < NUM_COLS; j++) {
        alienMob[i][j] = j;
    }
}


/************************************************************************
Main game objects
************************************************************************/

var keyPress = {};

var ship = function(x,y) {
    this.height = 22;
    this.width = 52;
    this.x = canvas.width/2 - this.width/2; // start ship in center 
    this.y = y;
    this.color = '#ffffff';
}

ship.prototype.draw = function(x,y) {
    var shipImage = new Image();
    shipImage.src = "imgs/ship.png"
    context.drawImage(shipImage, x, y);
}

var alien = function (x,y,type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.alive = true;
}

alien.prototype.draw = function(x,y,type) {
    var alienImage = new Image();

    switch (type) {
        case 0:
            alienImage.src = alienType[0];
            break;
        case 1:
             alienImage.src = alienType[1];  
            break;
        case 2:
            alienImage.src = alienType[2];  
            break;
        case 3:
            alienImage.src = alienType[3];  
            break;
    }   
    context.drawImage(alienImage, x, y);
}


/************************************************************************
Key game functions
************************************************************************/

var motherShip = new ship(20, 0);
var loneAlien = new alien(200, 100);

function formAlienMob(posX, posY) {
    for (var i = 0; i < alienMob.length; i++) {
        for (var j = 0; j < alienMob[0].length; j++) {
            switch (alienMob[i][j]) {
                case 0:
                    loneAlien.draw(posX, posY, 0);
                    break;
                case 1:
                    loneAlien.draw(posX, posY+50, 1);
                    break;
                case 2:
                    loneAlien.draw(posX, posY+100, 2);
                    break;
                case 3:
                    loneAlien.draw(posX, posY+150, 3);
                    break;
            }   
        }           
        posX += 50;
    }
}


/************************************************************************
Helper functions
************************************************************************/

function randomNumber(min, max) {
    var result = Math.floor(Math.random() * ((max - min))) + min;
    return result;
}


/************************************************************************
Main game loop
************************************************************************/

function init() {
    var mobPosX = randomNumber(alienMobLeftBound, alienMobRightBound)
    var mobPosY = 30;

    var game = function() {  
        context.clearRect(0, 0, canvas.width, canvas.height);      
    	motherShip.draw(motherShip.x, canvas.height - (motherShip.height+20));
        formAlienMob(mobPosX, mobPosY);

        if (mobPosX <= alienMobLeftBound || !changeDirection) {
            if (mobPosX <= alienMobLeftBound) {
                mobPosY += 20;
            }   
            changeDirection = false;
            mobPosX += invasionSpeed;
        }

        if (mobPosX >= alienMobRightBound || changeDirection) {
            if (mobPosX >= alienMobRightBound) {
                mobPosY += 20;
            }
            changeDirection = true;
            mobPosX -= invasionSpeed;
        }

        if (65 in keyPress && motherShip.x > 0) { 
            motherShip.x -= shipSpeed;
        }

        if (68 in keyPress && motherShip.x < (canvas.width - motherShip.width)) {
            motherShip.x += shipSpeed;
        }
    }
    
    gameLoop = setInterval(game, 1);               

    addEventListener("keydown", function(e) {
        keyPress[e.keyCode] = true;
    }, false);

    addEventListener("keyup", function(e) {
        delete keyPress[e.keyCode];
    }, false);     

}

init();
