var modelVertices;
var modelNormals;
var modelIndices;
var modelTextureCoord;

var elementsNumber = new Array();

// MODEL IDs //
var tree3 = 0;
var tree1 = 1;


var modelLoader = {


    loadModel: async function(modelpath, modelID){

        var objStr = await objUtils.get_objstr(modelpath);
        var objModel = new OBJ.Mesh(objStr);
        modelVertices = objModel.vertices;
        modelNormals = objModel.vertexNormals;
        modelIndices = objModel.indices;
        elementsNumber[modelID] = modelIndices.length;
        modelTextureCoord = objModel.textures;

    }

}

