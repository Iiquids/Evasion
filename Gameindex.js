var canvas = document.getElementById("canvas")
var width
var height

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

canvas.height = 1000;
canvas.width = 1000;

var settings = {
    "started": false,
    "PlayerSpeed": 10,
    "PlayerSize": [10, (10)*2],
    "CoinSize": [20, (20)*2],
    "Players": 1,
    "PlayerColors": ["red", "green", "blue"]
}

//Make background and sutff

var pla1 = canvas.getContext("2d");
var pla2 = canvas.getContext("2d");

var playersInCanvas = {
    "Player1": {"Color": settings.PlayerColors[0], "Width": settings.PlayerSize[0], "Height": settings.PlayerSize[1], "PosX": 0 + settings.PlayerSize[0] * 3, "PosY": canvas.height / 2},
    "Player2": {"Color": settings.PlayerColors[1], "Width": settings.PlayerSize[0], "Height": settings.PlayerSize[1], "PosX": canvas.width - settings.PlayerSize[0] * 3, "PosY": canvas.height / 2}
}
//pla1.fillStyle = playersInCanvas.Player1.Color;
pla2.fillStyle = playersInCanvas.Player2.Color;


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

function movePlayer() {
    if (settings.started == true) {
        if (keysDown.W == true) {
            if ((playersInCanvas.Player1.PosY - settings.PlayerSpeed) >= 0) {
                playersInCanvas.Player1.PosY = playersInCanvas.Player1.PosY - settings.PlayerSpeed;
            } else if (playersInCanvas.Player1.PosY - settings.PlayerSpeed <= 0) {
                playersInCanvas.Player1.PosY = 0;
            }
        }
        if (keysDown.A == true) {
            if (playersInCanvas.Player1.PosX - settings.PlayerSpeed >= 0) {
                playersInCanvas.Player1.PosX = playersInCanvas.Player1.PosX - settings.PlayerSpeed;
            } else if (playersInCanvas.Player1.PosX - settings.PlayerSpeed <= 0) {
                playersInCanvas.Player1.PosX = 0;
            }
        }
        if (keysDown.S == true) {
            if ((playersInCanvas.Player1.PosY + settings.PlayerSpeed) <= canvas.height - settings.PlayerSize[1]) {
                playersInCanvas.Player1.PosY = playersInCanvas.Player1.PosY + settings.PlayerSpeed;
            } else if (playersInCanvas.Player1.PosY + settings.PlayerSpeed >= canvas.height - settings.PlayerSize[1]) {
                playersInCanvas.Player1.PosY = canvas.height - settings.PlayerSize[1];
            }
        }
        if (keysDown.D == true) {
            if (playersInCanvas.Player1.PosX + settings.PlayerSpeed <= canvas.width - settings.PlayerSize[0]) {
                playersInCanvas.Player1.PosX = playersInCanvas.Player1.PosX + settings.PlayerSpeed;
            } else if (playersInCanvas.Player1.PosX + settings.PlayerSpeed >= canvas.width - settings.PlayerSize[0]) {
                playersInCanvas.Player1.PosX = canvas.width - settings.PlayerSize[0];
            }
        }
        if (keysDown.Up == true) {
            if ((playersInCanvas.Player2.PosY - settings.PlayerSpeed) >= 0) {
                playersInCanvas.Player2.PosY = playersInCanvas.Player2.PosY - settings.PlayerSpeed;
            } else if ((playersInCanvas.Player2.PosY - settings.PlayerSpeed) <= 0) {
                playersInCanvas.Player2.PosY = 0;
            }
        }
        if (keysDown.Left == true) {
            if (playersInCanvas.Player2.PosX - settings.PlayerSpeed >= 0) {
                playersInCanvas.Player2.PosX = playersInCanvas.Player2.PosX - settings.PlayerSpeed;
            } else if (playersInCanvas.Player2.PosX - settings.PlayerSpeed <= 0) {
                playersInCanvas.Player2.PosX = 0
            }
        }
        if (keysDown.Down == true) {
            if (playersInCanvas.Player2.PosY + settings.PlayerSpeed <= canvas.height - settings.PlayerSize[1]) {
                playersInCanvas.Player2.PosY = playersInCanvas.Player2.PosY + settings.PlayerSpeed;
            } else if (playersInCanvas.Player2.PosY + settings.PlayerSpeed >= canvas.height - settings.PlayerSize[1]) {
                playersInCanvas.Player2.PosY = canvas.height - settings.PlayerSize[1];
            }
        }
        if (keysDown.Right == true) {
            if (playersInCanvas.Player2.PosX + settings.PlayerSpeed <= canvas.width - settings.PlayerSize[0]) {
                playersInCanvas.Player2.PosX = playersInCanvas.Player2.PosX + settings.PlayerSpeed;
            } else if (playersInCanvas.Player2.PosX + settings.PlayerSpeed >= canvas.width - settings.PlayerSize[0]) {
                playersInCanvas.Player2.PosX = canvas.width - settings.PlayerSize[0];
            }
        }
    }
}

function loadPlayers() { // Loads and draws Players.
    // clearRect First else dumbass thing won't work
    // Bryan probably coded this dumb clearRect Thing cause its mad annyoing.... -_- UwU

     pla2.clearRect(0, 0, canvas.width, canvas.height);
     pla1.clearRect(0, 0, canvas.width, canvas.height);

    pla1.fillRect(playersInCanvas.Player1.PosX, playersInCanvas.Player1.PosY, playersInCanvas.Player1.Width, playersInCanvas.Player1.Height);
    pla2.fillRect(playersInCanvas.Player2.PosX, playersInCanvas.Player2.PosY, playersInCanvas.Player2.Width, playersInCanvas.Player2.Height);
}

var startText = canvas.getContext("2d");
function draw() {
    if (settings.started == false) {
        startText.font ="bold 96px Helvetica, Arial, sans-serif";
        startText.fillStyle = "black";
        startText.fillText("Press W and Arrow To Start", canvas.width/4 + 90, canvas.height/2, canvas.width/4);
    } else {
        loadPlayers();
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

function checkTagged() {
    var player = {"x": playersInCanvas.Player1.PosX, "y": playersInCanvas.Player1.PosY, "height": playersInCanvas.Player1.Height, "width": playersInCanvas.Player1.Width};
    var player2 = {"x": playersInCanvas.Player2.PosX, "y": playersInCanvas.Player2.PosY, "height": playersInCanvas.Player2.Height, "width": playersInCanvas.Player2.Width};
    if (isCollide(player, player2)) {
        pla1.fillStyle = playersInCanvas.Player1.Color
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


var waitingToStart = [false, false]
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