/************************************************************************
Canvas setup
************************************************************************/
var cover = document.getElementById('coverpage');
var canvas = document.getElementById("board");
var context = canvas.getContext("2d");
var play_button = document.getElementById('play-button');

canvas.style.display = 'none';


/************************************************************************
Game constants / game setup
************************************************************************/
var NUM_ROWS = 10;
var NUM_COLS = 4;
var alienType = ["imgs/alien1.png", "imgs/alien2.png", "imgs/alien3.png", "imgs/alien4.png"];

var alienMobLeftBound = canvas.width/9;
var alienMobRightBound = canvas.width/3;

var keyPress = {};
var gameRunning = false;

document.onkeydown = function(e) {
    if (!gameRunning && e.keyCode == 82) {  // R to restart
        init();
    }
}

play_button.onclick = function() {
    cover.style.display = 'none';
    canvas.style.display = 'block';
    init(); // start game
};


/************************************************************************
Game play
************************************************************************/

function init() {
    gameRunning = true;

    var alienMob = [];
    // var invasionSpeed = 0.1;
    var invasionSpeed = 0.5; // for developing; speed up mob
    var shipSpeed = 1;

    var mobPosX = randomNumber(alienMobLeftBound, alienMobRightBound)
    // var mobPosY = 20;
    var mobPosY = 130; // for developing; start mob lower

    var changeDirection = false;

    for (var i = 0; i < NUM_ROWS; i++) {
        alienMob[i] = new Array();
        for (j = 0; j < NUM_COLS; j++) {
            alienMob[i][j] = j;
        }
    }


    /************************************************************************
    Game objects
    ************************************************************************/

    var ship = function(x,y) {
        this.height = 22;
        this.width = 52;
        this.x = canvas.width/2 - this.width/2; // start ship in center 
        this.y = canvas.height - (this.height+20); 
    }

    ship.prototype.draw = function(x,y) {
        var shipImage = new Image();
        shipImage.src = "imgs/ship.png"
        context.drawImage(shipImage, x, y);
    }

    var alien = function (x,y,type) {
        this.height = 22;
        this.height = 30;
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

    var motherShip = new ship();

    /************************************************************************
    Main game loop
    ************************************************************************/

    var game = function() {  
        context.clearRect(0, 0, canvas.width, canvas.height);      
        formAlienMob(mobPosX, mobPosY);
        drawAlienMob(mobPosX, mobPosY);
        motherShip.draw(motherShip.x, motherShip.y);

        automateMobMovement();
        playerInput(); 
        detectCollision(mobPosX, mobPosY);
    }
    
    gameLoop = setInterval(game, 1);               

    addEventListener("keydown", function(e) {
        keyPress[e.keyCode] = true;
    }, false);

    addEventListener("keyup", function(e) {
        delete keyPress[e.keyCode];
    }, false);   


    /************************************************************************
    Key game functions
    ************************************************************************/

    function formAlienMob(posX, posY) {
        for (var i = 0; i < alienMob.length; i++) {
            for (var j = 0; j < alienMob[0].length; j++) {
                switch (alienMob[i][j]) {
                    case 0:
                        alienMob[i][j] = new alien(posX, posY, 0);
                        break;
                    case 1:
                        alienMob[i][j] = new alien(posX, posY+50, 1);
                        break;
                    case 2:
                        alienMob[i][j] = new alien(posX, posY+100, 2);
                        break;
                    case 3:
                        alienMob[i][j] = new alien(posX, posY+150, 3);
                        break;
                }   
            }           
        }
    }

    function drawAlienMob(posX, posY) {
        for (var i = 0; i < alienMob.length; i++) {
            for (var j = 0; j < alienMob[0].length; j++) {
                if (alienMob[i][j].alive) {
                    alienMob[i][j].draw(posX, alienMob[i][j].y + posY, alienMob[i][j].type);
                }
            }
            posX += 50;  
        }
    }

    function automateMobMovement() {
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
    }

    // extra 5px hardcoded for now, not sure why collision isn't detected until a few cols in
    function detectCollision(posX, posY) {
        for (var i = 0; i < alienMob.length; i++) {
            for (var j = 0; j < alienMob[0].length; j++) {
                if ((alienMob[i][j].y + posY + 5) >= motherShip.y) {
                    endGame();
                }
            }
        }    
    }

    function playerInput() {
        // A moves left
        if (65 in keyPress && motherShip.x > 0) { 
            motherShip.x -= shipSpeed;
        }

        // D moves right
        if (68 in keyPress && motherShip.x < (canvas.width - motherShip.width)) {
            motherShip.x += shipSpeed;
        } 

        // Q to quit
        if (81 in keyPress) {   
            endGame();
            cover.style.display = 'block';
            canvas.style.display = 'none';
        }     
    }  

    function endGame() {
        gameRunning = false;
        clearInterval(gameLoop);

        context.fill();
        context.fillStyle = 'red';
        context.font = "20pt Space Invaders";
        context.fillText("GAME OVER.", 380, 180);
        context.fillText("Press 'R' to restart", 300, 240);
    }


    /************************************************************************
    Helper functions
    ************************************************************************/

    function randomNumber(min, max) {
        var result = Math.floor(Math.random() * ((max - min))) + min;
        return result;
    }

}


