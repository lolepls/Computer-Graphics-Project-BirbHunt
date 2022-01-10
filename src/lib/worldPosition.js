/*
This file specifies the position in the world for each object. Every model has its own array. Each element
of the array is the position of one instance in the world for the specified object. The position is expressed
in (x,y,z, yrotation) coordinates. 

The "main" function automatically retrieves the number of instances of each object and places them in the 
world.
*/
var worldWidth = 5; // How many tiles 10x10 have to be replicated in x and z to build the terrain
var worldLength = 5;

// This variables contains the positions of each instance of the various models. Add a position to
// automatically add an instance.
var worldPosition = {

    tree1: randPos(10),

    tree2: randPos(10),

    tree3: randPos(10),

    tree4: randPos(10),

    plant: randPos(70),

    rock1: randPos(1),

    rock2: randPos(1),

    rock3: randPos(1),

    smallrock: randPos(10),

    stump: randPos(3),

    flower: randPos(50),

    //Random mode: the flower is on a random position
    //goldenFlower: [Math.random()*worldWidth*10, 0, Math.random()*worldLength*10, 0],

    //Presentation mode: the flower is always at the edge of the world
    goldenFlower: [10.0, 0.0, 0.0, 0.0]

}

/*
This function returns random positions for the models.
Parameters:
    - number: how many instances of a given model you want to have in the world.
              tree1: randPos(10) -> build [x,y,x,yrotation] for 10 different "tree1" instances.
Outputs:
    - Array of #number positions [x,y,z,yrotation]
*/
function randPos(number){

    var output = [];

    for(i=0; i<number; i++){

        var posX = (Math.random())*worldWidth*10;
        var posZ = (Math.random())*worldLength*10;
        var rotY = (Math.random()*360);
        
        output.push([posX, 0.0, posZ, rotY]);

    }

    return output;
}