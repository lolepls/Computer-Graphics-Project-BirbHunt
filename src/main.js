/*
Main function for the Computer Graphics Project.
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

    //////// PROJECTION MATRIX INITIALIZATION /////////

    // Creation of the perspective matrix, which will be constant through all the application:
    var fov = 60;
    var aspect = canvas.clientWidth / canvas.clientHeight;
    var zNear = 1;
    var zFar = 2000;
    perspectiveMatrix = matrixUtils.MakePerspective(fov, aspect, zNear, zFar);


    /*
    Camera initialization. The values cx,cy,cz, elevation and angle come from "gameEngine.js".
    */
    cameraMatrix = matrixUtils.MakeView(cx, cy, cz, elevation, angle);

    // Projection matrix initialization:
    projectionMatrix = matrixUtils.multiplyMatrices(perspectiveMatrix, cameraMatrix);
  
    /////// SETTING OF THE GLOBAL STATE ////////

    //Setting of the Global state (viewport size, viewport background color, Depth test)
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0.85, 0.85, 0.85, 1.0);
    gl.enable(gl.DEPTH_TEST); //do this just in init
    gl.enable(gl.CULL_FACE); //I activate backface culling


    //////// LOADING OF THE MODELS, CREATION OF VAOs AND PROGRAMS //////////////

    // Since WebGL gives 8 slots for the textures, this functions have to specify the slot to use.
    // NOTE: Slot 0 is reserved for the skybox texture.Do not overwrite it!

    textureUtils.loadTexture("assets/textures/Texture_01.jpg", 1); // Texture 1 - All objects
    textureUtils.loadTexture("assets/textures/texture_gold.png", 2); // Texture 2 - Golden flower
    textureUtils.loadTexture("assets/textures/terrain_texture.jpg", 3); // Texture 3 - Terrain

    /* 
    Each model has a VAO and a program. Here they will be loaded. All the objects share the
    same shader, except for the golden flower because it implements some additional reflection.
    The variables used here such as "terrain" and "tree1" are defined in the "modelLoader.js" code,
    and they are just numerical indexes. 
    For example, if "tree1 = 1", it means that the position 1 in the programs array and in the vaos
    array refers to the tree1 model.
    */

    //Loading of the terrain (not from OBJ but from .js file)
    modelLoader.loadTerrain(terrain);
    programs[terrain] = await shaders.shaderLoader("glsl/terrain_vs.glsl", "glsl/terrain_fs.glsl");
    vaos[terrain] = VAO.create(terrain, programs[terrain]);

    //Loading of tree1:
    await modelLoader.loadModel("assets/tree1.obj", tree1);
    programs[tree1] = await shaders.shaderLoader("glsl/object_vs.glsl", "glsl/object_fs.glsl");
    vaos[tree1] = VAO.create(tree1, programs[tree1]);

    //Loading of tree2:
    await modelLoader.loadModel("assets/tree2.obj", tree2);
    programs[tree2] = await shaders.shaderLoader("glsl/object_vs.glsl", "glsl/object_fs.glsl");
    vaos[tree2] = VAO.create(tree2, programs[tree2]);

    //Loading of tree3:
    await modelLoader.loadModel("assets/tree3.obj", tree3);
    programs[tree3] = await shaders.shaderLoader("glsl/object_vs.glsl", "glsl/object_fs.glsl");
    vaos[tree3] = VAO.create(tree3, programs[tree3]);

    //Loading of tree4:
    await modelLoader.loadModel("assets/tree4.obj", tree4);
    programs[tree4] = await shaders.shaderLoader("glsl/object_vs.glsl", "glsl/object_fs.glsl");
    vaos[tree4] = VAO.create(tree4, programs[tree4]);

    //Loading of plant:
    await modelLoader.loadModel("assets/plant.obj", plant);
    programs[plant] = await shaders.shaderLoader("glsl/object_vs.glsl", "glsl/object_fs.glsl");
    vaos[plant] = VAO.create(plant, programs[plant]);

    //Loading of rock1:
    await modelLoader.loadModel("assets/rock1.obj", rock1);
    programs[rock1] = await shaders.shaderLoader("glsl/object_vs.glsl", "glsl/object_fs.glsl");
    vaos[rock1] = VAO.create(rock1, programs[rock1]);

    //Loading of rock2:
    await modelLoader.loadModel("assets/rock2.obj", rock2);
    programs[rock2] = await shaders.shaderLoader("glsl/object_vs.glsl", "glsl/object_fs.glsl");
    vaos[rock2] = VAO.create(rock2, programs[rock2]);

    //Loading of rock3:
    await modelLoader.loadModel("assets/rock3.obj", rock3);
    programs[rock3] = await shaders.shaderLoader("glsl/object_vs.glsl", "glsl/object_fs.glsl");
    vaos[rock3] = VAO.create(rock3, programs[rock3]);

    //Loading of smallrock:
    await modelLoader.loadModel("assets/smallrock.obj", smallrock);
    programs[smallrock] = await shaders.shaderLoader("glsl/object_vs.glsl", "glsl/object_fs.glsl");
    vaos[smallrock] = VAO.create(smallrock, programs[smallrock]);

    //Loading of stump:
    await modelLoader.loadModel("assets/stump.obj", stump);
    programs[stump] = await shaders.shaderLoader("glsl/object_vs.glsl", "glsl/object_fs.glsl");
    vaos[stump] = VAO.create(stump, programs[stump]);

    //Loading of standard flower:
    await modelLoader.loadModel("assets/flower.obj", flower);
    programs[flower] = await shaders.shaderLoader("glsl/object_vs.glsl", "glsl/object_fs.glsl");
    vaos[flower] = VAO.create(flower, programs[flower]);

    //Loading of golden flower:
    await modelLoader.loadModel("assets/flower.obj", goldenFlower);
    programs[goldenFlower] = await shaders.shaderLoader("glsl/goldenFlower_vs.glsl", "glsl/goldenFlower_fs.glsl");
    vaos[goldenFlower] = VAO.create(goldenFlower, programs[goldenFlower]);

