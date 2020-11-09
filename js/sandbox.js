"use strict";
//get a refrence to the canvas and its context
var canvasContainer = document.getElementById("play_area");
var ctx = canvas.getContext("2d")
var offsetLeft, offsetTop;
var stageWidth, stageHeight;
var canvas = document.getElementById("element_area");
var spawning = false;
var gravity = 1;
window.addEventListener('resize', resizeCanvas);
canvas.addEventListener('mousemove', mouseXY);
canvas.addEventListener('mousedown', onMouseDown);
canvas.addEventListener('mouseup', onMouseUp);
canvas.addEventListener('mouseleave', onMouseUp);
resizeCanvas();

var disks = [];
var disksNum = 20;
var isMouseDown = false;
var mouseX = 0, mouseY = 0;
var draggedDisk = null;
createAllDisks();
requestAnimationFrame(render);

document.getElementById("reset").addEventListener("click", clearCanvas);

//draw disk
for(var i = 0; i < disks.lengthl; i++){
    disks[i].createDisk()
}

//selecting element
var elementButtons = document.getElementsByClassName("elements");
for(var i = 0; i < elementButtons.length; i++){
    elementButtons[i].addEventListener("click", selectElement)
}
//selecting brush size
var brushSize = document.getElementsByClassName("toolselector");
for (var i = 0; i < brushSize.length; i++){
    brushSize[i].addEventListener("click", selectTool);
}
//tracking mouse x and y
function mouseXY(e){
    var rect = canvas.getBoundingClientRect();
    mouseX = e.x - rect.left;
    mouseY = e.y - rect.top;

}

function onMouseDown(event){
    isMouseDown = true;
   mouseX =  event.clientX - offsetLeft;
   mouseY = event.clientY - offsetTop;

}

function onMouseUp(){
    isMouseDown = false;
    canvas.removeEventListener('mousemove', onDragDisk);
    draggedDisk = null;
}

function onDragDisk(event){
    mouseX = event.clientX - offsetLeft;
    mouseY = event.clientY - offsetTop;
}

function render() {
    // handle input
    manageInput();
    // update positions
    updateAllDisks();
    // resolve collisions
    checkAllCollisions();
    // draw
    ctx.clearRect(0, 0, stageWidth, stageHeight);
    drawAllDisks();
    requestAnimationFrame(render);
}

function resizeCanvas() {
    var cs = window.getComputedStyle(canvasContainer);
    stageWidth = canvas.width = parseInt(cs.getPropertyValue('width'), 10);
    stageHeight = canvas.height = parseInt(cs.getPropertyValue('height'), 10);
    offsetLeft = canvasContainer.offsetLeft;
    offsetTop = canvasContainer.offsetTop;
}

function generateHex() {
    var str = "0123456789ABCDEF";
    var result = "#";
    for (var i = 0; i < 6; i++) {
        result += str.charAt(Math.floor(Math.random() * 16));
    }
    return result;
}