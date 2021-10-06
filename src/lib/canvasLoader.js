/*
This script file includes the function to load the canvas and get the context.
*/

var canvasLoader = {

getCanvas: function(){

    canvas = document.getElementById("game_canvas");
    gl = canvas.getContext("webgl2");

},

}