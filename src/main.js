/*
Source code for the project of Computer Graphics. The skeleton for the source code has been suggested by Professor Stella.
*/

/////////////// GLOBAL VARIABLES /////////////////////

var programs = new Array();
var vaos = new Array();

//////////// FUNCTIONS DEFINITION ///////////////////

async function main(){

    canvasLoader.getCanvas();
    canvasLoader.resizeCanvasToDisplaySize(canvas);
    await init();

    //gameEngine.engineUpdate();
    drawScene();
    
}

async function init(){

    //Setting of the Global states (viewport size, viewport background color, Depth test)
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0.85, 0.85, 0.85, 1.0);
    gl.enable(gl.DEPTH_TEST); //da fare solamente in init
    gl.enable(gl.CULL_FACE); //se vuoi backface culling


    //////// LOADING OF THE MODELS, CREATION OF VAOs AND PROGRAMS //////////////

    await modelLoader.loadModel("assets/tree3.obj", tree3);
    programs[tree3] = await shaders.shaderLoader("glsl/tree3_vs.glsl", "glsl/tree3_fs.glsl");
    vaos[tree3] = VAO.create(tree3, programs[tree3]);

    await modelLoader.loadModel("assets/tree1.obj", tree1);
    programs[tree1] = await shaders.shaderLoader("glsl/tree1_vs.glsl", "glsl/tree1_fs.glsl");
    vaos[tree1] = VAO.create(tree1, programs[tree1]);
   


}


function drawScene(){

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); //da fare ogni volta che si disegna la scena


    //Draw tree3
    gl.bindVertexArray(vaos[tree3]);
    gl.useProgram(programs[tree3]);
    gl.drawElements(gl.TRIANGLES, elementsNumber[tree3], gl.UNSIGNED_SHORT, 0);

    //Draw tree1
    gl.bindVertexArray(vaos[tree1]);
    gl.useProgram(programs[tree1]);
    gl.drawElements(gl.TRIANGLES, elementsNumber[tree1], gl.UNSIGNED_SHORT, 0);
    //window.requestAnimationFrame(drawScene);
}


////////////////// CODE EXECUTION ////////////////////

/*
Here starts the execution of the code by calling "main".
*/

window.onload = main;