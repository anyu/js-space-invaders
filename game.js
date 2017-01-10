var canvas = document.getElementById("board");
var context = canvas.getContext("2d");

var player = function(x,y) {
	this.x = x;
	this.y = y;
	this.height = 25;
	this.width = 50;
	this.color = '#ffffff';

	player.prototype.draw = function(x,y) {
        context.beginPath();
        context.rect(x, y, 50,20);
        context.lineWidth = 1;
        context.fillStyle = 'red';
        context.fill();
    }
}

var player1 = new player(20,0);

function init() {

    var game = function() {        
    	player1.draw(500,480);
    }

	function newGame() {
        gameLoop = setInterval(game, 350);            
    }

	newGame();
}

init();