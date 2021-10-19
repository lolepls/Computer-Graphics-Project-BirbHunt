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

    skyboxUniforms: function(program){

        textureID = 0;
        textureUtils.activateTexture(textureID);
        var textLocation = gl.getUniformLocation(program, "u_texture"); 
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, textures[skybox]);
        gl.uniform1i(textLocation, textureID);

        // PROJECTION MATRIX:
        var projectionLocation = gl.getUniformLocation(program, "projectionMatrix");
        gl.uniformMatrix4fv(projectionLocation, gl.FALSE, matrixUtils.transposeMatrix(
            matrixUtils.invertMatrix(projectionMatrix)));

    },

    tree3Uniforms: function(program){

        /// TEXTURES UNIFORMS
        // Here you can set what kind of texture your model uses.
        textureID = 1;
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

        // NORMAL MATRIX
        var nMatrixLocation = gl.getUniformLocation(program, "nMatrix");
        var normalMatrix = matrixUtils.invertMatrix(PositionMatrix);
        normalMatrix = matrixUtils.transposeMatrix(normalMatrix);
        gl.uniformMatrix4fv(nMatrixLocation, gl.FALSE, normalMatrix);

        // LIGHT MATRIX
        var lightDirectionLocation = gl.getUniformLocation(program, 'directLightDirection');
        gl.uniform3fv(lightDirectionLocation,  directLightDirection);

        var lightColorLocation = gl.getUniformLocation(program, 'directLightColor');
        gl.uniform3fv(lightColorLocation,  directLightColor);

        var upHemisphericLightLocation = gl.getUniformLocation(program, 'upHemisphericLightColor');
        gl.uniform3fv(upHemisphericLightLocation, upHemisphericLightColor);

        var downHemisphericLightLocation = gl.getUniformLocation(program, 'downHemisphericLightColor');
        gl.uniform3fv(downHemisphericLightLocation, downHemisphericLightColor);

        var dVectorLocation = gl.getUniformLocation(program, 'dVector');
        gl.uniform3fv(dVectorLocation, dVector);

        

    },

    tree3Uniforms: function(program){

        /// TEXTURES UNIFORMS
        // Here you can set what kind of texture your model uses.
        textureID = 1;
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

        // NORMAL MATRIX
        var nMatrixLocation = gl.getUniformLocation(program, "nMatrix");
        var normalMatrix = matrixUtils.invertMatrix(PositionMatrix);
        normalMatrix = matrixUtils.transposeMatrix(normalMatrix);
        gl.uniformMatrix4fv(nMatrixLocation, gl.FALSE, normalMatrix);

        // LIGHT MATRIX
        var lightDirectionLocation = gl.getUniformLocation(program, 'directLightDirection');
        gl.uniform3fv(lightDirectionLocation,  directLightDirection);

        var lightColorLocation = gl.getUniformLocation(program, 'directLightColor');
        gl.uniform3fv(lightColorLocation,  directLightColor);

        var upHemisphericLightLocation = gl.getUniformLocation(program, 'upHemisphericLightColor');
        gl.uniform3fv(upHemisphericLightLocation, upHemisphericLightColor);

        var downHemisphericLightLocation = gl.getUniformLocation(program, 'downHemisphericLightColor');
        gl.uniform3fv(downHemisphericLightLocation, downHemisphericLightColor);

        var dVectorLocation = gl.getUniformLocation(program, 'dVector');
        gl.uniform3fv(dVectorLocation, dVector);

        

    },

    terrainUniforms: function(program, tileIndexZ, tileIndexX){

        /// TEXTURES UNIFORMS
        // Here you can set what kind of texture your model uses.
        textureID = 3;
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
        var PositionMatrix = matrixUtils.MakeTranslateMatrix(10.0*tileIndexX, 0.0, 10.0*tileIndexZ);
        gl.uniformMatrix4fv(matrixLocation, gl.FALSE, matrixUtils.transposeMatrix(PositionMatrix));

        // NORMAL MATRIX
        var nMatrixLocation = gl.getUniformLocation(program, "nMatrix");
        var normalMatrix = matrixUtils.invertMatrix(PositionMatrix);
        normalMatrix = matrixUtils.transposeMatrix(normalMatrix);
        gl.uniformMatrix4fv(nMatrixLocation, gl.FALSE, normalMatrix);

        // LIGHT MATRIX
        var lightDirectionLocation = gl.getUniformLocation(program, 'directLightDirection');
        gl.uniform3fv(lightDirectionLocation,  directLightDirection);
    
        var lightColorLocation = gl.getUniformLocation(program, 'directLightColor');
        gl.uniform3fv(lightColorLocation,  directLightColor);
    
        var upHemisphericLightLocation = gl.getUniformLocation(program, 'upHemisphericLightColor');
        gl.uniform3fv(upHemisphericLightLocation, upHemisphericLightColor);
    
        var downHemisphericLightLocation = gl.getUniformLocation(program, 'downHemisphericLightColor');
        gl.uniform3fv(downHemisphericLightLocation, downHemisphericLightColor);

        var dVectorLocation = gl.getUniformLocation(program, 'dVector');
        gl.uniform3fv(dVectorLocation, dVector);
        


    },

    tree1Uniforms: function(program){

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
        var PositionMatrix = matrixUtils.MakeTranslateMatrix(0.0, 0.0, 10.0);
        gl.uniformMatrix4fv(matrixLocation, gl.FALSE, matrixUtils.transposeMatrix(PositionMatrix));

        // NORMAL MATRIX
        var nMatrixLocation = gl.getUniformLocation(program, "nMatrix");
        var normalMatrix = matrixUtils.invertMatrix(PositionMatrix);
        normalMatrix = matrixUtils.transposeMatrix(normalMatrix);
        gl.uniformMatrix4fv(nMatrixLocation, gl.FALSE, normalMatrix);

        // LIGHT MATRIX
        var lightDirectionLocation = gl.getUniformLocation(program, 'directLightDirection');
        gl.uniform3fv(lightDirectionLocation,  directLightDirection);
    
        var lightColorLocation = gl.getUniformLocation(program, 'directLightColor');
        gl.uniform3fv(lightColorLocation,  directLightColor);
    
        var upHemisphericLightLocation = gl.getUniformLocation(program, 'upHemisphericLightColor');
        gl.uniform3fv(upHemisphericLightLocation, upHemisphericLightColor);
    
        var downHemisphericLightLocation = gl.getUniformLocation(program, 'downHemisphericLightColor');
        gl.uniform3fv(downHemisphericLightLocation, downHemisphericLightColor);

        var dVectorLocation = gl.getUniformLocation(program, 'dVector');
        gl.uniform3fv(dVectorLocation, dVector);
        


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

         // NORMAL MATRIX
        var nMatrixLocation = gl.getUniformLocation(program, "nMatrix");
        var normalMatrix = matrixUtils.invertMatrix(PositionMatrix);
        normalMatrix = matrixUtils.transposeMatrix(normalMatrix);
        gl.uniformMatrix4fv(nMatrixLocation, gl.FALSE, normalMatrix);

        // LIGHT MATRIX
        var lightDirectionLocation = gl.getUniformLocation(program, 'directLightDirection');
        gl.uniform3fv(lightDirectionLocation,  directLightDirection);

        var lightColorLocation = gl.getUniformLocation(program, 'directLightColor');
        gl.uniform3fv(lightColorLocation,  directLightColor);

        var upHemisphericLightLocation = gl.getUniformLocation(program, 'upHemisphericLightColor');
        gl.uniform3fv(upHemisphericLightLocation, upHemisphericLightColor);

        var downHemisphericLightLocation = gl.getUniformLocation(program, 'downHemisphericLightColor');
        gl.uniform3fv(downHemisphericLightLocation, downHemisphericLightColor);

        var dVectorLocation = gl.getUniformLocation(program, 'dVector');
        gl.uniform3fv(dVectorLocation, dVector);
        
    },

    flowerUniforms: function(program){

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
        var PositionMatrix = matrixUtils.MakeTranslateMatrix(5.0, 0.0, 15.0);
        gl.uniformMatrix4fv(matrixLocation, gl.FALSE, matrixUtils.transposeMatrix(PositionMatrix));

        // NORMAL MATRIX
        var nMatrixLocation = gl.getUniformLocation(program, "nMatrix");
        var normalMatrix = matrixUtils.transposeMatrix(PositionMatrix);
        normalMatrix = matrixUtils.invertMatrix(normalMatrix);
        gl.uniformMatrix4fv(nMatrixLocation, gl.FALSE, normalMatrix);

        // LIGHT MATRIX
        var lightDirectionLocation = gl.getUniformLocation(program, 'directLightDirection');
        gl.uniform3fv(lightDirectionLocation,  directLightDirection);

        var lightColorLocation = gl.getUniformLocation(program, 'directLightColor');
        gl.uniform3fv(lightColorLocation,  directLightColor);

        var upHemisphericLightLocation = gl.getUniformLocation(program, 'upHemisphericLightColor');
        gl.uniform3fv(upHemisphericLightLocation, upHemisphericLightColor);

        var downHemisphericLightLocation = gl.getUniformLocation(program, 'downHemisphericLightColor');
        gl.uniform3fv(downHemisphericLightLocation, downHemisphericLightColor);

        var dVectorLocation = gl.getUniformLocation(program, 'dVector');
        gl.uniform3fv(dVectorLocation, dVector);

        

    },

    objectUniforms: function(program, textureID, worldPosition){

        /// TEXTURES UNIFORMS
        // Here you can set what kind of texture your model uses.
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
        var PositionMatrix =  matrixUtils.MakeTranslateMatrix(worldPosition[0], worldPosition[1], worldPosition[2]);
        PositionMatrix = matrixUtils.multiplyMatrices(PositionMatrix, matrixUtils.MakeRotateYMatrix(worldPosition[3]));
        gl.uniformMatrix4fv(matrixLocation, gl.FALSE, matrixUtils.transposeMatrix(PositionMatrix));

        // NORMAL MATRIX
        var nMatrixLocation = gl.getUniformLocation(program, "nMatrix");
        var normalMatrix = matrixUtils.invertMatrix(PositionMatrix);
        normalMatrix = matrixUtils.transposeMatrix(normalMatrix);
        gl.uniformMatrix4fv(nMatrixLocation, gl.FALSE, normalMatrix);

        // LIGHT VECTORS
        var lightDirectionLocation = gl.getUniformLocation(program, 'directLightDirection');
        gl.uniform3fv(lightDirectionLocation,  directLightDirection);

        var lightColorLocation = gl.getUniformLocation(program, 'directLightColor');
        gl.uniform3fv(lightColorLocation,  directLightColor);

        var upHemisphericLightLocation = gl.getUniformLocation(program, 'upHemisphericLightColor');
        gl.uniform3fv(upHemisphericLightLocation, upHemisphericLightColor);

        var downHemisphericLightLocation = gl.getUniformLocation(program, 'downHemisphericLightColor');
        gl.uniform3fv(downHemisphericLightLocation, downHemisphericLightColor);

        var dVectorLocation = gl.getUniformLocation(program, 'dVector');
        gl.uniform3fv(dVectorLocation, dVector);

        

    },

    goldenFlowerUniforms: function(program, textureID, worldPosition){

        /// TEXTURES UNIFORMS
        // Here you can set what kind of texture your model uses.
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
        var PositionMatrix =  matrixUtils.MakeTranslateMatrix(worldPosition[0], worldPosition[1], worldPosition[2]);
        PositionMatrix = matrixUtils.multiplyMatrices(PositionMatrix, matrixUtils.MakeRotateYMatrix(worldPosition[3]));
        gl.uniformMatrix4fv(matrixLocation, gl.FALSE, matrixUtils.transposeMatrix(PositionMatrix));

        // NORMAL MATRIX
        var nMatrixLocation = gl.getUniformLocation(program, "nMatrix");
        var normalMatrix = matrixUtils.invertMatrix(PositionMatrix);
        normalMatrix = matrixUtils.transposeMatrix(normalMatrix);
        gl.uniformMatrix4fv(nMatrixLocation, gl.FALSE, normalMatrix);

        // LIGHT VECTORS
        var observerDirectionLocation = gl.getUniformLocation(program, 'observerDirection');
        gl.uniform3fv(observerDirectionLocation, observerDirection);

        var lightDirectionLocation = gl.getUniformLocation(program, 'directLightDirection');
        gl.uniform3fv(lightDirectionLocation,  directLightDirection);

        var lightColorLocation = gl.getUniformLocation(program, 'directLightColor');
        gl.uniform3fv(lightColorLocation,  directLightColor);

        var upHemisphericLightLocation = gl.getUniformLocation(program, 'upHemisphericLightColor');
        gl.uniform3fv(upHemisphericLightLocation, upHemisphericLightColor);

        var downHemisphericLightLocation = gl.getUniformLocation(program, 'downHemisphericLightColor');
        gl.uniform3fv(downHemisphericLightLocation, downHemisphericLightColor);

        var dVectorLocation = gl.getUniformLocation(program, 'dVector');
        gl.uniform3fv(dVectorLocation, dVector);

        

    },




}