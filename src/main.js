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

var directLightDirection = [0.0, 1.0, 0.0];
var directLightColor = [0.5, 0.5, 0.5];

var upHemisphericLightColor = [0.910, 0.949, 0.992];
var downHemisphericLightColor = [0.482, 0.792, 0.361];

var dVector = [0.0, 1.0, 0.0];

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
    // NOTE: Slot 0 is reserved for the skybox texture.

    textureUtils.loadTexture("assets/textures/Texture_01.jpg", 1); // Texture 1
    textureUtils.loadTexture("assets/textures/texture_gold.png", 2); // Texture 2
    textureUtils.loadTexture("assets/textures/terrain_texture.jpg", 3); // Texture 3

    // Each model has a VAO and a program. 
    modelLoader.loadTerrain(terrain);
    programs[terrain] = await shaders.shaderLoader("glsl/terrain_vs.glsl", "glsl/terrain_fs.glsl");
    vaos[terrain] = VAO.create(terrain, programs[terrain]);

    await modelLoader.loadModel("assets/tree3.obj", tree3);
    programs[tree3] = await shaders.shaderLoader("glsl/object_vs.glsl", "glsl/object_fs.glsl");
    vaos[tree3] = VAO.create(tree3, programs[tree3]);

    await modelLoader.loadModel("assets/tree1.obj", tree1);
    programs[tree1] = await shaders.shaderLoader("glsl/object_vs.glsl", "glsl/object_fs.glsl");
    vaos[tree1] = VAO.create(tree1, programs[tree1]);

    // Standard flower:
    await modelLoader.loadModel("assets/flower.obj", flower);
    programs[flower] = await shaders.shaderLoader("glsl/object_vs.glsl", "glsl/object_fs.glsl");
    vaos[flower] = VAO.create(flower, programs[flower]);

    //Golden flower:
    await modelLoader.loadModel("assets/flower.obj", goldenFlower);
    programs[goldenFlower] = await shaders.shaderLoader("glsl/goldenFlower_vs.glsl", "glsl/goldenFlower_fs.glsl");
    vaos[goldenFlower] = VAO.create(goldenFlower, programs[goldenFlower]);


    // Skybox initialization:
    skybox.init();

}

function updateGame(timestamp){

    gameEngine.cameraUpdate(timestamp);
    gameEngine.checkwin();

    if(flowerFound){

    gameEngine.translateFlower();

    }

    drawScene();
    window.requestAnimationFrame(updateGame);

}

function drawScene(){

    // GLOBAL STATE SETTING
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); //da fare ogni volta che si disegna la scena

    // CALL OF DRAWING FUNCTIONS

    // Draw skybox
    skybox.drawSkybox();

    // Draw terrain tiles with a loop.
    for(tileIndexZ = 0; tileIndexZ< 10; tileIndexZ++){

        for(tileIndexX = 0; tileIndexX < 10; tileIndexX++){

        gl.bindVertexArray(vaos[terrain]);
        gl.useProgram(programs[terrain]);
        uniformUtils.terrainUniforms(programs[terrain], tileIndexZ, tileIndexX);
        gl.drawElements(gl.TRIANGLES, elementsNumber[terrain], gl.UNSIGNED_SHORT, 0);
        }

    }

    // Draws a certain quantity of tree1 models in the positions defined in "worldPosition.js"
    for(i = 0; i < worldPosition.tree1.length; i++){

        gl.bindVertexArray(vaos[tree1]);
        gl.useProgram(programs[tree1]);
        uniformUtils.objectUniforms(programs[tree1], 1, worldPosition.tree1[i]);
        gl.drawElements(gl.TRIANGLES, elementsNumber[tree1], gl.UNSIGNED_SHORT, 0);
    
    }

    // Draws a certain quantity of tree3 models in the positions defined in "worldPosition.js"
    for(i = 0; i < worldPosition.tree3.length; i++){

        gl.bindVertexArray(vaos[tree3]);
        gl.useProgram(programs[tree3]);
        uniformUtils.objectUniforms(programs[tree3], 1, worldPosition.tree3[i]);
        gl.drawElements(gl.TRIANGLES, elementsNumber[tree3], gl.UNSIGNED_SHORT, 0);

    }

    // Draws a certain quantity of flower models in the positions defined in "worldPosition.js"
    for(i = 0; i < worldPosition.flower.length; i++){

        gl.bindVertexArray(vaos[flower]);
        gl.useProgram(programs[flower]);
        uniformUtils.objectUniforms(programs[flower], 1, worldPosition.flower[i]);
        gl.drawElements(gl.TRIANGLES, elementsNumber[flower], gl.UNSIGNED_SHORT, 0);
    
    }

    // Draws the golden flower.
    if(flowerFound){
        // If the flower is found, it is rised to the viewer's height and it starts rotating
        // We have to disable backface culling in order to show all the faces of the flower correctly.
        gl.disable(gl.CULL_FACE);
    }

    gl.bindVertexArray(vaos[goldenFlower]);
    gl.useProgram(programs[goldenFlower]);
    uniformUtils.goldenFlowerUniforms(programs[goldenFlower], 2, worldPosition.goldenFlower);
    gl.drawElements(gl.TRIANGLES, elementsNumber[goldenFlower], gl.UNSIGNED_SHORT, 0);

    if(flowerFound){
        //We enable again backface culling.
        gl.enable(gl.CULL_FACE);
    }

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