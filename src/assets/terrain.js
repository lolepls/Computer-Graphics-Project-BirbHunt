var size = 10;

var terrain = {

    vertices: [

        0, 0, size,
        size, 0, size,
        0, 0, 0,
        size, 0, 0

    ],

    indices: [

        0,1,2,
        2,1,3

    ],

    uvCoord : [

        0,1,
        1,1,
        0,0,
        1,0
    ],

    normals: [

        0.0,1.0,0.0,
        0.0,1.0,0.0,
        0.0,1.0,0.0,
        0.0,1.0,0.0,

    ],



}