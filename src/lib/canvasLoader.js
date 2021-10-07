/*
This script file includes the function to load the canvas and get the context.
*/

var canvas;
var gl;

var canvasLoader = {

getCanvas: function(){

    canvas = document.getElementById("game_canvas");
    gl = canvas.getContext("webgl2");

},

resizeCanvasToDisplaySize:function(canvas) {
    const expandFullScreen = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      console.log(canvas.width+" "+window.innerWidth);
        
    };
    expandFullScreen();
    // Resize screen when the browser has triggered the resize event
    window.addEventListener('resize', expandFullScreen);
},

}