var shaders = {


  createAndCompileShader:function(gl, type, source) {

		var shader = gl.createShader(type);
		gl.shaderSource(shader, source);
		gl.compileShader(shader);
		var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
		if (success) {    
      console.log("Shader compiled correctly!");
		  return shader;
		}else{
		  console.log(gl.getShaderInfoLog(shader));  // eslint-disable-line
      gl.deleteShader(shader);
      throw "could not compile shader:" + gl.getShaderInfoLog(shader);
		}
	  
	},


  createProgram:function(gl, vertexShader, fragmentShader) {
        var program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        var success = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (success) {
          console.log("Program created correctly!");
          return program;
        }else{
           throw ("program filed to link:" + gl.getProgramInfoLog (program));
          console.log(gl.getProgramInfoLog(program));  // eslint-disable-line
          gl.deleteProgram(program);
          return undefined;
        }
  },

      
     

  shaderLoader: async function(vertexShader_path, fragmentShader_path){


        //Qui bisogna convertire da paths a testo e salvare in vertexShaderSource ecc..
        var vertexShaderSource = await fileUtils.loadFile(vertexShader_path);
        var fragmentShaderSource = await fileUtils.loadFile(fragmentShader_path);
        //

        var vertexShader = shaders.createAndCompileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
        var fragmentShader = shaders.createAndCompileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

        // Now we have to create a program and link it.
        return shaders.createProgram(gl, vertexShader, fragmentShader);

  },


}