var canvas = document.getElementById("board");
var context = canvas.getContext("2d");


var NUM_ROWS = 10;
var NUM_COLS = 5;

var alienMob = [];
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

var player1 = new player(20,0);

function drawAliens(posX, posY) {
    var origPosX = posX;
    var origPosY = posY;

    for (var i = 0; i < alienMob.length; i++) {
        for (var j = 0; j < alienMob[0].length; j++) {
            if (alienMob[i][j] == 1) {
                context.beginPath();
                context.rect(posX, posY, 15, 15);
                context.lineWidth = 1;
                context.fillStyle = '#7cfc00';
                context.fill();
                origPosY++;
            }
        }
        posX+=40;
    }
            posX+=40;

}

function init() {
    console.log(alienMob);

    var game = function() {  
        context.clearRect(0, 0, canvas.width, canvas.height);      
    	player1.draw(player1.x, 480);
        drawAliens(10, 30);
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






