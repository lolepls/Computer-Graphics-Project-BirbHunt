/*
This file contains the game engine, which manages the camera movement.
*/

////// GLOBAL VARIABLES ////////

/// TIMING VARIABLES ///
var pastTimeStamp = 0; // Instant zero.

/// CAMERA VARIABLES ///
var cx = 0.0; //Initial x position in the space of the player
var cy = 2.0; // Initial y position in the space of the player
var cz = 0.0; // Initial z position in the space of the player

var elevation = 0.0; // Initial elevation angle of the player
var angle = 180.0; // Initial angle to which the camera is oriented.
var roll = 0.0; // Initial roll of the player

var speed = 5; // walking speed of the camera (units/second)
var turnspeed = 90; // turning speed of the camera (angles/second)

///// CODE /////

var gameEngine = {

    cameraUpdate: function(timestamp){

      timestamp *= 0.001;  // Convert time to seconds;
      deltaTime = timestamp - pastTimeStamp;
      pastTimeStamp = timestamp;

      if(angle>360){
        angle = angle - 360;
      }

      if(angle<-360){
        angle = angle + 360;
      }

      
      cameraMatrix = matrixUtils.MakeTranslateMatrix(cx, cy, cz);
      cameraMatrix = matrixUtils.multiplyMatrices(cameraMatrix, matrixUtils.MakeRotateXMatrix(elevation));
      cameraMatrix = matrixUtils.multiplyMatrices(cameraMatrix, matrixUtils.MakeRotateYMatrix(-angle));
      cameraMatrix = matrixUtils.multiplyMatrices(cameraMatrix, matrixUtils.MakeRotateZMatrix(roll));

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

      cameraMatrix = matrixUtils.invertMatrix(cameraMatrix);
      projectionMatrix = matrixUtils.multiplyMatrices(perspectiveMatrix, cameraMatrix);

    },

}

