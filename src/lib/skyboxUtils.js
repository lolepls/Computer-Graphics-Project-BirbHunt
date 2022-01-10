// This skybox rendering code was provided by Professor Stella and has been integrated in the project
// by using some custom skyboxes provided by Dario Mombelli (dario_mombelli@studenti.naba.it)

var skyboxProgram;
var skyboxVao;
var skyboxTexture;
var skyboxTexHandle;
var skyboxVertPosAttr;
var inverseViewProjMatrixHandle;

var skybox = {

    init: async function(){
        
        skyboxProgram = await shaders.shaderLoader("glsl/skybox_vs.glsl", "glsl/skybox_fs.glsl");
        this.loadEnvironment();
        this.getAttributesAndUniforms();
    },

    drawSkybox: function(){

        gl.useProgram(skyboxProgram);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, skyboxTexture);
        gl.uniform1i(skyboxTexHandle, 0);
        
        inverseViewProjMatrix = matrixUtils.invertMatrix(projectionMatrix);
        gl.uniformMatrix4fv(inverseViewProjMatrixHandle, gl.FALSE, 
            matrixUtils.transposeMatrix(inverseViewProjMatrix));
        
        gl.bindVertexArray(skyboxVao);
        gl.depthFunc(gl.LEQUAL);
        gl.drawArrays(gl.TRIANGLES, 0, 1*6);
    },

    getAttributesAndUniforms: function(){

    skyboxTexHandle = gl.getUniformLocation(skyboxProgram, "u_texture"); 
    inverseViewProjMatrixHandle = gl.getUniformLocation(skyboxProgram, "inverseViewProjMatrix"); 
    skyboxVertPosAttr = gl.getAttribLocation(skyboxProgram, "in_position");
    },

    loadEnvironment: function(){

        skyboxVertPos = new Float32Array(
            [
              -1, -1, 1.0,
               1, -1, 1.0,
              -1,  1, 1.0,
              -1,  1, 1.0,
               1, -1, 1.0,
               1,  1, 1.0,
            ]);
            
            skyboxVao = gl.createVertexArray();
            gl.bindVertexArray(skyboxVao);
            
            var positionBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, skyboxVertPos, gl.STATIC_DRAW);
            gl.enableVertexAttribArray(skyboxVertPosAttr);
            gl.vertexAttribPointer(skyboxVertPosAttr, 3, gl.FLOAT, false, 0, 0);
            
            skyboxTexture = gl.createTexture();
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_CUBE_MAP, skyboxTexture);
            
         
            const faceInfos = [
                {
                    target: gl.TEXTURE_CUBE_MAP_POSITIVE_X, 
                    url: 'assets/skybox/sky_left.png',
                },
                {
                    target: gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 
                    url: 'assets/skybox/sky_right.png',
                },
                {
                    target: gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 
                    url: 'assets/skybox/sky_up.png',
                },
                {
                    target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 
                    url: 'assets/skybox/sky_down.png',
                },
                {
                    target: gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 
                    url: 'assets/skybox/sky_front.png',
                },
                {
                    target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 
                    url: 'assets/skybox/sky_back.png',
                },
            ];
            faceInfos.forEach((faceInfo) => {
                const {target, url} = faceInfo;
                
                // Upload the canvas to the cubemap face.
                const level = 0;
                const internalFormat = gl.RGBA;
                const width = 512;
                const height = 512;
                const format = gl.RGBA;
                const type = gl.UNSIGNED_BYTE;
                
                // setup each face so it's immediately renderable
                gl.texImage2D(target, level, internalFormat, width, height, 0, format, type, null);
                
                // Asynchronously load an image
                const image = new Image();
                image.src = url;
                image.addEventListener('load', function() {
                    // Now that the image has loaded upload it to the texture.
                    gl.activeTexture(gl.TEXTURE0+3);
                    gl.bindTexture(gl.TEXTURE_CUBE_MAP, skyboxTexture);
                    gl.texImage2D(target, level, internalFormat, format, type, image);
                    gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
                });
            
                
            });
            gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
            gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);

    }

}