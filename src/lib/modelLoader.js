var modelVertices;
var modelNormals;
var modelIndices;
var modelTextureCoord;

var modelLoader = {


    loadModels: async function(modelpath){

        var objStr = await objUtils.get_objstr(modelpath);
        var objModel = new Object.Mesh(objStr);

        modelVertices = objModel.vertices;
        modelNormals = objModel.vertexNormals;
        modelIndices = objModel.indices;
        modelTextureCoord = objModel.textures;

    }

}