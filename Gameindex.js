var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")
var width
var height

var keysDown = {
    "W": false,
    "A": false,
    "S": false,
    "D": false
}
var settings = {
    "PlayerSpeed": 3,
    "PlayerSize": [window.innerWidth * 2, window.innerHeight * 2]
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



var startx = canvas.width / 2
var starty = canvas.height / 2

ctx.fillStyle = 'red'

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
        starty = starty - settings.PlayerSpeed;
    }
    if (keysDown.A == true) {
        startx = startx - settings.PlayerSpeed;
    }
    if (keysDown.S == true) {
        starty = starty + settings.PlayerSpeed;
    }
    if (keysDown.D == true) {
        startx = startx + settings.PlayerSpeed
    }
}

function draw() {
    ctx.clearRect(0, 0, width, height)

    ctx.fillRect(startx, starty, 20, 20)
}

function loop(timestamp) {
    var progress = (timestamp - lastRender)

    update(progress)
    draw()
    movePlayer()

    lastRender = timestamp
    window.requestAnimationFrame(loop)
}


document.addEventListener('keydown', function(event) {
    if (event.code === 'KeyW') {
        keysDown.W = true;
    } else if (event.code === 'KeyA') {
        keysDown.A = true;
    } else if (event.code === 'KeyS'){
        keysDown.S = true;
    } else if (event.code === 'KeyD'){
        keysDown.D = true;
    }
});

document.addEventListener('keyup', function(event) {
    if (event.code === 'KeyW') {
        keysDown.W = false;
    } else if (event.code === 'KeyA') {
        keysDown.A = false;
    } else if (event.code === 'KeyS'){
        keysDown.S = false;
    } else if (event.code === 'KeyD'){
        keysDown.D = false;
    }
});

var lastRender = 0
window.requestAnimationFrame(loop)