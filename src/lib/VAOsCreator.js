/*
This utility script generates VAOs for each model we want to insert in the game. First of all, the function
"create" checks the index of the model and then calls the related VAO creator in order to provide the
correct VAO. Every time a new model is added to the game, the function must be updated with a new check and
a new creator.
*/


var VAO = {


    create: function(model, program){

       if(model == tree3){
           return tree3_vao_creator(program);
       }

       if(model == tree1){
        return tree1_vao_creator(program);
    }

       

    }

}


function tree3_vao_creator(program){

    var vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    // Per ogni valore che vogliamo passare al GLSL come attributo, creiamo un buffer e lo bindiamo.
    // Poi ci inseriamo i dati. I valori principali sono i vertici e gli indici.

    // Vertici:
    var size = 3;
    var normalize = false;
    var stride = 0;
    var offset = 0;

    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(modelVertices), gl.STATIC_DRAW);

    var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, size, gl.FLOAT, normalize, stride, offset);

     // Indici:
     var indexBuffer = gl.createBuffer();
     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
     gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(modelIndices), gl.STATIC_DRAW); 

    //UV Coordinates:
    var uvBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(modelTextureCoord), gl.STATIC_DRAW);

    var uvAttributeLocation = gl.getAttribLocation(program, "a_uv");
    gl.enableVertexAttribArray(uvAttributeLocation);
    gl.vertexAttribPointer(uvAttributeLocation, 2, gl.FLOAT, normalize, stride, offset);
    

    gl.bindVertexArray(null);

    return vao;

}

function tree1_vao_creator(program){

    var vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    // Per ogni valore che vogliamo passare al GLSL come attributo, creiamo un buffer e lo bindiamo.
    // Poi ci inseriamo i dati. I valori principali sono i vertici e gli indici.

    // Vertici:
    var size = 3;
    var normalize = false;
    var stride = 0;
    var offset = 0;

    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(modelVertices), gl.STATIC_DRAW);

    var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, size, gl.FLOAT, normalize, stride, offset);

    // Indici:
    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(modelIndices), gl.STATIC_DRAW); 

    gl.bindVertexArray(null);

    return vao;

}