var canvas = document.getElementById("canvas")
var width
var height

var waitingToStart = [false, false]

var keysDown = {
    "W": false,
    "A": false,
    "S": false,
    "D": false,
    "Up": false,
    "Left": false,
    "Down": false,
    "Right": false
}

// Turns one of the keys On randomly
//Math.floor(Math.random() * 5)
var randomGenNumberForKeyTurnOn = Math.floor(Math.random() * 4)
if (randomGenNumberForKeyTurnOn == 0) {
    keysDown.W = true;
} else if (randomGenNumberForKeyTurnOn == 1) {
    keysDown.A = true;
} else if (randomGenNumberForKeyTurnOn == 2) {
    keysDown.S = true;
} else if (randomGenNumberForKeyTurnOn == 3) {
    keysDown.D = true;
}

randomGenNumberForKeyTurnOn = Math.floor((Math.random() * 4)+4)
if (randomGenNumberForKeyTurnOn == 4) {
    keysDown.Up = true;
} else if (randomGenNumberForKeyTurnOn == 5) {
    keysDown.Left = true;
} else if (randomGenNumberForKeyTurnOn == 6) {
    keysDown.Down = true;
} else if (randomGenNumberForKeyTurnOn == 7) {
    keysDown.Right = true;
}

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var settings = {
    "started": false,
    "PlayerSpeed": {"x" : 5, "y": 5},
    "PlayerSize": [20, 20],
    "CoinSize": [25, 25],
    "Players": 1,
    "PlayerAvaColors": {"Cop": "blue", "Robber": "Red"},
    "playerColors": {"Player1": "blue", "Player2": "blue"},
    "PlayerTurn": Math.floor(Math.random() * 2) + 1,
    "playerCollided": false,
    "Level": 1,
    "canvas": {"wallMaxLong": 90, "wallMinLong": 40}
};

var PlayerStartXY = {
    "Player1": {"x": settings.PlayerSize[0] * 3, "y": canvas.height / 2},
    "Player2": {"x": canvas.width - settings.PlayerSize[0] * 3, "y": canvas.height / 2}
};

if (settings.PlayerTurn == 1) {
    settings.playerColors.Player1 = settings.PlayerAvaColors.Robber
} else {
    settings.playerColors.Player2 = settings.PlayerAvaColors.Robber
};

function eventOrNot(n){
    if(n % 2==0){
        return true;
    }
    return false;
}

//Make background and sutff

var pla1 = canvas.getContext("2d");
var pla2 = canvas.getContext("2d");

var canvasWalls = [];

for (let i = 0; i < 10 * settings.Level; i++) {
    let width = 0
    let height = 0

    if (eventOrNot(i)) {
        width = 30;
        height = 90;
    } else {
        width = 90;
        height = 30;
    }

    let x = Math.floor(Math.random() * canvas.width) - width;
    let y = Math.floor(Math.random() * canvas.height) - height;

    canvasWalls.push({
        "wall": canvas.getContext("2d"),
        "x": x,
        "y": y,
        "width": width,
        "height": height
    });
}

var playersInCanvas = {
    "Player1": {"Color": settings.playerColors.Player1, "Width": settings.PlayerSize[0], "Height": settings.PlayerSize[1], "PosX": PlayerStartXY.Player1.x, "PosY": PlayerStartXY.Player1.x},
    "Player2": {"Color": settings.playerColors.Player2, "Width": settings.PlayerSize[0], "Height": settings.PlayerSize[1], "PosX": PlayerStartXY.Player2.x, "PosY": PlayerStartXY.Player2.y}
};


var state = {
    x: (width / 2),
    y: (height / 2),
}

function update(progress) {
    state.x += progress
    if (state.x > width) {
        state.x -= width;
    }
}

function isCollide(a, b) {
    return !(
        ((a.y + a.height) < (b.y)) ||
        (a.y > (b.y + b.height)) ||
        ((a.x + a.width) < b.x) ||
        (a.x > (b.x + b.width))
    );
}

function wallCollide(a) {
    for (let i = 0; i < canvasWalls.length; i++) {
        if (isCollide(a, {"x": canvasWalls[i].x, "y": canvasWalls[i].y, "width": canvasWalls[i].width, "height": canvasWalls[i].height})){
            return false;
        }
    }
    return true;
}

var widthDelay = canvas.width - canvas.height;

