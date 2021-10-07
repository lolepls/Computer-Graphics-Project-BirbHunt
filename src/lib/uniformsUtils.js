var uniformUtils = {

    tree3Uniforms: function(program){

        // Textures:
        textureUtils.activateTexture(0);
        gl.bindTexture(gl.TEXTURE_2D, textures[0]);
    
        var textLocation = gl.getUniformLocation(program, "u_texture");
        gl.uniform1i(textLocation, 0);

        // Matrix position:
        var matrixLocation = gl.getUniformLocation(program, "matrix");
        var PositionMatrix = matrixUtils.MakeTranslateMatrix(-0.5, 0, 0);
        gl.uniformMatrix4fv(matrixLocation, gl.FALSE, matrixUtils.transposeMatrix(PositionMatrix));


    },

    tree3rightShiftUniforms: function(program){

        // Textures:
        textureUtils.activateTexture(0);
        gl.bindTexture(gl.TEXTURE_2D, textures[0]);
    
        var textLocation = gl.getUniformLocation(program, "u_texture");
        gl.uniform1i(textLocation, 0);

        // Matrix position:
        var matrixLocation = gl.getUniformLocation(program, "matrix");
        var PositionMatrix = matrixUtils.MakeTranslateMatrix(0.5, 0, 0);
        gl.uniformMatrix4fv(matrixLocation, gl.FALSE, matrixUtils.transposeMatrix(PositionMatrix));


    }


}