//////// SKYBOX INITIALIZATION ///////

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
    for(tileIndexZ = 0; tileIndexZ< worldLength; tileIndexZ++){

        for(tileIndexX = 0; tileIndexX < worldWidth; tileIndexX++){

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

    // Draws a certain quantity of tree2 models in the positions defined in "worldPosition.js"
    for(i = 0; i < worldPosition.tree2.length; i++){

        gl.bindVertexArray(vaos[tree2]);
        gl.useProgram(programs[tree2]);
        uniformUtils.objectUniforms(programs[tree2], 1, worldPosition.tree2[i]);
        gl.drawElements(gl.TRIANGLES, elementsNumber[tree2], gl.UNSIGNED_SHORT, 0);
    
    }

    // Draws a certain quantity of tree3 models in the positions defined in "worldPosition.js"
    for(i = 0; i < worldPosition.tree3.length; i++){

        gl.bindVertexArray(vaos[tree3]);
        gl.useProgram(programs[tree3]);
        uniformUtils.objectUniforms(programs[tree3], 1, worldPosition.tree3[i]);
        gl.drawElements(gl.TRIANGLES, elementsNumber[tree3], gl.UNSIGNED_SHORT, 0);

    }

    // Draws a certain quantity of tree4 models in the positions defined in "worldPosition.js"
    for(i = 0; i < worldPosition.tree4.length; i++){

        gl.bindVertexArray(vaos[tree4]);
        gl.useProgram(programs[tree4]);
        uniformUtils.objectUniforms(programs[tree4], 1, worldPosition.tree4[i]);
        gl.drawElements(gl.TRIANGLES, elementsNumber[tree4], gl.UNSIGNED_SHORT, 0);
    
    }

    // Draws a certain quantity of flower models in the positions defined in "worldPosition.js"
    for(i = 0; i < worldPosition.flower.length; i++){

        gl.bindVertexArray(vaos[flower]);
        gl.useProgram(programs[flower]);
        uniformUtils.objectUniforms(programs[flower], 1, worldPosition.flower[i]);
        gl.drawElements(gl.TRIANGLES, elementsNumber[flower], gl.UNSIGNED_SHORT, 0);
    
    }

    
    // Draws a certain quantity of plant models in the positions defined in "worldPosition.js"
    for(i = 0; i < worldPosition.plant.length; i++){

        gl.bindVertexArray(vaos[plant]);
        gl.useProgram(programs[plant]);
        uniformUtils.objectUniforms(programs[plant], 1, worldPosition.plant[i]);
        gl.drawElements(gl.TRIANGLES, elementsNumber[plant], gl.UNSIGNED_SHORT, 0);
    
    }

    // Draws a certain quantity of rock1 models in the positions defined in "worldPosition.js"
    for(i = 0; i < worldPosition.rock1.length; i++){

        gl.bindVertexArray(vaos[rock1]);
        gl.useProgram(programs[rock1]);
        uniformUtils.objectUniforms(programs[rock1], 1, worldPosition.rock1[i]);
        gl.drawElements(gl.TRIANGLES, elementsNumber[rock1], gl.UNSIGNED_SHORT, 0);
        
    }

    // Draws a certain quantity of rock2 models in the positions defined in "worldPosition.js"
    for(i = 0; i < worldPosition.rock2.length; i++){

        gl.bindVertexArray(vaos[rock2]);
        gl.useProgram(programs[rock2]);
        uniformUtils.objectUniforms(programs[rock2], 1, worldPosition.rock2[i]);
        gl.drawElements(gl.TRIANGLES, elementsNumber[rock2], gl.UNSIGNED_SHORT, 0);
    
    }

    // Draws a certain quantity of rock3 models in the positions defined in "worldPosition.js"
    for(i = 0; i < worldPosition.rock3.length; i++){

        gl.bindVertexArray(vaos[rock3]);
        gl.useProgram(programs[rock3]);
        uniformUtils.objectUniforms(programs[rock3], 1, worldPosition.rock3[i]);
        gl.drawElements(gl.TRIANGLES, elementsNumber[rock3], gl.UNSIGNED_SHORT, 0);
    
    }

    // Draws a certain quantity of smallrock models in the positions defined in "worldPosition.js"
    for(i = 0; i < worldPosition.smallrock.length; i++){

        gl.bindVertexArray(vaos[smallrock]);
        gl.useProgram(programs[smallrock]);
        uniformUtils.objectUniforms(programs[smallrock], 1, worldPosition.smallrock[i]);
        gl.drawElements(gl.TRIANGLES, elementsNumber[smallrock], gl.UNSIGNED_SHORT, 0);
    
    }

    // Draws a certain quantity of stump models in the positions defined in "worldPosition.js"
    for(i = 0; i < worldPosition.stump.length; i++){

        gl.bindVertexArray(vaos[stump]);
        gl.useProgram(programs[stump]);
        uniformUtils.objectUniforms(programs[stump], 1, worldPosition.stump[i]);
        gl.drawElements(gl.TRIANGLES, elementsNumber[stump], gl.UNSIGNED_SHORT, 0);
    
    }


    // Lastly, draws the golden flower.
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