var uniformUtils = {

    tree3Uniforms: function(program){

        // Textures:
        textureID = 0;
        textureUtils.activateTexture(textureID);
        gl.bindTexture(gl.TEXTURE_2D, textures[textureID]);
    
        var textLocation = gl.getUniformLocation(program, "u_texture");
        gl.uniform1i(textLocation, textureID);

        // Matrix position:
        var matrixLocation = gl.getUniformLocation(program, "matrix");
        var PositionMatrix = matrixUtils.MakeTranslateMatrix(-0.5, 0, 0);
        gl.uniformMatrix4fv(matrixLocation, gl.FALSE, matrixUtils.transposeMatrix(PositionMatrix));


    },

    tree1Uniforms: function(program){

        // Textures:
        textureID = 0;
        textureUtils.activateTexture(textureID);
        gl.bindTexture(gl.TEXTURE_2D, textures[textureID]);
    
        var textLocation = gl.getUniformLocation(program, "u_texture");
        gl.uniform1i(textLocation, textureID);

        // Matrix position:
        var matrixLocation = gl.getUniformLocation(program, "matrix");
        var PositionMatrix = matrixUtils.MakeTranslateMatrix(0.0, 0.0, 0.0);
        
        gl.uniformMatrix4fv(matrixLocation, gl.FALSE, matrixUtils.transposeMatrix(PositionMatrix));


    },

    tree3rightShiftUniforms: function(program){

        // Textures:
        textureID = 1;
        textureUtils.activateTexture(textureID);
        gl.bindTexture(gl.TEXTURE_2D, textures[textureID]);
    
        var textLocation = gl.getUniformLocation(program, "u_texture");
        gl.uniform1i(textLocation, textureID);

        // Matrix position:
        var matrixLocation = gl.getUniformLocation(program, "matrix");
        var PositionMatrix = matrixUtils.MakeTranslateMatrix(0.5, 0, 0);
        gl.uniformMatrix4fv(matrixLocation, gl.FALSE, matrixUtils.transposeMatrix(PositionMatrix));


    }


}