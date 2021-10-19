var modelVertices;
var modelNormals;
var modelIndices;
var modelTextureCoord;

var elementsNumber = new Array();

// MODEL IDs //

var terrain = 0;
var tree3 = 1;
var tree1 = 2;
var flower = 3;
var goldenFlower = 4;


var modelLoader = {


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

