// Resize
var resize = function() {
    width = settings.PlayerSize[0]
    height = settings.PlayerSize[1]
    canvas.width = width
    canvas.height = height
}
window.onresize = resize
resize()