function movePlayer() {
    if (settings.started == true) {
        if (keysDown.W == true) {
            if ((playersInCanvas.Player1.PosY - settings.PlayerSpeed.y) >= 0 && wallCollide({"x": playersInCanvas.Player1.PosX, "y": (playersInCanvas.Player1.PosY - settings.PlayerSpeed.y), "width": playersInCanvas.Player1.Width, "height": playersInCanvas.Player1.Height})) {
                playersInCanvas.Player1.PosY = playersInCanvas.Player1.PosY - settings.PlayerSpeed.y;
            } else if (playersInCanvas.Player1.PosY - settings.PlayerSpeed.y <= 0) {
                playersInCanvas.Player1.PosY = 0;
            } else {
                keysDown.W = false;
            }
        }
        if (keysDown.A == true) {
            if (playersInCanvas.Player1.PosX - settings.PlayerSpeed.x >= 0 && wallCollide({"x": playersInCanvas.Player1.PosX - settings.PlayerSpeed.x + settings.PlayerSpeed.x, "y": playersInCanvas.Player1.PosY, "width": playersInCanvas.Player1.Width, "height": playersInCanvas.Player1.Height})) {
                playersInCanvas.Player1.PosX = playersInCanvas.Player1.PosX - settings.PlayerSpeed.x;
            } else if (playersInCanvas.Player1.PosX - settings.PlayerSpeed.x <= 0) {
                playersInCanvas.Player1.PosX = 0;
            } else {
                keysDown.A = false;
            }
        }
        if (keysDown.S == true) {
            if ((playersInCanvas.Player1.PosY + settings.PlayerSpeed.y) <= canvas.height - settings.PlayerSize[1] && wallCollide({"x": playersInCanvas.Player1.PosX, "y": (playersInCanvas.Player1.PosY + settings.PlayerSpeed.y), "width": playersInCanvas.Player1.Width, "height": playersInCanvas.Player1.Height})) {
                playersInCanvas.Player1.PosY = playersInCanvas.Player1.PosY + settings.PlayerSpeed.y;
            } else if (playersInCanvas.Player1.PosY + settings.PlayerSpeed.y >= canvas.height - settings.PlayerSize[1]) {
                playersInCanvas.Player1.PosY = canvas.height - settings.PlayerSize[1];
            } else {
                keysDown.S = false;
            }
        }
        if (keysDown.D == true) {
            if (playersInCanvas.Player1.PosX + settings.PlayerSpeed.x <= canvas.width - settings.PlayerSize[0] && wallCollide({"x": playersInCanvas.Player1.PosX + settings.PlayerSpeed.x, "y": playersInCanvas.Player1.PosY, "width": playersInCanvas.Player1.Width, "height": playersInCanvas.Player1.Height})) {
                playersInCanvas.Player1.PosX = playersInCanvas.Player1.PosX + settings.PlayerSpeed.x;
            } else if (playersInCanvas.Player1.PosX + settings.PlayerSpeed.x >= canvas.width - settings.PlayerSize[0]) {
                playersInCanvas.Player1.PosX = canvas.width - settings.PlayerSize[0];
            } else {
                keysDown.D = false;
            }
        }
        if (keysDown.Up == true) {
            if ((playersInCanvas.Player2.PosY - settings.PlayerSpeed.y)  >= 0 && wallCollide({"x": playersInCanvas.Player2.PosX, "y": (playersInCanvas.Player2.PosY - settings.PlayerSpeed.y), "width": playersInCanvas.Player2.Width, "height": playersInCanvas.Player2.Height}) >= 0) {
                playersInCanvas.Player2.PosY = playersInCanvas.Player2.PosY - settings.PlayerSpeed.y;
            } else if ((playersInCanvas.Player2.PosY - settings.PlayerSpeed.y) <= 0) {
                playersInCanvas.Player2.PosY = 0;
            } else {
                keysDown.Up = false;
            }
        }
        if (keysDown.Left == true) {
            if (playersInCanvas.Player2.PosX - settings.PlayerSpeed.x >= 0 && wallCollide({"x": playersInCanvas.Player2.PosX - settings.PlayerSpeed.x, "y": playersInCanvas.Player2.PosY, "width": playersInCanvas.Player2.Width, "height": playersInCanvas.Player2.Height})) {
                playersInCanvas.Player2.PosX = playersInCanvas.Player2.PosX - settings.PlayerSpeed.x;
            } else if (playersInCanvas.Player2.PosX - settings.PlayerSpeed.x <= 0) {
                playersInCanvas.Player2.PosX = 0
            } else {
                keysDown.Left = false;
            }
        }
        if (keysDown.Down == true) {
            if (playersInCanvas.Player2.PosY + settings.PlayerSpeed.y <= canvas.height - settings.PlayerSize[1] && wallCollide({"x": playersInCanvas.Player2.PosX, "y": playersInCanvas.Player2.PosY + settings.PlayerSpeed.y, "width": playersInCanvas.Player2.Width, "height": playersInCanvas.Player2.Height})) {
                playersInCanvas.Player2.PosY = playersInCanvas.Player2.PosY + settings.PlayerSpeed.y;
            } else if (playersInCanvas.Player2.PosY + settings.PlayerSpeed.y >= canvas.height - settings.PlayerSize[1]) {
                playersInCanvas.Player2.PosY = canvas.height - settings.PlayerSize[1];
            } else {
                keysDown.Down = false;
            }
        }
        if (keysDown.Right == true) {
            if (playersInCanvas.Player2.PosX + settings.PlayerSpeed.x <= canvas.width - settings.PlayerSize[0] && wallCollide({"x": playersInCanvas.Player2.PosX + settings.PlayerSpeed.x, "y": playersInCanvas.Player2.PosY, "width": playersInCanvas.Player2.Width, "height": playersInCanvas.Player2.Height})) {
                playersInCanvas.Player2.PosX = playersInCanvas.Player2.PosX + settings.PlayerSpeed.x;
            } else if (playersInCanvas.Player2.PosX + settings.PlayerSpeed.x >= canvas.width - settings.PlayerSize[0]) {
                playersInCanvas.Player2.PosX = canvas.width - settings.PlayerSize[0];
            } else {
                keysDown.Right = false;
            }
        }
    }
}

