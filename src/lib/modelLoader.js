var modelVertices;
var modelNormals;
var modelIndices;
var modelTextureCoord;

var elementsNumber = new Array();

// MODEL IDs //
/*
Each 3D model you want in the game must be indexed with a number. If you want to add a new model you have
to add a new var with a progressive index.
*/

var terrain = 0;
var tree3 = 1;
var tree1 = 2;
var flower = 3;
var goldenFlower = 4;
var plant = 5;
var rock1 = 6;
var rock2 = 7;
var rock3 = 8;
var smallrock = 9;
var stump = 10;
var tree2 = 11;
var tree4 = 12;


var modelLoader = {


    /*
    This function loads a model in .obj file, by extracting 
    vertices, normals, indexes and texture coordinates.
    */
    loadModel: async function(modelpath, modelID){

        var objStr = await objUtils.get_objstr(modelpath);
        var objModel = new OBJ.Mesh(objStr);
        modelVertices = objModel.vertices;
        modelNormals = objModel.vertexNormals;
        modelIndices = objModel.indices;
        elementsNumber[modelID] = modelIndices.length;
        modelTextureCoord = objModel.textures;

    },

    loadTerrain: function(modelID){

        modelVertices = terrain.vertices;
        modelNormals = terrain.normals;
        modelIndices = terrain.indices;
        elementsNumber[modelID] = modelIndices.length;
        modelTextureCoord = terrain.uvCoord;
    }


}

