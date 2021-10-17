/*
Source code for the project of Computer Graphics.
*/

/////////////// GLOBAL VARIABLES /////////////////////

var programs = new Array();
var vaos = new Array();

var perspectiveMatrix;
var cameraMatrix;
var projectionMatrix;

var keyPressed = [];

//////////// FUNCTIONS DEFINITION ///////////////////

async function main(){

    canvasLoader.getCanvas();
    canvasLoader.resizeCanvasToDisplaySize(canvas);
    await init();
    window.requestAnimationFrame(updateGame);
    
}

async function init(){

    // Creation of the perspective matrix, which will be constant through all the application:
    var fov = 60;
    var aspect = canvas.clientWidth / canvas.clientHeight;
    var zNear = 1;
    var zFar = 2000;
    perspectiveMatrix = matrixUtils.MakePerspective(fov, aspect, zNear, zFar);


    // Camera initialization:
    cameraMatrix = matrixUtils.MakeView(cx, cy, cz, elevation, angle);

    // Projection matrix initialization:
    projectionMatrix = matrixUtils.multiplyMatrices(perspectiveMatrix, cameraMatrix);
  

    //Setting of the Global states (viewport size, viewport background color, Depth test)
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0.85, 0.85, 0.85, 1.0);
    gl.enable(gl.DEPTH_TEST); //da fare solamente in init
    gl.enable(gl.CULL_FACE); //se vuoi backface culling


    //////// LOADING OF THE MODELS, CREATION OF VAOs AND PROGRAMS //////////////

    // Since WebGL gives 8 slots for the textures, this functions have to specify the slot to use.
    // NOTE: Slot 0 is reserved to the skybox texture.

    textureUtils.loadTexture("assets/textures/Texture_01.jpg", 1);
    textureUtils.loadTexture("assets/textures/texture_birb.png", 2);

    // Each model has a VAO and a program.
    await modelLoader.loadModel("assets/tree3.obj", tree3);
    programs[tree3] = await shaders.shaderLoader("glsl/tree3_vs.glsl", "glsl/tree3_fs.glsl");
    vaos[tree3] = VAO.create(tree3, programs[tree3]);

    await modelLoader.loadModel("assets/tree1.obj", tree1);
    programs[tree1] = await shaders.shaderLoader("glsl/tree1_vs.glsl", "glsl/tree1_fs.glsl");
    vaos[tree1] = VAO.create(tree1, programs[tree1]);

    await modelLoader.loadModel("assets/flower.obj", flower);
    programs[flower] = await shaders.shaderLoader("glsl/flower_vs.glsl", "glsl/flower_fs.glsl");
    vaos[flower] = VAO.create(flower, programs[flower]);

    // Skybox initialization:
    skybox.init();

}

function updateGame(timestamp){

    gameEngine.cameraUpdate(timestamp);
    drawScene();
    window.requestAnimationFrame(updateGame);

}

function drawScene(){

    // GLOBAL STATE SETTING
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); //da fare ogni volta che si disegna la scena

    // CALL OF DRAWING FUNCTIONS

    // Draw skybox
    skybox.drawSkybox();

    // Draw tree3
    gl.bindVertexArray(vaos[tree3]);
    gl.useProgram(programs[tree3]);
    uniformUtils.tree3Uniforms(programs[tree3]);
    gl.drawElements(gl.TRIANGLES, elementsNumber[tree3], gl.UNSIGNED_SHORT, 0);

    // Draw a copy of tree3 but shifted and with a different texture
    uniformUtils.tree3rightShiftUniforms(programs[tree3]);
    gl.drawElements(gl.TRIANGLES, elementsNumber[tree3], gl.UNSIGNED_SHORT, 0);

    // Draw tree1
    gl.bindVertexArray(vaos[tree1]);
    gl.useProgram(programs[tree1]);
    uniformUtils.tree1Uniforms(programs[tree1]);
    gl.drawElements(gl.TRIANGLES, elementsNumber[tree1], gl.UNSIGNED_SHORT, 0);

    // Draw flower
    gl.bindVertexArray(vaos[flower]);
    gl.useProgram(programs[flower]);
    uniformUtils.flowerUniforms(programs[flower]);
    gl.drawElements(gl.TRIANGLES, elementsNumber[flower], gl.UNSIGNED_SHORT, 0);

}


////////////////// CODE EXECUTION ////////////////////

/*
Here starts the execution of the code by calling "main".
*/

window.addEventListener('keydown', (e) => {
    keyPressed[e.keyCode] = true;
    e.preventDefault();
  });
  window.addEventListener('keyup', (e) => {
    keyPressed[e.keyCode] = false;
    e.preventDefault();
  });

window.onload = main;