function loadPlayers() { // Loads and draws Players.
    // clearRect First else dumbass thing won't work
    // Bryan probably coded this dumb clearRect Thing cause its mad annyoing.... -_- UwU

    pla2.clearRect(0, 0, canvas.width, canvas.height);
    pla1.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < canvasWalls.length; i++) {
        // Draw
        var ctx = canvasWalls[i].wall;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    for (let i = 0; i < canvasWalls.length; i++) {
        // Draw
        var ctx = canvasWalls[i].wall;
        ctx.fillStyle = "white";
        ctx.fillRect(canvasWalls[i].x, canvasWalls[i].y, canvasWalls[i].width, canvasWalls[i].height);

    };

    // Colors is soo fucking shit, LIKE LOOK AT THIS... PLAYER2 IS USING PLAYER1'S COLOR AND IT USES OPPISITE... Another thing Bryan coded that shit.

    pla2.fillStyle = settings.playerColors.Player1;
    pla2.fillRect(playersInCanvas.Player2.PosX, playersInCanvas.Player2.PosY, playersInCanvas.Player2.Width, playersInCanvas.Player2.Height);

    pla1.fillStyle = settings.playerColors.Player2;
    pla1.fillRect(playersInCanvas.Player1.PosX, playersInCanvas.Player1.PosY, playersInCanvas.Player1.Width, playersInCanvas.Player1.Height);
};


var startText = canvas.getContext("2d");
startText.font ="bold " + canvas.width/30 + "px Helvetica, Arial, sans-serif";

function draw() {
    if (settings.started == false) {
        if (settings.playerCollided == false) {
            startText.fillStyle = "black";
            let text = "Press W and Arrow Up To Start"
            let textWidth = startText.measureText(text).width;
            startText.fillText(text , (canvas.width/2) - (textWidth / 2), canvas.height/3);
        } else {
            startText.fillStyle = "black";
            let text = "Player " + settings.PlayerTurn + " Won!\nPress W and Arrow Up To Restart.";
            let textWidth = startText.measureText(text).width;
            startText.fillText(text , (canvas.width/2) - (textWidth / 2), canvas.height/3);
        }
    } else {
        if (settings.playerCollided == false) {
            loadPlayers();
        }
    }
}

function checkTagged() {
    var player = {"x": playersInCanvas.Player1.PosX, "y": playersInCanvas.Player1.PosY, "height": playersInCanvas.Player1.Height, "width": playersInCanvas.Player1.Width};
    var player2 = {"x": playersInCanvas.Player2.PosX, "y": playersInCanvas.Player2.PosY, "height": playersInCanvas.Player2.Height, "width": playersInCanvas.Player2.Width};
    if (isCollide(player, player2)) {
        pla1.fillStyle = playersInCanvas.Player1.Color;
        settings.playerCollided = true;
        settings.started = false;
        waitingToStart[0] = false;
        waitingToStart[1]= false;
    }
}

function loop(timestamp) {
    var progress = (timestamp - lastRender)

    update(progress)
    draw()
    movePlayer()
    checkTagged()

    lastRender = timestamp
    window.requestAnimationFrame(loop)
}

// Movement:

function moveDirection(non, p) { // Stop Other Movements From Intecepting
    if (p == 1) {
        keysDown.W = false;
        keysDown.A = false;
        keysDown.S = false;
        keysDown.D = false;
        keysDown[non] = true;
    } else if (p == 2) {
        keysDown.Up = false;
        keysDown.Left = false;
        keysDown.Down = false;
        keysDown.Right = false;
        keysDown[non] = true;
    }
}

document.addEventListener('keydown', function(event) {
    if (settings.started == true) {
        if (event.code === 'KeyW') {
            moveDirection("W", 1);
        } else if (event.code === 'KeyA') {
            moveDirection("A", 1);
        } else if (event.code === 'KeyS') {
            moveDirection("S", 1);
        } else if (event.code === 'KeyD') {
            moveDirection("D", 1);
        } else if (event.code == 'ArrowUp') {
            moveDirection("Up", 2);
        } else if (event.code === 'ArrowLeft') {
            moveDirection("Left", 2);
        } else if (event.code === "ArrowDown") {
            moveDirection("Down", 2);
        } else if (event.code === "ArrowRight") {
            moveDirection("Right", 2);
        }
    } else {
        if (event.code === 'KeyW') {
            waitingToStart[0] = true;
        } else if (event.code == 'ArrowUp') {
            waitingToStart[1] = true;
        }
        if (waitingToStart[0] && waitingToStart[1]) {
            settings.started = true;
        }
    }
});
// End Of Movement

var lastRender = 0
window.requestAnimationFrame(loop)