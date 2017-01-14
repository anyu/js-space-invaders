var canvas = document.getElementById("board");
var context = canvas.getContext("2d");


var NUM_ROWS = 10;
var NUM_COLS = 5;


var aliens = [[0, 0, 0, 0],[1, 1, 1, 1],[2, 2, 2, 2],[3, 3, 3, 3]];


var alienMob = [];
var alienType = ["imgs/alien1.png", "imgs/alien2.png", "imgs/alien3.png", "imgs/alien4.png"];
var mobPositionX = 0;


for (var i = 0; i < NUM_ROWS; i++) {
    alienMob[i] = new Array();
    for (j = 0; j < NUM_COLS; j++) {
        alienMob[i][j] = 1;
    }
}

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

var alienReady = false;
var alienImage = new Image();
alienImage.onload = function() {
    alienReady = true;
};
alienImage.src = alienType[0];


var player1 = new player(20,0);

function drawAliens(posX, posY) {
    // var origPosX = posX;
    // var origPosY = posY;

    for (var i = 0; i < alienMob.length; i++) {
        for (var j = 0; j < alienMob[0].length; j++) {
            if (alienMob[i][j] == 1) {
                context.drawImage(alienImage, posX, posY);
            }
        }
        posX += 50;
    }
}

function randomNumber(min, max) {
    var result = Math.floor(Math.random() * ((max - min))) + min;
    return result;
}

var changeDirection = false;


function init() {
    console.log(alienMob);

    // var randomX = randomNumber(0, 900);
    var alienStartX = 100;

    var game = function() {  
        context.clearRect(0, 0, canvas.width, canvas.height);      
    	player1.draw(player1.x, 480);
        drawAliens(alienStartX, 30);

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






