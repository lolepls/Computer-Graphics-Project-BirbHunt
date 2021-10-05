/*
Source code for the project of Computer Graphics.
*/

function main(){

    getCanvas();
    initializeYourProgram();
    drawScene();
    
}

function initializeYourProgram(){

    /*
    STEPS DA ESEGUIRE QUI:
    - load models
    - create shaders and programs, and uniform/attrib location
    - create buffers, upload vertex data
    - create a VAO per ogni cosa che vuoi disegnare
        - per ogni attributo chiama gl.bindBuffer, gl.vertexAttribPointer, gl.enableVertexAttribArray
        - se hai indexed primitives binda ogni indice a gl.ELEMENT_ARRAY_BUFFER
    - crea textures e uploada texture data
    */

    //Alcune funzioni già definite potrebbero aiutare
    compileAndLinkShaders();
    getAttributesAndUniformLocations();
    createVAO();
    putAttributesOnGPU();

}

function updateTransformationMatrices(){
    updateModel();
    updateView();
    updatePerspective();
}

function drawScene(){
    /*
    STEPS DA ESEGUIRE QUI
    
    - Pulire/impostare lo stato globale (backface cullilng ecc)
    - Per ogni cosa che vuoi disegnare:
        - chiama gl.useProgram per il programma GLSL desiderato.
        - binda l'array di vertici per l'elemento con gl.bindVertexArray
        - aggiorna le uniforms (le matrici di posizione) con:
            - gl.uniformXXX per ogni uniform
            gl.activeTexture e gl.bindTexture per ogni texture
        - chiama gl.drawArrays o gl.drawElements

    */

    //Alcune funzioni già definite potrebbero aiutare
    updateTransformationMatrices();
    bindVertexArray();
    sendUniformsToGPU();
    drawElements(); /*oppure*/ drawArray();

    window.requestAnimationFrame(drawScene);
}