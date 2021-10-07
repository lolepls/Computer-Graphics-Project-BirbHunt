var textures = new Array();

var textureUtils = {


    loadTexture: function(texturePath, textureUnit){


        // Create a texture.
        var texture = gl.createTexture();

        // Choose which texture unit to use
        if(textureUnit == 0){
            gl.activeTexture(gl.TEXTURE0);
        }
        else if(textureUnit == 1){
            gl.activeTexture(gl.TEXTURE1);
        }
        else if(textureUnit == 2){
            gl.activeTexture(gl.TEXTURE2);
        }
        else if(textureUnit == 3){
            gl.activeTexture(gl.TEXTURE3);
        }
        else if(textureUnit == 4){
            gl.activeTexture(gl.TEXTURE4);
        }
        else if(textureUnit == 5){
            gl.activeTexture(gl.TEXTURE5);
        }
        else if(textureUnit == 6){
            gl.activeTexture(gl.TEXTURE6);
        }
        else {
            gl.activeTexture(gl.TEXTURE7);
        }

        // bind to the TEXTURE_2D bind point of texture unit
        gl.bindTexture(gl.TEXTURE_2D, texture);

        // Asynchronously load an image
        var image = new Image();
        image.src = texturePath;

        image.onload = function() {
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
            
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

            gl.generateMipmap(gl.TEXTURE_2D);
        };

        textures[textureUnit] = texture;

    },

    
    activateTexture: function(textureID){

                // Choose which texture unit to use
                if(textureID == 0){
                    gl.activeTexture(gl.TEXTURE0);
                }
                else if(textureID == 1){
                    gl.activeTexture(gl.TEXTURE1);
                }
                else if(textureID == 2){
                    gl.activeTexture(gl.TEXTURE2);
                }
                else if(textureID == 3){
                    gl.activeTexture(gl.TEXTURE3);
                }
                else if(textureID == 4){
                    gl.activeTexture(gl.TEXTURE4);
                }
                else if(textureID == 5){
                    gl.activeTexture(gl.TEXTURE5);
                }
                else if(textureID == 6){
                    gl.activeTexture(gl.TEXTURE6);
                }
                else {
                    gl.activeTexture(gl.TEXTURE7);
                }
    }


}