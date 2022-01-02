/*
This file contains the game engine, which manages the camera movement, the check for the winning condition
and the animation of the golden flower in case of winning.

The code for the FPS camera is an adaptation of the FPS camera shown in the WebGLFudamentals website:
(https://webgl2fundamentals.org/webgl/lessons/webgl-qna-fps-like-camera-movement-with-basic-matrix-transformations.html)
The camera will only work as intended if the camera is supposed to move parallel to the ground.

*/

////// GLOBAL VARIABLES ////////

/// TIMING VARIABLES ///
var pastTimeStamp = 0; // Instant zero.

/// CAMERA VARIABLES ///
var cx = 0.0; //Initial x position in the space of the player
var cy = 1.0; // Initial y position in the space of the player
var cz = 0.0; // Initial z position in the space of the player

var elevation = 0.0; // Initial elevation angle of the player
var angle = 180.0; // Initial angle to which the camera is oriented.
var roll = 0.0; // Initial roll of the player

var speed = 5; // walking speed of the camera (units/second)
var turnspeed = 90; // turning speed of the camera (angles/second)

var observerDirection = [];
var flowerFound = false;

///// CODE /////

var gameEngine = {


    cameraUpdate: function(timestamp){

      timestamp *= 0.001;  // Convert time to seconds;
      deltaTime = timestamp - pastTimeStamp;
      pastTimeStamp = timestamp;

      if (flowerFound){return};

      if(angle>360){
        angle = angle - 360;
      }

      if(angle<-360){
        angle = angle + 360;
      }

      /*

      console.log("Xpos: " + cx);
      console.log("Ypos: " + cy);
      console.log("Zpos: " + cz);
      console.log("Elevation: " + elevation);
      console.log("Angle: " + angle);
      console.log("Roll: " + roll);
      */

      cameraMatrix = matrixUtils.MakeTranslateMatrix(cx, cy, cz);
      cameraMatrix = matrixUtils.multiplyMatrices(cameraMatrix, matrixUtils.MakeRotateXMatrix(elevation));
      cameraMatrix = matrixUtils.multiplyMatrices(cameraMatrix, matrixUtils.MakeRotateYMatrix(-angle));
      cameraMatrix = matrixUtils.multiplyMatrices(cameraMatrix, matrixUtils.MakeRotateZMatrix(roll));
      

      /*
      if(keyPressed['38']){//upArrow

        elevation = elevation - deltaTime * turnspeed;
       
      }

      if(keyPressed['40']){//downArrow

      elevation = elevation + deltaTime * turnspeed;

      }
      */

      if(keyPressed['65']){//a

      angle = angle - deltaTime * turnspeed;
       
      }

      if(keyPressed['68']){//d

      angle = angle + deltaTime * turnspeed;

      }

      if(keyPressed['87']){//w

        cx -= cameraMatrix[2] * deltaTime * speed;
        cy -= cameraMatrix[6] * deltaTime * speed;
        cz -= cameraMatrix[10] * deltaTime * speed;
  
      }

      if(keyPressed['83']){//s

        cx -= -cameraMatrix[2] * deltaTime * speed;
        cy -= -cameraMatrix[6] * deltaTime * speed;
        cz -= -cameraMatrix[10] * deltaTime * speed;

      }

      this.goldenFlowerViewAngleUpdate();

      cameraMatrix = matrixUtils.invertMatrix(cameraMatrix);
      projectionMatrix = matrixUtils.multiplyMatrices(perspectiveMatrix, cameraMatrix);

    },

    goldenFlowerViewAngleUpdate: function(){

      observerDirection[0] = -worldPosition.goldenFlower[0] + cx;
      observerDirection[1] = -worldPosition.goldenFlower[1] + cy;
      observerDirection[2] = -worldPosition.goldenFlower[2] + cz;
  
    },

    checkwin: function() {

        if((cx >= worldPosition.goldenFlower[0] - 2.0  && cx <= worldPosition.goldenFlower[0] + 2.0) && 
        (cz>= worldPosition.goldenFlower[2] - 2.0 && cz<=worldPosition.goldenFlower[2] + 2.0)){
          flowerFound = true;
        }


    },

    translateFlower: function(){

      if (worldPosition.goldenFlower[1] < 0.5){

        worldPosition.goldenFlower[1] += 0.01;

      }
      //Start rotating the flower by 1 degree:
      worldPosition.goldenFlower[3] = worldPosition.goldenFlower[3] + 1.0;

      
    }

}

