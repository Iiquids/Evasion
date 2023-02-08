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

var settings = {
    "PlayerSpeed": 3,
    "PlayerSize": [window.innerWidth * 2, window.innerHeight * 2],
    "Players": 1,
    "PlayerColors": ["red", "green", "blue"]
}

var resize = function() {
    width = settings.PlayerSize[0]
    height = settings.PlayerSize[1]
    canvas.width = width
    canvas.height = height
}
window.onresize = resize
resize()

//Make background and sutff

var pla1 = canvas.getContext("2d")
var pla2 = canvas.getContext("2d")

var playersInCanvas = {
    "Player1": {"Color": settings.PlayerColors[0], "Width": settings.PlayerSize[0], "Height": settings.PlayerSize[1], "PosX": canvas.width / 2, "PosY": canvas.height / 2},
    "Player2": {"Color": settings.PlayerColors[1], "Width": settings.PlayerSize[0], "Height": settings.PlayerSize[1], "PosX": canvas.width / 2, "PosY": canvas.height / 2}
}
pla1.fillStyle = playersInCanvas.Player1.Color;
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
    if (keysDown.W == true) {
        playersInCanvas.Player1.PosY = playersInCanvas.Player1.PosY - settings.PlayerSpeed;
    }
    if (keysDown.A == true) {
        playersInCanvas.Player1.PosX = playersInCanvas.Player1.PosX - settings.PlayerSpeed;
    }
    if (keysDown.S == true) {
        playersInCanvas.Player1.PosY = playersInCanvas.Player1.PosY + settings.PlayerSpeed;
    }
    if (keysDown.D == true) {
        playersInCanvas.Player1.PosX = playersInCanvas.Player1.PosX + settings.PlayerSpeed;
    }
    if (keysDown.Up == true) {
        playersInCanvas.Player2.PosY = playersInCanvas.Player2.PosY - settings.PlayerSpeed;
    }
    if (keysDown.Left == true) {
        playersInCanvas.Player2.PosX = playersInCanvas.Player2.PosX - settings.PlayerSpeed;
    }
    if (keysDown.Down == true) {
        playersInCanvas.Player2.PosY = playersInCanvas.Player2.PosY + settings.PlayerSpeed;
    }
    if (keysDown.Right == true) {
        playersInCanvas.Player2.PosX = playersInCanvas.Player2.PosX + settings.PlayerSpeed;
    }
}

function loadPlayers() { // Loads and draws Players.
    // clearRect First else dumbass thing won't work
    // Brian probably coded this dumb clearRect Thing cause its mad annyoing.... -_- UwU

    pla2.clearRect(0, 0, playersInCanvas.Player2.Width, playersInCanvas.Player2.Height);
    pla1.clearRect(0, 0, playersInCanvas.Player1.Width, playersInCanvas.Player1.Height);

    pla1.fillRect(playersInCanvas.Player1.PosX, playersInCanvas.Player1.PosY, 20, 20);
    pla2.fillRect(playersInCanvas.Player2.PosX, playersInCanvas.Player2.PosY, 20, 20);
}

function draw() {
    loadPlayers()
}

function loop(timestamp) {
    var progress = (timestamp - lastRender)

    update(progress)
    draw()
    movePlayer()

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
    if (event.code === 'KeyW') {
        moveDirection("W", 1);
    } else if (event.code === 'KeyA') {
        moveDirection("A", 1);
    } else if (event.code === 'KeyS') {
        moveDirection("S", 1);
    } else if (event.code === 'KeyD') {
        moveDirection("D", 1);
    } else if (event.code == 'KeyI') {
        moveDirection("Up", 2);
    } else if (event.code === 'KeyJ') {
        moveDirection("Left", 2);
    } else if (event.code === "KeyK") {
        moveDirection("Down", 2);
    } else if (event.code === "KeyL") {
        moveDirection("Right", 2);
    }
});
// End Of Movement

var lastRender = 0
window.requestAnimationFrame(loop)
