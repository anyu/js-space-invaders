/************************************************************************
Setup
************************************************************************/
var canvas = document.getElementById("board");
var context = canvas.getContext("2d");
 
var NUM_ROWS = 10;
var NUM_COLS = 4;

var alienType = ["imgs/alien1.png", "imgs/alien2.png", "imgs/alien3.png", "imgs/alien4.png"];
var invasionSpeed = 5;
var shipSpeed = 10;

var alienLeftBound = canvas.width/9;
var alienRightBound = canvas.width/3;

var alienMob = [];

for (var i = 0; i < NUM_ROWS; i++) {
    alienMob[i] = new Array();
    for (j = 0; j < NUM_COLS; j++) {
        alienMob[i][j] = j;
    }
}

var changeDirection = false;

/************************************************************************
Main game objects
************************************************************************/

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

var alien = function (x,y, type) {
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
var loneAlien = new alien(200,100);

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

    var mobPosX = randomNumber(alienLeftBound, alienRightBound)
    var mobPosY = 30;

    var game = function() {  
        context.clearRect(0, 0, canvas.width, canvas.height);      
    	motherShip.draw(motherShip.x, canvas.height - (motherShip.height+20));
        formAlienMob(mobPosX, mobPosY);

        if (mobPosX <= alienLeftBound || !changeDirection) {
            changeDirection = false;
            mobPosX += invasionSpeed;
        }

        if (mobPosX >= alienRightBound || changeDirection) {
            changeDirection = true;
            mobPosX -= invasionSpeed;
        }
    }
    
	gameLoop = setInterval(game, 350);            

    addEventListener( "keydown", function(e) {    

        // A moves left
        if(e.keyCode == 65 && motherShip.x > 0) {
            motherShip.x -= shipSpeed;
        }

        // D moves right
        if(e.keyCode == 68 && motherShip.x < (canvas.width - motherShip.width)) {
            motherShip.x += shipSpeed;
        }

    });
}

init();
