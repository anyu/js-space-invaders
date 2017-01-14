/************************************************************************
Setup
************************************************************************/
var canvas = document.getElementById("board");
var context = canvas.getContext("2d");
 
var NUM_ROWS = 10;
var NUM_COLS = 4;

var alienMob = [];
var alienType = ["imgs/alien1.png", "imgs/alien2.png", "imgs/alien3.png", "imgs/alien4.png"];
var mobPositionX = 0;

for (var i = 0; i < NUM_ROWS; i++) {
    alienMob[i] = new Array();
    for (j = 0; j < NUM_COLS; j++) {
        alienMob[i][j] = j;
    }
}


/************************************************************************
Main game objects
************************************************************************/

var player = function(x,y) {
	this.x = x;
	this.y = y;
	this.height = 25;
	this.width = 50;
	this.color = '#ffffff';
}

player.prototype.draw = function(x,y) {
    context.beginPath();
    context.rect(x, y, 50,20);
    context.lineWidth = 1;
    context.fillStyle = 'red';
    context.fill();
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

var player1 = new player(20,0);
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

var changeDirection = false;


function init() {

    var alienStartX = 100;

    var game = function() {  
        context.clearRect(0, 0, canvas.width, canvas.height);      
    	player1.draw(player1.x, 480);
        formAlienMob(alienStartX, 30);

        if (!changeDirection) {
            alienStartX += 7;
        }
        if (alienStartX > 200 || changeDirection) {
            changeDirection = true;
            alienStartX -= 7;
        }

    }
    
	gameLoop = setInterval(game, 350);            

    addEventListener( "keydown", function(e) {    

        // A moves left
        if(e.keyCode == 65) {
            player1.x-=10;
        }

        // D moves right
        if(e.keyCode == 68) {
            player1.x+=10;
        }

    });
}

init();
