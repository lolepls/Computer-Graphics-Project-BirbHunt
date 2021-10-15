var uniformUtils = {
   
    /*

    modelIDUniforms: function(program){

        ////// STUB VERSION FOR THE UNIFORM PASSING FUNCTIION.

        /// TEXTURES UNIFORMS
        // Here you can set what kind of texture your model uses.

        textureID = "Inserisci qui lo slot della texture da usare (0-7)";
        textureUtils.activateTexture(textureID);
        gl.bindTexture(gl.TEXTURE_2D, textures[textureID]);
    
        var textLocation = gl.getUniformLocation(program, "u_texture");
        gl.uniform1i(textLocation, textureID);
        //------------------------------------------

        // PROJECTION MATRIX:
        // This sets the projection matrix. Leave it as it is.
        var projectionLocation = gl.getUniformLocation(program, "projectionMatrix");
        gl.uniformMatrix4fv(projectionLocation, gl.FALSE, matrixUtils.transposeMatrix(projectionMatrix));

        /// WORLD MATRIX POSITION
        // Here you can set the position on the world of the object.
        var matrixLocation = gl.getUniformLocation(program, "worldMatrix");
        var PositionMatrix = matrixUtils.MakeTranslateMatrix(3.0, 0.0, 10.0);

        gl.uniformMatrix4fv(matrixLocation, gl.FALSE, matrixUtils.transposeMatrix(PositionMatrix));

    },

    */

    tree3Uniforms: function(program){

        /// TEXTURES UNIFORMS
        // Here you can set what kind of texture your model uses.
        textureID = 0;
        textureUtils.activateTexture(textureID);
        gl.bindTexture(gl.TEXTURE_2D, textures[textureID]);
    
        var textLocation = gl.getUniformLocation(program, "u_texture");
        gl.uniform1i(textLocation, textureID);
        //------------------------------------------

       
        // PROJECTION MATRIX:
        var projectionLocation = gl.getUniformLocation(program, "projectionMatrix");
        gl.uniformMatrix4fv(projectionLocation, gl.FALSE, matrixUtils.transposeMatrix(projectionMatrix));

        /// WORLD MATRIX POSITION
        // Here you can set the position on the world of the object.
        var matrixLocation = gl.getUniformLocation(program, "worldMatrix");
        var PositionMatrix = matrixUtils.MakeTranslateMatrix(3.0, 0.0, 10.0);

        gl.uniformMatrix4fv(matrixLocation, gl.FALSE, matrixUtils.transposeMatrix(PositionMatrix));


    },

    tree1Uniforms: function(program){

        /// TEXTURES UNIFORMS
        // Here you can set what kind of texture your model uses.
        textureID = 0;
        textureUtils.activateTexture(textureID);
        gl.bindTexture(gl.TEXTURE_2D, textures[textureID]);
    
        var textLocation = gl.getUniformLocation(program, "u_texture");
        gl.uniform1i(textLocation, textureID);

        //------------------------------------------

        /// CAMERA MATRIX SETTING
        var cameraMatrixLocation = gl.getUniformLocation(program, "projectionMatrix");
        gl.uniformMatrix4fv(cameraMatrixLocation, gl.FALSE, matrixUtils.transposeMatrix(projectionMatrix));

        /// WORLD MATRIX POSITION
        // Here you can set the position on the world of the object.
        var matrixLocation = gl.getUniformLocation(program, "worldMatrix");
        var PositionMatrix = matrixUtils.MakeTranslateMatrix(0.0, 0.0, 10.0);
        gl.uniformMatrix4fv(matrixLocation, gl.FALSE, matrixUtils.transposeMatrix(PositionMatrix));


    },

    tree3rightShiftUniforms: function(program){

        /// TEXTURES UNIFORMS
        // Here you can set what kind of texture your model uses.
        textureID = 1;
        textureUtils.activateTexture(textureID);
        gl.bindTexture(gl.TEXTURE_2D, textures[textureID]);
    
        var textLocation = gl.getUniformLocation(program, "u_texture");
        gl.uniform1i(textLocation, textureID);

        //------------------------------------------

    
         /// CAMERA MATRIX SETTING
         var cameraMatrixLocation = gl.getUniformLocation(program, "projectionMatrix");
         gl.uniformMatrix4fv(cameraMatrixLocation, gl.FALSE, matrixUtils.transposeMatrix(projectionMatrix));

        /// WORLD MATRIX POSITION
        // Here you can set the position on the world of the object.
        var matrixLocation = gl.getUniformLocation(program, "worldMatrix");
        var PositionMatrix = matrixUtils.MakeTranslateMatrix(-3.0, 0.0, 10.0);
        gl.uniformMatrix4fv(matrixLocation, gl.FALSE, matrixUtils.transposeMatrix(PositionMatrix));


    }



}