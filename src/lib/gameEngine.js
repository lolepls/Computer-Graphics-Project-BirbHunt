// Camera variables:
var cx = 0.0;
var cy = 2.0;
var cz = 10.0;
var elevation = 0.0;
var angle = 0.0;

var u = [0.0, 1.0, 0.0];
var a = [0.0, 0.0, -1.0];


var gameEngine = {

    cameraUpdate: function(e){

      /*
      This function has to provide the movement for the camera. The most difficult thing is to obtain
      traslation and rotation around an arbitrary axis every time.
      */

      delta_rotation = 1.0;

      if(e.keyCode == 65){//a

        angle = angle + delta_rotation;
        //cameraMatrix = matrixUtils.MakeLookAt(a, c, u);
        cameraMatrix = matrixUtils.MakeView(cx, cy, cz, elevation, angle);

       
      }

      if(e.keyCode == 68){//d

        angle = angle - delta_rotation;
        cameraMatrix = matrixUtils.MakeView(cx, cy, cz, elevation, angle);

      }

      if(e.keyCode == 87){//w

        cx = cx + Math.sin(angle);
        cz = cz - Math.cos(angle);
        cameraMatrix = matrixUtils.MakeView(cx, cy, cz, elevation, angle);

      }

      if(e.keyCode == 83){//s

      }

      projectionMatrix = matrixUtils.multiplyMatrices(perspectiveMatrix, cameraMatrix);
      console.log(cameraMatrix);

    },

}

