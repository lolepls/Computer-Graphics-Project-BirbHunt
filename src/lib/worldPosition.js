/*
This file specifies the position in the world for each object. Every model has its own array. Each element
of the array is the position of one instance in the world for the specified object. The position is expressed
in (x,y,z, yrotation) coordinates. 

The "main" function automatically retrieves the number of instances of each object and places them in the 
world.
*/

var worldPosition = {

    tree1: randPos(20),

    tree3: randPos(40),

    flower: randPos(50),

    goldenFlower: [Math.random()*100, 0, Math.random()*100, 0],

}

function randPos(number){

    var output = [];

    for(i=0; i<number; i++){

        var posX = (Math.random())*100;
        var posZ = (Math.random()*100);
        var rotY = (Math.random()*360);
        
        output.push([posX, 0.0, posZ, rotY]);

    }

    return output;
}
